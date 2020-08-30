import {useEffect, useState} from 'react';

export const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];

export function useDirection() {
  const [direction, setDirection] = useState<DirectionType>(Direction.Right);

  useEffect(() => {
    function handleKeyDown({keyCode}: KeyboardEvent) {
      switch (keyCode) {
        case 39:
          setDirection(Direction.Right);
          break;
        case 37:
          setDirection(Direction.Left);
          break;
        case 38:
          setDirection(Direction.Up);
          break;
        case 40:
          setDirection(Direction.Down);
          break;
        default:
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    direction,
    setDirection,
  };
}
