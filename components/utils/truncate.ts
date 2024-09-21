/**
 * Truncate text to a specified length with optional ellipsis or custom ending.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum number of characters.
 * @param {string} ending - Optional. The string to append at the end (default is "...").
 * @returns {string} The truncated text.
 */
const truncateText = (text: string, maxLength: number, ending: string = '...'): string => {
    if (!text || text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + ending;
};

export default truncateText
