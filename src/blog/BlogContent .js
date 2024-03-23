import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogContent = () => {
    const location = useLocation();
    const languageCode = window.location.pathname.split('/')[1] || 'en';
    // 模拟博客条目数据
    const blogs = [
        {
            title: "我的第一个博客",
            content: "这是我的第一个博客条目，内容包含了对React的探索和学习。古风口几个还是丢哦复归于上帝哦给父元素8对方意思的反应iu无法因为一个返回网易福娃也服务于覅u微涩堵塞改好发我iu额法国i五十分归为的风格会使对方骨灰撒到是否会进口设备的库建立覆盖八四u的风格设定风格和史蒂芬公司丢分公司丢翻噶是丢法国说的话覅u说的话官方viu受到核辐射的",
            date: "2024-03-23",
        },
        {
            title: "探索Tailwind CSS",
            content: "在这篇博客中，我将分享我使用Tailwind CSS构建响应式设计的经验。",
            date: "2024-03-24",
        },
        {
            title: "学习Python的心得体会",
            content: "我在学习Python编程语言时，发现了一些有趣的特性和技巧，现在我来分享给大家。",
            date: "2024-03-25",
        },
        {
            title: "游记：探访北京故宫",
            content: "我最近去了北京故宫，这是一次令人难忘的旅行，我将和大家分享我的见闻和感受。",
            date: "2024-03-26",
        },
        {
            title: "如何有效管理时间",
            content: "时间管理对于提高效率和达成目标至关重要。在这篇博客中，我将分享我个人的时间管理技巧和经验。",
            date: "2024-03-27",
        },
        {
            title: "学习如何画素描",
            content: "我一直想学习如何画素描，最近开始了我的绘画之旅，我会记录下我的学习过程和心得。",
            date: "2024-03-28",
        },
        {
            title: "看完了一本好书",
            content: "我最近读完了一本令人震撼的书籍，书中的故事和观点对我产生了深远的影响，我想在这里和大家分享。",
            date: "2024-03-29",
        },
        {
            title: "探讨健康饮食的重要性",
            content: "健康饮食是保持身体健康的关键。在这篇博客中，我将分享一些有关健康饮食的信息和建议。",
            date: "2024-03-30",
        },
        {
            title: "我的运动日记",
            content: "运动对于保持身心健康至关重要。我将在这篇博客中记录我的运动日常和一些健身心得。",
            date: "2024-03-31",
        },
        {
            title: "学习如何做花式咖啡",
            content: "我最近开始学习如何泡一杯精致的花式咖啡，这是一次很有趣的尝试，我将分享我的学习心得。",
            date: "2024-04-01",
        },
        {
            title: "体验户外露营",
            content: "户外露营是一种非常愉快的体验，我将在这篇博客中分享我最近的露营经历和一些注意事项。",
            date: "2024-04-02",
        },
        {
            title: "学习新的编程语言",
            content: "我正在学习一门新的编程语言，这是一次挑战，但也是一次很有意义的经历，我将记录下我的学习进展。",
            date: "2024-04-03",
        }
    ];

    // State to manage whether the content is loading
    const [isLoading, setIsLoading] = useState(true);

    // 日期格式化函数
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        // Simulate content loading with a timeout
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Adjust the timeout duration as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full md:w-1/2 p-4">
            {isLoading ? (
                <div className="space-y-2 animate-pulse w-full min-h-screen rounded-2xl flex  items-start flex-col bg-white">
                    {Array.from({ length: 5 }).map((_, index) => ( // Assuming you want 5 placeholder items
                        <>
                            <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                        </>
                    ))}
                </div>
            ) : (
                <>
                    {blogs.map((blog, index) => (
                        <div key={index} className=" border-b-2 border-slate-100 p-4  mb-4">
                            <Link to={`/${languageCode}/blog/${index}`}> {/* 假设使用索引作为URL的一部分 */}
                                <p className="text-gray-500 text-sm mt-2">{formatDate(blog.date)}</p>
                                <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
                                <p className="text-gray-400 mt-2">{blog.content}</p>
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default BlogContent;
