import React from "react";
import useCanvaStore from "../../store/CanvaStore";
import CanvaBoardAttributes from "./CanvaBoardAttributes";

type AttBarProps = {};

const AttributesBar = (props: AttBarProps) => {
    const { selectedElements } = useCanvaStore((state) => state);
    return (
        <div
            className="fixed w-60 right-0 top-0 bg-white border-l border-black flex items-center flex-col min-h-screen p-8"
            data-testid="attBar">
            {selectedElements.length == 0 ? (
                <CanvaBoardAttributes />
            ) : selectedElements.length == 1 ? (
                <></>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AttributesBar;
