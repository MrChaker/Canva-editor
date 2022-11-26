import { NodeConfig } from "konva/lib/Node";
import { createElement, ReactNode } from "react";
import { CanvaElementType } from "../types/canvaState";

const createReactCanvaElement = (
    el: CanvaElementType,
    index: number
): ReactNode => {
    const communProps: NodeConfig = {
        ...el.props,
        key: index,
    };
    switch (el.type) {
        case "Image":
            const imgEl = document.createElement("img");
            imgEl.src = el.src!;
            return createElement(el.type, {
                ...communProps,
                image: imgEl,
            });
        default:
            return createElement(el.type, communProps);
    }
};

export default createReactCanvaElement;
