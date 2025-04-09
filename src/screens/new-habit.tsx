
import { ArrowLeft } from "phosphor-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as Check from "@/components/check"
import { Button } from "@/components/button";
import { days } from "@/data/days";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useHabits } from "@/contexts/habits";
import Toast from "react-native-toast-message";
import { ToastMessage } from "@/components/toast-message";
import { twMerge } from "tailwind-merge";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

const newHabitFormSchema = zod.object({
  title: zod.string(),
  weekDays: zod.array(zod.number())
})

type NewHabitFormData = zod.infer<typeof newHabitFormSchema>

export function NewHabit(){
  const [isLoading, setIsLoading] = useState(false)
  const {control, handleSubmit, setValue, watch} = useForm<NewHabitFormData>({
    defaultValues: {
      weekDays: [],
      title: ''
    },
    resolver: zodResolver(newHabitFormSchema)
  }) 
  const navigator = useNavigation()
  const {createHabit} = useHabits()
  
  const weekDays = watch("weekDays")
  const isInvalidForm = watch("title").trim().length === 0 || watch("title").length > 20|| weekDays.length === 0

  function handleToggleWeekDay(weekDay: number){
    const updatedWeekDays = weekDays.includes(weekDay) ?
      weekDays.filter(value => value !== weekDay) :
      [...weekDays, weekDay]
      
    setValue("weekDays", updatedWeekDays)
    
  }

  async function handleCreateNewHabit(data: NewHabitFormData){
    try{
      setIsLoading(true)
      const {title, weekDays} = data

      await createHabit(title, weekDays)

      navigator.goBack()
    }catch(error){
      if(error instanceof AxiosError){
        const status = error.response?.status ?? 500

        switch(status){
          case 400:
            Toast.show({
              type: 'error',
              text1: 'Você não pode criar um hábito sem selecionar pelo menos um dia da semana.'
            })
            break
          case 401:
            Toast.show({
              type: 'error',
              text1: 'Você não está autorizado para criar hábitos. Saia e realize login novamente!',
            })
            break
          default:
            Toast.show({
              type: 'error',
              text1: 'Ops! Ocorreu um erro ao criar seu hábito, tente novamente mais tarde',
            })
        }
        
      }
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1">
      <View className="pt-12 flex-row justify-between px-5 pb-4">
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigator.goBack()}>
          <ArrowLeft size={32} color={colors.slate[100]}/>
        </TouchableOpacity>
        <View className="items-end">
          <Text className="font-rajdhani-medium text-xl text-slate-100">Novo hábito</Text>
        </View>
      </View>
      <KeyboardAwareScrollView>
        <View className="flex-1 px-5 py-8 gap-y-6">
          <Text className="font-inter-extrabold text-3xl text-slate-100">Criar hábito</Text>
          <View className="gap-y-4">
            <Text className="text-slate-100 text-base font-inter-semibold">Qual o seu comprometimento?</Text>
            <Controller
              control={control}
              name="title" 
              render={({field})=>(
                <View className="gap-y-1">
                  <TextInput 
                    className={
                      twMerge(
                        "bg-slate-800 border-2 border-slate-700 rounded-lg p-4 h-[52] text-slate-100",
                        field.value.length > 20 && "border-red-500"
                      )
                    }
                    placeholder="Exercícios, estudar por 2h, ..."
                    placeholderTextColor={colors.slate[400]}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  <Text className={twMerge("text-xs text-slate-400", field.value.length > 20 && "text-red-500")}>{field.value.length}/20</Text>  
                </View>

              )}  
            />
          </View>
          <View className="gap-y-4">
            <Text className="text-slate-100 text-base font-inter-semibold">Qual a recorrência?</Text>
            <View className="gap-y-3">
              {
                days.map((day)=>(
                  <Controller 
                    key={day.value}
                    control={control}
                    name="weekDays"
                    render={()=>(
                      <Check.Root>
                        <Check.Box 
                          isChecked={weekDays.includes(day.value)}
                          onCheckChange={()=> handleToggleWeekDay(day.value)}
                        />
                        <Check.Title>{day.name}</Check.Title>
                      </Check.Root>
                    )}
                  />
                ))
              }
            </View>
          </View>
          <Button 
            variant="secondary" 
            onPress={handleSubmit(handleCreateNewHabit)}
            isLoading={isLoading}
            disabled={isInvalidForm}
          >
            <Button.Title>Criar hábito</Button.Title>
          </Button>
        </View>
      </KeyboardAwareScrollView>
      {/* Toast Notification */}
      <Toast 
        config={{
          error: (props)=><ToastMessage message={props.text1}/>
        }}
      />
    </View>
  )
}