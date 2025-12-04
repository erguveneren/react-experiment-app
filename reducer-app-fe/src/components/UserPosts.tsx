import type { ReactNode } from "react"

interface UserPostsProps {
    userId: number
    userPostsCount: number
    children?: ReactNode
}


export default function UserPosts({userId, userPostsCount, children, ...props}: UserPostsProps) {
    return(
        <div className="userHeader" {...props}>
            <h2>User {userId}</h2>
            <p>No. of Posts: {userPostsCount}</p>
            <div className="userPosts">
                {children}
            </div>
        </div>
    )
}   