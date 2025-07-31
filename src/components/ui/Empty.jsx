import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by adding your first item.", 
  actionText = "Add Item",
  onAction 
}) => {
  return (
    <div className="text-center p-12">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        <ApperIcon name="CheckSquare" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-secondary mb-8 max-w-md mx-auto text-base leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="primary" size="large">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;