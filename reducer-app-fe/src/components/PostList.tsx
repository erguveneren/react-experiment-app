import { useContext, useEffect, useState, type ReactNode } from "react";
import { PostContext } from "./PostContext";
import type { Post } from "./Post.types";
import UserPost from "./UserPost";

export default function PostList() {
    const { posts, postsMap, counter, fetchPosts } = useContext(PostContext);  

    useEffect(() => {
        fetchPosts();
    }, [])

    return(
        <div className="postListBackground">
            <h1 className="titleHeader">FETCHED POSTS</h1>
            <h3>Total No. of Posts Available ({counter})</h3>
            <div className="postList">
                {
                    Array.from(postsMap.entries()).map(([userId, userPostsList]) => {
                        return (
                            <UserPost userId={userId} userPosts={userPostsList} key={userId} />
                        );
                    })
                }
            </div>
        </div>
    )
}