import {
    CanvaElement,
    CanvaElementType,
    CanvaState,
} from "../types/canvaState";
import create from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";
import { NodeConfig } from "konva/lib/Node";

const useCanvaStore = create<CanvaState>()(
    persist((set) => ({
        width: 1920,
        height: 1200,
        zoom: 0.4,
        elements: [],
        selectedElements: [],
        background: "white",

        setWidth: (newWidth: number) => set(() => ({ width: newWidth })),
        setHeight: (newHeight: number) => set(() => ({ width: newHeight })),
        setBG: (color: string) => set(() => ({ background: color })),

        getElement: (elementId: string) => {
            let res: CanvaElementType | null = null;
            set((state) => {
                res =
                    state.elements.find((el) => el.props.id == elementId) ||
                    null;
                return {};
            });
            return res;
        },

        setElements: (elements: CanvaElement[]) => set(() => ({ elements })),
        addElement: (element: CanvaElement) =>
            set((state) => {
                state.elements.push(element);
                console.log(state.elements);
                return { elements: state.elements };
            }),
        updateElement: (elementId: string, newProps: NodeConfig) =>
            set((state) => {
                const el = state.elements.find(
                    (el) => el.props.id === elementId
                );
                if (el) {
                    el.props = {
                        ...el.props,
                        ...newProps,
                    };
                }
                return {};
            }),
        removeElement: (elementId: string) =>
            set((state) => {
                return {
                    elements: state.elements.filter(
                        (el) => el.props.id !== elementId
                    ),
                };
            }),
        duplicateElement: (elementId: string) =>
            set((state) => {
                const duplicated = state.elements.find(
                    (el) => el.props.id === elementId
                );
                if (duplicated) {
                    state.elements.push({
                        ...duplicated,
                        props: {
                            ...duplicated.props,
                            id: v4(),
                            x: duplicated.props.x! + 10,
                            y: duplicated.props.y! + 10,
                        },
                    });
                }
                return {};
            }),
        setSelectedElements: (elements: CanvaElement[]) =>
            set((state) => {
                console.log(state.selectedElements);
                return { selectedElements: [...elements] };
            }),
    }))
);

export default useCanvaStore;
