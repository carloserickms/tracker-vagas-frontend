export function convertDataString(data:string) {
    if (typeof data === "string") {
        const safeDate = new Date(data.slice(0, 19));
        return safeDate.toLocaleDateString("pt-BR");
    }

    return data;
}