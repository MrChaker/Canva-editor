import React from "react";

const ToolBar: React.FC = ({ children }) => {
    return (
        <div
            className="fixed w-20 bg-black flex items-center flex-col min-h-screen"
            data-testid="toolBar">
            {children}
        </div>
    );
};

export default ToolBar;
