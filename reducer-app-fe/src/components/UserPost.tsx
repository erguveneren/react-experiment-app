import type { ReactNode } from "react"
import type { Post } from "./Post.types"
import PostItem from "./PostItem"

interface UserPostProps {
    userId: number
    userPosts: Post[] | undefined
    children?: ReactNode
}


export default function UserPost({userId, userPosts, children, ...props}: UserPostProps) {
    return(
        <div className="userHeader" {...props}>
            <h2>User {userId}</h2>
            <p>No. of Posts: {userPosts?.length}</p>
            <div className="userPosts">
                {userPosts?.map((post) => {
                    return(
                        <PostItem key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body}></PostItem>
                    )
                })}
            </div>
        </div>
    )
}   