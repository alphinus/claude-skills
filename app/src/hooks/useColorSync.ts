import { useReducer, useCallback } from 'react';
import { hexToHsl, hexToRgb, hslToHex, rgbToHex, isValidHex } from '../lib/color-utils';

interface ColorState {
  h: number;
  s: number;
  l: number;
  hex: string;
  r: number;
  g: number;
  b: number;
}

type ColorAction =
  | { type: 'SET_HSL'; h: number; s: number; l: number }
  | { type: 'SET_HEX'; hex: string }
  | { type: 'SET_RGB'; r: number; g: number; b: number };

function colorReducer(_state: ColorState, action: ColorAction): ColorState {
  switch (action.type) {
    case 'SET_HSL': {
      const hex = hslToHex(action.h, action.s, action.l);
      const { r, g, b } = hexToRgb(hex);
      return { h: action.h, s: action.s, l: action.l, hex, r, g, b };
    }
    case 'SET_HEX': {
      if (!isValidHex(action.hex)) return { ..._state, hex: action.hex };
      const { h, s, l } = hexToHsl(action.hex);
      const { r, g, b } = hexToRgb(action.hex);
      return { h, s, l, hex: action.hex, r, g, b };
    }
    case 'SET_RGB': {
      const hex = rgbToHex(action.r, action.g, action.b);
      const { h, s, l } = hexToHsl(hex);
      return { h, s, l, hex, r: action.r, g: action.g, b: action.b };
    }
  }
}

export function useColorSync(initialHex: string = '#4fd1c5') {
  const initial = (() => {
    const { h, s, l } = hexToHsl(initialHex);
    const { r, g, b } = hexToRgb(initialHex);
    return { h, s, l, hex: initialHex, r, g, b };
  })();

  const [state, dispatch] = useReducer(colorReducer, initial);

  const setHsl = useCallback((h: number, s: number, l: number) => {
    dispatch({ type: 'SET_HSL', h, s, l });
  }, []);

  const setHex = useCallback((hex: string) => {
    dispatch({ type: 'SET_HEX', hex });
  }, []);

  const setRgb = useCallback((r: number, g: number, b: number) => {
    dispatch({ type: 'SET_RGB', r, g, b });
  }, []);

  return { ...state, setHsl, setHex, setRgb };
}
