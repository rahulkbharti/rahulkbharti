import React, { useState, useEffect, useRef } from 'react';

// --- Aapka Typing Effect Component ---

interface TypingEffectProps {
    /** Array of strings (roles) to type out */
    roles: string[];
    /** Speed of typing in ms */
    typingSpeed?: number;
    /** Speed of deleting in ms */
    deletingSpeed?: number;
    /** Pause duration after typing a role in ms */
    pauseDuration?: number;
}

/**
 * A React component that creates a "typing and deleting" effect for an array of strings.
 */
export const TypingEffect: React.FC<TypingEffectProps> = ({
    roles,
    typingSpeed = 70,
    deletingSpeed = 50,
    pauseDuration = 1500,
}) => {
    // State to hold the text being displayed
    const [displayText, setDisplayText] = useState('');

    // Refs to manage the animation state without causing re-renders
    const roleIndexRef = useRef(0); // Which role we are on
    const charIndexRef = useRef(0); // Which character we are on
    const isDeletingRef = useRef(false); // Are we deleting?
    const timeoutRef = useRef<number | null>(null); // To store the timeout ID

    useEffect(() => {
        // If no roles, do nothing
        if (!roles || roles.length === 0) return;

        // This function handles the logic for one "tick" of the animation
        const handleTyping = () => {
            const currentRole = roles[roleIndexRef.current];
            let currentSpeed = typingSpeed;

            if (isDeletingRef.current) {
                // --- DELETING LOGIC ---
                setDisplayText(currentRole.substring(0, charIndexRef.current - 1));
                charIndexRef.current -= 1;
                currentSpeed = deletingSpeed;

                // Check if deletion is complete
                if (charIndexRef.current === 0) {
                    isDeletingRef.current = false;
                    roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
                    // No pause here, immediately start typing next role
                }
            } else {
                // --- TYPING LOGIC ---
                setDisplayText(currentRole.substring(0, charIndexRef.current + 1));
                charIndexRef.current += 1;

                // Check if typing is complete
                if (charIndexRef.current === currentRole.length) {
                    isDeletingRef.current = true;
                    currentSpeed = pauseDuration; // Pause before deleting
                }
            }

            // Call itself again after the calculated speed
            timeoutRef.current = setTimeout(handleTyping, currentSpeed);
        };

        // Start the animation
        timeoutRef.current = setTimeout(handleTyping, typingSpeed);

        // Cleanup function: This runs when the component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [roles, typingSpeed, deletingSpeed, pauseDuration]); // Re-run if props change

    // Render the text and the blinking cursor
    return (
        <span className="typing-effect">
            {displayText}
            <span className="typing-cursor" aria-hidden="true"></span>
        </span>
    );
};

