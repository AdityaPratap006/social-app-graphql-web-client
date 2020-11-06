export const getLocalDateString = (date: string | Date) => {
    let givenDate: Date;

    if (typeof date === 'string') {
        givenDate = new Date(date);
    } else {
        givenDate = date;
    }

    const localDateString = givenDate.toLocaleDateString("en-US", {
        hour12: true,
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
    });

    return localDateString;
}