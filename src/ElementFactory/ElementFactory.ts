import { DrawParams } from "../types/toolsActions";
import AbstractElement from "./AbstractElement";
import Image from "./Image";
import Shape from "./Shape";
import Text from "./Text";

export default class ElementFactory {
    element: AbstractElement;
    constructor(el: DrawParams) {
        switch (el.type) {
            case "Image":
                this.element = new Image(el);
                break;
            case "Text":
                this.element = new Text(el);
                break;
            default: // type either Rect or circle or triangle
                this.element = new Shape(el);
        }
    }
}
