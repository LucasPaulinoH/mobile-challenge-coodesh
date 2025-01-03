import { ReactNode } from "react";
import styled from "styled-components/native";

interface LabelButtonProps {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
}

const LabelButton = (props: LabelButtonProps) => {
  const { label, onPress, icon } = props;

  return (
    <Container onPress={onPress}>
      {icon}
      <ButtonLabel>{label}</ButtonLabel>
    </Container>
  );
};

export default LabelButton;

const Container = styled.TouchableOpacity`
  min-width: 100%;
  min-height: 60px;
  background-color: #000;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ButtonLabel = styled.Text`
  color: #fff;
  font-weight: bold;
`;
