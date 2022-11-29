import React, { useEffect, useRef } from "react";
import useAttributeStore from "../../store/AttributeBarStore";
import useCanvaStore from "../../store/CanvaStore";

const CanvaBoardAttributes = () => {
    const bgColor = useRef<HTMLInputElement>(null!);
    const { setBG, background } = useCanvaStore((state) => state);
    const { stage } = useAttributeStore((state) => state);

    /* useEffect(() => {
        console.log(bgColor.current.value);
    }, []); */
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
                background :
                <input
                    ref={bgColor}
                    type="color"
                    className="w-10 border border-gray-700 rounded-md h-4 cursor-pointer"
                    onChangeCapture={(e) => setBG(e.currentTarget.value)}
                    defaultValue={background}
                />
            </div>
            <a href={stage?.toDataURL()} download>
                <button className="border border-black p-2 px-4 rounded-lg">
                    Export canva
                </button>
            </a>
        </div>
    );
};

export default CanvaBoardAttributes;
