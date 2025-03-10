import { ImageBackground, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import LogoSvg from '@/assets/logo.svg'
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "@/components/input";
import { ArrowRight, Envelope, LockKey } from "phosphor-react-native";
import { Button } from "@/components/button";
import colors from 'tailwindcss/colors'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react";
import { useRouter } from "expo-router";

const APP_BAR = 50

const signInFormSchema = zod.object({
  email: zod.string().email('Email inválido.'),
  password: zod.string().min(6, 'A senha deve conter no mínimo 6 caracteres.'),
})

type SignInFormData = zod.infer<typeof signInFormSchema>

export default function SignIn(){
  const router = useRouter()
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const screenHeight = useWindowDimensions().height

  const {control, handleSubmit, formState: {errors}, watch} = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  const isInvalidForm = !watch('email') || !watch('password')

  function handleSignIn(data: SignInFormData){
    console.log(data)
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
          source={require('@/assets/illustration-signin.png')} 
          className="flex-1"
          style={{height: screenHeight - APP_BAR}}
        >
          <LinearGradient
            colors={['rgba(2, 6, 23, 0.1)','#020617', '#020617']}
            className="flex-1 justify-end"
          >
            <View className=" min-h-[436] items-center justify-between mx-5 mb-10">
              <View className="gap-y-8">
                <View className="space-y-2">
                  <Text className="text-slate-100 text-4xl font-rajdhani-medium text-center">Conecte-se e organize {'\n'}os seus hábitos!</Text>
                  <Text className="text-slate-100 text-base font-inter-normal text-center">Crie tarefas diárias e analise seu desempenho</Text>
                </View>
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
                      onSubmitEditing={handleSubmit(handleSignIn)} 
                      placeholder="Senha"
                      icon={LockKey}
                      value={field.value}
                      onChangeText={field.onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />
                <Button 
                  onPress={handleSubmit(handleSignIn)}
                  disabled={isInvalidForm}
                >
                  <Button.Title>Acessar painel</Button.Title>
                </Button>
              </View>
              <TouchableOpacity 
                onPress={()=> router.navigate('/sign-up')}
                className="flex-row items-center gap-x-1"
              >
                <Text className="text-slate-100 font-inter-normal">Quero me cadastrar e iniciar minha jornada</Text>
                <ArrowRight color={colors.slate[100]} size={14}/>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  )
}