import { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";

interface TabsProps {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

const Tabs = (props: TabsProps) => {
  const { selectedTab, setSelectedTab } = props;

  const handleChangeTab = (index: number) => setSelectedTab(index);

  return (
    <TabsContainer>
      <Tab onPress={() => handleChangeTab(0)} selected={selectedTab === 0}>
        <TabText selected={selectedTab === 0}>Word list</TabText>
      </Tab>
      <Tab onPress={() => handleChangeTab(1)} selected={selectedTab === 1}>
        <TabText selected={selectedTab === 1}>History</TabText>
      </Tab>
      <Tab onPress={() => handleChangeTab(2)} selected={selectedTab === 2}>
        <TabText selected={selectedTab === 2}>Favorites</TabText>
      </Tab>
    </TabsContainer>
  );
};

export default Tabs;

const TabsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  background-color: #eee;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.06);
  padding: 4px;
  width: 100%;
  font-size: 14px;
`;

const Tab = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#fff" : "transparent")};
  transition: background-color 0.15s ease-in-out;
`;

const TabText = styled.Text<{ selected: boolean }>`
  border-radius: 5px;
  border: none;
  padding: 8px;
  color: #000;
  font-weight: ${({ selected }) => (selected ? "600" : "normal")};
  transition: font-weight 0.15s ease-in-out;
  text-align: center;
`;
