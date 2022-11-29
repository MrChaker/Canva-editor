import AbstractElement from "./AbstractElement";
import { DrawParams } from "../types/toolsActions";
import useCanvaStore from "../store/CanvaStore";

export default class Shape extends AbstractElement {
    constructor(el: DrawParams) {
        super(el);
    }

    public drawElement(): void {
        useCanvaStore.getState().addElement({
            type: this.type,
            props: {
                ...this.communProps,
                width: 50,
                height: 50,
                fill: "blue",
            },
        });
    }
}
