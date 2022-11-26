module.exports = {
    testEnvironment: "jsdom",
    setupFiles: ["jest-canvas-mock"],
    moduleNameMapper: {
        "^konva": "konva/konva",
    },
};
