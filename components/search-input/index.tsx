import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants';

type Props = {
  containerStyles?: string;
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText(value: string): void;
};

const SearchField = ({
  label,
  containerStyles,
  keyboardType = 'default',
  placeholder,
  onChangeText,
}: Props) => {
  return (
    <View className={`flex gap-y-2 ${containerStyles}`}>
      {label && <Text className="text-gray-100">{label}</Text>}

      <View className="h-[60px] bg-black-100 rounded-lg px-5 relative justify-center">
        <TextInput
          className="flex-1 font-pregular text-white"
          placeholder={placeholder}
          placeholderTextColor={'#7B7B8B'}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />

        <TouchableOpacity className="h-10 w-10 justify-center items-center absolute right-2">
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;
