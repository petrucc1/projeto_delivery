# 🍕 Projeto Delivery - Sistema Completo de Pedidos Online

Um sistema moderno de delivery desenvolvido com **React/Next.js** no frontend e **Laravel** no backend. Interface elegante, carrinho funcional e experiência otimizada para pedidos online.

## 🎯 Visão Geral

Sistema completo que permite:

- **Usuários**: Visualizar produtos, adicionar ao carrinho, ajustar quantidades e finalizar pedidos
- **Interface moderna**: Design responsivo com animações suaves
- **Carrossel de banners**: Promoções em destaque na página inicial
- **Carrinho inteligente**: Cálculo automático, persistência local e validações

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização moderna
- **React Icons** - Iconografia
- **Swiper.js** - Carrossel responsivo
- **Axios** - Cliente HTTP

### Backend

- **Laravel 11** - Framework PHP robusto
- **MySQL** - Banco de dados relacional
- **Eloquent ORM** - Mapeamento objeto-relacional

## ⚡ Funcionalidades

✅ **Homepage**

- Carrossel de banners promocionais
- Grid responsivo de produtos
- Cards com hover animado

✅ **Página de Produtos**

- Listagem completa do cardápio
- Busca em tempo real
- Filtros dinâmicos

✅ **Carrinho de Compras**

- Adição/remoção de itens
- Controle de quantidade
- Cálculo automático do total
- Persistência no localStorage
- Validações de estoque

✅ **Responsividade**

- Mobile-first design
- Menu hamburger para dispositivos móveis
- Layout adaptativo

## 🛠️ Instalação e Execução

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js 18+** → [Download aqui](https://nodejs.org/)
- **PHP 8.2+** → [Download aqui](https://www.php.net/)
- **Composer** → [Download aqui](https://getcomposer.org/)
- **MySQL 8.0+** → [Download aqui](https://www.mysql.com/)

### 📋 Passo a Passo

#### 1️⃣ Clone o Repositório

```bash
git clone <url-do-repositório>
cd projeto_delivery
```

#### 2️⃣ Configuração do Backend (Laravel)

```bash
# Navegue para o diretório do backend
cd backend/delivery

# Instale as dependências
composer install

# Configure o arquivo de ambiente
cp .env.example .env
```

**⚠️ IMPORTANTE: Configure o .env**

Abra o arquivo `.env` e configure:

```env
# Banco de dados
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=delivery
DB_USERNAME=root
DB_PASSWORD=sua_senha_mysql

# Configurações da aplicação
APP_URL=http://localhost:8000
APP_DEBUG=true
```

```bash
# Gere a chave da aplicação
php artisan key:generate

# Execute as migrações e popule o banco
php artisan migrate --seed

# Inicie o servidor
php artisan serve
```

**✅ Backend rodando em:** `http://localhost:8000`

#### 3️⃣ Configuração do Frontend (Next.js)

```bash
# Em um novo terminal, navegue para o frontend
cd frontend/delivery

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

**✅ Frontend rodando em:** `http://localhost:3000`

#### 4️⃣ Configuração do Banco de Dados

**Opção 1: Via MySQL Workbench ou phpMyAdmin**

```sql
CREATE DATABASE delivery;
```

**Opção 2: Via linha de comando**

```bash
mysql -u root -p
CREATE DATABASE delivery;
exit
```

### 🎯 Testando a Aplicação

1. **Acesse:** `http://localhost:3000`
2. **Navegue** pelos produtos na homepage
3. **Adicione itens** ao carrinho
4. **Teste** as funcionalidades de busca
5. **Finalize** um pedido

## 📁 Estrutura do Projeto

```
projeto_delivery/
├── backend/delivery/          # API Laravel
│   ├── app/Http/Controllers/  # Controladores da API
│   ├── database/seeders/      # Dados de exemplo
│   ├── routes/api.php         # Rotas da API
│   └── .env.example          # Configurações de exemplo
│
├── frontend/delivery/         # App Next.js
│   ├── src/app/              # Páginas da aplicação
│   ├── src/components/       # Componentes reutilizáveis
│   ├── src/lib/             # Configurações (API)
│   └── public/              # Assets estáticos
│
└── README.md                 # Este arquivo
```

## 🌐 Principais Rotas

### Frontend

- `/` - Homepage com carrossel e produtos em destaque
- `/produtos` - Catálogo completo com busca
- `/cart` - Carrinho de compras
- `/obrigado` - Confirmação de pedido

### API Backend

- `GET /api/products` - Lista todos os produtos
- `GET /api/banners` - Carrossel de banners
- `POST /api/cart` - Adiciona item ao carrinho

## 🚨 Solução de Problemas

### ❌ Erro: "Connection refused"

**Solução:** Verifique se o MySQL está rodando

```bash
# Windows
net start mysql

# macOS/Linux
sudo service mysql start
```

### ❌ Erro: "CORS blocked"

**Solução:** Verifique as URLs no arquivo `.env` do backend

### ❌ Erro: "npm install falha"

**Solução:** Use Node.js 18+ ou limpe o cache

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ Produtos não aparecem

**Solução:** Execute o seeder novamente

```bash
cd backend/delivery
php artisan migrate:fresh --seed
```

## 🎨 Funcionalidades em Destaque

### Interface Moderna

- Design minimalista e elegante
- Animações suaves em hover
- Feedback visual em todas as ações
- Loading states durante requisições

### Carrinho Inteligente

- Persistência entre sessões
- Cálculos automáticos de total
- Controle de quantidade otimizado
- Validações em tempo real

### Responsividade

- Mobile-first approach
- Menu adaptativo
- Grid flexível para produtos
- Breakpoints otimizados

## 📝 Observações Técnicas

- **API RESTful** bem estruturada
- **TypeScript** para type safety
- **Componentização** modular
- **Estado global** via localStorage
- **Error boundaries** implementados
- **SEO otimizado** com Next.js

## 📞 Suporte

Se encontrar algum problema durante a instalação:

1. Verifique se todas as dependências estão instaladas
2. Confirme as versões do Node.js e PHP
3. Certifique-se que o MySQL está rodando
4. Valide as configurações do arquivo `.env`

## 📄 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ por Sarah Petrucci**

_Sistema completo de delivery com foco na experiência do usuário e código limpo._
