import { Text, TextInput, TextInputProps, View } from "react-native";
import { IconProps} from 'phosphor-react-native'
import colors from 'tailwindcss/colors'
import { ComponentType, forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

type InputProps = TextInputProps & {
  errorMessage?: string | null
  placeholder: string
  icon: ComponentType<IconProps>
}

export const Input = forwardRef<TextInput, InputProps>(({placeholder, errorMessage=null, icon: Icon, ...rest}, ref)=>{
  const [isFocused, setIsFocused] = useState(false)
  const shake = useSharedValue(0)

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: shake.value
    }]
  }))

  function toShakeAnimation(){
    shake.value = withSequence(
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(-10, {duration: 100}),
      withTiming(10, {duration: 100}),
      withTiming(0, {duration: 100})
    )
  }

  useEffect(() => {
    if(errorMessage && !isFocused){
      toShakeAnimation()
    }
  }, [errorMessage])

  return (
    <Animated.View className="gap-y-1" style={animatedShakeStyle}>
      <View
        testID="input-container" 
        className={twMerge(
          "flex-row items-center gap-x-4 border-2 border-slate-100 rounded-md px-4",
          errorMessage && ' border-red-500',
          isFocused && ' border-blue-600'
        )}
      >
        <Icon size={20} color={colors.slate[100]} testID="input-icon"/>
        <TextInput
          ref={ref}
          testID="input"
          placeholder={placeholder}
          className="flex-1 min-h-12 text-slate-100"
          placeholderTextColor={colors.slate[100]}
          onBlur={()=> setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
      </View>
      {
        errorMessage && !isFocused && <Text testID="message-error-text" className="text-red-500 text-sm">{errorMessage}</Text>
      }
    </Animated.View>
  )})