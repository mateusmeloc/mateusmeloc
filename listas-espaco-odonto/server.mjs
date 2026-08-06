import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RAIZ = dirname(fileURLToPath(import.meta.url));
const PORTA = process.env.PORT || 3000;
const CHAVE = process.env.ANTHROPIC_API_KEY;
const LIMITE_BYTES = 12 * 1024 * 1024; // fotos chegam em base64

let paginaCache = null;
async function pagina() {
  if (!paginaCache) paginaCache = await readFile(join(RAIZ, "public", "index.html"));
  return paginaCache;
}

function json(res, status, corpo) {
  const dados = JSON.stringify(corpo);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(dados),
  });
  res.end(dados);
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    const partes = [];
    let total = 0;
    req.on("data", (c) => {
      total += c.length;
      if (total > LIMITE_BYTES) {
        reject(new Error("imagem grande demais"));
        req.destroy();
        return;
      }
      partes.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(partes).toString("utf8")));
    req.on("error", reject);
  });
}

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/saude") {
    return json(res, 200, { ok: true, ia: !!CHAVE });
  }

  if (url.pathname === "/api/transcrever") {
    if (req.method !== "POST") return json(res, 405, { erro: "Use POST." });
    if (!CHAVE) {
      return json(res, 503, {
        erro: "A leitura por foto está desligada: falta a variável ANTHROPIC_API_KEY.",
      });
    }
    try {
      const corpo = await lerCorpo(req);
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CHAVE,
          "anthropic-version": "2023-06-01",
        },
        body: corpo,
      });
      const texto = await r.text();
      res.writeHead(r.status, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(texto);
    } catch (e) {
      console.error("transcrever:", e.message);
      return json(res, 500, { erro: "Não consegui ler a foto agora. Tente de novo." });
    }
  }

  // qualquer outra rota devolve o app
  try {
    const html = await pagina();
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, must-revalidate",
      "Content-Length": html.length,
    });
    res.end(html);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("public/index.html não encontrado");
  }
});

servidor.listen(PORTA, () => {
  console.log(`Listas no ar na porta ${PORTA} · leitura por foto: ${CHAVE ? "ligada" : "desligada"}`);
});
