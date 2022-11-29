import React, { useEffect, useRef, useState } from "react";
import useCanvaStore from "../../store/CanvaStore";
import { Stage, Layer, Transformer } from "react-konva";
import elementSelector from "../../utils/elementSelector";
import createReactCanvaElement from "../../utils/createReactCanvaElement";
import { Stage as StageType } from "konva/lib/Stage";
import { Layer as LayerType } from "konva/lib/Layer";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import DragAndDropInput from "../DragAndDropInput/DragAndDropInput";
import useAttributeStore from "../../store/AttributeBarStore";

const CanvasBoard = () => {
    const {
        width,
        height,
        zoom,
        elements,
        background,
        setSelectedElements,
        selectedElements,
        removeElement,
        duplicateElement,
    } = useCanvaStore((state) => state);
    const setStage = useAttributeStore((state) => state.setStage);

    const stage = useRef<StageType>(null!);
    const layer = useRef<LayerType>(null!);
    const transformer = useRef<TransformerType>(null!);
    useEffect(() => {
        setStage(stage.current);
        setSelectedElements([]);
        elementSelector(
            stage.current,
            layer.current,
            transformer.current,
            setSelectedElements
        );
    }, []);

    const [dragging, setDragging] = useState(false);

    window.onkeyup = (e) => {
        if (e.key == "Delete") {
            selectedElements.forEach((se) => {
                removeElement(se.props.id || "");
                transformer.current.nodes([]);
            });
        }
    };

    window.onkeydown = (e) => {
        if ((e.key == "D" || e.key == "d") && e.ctrlKey) {
            e.preventDefault();
            selectedElements.forEach((se) => {
                duplicateElement(se.props.id || "");
                /*  transformer.current.nodes([]); */
            });
        }
    };
    return (
        <div
            onDragOver={() => setDragging(true)}
            data-testid="canva board"
            className="h-screen bg-yellow-50 w-full flex items-center">
            <Stage
                ref={stage}
                width={width * zoom}
                height={height * zoom}
                className="canva ml-32"
                style={{ backgroundColor: background }}>
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
