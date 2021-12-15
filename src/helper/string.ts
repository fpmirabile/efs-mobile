export const formatNumberToLocaleString = (numberToFormat: number): string => {
  return numberToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
