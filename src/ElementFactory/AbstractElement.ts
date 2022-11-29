import { NodeConfig } from "konva/lib/Node";
import { ElementType } from "../types/commun";
import { DrawParams } from "../types/toolsActions";
import { v4 } from "uuid";

export default class AbstractElement {
    communProps: NodeConfig;
    type: ElementType;

    constructor(params: DrawParams) {
        this.communProps = {
            id: v4(),
            x: 50,
            y: 50,
            draggable: true,
            name: "element",
        };
        this.type = params.type;
    }

    public drawElement(): void {}
}
