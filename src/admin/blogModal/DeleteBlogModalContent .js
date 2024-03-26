import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../modifier/LoadingSpinner ';

const DeleteBlogModalContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [deletingBlogId, setDeletingBlogId] = useState(null); // 正在删除的博客ID
  const [hoveredBlogId, setHoveredBlogId] = useState(null); // 鼠标悬停的博客ID

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/blog`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data.map(blog => ({ id: blog.id, title: blog.title })));
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    setDeletingBlogId(blogId); // 在开始删除之前，设置正在删除的博客ID
    const deleteUrl = `${process.env.REACT_APP_API_URL}/blog/${blogId}`;

    try {
      const response = await fetch(deleteUrl, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('博客删除成功');
    } catch (error) {
      console.error('删除博客失败', error);
      alert('博客删除失败');
    } finally {
      setDeletingBlogId(null); // 删除完成后，清除正在删除的博客ID
    }
  };

 return (
    <div className="overflow-auto ">
      {blogs.map((blog) => (
        <div 
          key={blog.id} 
          className={`flex justify-between items-center p-2 ${hoveredBlogId === blog.id ? 'bg-gray-200' : ''}`}
          onMouseEnter={() => setHoveredBlogId(blog.id)} // 鼠标进入时设置hoveredBlogId
          onMouseLeave={() => setHoveredBlogId(null)} // 鼠标离开时清空hoveredBlogId
        >
          <span>{blog.title}</span>
          {deletingBlogId === blog.id ? (
            // 显示加载动画
            <LoadingSpinner color="text-red-500" containerClassName="flex justify-center items-center" />
          ) : hoveredBlogId === blog.id ? ( // 只有当鼠标悬停在该行时才显示删除图标
            <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700 opacity-0 hover:opacity-100">
              🗑️
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DeleteBlogModalContent;
