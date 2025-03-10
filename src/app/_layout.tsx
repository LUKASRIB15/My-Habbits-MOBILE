import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import '../global.css'
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"

export default function Layout(){
  const [isFontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_700Bold,
      Rajdhani_500Medium,
      Rajdhani_700Bold
    })
  
    if(!isFontsLoaded){
      // TODO: Loading screen
      return null
    }

  return (
    <View className="flex-1 bg-slate-950">
      <Stack 
        screenOptions={{
          animation: 'ios_from_right',
          headerShown: false,
        }}
      />
      <StatusBar 
        style="light"
        backgroundColor="transparent" 
        animated 
        translucent
      />
    </View>
  )
}