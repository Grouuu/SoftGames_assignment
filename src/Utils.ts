
export interface ViewportInfo{
    width: number;
    height: number;
    canvasWidth: number;
    canvasHeight: number;
    pixelRatio: number;
    stageScale: number;
}

/**
 * Returns the viewport and canvas dimensions and related info.
 */
export function getViewportInfo(): ViewportInfo {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
        stageScale: 1
    };
}