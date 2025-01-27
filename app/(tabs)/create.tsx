import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from '@/components/text-field';
import VideoPicker from '@/components/video-picker';
import { ImagePickerAsset } from 'expo-image-picker';

type CreateVideoFormType = {
  title: string;
  thumbnail: ImagePickerAsset | null;
  video: ImagePickerAsset | null;
};

const Create = () => {
  const [formData, setFormData] = useState<CreateVideoFormType>({
    title: '',
    thumbnail: null,
    video: null,
  });

  return (
    <SafeAreaView className="bg-primary flex-1">
      <KeyboardAwareScrollView>
        <View className="flex-1 w-full h-full mt-7 px-4">
          <Text className="text-white font-psemibold text-2xl">
            Upload Video
          </Text>

          <TextField
            label="Video Title"
            onChangeText={() => {}}
            containerStyles="mt-10"
            placeholder={'Give your video a catchy title...'}
          />

          <VideoPicker
            containerStyles="mt-7"
            label="Upload Video"
            value={formData.thumbnail?.uri}
            onImageChange={(image) =>
              setFormData({ ...formData, thumbnail: image })
            }
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Create;
