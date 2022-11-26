import { CanvaElement, CanvaState } from "../types/canvaState";
import create from "zustand";
import { persist } from "zustand/middleware";

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

        setElements: (elements: CanvaElement[]) => set(() => ({ elements })),
        addElement: (element: CanvaElement) =>
            set((state) => {
                state.elements.push(element);
                console.log(state.elements);
                return { elements: state.elements };
            }),

        setSelectedElements: (elements: CanvaElement[]) =>
            set(() => ({ selectedElements: elements })),
    }))
);

export default useCanvaStore;
