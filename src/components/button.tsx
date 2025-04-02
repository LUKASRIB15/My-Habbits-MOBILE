import { ComponentType } from "react";
import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from 'tailwindcss/colors'
import {IconProps as PhosphorIconProps} from "phosphor-react-native"
import { twMerge } from "tailwind-merge";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
  variant?: "primary" | "secondary"
}

function Button({children, isLoading=false, variant = "primary",...rest}: ButtonProps){
  return (
    <TouchableOpacity
      className={twMerge(
        "bg-blue-600 rounded-md p-4 items-center flex-row gap-x-2 justify-center",
        (isLoading || rest.disabled) && "opacity-70",
        variant === "secondary" && "bg-emerald-600"
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {
        isLoading ? (
          <ActivityIndicator color={colors.slate[100]} size="small" testID="loading-indicator"/>
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

type IconProps = PhosphorIconProps & {
  icon: ComponentType<PhosphorIconProps>
}

function Icon({icon: Icon, ...rest}: IconProps){
  return (
    <Icon color={colors.slate[100]} size={20} testID="button-icon" {...rest}/>
  )
}

Button.Title = Title
Button.Icon = Icon

export {
  Button
}