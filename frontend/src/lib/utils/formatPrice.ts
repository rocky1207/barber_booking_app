export const formatPrice = (price: string | number): string => {
    const number = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('sr-SR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}