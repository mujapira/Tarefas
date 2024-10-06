<h1 align="center">
<img src="https://user-images.githubusercontent.com/89225210/186555695-a120d3ab-76cf-49aa-b0ab-6b4541d02ca2.svg" width="150px"/>
</h1>

<h2 align="center">💻Projeto</h2>

<span>
Este projeto foi desenvolvido a partir de um <a href="https://github.com/mujapira/Todo-web-vite">repositório antigo</a> que desenvolvi no curso de React da <a href="https://www.rocketseat.com.br/">RocketSeat</a> em 2022. Resolvi atualizá-lo adicionando um <a href="https://github.com/mujapira/api-tarefas">backend </a> em .NET, um banco de dados SQL Server e algumas novas funcionalidades. O projeto agora conta com gerenciamento de sessões, criação e manipulação de tarefas com integração entre o front-end em React e o back-end. Além disso, o sistema foi preparado para ser executado em produção, e está hospedado em um <a href="https://mujapira.com/">domínio</a> próprio.
</span>

<h4> 🔨 Principais funcionalidades </h4>

- [x] Criar, marcar como concluída e deletar tarefas 
- [x] Gerenciamento de sessões com suporte à criação e recuperação de sessões existentes
- [x] Integração com API para manipulação das tarefas via backend
- [x] Persistência de dados utilizando SQL Server
- [x] Notificações de sucesso e erro durante as operações de tarefas e sessões
- [x] Interface dinâmica com modais de confirmação para ações críticas (como exclusão de tarefas)

✨ Desenvolvido com as seguintes tecnologias:
- React
- Next.js 14
- TypeScript
- Axios
- Docker
- SQL Server
- Tailwind CSS
- Shadcn


<h2 align="center">🏃‍♂️Instruções</h1>

Front
```bash
$ git clone https://github.com/mujapira/Tarefas.git
$ rode a imagem no docker
```
Back
```bash
$ git clone git@github.com:mujapira/api-tarefas.git
$ rode a imagem no docker
```
Banco - docker-compose.yml
```
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      SA_PASSWORD: "Sua senha"
      ACCEPT_EULA: "Y"
      MSSQL_PID: "Developer"
    ports:
      - "1433:1433"
    volumes:
      - ./database_data:/var/opt/mssql
```
<h2 align="center">🐱‍🏍 Galeria </h2>
<h4 align="center">
  <img src="https://github.com/user-attachments/assets/35b38fd0-57a1-4f27-a32e-f8ef284c979a">
</h4>


