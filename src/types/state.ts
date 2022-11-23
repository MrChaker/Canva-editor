import type { KonvaNodeComponent } from "react-konva";
import Konva from "konva";

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
    props: CanvaElementProps;
}

export interface CanvaImageElement extends CanvaElement {
    src?: string;
}

export type CanvaElementProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    id?: string;
    draggable?: boolean;
    key?: number | string;
    onClick?: () => void;
    image?: HTMLImageElement;
};
