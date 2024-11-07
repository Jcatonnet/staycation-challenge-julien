export const formatNumberOneDecimal = (number) => {
    if (!number) return ''
    return number.toFixed(1);
};