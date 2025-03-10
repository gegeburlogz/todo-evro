import { create } from "zustand";

export type Ttype = "personal" | "professional";
export type itemTask = {
  _id: string;
  status: boolean;
  todo: string;
  type?: Ttype;
};
type TAddItemTask = { todo: string; type: Ttype };
type TUpdateItemTask = { id: string; type: Ttype; status: boolean };

type TaskState = {
  personal: itemTask[];
  page: {
    personal: number;
    professional: number;
    totalPages: number;
    current:Ttype
  };
  professional: itemTask[];
  getTasks: (type: "personal" | "professional") => Promise<void>;
  addTask: ({ todo, type }: TAddItemTask) => Promise<void>;
  deleteTask: ({
    id,
    all,
    type,
  }: {
    id: string;
    all: boolean;
    type: Ttype;
  }) => Promise<void>;
  updateTask: ({ id, type, status }: TUpdateItemTask) => Promise<void>;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useTaskStore = create<TaskState>((set: any, get: any) => ({
  personal: [],
  professional: [],
  page: {
    personal: 1,
    professional: 1,
    totalPages: 1,
    current:"personal"
  },
  getTasks: async (type) => {
    try {
      const response = await fetch(
        `${apiUrl}/tasks?type=${type}&page=${get().page[type]}&limit=5`
      );
      const tasks = await response.json();
      if (type && type === "personal") {
        set({
          personal: tasks.data,
          page: {
            ...get().page,
            totalPages: tasks.pagination.totalPages,
          },
        });
      }
      if (type && type === "professional") {
        set({
          professional: tasks.data,
          page: { ...get().page, totalPages: tasks.pagination.totalPages },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  addTask: async ({ type, todo }) => {
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: false, type, todo }),
      });
      if (response.ok) {
        await get().getTasks(type);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  updateTask: async ({ type, id, status }) => {
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          data: {
            status: !status,
          },
        }),
      });
      if (response.ok) {
        await get().getTasks(type);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  deleteTask: async ({ id, all, type }) => {
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed: all, type }),
      });
      if (response.ok) {
        await get().getTasks(type);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));

export default useTaskStore;
