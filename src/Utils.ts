import {ViewportInfo} from "./interface/ViewportInfo";

/**
 * Returns the viewport, canvas dimensions.
 */
export function getViewportInfo(): ViewportInfo {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
    };
}

/**
 * Pick a random int between two values (included)
 */
export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Pick a random element from an array
 */
export function randomElementFromArray(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Return the value between to values depending of a linear progress
 */
export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

/**
 * Ease a linear progress
 */
export function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}