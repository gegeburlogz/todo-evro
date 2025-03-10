import useTaskStore, { itemTask } from "@/store/useTaskStore";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import PageButtons from "./pageButton";

const ListTasks: React.FC<{ type: "personal" | "professional" }> = ({
  type,
}) => {
  const { personal, professional, updateTask, deleteTask,page:pageStore } = useTaskStore();
  const [currentTasks, setCurrentTasks] = useState<itemTask[]>([]);

  useEffect(() => {
    if (pageStore.current === "personal") {
      setCurrentTasks(personal);
    }
    if (pageStore.current === "professional") {
      setCurrentTasks(professional);
    }
  }, [personal, professional]);

  const toggleStatus = (id: string, status: boolean) => {
    updateTask({ id, type, status });
  };
  const deleteTaskItem = (id: string) => {
    deleteTask({ id, all: false, type });
  };
  const deleteAll = () => {
    deleteTask({ id: "all", all: true, type });
  }
  return (
    <div className="flex flex-col w-full items-start max-w-[1040px] min-h-[590px] mx-auto mt-[40px] bg-[var(--primary)] rounded-[50px] px-[50px] relative">
      {currentTasks.map((task, index) => (
        <div
          key={index + "task"}
          className="flex items-center w-full justify-between "
        >
          {task.status ? (
            <Image
              src={"/completed.svg"}
              alt="Encircle Check Icon"
              width={50}
              height={50}
              onClick={() => toggleStatus(task._id, task.status)}
            />
          ) : (
            <Image
              src={"/unmarked.svg"}
              alt="Grey Circle"
              width={50}
              height={50}
              onClick={() => toggleStatus(task._id, task.status)}
            />
          )}
          <p
            onClick={() => toggleStatus(task._id, task.status)}
            className="p-[20px] text-[32px] text-left w-full border-b-[1px] border-[var(--accent-blue)]"
            style={{
              textDecoration: task.status ? "line-through" : "none",
              opacity: task.status ? 0.5 : 1,
            }}
          >
            {task.todo}
          </p>
          <button
            className="opacity-50 hover:opacity-100"
            onClick={() => deleteTaskItem(task._id)}
          >
            <Image src={"trash.svg"} alt="Red Trash" width={19} height={24} />
          </button>
        </div>
      ))}
      <PageButtons type={'personal'} />
      <div onClick={()=>deleteAll()} className="hover:opacity-75 flex cursor-pointer items-center absolute right-[50px] bottom-0 py-[21px] px-[10px] text-[24px] text-[var(--accent)]">
        <Image
          className="mr-[10px] "
          src={"/clear_tasks.svg"}
          alt="X mark with phone"
          width={28}
          height={34}
        />
        Clear Completed
      </div>
    </div>
  );
};
50;

export default ListTasks;
