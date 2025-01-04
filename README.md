# **Namu Mobile Challenge 20240202**

## **Desenvolvido por Lucas Paulino**

Aplicativo de dicionário interativo da língua inglesa

---

## **Descrição**

Este projeto foi desenvolvido como solução para o **Coodesh Mobile Challenge 20240202**. A aplicação consiste em um dicionário interativo de língua inglesa, oferecendo as seguintes funcionalidades obrigatórias:

- Visualização de uma lista de palavras com rolagem infinita;
- Exibição detalhada de uma palavra, incluindo seus significados e fonética;
- Salvamento de palavras como favoritas;
- Remoção de palavras da lista de favoritos;
- Consulta a uma lista de palavras já visualizadas anteriormente.

## **Detalhes do Projeto**

O banco de dados utilizado para fornecer as palavras da língua inglesa é um arquivo JSON disponível publicamente no seguinte endereço:  
[https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json](https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json).  
Esse recurso é acessado pela aplicação por meio de requisições HTTP.

Visando otimizar o desempenho, os resultados das requisições são armazenados em cache utilizando a biblioteca **React Query**.  
Referência: [https://www.npmjs.com/package/react-query](https://www.npmjs.com/package/react-query).

A implementação das funcionalidades solicitadas, o gerenciamento de cache e a criação de uma interface gráfica alinhada ao wireframe fornecido atendem integralmente os três critérios obrigatórios do desafio.

## **Funcionalidades Adicionais Implementadas**

Além das funcionalidades obrigatórias, foram desenvolvidos os seguintes critérios diferenciais, com o objetivo de agregar valor à solução:

- Tocador de áudio.
- Utilizar alguma ferramenta de injeção de dependência (Context API e Custom Hooks);
- Login com Usuário e Senha:
  - Implementação do sistema de autenticação via Firebase Auth.
  - Associação de palavras favoritas e histórico de visualização ao ID do usuário, via Firestore.

---

## **Tecnologias Utilizadas**

- Linguagem: TypeScript;
- Framework: React Native;
- Ferramentas e bibliotecas: **Expo** (plataforma para desenvolvimento React Native), **Styled Components** (estilização), **Context API** (gerência de estado) & **Firebase** (Auth);
- Banco de Dados: **Firestore** e arquivo JSON.

---

## **Instalação e Uso**

### Pré-requisitos

Para utilizar a aplicação, é necessário um dispositivo com sistema operacional Android (seja um smartphone físico ou emulador). O APK pode ser baixado através do link abaixo, ou através da aba releases:

[DOWNLOAD APK](./releases/namu-mobile-dictionary-lucas-paulino.apk)

> This is a challenge by [Coodesh](https://coodesh.com/)

```

```
