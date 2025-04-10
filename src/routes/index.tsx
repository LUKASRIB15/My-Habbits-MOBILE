import {DefaultTheme, NavigationContainer} from "@react-navigation/native"
import { PublicRoutes } from "./public.routes"
import colors from "tailwindcss/colors"
import { View } from "react-native"
import { useSessions } from "@/contexts/sessions"
import { PrivateRoutes } from "./private.routes"
import HabitsProvider from "@/contexts/habits"
import { DrawerRoutes } from "./drawer.routes"

export function Routes(){
  const {userLogged} = useSessions()

  const userExists = Boolean(userLogged?.email)

  const theme = DefaultTheme
  theme.colors.background = colors.slate["950"]

  return (
    <View className="flex-1 bg-slate-950">
      <NavigationContainer theme={theme}>
        {
          userExists ? 
            <HabitsProvider>
              <DrawerRoutes/> 
            </HabitsProvider>
          : 
            <PublicRoutes/>
        }
      </NavigationContainer>
    </View>
  )
}