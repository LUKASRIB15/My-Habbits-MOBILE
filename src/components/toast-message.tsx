import { Text, useWindowDimensions, View } from "react-native";

const MARGIN_AXLE_X = 16

type ToastMessageProps = {
  message: string | undefined
}

export function ToastMessage({message=""}: ToastMessageProps){
  const screenWidth = useWindowDimensions().width

  return (
    <View className="px-4 py-6 rounded-xl bg-red-950 gap-x-2 flex-row mt-16" style={{width: screenWidth - MARGIN_AXLE_X}}>
      <View className="w-1 h-full rounded-full bg-red-600"/>
      <Text className="text-base text-slate-100 font-rajdhani-medium">{message}</Text>
    </View>
  )
}