import { styled } from 'nativewind'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { ImageBackground } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {BaiJamjuree_700Bold} from '@expo-google-fonts/bai-jamjuree'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'

const StyledStripes = styled(Stripes)

export default function Layout() {
const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoandedFonts] = useFonts ({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoandedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground 
      source={blurBg} 
      className="flex-1 relative bg-gray-900"
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade'}}>
        <Stack.Screen name='index' redirect={isUserAuthenticated} />
        <Stack.Screen name='memories' />
        <Stack.Screen name='new' />
      </Stack>
    </ImageBackground>
  )
}