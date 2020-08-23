import React, {useState} from 'react';
import './SnakeGame.css';

// think of array structure
// Make array structure
// think of what data each array element needs

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;

const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
} as const;

type Direction = typeof Direction[keyof typeof Direction];

export default function SnakeGame() {
  const [snake, setSnake] = useState([
    [9, 10],
    [8, 10],
  ]);

  const [direction, setDirection] = useState<Direction>(Direction.Right);

  function moveSnake() {
    const newSnake = [...snake];
    const [x, y] = newSnake[0];

    switch (direction) {
      case Direction.Right:
        newSnake.unshift([x + 1, y]);
        break;
      case Direction.Left:
        newSnake.unshift([x - 1, y]);
        break;
      case Direction.Up:
        newSnake.unshift([x, y - 1]);
        break;
      case Direction.Down:
        newSnake.unshift([x, y + 1]);
    }
    if (direction === Direction.Right) {
    }
    newSnake.pop();
    setSnake(newSnake);
  }

  function addToSnake() {
    const newSnake = [...snake];
    const [x, y] = newSnake[0];
    switch (direction) {
      case Direction.Right:
        newSnake.unshift([x + 1, y]);
        break;
      case Direction.Left:
        newSnake.unshift([x - 1, y]);
        break;
      case Direction.Up:
        newSnake.unshift([x, y - 1]);
        break;
      case Direction.Down:
        newSnake.unshift([x, y + 1]);
    }
    setSnake(newSnake);
  }

  function getSquareClassName(x: number, y: number) {
    if (snake[0][0] === x && snake[0][1] === y) {
      return 'Square-Head';
    } else if (snake.some(([X, Y]) => x === X && y === Y)) {
      return 'Square-Tail';
    }
  }

  return (
    <>
      <div className="Board">
        {new Array(BOARD_WIDTH).fill('').map((column, x) => (
          <div key={x} className="Column">
            {new Array(BOARD_HEIGHT).fill('').map((squareValue: any, y) => (
              <div
                key={y}
                className={`Square ${getSquareClassName(x, y)}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={moveSnake}>Move snake</button>
        <button onClick={addToSnake}>Add to snake</button>
        <button onClick={() => setDirection(Direction.Up)}>Up</button>
        <button onClick={() => setDirection(Direction.Down)}>Down</button>
        <button onClick={() => setDirection(Direction.Left)}>Left</button>
        <button onClick={() => setDirection(Direction.Right)}>Right</button>
        <p>Current direction: {direction}</p>
      </div>
    </>
  );
}
