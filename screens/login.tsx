import Input from "components/Input";
import LabelButton from "components/buttons/LabelButton";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { KeyboardAvoidingView, Text } from "react-native";
import styled from "styled-components/native";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

export default function Login() {
  const auth = FIREBASE_AUTH;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert("Login failed: " + error?.message);
    }
  };

  const handleRegister = async () => {
    try {
      const registerResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (registerResponse) alert("Account successfully created!");
    } catch (error: any) {
      alert("Registration failed: " + error?.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <MainContainer>
        <Text>NAMU DICTIONARY</Text>
        <InnerContainer>
          <Input placeholder="Email *" value={email} setValue={setEmail} />
          <Input
            placeholder="Password *"
            value={password}
            setValue={setPassword}
            passwordType
          />
        </InnerContainer>
        <InnerContainer>
          <LabelButton label="Sign in" onPress={handleLogin} />
          <LabelButton label="Create account" onPress={handleRegister} />
        </InnerContainer>
      </MainContainer>
    </KeyboardAvoidingView>
  );
}

const MainContainer = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 400px;
`;
