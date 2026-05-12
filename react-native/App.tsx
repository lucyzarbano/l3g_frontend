import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import RoomListScreen from './src/screens/RoomListScreen'
import PlaceListScreen from './src/screens/PlaceListScreen'

export type RootStackParamList = {
  Home: undefined
  Rooms: undefined
  Places: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Le Tre Gemme' }} />
        <Stack.Screen name="Rooms" component={RoomListScreen} options={{ title: 'Camere' }} />
        <Stack.Screen name="Places" component={PlaceListScreen} options={{ title: 'Luoghi da vedere' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
