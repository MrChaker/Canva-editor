import React, { useEffect, useRef } from "react";
import useCanvaStore from "../../store/CanvaStore";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import elementSelector from "../../utils/elementSelector";

const CanvasBoard = () => {
    const {
        width,
        height,
        zoom,
        elements,
        setSelectedElements,
        selectedElements,
    } = useCanvaStore((state) => state);

    const stage = useRef<Konva.Stage>(null!);
    const layer = useRef<Konva.Layer>(null!);
    const transformer = useRef<Konva.Transformer>(null!);
    useEffect(() => {
        elementSelector(stage.current, layer.current, transformer.current);
    }, []);
    /* React.useEffect(() => {
        if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]); */

    const checkDeselect = (
        e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedElements([]);
        }
    };
    return (
        <div
            data-testid="canva board"
            className="h-screen bg-yellow-50 w-full pl-20 flex items-center">
            <Stage
                ref={stage}
                width={width * zoom}
                height={height * zoom}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                className="bg-white ml-40">
                <Layer ref={layer}>
                    {elements.map((el, i) => {
                        const communProps: Konva.NodeConfig = {
                            ...el.props,
                            key: i,
                        };
                        switch (el.type) {
                            case "Image":
                                const imgEl = document.createElement("img");
                                imgEl.src = el.src!;
                                return React.createElement(el.type, {
                                    ...communProps,
                                    image: imgEl,
                                });
                            default:
                                return React.createElement(
                                    el.type,
                                    communProps
                                );
                        }
                    })}
                    <Transformer ref={transformer} />
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasBoard;
