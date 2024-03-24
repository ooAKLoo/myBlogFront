import React, { useState } from 'react';

const EditBlogModalContent = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [blog, setBlog] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // 新增状态来存储消息和消息类型
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSearch = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_TITLE_SEARCH}?title=${searchTitle}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // 假设我们只处理第一个搜索结果
        if (data.length > 0) {
            setBlog(data[0]); // 设置要编辑的博客数据
            setIsEditing(true); // 允许编辑
            setFormData({ // 初始化表单数据
                title: data[0].title,
                id: data[0].id,
                tags: data[0].tags.join(", "), // 假设tags是一个字符串数组
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // 将tags字符串转换为数组
        const tagsArray = formData.tags.split('，').map(tag => tag.trim());
        const updatedFormData = {
            ...formData,
            tags: tagsArray,
        };

        const updateUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_UPDATE.replace('{post_id}', blog.id)}`;

        // 发起更新请求
        const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
        });

        // 根据响应结果处理
        if (response.ok) {
            setMessage('博客更新成功');
            setMessageType('success');
            // ... 在这里执行成功后的状态更新或者页面跳转等操作 ...
        } else {
            setMessage('更新失败: ');
            setMessageType('error');
        }
    };



    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, .1)' }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="搜索博客标题..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', width: 'calc(100% - 120px)' }}
                />
                <button onClick={handleSearch} style={{ padding: '10px', width: '100px' }}>
                    搜索
                </button>
            </div>
            {isEditing && (
                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{key}</label>
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleChange}
                                style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>
                    ))}
                    <button type="submit" style={{ padding: '10px', width: '100%', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        提交
                    </button>
                </form>
            )}
            {message && (
                <div style={{
                    marginTop: '20px',
                    color: messageType === 'error' ? '#d32f2f' : '#388e3c',
                    backgroundColor: messageType === 'error' ? '#ffcccb' : '#c8e6c9',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                }}>
                    {message}
                </div>
            )}
        </div>

    )
};

export default EditBlogModalContent;
