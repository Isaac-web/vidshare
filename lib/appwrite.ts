import { Account, Client, Databases, Query } from 'react-native-appwrite';

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

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

export const signIn = async (email: string, password: string) => {
  await account.deleteSession('current');
  await account.createEmailPasswordSession(email, password);

  return getCurrentUser();
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
