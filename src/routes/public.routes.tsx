import {SignIn} from "@/screens/sign-in";
import {SignUp} from "@/screens/sign-up";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

type PublicRoutesProps = {
  signIn: undefined
  signUp: undefined
}

export type PublicNavigatorRoutesProps = NativeStackNavigationProp<PublicRoutesProps>

const Stack = createNativeStackNavigator<PublicRoutesProps>();

export function PublicRoutes(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade"
      
      }}
    >
      <Stack.Screen name="signIn" component={SignIn}/>
      <Stack.Screen name="signUp" component={SignUp}/>
    </Stack.Navigator>
  )
}