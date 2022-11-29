import useCanvaStore from "../store/CanvaStore";
import { DrawParams } from "../types/toolsActions";
import AbstractElement from "./AbstractElement";

export default class Text extends AbstractElement {
    text: string;
    constructor(el: DrawParams) {
        super(el);
        this.text = el.text!;
    }

    public drawElement(): void {
        useCanvaStore.getState().addElement({
            type: this.type,
            props: {
                ...this.communProps,
                text: this.text,
            },
        });
    }
}
