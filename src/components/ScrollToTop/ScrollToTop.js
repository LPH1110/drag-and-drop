import React, { useEffect } from 'react';

function ScrollToTop({ children }) {
    console.log('Scroll to top!');
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);
    return children;
}

export default ScrollToTop;
