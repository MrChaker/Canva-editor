import { NodeConfig } from "konva/lib/Node";
import { ElementType } from "./commun";

export interface CanvaState {
    width: number;
    height: number;
    zoom: number;
    elements: CanvaElementType[];
    selectedElements: CanvaElementType[];
    background: string;

    getElement: (element: string) => CanvaElementType | null;
    setElements: (elements: CanvaElementType[]) => void;
    addElement: (elements: CanvaElementType) => void;
    updateElement: (elementId: string, newProps: NodeConfig) => void;
    removeElement: (elementId: string) => void;
    duplicateElement: (elementId: string) => void;

    setSelectedElements: (elements: CanvaElementType[]) => void;

    setWidth?: (w: number) => void;
    setHeigth?: (h: number) => void;
    setBG: (color: string) => void;
}

export type CanvaElementType = CanvaElement & CanvaImageElement;

export interface CanvaElement {
    type: ElementType;
    props: NodeConfig;
}

export interface CanvaImageElement extends CanvaElement {
    src?: string;
}
