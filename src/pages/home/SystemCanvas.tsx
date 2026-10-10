import { useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';
import type { LayerId } from '../../data/layers';
import { useTheme } from '../../lib/theme';
import { createSystemScene, type SystemScene } from './systemGraph';

interface SystemCanvasProps {
    stageRef: RefObject<HTMLElement | null>;
    /** Hero scroll progress, 0 → 1; tilts the camera as the hero scrolls away. */
    scroll: MotionValue<number>;
    /** How far the featured request has got — read by the trace card. */
    step: MotionValue<number>;
    /** The node being pointed at, from either the canvas or the trace card. */
    focus: MotionValue<string | null>;
    onPick: (layer: LayerId) => void;
}

export function SystemCanvas({ stageRef, scroll, step, focus, onPick }: SystemCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<SystemScene | null>(null);
    const pickRef = useRef(onPick);
    const theme = useTheme();
    const reducedMotion = useReducedMotion() ?? false;

    useEffect(() => {
        pickRef.current = onPick;
    }, [onPick]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const stage = stageRef.current;
        if (!canvas || !stage) return;

        const scene = createSystemScene({
            canvas,
            stage,
            reducedMotion,
            getScroll: () => scroll.get(),
            getFocus: () => focus.get(),
            onFocus: (id) => focus.set(id),
            onStep: (value) => step.set(value),
            onPick: (layer) => pickRef.current(layer),
        });
        sceneRef.current = scene;
        return () => {
            scene.destroy();
            sceneRef.current = null;
        };
    }, [stageRef, scroll, step, focus, reducedMotion]);

    useEffect(() => {
        sceneRef.current?.refreshTheme();
    }, [theme]);

    // The loop picks focus up on its own; this repaints when it is paused (reduced motion).
    useMotionValueEvent(focus, 'change', () => sceneRef.current?.invalidate());

    return <canvas ref={canvasRef} className="hero__canvas" />;
}
