import { View, FlatList, Text, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import AppStatusBar from '@/components/app-status-bar';
import SearchField from '@/components/search-input';
import Trending from '@/components/trending';
import VideoCard from '@/components/video-card';
import { useGlobalContext } from '@/context/global-context';
import { fetchPosts } from '@/lib/appwrite';
import { Post } from '@/types';
import useAppwrite from '@/hooks/useAppwrite';

const Home = () => {
  const { globalContext } = useGlobalContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: posts, refetch } = useAppwrite<Post>(fetchPosts);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="px-4">
            <VideoCard />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="w-full h-8" />}
        ListHeaderComponent={() => (
          <View className="px-4 py-4 mt-5">
            <View className="flex-row justify-between items-center">
              <View className="flex">
                <Text className="font-psemibold text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-white text-2xl font-psemibold">
                  {globalContext?.user?.username}
                </Text>
              </View>

              <View>
                <Image
                  source={images.logoSmall}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchField
              placeholder="Search for a video..."
              onChangeText={() => {}}
              containerStyles="mt-7"
            />

            <View className="mt-7">
              <Trending />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View className="h-10 w-full" />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      <AppStatusBar />
    </SafeAreaView>
  );
};

export default Home;
