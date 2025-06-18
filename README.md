<div align="center">
  <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/mobile-screen-button.svg" alt="Ícone de celular" width="80"/>
  <h1>ZenMotion - Frontend</h1>
  <p>Aplicativo móvel multiplataforma para a jornada de saúde e bem-estar, construído com React Native e Expo.</p>

  <p>
    <img src="https://img.shields.io/badge/Framework-React_Native-blue?logo=react" alt="React Native">
    <img src="https://img.shields.io/badge/Plataforma-Expo-lightgrey?logo=expo" alt="Expo">
    <img src="https://img.shields.io/badge/Linguagem-TypeScript-blue?logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
  </p>
</div>

## 👨‍💻 Autores

**[Daniel Lucas dos Santos Corte - 202403517949]** - [daniellcorte@gmail.com](mailto:daniellcorte@gmail.com) <br>
**[Julio Alexsandro Monteiro da Silva - 202403945487]** - [julioalexsandro.monteiro13@gmail.com](mailto:julioalexsandro.monteiro13@gmail.com)

---

## 🖼️ Telas do Aplicativo

<p align="center">
  <img src="assets/images/home.png" alt="Tela de Home" width="190"/>
  <img src="assets/images/nutricao.png" alt="Tela de Nutrição" width="190"/>
  <img src="assets/images/metas.png" alt="Tela de Metas" width="190"/>
</p>

---

## 🎯 Sobre o Projeto

Este repositório contém o código-fonte do **aplicativo móvel ZenMotion**. Ele foi desenvolvido com React Native e Expo para oferecer uma experiência de usuário fluida e intuitiva em dispositivos iOS e Android.

O aplicativo consome a [API do backend do ZenMotion](https://github.com/zenmotion/backend) para fornecer todas as funcionalidades, como login, registro de refeições, monitoramento de exercícios e visualização de progresso.

---

## 🚀 Tecnologias Utilizadas

* **React Native**
* **Expo SDK**
* **TypeScript**
* **Axios** (para requisições à API)
* **React Navigation** (para gerenciamento de rotas e navegação)
* **Styled Components** (para estilização)

---

## 🏁 Começando

Siga estas instruções para configurar e executar o aplicativo em sua máquina local ou em seu celular.

### Pré-requisitos

* [**Node.js**](https://nodejs.org/en/) (versão LTS)
* O aplicativo **Expo Go** em seu smartphone (disponível na App Store e Play Store).
* O **servidor do backend do ZenMotion** deve estar rodando localmente.

### Instalação e Execução

1.  **Clone este repositório:**
    ```bash
    git clone https://github.com/zenmotion/zenmotion.git
    cd zenmotion
    ```

2.  **Crie o arquivo de ambiente:**
    * Na raiz do projeto frontend, crie um arquivo chamado `.env`.
    * Dentro deste arquivo, adicione a seguinte linha, que informa ao aplicativo onde encontrar a API do backend:
        ```
        API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
        ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Execute o aplicativo:**
    * O Metro Bundler será iniciado e um **QR Code** aparecerá no seu terminal.
    * Abra o aplicativo **Expo Go** em seu celular e escaneie o QR Code.
    * 🎉 O aplicativo ZenMotion será carregado em seu dispositivo!

