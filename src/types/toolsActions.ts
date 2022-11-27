import { ElementType } from "./commun";

export interface ToolsActionType {
    imageUploadModel: boolean;
    toggleImgModel: () => void;
    drawElement: (params: DrawParams) => void;
}

export type DrawParams = {
    type: ElementType;
} & ImageDrawParams &
    TextDrawParams;

type ImageDrawParams = {
    file?: File;
};

type TextDrawParams = {
    text?: string;
};
