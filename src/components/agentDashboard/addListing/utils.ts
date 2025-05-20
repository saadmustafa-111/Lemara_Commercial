/**
 * Utility function to convert string "true"/"false" or boolean values to boolean type
 * Used for properly handling checkbox values in form data
 */
export const isChecked = (value: any): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  return value === 'true';
};
