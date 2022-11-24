export interface ToolsActionType {
    imageUploadModel: boolean;
    toggleImgModel: () => void;
    drawElement: (params: DrawParams) => void;
}

export type DrawParams = {
    type: "Image" | "Rect" | "Circle";
} & ImageDrawParams;

type ImageDrawParams = {
    file?: File;
};
