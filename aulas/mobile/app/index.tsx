import { Text, TouchableOpacity, View } from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
import React from 'react'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/534a8c093312916b161d',
}

export default function App() {
  const router = useRouter()

  const [ response, promptAsync] = useAuthRequest({
    clientId: '534a8c093312916b161d',
    scopes: ['identify'],
    redirectUri: makeRedirectUri({
      scheme: 'nlwspacetime'
    }),
  },
  discovery
  )

  async function handleGitHubOAuthCode(code: String) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGitHubOAuthCode(code)
    }
  }, [response])

  function signInWithGithub(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <View className="flex-1 px-8 items-center" >
      <Text className="text-5xl font-bold text-gray-50">Rockeseat</Text>
      <View className="flex-1 intems-center justify-center gap-6">
          <NLWLogo />
        <View className="space-y-2">
            <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
            <Text>
              Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
            </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} className="rouded-full bg-green-500 px-5 py-2" onPress={() => signInWithGithub()}>
            <Text className="font-alt text-sm uppercase text-black">Cadastrar Lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">Feito com 💜 no NLW da Rocketseat</Text>
    </View>
  );
}
function useAuthRequest(arg0: { clientId: string; scopes: string[]; redirectUri: any; }, discovery: any): [any, any, any] {
  throw new Error('Function not implemented.');
}

