import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CanvasBoard from "./CanvasBoard";

describe("toolBar test", () => {
    beforeEach(() => {
        render(<CanvasBoard />);
    });

    it("should render", () => {
        expect(screen.queryByTestId("canva board")).toBeInTheDocument();
    });
});
