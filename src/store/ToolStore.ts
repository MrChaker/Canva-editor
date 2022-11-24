import { DrawParams, ToolsActionType } from "../types/toolsActions";
import create from "zustand";
import readFile from "../utils/readFile";
import useCanvaStore from "./CanvaStore";
import resizeImageBeforeDrawing from "../utils/resizeImageBeforeDrawing";

const useToolStore = create<ToolsActionType>((set) => ({
    imageUploadModel: false,
    toggleImgModel: () =>
        set((state) => ({
            imageUploadModel: !state.imageUploadModel,
        })),
    drawElement: (params: DrawParams) =>
        set((state) => {
            const communProps = {
                x: 50,
                y: 50,
                draggable: true,
                name: "element",
            };
            const canvaStore = useCanvaStore.getState();
            switch (params.type) {
                case "Image":
                    const newImg = document.createElement("img");
                    readFile(params.file!, (res) => {
                        newImg.src = res;
                        newImg.onload = () => {
                            state.toggleImgModel();
                            resizeImageBeforeDrawing(
                                newImg,
                                canvaStore.width,
                                canvaStore.height,
                                canvaStore.zoom
                            );
                            canvaStore.addElement({
                                type: params.type,
                                props: {
                                    image: newImg,
                                    ...communProps,
                                    width: newImg.width,
                                    height: newImg.height,
                                },
                                src: res,
                            });
                        };
                    });
                    break;
                default:
                    useCanvaStore.getState().addElement({
                        type: params.type,
                        props: {
                            ...communProps,
                            fill: "red",
                            width: 50,
                            height: 50,
                        },
                    });
                    break;
            }
            return {};
        }),
}));

export default useToolStore;
