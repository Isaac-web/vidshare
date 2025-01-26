import { View, Text } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
  subtitleStyle?: string;
};

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
  subtitleStyle,
}: Props) => {
  return (
    <View className={`justify-center items-center  ${containerStyles}`}>
      <Text className={`text-white font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      {subtitle && (
        <Text
          className={`text-gray-100 font-pregular text-sm ${subtitleStyle}`}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
