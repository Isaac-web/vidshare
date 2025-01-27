import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from '@/components/text-field';
import VideoPicker from '@/components/video-picker';
import ImagePicker from '@/components/image-picker';
import AppButton from '@/components/app-button';
import { createPost } from '@/lib/appwrite';
import { CreatePostFormType } from '@/types';
import { Alert } from 'react-native';
import { useGlobalContext } from '@/context/global-context';
import { router } from 'expo-router';

const Create = () => {
  const { globalContext } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);

  const [formData, setFormData] = useState<CreatePostFormType>({
    title: '',
    thumbnail: null,
    video: null,
    prompt: '',
    userId: globalContext?.user?.$id as string,
  });

  const resetForm = () => {
    setFormData({
      userId: globalContext?.user?.$id as string,
      title: '',
      thumbnail: null,
      video: null,
      prompt: '',
    });
  };

  const handleCreateVideo = async () => {
    if (!formData.title)
      return Alert.alert('Valiation Error', 'Title cannot be empty');
    if (!formData.thumbnail)
      return Alert.alert('Valiation Error', 'Thumbnail cannot be empty');
    if (!formData.video)
      return Alert.alert('Valiation Error', 'Video cannot be empty');
    if (!formData.prompt)
      return Alert.alert('Valiation Error', 'Prompt cannot be empty');

    try {
      setIsSubmitting(true);
      await createPost(formData, {
        onThumbnailUploadProgress(progress) {
          setVideoUploadProgress(progress);
        },
      });

      resetForm();
      router.replace('/home');
    } catch (error) {
      const err = error as Error;
      return Alert.alert('Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <KeyboardAwareScrollView>
        <View className="flex-1 w-full h-full mt-7 mb-5 px-4">
          <Text className="text-white font-psemibold text-2xl">
            Upload Video
          </Text>

          <TextField
            label="Video Title"
            onChangeText={(value) => setFormData({ ...formData, title: value })}
            containerStyles="mt-10"
            placeholder={'Give your video a catchy title...'}
            value={formData.title}
          />

          <VideoPicker
            containerStyles="mt-7"
            label="Upload Video"
            value={formData.video?.uri}
            onVideoChange={(video) => setFormData({ ...formData, video })}
          />

          <ImagePicker
            onImageChange={(image) => {
              setFormData({ ...formData, thumbnail: image });
            }}
            value={formData.thumbnail?.uri}
            label="Thumbnail Image"
            containerStyles="mt-7"
          />

          <TextField
            label="Prompt"
            onChangeText={(value) =>
              setFormData({ ...formData, prompt: value })
            }
            containerStyles="mt-10"
            placeholder={'AI prompt for your video...'}
            value={formData.prompt}
          />

          <AppButton
            title="Submit & Publish"
            onPress={handleCreateVideo}
            containerStyles="mt-14"
            isLoading={isSubmitting}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Create;
