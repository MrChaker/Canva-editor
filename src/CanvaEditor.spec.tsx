import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CanvaEditor from "./CanvaEditor";
import React from "react";

describe("test canva ediotr", () => {
    beforeEach(() => {
        render(<CanvaEditor />);
    });
    it("should show uploading model", () => {
        expect(screen.queryByTestId("canvas image upload")).toBe(null);
        const imgTool = screen.getByTestId("image tool");
        fireEvent.click(imgTool);
        expect(screen.queryByTestId("canvas image upload")).toBeInTheDocument();
    });
});
