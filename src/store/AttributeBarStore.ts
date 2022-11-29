import { AttributeStore } from "../types/AttributeStore";
import create from "zustand";

const useAttributeStore = create<AttributeStore>((set) => ({
    stage: null,
    setStage: (stage) =>
        set(() => ({
            stage,
        })),
}));

export default useAttributeStore;
