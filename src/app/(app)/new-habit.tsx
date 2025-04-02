import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as Check from "@/components/check"
import { Button } from "@/components/button";

const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export default function NewHabit(){
  const [weekDays, setWeekDays] = useState<number[]>([])  
  const router = useRouter()

  return (
    <View className="flex-1">
      <View className="pt-12 flex-row justify-between px-5">
        <TouchableOpacity activeOpacity={0.7} onPress={()=>router.back()}>
          <ArrowLeft size={32} color={colors.slate[100]}/>
        </TouchableOpacity>
        <View className="items-end">
          <Text className="font-rajdhani-medium text-xl text-slate-100">Novo hábito</Text>
        </View>
      </View>
      <View className="flex-1 px-5 py-8 gap-y-6">
        <Text className="font-inter-extrabold text-3xl text-slate-100">Criar hábito</Text>
        <View className="gap-y-4">
          <Text className="text-slate-100 text-base font-inter-semibold">Qual o seu comprometimento?</Text>
          <TextInput 
            className="bg-slate-800 border-2 border-slate-700 rounded-lg p-4 h-[52] text-slate-100"
            placeholder="Exercícios, estudar por 2h, ..."
            placeholderTextColor={colors.slate[400]}
          />
        </View>
        <View className="gap-y-4">
          <Text className="text-slate-100 text-base font-inter-semibold">Qual a recorrência?</Text>
          <View className="gap-y-3">
            {
              days.map((day, index)=>(
                <Check.Root key={day}>
                  <Check.Box 
                    isChecked={weekDays.includes(index+1)}
                    onCheckChange={()=> weekDays.includes(index+1) ? setWeekDays(weekDays.filter(day => day !== index+1)) : setWeekDays([...weekDays, index+1])}
                  />
                  <Check.Title>{day}</Check.Title>
                </Check.Root>
              ))
            }
          </View>
        </View>
        <Button variant="secondary">
          <Button.Title>Criar hábito</Button.Title>
        </Button>
      </View>
    </View>
  )
}