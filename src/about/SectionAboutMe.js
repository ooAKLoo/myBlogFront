import React, { useEffect, useRef, useState } from 'react';
import Me from '../assets/profile/me.jpg'; // Adjust the path if necessary

const SectionAboutMe = React.forwardRef(() => {
  // State to track if the section is visible
  const [isVisible, setIsVisible] = useState(false);
  // Reference to the section itself
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set to visible once
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="flex flex-col md:flex-row scroll-snap-align-start min-h-screen p-8 lg:p-20 items-center md:justify-between gap-y-28 md:gap-y-0">
        <div className={`w-full sm:w-3/4 md:w-1/3 lg:w-1/2 transition-opacity duration-1000 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideIn">Hello,</h1>
            <p className=" sm:leading-loose md:leading-loose lg:leading-loose xl:leading-loose 2xl:leading-relaxed text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-semibold">
    I am a Computer Science student at the University of Melbourne. I thoroughly enjoy the process of hands-on turning every idea that comes to mind into reality. Although I have encountered an increasing number of challenges in practice, I have also appreciated the charm that emerges when art design, hardware, and software come together. Therefore, on the path of development, I do not wish to confine myself to a small circle; I hope to engage in more extensive communication and cooperation with everyone through this website.
</p>

        </div>

        <div className="flex w-full sm:w-3/5 md:w-2/5 lg:w-1/4  items-end justify-end">
            {/* Image container */}
            <div className="w-full h-full overflow-hidden rounded-lg  animate-slide-in-right transition-transform duration-500">
                {/* Image with animation */}
                <img
                    src={Me} // Replace with your image path
                    alt="Dongju Yang"
                    class=" hover:scale-110 transition duration-500 cursor-pointer object-cover "
                />
            </div>
        </div>
    </div>
  );
});

export default SectionAboutMe;
