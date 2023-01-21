import React from "react";
import useCanvaStore from "../../store/CanvaStore";
import CanvaBoardAttributes from "./CanvaBoardAttributes";
import ElementAttributes from "./ElementAttributes";

type AttBarProps = {};

const AttributesBar = (props: AttBarProps) => {
    const { selectedElements } = useCanvaStore((state) => state);
    return (
        <div
            className="fixed w-60 right-0 top-0 bg-white border-l border-black flex items-center flex-col min-h-screen p-8"
            data-testid="attBar">
            {selectedElements.length == 0 ? (
                <CanvaBoardAttributes />
            ) : (
                <ElementAttributes element={selectedElements} />
            )}
        </div>
    );
};

export default AttributesBar;
