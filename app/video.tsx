import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Video = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full h-full flex justify-center items-center">
        <Text className="text-white">Play video</Text>
      </View>
      <StatusBar backgroundColor="#000000" />
    </SafeAreaView>
  );
};

export default Video;
