import React, { useState, useEffect } from 'react';
import CountdownCircle from './CountdownCircle';

const Carousel = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isCountdownComplete, setIsCountdownComplete] = useState(false);
    const changeTime = 5000; // Duration of the countdown in milliseconds
    const [cursorType, setCursorType] = useState('default');
    const [isCountdownPaused, setIsCountdownPaused] = useState(false);

    useEffect(() => {
        // 在组件加载时获取图片数据
        const fetchData = async () => {
            const response = await fetch('https://dongju.obs.cn-north-4.myhuaweicloud.com/CN/carousel/carousel.json');
            console.log('response.body=',response.body)
            const data = await response.json();
            setImages(data);
        };

        fetchData().catch(console.error);
    }, []); // 空依赖数组表示这个effect仅在组件加载时运行一次

    useEffect(() => {
        if (isCountdownComplete) {
            setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
            setIsCountdownComplete(false);
        }
    }, [isCountdownComplete, images.length]);

    useEffect(() => {
        setIsCountdownComplete(false);
    }, [current]);

    const handleNext = () => {
        setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrent((prevCurrent) => (prevCurrent - 1 + images.length) % images.length);
    };

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        if (xPos < rect.width / 2) {
            handlePrev();
        } else {
            handleNext();
        }
    };

    const handleMouseMove = (event) => {
        const { offsetX, target } = event.nativeEvent;
        const width = target.clientWidth;
        if (offsetX < width / 2) {
            setCursorType('url(/assets/left-arrow.png), auto');
        } else {
            setCursorType('url(/assets/right-arrow.png), auto');
        }
    };

    const handleMouseEnter = () => setIsCountdownPaused(true);
    const handleMouseLeave = () => setIsCountdownPaused(false);

    return (
        <div className="flex flex-col shadow-md relative w-full mb-4 sm:mb-5 md:mb-6 lg:mb-7 rounded-2xl">
            {images.length > 0 && (
                <div
                    className="w-full"
                    onClick={handleImageClick}
                    onMouseMove={handleMouseMove}
                    style={{ cursor: cursorType }}
                >
                    <div className="w-full h-48  md:h-160 overflow-hidden rounded-2xl">
                        <img
                            src={images[current].url}
                            alt="Carousel"
                            className="w-full h-full object-fill rounded-2xl transition-height duration-300"
                        />
                           <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <CountdownCircle
                      key={current} // Add a key that changes with the current image index
                        duration={changeTime}
                        onComplete={() => setIsCountdownComplete(true)}
                        isCountdownPaused={isCountdownPaused}
                    />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
