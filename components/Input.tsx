import { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";

interface InputProps {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  passwordType?: boolean;
}

const Input = (props: InputProps) => {
  const { placeholder, value, setValue, passwordType } = props;

  return (
    <Container
      value={value}
      placeholder={placeholder}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={passwordType ?? false}
    />
  );
};

export default Input;

const Container = styled.TextInput`
  width: 100%;
  min-height: 60px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
`;
