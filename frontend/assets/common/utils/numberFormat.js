/**
 * Format numbers with K and M notation for better readability
 * @param {string|number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  // Handle null, undefined, or empty values
  if (num === null || num === undefined || num === '') {
    return '0';
  }

  // Convert to number
  const number = parseInt(num);

  // Handle NaN
  if (isNaN(number)) {
    return '0';
  }

  // Format with K and M notation
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return number.toString();
};

/**
 * Format numbers for display in lists and cards
 * @param {string|number} num - The number to format
 * @param {boolean} showZero - Whether to show '0' or empty string for zero values
 * @returns {string} - Formatted number string
 */
export const formatListNumber = (num, showZero = true) => {
  if (num === null || num === undefined || num === '') {
    return showZero ? '0' : '';
  }

  const number = parseInt(num);

  if (isNaN(number)) {
    return showZero ? '0' : '';
  }

  if (number === 0) {
    return showZero ? '0' : '';
  }

  return formatNumber(number);
};