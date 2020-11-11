import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddComment from './AddComment'




export default function CommentsPostDetail() {
    const { postId } = useParams();
    const [ comments, setComments ] = useState([])
    useEffect(() => {
        fetch(`/api/v1/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
    }, [postId])

    const addComment = (comment) => {
        setComments(comments.concat(comment))

    }

    return (
        <div>
            {comments.map((comment) => {
                return <div key={comment.id}>{` Comment Author: ${comment.author}`}<br />{`Comment: ${comment.content}`} <hr /></div>
            })}
            <AddComment addComment={addComment}/>

        </div>
            )
}