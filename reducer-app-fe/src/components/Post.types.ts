import type { PostActionTypes } from "./Post.enums";

export type PostContextState = {
  posts: Post[];
  postsMap: Map<number,Post[]>;
  counter: number;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostAction =
  | { type: PostActionTypes.POST_FETCH_START }
  | { type: PostActionTypes.POST_FETCH_SUCCESS; payload: Post[]; payloadLength: number; payloadPostsMap: Map<number,Post[]>}
  | { type: PostActionTypes.POST_FETCH_ERROR; payload: string};