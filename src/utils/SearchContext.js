// SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    const performSearch = async (query) => {
        // 使用环境变量来构建完整的请求URL
        const searchURL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_FULLTEXT_SEARCH}?query=${encodeURIComponent(query)}`;

        // 发起请求到全文搜索的API端点
        const response = await fetch(searchURL);
        if (!response.ok) {
            // 处理可能的错误响应
            console.error("Failed to fetch search results:", response.statusText);
            return;
        }

        const data = await response.json();
        setResults(data); // 假设后端返回的是一个数组，更新状态以反映搜索结果
    };

    // SearchContext.js
    const performTagSearch = async (tagName) => {
        // 使用环境变量来构建标签搜索的请求URL
        const searchURL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_TAG_SEARCH}?tag=${encodeURIComponent(tagName)}`;

        // 发起请求到标签搜索的API端点
        const response = await fetch(searchURL);
        if (!response.ok) {
            // 处理可能的错误响应
            console.error("Failed to fetch tag search results:", response.statusText);
            return;
        }

        const data = await response.json();
        setResults(data); // 假设后端返回的是一个数组，更新状态以反映搜索结果
    };

    const resetResults = () => {
        setResults([]); // 重置结果
    };

    return (
        <SearchContext.Provider value={{ results, performSearch, resetResults, performTagSearch }}>
            {children}
        </SearchContext.Provider>
    );

};
