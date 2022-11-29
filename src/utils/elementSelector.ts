import { Layer } from "konva/lib/Layer";
import { Node, NodeConfig } from "konva/lib/Node";
import { Rect } from "konva/lib/shapes/Rect";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Stage } from "konva/lib/Stage";
import { Util } from "konva/lib/Util";
import { CanvaElementType } from "src/types/canvaState";
import { ElementType } from "../types/commun";

export default function elementSelector(
    stage: Stage,
    layer: Layer,
    tr: Transformer,
    setSelectedElements: (elements: CanvaElementType[]) => void
) {
    var selectionRectangle = new Rect({
        fill: "rgba(0,0,255,0.5)",
        visible: false,
    });
    layer.add(selectionRectangle);

    let x1: number, y1: number, x2: number, y2: number;
    stage.on("mousedown touchstart", (e) => {
        // do nothing if we mousedown on any shape
        if (e.target !== stage) {
            return;
        }
        e.evt.preventDefault();
        x1 = stage.getPointerPosition()?.x || 0;
        y1 = stage.getPointerPosition()?.y || 0;
        x2 = stage.getPointerPosition()?.x || 0;
        y2 = stage.getPointerPosition()?.y || 0;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
    });

    stage.on("mousemove touchmove", (e) => {
        // do nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        x2 = stage.getPointerPosition()?.x || 0;
        y2 = stage.getPointerPosition()?.y || 0;

        selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
        });
    });

    stage.on("mouseup touchend", (e) => {
        // do nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            selectionRectangle.visible(false);
        });

        var shapes = stage.find(".element");
        var box = selectionRectangle.getClientRect();
        var selected = shapes.filter((shape) =>
            Util.haveIntersection(box, shape.getClientRect())
        );
        select(tr, selected, setSelectedElements);
    });

    // clicks should select/deselect shapes
    stage.on("click tap dragstart", function (e) {
        // if we are selecting with rect, do nothing
        if (selectionRectangle.visible()) {
            return;
        }

        // if click on empty area - remove all selections
        if (e.target === stage) {
            tr.nodes([]);
            return;
        }

        /*   // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName("element")) {
            return;
        } */

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            select(tr, [e.target], setSelectedElements);
        } else if (metaPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = tr.nodes().slice(); // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1);
            select(tr, nodes, setSelectedElements);
        } else if (metaPressed && !isSelected) {
            // add the node into selection
            const nodes = tr.nodes().concat([e.target]);
            select(tr, nodes, setSelectedElements);
        }
    });
}

const select = (
    tr: Transformer,
    nodes: Node<NodeConfig>[],
    setter: (elements: CanvaElementType[]) => void
) => {
    tr.nodes(nodes);
    setter(
        nodes.map((node) => {
            return {
                type: node.className as ElementType,
                props: node.attrs,
            };
        })
    );
};
