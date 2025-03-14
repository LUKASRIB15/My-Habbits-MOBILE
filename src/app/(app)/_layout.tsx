import { Loading } from "@/components/loading";
import { useSessions } from "@/contexts/sessions";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function AppLayout() {
  const {userLogged} = useSessions()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  if(!userLogged){
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack/>
  )
}

/*

  In this code, userLogged is updated after _layout.tsx is rendered which causes the value of 
  userLogged to be null even though there is already an accessToken stored in local storage. 
  To reverse this situation, I used the loading technique to make userLogged be updated before 
  userLogged.

*/