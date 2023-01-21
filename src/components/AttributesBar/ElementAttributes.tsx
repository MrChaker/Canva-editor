import React, { useEffect, useRef, useState } from "react";
import useCanvaStore from "../../store/CanvaStore";
import useAttributeStore from "../../store/AttributeBarStore";
import { CanvaElementType } from "../../types/canvaState";

type PropsType = {
    element: CanvaElementType[];
};
const ElementAttributes = (props: PropsType) => {
    const x = useRef<HTMLInputElement>(null!);
    const y = useRef<HTMLInputElement>(null!);

    const { elementAttributes, setElementAttributes } = useAttributeStore(
        (state) => state
    );
    const { selectedElements, getElement } = useCanvaStore((state) => state);

    const [el, setEl] = useState<CanvaElementType | null>(null);

    useEffect(() => {
        setElementAttributes(props.element[0].props);
        setEl(getElement(props.element[0].props.id!));
    }, [selectedElements]);
    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    x :
                    <input
                        type="number"
                        ref={x}
                        defaultValue={el?.props.x}
                        className="w-10 border border-black"
                        onChange={(e) => {
                            setElementAttributes({
                                x: parseInt(e.target.value),
                            });
                        }}
                    />
                    y :
                    <input
                        type="number"
                        ref={y}
                        defaultValue={el?.props.y}
                        className="w-10 border border-black"
                        onChange={(e) => {
                            setElementAttributes({
                                y: parseInt(e.target.value),
                            });
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ElementAttributes;
