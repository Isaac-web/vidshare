import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onPress(): void;
  containerStyles?: string;
  titleStyles?: string;
  isLoading?: boolean;
};

const AppButton = ({
  title,
  onPress,
  containerStyles,
  titleStyles,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`w-full h-[60px] rounded-lg bg-secondary justify-center items-center ${
        isLoading ? 'opacity-50' : 'opacity-100'
      } ${containerStyles}`}
      onPress={onPress}
    >
      <View
        className={`w-full  h-[60px] rounded-lg bg-secondary justify-center items-center`}
      >
        <Text className={`text-primary text-lg font-psemibold ${titleStyles}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
