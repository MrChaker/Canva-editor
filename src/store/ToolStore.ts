import { DrawParams, ToolsActionType } from "../types/toolsActions";
import create from "zustand";
import ElementFactory from "../ElementFactory/ElementFactory";

const useToolStore = create<ToolsActionType>((set) => ({
    imageUploadModel: false,
    toggleImgModel: () =>
        set((state) => ({
            imageUploadModel: !state.imageUploadModel,
        })),
    drawElement: (params: DrawParams) => {
        const ef = new ElementFactory(params);
        return ef.element.drawElement();
    },
}));

export default useToolStore;
