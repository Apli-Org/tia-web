import type React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-14 rounded-[2.5rem] h-[600px] w-[300px] shadow-xl p-1">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute flex items-start justify-center pt-0.5">
        <div className="w-2 h-2 bg-linear-to-br from-gray-600 via-gray-900 to-black rounded-full ring-2 ring-gray-600 shadow-inner -mt-2.5"></div>
      </div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[1.5rem] overflow-hidden w-full h-full bg-white relative [&_img]:object-contain! [&_img]:w-full! [&_img]:h-full!">
        {children}
      </div>
    </div>
  );
}
