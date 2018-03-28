export const moveCursorToEnd = (id) => {
    let value = document.getElementById(id).value;
    document.getElementById(id).setSelectionRange(value.length, value.length);
};