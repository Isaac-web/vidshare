import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextField from '@/components/text-field';
import { images } from '@/constants';
import { useState } from 'react';
import AppButton from '@/components/app-button';
import { router } from 'expo-router';
import { signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/global-context';
import { User } from '@/types';

const SignIn = () => {
  const { globalContext } = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    if (!form.email)
      return Alert.alert('Vadition Error', 'Please enter a valid email.');
    if (!form.password) return Alert.alert('Error', 'Please enter a password.');

    try {
      const user = (await signIn(form.email, form.password)) as unknown as User;

      globalContext?.setUser(user);
      globalContext?.setIsLoggedIn(true);
      globalContext?.setIsLoading(false);

      router.push('/home');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{ height: '100%' }}
        contentContainerClassName="justify-center items-center"
      >
        <View className="w-full h-full px-4 py-10">
          <Image
            source={images.logo}
            className="h-[70px] w-[125px] my-10"
            resizeMode="contain"
          />

          <Text className="text-white text-2xl font-psemibold">Sign in</Text>

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
            isLoading={isSubmitting}
            containerStyles="mt-12"
          />

          <TouchableOpacity
            className="items-center mt-7"
            onPress={() => router.push('/sign-up')}
          >
            <Text className="text-gray-100 font-pregular">
              Don't have an account?{' '}
              <Text className="text-secondary font-psemibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
