"use client";
import useTaskStore from "@/store/useTaskStore";
import {  useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const tabStyle = {
  maxWidth: "720px",
  width:"100%",
  height: "73px",
  fontSize: "32px",
  color: "#969696",
  cursor: "pointer",
  backgroundColor: "var(--primary-shade-down)",
  borderBottom: "5px solid var(--primary-shade-down)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: "5px solid var(--accent)",
};

const Todo: React.FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const {page} = useTaskStore();
  const menu = [
    {
      route: "/personal",
      name: "Personal",
      id: "personal",
    },
    {
      route: "/professional",
      name: "Professional",
      id: "professional",
    },
  ];
  useEffect(() => {
    page.current = menu[activeIndex].id as "personal" | "professional";
    router.push(menu[activeIndex].route);
  }, [activeIndex]);
  return (
    <div>
      <Tabs
        selectedIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
      >
        <TabList className={"flex flex-row flex-wrap justify-center items-center "}>
          {menu.map((item, index) => (
            <Tab
              key={index + item.route}
              style={activeIndex === index ? activeTabStyle : tabStyle}
            >
              {item.name}
            </Tab>
          ))}
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default Todo;
