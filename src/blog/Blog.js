import React, { useState, useEffect } from 'react';
import BlogContent from './BlogContent ';
import RightContent from './RightContent ';
import PlaceHolder from '../utils/PlaceHolder';

const Blog = () => {

    // 状态：是否是宽屏模式
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > window.innerHeight);

    // 检测屏幕尺寸变化的效果
    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > window.innerHeight + 1000);
        };
        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        // 组件卸载时移除监听器
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    return (
        <div
            style={{
                width: isWideScreen ? `${window.innerWidth / 1.3}px` : '100%',
                margin: 'auto',
            }}
            className="flex flex-col md:flex-row min-h-screen">
            <PlaceHolder />
            <BlogContent />
            <RightContent />
        </div>
    );

};

export default Blog;
