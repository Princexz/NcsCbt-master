import React from "react";

export const ProgressBar = ({ score }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex w-2/3 h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      {/* <span>{Math.floor(score)}%</span> */}
    </div>
  );
};
