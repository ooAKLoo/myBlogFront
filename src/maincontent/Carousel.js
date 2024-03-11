import React, { useState, useEffect } from 'react';
import CountdownCircle from './CountdownCircle';

const Carousel = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCountdownComplete, setIsCountdownComplete] = useState(false);
    const changeTime = 5000;
    const [cursorType, setCursorType] = useState('default');
    const [isCountdownPaused, setIsCountdownPaused] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const bucketName = process.env.REACT_APP_BUCKET_NAME;
            const region = process.env.REACT_APP_REGION_CODE;
            const carouselPath = process.env.REACT_APP_CAROUSEL_PATH;
            const carouselJsonUrl = `https://${bucketName}.obs.${region}.myhuaweicloud.com/${carouselPath}`;

            try {
                const response = await fetch(carouselJsonUrl);
                const data = await response.json();
                let loadCounter = 0;
                const imageData = data.map(item => ({ ...item, loaded: false }));
                setImages(imageData);
                imageData.forEach((image, index) => {
                    const img = new Image();
                    img.src = image.url;
                    img.onload = () => {
                        setImages(currentImages => {
                            const newImages = [...currentImages];
                            newImages[index].loaded = true;
                            return newImages;
                        });
                        loadCounter += 1;
                        if (loadCounter === imageData.length) {
                            setIsLoading(false); // 所有图片加载完成后，设置isLoading为false
                        }
                    };
                });
            } catch (error) {
                console.error(error);
                setIsLoading(false); // 出错时也需要设置isLoading为false
            }
        };

        fetchData();
    }, []);

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
        <div className="flex flex-col shadow-md relative w-full mb-4 sm:mb-5 md:mb-6 lg:mb-7 rounded-2xl bg-white">
            {isLoading ? (
                <div className="animate-pulse w-full h-48 md:h-160 rounded-2xl bg-slate-300"></div>
            ) : (
                images.length > 0 && (
                    <div
                        className="w-full"
                        onClick={handleImageClick}
                        onMouseMove={handleMouseMove}
                        style={{ cursor: cursorType }}
                    >
                        <div className="w-full h-80 sm-96 md:h-128 lg:h-144 xl:h-160 2xl:h-208 overflow-hidden rounded-2xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {images[current].loaded ? ( // 根据图片的加载状态决定显示图片或是加载动画
                                <>
                                    <img
                                        src={images[current].url}
                                        alt="Carousel"
                                        className="w-full h-full object-cover rounded-2xl transition-height duration-300"
                                    />

                                    <CountdownCircle
                                        key={current}
                                        duration={changeTime}
                                        onComplete={() => setIsCountdownComplete(true)}
                                        isCountdownPaused={isCountdownPaused}
                                    />

                                </>
                            ) : (
                                <div className="flex justify-center items-center h-full animate-pulse bg-slate-300 rounded-2xl"></div>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Carousel;
