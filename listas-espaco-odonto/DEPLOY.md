# Publicar no Railway

App: **Listas de compras — Espaço Odontológico**
Servidor Node sem nenhuma dependência. Sem chave de API: o app funciona inteiro
e só a leitura automática de foto fica oculta.

## Pré-requisitos

- Node 20 ou superior (`node --version`)
- Railway CLI: `npm i -g @railway/cli`

## Primeira publicação

Rode tudo de dentro da pasta do projeto:

```bash
cd ~/projetos/listas-espaco-odonto

railway login          # abre o navegador para autorizar
railway init           # nome do projeto: listas-espaco-odonto
railway up             # envia e publica
railway domain         # gera o subdomínio *.up.railway.app
```

`railway domain` imprime a URL pública. Anote — é ela que você vai abrir e
compartilhar.

**Não defina `ANTHROPIC_API_KEY`.** Sem ela o app roda completo e o botão de
leitura por foto simplesmente não aparece.

## Validar depois de publicar

Troque `<URL>` pelo endereço que o `railway domain` devolveu:

```bash
curl -sI <URL>                 # espera: 200 e content-type text/html
curl -s <URL> | grep -c "Listas de compras"   # espera: número maior que zero
curl -s <URL>/api/saude        # espera: {"ok":true,"ia":false}
```

Se algo falhar, veja o que o servidor registrou:

```bash
railway logs
```

## Republicar quando trocar o `public/index.html`

Substitua o arquivo e mande de novo:

```bash
cd ~/projetos/listas-espaco-odonto
cp ~/Downloads/listas-espaco-odontologico.html public/index.html
railway up
```

A URL continua a mesma. O `railway up` leva alguns segundos e já troca a
versão no ar.

Se quiser deixar registrado no git também:

```bash
git add public/index.html
git commit -m "Atualiza o app"
```

## Teste local antes de subir

```bash
node server.mjs
```

Em outro terminal:

```bash
curl -sI localhost:3000
curl -s localhost:3000/api/saude
```

Encerre com `Ctrl+C`.

## Custo

O plano gratuito do Railway (Trial) dá um crédito único de US$ 5, sem
recarga mensal — serve para experimentar, e quando o crédito acaba o serviço
para. Para manter no ar de forma contínua, o plano pago começa em US$ 5/mês,
que já vem com US$ 5 de uso incluso.

Este app é leve: arquivo estático servido da memória, sem banco e sem
dependências. O consumo tende a ficar dentro do que está incluso, então a
conta esperada é de **cerca de US$ 5 por mês**. Confira os valores atuais em
railway.com/pricing, que os planos mudam de tempos em tempos.
