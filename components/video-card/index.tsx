import { View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { icons, images } from '@/constants';

const VideoCard = () => {
  return (
    <>
      <View className="gap-y-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3">
            <View className="w-14 h-14 rounded-lg border-2 border-secondary justify-center items-center">
              <Image
                source={images.logoSmall}
                className="w-[95%] h-[95%]"
                resizeMode="cover"
              />
            </View>
            <View className="">
              <Text className="text-white font-psemibold" numberOfLines={1}>
                Woman walks down a Tokyo
              </Text>
              <Text
                className="text-gray-100 font-pregular text-sm"
                numberOfLines={1}
              >
                Brandon Etter
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-8 h-8  justify-center items-center">
            <Image source={icons.menu} className="h-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View className="w-full h-64 bg-black-100 rounded-xl" />
      </View>
    </>
  );
};

export default VideoCard;
