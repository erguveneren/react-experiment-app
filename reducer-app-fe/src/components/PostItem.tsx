import type { Post } from "./Post.types";

export default function PostItem(props: Post) {
    return(
        <div>
            <h2>Post ID: {props.id}</h2>
            <h4>Title: {props.title}</h4>
            <p>{props.body}</p>
        </div>
    )
}   