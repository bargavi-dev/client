import React, { useEffect, useState } from 'react'
import { Button, Form, Header, Modal, Segment } from 'semantic-ui-react'
import Posts from './Posts'
import { useParams } from 'react-router-dom'


export default function AddComment(props) {
    const { postId } = useParams();
    const [ comments, setComment ] = useState([])
    const [ formOpen, setFormOpen ] = useState(false);
    const [ author, setAuthor ] = useState('')
    const [ content, setContent ] = useState('')


  const handleFormSubmitComment = (e) => {
    fetch(`/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            author: author,
            content: content,
            // approved: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
      .then(res => res.json())
      .then(data => {
          setFormOpen(false);
          props.addComment(data.comment);
          setAuthor('')
          setContent('')
      
    
        })
  
    }


    return (
        <div>
            <Modal
            trigger={<Button>Add New Comment</Button>}
            open={formOpen}
            onOpen={() => setFormOpen(true)}
            onClose={() => setFormOpen(false)}>
            <Modal.Header>Add a new comment</Modal.Header>
            <Modal.Content>
                <Form id="newCommentForm" onSubmit={handleFormSubmitComment} >
                    <Form.Input required label="Author" type="text"value={author} onChange={(e) => { setAuthor(e.target.value) }}></Form.Input>
                    <Form.Input required label="Content" type="text"value={content} onChange={(e) => { setContent(e.target.value) }}></Form.Input>

                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setFormOpen(false)}>Cancel</Button>
                <Button positive form="newCommentForm">Submit</Button>

            </Modal.Actions>
           
            </Modal>
            
        </div>
    )
}
