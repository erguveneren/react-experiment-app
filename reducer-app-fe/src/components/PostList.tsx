import { useContext, useEffect, useState, type ReactNode } from "react";
import PostItem from "./PostItem";
import { PostContext } from "./PostContext";
import type { Post } from "./Post.types";
import UserPosts from "./UserPosts";

export default function PostList() {
    const { posts, counter, fetchPosts } = useContext(PostContext);

    const [filteredPosts, setFilteredPosts] = useState<Map<number,Post[]>>(new Map<number,Post[]>());
  

    function addPostToMap(post: Post) {
        setFilteredPosts((prevMap) => {
            const newMap = new Map(prevMap);
            const existingPosts = newMap.get(post.userId);

            if(existingPosts) { // Add post to list
                const updatedPosts = [...existingPosts, post];
                newMap.set(post.userId,updatedPosts);
            }
            else { // Add new key and create list
                const newPosts = [post];
                newMap.set(post.userId,newPosts);
            }

            return newMap;
        });
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    useEffect(() => {
        posts.map((post) => {
            addPostToMap(post)
        })
    },[posts])

    return(
        <div className="postListBackground">
            <h1 className="titleHeader">FETCHED POSTS</h1>
            <h3>Total No. of Posts Available ({counter})</h3>
            <div className="postList">
                {
                    Array.from(filteredPosts.entries()).map(([userId, userPostsList]) => {
                        return (
                            <UserPosts userId={userId} userPostsCount={userPostsList.length} key={userId}>
                                {userPostsList.map((post) => {
                                    return(
                                        <PostItem key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body}></PostItem>
                                    )
                                })}
                            </UserPosts>
                        );
                    })
                }
            </div>
        </div>
    )
}