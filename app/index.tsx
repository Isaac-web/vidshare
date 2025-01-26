import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import AppButton from '@/components/app-button';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/context/global-context';
import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/types';

const Index = () => {
  const { globalContext } = useGlobalContext();

  const handleLoadAuth = async () => {
    try {
      const user = (await getCurrentUser()) as unknown as User;
      if (user) {
        globalContext?.setUser(user);
        globalContext?.setIsLoggedIn(true);
      }
    } catch (error) {
      globalContext?.setUser(null);
      globalContext?.setIsLoggedIn(false);
    } finally {
      globalContext?.setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadAuth();
  }, []);

  if (!globalContext?.isLoading && globalContext?.isLoggedIn)
    return <Redirect href={'/home'} />;

  return (
    <SafeAreaView className="items-center justify-center bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="h-full items-center px-4">
          <View className="mt-16">
            <Image
              source={images.logo}
              className="h-[70px] w-[125px]"
              resizeMode="contain"
            />
          </View>
          <View>
            <Image
              source={images.cards}
              className="h-[290px] w-[375px]"
              resizeMode="contain"
            />
          </View>

          <View className="mt-7 items-center relative">
            <Text className="text-white font-psemibold text-3xl">
              Discover Endless
            </Text>
            <Text className="text-white font-psemibold text-3xl text-center">
              Possibilities with <Text className="text-secondary">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[100px] h-[12px] absolute -right-5 bottom-0"
              resizeMode="contain"
            />
          </View>

          <View className="mt-5">
            <Text className="text-center text-gray-100 font-pregular">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
          </View>

          <AppButton
            title="Continue with Email"
            onPress={() => {
              router.push('/sigin-in');
            }}
            containerStyles="mt-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
