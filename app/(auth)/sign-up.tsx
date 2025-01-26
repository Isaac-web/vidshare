import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import TextField from '@/components/text-field';
import { images } from '@/constants';
import { useState } from 'react';
import AppButton from '@/components/app-button';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '', username: '' });

  const handleLogin = () => {
    console.log(form);
    // router.replace('/home');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAwareScrollView
        contentContainerStyle={{ height: '100%' }}
        contentContainerClassName="justify-center items-center"
      >
        <View className="w-full h-full px-4 py-10">
          <Image
            source={images.logo}
            className="h-[70px] w-[125px] my-10"
            resizeMode="contain"
          />

          <Text className="text-white text-2xl font-psemibold">Sign up</Text>

          <TextField
            label="Username"
            placeholder="Enter your username"
            containerStyles="mt-7"
            onChangeText={(value) => {
              setForm({ ...form, email: value });
            }}
          />
          <TextField
            label="Email"
            placeholder="Enter your email"
            containerStyles="mt-7"
            keyboardType="email-address"
            onChangeText={(value) => {
              setForm({ ...form, email: value });
            }}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            containerStyles="mt-7"
            onChangeText={(value) => {
              setForm({ ...form, password: value });
            }}
            isSecure
          />

          <View className="items-end mt-5">
            <Text className="text-gray-100 font-pregular">
              Forgot password?
            </Text>
          </View>

          <AppButton
            title="Login"
            onPress={handleLogin}
            containerStyles="mt-12"
          />

          <TouchableOpacity
            className="items-center mt-7"
            onPress={() => router.back()}
          >
            <Text className="text-gray-100 font-pregular">
              Aleady have an account?{' '}
              <Text className="text-secondary font-psemibold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
