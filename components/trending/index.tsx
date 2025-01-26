import { View, Text, FlatList } from 'react-native';
import React from 'react';
import useAppwrite from '@/hooks/useAppwrite';
import { fetchLatestPosts } from '@/lib/appwrite';
import { Post } from '@/types';
import TrendingPostCard from './trending-post-card';

type Props = {
  posts: Post[];
};

const Trending = ({ posts }: Props) => {
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      ItemSeparatorComponent={() => <View className="h-full w-3" />}
      renderItem={({ item }) => <TrendingPostCard post={item} />}
    />
  );
};

export default Trending;
