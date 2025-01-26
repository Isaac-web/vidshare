import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoScreen = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  // const { isPlaying } = useEvent(player, 'playingChange', {
  //   isPlaying: player.playing,
  // });

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full h-full">
        <VideoView
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={true}
          style={{ flex: 1, width: '100%', height: '100%' }}
        />
      </View>

      <StatusBar backgroundColor="#000000" />
    </SafeAreaView>
  );
};

export default VideoScreen;
