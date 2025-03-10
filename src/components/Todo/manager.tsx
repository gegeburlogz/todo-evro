"use client";

import ListTasks from "@/components/Todo/list";
import TaskInput from "@/components/Todo/taskInput";
import useTaskStore, { Ttype } from "@/store/useTaskStore";
import { get } from "http";
import React, { use, useEffect, useState } from "react";

const TaskManager: React.FC<{type:Ttype}> = ({type}) => {
  const { getTasks,addTask } = useTaskStore();
  const onUpdate = (task: string) => {
    addTask({todo:task, type});
  };
  useEffect(() => {
    getTasks(type);
  }, []);

  return (
    <div className="w-full">
      <TaskInput onUpdateData={onUpdate} />
      <ListTasks type={type} />
    </div>
  );
};

export default TaskManager;
