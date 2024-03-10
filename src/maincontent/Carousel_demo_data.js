// import React, { useState, useEffect } from 'react';
// import image1 from '../assets/carousel/670efa27-363e-44ed-b918-d58f49063778.jpg';
// import image2 from '../assets/carousel/Frame 15.png';
// import image3 from '../assets/logo.png';
// import CountdownCircle from './CountdownCircle';

// const Carousel = () => {

//     const images = [
//         { src: image1, caption: 'red传说神农时代，中国人已经认识并利用茶，考古证明人工种植茶树的历史超过六千年。' },
//         { src: image2, caption: 'oMeoo a ' },
//         { src: image3, caption: 'logo以茶为媒，交融互鉴，茶是承载历史和文化的“中国名片”。' },
//     ];
//     const [current, setCurrent] = useState(0);
//     const [isCountdownComplete, setIsCountdownComplete] = useState(false);
//     const changeTime = 10000; // Duration of the countdown in milliseconds

//     const [cursorType, setCursorType] = useState('default');

//     const [isCountdownPaused, setIsCountdownPaused] = useState(false); // 新增状态来跟踪计时器是否暂停


//     useEffect(() => {
//         if (isCountdownComplete) {
//             handleNext();
//         }
//     }, [isCountdownComplete]);


//     useEffect(() => {
//         setIsCountdownComplete(false); // Reset the countdown when the image changes
//     }, [current]);

//     const handleNext = () => {
//         setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
//     };

//     const handlePrev = () => {
//         setCurrent((prevCurrent) => (prevCurrent - 1 + images.length) % images.length);
//     };

//     const handleImageClick = (e) => {
//         const rect = e.target.getBoundingClientRect();
//         const xPos = e.clientX - rect.left; // Get the x position within the element
//         if (xPos < rect.width / 2) {
//             handlePrev(); // If click is on the left side, go to the previous image
//         } else {
//             handleNext(); // If click is on the right side, go to the next image
//         }
//     };

//     const handleMouseMove = (event) => {
//         const { offsetX, target } = event.nativeEvent;
//         const width = target.clientWidth;
//         if (offsetX < width / 2) {
//             setCursorType('url(/assets/left-arrow.png), auto'); // 设置为左箭头
//         } else {
//             setCursorType('url(/assets/right-arrow.png), auto'); // 设置为右箭头
//         }
//     };

//     // 在bg-green-300区域添加鼠标事件监听来控制倒计时的暂停和恢复
//     const handleMouseEnter = () => setIsCountdownPaused(true);
//     const handleMouseLeave = () => setIsCountdownPaused(false);

//     return (
//         <div className="flex flex-col shadow-md relative w-full mb-4 sm:mb-5 md:mb-6 lg:mb-7 rounded-2xl">
//             <div
//                 className="w-full"
//                 onClick={handleImageClick}
//                 onMouseMove={handleMouseMove}
//                 style={{ cursor: cursorType }} // 使用状态控制光标样式
//             >
//                 <div className="w-full h-48  md:h-160 overflow-hidden rounded-2xl">
//                     <img
//                         src={images[current].src}
//                         alt="Carousel"
//                         className="w-full h-full object-fill rounded-2xl transition-height duration-300"
//                     />
//                     <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//                     <CountdownCircle
//                       key={current} // Add a key that changes with the current image index
//                         duration={changeTime}
//                         onComplete={() => {
//                             setIsCountdownComplete(true);
//                         }}
//                         isCountdownPaused={isCountdownPaused} // 传递isCountdownPaused状态
//                     />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
    
// };

// export default Carousel;