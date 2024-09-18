import { Stack } from 'expo-router'
import Maplibre from '@maplibre/maplibre-react-native'

Maplibre.setAccessToken(null)
Maplibre.setConnected(true)

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
