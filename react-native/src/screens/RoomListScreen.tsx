import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { contentApi } from '../api/contentApi'
import type { Room } from '../types/content'

export default function RoomListScreen() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    void contentApi.listRooms().then(setRooms)
  }, [])

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.title}</Text>
          <Text>{item.short_description}</Text>
        </View>
      )}
    />
  )
}
