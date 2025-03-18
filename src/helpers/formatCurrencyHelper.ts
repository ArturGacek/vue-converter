export const formatCurrency = (value: number): number => {
  if (value < 1) {
    const decimalPart = value.toString().split('.')[1] || '';
    let firstNonZeroIndex = -1;
    
    for (let i = 0; i < decimalPart.length; i++) {
      if (decimalPart[i] !== '0') {
        firstNonZeroIndex = i;
        break;
      }
    }

    if (firstNonZeroIndex !== -1) {
      const precision = firstNonZeroIndex + 2;
      return parseFloat(value.toFixed(precision));
    }
    
    return parseFloat(value.toFixed(4));
  }
  return parseFloat(value.toFixed(2));
}
