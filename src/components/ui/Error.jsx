import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your tasks.", 
  onRetry 
}) => {
  return (
    <div className="text-center p-8">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-error/10 mb-4">
        <ApperIcon name="AlertCircle" size={24} className="text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;