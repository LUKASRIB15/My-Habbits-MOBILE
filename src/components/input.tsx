import { Text, TextInput, TextInputProps, View } from "react-native";
import { IconProps} from 'phosphor-react-native'
import colors from 'tailwindcss/colors'
import { ComponentType, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = TextInputProps & {
  errorMessage?: string | null
  placeholder: string
  icon: ComponentType<IconProps>
}

export const Input = forwardRef<TextInput, InputProps>(({placeholder, errorMessage=null, icon: Icon, ...rest}, ref)=>{
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className="gap-y-1">
      <View 
        className={twMerge(
          "flex-row items-center gap-x-4 border-2 border-slate-100 rounded-md px-4",
          errorMessage && ' border-red-500',
          isFocused && ' border-blue-600'
        )}
      >
        <Icon size={20} color={colors.slate[100]}/>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          className="flex-1 max-h-12 text-slate-100"
          placeholderTextColor={colors.slate[100]}
          onBlur={()=> setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
      </View>
      {
        errorMessage && !isFocused && <Text className="text-red-500 text-sm">{errorMessage}</Text>
      }
    </View>
  )})