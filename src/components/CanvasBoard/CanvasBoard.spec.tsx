import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("toolBar test", () => {
    beforeEach(() => {
        /* render(
            <ToolBar>
                <ToolBarItem label="text" icon="Aa" onClick={selectTool} />
                <ToolBarItem
                    testId="square"
                    label="square"
                    icon="🟩"
                    onClick={selectTool}
                />
            </ToolBar>
        ); */
    });

    it("should render", () => {
        expect(screen.queryByTestId("canva board")).toBeInTheDocument();
    });
});
