import { Check } from "phosphor-react-native";
import { ReactNode } from "react";
import { Text, TextProps, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

function Root({children}: {children: ReactNode}){
  return (
    <View className="flex-row gap-x-3">
      {children}
    </View>
  )
}

type BoxProps = {
  isChecked?: boolean
  onCheckChange?: () => void
}

function Box({isChecked = false, onCheckChange}: BoxProps){
  return (
    <TouchableOpacity
      activeOpacity={0.7} 
      className={twMerge(
        "w-8 h-8 border-2 border-slate-700 rounded-lg bg-slate-800 items-center",
        isChecked && "border-emerald-400 bg-emerald-700"
      )}
      onPress={onCheckChange}
    >
      {
        isChecked && (
          <Check size={20} color={colors.slate[100]}/>
        ) 
      }
    </TouchableOpacity>
  )
}

function Title({children}: TextProps){
  return (
    <Text className="text-xl text-slate-100 font-inter-semibold">
      {children}
    </Text>
  )
}

export {
  Root,
  Box,
  Title
}