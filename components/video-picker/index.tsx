import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  label?: string;
  containerStyles?: string;
  value?: string;
  onVideoChange(image: ImagePicker.ImagePickerAsset): void;
};

const VideoPicker = ({
  containerStyles,
  label,
  value,
  onVideoChange: onImageChange,
}: Props) => {
  const handlePickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0]);
    }
  };

  return (
    <View className={containerStyles}>
      {label && <Text className="font-pregular text-gray-100">{label}</Text>}
      <TouchableOpacity
        onPress={handlePickVideo}
        className="rounded-xl overflow-hidden"
      >
        <ImageBackground
          source={{ uri: value }}
          resizeMode="cover"
          className={`justify-center items-center h-[220px] w-full bg-black-100`}
        >
          <View className="items-center justify-center border border-dashed border-secondary-100 h-16 w-16 rounded-lg">
            <Image
              source={icons.upload}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPicker;
