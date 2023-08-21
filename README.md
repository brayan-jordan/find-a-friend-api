# Find a friend API

API seguindo requisitos funcionais e regras de negócio pré definidas pelo instrutor

## Passo a passo para iniciar o projeto localmente

+ Executar o comando "npm install" no prompt de comando (versão do NodeJS recomendada: 18.17.1).
+ Copiar o conteúdo do arquivo ".env.example" e criar um arquivo ".env" com o mesmo conteúdo.
+ Executar o comando "docker compose up -d" (necessário ter o docker instalado).
+ Executar o comando "npx prisma migrate deploy".
+ Executar o comando "npm run dev".
+ A aplicação já estará no ar, deixei um arquivo que contém as rotas da aplicação para testes (compátivel com o aplicativo Insomnia)

## Extras

+ Executar os testes unitários: npm run test
+ Executar os testes E2E: npm run test:e2e
