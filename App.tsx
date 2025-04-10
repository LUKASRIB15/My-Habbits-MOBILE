import './src/global.css'
import 'react-native-gesture-handler';

import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Loading } from '@/components/loading';
import { Routes } from '@/routes';
import { SessionsProvider } from '@/contexts/sessions';

export default function App() {
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
      <Routes />
    </SessionsProvider>
  )
}