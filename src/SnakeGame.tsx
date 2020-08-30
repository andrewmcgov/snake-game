import React, {useEffect, useReducer} from 'react';
import './SnakeGame.css';

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;

type Coordinate = [number, number];

const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
} as const;

type DirectionType = typeof Direction[keyof typeof Direction];

interface State {
  direction: DirectionType;
  snake: Coordinate[];
  interval: number;
  intervalId?: any;
}

const initialState: State = {
  direction: Direction.Right,
  snake: [
    [9, 10],
    [8, 10],
  ],
  interval: 400,
};

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'FACE_RIGHT':
      return {
        ...state,
        direction: Direction.Right,
      };
    case 'FACE_LEFT':
      return {
        ...state,
        direction: Direction.Left,
      };
    case 'FACE_UP':
      return {
        ...state,
        direction: Direction.Up,
      };
    case 'FACE_DOWN':
      return {
        ...state,
        direction: Direction.Down,
      };
    case 'MOVE_SNAKE': {
      const newSnake = [...state.snake];
      const [x, y] = newSnake[0];

      switch (state.direction) {
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

      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    }
    case 'ADD_TO_SNAKE': {
      const newSnake = [...state.snake];
      const [x, y] = newSnake[0];

      switch (state.direction) {
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

      return {
        ...state,
        snake: newSnake,
      };
    }
    case 'START_GAME':
      return {
        ...state,
        intervalId: action.payload,
      };

    case 'STOP_GAME':
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        intervalId: undefined,
      };
    default:
      throw new Error();
  }
}

export default function SnakeGame() {
  const [{direction, snake, interval}, dispatch] = useReducer(
    reducer,
    initialState
  );

  function getSquareClassName(x: number, y: number) {
    if (snake[0][0] === x && snake[0][1] === y) {
      return 'Square-Head';
    } else if (snake.some(([X, Y]) => x === X && y === Y)) {
      return 'Square-Tail';
    }
  }

  function startGame() {
    dispatch({
      type: 'START_GAME',
      payload: setInterval(() => dispatch({type: 'MOVE_SNAKE'}), interval),
    });
  }

  function stopGame() {
    dispatch({type: 'STOP_GAME'});
  }

  useEffect(() => {
    function handleKeyDown({keyCode}: KeyboardEvent) {
      switch (keyCode) {
        case 39:
          dispatch({type: 'FACE_RIGHT'});
          break;
        case 37:
          dispatch({type: 'FACE_LEFT'});
          break;
        case 38:
          dispatch({type: 'FACE_UP'});
          break;
        case 40:
          dispatch({type: 'FACE_DOWN'});
          break;
        default:
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        <button onClick={startGame}>startGame</button>
        <button onClick={stopGame}>stopGame</button>
        <button onClick={() => dispatch({type: 'ADD_TO_SNAKE'})}>
          Add to snake
        </button>
        <p>Current direction: {direction}</p>
      </div>
    </>
  );
}
