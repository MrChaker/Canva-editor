import React from "react";

type AttBarProps = {};

const AttributesBar = (props: AttBarProps) => {
    return (
        <div
            className="fixed w-60 right-0 top-0 bg-white border-l border-black flex items-center flex-col min-h-screen"
            data-testid="attBar"></div>
    );
};

export default AttributesBar;
