import React from 'react';

const Blog = () => {
    return (
        <>
            <div className="scroll-snap-align-start flex min-h-screen p-28 items-center justify-center transition-opacity duration-1000">
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 animate-slide-and-shrink">
                    <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-7xl text-center font-bold mb-6">
                        Coding
                        <span className="inline-block ml-2">
                            <span className="animate-blink-normal">.</span>
                            <span className="animate-blink-delay-1">.</span>
                            <span className="animate-blink-delay-2">.</span>
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
};

export default Blog;
