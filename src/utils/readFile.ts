export default function readFile(
    file: File,
    callBack: (res: string) => void
): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        callBack(reader.result as string);
    };
}
