import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../utils/SearchContext';
import { useBlogs } from '../utils/BlogsContext';

const BlogContent = () => {
    const { results } = useSearch(); // 获取搜索结果
    const languageCode = window.location.pathname.split('/')[1] || 'en';
    const { blogs, setBlogs, skip, setSkip, hasMoreRef,scrollPosition,preserveScrollPosition   } = useBlogs();
    const [isLoading, setIsLoading] = useState(false);
    const loader = useRef(null);
    const isLoadingRef = useRef(false);

    const displayBlogs = results.length > 0 ? results : blogs;

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !isLoading && hasMoreRef.current) {
            setSkip((prevSkip) => prevSkip + 10);
        }
    };
    
    useEffect(() => {
        // 组件挂载时，滚动到之前保存的位置
        window.scrollTo(0, scrollPosition.current);

        // 组件卸载前，保存当前滚动位置
        return () => {
            if (!preserveScrollPosition.current) {
                scrollPosition.current = window.scrollY;
            } else {
                // 如果preserveScrollPosition为true，表示不需要更新滚动位置
                // 可能需要重置preserveScrollPosition，以便下次正常保存滚动位置
                preserveScrollPosition.current = false;
            }
        };
    }, []); // 依赖数组为空表示这个effect只在组件挂载和卸载时运行

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) {
            observer.observe(loader.current);
        }

        // Clean up the observer on component unmount
        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    useEffect(() => {
        if ((blogs.length === 0 || blogs.length<=skip) && hasMoreRef.current && !isLoadingRef.current) {
            loadBlogs();
        }
    }, [skip]);

    const loadBlogs = async () => {
        if (!hasMoreRef.current || isLoadingRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs?skip=${skip}&limit=10`);
            if (!response.ok) throw new Error('Network response was not ok');
            const newBlogs = await response.json();
            setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
            hasMoreRef.current = newBlogs.length === 10;
        } catch (error) {
            console.error('Failed to load blogs:', error);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    };

    // 日期格式化函数
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options); // 使用 'en-US' 作为locale
    };
    
    const handleLinkClick = () => {
        scrollPosition.current = window.scrollY;
        preserveScrollPosition.current = true; // 设置标志位
    };

    return (
        <div className="w-full md:w-1/2 p-4">
            {isLoading && <div className="space-y-2 animate-pulse w-full min-h-screen rounded-2xl flex  items-start flex-col bg-white">
                {Array.from({ length: 5 }).map((_) => ( // Assuming you want 5 placeholder items
                    <>
                        <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                        <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                    </>
                ))}
            </div>}
            {displayBlogs.map((blog) => (
                <div key={blog.id} className="border-b-2 border-slate-100 p-4 mb-4">
                    <Link to={`/${languageCode}/blog/${blog.id}`} onClick={handleLinkClick} state={{ markdownUrl: blog.markdown_url }}>
                        {/* <p className="text-gray-500 text-sm mt-2">{formatDate(blog.created_at)}</p> */}
                        <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
                        <p className="text-gray-400 mt-2">{blog.thumbnail_content}...</p>
                        <p className="text-gray-500 text-sm mt-2">{formatDate(blog.created_at)}</p>
                    </Link>
                </div>
            ))}
            {/* 触发器元素，放在内容列表末尾 */}
            <div ref={loader} style={{ height: '1px' }}></div>
        </div>
    );
};

export default BlogContent;
