const LeftContent = ({ toc, activeId }) => {
    console.log(`Active ID in LeftContent: ${activeId}`);

    const getIndentLevel = (tagName) => {
        switch (tagName) {
            case 'H1': return '0px';
            case 'H2': return '20px';
            case 'H3': return '40px';
            case 'H4': return '60px';
            case 'H5': return '80px';
            case 'H6': return '100px';
            default: return '0px';
        }
    };


    const handleLinkClick = (event, id) => {
        event.preventDefault(); // 阻止默认的锚点跳转行为
    
        const element = document.getElementById(id);
        if (element) {
            // 计算元素顶部相对于视口顶部的距离
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            
            // 定义你希望元素顶部与视口顶部之间保持的距离
            const offsetTop = 100; // 例如，100px
            
            // 滚动到元素位置，减去希望保持的距离
            window.scrollTo({
                top: elementTop - offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <div className="md:justify-end md:flex md:flex-1 p-4 overflow-y-auto">
            <div className="md:fixed">
                <ul>
                    {toc.map((item, index) => (
                        <li key={index} style={{ paddingLeft: getIndentLevel(item.tagName) }}>
                            <a
                            className={`block ${item.id === activeId ? 'font-bold' : 'font-normal text-gray-400'}`}
                            
                                href={`#${item.id}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};



export default LeftContent