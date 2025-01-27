import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import * as ExpoImagePicker from 'expo-image-picker';

type Props = {
  containerStyles?: string;
  label?: string;
  value?: string;
  onImageChange(image: ExpoImagePicker.ImagePickerAsset): void;
};

const ImagePicker = ({
  containerStyles,
  label,
  value,
  onImageChange,
}: Props) => {
  const raisePickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) onImageChange(result.assets[0]);
  };

  return (
    <View className={`w-full flex gap-y-2 ${containerStyles}`}>
      <Text className="text-gray-100 font-pregular">{label}</Text>

      <TouchableOpacity
        className="bg-black-100 flex-row items-center justify-center rounded-lg overflow-hidden relative"
        onPress={raisePickImage}
      >
        <ImageBackground
          source={{ uri: value }}
          resizeMode="cover"
          className={`${
            value ? 'h-[200px]' : 'h-[60px]'
          } justify-center items-center flex-row gap-2 w-full`}
        >
          <Image
            source={icons.upload}
            className="h-8 w-8"
            resizeMode="contain"
          />
          <Text className="text-gray-100 font-pregular text-sm">
            Choose a file
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
