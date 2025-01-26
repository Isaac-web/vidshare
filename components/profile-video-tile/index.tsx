import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { Post } from '@/types';

type Props = {
  post: Post;
};

const ProfileVideoTile = ({ post }: Props) => {
  const windowWidth = Dimensions.get('window').width;
  const size = Math.floor(windowWidth / 3.8);

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        style={{ width: size, height: size, aspectRatio: 1 }}
        source={{ uri: post.thumbnail }}
      />
    </TouchableOpacity>
  );
};

export default ProfileVideoTile;
