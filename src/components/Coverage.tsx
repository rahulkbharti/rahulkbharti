import { LAYERS, type LayerId } from '../data/layers';
import { layerVar } from '../lib/ui';

interface CoverageProps {
    layers: LayerId[];
    /** Print the layer name under each cell. */
    labeled?: boolean;
    size?: 'sm' | 'md';
}

/** Six cells, one per stack layer — filled when the work touches that layer. */
export function Coverage({ layers, labeled = false, size = 'md' }: CoverageProps) {
    const touched = new Set(layers);
    const names = LAYERS.filter((layer) => touched.has(layer.id)).map((layer) => layer.name);

    return (
        <div
            className={`coverage coverage--${size}${labeled ? ' coverage--labeled' : ''}`}
            role="img"
            aria-label={`Stack layers: ${names.join(', ')}`}
        >
            {LAYERS.map((layer) => (
                <span
                    key={layer.id}
                    className={touched.has(layer.id) ? 'is-on' : undefined}
                    style={layerVar(layer.id)}
                    title={layer.name}
                >
                    {labeled && <em>{layer.short}</em>}
                </span>
            ))}
        </div>
    );
}
