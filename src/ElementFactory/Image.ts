import useToolStore from "../store/ToolStore";
import readFile from "../utils/readFile";
import AbstractElement from "./AbstractElement";
import resizeImageBeforeDrawing from "../utils/resizeImageBeforeDrawing";
import useCanvaStore from "../store/CanvaStore";
import { DrawParams } from "../types/toolsActions";

export default class Image extends AbstractElement {
    file: File;
    constructor(el: DrawParams) {
        super(el);
        this.file = el.file!;
    }

    public drawElement(): void {
        const newImg = document.createElement("img");
        const canvaStore = useCanvaStore.getState();
        readFile(this.file, (res) => {
            newImg.src = res;
            newImg.onload = () => {
                useToolStore.getState().toggleImgModel();
                resizeImageBeforeDrawing(
                    newImg,
                    canvaStore.width,
                    canvaStore.height,
                    canvaStore.zoom
                );
                canvaStore.addElement({
                    type: this.type,
                    props: {
                        image: newImg,
                        ...this.communProps,
                        width: newImg.width,
                        height: newImg.height,
                    },
                    src: res,
                });
            };
        });
    }
}
