export const getImageUrl = (path: string | null | undefined) => {
    if (!path) return "/placeholder-image.jpg";
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    return `${baseUrl}${path}`;
};
