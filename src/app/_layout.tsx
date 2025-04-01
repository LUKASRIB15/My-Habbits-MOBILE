import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from "@expo-google-fonts/inter"
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import '../global.css'
import { StatusBar } from "expo-status-bar"
import { SessionsProvider } from "@/contexts/sessions"
import { Loading } from "@/components/loading"
import { View } from "react-native"

export default function Layout(){
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })
  
  if(!isFontsLoaded){
    return <Loading />
  }

  return (
    <SessionsProvider>
      <View className="flex-1 bg-slate-950">
        <Slot/>
        <StatusBar 
          style="light"
          backgroundColor="transparent" 
          animated 
          translucent
        />
      </View>
    </SessionsProvider>
  )
}