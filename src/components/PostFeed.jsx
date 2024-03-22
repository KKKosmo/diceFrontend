import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import axios from '../api/axios';

function PostFeed() {
    const { user, getUser } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [createTitle, setCreateTitle] = useState('');
    const [createContent, setCreateContent] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);

    useEffect(() => {
        if (!user) {
            getUser();
        }
        fetchPosts();
    }, [user]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        try {
            event.preventDefault();
            await axios.post('/api/posts', { title: createTitle, content: createContent });
            fetchPosts();
            setCreateTitle('');
            setCreateContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdatePost = async (postId) => {
        try {
            await axios.put(`/api/posts/${postId}`, { title: editTitle, content: editContent });
            fetchPosts();
            setEditTitle('');
            setEditContent('');
            setEditingPostId(null);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            {user ? (
                <div>
                    <h1>Post Feed</h1>
                    <div className="mb-3">
                        <h2>Create Post</h2>
                        <form onSubmit={handleCreatePost}>
                            <input type="text" className="form-control mb-2" placeholder="Title" value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} required />
                            <textarea className="form-control mb-2" placeholder="Content" value={createContent} onChange={(e) => setCreateContent(e.target.value)} required />
                            <button type="submit" className="btn btn-primary">Create Post</button>
                        </form>
                    </div>
                    <div>
                        <ul className="list-group">
                            {posts.map(post => (
                                <li className="list-group-item" key={post.id}>
                                    <p>{post.date}</p>
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                    {editingPostId === post.id ? (
                                        <>
                                            <input type="text" className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                            <textarea className="form-control mb-2" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                                            <button className="btn btn-primary mr-2" onClick={() => handleUpdatePost(post.id)}>Update</button>
                                            <button className="btn btn-secondary" onClick={() => setEditingPostId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-danger mr-2" onClick={() => handleDeletePost(post.id)}>Delete</button>
                                            <button className="btn btn-primary" onClick={() => {
                                                setEditTitle(post.title);
                                                setEditContent(post.content);
                                                setEditingPostId(post.id);
                                            }}>Edit</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <>
                    <Link className="btn btn-primary me-2" to="/Login">Login</Link>
                    <Link className="btn btn-primary" to="/Register">Register</Link>
                </>
            )}
        </div>
    );
}

export default PostFeed;
