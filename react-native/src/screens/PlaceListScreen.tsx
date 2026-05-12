import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { contentApi } from '../api/contentApi'
import type { Place } from '../types/content'

export default function PlaceListScreen() {
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    void contentApi.listPlaces().then(setPlaces)
  }, [])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  )
}
