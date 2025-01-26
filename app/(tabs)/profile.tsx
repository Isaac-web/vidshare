import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import AppStatusBar from '@/components/app-status-bar';
import VideoCard from '@/components/video-card';
import InfoBox from '@/components/info-box';
import { useGlobalContext } from '@/context/global-context';
import useAppwrite from '@/hooks/useAppwrite';
import { fetchUserPosts } from '@/lib/appwrite';

const data = [
  { $id: '1', label: 'Hello World 1' },
  { $id: '2', label: 'Hello World 2' },
  { $id: '3', label: 'Hello World 3' },
  { $id: '4', label: 'Hello World 4' },
];

const Profile = () => {
  const { globalContext } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="px-4">{/* <VideoCard post={} /> */}</View>
        )}
        ItemSeparatorComponent={() => <View className="w-full h-8" />}
        ListHeaderComponent={() => (
          <View className="px-4 py-4 mt-5 mb-16">
            <View className="items-end">
              <TouchableOpacity className="h-12 w-12 bg-black-100/50 justify-center items-center rounded-lg">
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
                  className="w-[95%] h-[95%] rounded-full"
                  resizeMode="cover"
                  source={images.logoSmall}
                />
              </View>

              <InfoBox
                title={`@${globalContext?.user?.username}`}
                subtitle="Isaac Takiy"
                titleStyles="text-2xl"
              />
            </View>

            <View className="flex-row justify-center items-center gap-x-28 mt-7">
              <InfoBox title="10" subtitle="Posts" titleStyles="text-xl" />
              <InfoBox title="1.2k" subtitle="Views" titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View className="h-10 w-full" />}
      />
      <AppStatusBar />
    </SafeAreaView>
  );
};

export default Profile;
