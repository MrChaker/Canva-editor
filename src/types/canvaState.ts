import { NodeConfig } from "konva/lib/Node";

export interface CanvaState {
    width: number;
    height: number;
    zoom: number;
    elements: CanvaElementType[];
    selectedElements: CanvaElementType[];

    setElements: (elements: CanvaElementType[]) => void;
    addElement: (elements: CanvaElementType) => void;

    setSelectedElements: (elements: CanvaElementType[]) => void;

    setWidth?: (w: number) => void;
    setHeigth?: (h: number) => void;
}

export type CanvaElementType = CanvaElement & CanvaImageElement;

export interface CanvaElement {
    type: "Image" | "Rect" | "Circle";
    props: NodeConfig;
}

export interface CanvaImageElement extends CanvaElement {
    src?: string;
}
