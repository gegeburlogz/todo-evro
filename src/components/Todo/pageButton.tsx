"use client";
import useTaskStore, { Ttype } from "@/store/useTaskStore";
import React, { use, useEffect, useState } from "react";

const PageButtons: React.FC<{ type: Ttype }> = ({ type }) => {
  const [page, setPage] = useState(1);

  const { page:pageStore, getTasks } = useTaskStore();
  //   const onUpdate = (task: string) => {
  //     addTask({ todo: task, type });
  //   };
  useEffect(() => {
    pageStore[pageStore.current] = page; 
    getTasks(pageStore.current);
  }, [page]);

  return (
    <div className="text-[24px] grid grid-cols-3 items-center max-w-[200px] cursor-pointer absolute left-[50px] bottom-[20px]">
        
      <div className="flex justify-center">
        {pageStore[pageStore.current] > 1 && (
          <button
            className="cursor-pointer text-[32px]"
            onClick={() => setPage(page - 1)}
          >
            &#x21FD;
          </button>
        )}
      </div>
      <div className="flex justify-center">
        <span className="text-center"> {pageStore.totalPages !== 1  && page} </span>
      </div>
      <div className="flex justify-center">
        {pageStore.totalPages > page && (
          <button
            className="cursor-pointer text-[32px]"
            onClick={() => setPage(page + 1)}
          >
            &#x21FE;
          </button>
        )}
      </div>
    </div>
  );
};

export default PageButtons;
