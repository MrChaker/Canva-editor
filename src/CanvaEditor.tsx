import React from "react";
import AttributesBar from "./components/AttributesBar/AttributesBar";
import CanvasBoard from "./components/CanvasBoard/CanvasBoard";
import ToolBar from "./components/toolBar/ToolBar";
import ToolBarItem from "./components/toolBar/ToolBarItem";
import UploadModel from "./components/UploadModel/UploadModel";
import useToolStore from "./store/ToolStore";

const CanvaEditor = () => {
    const { imageUploadModel, toggleImgModel, drawElement } = useToolStore(
        (state) => state
    );
    return (
        <>
            <ToolBar>
                <ToolBarItem label="text" icon="Aa" onClick={() => {}} />
                <ToolBarItem
                    testId="image tool"
                    label="image"
                    icon="🎞️"
                    onClick={() => {
                        toggleImgModel();
                    }}
                />
                <ToolBarItem
                    label="circle"
                    icon="🔵"
                    onClick={() => {
                        drawElement({ type: "Circle" });
                    }}
                />
                <ToolBarItem
                    label="square"
                    icon="🟩"
                    onClick={() => {
                        drawElement({ type: "Rect" });
                    }}
                />
            </ToolBar>
            {imageUploadModel && <UploadModel />}
            <CanvasBoard />
            <AttributesBar />
        </>
    );
};

export default CanvaEditor;
