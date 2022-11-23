import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToolBar from "./ToolBar";
import ToolBarItem from "./ToolBarItem";
import React from "react";

describe("toolBar test", () => {
    const selectTool = jest.fn();

    beforeEach(() => {
        render(
            <ToolBar>
                <ToolBarItem label="text" icon="Aa" onClick={selectTool} />
                <ToolBarItem
                    testId="square"
                    label="square"
                    icon="🟩"
                    onClick={selectTool}
                />
            </ToolBar>
        );
    });

    it("should render", () => {
        expect(screen.queryByTestId("toolBar")).toBeInTheDocument();
    });

    it("should select elements", () => {
        let shape1 = screen.getByText(/square/i);
        fireEvent.click(shape1);
        expect(selectTool).toBeCalled();
    });
});
