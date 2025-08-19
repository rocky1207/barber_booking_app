export const formatDate = (date: Date): string => {
    const fullDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    return fullDate;
}