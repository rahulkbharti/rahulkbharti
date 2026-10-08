import { useEffect, type CSSProperties } from 'react';
import type { LayerId } from '../data/layers';
import { PROFILE } from '../data/profile';

/** Sets --c to a layer's colour; components read it for dots, bars and accents. */
export const layerVar = (id: LayerId) => ({ '--c': `var(--l-${id})` }) as CSSProperties;

const TOAST_EVENT = 'site:toast';
const PALETTE_EVENT = 'site:palette';

export const toast = (message: string) => window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
export const onToast = (handler: (message: string) => void) => {
    const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
    window.addEventListener(TOAST_EVENT, listener);
    return () => window.removeEventListener(TOAST_EVENT, listener);
};

export const openPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT));
export const onOpenPalette = (handler: () => void) => {
    window.addEventListener(PALETTE_EVENT, handler);
    return () => window.removeEventListener(PALETTE_EVENT, handler);
};

export async function copyEmail() {
    try {
        await navigator.clipboard.writeText(PROFILE.email);
        toast('Email copied to clipboard');
    } catch {
        window.location.href = `mailto:${PROFILE.email}`;
    }
}

export const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

const BASE_TITLE = `${PROFILE.name} — ${PROFILE.role}`;

export function useTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} · ${PROFILE.name}` : BASE_TITLE;
    }, [title]);
}
