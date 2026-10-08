import { useState } from 'react';
import type { LayerId } from '../../data/layers';
import { useTitle } from '../../lib/ui';
import { Contact } from './Contact';
import { Experience } from './Experience';
import { FeaturedWork } from './FeaturedWork';
import { Hero } from './Hero';
import { Proof } from './Proof';
import { Services } from './Services';
import { StackExplorer } from './StackExplorer';
import { Writing } from './Writing';
import './home.css';

export default function Home() {
    useTitle();
    const [layer, setLayer] = useState<LayerId>('ui');

    // Clicking a plate in the hero opens that layer in the stack explorer.
    const pickLayer = (id: LayerId) => {
        setLayer(id);
        document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <Hero onPickLayer={pickLayer} />
            <FeaturedWork />
            <StackExplorer active={layer} onChange={setLayer} />
            <Experience />
            <Proof />
            <Services />
            <Writing />
            <Contact />
        </>
    );
}
