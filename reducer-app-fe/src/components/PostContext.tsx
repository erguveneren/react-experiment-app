import { createContext, useReducer } from "react";
import type { Post, PostAction,PostContextState} from "./Post.types";
import { PostActionTypes } from "./Post.enums";

const postReducer = (state: PostContextState, action: PostAction) => {
    switch(action.type) {
        case PostActionTypes.POST_FETCH_START:
            return {...state, loading: true, error: null};
        case PostActionTypes.POST_FETCH_SUCCESS:
            return {...state, loading: false, posts: action.payload, postsMap: action.payloadPostsMap, counter: action.payloadLength};
        case PostActionTypes.POST_FETCH_ERROR:
            return {...state, loading: false, error: action.payload};
    }
}

const initialState: PostContextState = {
    posts: [],
    postsMap: new Map<number,Post[]>(),
    counter: 0,
    loading: false,
    error: null,
    fetchPosts: async () => {},
};

const PostContext = createContext<PostContextState>(initialState);

const PostContextProvider = ({children}: {children: React.ReactNode}) => {

    //const val = 0;
    const [state,dispatch] = useReducer(postReducer, initialState);
    const fetchPosts = async () => {
        dispatch({type: PostActionTypes.POST_FETCH_START});
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");

            if(response.ok) {
                const fetchedPosts: Post[] = await response.json();
                var postsMap = new Map<number,Post[]>();

                fetchedPosts.map((post) => {
                    const newMap = new Map(postsMap);
                    const existingPosts = newMap.get(post.userId);

                    if(existingPosts) { // Add post to list
                        const updatedPosts = [...existingPosts, post];
                        newMap.set(post.userId,updatedPosts);
                    }
                    else { // Add new key and create list
                        const newPosts = [post];
                        newMap.set(post.userId,newPosts);
                    }

                    postsMap = new Map(newMap);
                })
                
                dispatch({type: PostActionTypes.POST_FETCH_SUCCESS, payload: fetchedPosts, payloadLength: fetchedPosts.length, payloadPostsMap: postsMap});
            }
            else {
                throw new Error("Could not fetch posts.");
            }
        } catch (error) {
            dispatch({type: PostActionTypes.POST_FETCH_ERROR, payload: (error as Error).message});
        };
    };


    return (
        <section id="post-contex-provider">
            <PostContext.Provider value={{...state, fetchPosts}}> 
                {children}
            </PostContext.Provider>
        </section>
    );
};

export {PostContext, PostContextProvider};