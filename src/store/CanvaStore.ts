import { CanvaElement, CanvaImageElement, CanvaState } from "../types/state";
import create from "zustand";
import { persist } from "zustand/middleware";

const useCanvaStore = create<CanvaState>()(
    persist((set) => ({
        width: 1920,
        height: 1200,
        zoom: 0.3,
        elements: [],
        selectedElements: [],

        setWidth: (newWidth: number) => set(() => ({ width: newWidth })),
        setHeight: (newHeight: number) => set(() => ({ width: newHeight })),

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
