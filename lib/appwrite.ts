import {
  Account,
  Client,
  Databases,
  ID,
  Models,
  Query,
  Storage,
  UploadProgress,
} from 'react-native-appwrite';
import { ImagePickerAsset } from 'expo-image-picker';
import { convertImagePickerAssetToFile } from './helper';
import { CreatePostFormType } from '@/types';

const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.takiy.aora',
  projectId: '6791bec1003762055056',
  databaseId: '6791c12a00117e4a3473',
  storageId: '6791c56f003ad767b5a9',
  userCollectionId: '6791c169000a6befe932',
  videoCollectionId: '679240600038beffea70',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  storageId,
  userCollectionId,
  videoCollectionId,
} = config;

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

export const signIn = async (email: string, password: string) => {
  await account.createEmailPasswordSession(email, password);

  return getCurrentUser();
};

export const signOut = () => {
  return account.deleteSession('current');
};

const getFileUrl = (file: Models.File) => {
  if (!file) throw new Error('File cannot be undefined.');

  let url;
  try {
    if (file.mimeType.startsWith('image'))
      url = storage.getFilePreview(storageId, file.$id);
    else if (file.mimeType.startsWith('video'))
      url = storage.getFileView(storageId, file.$id);

    return url?.toString();
  } catch (err) {
    throw new Error('Something went wrong while getting file url.');
  }
};

export const uploadFile = async (
  file: ImagePickerAsset,
  progressCallback?: (progress: UploadProgress) => void
) => {
  const newFile = await convertImagePickerAssetToFile(file);

  if (!newFile) return;

  const uploadedFile = await storage.createFile(
    storageId,
    ID.unique(),
    {
      name: file.fileName as string,
      size: newFile.size,
      type: newFile.type,
      uri: file.uri,
    },
    undefined,
    progressCallback
  );

  return getFileUrl(uploadedFile);
};

export const createPost = async (
  data: CreatePostFormType,
  callbacks?: {
    onVideoUploadProgress?: (progress: number) => void;
    onThumbnailUploadProgress?: (progress: number) => void;
  }
) => {
  if (!data.title || !data.thumbnail || !data.video || !data.prompt)
    throw new Error('Please fill in missing fields.');

  if (data.thumbnail) {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(data.thumbnail, ({ progress }) =>
        callbacks?.onThumbnailUploadProgress?.(progress)
      ),
      uploadFile(data.video, ({ progress }) =>
        callbacks?.onVideoUploadProgress?.(progress)
      ),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: data.title,
        prompt: data.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        users: data.userId,
      }
    );

    return newPost;
  }
};

export const getCurrentUser = async () => {
  const currentAccount = await account.get();
  if (!currentAccount) throw new Error('Account could not be found.');

  const { documents: users } = await databases.listDocuments(
    databaseId,
    userCollectionId,
    [Query.equal('accountId', currentAccount.$id)]
  );

  if (!users.length) throw new Error('User could not be found.');

  return users[0];
};

export const fetchPosts = async () => {
  const { documents: posts } = await databases.listDocuments(
    databaseId,
    videoCollectionId
  );

  return posts;
};

export const fetchUserPosts = async (userId: string) => {
  const { documents: posts } = await databases.listDocuments(
    databaseId,
    videoCollectionId,
    [Query.equal('users', userId)]
  );

  return posts;
};

export const fetchLatestPosts = async () => {
  const { documents: posts } = await databases.listDocuments(
    databaseId,
    videoCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(7)]
  );

  return posts;
};
