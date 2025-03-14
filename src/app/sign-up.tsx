import { ImageBackground, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import LogoSvg from '@/assets/logo.svg'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { ArrowLeft, ArrowRight, Envelope, LockKey, User } from "phosphor-react-native";
import { Button } from "@/components/button";
import colors from "tailwindcss/colors";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { ToastMessage } from "@/components/toast-message";
import { useSessions } from "@/contexts/sessions";
import { AxiosError } from "axios";

const APP_BAR = 50

const signUpFormSchema = zod.object({
  name: zod.string().min(3, 'O nome deve conter no mínimo 3 caracteres.'),
  email: zod.string().email('Email inválido.'),
  password: zod.string().min(6, 'A senha deve conter no mínimo 6 caracteres.'),
})

type SignUpFormData = zod.infer<typeof signUpFormSchema>

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const {signUp} = useSessions()
  const router = useRouter()
  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const screenHeight = useWindowDimensions().height

  const {control, handleSubmit, watch, formState: {errors}} = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema)
  })

  const isInvalidForm = !watch('name') ||!watch('email') || !watch('password') 

  async function handleSignUp(data: SignUpFormData){
    
    try{
      setIsLoading(true)
      const {name, email, password} = data

      await signUp(name, email, password)
      router.replace('/')
    }catch(error){
      if(error instanceof AxiosError){
        const status = error.response?.status ?? 500

        switch(status){
          case 409:
            Toast.show({
              type: 'error',
              text1: 'Já existe uma conta com este e-mail. Tente outro endereço ou faça login.',
            })
            break
          default:
            Toast.show({
              type: 'error',
              text1: 'Ops! Ocorreu um erro ao criar sua conta, tente novamente mais tarde',
            })
        }
        
      }
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <View className=" bg-slate-950 h-full">
      {/* Header */}
      <View className="flex-row items-center gap-x-4 px-5 pt-12 pb-4">
        <LogoSvg width={32} height={32}/>
        <Text className="text-white text-2xl font-rajdhani-medium">My Habbits</Text>
      </View>

      {/* Main */}
      <KeyboardAwareScrollView >
        <ImageBackground 
          source={require('@/assets/illustration-signup.png')} 
          className="flex-1"
          style={{height: screenHeight - APP_BAR}}
        >
          <LinearGradient
            colors={['rgba(2, 6, 23, 0.1)','#020617', '#020617']}
            className="flex-1 justify-end"
          >
            <View className=" min-h-[536] items-center justify-between mx-5 mb-10">
              <View className="gap-y-8">
                <View className="space-y-2">
                  <Text className="text-slate-100 text-4xl font-rajdhani-medium text-center">Cadastre-se e inicie sua jornada!</Text>
                  <Text className="text-slate-100 text-base font-inter-normal text-center">Crie tarefas e monte sua jornada para atingir seu objetivo </Text>
                </View>
                <Controller
                  name="name"
                  control={control} 
                  render={({field}) =>(
                    <Input
                      ref={nameInputRef}
                      onSubmitEditing={() => emailInputRef.current?.focus()}
                      returnKeyType="next"
                      placeholder="Nome" 
                      icon={User}
                      value={field.value}
                      onChangeText={field.onChange}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control} 
                  render={({field}) =>(
                    <Input
                      ref={emailInputRef}
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      returnKeyType="next"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="E-mail" 
                      icon={Envelope}
                      value={field.value}
                      onChangeText={field.onChange}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({field}) =>(
                    <Input
                      ref={passwordInputRef}
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(handleSignUp)} 
                      placeholder="Senha"
                      icon={LockKey}
                      value={field.value}
                      onChangeText={field.onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />
                <Button 
                  onPress={handleSubmit(handleSignUp)}
                  disabled={isInvalidForm}
                  isLoading={isLoading}
                >
                  <Button.Title>Criar minha conta</Button.Title>
                </Button>
              </View>
              <TouchableOpacity 
                onPress={()=> router.back()}
                className="flex-row items-center gap-x-1"
              >
                <ArrowLeft color={colors.slate[100]} size={14}/>
                <Text className="text-slate-100 font-inter-normal">Quero entrar e continuar minha jornada</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
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