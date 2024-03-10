import React, { useState, useEffect } from 'react';

const CountdownCircle = ({ duration, onComplete, isCountdownPaused }) => {
    const [progress, setProgress] = useState(0);
    const [size, setSize] = useState(50); // SVG尺寸初始值
    const [radius, setRadius] = useState(18); // 圆环半径初始值

    useEffect(() => {
        let timer;
        if (!isCountdownPaused) {
            const step = duration / 100;
            timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress < 100) {
                        return oldProgress + 1;
                    } else {
                        clearInterval(timer);
                        onComplete();
                        return 0;
                    }
                });
            }, step);
        }

        return () => clearInterval(timer);
    }, [duration, onComplete, isCountdownPaused]);

    // 监听窗口尺寸变化
    useEffect(() => {
        function handleResize() {
            // 根据窗口宽度调整大小
            if (window.innerWidth < 640) {
                setSize(40); // 更小的屏幕使用更小的尺寸
                setRadius(14);
            } else {
                setSize(50);
                setRadius(18);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始化尺寸

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg className="absolute bottom-0 right-0 m-4 transition-all duration-300" width={size} height={size}>
            {isCountdownPaused ? (
                <>
                    {/* 暂停符号：两个矩形 */}
                    <rect x={size * 0.36} y={size * 0.3} width={size * 0.08} height={size * 0.4} fill="white"/>
                    <rect x={size * 0.56} y={size * 0.3} width={size * 0.08} height={size * 0.4} fill="white"/>
                </>
            ) : (
                <>
                    {/* 倒计时圆环 */}
                    <circle
                    className=' stroke-oliver-green'
                        fill="transparent"
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset }}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </>
            )}
        </svg>
    );
};

export default CountdownCircle;
