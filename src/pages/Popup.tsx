import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { SidebarSelectEventType } from "../components/Sidebar";
import Calendar from "./Calendar";
import FS from "./FS";

const HomeLayout = styled.div`
  background-color: #333;
  padding: 10px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const OptionButton = styled.button`
  display: inline-block;
  color: #ccc;
  font-size: 20px;
  border: 0;
  margin: 10px;
  padding: 5px;
  transition: 0.3s all cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  background-color: transparent;
  &:hover {
    color: #fff;
  }
`;
export default function Home() {
  const [currentPage, setCurrentPgae] = useState<SidebarSelectEventType>(
    "preset"
  );
  useEffect(() => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function(tabs) {
        const currentLocation = tabs[0].url || "";

        if (currentLocation.startsWith("https://campus.dhw.ac.jp/")) {
          setCurrentPgae("calendar");
        } else if (currentLocation.includes("CampusAnswerDetail")) {
          setCurrentPgae("preset");
        }
      }
    );
  }, []);

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  };

  return (
    <HomeLayout>
      {currentPage === "preset" && <FS />}
      {currentPage === "calendar" && <Calendar />}
      <OptionButton onClick={openOptions}>options</OptionButton>
    </HomeLayout>
  );
}
