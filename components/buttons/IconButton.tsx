import { ReactNode } from "react";
import styled from "styled-components/native";

interface IconButtonProps {
  icon: ReactNode;
  onPress: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, onPress } = props;

  return <Container onPress={onPress}>{icon}</Container>;
};

export default IconButton;

const Container = styled.TouchableOpacity``;
