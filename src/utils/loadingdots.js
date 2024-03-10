import React from 'react';

const LoadingDots = () => {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-black rounded-full animate-bounce animate-spread"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-black rounded-full animate-bounce"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-black rounded-full animate-bounce animate-spread-reverse"></div>
      </div>
    );
  };

  export default LoadingDots