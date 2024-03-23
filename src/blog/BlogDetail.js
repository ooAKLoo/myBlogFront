import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import LeftContent from './LeftContent ';
import PlaceHolder from '../utils/PlaceHolder';
import { gfmHeadingId } from "marked-gfm-heading-id";
import 'github-markdown-css';


const options = {
    prefix: "",
};

marked.use(gfmHeadingId(options));

// 定义从HTML字符串中提取目录信息的函数
const buildTocFromHtml = (html) => {
    const headers = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(header => {
        headers.push({
            text: header.textContent,
            id: header.id, // 注意: Markdown转HTML时需确保id被正确设置
            tagName: header.tagName
        });
    });
    return headers;
};

const BlogDetail = () => {
    let { id } = useParams();

    const [content, setContent] = useState('');

    const [toc, setToc] = useState([]); // 定义toc状态

    const [activeId, setActiveId] = useState('');

    // State to manage whether the content is loading
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // 根据id选择对应的Markdown文件
        const fileName = id === '0' ? 'bt.md' : id === '1' ? 'bt2.md' : id === '2' ? 'bt3.md' : null;
        if (fileName) {
            // 构造文件的URL
            const fileUrl = `https://dongju.obs.cn-north-4.myhuaweicloud.com/${fileName}`;

            // 获取并显示Markdown文件的内容
            fetch(fileUrl)
                .then((response) => {
                    console.log(`Response Status: ${response.status}`); // 检查响应状态
                    return response.text();
                })
                .then((text) => {
                    // 使用marked解析Markdown内容
                    const html = marked(text);

                    setContent(html);

                    // 使用上述函数从转换后的HTML构建toc
                    const newToc = buildTocFromHtml(html);
                    setToc(newToc);
                    setIsLoading(false);
                })
                .catch((err) => console.error(`Fetching or parsing failed:`, err));
        } else {
            console.log("Invalid ID or file name not found.");
        }
    }, [id]); // 确保id作为依赖，以便于参数变化时重新触发

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

    useEffect(() => {
        const handleScroll = () => {
            let closestId = '';
            let closestDistance = Infinity;
            toc.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) {
                    const distance = Math.abs(element.getBoundingClientRect().top);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestId = item.id; // 这里更新closestId
                    }
                }
            });

            if (closestId !== activeId) { // 只有当最接近的ID变化时才更新
                setActiveId(closestId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [toc, activeId]); // 依赖于toc和activeId变化


    useEffect(() => {
        if (content) {
            setTimeout(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    // 防止重复添加按钮
                    if (block.parentNode.querySelector('button')) {
                        return;
                    }
                    const btn = document.createElement('button');
                    btn.textContent = 'Copy';
                    btn.style.marginRight = '10px';
                    btn.style.padding = '5px';
                    btn.onclick = function () {
                        navigator.clipboard.writeText(block.textContent)
                            .then(() => {
                                // 使用更微妙的用户反馈
                                const originalText = btn.textContent;
                                btn.textContent = 'Copied!';
                                setTimeout(() => btn.textContent = originalText, 2000); // 2秒后恢复原始文字
                            })
                            .catch(err => console.error('Error copying text: ', err));
                    };
                    block.parentNode.insertBefore(btn, block);
                });
            }, 0);
        }
    }, [content]);


    return (
        <div
            style={{
                width: isWideScreen ? `${window.innerWidth / 1.3}px` : '100%',
                margin: 'auto',
            }}
            className="flex flex-col md:flex-row min-h-screen"
        >
            {isLoading ? (
                <div className="space-y-2 animate-pulse w-full min-h-screen rounded-2xl flex justify-center items-start flex-col bg-white">
                    <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                </div>
            ) : (
                <>
                    {/* 显示解析后的Markdown内容 */}
                    <LeftContent toc={toc} activeId={activeId} />
                    <div className="w-full md:w-1/2 p-4 markdown-body" dangerouslySetInnerHTML={{ __html: content }} />

                    {/* <div className="w-full md:w-1/2 p-4" dangerouslySetInnerHTML={{ __html: content }} /> */}
                    <PlaceHolder />
                </>
            )}
        </div>
    );
};

export default BlogDetail;
