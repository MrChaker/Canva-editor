import React, { useRef } from "react";
import useToolStore from "../../store/ToolStore";

type PropsType = {
    style?: string;
};
const UploadModel = (props: PropsType) => {
    const fileInput = useRef<HTMLInputElement>(null!);
    const { drawElement } = useToolStore((state) => state);

    const addImage = () => {
        if (fileInput.current.files?.item(0))
            drawElement({
                type: "Image",
                file: fileInput.current.files?.item(0)!,
            });
        else {
        }
    };

    return (
        <div
            className={`absolute bg-indigo-100 z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-xl ${props.style}`}>
            <input
                ref={fileInput}
                data-testid="canvas image upload"
                type="file"
                name="upload"
            />
            <button
                className="rounded-md bg-transparent border border-black p-4"
                onClick={addImage}>
                Add image
            </button>
        </div>
    );
};

export default UploadModel;
