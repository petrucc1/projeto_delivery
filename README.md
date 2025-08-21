# Projeto Delivery

Este é um sistema completo de delivery, desenvolvido com React/Next.js no frontend e Laravel no backend, utilizando MySQL como banco de dados. O objetivo é oferecer uma experiência moderna para pedidos online, com funcionalidades de cardápio, carrinho e finalização de pedidos.

## Visão Geral

O projeto permite que usuários visualizem produtos, adicionem itens ao carrinho, ajustem quantidades e finalizem pedidos. Administradores podem cadastrar banners promocionais e gerenciar o cardápio.

## Tecnologias

- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Laravel (PHP)
- **Banco de Dados:** MySQL

## Funcionalidades

- Carrossel de banners promocionais na página inicial
- Listagem de produtos com imagem, nome, descrição e preço
- Adição de produtos ao carrinho
- Alteração de quantidade e remoção de itens no carrinho
- Cálculo automático do subtotal
- Finalização de pedido

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- PHP 8.2+
- Composer
- MySQL

### Passos

#### 1. Clone o repositório

```sh
git clone <url-do-repositório>
cd projeto_delivery
```

#### 2. Backend (Laravel)

```sh
cd backend/delivery
cp .env.example .env
# Edite .env com suas credenciais do MySQL
composer install
php artisan migrate --seed
php artisan serve
```
O backend estará disponível em `http://localhost:8000`.

#### 3. Frontend (Next.js)

```sh
cd ../../frontend/delivery
npm install
npm run dev
```
O frontend estará disponível em `http://localhost:3000`.

#### 4. Banco de Dados

- Crie um banco MySQL chamado `delivery`.
- Configure as variáveis de ambiente do backend em `.env`.

## Estrutura de Pastas

```
projeto_delivery/
  backend/
    delivery/
      ...
  frontend/
    delivery/
      ...
```

## Rotas Principais

- `/` — Página inicial e cardápio
- `/cart` — Carrinho de compras

## Observações

- O frontend consome a API do backend via Axios.
- Para produção, configure variáveis de ambiente e permissões conforme documentação oficial.

## Licença

MIT