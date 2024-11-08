export const formatNumberOneDecimal = (number) => {
    if (!number) return ''
    return number.toFixed(1);
};

export function calculateDiscount(originalPrice, discountPrice) {
    if (!originalPrice || !discountPrice || originalPrice <= discountPrice) {
        return "0";
    }
    const discountPercentage = ((originalPrice - discountPrice) / originalPrice) * 100;
    return discountPercentage.toFixed(0);
}