import { useContext, useEffect, useState, type ReactNode } from "react";
import { PostContext } from "./PostContext";
import UserPost from "./UserPost";

export default function PostList() {
    const { posts, postsMap, counter, fetchPosts } = useContext(PostContext);
    const [isShowAll, setIsShowAll] = useState<boolean>(false);
    const [activeUserId, setActiveUserId] = useState<number>(-1);

    useEffect(() => {
        fetchPosts();
    }, [])

    const onShowAll = (event: any) => {
        event.preventDefault();
        setIsShowAll(true);
        setActiveUserId(-1);
    }

    const onShowByUser = (event: any) => {
        event.preventDefault();
        setActiveUserId(posts[0].userId);
        setIsShowAll(false);
    }

    const onNextUser = (event: any) => {
        event.preventDefault();
        setActiveUserId((currUserId) => {
            if(currUserId !== postsMap.size) return currUserId + 1;
            else return currUserId;
        });
        setIsShowAll(false);
    }

    const onPreviousUser = (event: any) => {
        event.preventDefault();
        setActiveUserId((currUserId) => {
            if(currUserId !== 1) return currUserId - 1;
            else return currUserId;
        });
        setIsShowAll(false);
    }

    return(
        <div className="postListBackground">
            <h1 className="titleHeader">FETCHED POSTS</h1>
            <h3>Total No. of Posts Available ({counter})</h3>
            <div className="showButtons">
                <button onClick={onShowAll}>Show All</button>
                <button onClick={onShowByUser}>Show By User</button>
            </div>
            <div className="postList">
                {isShowAll &&
                    Array.from(postsMap.entries()).map(([userId, userPostsList]) => {
                        return (
                            <UserPost userId={userId} userPosts={userPostsList} key={userId} />
                        );
                    })
                }

                {activeUserId > 0 &&
                    <div>
                        <UserPost userId={activeUserId} userPosts={postsMap.get(activeUserId)} key={activeUserId} />
                        <div className="previousUserButton">
                            <button onClick={onPreviousUser} disabled={activeUserId === posts[0].userId}>Previous User</button>
                        </div>
                        <div className="nextUserButton">
                            <button onClick={onNextUser} disabled={activeUserId === postsMap.size}>Next User</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}