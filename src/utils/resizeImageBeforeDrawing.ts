export default function resizeImageBeforeDrawing(
    img: HTMLImageElement,
    canvaWidth: number,
    canvaHeight: number,
    canvaZoom: number
): void {
    img.width =
        img.width > canvaWidth * canvaZoom
            ? canvaWidth * canvaZoom * 0.8
            : img.width;
    img.height =
        img.height > canvaHeight * canvaZoom
            ? canvaHeight * canvaZoom * 0.8
            : img.height;
}
