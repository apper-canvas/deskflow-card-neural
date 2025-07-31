import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      <span className="ml-3 text-secondary">Loading tasks...</span>
    </div>
  );
};

export default Loading;