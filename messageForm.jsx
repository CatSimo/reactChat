import React, { } from 'react';

import { Form, Button } from 'react-bootstrap';

import { GrEmoji } from 'react-icons/gr';
import { BsGear } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const styles = {
  form: { margin: '1em' },
  formControl: { width: '80%', border: 'none', paddingLeft: '1em', margin: '0 10px', color: '#333' },
  buttonSubmit: { fontSize: '1em', height: '1.4em', width: '5em', backgroundColor: '#ff5f4d', color: 'white', borderRadius: '5px', border: '1px solid #ff7f6d', marginRight: '5px', padding: '0 0.75em', marginTop: '5px' },
  icon: { width: '3em', height: '2em', backgroundColor: 'transparent', color: 'ff5f4d', border: 'none', marginRight: '5px' }
}

export const MessageForm = ({ user, sendMessage }) => {
  const [text, setText] = React.useState('')

  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      sendMessage({ messageText: text, senderName: user.userName, userId: user.id })
      setText('')
    }
  }

  return (
    <Form onSubmit={handleSendMessage} style={styles.form}>
      <Form.Group className='d-flex'>
        <Form.Control type='text' style={styles.formControl}
          value={text}
          onChange={handleChangeText}
          placeholder='Send a Message...'
        />
        <Button type='submit' style={styles.buttonSubmit}>
          Chat
        </Button>
        <Button type='button' style={styles.icon}>
          <IconContext.Provider value={{ color: 'ff5f4d', className: 'global-class-name' }}>
            <div>
              <GrEmoji size={34} />
            </div>
          </IconContext.Provider>
        </Button>
        <Button type='button' style={styles.icon}>
          <IconContext.Provider value={{ color: 'ff5f4d', className: 'global-class-name' }}>
            <div>
              <BsGear size={30} />
            </div>
          </IconContext.Provider>
        </Button>
      </Form.Group>
    </Form>
  )
}