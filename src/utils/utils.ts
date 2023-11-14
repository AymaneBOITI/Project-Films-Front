export const constructImageUrl = (path: string): string => {
    return `https://image.tmdb.org/t/p/original/${path}`;
};

export const constructYoutubeUrl = (key: string): string => {
    return `https://www.youtube.com/watch?v=${key}`;
};

export const getBrowserLanguage = (): string => {
    const language = navigator.language;
    return language.startsWith('fr') ? 'fr-FR' : 'en-US';
};

export const prefersDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const toggleBodyClass = (className: string, force: boolean): void => {
    document.body.classList.toggle(className, force);
};
