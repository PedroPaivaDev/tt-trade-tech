Este é um projeto [Next.js](https://nextjs.org/) feito com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre o Projeto

Este projeto foi desenvolvido para atender ao teste técnico, do processo seletivo de concorrência à [vaga](https://tradetechnology.gupy.io/jobs/4802189?jobBoardSource=gupy_opportunities) de Desenvolvedor Front-End da empresa [Trade Technology](https://tradetechnology.com.br).

## Histórico de Desenvolvimento

O primeiro procedimento, foi ler a documentação da API e verificar o seu funcionamento. A princípio foi feita a tentativa de conexão utilizando a url padrão (https://v3.football.api-sports.io/), mas aparentemente essa forma está desativada, então foi necessário utilizar a segunda opção oferecida pela documentação, que é a url (https://api-football-v1.p.rapidapi.com/v3/).

Em seguida, foi criado um custom hook *useLocalStorage*, para armazenar a chave de acesso no browser, desse modo não foi preciso digitar a chave a cada *reload* e tornou mais produtivo o desenvolvimento.

O *endpoint* "*timezone*" da API foi utilizado provisoriamente, para fazer a verificação da chave da API. Essa verificação foi feita por um componente *SignIn* e um componente *Button*, que retorna ao usuário uma mensagem de sucesso ou falha, na verificação da chave de acesso.

## Para Desenvolvedores

Primeiro, rode o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abra o [http://localhost:3000](http://localhost:3000) com o seu browser e veja os resultados.

Você pode começar editando a página, modificando o arquivo `app/page.tsx`. A página irá auto-atualizar, quando você salvar as edições feitas no arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para automaticamente otimizar e carregar "Inter", uma fonte customizada do Google.