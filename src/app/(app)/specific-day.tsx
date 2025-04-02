import { ArrowLeft } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as Check from "@/components/check"
import { useRouter } from "expo-router";

const habits = [{status: true, title: "Beber água"}, {status: true, title: "Beber água 2"},{status: true, title: "Beber água 3"},{status: true, title: "Exercício"}, {status: false, title: "Se alimentar bem"},{status: false, title: "Dormir"}]

export default function SpecificDay(){
  const router = useRouter()

  return (
    <View className="flex-1">
      <View className="pt-12 flex-row justify-between px-5">
        <TouchableOpacity activeOpacity={0.7} onPress={()=>router.back()}>
          <ArrowLeft size={32} color={colors.slate[100]}/>
        </TouchableOpacity>
        <View className="items-end">
          <Text className="font-rajdhani-medium text-xl text-slate-100">Agosto</Text>
          <Text className="font-rajdhani-medium text-sm text-slate-400">2024</Text>
        </View>
      </View>
      <View className="flex-1 justify-between pb-8">
        <View className="px-5 py-8 gap-y-8">
          <View className="gap-y-4">
            <View>
              <Text className="text-sm text-slate-400 font-rajdhani-medium">sábado</Text>
              <Text className="text-3xl text-slate-100 font-inter-extrabold">31/08</Text>
            </View>
            <View className="w-full h-3 bg-slate-700 rounded-full">
              <View className="w-[156] h-3 bg-blue-600 rounded-full"/>
            </View>
          </View>
          <View className="gap-y-3">
            {
              habits.map(habit => (
                <Check.Root key={habit.title}>
                  <Check.Box isChecked={habit.status}/>
                  <Check.Title>{habit.title}</Check.Title>
                </Check.Root>
              ))
            }
          </View>
        </View>
        <Text className="text-slate-400 text-base font-rajdhani-medium self-center">Uma etapa todo dia!</Text>
      </View>
    </View>
  )
}