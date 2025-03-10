import React, { useState } from "react";
type itemTask = {
  status: boolean;
  todo: string;
  type?: "personal" | "professional";
};
type TaskInputProps = {
  onUpdateData: (task: string) => void;
};
const TaskInput: React.FC<TaskInputProps> = ({ onUpdateData }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const addTask = (task: string) => {
    if (task) {
      onUpdateData(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="flex w-full items-center max-w-[1040px] mx-auto mt-[40px]">
      <input
        className="w-full text-[32px] py-[15px] px-[35px] outline-none bg-[var(--primary)] rounded-tl-[50px] rounded-bl-[50px]"
        type="text"
        placeholder="What do you need to do?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(inputValue);
          }
        }}
      />
      <button
        className="w-full max-w-[140px] py-[15px] px-[35px] bg-[var(--accent-blue)] rounded-tr-[50px] text-[32px] text-white rounded-br-[50px]"
        onClick={() => addTask(inputValue)}
      >
        ADD
      </button>
    </div>
  );
};

export default TaskInput;
