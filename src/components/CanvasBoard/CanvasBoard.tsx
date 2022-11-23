import React, { useEffect, useRef } from "react";
import useCanvaStore from "../../store/CanvaStore";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { CanvaElementProps } from "../../types/state";

const CanvasBoard = () => {
    const {
        width,
        height,
        zoom,
        elements,
        setSelectedElements,
        selectedElements,
    } = useCanvaStore((state) => state);

    const shapeRef = React.useRef();
    const trRef = React.useRef();

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
                width={width * zoom}
                height={height * zoom}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                className="bg-white ml-40">
                <Layer>
                    {elements.map((el, i) => {
                        const communProps: CanvaElementProps = {
                            ...el.props,
                            key: i,
                            draggable: true,
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
                </Layer>
            </Stage>
        </div>
    );
};

export default CanvasBoard;
