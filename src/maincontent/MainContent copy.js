import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import loadingAnimation from '../assets/loading/Animation.webm';

const Card = ({ name, price, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 图片加载完成的处理函数
  const handleImageLoaded = () => setImageLoaded(true);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className='h-164 overflow-hidden'>
        {!imageLoaded && (
          <div className="animate-pulse w-full h-48 md:h-72 bg-slate-300"></div>
        )}
        <img
          className={`w-full h-48 md:h-72 object-cover ${!imageLoaded ? 'hidden' : ''}`} 
          src={imageUrl}
          alt={name}
          onLoad={handleImageLoaded}
        />
      </div>
      <div className="p-4">
        {/* 文字占位符 */}
        {!imageLoaded ? (
          <>
            <div className="h-6 bg-slate-200 animate-pulse mb-2"></div>
            <div className="h-4 bg-slate-200 animate-pulse width-3/4"></div>
          </>
        ) : (
          <>
            <h3 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold">{name}</h3>
            <p className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600">{price}</p>
          </>
        )}
      </div>
    </div>
  );
};



const MainContent = () => {
  const [softwareItems, setSoftwareItems] = useState([]);
  const [hardwareItems, setHardwareItems] = useState([]);

  // Fetch software items
  useEffect(() => {
    const fetchSoftwareItems = async () => {
      const response = await fetch('https://dongju.obs.cn-north-4.myhuaweicloud.com/test.json');
      const data = await response.json();
      setSoftwareItems(data);
    };

    fetchSoftwareItems();
  }, []);

  // Fetch hardware items
  useEffect(() => {
    const fetchHardwareItems = async () => {
      const response = await fetch('/path-to-your-hardware-items.json');
      const data = await response.json();
      setHardwareItems(data);
    };

    fetchHardwareItems();
  }, []);

  return (
    <div className="flex-grow p-6 overflow-auto bg-gray-100 shadow">
      <Carousel />
      <section className="mt-4 sm:mt-4 md:mt-5 lg:mt-6 mb-4 sm:mb-8 md:mb-9 lg:mb-8 min-h-screen">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold mb-4 text-gray-700">Software</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6">
       
          {softwareItems.map((item) => (
            <Card key={item.name} name={item.name} price={`$${item.price}.00 USD`} imageUrl={item.url} />
          ))}
        </div>
      </section>
      <section className="mt-4 sm:mt-4 md:mt-5 lg:mt-6 mb-4 sm:mb-8 md:mb-9 lg:mb-8 min-h-screen">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold mb-4 text-gray-700">Hardware</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6">
       
          {hardwareItems.map((item) => (
            <Card key={item.name} name={item.name} price={`$${item.price}.00 USD`} imageUrl={item.url} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
