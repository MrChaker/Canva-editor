import React from "react";

type PropsType = {
    label: string;
    icon: JSX.Element | string;
    testId?: string;
    onClick: () => void;
};
const ToolBarItem = (props: PropsType) => {
    return (
        <div
            data-testid={props.testId}
            className="w-full p-4 text-center text-white hover:bg-gray-600 cursor-pointer"
            onClick={props.onClick}>
            <p className="w-fit m-auto">{props.icon}</p>
            {props.label}
        </div>
    );
};

export default ToolBarItem;
