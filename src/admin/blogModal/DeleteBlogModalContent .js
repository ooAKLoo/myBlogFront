import React, { useEffect, useState } from 'react';

const DeleteBlogModalContent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // 获取博客列表
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/blog`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Raw data=", data);
        // 因为现在后端已经正确地将_id转换为字符串，你可以直接使用它
        const blogs = data.map(blog => ({
          id: blog.id,  // 确保这里的属性名与你的API响应匹配
          title: blog.title,
        }));
        console.log("data=", blogs);
        setBlogs(blogs);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
  
    fetchBlogs();
  }, []);
  

  const handleDelete = async (blogId) => {
    console.log("blogId=", blogId);
    const deleteUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_DELETE.replace('{post_id}', blogId)}`;
  
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 从列表中移除已删除的博客
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('博客删除成功');
    } catch (error) {
      console.error('删除博客失败', error);
      alert('博客删除失败');
    }
  };
  

  return (
    <div className="overflow-auto max-h-96">
      {blogs.map((blog) => (
        <div key={blog.id} className="flex justify-between items-center p-2">
          <span>{blog.title}</span>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(blog.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeleteBlogModalContent;
