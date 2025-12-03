import { useContext, useEffect } from "react";
import PostItem from "./PostItem";
import { PostContext } from "./PostContext";

export default function PostList() {
    const { posts, counter, fetchPosts } = useContext(PostContext);

    useEffect(() => {
        fetchPosts();
    }, [])

    return(
        <div style={{backgroundColor: "pink"}}>
            <h1>-- FETCHED POSTS --</h1>
            <h3>No. of Posts Available ({counter})</h3>
            {posts.map((post) => {
                return(
                    <PostItem key={post.id} id={post.id} title={post.title} body={post.body}></PostItem>
                )
            })}
        </div>
    )
}