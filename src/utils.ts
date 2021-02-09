export const getStringDate: (date: Date) => string = (date: Date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate()
    return `${date.getFullYear()}-${(m < 10?'0':'')+m}-${(d < 10?'0':'')+d}`;
}

export function isEmpty(obj: any) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}