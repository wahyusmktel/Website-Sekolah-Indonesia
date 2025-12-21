export const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return String(dateString);

    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

export const formatDateTime = (dateString: string | Date | undefined) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return String(dateString);

    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};
