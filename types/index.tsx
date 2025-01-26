export type User = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  username: string;
  email: string;
  accountId: string;
  avatar: string;
};

export type Post = {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  prompt: string;
  thumbnail: string;
  title: string;
  users: User;
  video: string;
};
