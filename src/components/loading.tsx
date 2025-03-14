import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

export function Loading(){
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <ActivityIndicator size={"large"} color={colors.blue[600]}/>
    </View>
  )
}