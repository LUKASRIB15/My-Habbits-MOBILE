import { useSessions } from "@/contexts/sessions";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home(){
  const {signOut} = useSessions()

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}