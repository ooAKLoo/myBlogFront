import React, { useState, useEffect, useRef } from 'react';

const TypingCaption = ({ text, speed, onComplete }) => {
    const [caption, setCaption] = useState('');
    const isComplete = useRef(false);

    useEffect(() => {
        if (isComplete.current) {
            return;
        }

        let index = -1;
        setCaption('');

        const timer = setInterval(() => {
            if (index < text.length) {
                setCaption(text.substring(0, index + 1));
                index++;
            } else {
                onComplete();
                isComplete.current = true;
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    useEffect(() => {
        // Reset typing effect only when the text changes
        isComplete.current = false;
    }, [text]);

    return (
        <p className="text-black  p-2 sm:text-base md:text-lg md:tracking-tight lg:text-xl lg:leading-normal lg:tracking-wider xl:text-3xl xl:leading-loose xl:tracking-widest">
          {'\u00A0\u00A0'}{caption}
        </p>
      );
      
      
      
};

export default TypingCaption;