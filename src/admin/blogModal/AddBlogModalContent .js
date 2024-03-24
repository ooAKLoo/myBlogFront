import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const AddBlogModalContent = () => {
    const [fileInfo, setFileInfo] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]); // 用于存储上传的图片信息
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    // 处理文件选择事件
    const handleFileSelect = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;
                setFileContent(text); // 保存文件内容到状态
            };

            reader.readAsText(file); // 读取文件内容为文本

            // 设置文件信息到状态
            setFileInfo({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2), // 转换为MB并保留两位小数
            });
        }
    };

    // 处理图片文件选择事件
    const handleImageSelect = (event) => {
        if (event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            const imagesInfo = files.map(file => ({
                name: file.name,
                file: file, // 保存文件对象本身
                url: URL.createObjectURL(file) // 依然保存URL以便显示预览
            }));

            setUploadedImages(imagesInfo);
        }
    };


    // 组件卸载时释放URL
    useEffect(() => {
        return () => {
            uploadedImages.forEach(image => URL.revokeObjectURL(image.url));
        };
    }, [uploadedImages]);

    // 注意：这里省略了import语句和其他组件代码

    // 异步辅助函数，用于处理图片下载和本地文件添加
    const prepareImageFormData = async (markdownText, formData) => {
        const images = extractImages(markdownText); // 提取Markdown中的图片URL

        images.forEach((url, index) => {
            const imageName = decodeURIComponent(url.split('/').pop()); // 解码URL获取文件名
            const imageFile = uploadedImages.find(img => img.name === imageName)?.file; // 查找对应的图片文件对象

            if (imageFile) {
                formData.append('images', imageFile); // 对于每个文件
                formData.append('images_urls', url); // 对于每个URL

            } else {
                console.log(`No matching file found for ${imageName}.`);
            }
        });
    };

    // handleSubmit函数中使用prepareImageFormData来简化逻辑
    const handleSubmit = async () => {
        setIsSubmitting(true); // 开始提交, 显示处理中状态
        const API_URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BLOG_ADD}`;
        const formData = new FormData();
        formData.append('markdown', fileContent);
        formData.append('title', title); // 添加标题
        formData.append('tags', tags); // 添加标签，假设标签是以逗号分隔的字符串

        await prepareImageFormData(fileContent, formData);

        // 使用Array.from将formData的entries转换成数组，然后打印
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Upload successful:', responseData);
            } else {
                console.error('Upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false); // 完成提交, 隐藏处理中状态
        }
    };




    // 使用marked解析Markdown文本并提取图片链接
    const extractImages = (markdownText) => {
        const imageRegex = /!\[.*?\]\((.*?)\)/g; // Standard markdown image regex
        const images = [];
        let match;

        // Use a while loop to continue executing the regex search until no more matches are found
        while ((match = imageRegex.exec(markdownText)) !== null) {
            // The first capture group in the regex is the URL of the image
            images.push(match[1]);
        }
        return images;
    };

    return (
        <div className="flex flex-col justify-between items-center w-full h-full relative p-4">
            <div className="flex flex-col w-full">
                <input
                    type="text"
                    placeholder="文章标题"
                    className="mb-4 p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="标签（用逗号分隔）"
                    className="mb-4 p-2 border rounded"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <label htmlFor="file-upload" className="cursor-pointer bg-slate-200 p-2 rounded self-start mb-2">
                    点击上传文件
                </label>
                {fileInfo && (
                    <div className="text-gray-600 mb-2">
                        <p>文件名: {fileInfo.name}</p>
                        <p>文件大小: {fileInfo.size} MB</p>
                    </div>
                )}
                <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} accept=".md" />
                <label htmlFor="image-upload" className="cursor-pointer bg-slate-200 p-2 rounded self-start">
                    上传图片
                </label>
                <input id="image-upload" type="file" className="hidden" onChange={handleImageSelect} accept="image/*" multiple />
            </div>


            <div className="flex flex-wrap w-full justify-start gap-4 mt-4 overflow-auto" style={{ maxHeight: '400px' }}>
                {uploadedImages.map((image, index) => (
                    <img key={index} src={image.url} alt={image.name} style={{ width: '100px', height: '100px' }} />
                ))}
            </div>


            <button
                className="flex px-4 py-2 bg-slate-200 rounded mt-4"
                onClick={handleSubmit}
                disabled={isSubmitting} // 在提交时禁用按钮
            >
                {isSubmitting ? (
                    <>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : '提交'
                }
            </button>

        </div>
    );
};

export default AddBlogModalContent;
