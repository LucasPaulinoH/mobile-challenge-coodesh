import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const useCustomNavigation = () =>
  useNavigation<NativeStackNavigationProp<ParamListBase>>();

export default useCustomNavigation;
