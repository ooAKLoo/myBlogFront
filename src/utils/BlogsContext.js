// src/contexts/BlogsContext.js
import React, { createContext, useContext, useState,useRef } from 'react';

const BlogsContext = createContext();

export const useBlogs = () => useContext(BlogsContext);

export const BlogsProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [skip, setSkip] = useState(0);
    const hasMoreRef = useRef(true);
    const scrollPosition = useRef(0); // 添加用于保存滚动位置的ref
    const preserveScrollPosition = useRef(false); // 新增标志位

    return (
        <BlogsContext.Provider value={{ blogs, setBlogs, skip, setSkip,hasMoreRef,scrollPosition,preserveScrollPosition   }}>
            {children}
        </BlogsContext.Provider>
    );
};