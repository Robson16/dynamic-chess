# Dynamic Chess: Tabuleiro Dinâmico com React e Next.js

Este projeto apresenta um tabuleiro de xadrez dinâmico e responsivo, construído com Next.js e React. O objetivo é criar uma base funcional do jogo com dimensões customizáveis e peças com movimentos específicos.

--- 

## Recursos Implementados

* **Tabuleiro Dinâmico**: As dimensões do tabuleiro (eixos X e Y) podem ser definidas pelo usuário através de inputs numéricos.
* **Validação de Dimensões**: O tabuleiro só é renderizado se as dimensões estiverem entre 6x6 e 12x12 (vertical e horizontalmente), garantindo um tamanho de jogo válido. Mensagens de feedback são exibidas para o usuário.
    * **Exemplos de dimensões permitidas:** 6x6, 6x8, 6x12, 12x12, 10x7.
    * **Exemplos de dimensões NÃO permitidas:** 13x6, 5x6.
* **Design Responsivo**: As células do tabuleiro se adaptam ao tamanho da tela, mantendo a proporção quadrada, e o layout da configuração do jogo se ajusta para dispositivos móveis.
* **Estilização com SCSS**: Utiliza SCSS para uma estilização modular e organizada, com variáveis CSS para gerenciamento de cores.

---

## Tecnologias Utilizadas

* **Next.js**: Framework React para renderização do lado do servidor e otimizações.
* **React**: Biblioteca JavaScript para construção da interface do usuário.
* **SCSS (Sass)**: Pré-processador CSS para estilos mais poderosos e organizados.

---

## Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [NOME_DO_SEU_PROJETO]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

---

## Regras do Jogo e Peças

### 1. O Tabuleiro

O tabuleiro pode ter dimensões personalizadas definidas pelo usuário, que devem estar entre **6x6 e 12x12** casas.

### 2. As Peças

#### 2.1. O "Developer"
* Pode mover-se para qualquer casa do tabuleiro.
* O jogo termina quando o Developer captura ou é capturado.
* **Captura**: Captura a peça inimiga movendo-se para a casa dela.

#### 2.2. O "Designer"
* Move-se como um Bispo (diagonais livres).
* **Captura**: Captura a peça inimiga movendo-se para a casa dela.

#### 2.3. O "Product Owner"
* Move-se como uma Torre (linhas e colunas livres).
* **Captura**: Captura a peça inimiga movendo-se para a casa dela.

### 3. Posição Inicial das Peças

As peças são colocadas no tabuleiro de acordo com as seguintes regras, baseadas nas dimensões `axleX` (largura) e `axleY` (altura) do tabuleiro:

* **Developer**: Sempre inicia em `(x, y) = (0, 0)`.
* **Designers (2 peças)**:
    * Um Designer começa em `(x, y) = (axleX - 1, 0)`.
    * O outro Designer começa em `(x, y) = (0, axleY - 1)`.
* **Product Owners (2 peças)**:
    * Um Product Owner começa em `(x, y) = (axleX - 1, axleY - 1)`.
    * O outro Product Owner começa em `(x, y) = (Math.floor(axleX / 2), Math.floor(axleY / 2))`.

### 4. Como Jogar

* O primeiro turno é do lado **Branco**.
* Para ganhar o jogo, você deve capturar o "Product Owner" do seu adversário.

---
 