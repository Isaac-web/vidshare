import { View, Text, FlatList } from 'react-native';
import React from 'react';

const data = [
  { $id: '1', title: 'Trending 1' },
  { $id: '2', title: 'Trending 2' },
  { $id: '3', title: 'Trending 3' },
  { $id: '4', title: 'Trending 4' },
];

const Trending = () => {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.$id}
      ItemSeparatorComponent={() => <View className="h-full w-3" />}
      renderItem={({ item }) => (
        <Text className="text-white/50">{item.title}</Text>
      )}
    />
  );
};

export default Trending;
