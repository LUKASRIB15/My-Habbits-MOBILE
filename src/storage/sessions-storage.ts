import AsyncStorage from "@react-native-async-storage/async-storage"
import { TOKEN_STORAGE } from "./config"

export async function getTokenFromStorage(){
  const token = await AsyncStorage.getItem(TOKEN_STORAGE)

  return token
}

export async function removeTokenFromStorage(){
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}

export async function saveTokenInStorage(token: string){
  await AsyncStorage.setItem(TOKEN_STORAGE, token)
}