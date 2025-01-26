import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';
import AppStatusBar from '@/components/app-status-bar';
import InfoBox from '@/components/info-box';
import { useGlobalContext } from '@/context/global-context';
import useAppwrite from '@/hooks/useAppwrite';
import { fetchUserPosts, signOut } from '@/lib/appwrite';
import ProfileVideoTile from '@/components/profile-video-tile';
import { Post } from '@/types';
import { useState } from 'react';
import { router } from 'expo-router';

const Profile = () => {
  const { globalContext } = useGlobalContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: posts, refetch } = useAppwrite<Post>(() =>
    fetchUserPosts(globalContext?.user?.$id as string)
  );

  const handleLogout = async () => {
    try {
      await signOut();
      globalContext?.setIsLoggedIn(false);
      globalContext?.setUser(null);

      router.replace('/sigin-in');
    } catch {
      Alert.alert('Something went wrong during logout.');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    setIsRefreshing(true);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        numColumns={3}
        renderItem={({ item: post }) => (
          <View className="px-4">
            <ProfileVideoTile post={post} />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="w-8 h-8" />}
        contentContainerClassName="item-center"
        ListHeaderComponent={() => (
          <View className="px-4 py-4 mt-5 mb-16">
            <View className="items-end">
              <TouchableOpacity
                className="h-12 w-12 bg-black-100/50 justify-center items-center rounded-lg"
                onPress={handleLogout}
              >
                <Image
                  className="h-6 w-6"
                  resizeMode="contain"
                  source={icons.logout}
                />
              </TouchableOpacity>
            </View>

            <View className="justify-center items-center gap-y-2">
              <View className="w-32 h-32 justify-center items-center bg-black-100/80 rounded-full border-2 border-secondary px-2">
                <Image
                  className="w-[100%] h-[85%] rounded-full"
                  resizeMode="cover"
                  source={{ uri: globalContext?.user?.avatar }}
                />
              </View>

              <InfoBox
                title={`@${globalContext?.user?.username}`}
                subtitle="Isaac Takiy"
                titleStyles="text-2xl"
              />
            </View>

            <View className="flex-row justify-center items-center gap-x-28 mt-7">
              <InfoBox
                title={posts.length.toString()}
                subtitle="Posts"
                titleStyles="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Views" titleStyles="text-xl" />
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

export default Profile;
