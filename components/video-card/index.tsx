import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import { Post } from '@/types';
import { useGlobalContext } from '@/context/global-context';
import { router } from 'expo-router';

type Props = {
  post: Post;
};

const VideoCard = ({ post }: Props) => {
  const { globalContext } = useGlobalContext();

  const handlePlayVideo = () => {
    globalContext?.setCurrentVideoSource(post.video);
    router.push('/video');
  };

  return (
    <>
      <View className="gap-y-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3">
            <View className="w-14 h-14 rounded-lg border-2 border-secondary justify-center items-center">
              <Image
                source={{ uri: post.users.avatar }}
                className="w-[95%] h-[95%]"
                resizeMode="cover"
              />
            </View>
            <View className="">
              <Text className="text-white font-psemibold" numberOfLines={1}>
                {post.title}
              </Text>
              <Text
                className="text-gray-100 font-pregular text-sm"
                numberOfLines={1}
              >
                {post.users.username}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-8 h-8  justify-center items-center">
            <Image source={icons.menu} className="h-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handlePlayVideo}>
          <ImageBackground
            className="w-full h-64 bg-black-100 rounded-lg overflow-hidden justify-center items-center"
            source={{ uri: post.thumbnail }}
          >
            <Image source={icons.play} className="w-16 h-16" />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VideoCard;
