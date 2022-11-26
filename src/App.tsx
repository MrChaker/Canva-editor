import React from "react";
import ReactDOM from "react-dom";
import CanvaEditor from "./CanvaEditor";
import "./index.scss";

const App = () => {
    return (
        <>
            <div className="text-sm relative">
                <CanvaEditor />
            </div>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("app"));
