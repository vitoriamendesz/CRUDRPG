# 🧙‍♂️ API de Personagens e Itens Mágicos

Projeto desenvolvido em **NestJS + MongoDB** com o objetivo de gerenciar personagens de RPG e seus itens mágicos. A aplicação permite cadastrar personagens, associar itens mágicos (com regras), buscar amuletos, e muito mais.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger](https://swagger.io/) (para documentação da API)

## 📦 Instalação

bash
git clone https://github.com/seu-usuario/nome-do-projeto.git

cd rpg-crud

npm install

npm run start:dev

🧪 Banco de Dados
docker run --name mongodb -p 27017:27017 -d mongo

📚 Documentação da API
http://localhost:3000/api

📚 Funcionalidades Implementadas

| Funcionalidade                              | Método | Rota                                               |
|---------------------------------------------|--------|----------------------------------------------------|
| Cadastrar Personagem                        | POST   | `/personagem`                                      |
| Listar Personagens                          | GET    | `/personagem`                                      |
| Buscar Personagem por ID                    | GET    | `/personagem/:id`                                  |
| Atualizar Nome do Aventureiro por ID        | PATCH  | `/personagem/:id`                                  |
| Remover Personagem                          | DELETE | `/personagem/:id`                                  |
| Cadastrar Item Mágico                       | POST   | `/item-magico`                                     |
| Listar Itens Mágicos                        | GET    | `/item-magico`                                     |
| Buscar Item Mágico por ID                   | GET    | `/item-magico/:id`                                 |
| Adicionar Item Mágico ao Personagem         | PATCH  | `/personagem/:idPersonagem/item/:idItem`           |
| Listar Itens Mágicos por Personagem         | GET    | `/personagem/:id/itens`                            |
| Remover Item Mágico do Personagem           | PATCH  | `/personagem/:idPersonagem/remover-item/:idItem`   |
| Buscar Amuleto do Personagem                | GET    | `/personagem/:id/amuleto`                          |

## 📝 Regras de Negócio

- A soma de **forçaBase + defesaBase** de um personagem não pode ultrapassar 10.
- Um personagem **só pode ter 1 amuleto**.
- Um item mágico pode ser **associado a múltiplos personagens**, mas os personagens não podem duplicar o mesmo tipo "amuleto".

## 🧪 Testar via Swagger

Após rodar o projeto, acesse a documentação interativa em:
[http://localhost:3000/api](http://localhost:3000/api)
