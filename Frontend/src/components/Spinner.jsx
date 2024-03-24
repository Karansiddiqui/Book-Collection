import React from 'react';

export const Spinner = () => {
  return (
    <div className='flex justify-center items-start h-screen'>
      <div className='animate-ping w-16 h-16 rounded-full bg-sky-600'></div>
    </div>
  );
};