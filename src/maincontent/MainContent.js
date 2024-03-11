import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Carousel from './Carousel';

const Card = ({ name, price, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageLoaded(true); // 触发图片加载
            observer.unobserve(entry.target); // 加载后取消观察
          }
        });
      },
      {
        rootMargin: '100px', // 提前开始加载的距离
        threshold: 0.01, // 目标可见性达到1%时触发
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer" ref={imageRef}>
      <div className='h-164 overflow-hidden'>
        {!imageLoaded && (
          <div className="animate-pulse w-full h-48 md:h-72 bg-slate-300 rounded-lg"></div>
        )}
        {imageLoaded && (
          <img
            className="w-full h-64 md:h-72 object-cover "
            src={imageUrl}
            alt={name}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold">{name}</h3>
        <p className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-600">{price}</p>
      </div>
    </div>
  );
};



const MainContent = () => {
  const intl = useIntl();

  const [softwareItems, setSoftwareItems] = useState([]);
  const [hardwareItems, setHardwareItems] = useState([]);
  const softwareRef = useRef(null);
  const hardwareRef = useRef(null);

  const languageCode = window.location.pathname.split('/')[1] || 'en';

  const bucketName = process.env.REACT_APP_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION_CODE;
  const hardwarePath = process.env.REACT_APP_HARDWARE_PATH;
  const hardwareJsonUrl = `https://${bucketName}.obs.${region}.myhuaweicloud.com/${languageCode.toUpperCase()}${hardwarePath}`;
console.log("hardwareJsonUrl=",hardwareJsonUrl)
  const softwarePath = process.env.REACT_APP_SOFTWARE_PATH;
  const softwareJsonUrl = `https://${bucketName}.obs.${region}.myhuaweicloud.com/${languageCode.toUpperCase()}${softwarePath}`;

  // 动态加载software部分
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          fetch(softwareJsonUrl)
            .then(response => response.json())
            .then(data => setSoftwareItems(data));
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // 10%的元素可见时触发
      }
    );

    if (softwareRef.current) {
      observer.observe(softwareRef.current);
    }
    console.log("softwareJsonUrl=", softwareJsonUrl)
    return () => observer.disconnect();
  }, []);

  // 动态加载hardware部分
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          fetch(hardwareJsonUrl)
            .then(response => response.json())
            .then(data => setHardwareItems(data));
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (hardwareRef.current) {
      observer.observe(hardwareRef.current);
    }
    console.log("hardwareJsonUrl=", hardwareJsonUrl)
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-grow p-6 overflow-auto bg-gray-100 shadow">
      <Carousel />
      <section ref={softwareRef} className="mt-4 sm:mt-10 md:mt-13 lg:mt-216 min-h-screen">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-9 text-gray-700">
          {intl.formatMessage({ id: 'software' })}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6">

          {softwareItems.map((item) => (
            <Card key={item.name} name={item.name} price={`$${item.price}.00 USD`} imageUrl={item.url} />
          ))}
        </div>
      </section>
      <section ref={hardwareRef} className="mt-4 sm:mt-10 mb-4 sm:mb-6 md:mb-8 lg:mb-9 min-h-screen">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold mb-4 text-gray-700">
          {intl.formatMessage({ id: 'hardware' })}
        </h2>
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
