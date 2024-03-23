import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl'; // 引入useIntl
import Me from '../assets/profile/me.jpg'; // Adjust the path if necessary

const SectionAboutMe = React.forwardRef((props, ref) => {
  const sectionRef = useRef();
  const intl = useIntl(); // 使用useIntl获取当前的语言环境


  return (
    <div ref={sectionRef} className="flex flex-col md:flex-row scroll-snap-align-start min-h-screen p-8 lg:p-20 items-center md:justify-between gap-y-28 md:gap-y-0">
        <div className={`w-full sm:w-3/4 md:w-1/3 lg:w-1/2 transition-opacity duration-1000 animate-fadeIn`}>
            <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideIn">
                {intl.formatMessage({ id: 'aboutMe' })}
            </h1>
            <p className="sm:leading-loose md:leading-loose lg:leading-loose xl:leading-loose 2xl:leading-relaxed text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-semibold">
                {intl.formatMessage({ id: 'aboutMeDescription' })} 
            </p>
        </div>

        <div className="flex w-full sm:w-3/5 md:w-2/5 lg:w-1/4 items-end justify-end">
            <div className="w-full h-full overflow-hidden rounded-lg animate-slide-in-right transition-transform duration-500">
                <img
                    src={Me}
                    alt={intl.formatMessage({ id: 'aboutMe' })}
                    className="hover:scale-110 transition duration-500 cursor-pointer object-cover"
                />
            </div>
        </div>
    </div>
  );
});

export default SectionAboutMe;

