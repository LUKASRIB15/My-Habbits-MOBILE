import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import '../global.css'
import { StatusBar } from "expo-status-bar"
import { SessionsProvider } from "@/contexts/sessions"

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
    <SessionsProvider>
      <Slot />
      <StatusBar 
        style="light"
        backgroundColor="transparent" 
        animated 
        translucent
      />
    </SessionsProvider>
  )
}