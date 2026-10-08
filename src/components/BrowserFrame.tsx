import { useState, type SyntheticEvent } from 'react';

interface BrowserFrameProps {
    images: string[];
    alt: string;
    url?: string;
    /** Taller viewport for detail pages. */
    large?: boolean;
}

const hostOf = (url?: string) => {
    if (!url) return 'localhost:3000';
    try {
        return new URL(url).host + new URL(url).pathname.replace(/\/$/, '');
    } catch {
        return url;
    }
};

// Phone-sized screenshots are letterboxed instead of cropped.
const fitImage = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.classList.toggle('is-portrait', img.naturalHeight > img.naturalWidth * 0.9);
};

export function BrowserFrame({ images, alt, url, large = false }: BrowserFrameProps) {
    const [index, setIndex] = useState(0);
    const current = images[index] ?? images[0];

    return (
        <div className={`browser${large ? ' browser--large' : ''}`}>
            <div className="browser__bar">
                <span className="window-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </span>
                <span className="browser__url">{hostOf(url)}</span>
            </div>
            <div className="browser__view">
                <img key={current} src={current} alt={`${alt} — screenshot ${index + 1} of ${images.length}`} loading="lazy" onLoad={fitImage} />
            </div>
            {images.length > 1 && (
                <div className="browser__shots" role="group" aria-label="Screenshots">
                    {images.map((image, i) => (
                        <button
                            key={image}
                            type="button"
                            className={i === index ? 'is-active' : undefined}
                            aria-label={`Show screenshot ${i + 1}`}
                            aria-pressed={i === index}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
