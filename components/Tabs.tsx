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
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 100%;
  font-size: 14px;
`;

const Tab = styled.TouchableOpacity<{ selected: boolean }>`
  border-radius: 5px;
  flex: 1 1 auto;
  text-align: center;
  background-color: ${({ selected }) => (selected ? "#fff" : "transparent")};
  transition: background-color 0.15s ease-in-out;
`;

const TabText = styled.Text<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: #000;
  font-weight: ${({ selected }) => (selected ? "600" : "normal")};
  transition: font-weight 0.15s ease-in-out;
`;
