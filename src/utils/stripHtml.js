export const stripHtml = (html = "") => {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
};