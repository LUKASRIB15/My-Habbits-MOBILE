import { ComponentType } from "react";
import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from 'tailwindcss/colors'
import {IconProps as PhosphorIconProps} from "phosphor-react-native"

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button({children, isLoading=false, ...rest}: ButtonProps){
  return (
    <TouchableOpacity
      className="bg-blue-600 rounded-md p-4 items-center"
      activeOpacity={0.7}
      {...rest}
    >
      {
        isLoading ? (
          <ActivityIndicator color={colors.slate[100]} size="small" />
        ) : (
          children
        )
      }
    </TouchableOpacity>
  )
}

function Title({children}: TextProps){
  return (
    <Text className="font-inter-bold text-slate-100">
      {children}
    </Text>
  )
}

type IconProps = {
  icon: ComponentType<PhosphorIconProps>
}

function Icon({icon: Icon}: IconProps){
  return (
    <Icon color={colors.slate[100]} size={20}/>
  )
}

Button.Title = Title
Button.Icon = Icon

export {
  Button
}