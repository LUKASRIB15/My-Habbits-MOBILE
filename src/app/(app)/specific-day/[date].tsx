import { ArrowLeft } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as Check from "@/components/check"
import { useLocalSearchParams, useRouter } from "expo-router";
import { useHabits } from "@/contexts/habits";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import dayjs from "@/lib/dayjs";
import { useEffect } from "react";

export default function SpecificDay(){
  const { fetchHabitsOfDay } = useHabits()
  const {date} = useLocalSearchParams() as {date: string}

  /* Manipulation with dates */
  const dayAndMonth = dayjs(new Date(date)).format('DD/MM')
  const dayOfWeek = dayjs(new Date(date)).format('dddd')
  const month = dayjs(new Date(date)).format('MMMM')
  const year = dayjs(new Date(date)).format('YYYY') 

  const { possibleHabitsOfDay, completedHabitsOfDay, toggleHabit } = useHabits()

  const progressBarPercentage = possibleHabitsOfDay.length !== 0 ? (100 * completedHabitsOfDay.length) / possibleHabitsOfDay.length : 0
  const router = useRouter()

  useEffect(()=>{
    fetchHabitsOfDay(new Date(date))
  }, [])

  async function handleToggleHabit(habitId: string){
    try{
      await toggleHabit(habitId, new Date(date))
    }catch(error){
      if(error instanceof AxiosError){
        const status = error.response?.status ?? 500

        switch(status){
          case 403:
            Toast.show({
              type: 'error',
              text1: 'Você não pode marcar um hábito que pertence a outra pessoa!'
            })
            break
          case 401:
            Toast.show({
              type: 'error',
              text1: 'Você não está autorizado para marcar hábitos. Saia e realize login novamente!',
            })
            break
          default:
            Toast.show({
              type: 'error',
              text1: 'Ops! Ocorreu um erro ao marcar seu hábito, tente novamente mais tarde',
            })
        }
        
      }
    }
  }

  return (
    <View className="flex-1">
      <View className="pt-12 flex-row justify-between px-5">
        <TouchableOpacity activeOpacity={0.7} onPress={()=>router.back()}>
          <ArrowLeft size={32} color={colors.slate[100]}/>
        </TouchableOpacity>
        <View className="items-end">
          <Text className="font-rajdhani-medium text-xl text-slate-100 capitalize" >{month}</Text>
          <Text className="font-rajdhani-medium text-sm text-slate-400">{year}</Text>
        </View>
      </View>
      <View className="flex-1 justify-between pb-8">
        <View className="px-5 py-8 gap-y-8">
          <View className="gap-y-4">
            <View>
              <Text className="text-sm text-slate-400 font-rajdhani-medium">{dayOfWeek}</Text>
              <Text className="text-3xl text-slate-100 font-inter-extrabold">{dayAndMonth}</Text>
            </View>
            <View className="w-full h-3 bg-slate-700 rounded-full">
              <View 
                className="h-3 bg-blue-600 rounded-full"
                style={{width: `${progressBarPercentage}%`}}
              />
            </View>
          </View>
          <View className="gap-y-3">
            {
              possibleHabitsOfDay.map(habit => (
                <Check.Root key={habit.id}>
                  <Check.Box 
                    isChecked={completedHabitsOfDay.includes(habit.id)}
                    onCheckChange={()=>handleToggleHabit(habit.id)}
                  />
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