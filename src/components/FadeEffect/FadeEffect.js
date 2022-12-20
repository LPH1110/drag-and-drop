import React from 'react';
import { Fade } from 'react-awesome-reveal';

function FadeEffect({ children, direction, damping = 0.2 }) {
    const config = {
        duration: 1000,
        triggerOnce: true,
    };
    return (
        <Fade damping={damping} cascade direction={direction} {...config}>
            {children}
        </Fade>
    );
}

export default FadeEffect;
