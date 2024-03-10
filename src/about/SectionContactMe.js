import React, { useState, useEffect, useRef } from 'react';
import hiphop from '../assets/profile/hiphop.png'
import hiking from '../assets/profile/hiking.jpg'
import photography from '../assets/profile/Photography.jpg'
import cooking from '../assets/profile/cooking.jpg'
import eating from '../assets/profile/eating.jpg'
import painting from '../assets/profile/painting.jpg'
import traveling from '../assets/profile/traveling.jpg'
import reading from '../assets/profile/reading.jpg'
import cycling from '../assets/profile/cycling.jpg'
import gaming from '../assets/profile/gaming.png'
import music from '../assets/profile/music.jpg'
import movie from '../assets/profile/movie.png'

const dataList = [
    { name: "Photography", image: photography },
    { name: "Hiking", image: hiking },
    { name: "Cooking", image: cooking},
    { name: "Cycling", image: cycling },
    { name: "Reading", image: reading },
    { name: "Movie", image: movie }, // 这里使用了导入的图片路径
    { name: "Painting", image: painting },
    { name: "Gaming", image: gaming },
    { name: "Traveling", image: traveling },
    { name: "Eating", image: eating },
    { name: "Hip Hop", image: hiphop }, // 这里使用了导入的图片路径
    { name: "Music", image: music }, // 这里使用了导入的图片路径
];

  
  


  const GridItem = ({ person }) => {
    const [isHovering, setIsHovering] = useState(false);
  
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
  
    const hasData = person !== null && person !== undefined;
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: hasData ? `url(${person.image})` : 'none' }}
        className={`text-sm sm:text-base md:text-lg lg:text-xl text-center aspect-square sm:aspect-4/3 rounded-lg flex items-center justify-center p-4 relative bg-cover bg-center  ${hasData ? 'bg-slate-100' : 'bg-transparent'}`}
      >
        {/* 显示数据名称或当鼠标悬停且无数据时显示 "Coding" */}
        {hasData ? (
          <p className='text-white'>{person.name}</p>
        ) : (
          <p className={`absolute ${isHovering ? 'opacity-100' : 'opacity-0'}`}>Coding</p>
        )}
      </div>
    );
  };
  
  
  
  const distributeData = (dataList, totalItems) => {
    const interval = Math.floor(totalItems / dataList.length);
    let positions = new Set();
    let distributedData = Array(totalItems).fill(null);
  
    dataList.forEach(data => {
      let pos;
      do {
        pos = Math.floor(Math.random() * (interval - 1)) + (positions.size * interval);
      } while (positions.has(pos));
      positions.add(pos);
      distributedData[pos] = data;
    });
  
    return distributedData;
  };

  
  const SectionContactMe = React.forwardRef(() => {
    const [isVisible, setIsVisible] = useState(false);
    const [showNewContent, setShowNewContent] = useState(false);
    const totalItems = 48; // Total items to display
    const headingRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setShowNewContent(true);
          }, 2000);
          observer.unobserve(headingRef.current);
        }
      }, { threshold: 0.1 });
  
      if (headingRef.current) {
        observer.observe(headingRef.current);
      }
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    const distributedData = distributeData(dataList, totalItems);
  
    return (
      <div className="scroll-snap-align-start flex min-h-screen max-h-screen p-8 lg:p-20 items-center justify-center relative">
        <h2
          ref={headingRef}
          className={`text-2xl sm:text-2xl md:text-4xl lg:text-7xl font-bold mb-6 text-center transition-opacity duration-500 ${isVisible && !showNewContent ? 'opacity-100 animate-slide-and-shrink' : 'opacity-0 transition-opacity duration-500 animate-fade-out'}`}
        >
          A few things <br /> about me
        </h2>
        <div className={`absolute w-full h-screen inset-0 flex items-center justify-center transition-opacity duration-500 ${showNewContent ? 'opacity-100 animate-expand-and-rise' : 'opacity-0'}`}>
          <div className="grid grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-8 animate-fadeIn w-full  h-full p-8 lg:p-20 text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-semibold">
            {distributedData.map((person, index) => (
              <GridItem key={index} person={person} />
            ))}
          </div>
        </div>
      </div>
    );
  });
  
  export default SectionContactMe;
  
