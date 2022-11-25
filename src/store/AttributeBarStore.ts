import create from "zustand";

const useAttributeStore = create((set) => ({
    selectedElement: "",
}));

export default useAttributeStore;
