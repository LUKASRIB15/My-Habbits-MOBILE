import {Home} from "@/screens/home"
import { NewHabit } from "@/screens/new-habit"
import { SpecificDay } from "@/screens/specific-day"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"

type PrivateRoutesProps = {
  specificDay: {
    date: string
  }
  home: undefined
  newHabit: undefined
}

export type PrivateNavigatorRoutesProps = NativeStackNavigationProp<PrivateRoutesProps>

const Stack = createNativeStackNavigator<PrivateRoutesProps>()

export function PrivateRoutes(){
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "ios_from_right"
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="specificDay" component={SpecificDay} />
      <Stack.Screen name="newHabit" component={NewHabit} />
    </Stack.Navigator>
  )
}