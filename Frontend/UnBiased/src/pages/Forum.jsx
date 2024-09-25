import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";
import '../forum.css'

function Forum({ isAuth }) {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                let q = collection(db, "Forum-Posts");
                const querySnapshot = await getDocs(q);
                const posts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPostList(posts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    const deletePost = async (id) => {
        if(!confirm("Are you sure you want to delete this?")){
            return;
        };
        try {
            await deleteDoc(doc(db, "Forum-Posts", id));
            setPostList(postList.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="ForumPage">
             {isAuth && <div class="createPostLink"><Link to="/createpost">Create Post</Link></div>}
            {loading && <>Loading...</>}
            {postList.length > 0 ? (
                postList.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="postHeader">
                            <div className="title">
                                <h1>{post.title}</h1>
                            </div>
                            <h5>@{post.author.name}</h5>
                        </div>
                        <div className="postTextContainer">
                            {post.postText}
                        </div>
                        <div className="deletePost">
                            {isAuth && post.author.id === auth.currentUser.uid && (
                                <button onClick={() => deletePost(post.id)}>
                                    &#128465;
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
           
        </div>
    );
}

export default Forum;


