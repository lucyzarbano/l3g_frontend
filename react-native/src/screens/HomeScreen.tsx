import { Button, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Le Tre Gemme</Text>
      <Text style={styles.subtitle}>B&B nel cuore di Lentini</Text>
      <Button title="Camere" onPress={() => navigation.navigate('Rooms')} />
      <Button title="Luoghi da vedere" onPress={() => navigation.navigate('Places')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
  },
})
