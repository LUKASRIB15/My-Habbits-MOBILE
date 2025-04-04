import { Text, TouchableOpacity, View } from "react-native";
import PersonCircleSvg from "@/assets/icons/person-circle.svg"
import LogoSvg from "@/assets/logo.svg"
import { ArrowRight, List, Plus } from "phosphor-react-native";
import colors from "tailwindcss/colors";
import * as Check from "@/components/check"
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/button";
import { useSessions } from "@/contexts/sessions";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import dayjs from "@/lib/dayjs";
import { useHabits } from "@/contexts/habits";

export default function Home(){
  const {possibleHabitsOfDay, completedHabitsOfDay, fetchHabitsOfDay} = useHabits()
  const {signOut} = useSessions()
  const router = useRouter()

  const today = dayjs().startOf('day').toDate()

  useFocusEffect(useCallback(()=>{
    fetchHabitsOfDay()
  }, []))

  return (
    <View className="flex-1">
      <View className="items-center justify-between flex-row pt-12 pb-4 px-5">
        <TouchableOpacity 
          className="border border-blue-600 rounded-full p-0.5"
          onPress={signOut}
        >
          <PersonCircleSvg width={30} height={30}/>
        </TouchableOpacity>
        <LogoSvg width={32} height={32}/>
        <TouchableOpacity>
          <List size={32} color={colors.slate[100]}/>
        </TouchableOpacity>
      </View>
      <View className="flex-1 py-8 px-5">
        <View className="gap-y-4">
          <Text className="text-2xl text-slate-100 font-rajdhani-bold">Hábitos do dia</Text>
          <View className="gap-y-3 h-[208]  overflow-hidden">
            {
              possibleHabitsOfDay.map((habit)=> (
                <Check.Root key={habit.id}>
                  <Check.Box isChecked={completedHabitsOfDay.includes(habit.id)}/>
                  <Check.Title>{habit.title}</Check.Title>
                </Check.Root>
              ))
            }
            <LinearGradient
              colors={['rgba(2, 6, 23, 0.5)','rgba(2, 6, 23, 0.90)', '#020617']}
              className="absolute bottom-0 left-0 right-0 top-0 px-4 pb-5 justify-end"
            >
              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="font-rajdhani-medium text-xl text-slate-400">Hoje</Text>
                  <Text className="font-inter-extrabold text-3xl text-slate-100">{dayjs(today).format('DD/MM')}</Text>
                </View>
                <Button onPress={()=> router.navigate({
                  pathname: '/specific-day/[date]',
                  params: {date: today.toISOString()}
                })}>
                  <Button.Title>Ver hábitos</Button.Title>
                  <Button.Icon icon={ArrowRight}/>
                </Button>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
      <Button 
        onPress={()=>router.navigate('/new-habit')}
        className="absolute bottom-8 right-4 bg-blue-600 px-5 py-5 rounded-full"
      >
        <Button.Icon icon={Plus} size={24} weight="bold"/>
      </Button>
    </View>
  )
}