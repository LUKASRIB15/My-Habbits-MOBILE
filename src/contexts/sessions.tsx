import { api } from "@/lib/axios";
import { getTokenFromStorage, removeTokenFromStorage, saveTokenInStorage } from "@/storage/sessions-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserDTO = {
  name: string
  email: string 
}

type SessionsContextProps = {
  userLogged: UserDTO | null
  setUserLoggedByAccessToken(): Promise<void>
  signIn(email: string, password: string): Promise<void>
  signUp(name: string, email: string, password: string): Promise<void>
  signOut(): Promise<void>
}

const SessionsContext = createContext({} as SessionsContextProps)

export function SessionsProvider({children}: {children: ReactNode}){
  const [userLogged, setUserLogged] = useState<UserDTO | null>(null)

  async function signIn(email: string, password: string){
    const response = await api.post('/clients/auth', {
      email,
      password
    })

    if(response.status === 200){
      const {access_token: accessToken} = response.data

      saveTokenInStorage(accessToken)

      await setUserLoggedByAccessToken()
    }
  }

  async function signUp(name: string, email: string, password: string){
    const response = await api.post('/clients/new', {
      name,
      email,
      password
    })

    if(response.status === 201){
      await signIn(email, password)
    }
  }

  async function setUserLoggedByAccessToken(){
    const accessToken = await getTokenFromStorage()

    if(!accessToken){
      return
    }

    api.defaults.headers.Authorization = `Bearer ${accessToken}`

    const response = await api.get('/clients/me')

    if(response.status === 200){
      const {data: user} = response
      setUserLogged(user)
    }

  }

  async function signOut(){
    await removeTokenFromStorage()
    setUserLogged(null)
  }

  useEffect(()=>{
    setUserLoggedByAccessToken()
  }, [])

  return (
    <SessionsContext.Provider value={{
      userLogged, 
      signIn, 
      signUp, 
      setUserLoggedByAccessToken, 
      signOut
    }}>
      {children}
    </SessionsContext.Provider>
  )
}

export const useSessions = ()=> useContext(SessionsContext)