# VillesBurger 🍔

Sistema web de uma hamburgueria caseira fictícia de Recife, chamado **VillesBurger**, que permite aos usuários visualizar o cardápio, adicionar itens ao carrinho, informar endereço de entrega e finalizar pedido via WhatsApp.

---

## 🚀 Funcionalidades

* Exibição de cardápio de hambúrgueres e bebidas com imagem, descrição e preço.
* Adição dinâmica de itens ao carrinho, controle de quantidade e remoção de produtos.
* Visualização do carrinho em modal fixa no rodapé, com cálculo automático do total.
* Verificação de horário de funcionamento (18:00–23:00) para permitir ou bloquear finalização.
* Notificações de erro e sucesso usando Toastify.js.
* Envio de pedido formatado diretamente para WhatsApp.

---

## 🛠 Tecnologias e Dependências

* **HTML5** e **CSS3**
* **Tailwind CSS** (via PostCSS com `@tailwind base`, `@tailwind components`, `@tailwind utilities`)
* **JavaScript (ES6+)**
* **Toastify.js** para notificações ([cdn.jsdelivr.net/npm/toastify-js](https://cdn.jsdelivr.net/npm/toastify-js))
* **Font Awesome** para ícones ([cdnjs.cloudflare.com](https://cdnjs.cloudflare.com))
* **Google Fonts** (Roboto)

---

## 📁 Estrutura de Pastas

```
/ (raiz)
├─ index.html       # Página principal
├─ styles/          # Arquivos de estilo
│  └─ output.css    # CSS processado pelo Tailwind
├─ assets/          # Imagens do cardápio e logo
├─ script.js        # Lógica de carrinho e pedidos
└─ README.md        # Documentação do projeto
```

---

## ⚙️ Instalação e Execução Local

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/villesburger.git
   cd villesburger
   ```

2. **Instale dependências de desenvolvimento** (se usar Tailwind localmente):

   ```bash
   npm install
   ```

3. **Compile o CSS** (se aplicável):

   ```bash
   npx tailwindcss -i ./styles/input.css -o ./styles/output.css --watch
   ```

4. **Abra `index.html`** em um navegador ou inicie um servidor local:

   ```bash
   npx live-server
   ```

---

## 🔧 Configurações

* **Horário de funcionamento**: configurado em `script.js` pela função `checkRestaurantOpen()`, retorna `true` entre 18h00 e 23h00.
* **Número de WhatsApp**: altere a variável `phone` em `script.js` para o número de contato desejado.
* **Endereço de entrega**: exigido no modal antes de finalizar pedido.

---

## 📋 Uso

1. Acesse a página principal.
2. Navegue pelo cardápio e clique no ícone de carrinho para adicionar itens.
3. Clique em “Veja meu carrinho” no rodapé para abrir o modal.
4. Insira o seu endereço de entrega.
5. Clique em “Finalizar pedido” (somente se o restaurante estiver aberto).
6. O pedido será enviado via WhatsApp com os itens e endereço.

---

## 🔮 Próximos Passos

* [ ] Autenticação de usuários e painel administrativo.
* [ ] Integração com backend para controle de estoque e persistência de pedidos.
* [ ] Deploy em ambiente de produção com Docker.
* [ ] Validação de número de telefone e endereço.
* [ ] Testes automatizados (Jest, Cypress).

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuidores

* **Davi Ramos Ferreira** – Desenvolvimento front-end e lógica de pedidos
* **Colaborador** – Design e estilização com Tailwind CSS
