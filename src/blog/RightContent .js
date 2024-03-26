import React, { useEffect, useState } from 'react';
import { useSearch } from '../utils/SearchContext';

const RightContent = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const { performTagSearch,resetResults  } = useSearch(); // 从context中获取performTagSearch方法

    const handleTagClick = (tagName) => {
        setSelectedTag(prevSelectedTag => {
            if (prevSelectedTag === tagName) {
                // 如果点击的标签已被选中，则取消选中，并重置搜索结果
                resetResults();
                return null; // 取消选中
            } else {
                // 否则，设置为选中状态，并根据新的标签名进行搜索
                performTagSearch(tagName);
                return tagName; // 设置选中标签
            }
        });
    };

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_TAGS_QUERY}`);
            const data = await response.json();
            setTags(data);
        };

        fetchTags();
    }, []);

    return (
        <div className="flex-1 p-4  overflow-hidden ">
            <div className="p-4 md:p-6">
                <div className="mt-3 max-w-lg mx-auto">
                    <ul className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <li
                                key={index}
                                className={` text-sm font-medium mr-2 mb-2 p-2 rounded-md cursor-pointer ${selectedTag === tag.name ? ' bg-amber-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                onClick={() => handleTagClick(tag.name)}
                            >
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RightContent;
