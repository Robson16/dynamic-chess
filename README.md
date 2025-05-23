# Dynamic Chess: Dynamic Board with React and Next.js

This project features a dynamic and responsive chessboard, built with Next.js and React. The goal is to create a functional game foundation with customizable dimensions and pieces with specific movements.

---

## Implemented Features

* **Dynamic Board**: Board dimensions (X and Y axes) can be defined by the user via numerical inputs.
* **Dimension Validation**: The board is only rendered if the dimensions are between 6x6 and 12x12 (vertically and horizontally), ensuring a valid game size. Feedback messages are displayed to the user.
    * **Examples of allowed dimensions:** 6x6, 6x8, 6x12, 12x12, 10x7.
    * **Examples of NOT allowed dimensions:** 13x6, 5x6.
* **Responsive Design**: Board cells adapt to screen size, maintaining their square aspect ratio, and the game configuration layout adjusts for mobile devices.
* **SCSS Styling**: Uses SCSS for modular and organized styling, with CSS variables for color management.

---

## Technologies Used

* **Next.js**: React framework for server-side rendering and optimizations.
* **React**: JavaScript library for building user interfaces.
* **SCSS (Sass)**: CSS pre-processor for more powerful and organized styles.

---

## How to Run the Project

Follow the steps below to set up and run the project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Robson16/dynamic-chess.git
    cd dynamic-chess
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.

---

## Game Rules and Pieces

### 1. The Board

The board can have custom dimensions defined by the user, which must be between **6x6 and 12x12** squares.

### 2. The Pieces

#### 2.1. The "Developer"
* Can move to any square on the board.
* The game ends when the Developer captures or is captured.
* **Capture**: Captures the enemy piece by moving to its square.

#### 2.2. The "Designer"
* Moves like a Bishop (free diagonals).
* **Capture**: Captures the enemy piece by moving to its square.

#### 2.3. The "Product Owner"
* Moves like a Rook (free rows and columns).
* **Capture**: Captures the enemy piece by moving to its square.

### 3. Initial Piece Positions

Pieces are placed on the board according to the following rules, based on the board's `axleX` (width) and `axleY` (height) dimensions:

* **Developer**: Always starts at `(x, y) = (0, 0)`.
* **Designers (2 pieces)**:
    * One Designer starts at `(x, y) = (axleX - 1, 0)`.
    * The other Designer starts at `(x, y) = (0, axleY - 1)`.
* **Product Owners (2 pieces)**:
    * One Product Owner starts at `(x, y) = (axleX - 1, axleY - 1)`.
    * The other Product Owner starts at `(x, y) = (Math.floor(axleX / 2), Math.floor(axleY / 2))`.

### 4. How to Play

* The first turn is for the **White** side.
* To win the game, you must capture your opponent's "Product Owner".

---