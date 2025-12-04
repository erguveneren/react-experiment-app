import type { Post } from "./Post.types";

export default function PostItem(props: Post) {
    return(
        <div className="postItem">
            <h4>Title: {props.title}</h4>
            <p>{props.body}</p>
        </div>
    )
}   