"use client";
import React from "react";
import TaskManager from "@/components/Todo/manager";

const PersonalPage: React.FC = () => {
  return (
    <div className="w-full">
        <TaskManager type={"personal"} />
    </div>
  );
};

export default PersonalPage;
