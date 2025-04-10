import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationProp} from "@react-navigation/drawer"
import { PrivateNavigatorRoutesProps, PrivateRoutes } from "./private.routes"
import { Text, TouchableOpacity, View } from "react-native"
import colors from "tailwindcss/colors"
import { HouseLine, SignOut, Sparkle } from "phosphor-react-native"
import { HabbitsIA } from "@/screens/habbits-ia"
import { useSessions } from "@/contexts/sessions"

type DrawerRoutesProps = {
  home: PrivateNavigatorRoutesProps
  habbitsIA: undefined
}

export type DrawerNavigatorRoutesProps = DrawerNavigationProp<DrawerRoutesProps>

const Drawer = createDrawerNavigator<DrawerRoutesProps>()

export function DrawerRoutes(){
  const {signOut} = useSessions()

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right"
      }}
      drawerContent={(props) => {
        const {routeNames, index} = props.state
        const focused = routeNames[index]

        return (
          <View className="flex-1 bg-slate-900 px-4 py-8">
            <DrawerContentScrollView 
              {...props}
            >
              <Text className="text-white font-rajdhani-bold text-2xl">My Habbits</Text>
              <View className=" mt-16 justify-between gap-y-3">
                <DrawerItem 
                  label={'Home'} 
                  onPress={() => props.navigation.navigate('home')}
                  style={{
                    backgroundColor: focused === 'home' ? colors.slate[800] : 'transparent'
                  }}
                  labelStyle={{
                    color: focused === 'home' ? colors.slate[100] : colors.slate[400],
                    fontSize: 16,
                    fontFamily: 'Inter_500Medium'
                  }} 
                  icon={()=> <HouseLine color={focused === 'home' ? colors.slate[100] : colors.slate[400]} size={24} weight={focused === 'home' ? 'fill' : 'regular'}/>}
                />
                <DrawerItem 
                  label={'Habbits IA'} 
                  onPress={() => props.navigation.navigate('habbitsIA')}
                  labelStyle={{
                    color: focused === 'habbitsIA' ? colors.slate[100] : colors.slate[400],
                    fontSize: 16,
                    fontFamily: 'Inter_500Medium'
                  }} 
                  icon={()=> <Sparkle color={focused === 'habbitsIA' ? colors.slate[100] : colors.slate[400]} size={24} weight={focused === 'habbitsIA' ? 'fill' : 'regular'}/>}
                />
                
              </View>
            </DrawerContentScrollView>
            <TouchableOpacity 
              onPress={signOut}
              className="flex-row items-center bg-red-900 justify-center py-3 gap-x-2 rounded-full "
            >
              <SignOut size={24} color={colors.red[100]}/>
              <Text className="font-rajdhani-medium text-red-100 text-base">Sair</Text>
            </TouchableOpacity>
          </View>
        )
      }}
    >
      <Drawer.Screen name="home" component={PrivateRoutes}/>
      <Drawer.Screen name="habbitsIA" component={HabbitsIA}/>
    </Drawer.Navigator>
  )
}