import React, { useEffect, useRef, useState } from "react";
import useCanvaStore from "../../store/CanvaStore";
import { Stage, Layer, Transformer } from "react-konva";
import elementSelector from "../../utils/elementSelector";
import createReactCanvaElement from "../../utils/createReactCanvaElement";
import { Stage as StageType } from "konva/lib/Stage";
import { Layer as LayerType } from "konva/lib/Layer";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import DragAndDropInput from "../DragAndDropInput/DragAndDropInput";

const CanvasBoard = () => {
    const {
        width,
        height,
        zoom,
        elements,
        setSelectedElements,
        selectedElements,
    } = useCanvaStore((state) => state);

    const stage = useRef<StageType>(null!);
    const layer = useRef<LayerType>(null!);
    const transformer = useRef<TransformerType>(null!);
    useEffect(() => {
        elementSelector(stage.current, layer.current, transformer.current);
    }, []);

    const [dragging, setDragging] = useState(false);

    return (
        <div
            onDragOver={() => setDragging(true)}
            data-testid="canva board"
            className="h-screen bg-yellow-50 w-full flex items-center">
            <Stage
                ref={stage}
                width={width * zoom}
                height={height * zoom}
                className="bg-white ml-32">
                <Layer ref={layer}>
                    {elements.map((el, i) => createReactCanvaElement(el, i))}
                    <Transformer ref={transformer} />
                </Layer>
            </Stage>
            <DragAndDropInput visible={dragging} setVisible={setDragging} />
        </div>
    );
};

export default CanvasBoard;
