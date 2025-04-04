import { api } from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import { createContext, ReactNode, useContext, useState } from "react";

type PossibleHabit = {
  id: string
  title: string
}


type HabitsContextProps = {
  possibleHabitsOfDay: PossibleHabit[]
  completedHabitsOfDay: string[]
  createHabit(title: string, weekDays: number[]): Promise<void>
  fetchHabitsOfDay(date?: Date): Promise<void>
  toggleHabit(habitId: string, date?: Date): Promise<void>
}

const HabitsContext = createContext({} as HabitsContextProps)

export default function HabitsProvider({children}:{children: ReactNode}){
  const [possibleHabitsOfDay, setPossibleHabitsOfDay] = useState<PossibleHabit[]>([])
  const [completedHabitsOfDay, setCompletedHabitsOfDay] = useState<string[]>([])

  async function fetchHabitsOfDay(date?: Date){
    try{
      const dateToFetch = date ?? dayjs().startOf('day').toDate()
      
      const response = await api.get(`/habits/day?date=${dateToFetch.toISOString()}`)

      setPossibleHabitsOfDay(response.data.possibleHabits)
      setCompletedHabitsOfDay(response.data.completedHabitIds)  
    }catch(error){
      throw error
    }
  }

  async function toggleHabit(habitId: string, date?: Date){
    try{  
      await api.patch(`/habits/${habitId}/toggle`)

      await fetchHabitsOfDay(date)
    }catch(error){
      throw error
    }
  }

  async function createHabit(title: string, weekDays: number[]){
    try{
      await api.post('/habits/new', {
        title,
        weekDays
      })
    }catch(error){
      throw error
    }
  }

  return (
    <HabitsContext.Provider value={{
      possibleHabitsOfDay,
      completedHabitsOfDay,
      createHabit, 
      fetchHabitsOfDay,
      toggleHabit
    }}>
      {children}
    </HabitsContext.Provider>
  )
}

export const useHabits = () => useContext(HabitsContext)