import { Stage } from "konva/lib/Stage";

export type AttributeStore = {
    stage: Stage | null;
    setStage: (stage: Stage) => void;
};
