# Dynamic Chess: Dynamic Board with React and Next.js

This project features a dynamic and responsive chessboard, built with Next.js and React. The goal is to create a functional game foundation with customizable dimensions and pieces with specific movements.

---

## Layout / Design

Reference layout in Figma: [Unvoid Chessboard Prototype](https://www.figma.com/proto/5Yl0MsTnUMhEBnhTQulD1H/unvoid-chessboard?node-id=1-2&t=4AUvwEqLHZsNKH4p-1)

---

## Implemented Features

- **Dynamic Board**: Board dimensions (X and Y axes) can be defined by the user via numerical inputs.
- **Dimension Validation**: The board is only rendered if the dimensions are between 6x6 and 12x12 (vertically and horizontally), ensuring a valid game size. Feedback messages are displayed to the user.
    * **Examples of allowed dimensions:** 6x6, 6x8, 6x12, 12x12, 10x7.
    * **Examples of NOT allowed dimensions:** 13x6, 5x6.
- **Responsive Design**: Board cells adapt to screen size, maintaining their square aspect ratio, and the game configuration layout adjusts for mobile devices.
- **SCSS Styling**: Uses SCSS for modular and organized styling, with CSS variables for color management.

---

## Technologies Used

- **Next.js**: React framework for server-side rendering and optimizations.
- **React**: JavaScript library for building user interfaces.
- **SCSS (Sass)**: CSS pre-processor for more powerful and organized styles.

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

The board can have custom dimensions defined by the user before the game starts. The board dimensions must be between **6 and 12 squares** vertically and horizontally.

### 2. The Pieces

**Capture rule:** The Developer captures by jumping over an opponent's piece; the captured piece is removed, and the Developer must land on an unoccupied square. The Designer and Product Owner capture by moving onto an opponent's occupied square, removing that piece and taking its place. No piece can land on a square occupied by a piece of the same color.

#### 2.1. The "Developer"
- **Movement**: Can jump up to 3 squares per turn in any direction: vertically, horizontally, or diagonally.
- **Capture**: Captures an opponent by jumping over it. The destination square cannot be occupied.

#### 2.2. The "Designer"
- **Movement**: Can jump in an "L" shape, like a knight in chess.
- **Capture**: Captures an opponent by moving onto its square.

#### 2.3. The "Product Owner"
- **Movement**: Can move one square per turn in any direction: vertically, horizontally, or diagonally.
- **Capture**: Captures an opponent by moving onto its square.

### 3. Initial Piece Positions

Coordinates use `(x, y)`, where `x` increases from left to right and `y` increases from top to bottom. For a board with `columns` and `rows`:

- **White Product Owner**: `(0, rows - 1)`, the bottom-left corner.
- **White Developer**: `(1, rows - 1)`, immediately to the right of the White Product Owner.
- **White Designer**: `(2, rows - 1)`, immediately to the right of the White Developer.
- **Black Product Owner**: `(columns - 1, 0)`, the top-right corner.
- **Black Developer**: `(columns - 2, 0)`, immediately to the left of the Black Product Owner.
- **Black Designer**: `(columns - 3, 0)`, immediately to the left of the Black Developer.

### 4. How to Play

- The first turn is for the **White** side.
- To win the game, you must capture the **"Product Owner"** of your adversary.

---