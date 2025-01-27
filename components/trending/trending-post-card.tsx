import { Post } from '@/types';
import { View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/global-context';

type Props = {
  post: Post;
};

const TrendingPostCard = ({ post }: Props) => {
  const { globalContext } = useGlobalContext();
  const handlePlayVideo = () => {
    globalContext?.setCurrentVideoSource(post.video);
    router.push('/video');
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePlayVideo}>
      <View
        style={{ height: 220, width: 130 }}
        className="rounded-lg overflow-hidden relative"
      >
        <Image
          className="w-full h-full brightness-50"
          source={{ uri: post.thumbnail }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.08)']}
          className="w-full h-20 absolute top-0 left-0 right-0 p-2"
        >
          <View className="h-14 w-14 rounded-full border-2 border-secondary justify-center items-center">
            <Image
              className="w-12 h-12 rounded-full"
              source={{ uri: post.users.avatar }}
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.8)']}
          className="w-full h-20 absolute bottom-0 left-0 right-0 justify-end p-2"
        >
          <View>
            <Text className="text-sm text-white/80 font-psemibold">
              @{post.users.username}
            </Text>
            <Text className="text-xs text-white/50 font-pregular">
              A month ago
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingPostCard;
