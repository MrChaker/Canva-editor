import React, { useState } from "react";
import useToolStore from "../../store/ToolStore";

type PropsType = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const DragAndDropInput = (props: PropsType) => {
    const { drawElement, toggleImgModel } = useToolStore((state) => state);
    const handleOnDrop = (ev: React.DragEvent<HTMLInputElement>) => {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        drawElement({ type: "Image", file });
                        toggleImgModel();
                    }
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
        props.setVisible(false);
    };
    return (
        <input
            type="file"
            name="upload"
            className={`absolute top-0 left-0 opacity-20 bg-black w-full h-full ${
                props.visible ? "block " : "hidden"
            }`}
            onDrop={(e) => handleOnDrop(e)}
            onClick={(e) => e.preventDefault()}
            onDragLeaveCapture={() => props.setVisible(false)}
        />
    );
};

export default DragAndDropInput;
