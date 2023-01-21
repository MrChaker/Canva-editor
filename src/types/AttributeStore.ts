import { NodeConfig } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";

export type AttributeStore = {
    stage: Stage | null;
    setStage: (stage: Stage) => void;

    elementAttributes: NodeConfig;
    setElementAttributes: (newAttributes: NodeConfig) => void;
};
