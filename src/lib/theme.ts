import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

// index.html sets data-theme before first paint; this store just keeps React in sync with it.
const getTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem('theme', theme);
    } catch {
        // storage blocked — the choice just won't persist
    }
    listeners.forEach((listener) => listener());
}

export const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark');

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, (): Theme => 'light');
