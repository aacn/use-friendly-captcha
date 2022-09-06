import React, { FC } from 'react';

export const FirstComponent: FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center">
      <button className="mx-auto my-auto p-4 rounded-lg shadow-md text-pink-500 bg-red-100 hover:bg-pink-100">
        Frankenstein is Alive?
      </button>
    </div>
  );
};
