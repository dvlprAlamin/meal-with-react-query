import axios from 'axios';
import React, { useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import CustomButton from '../../components/Custom/CustomButton';
import Loader from '../../components/Custom/Loader';
import { client } from '../../query-client';
import './../../scss/posts.scss';
const Posts = () => {
    const titleRef = useRef();
    const bodyRef = useRef();
    const fetcher = async () => {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return data;
    }
    const poster = async body => {
        const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', body);
        return data;
    }
    const { data: posts, isLoading: isLoadingPost } = useQuery('posts', fetcher);
    const { mutate, isLoading } = useMutation((body) => poster(body), {
        onSuccess: (data) => {
            console.log('success', data);
            posts.unshift(data)
            titleRef.current.value = '';
            bodyRef.current.value = '';
        },
        onError: (err) => {
            console.log('error', err);
        }
    })


    const postHandler = e => {
        e.preventDefault();
        const newPost = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        mutate(newPost, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (err) => {
                console.log({ err });
            }
        })

    }
    if (isLoadingPost) return <Loader />
    return (
        <div className="post__page__style">
            <div className='container'>
                <form className='submit__form' onSubmit={postHandler}>
                    <input className='text__field' ref={titleRef} type="text" required placeholder='Enter Post Title' />
                    <textarea className='text__field' ref={bodyRef} required name="" id="" cols="30" rows="6" placeholder='Enter Post body'></textarea>
                    <CustomButton type="submit">Post</CustomButton>
                </form>
                <div className="post__container">
                    {
                        isLoading ? <Loader /> :
                            posts.map((post, i) => (
                                <div key={i} className='single__post'>
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Posts;