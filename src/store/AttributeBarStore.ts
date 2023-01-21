import { AttributeStore } from "../types/AttributeStore";
import create from "zustand";
import { NodeConfig } from "konva/lib/Node";
import useCanvaStore from "./CanvaStore";

const useAttributeStore = create<AttributeStore>((set) => ({
    stage: null,
    setStage: (stage) =>
        set(() => ({
            stage,
        })),

    elementAttributes: {},
    setElementAttributes: (newAttributes: NodeConfig) =>
        set((state) => {
            if (state.elementAttributes.id)
                useCanvaStore
                    .getState()
                    .updateElement(state.elementAttributes.id, newAttributes);
            return {
                elementAttributes: {
                    ...state.elementAttributes,
                    ...newAttributes,
                },
            };
        }),
}));

export default useAttributeStore;
