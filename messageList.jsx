import React, { } from 'react'

import { ListGroup } from 'react-bootstrap'

import { MessageListItem } from './messageListItem'

const styles = {
  chatWelcome: { color: '#aaa', fontSize: '1.1em', margin: '0.5em 30px' },
  listStyles: {
    width: '95%',
    height: '68vh',
    border: 'none',
    overflow: 'auto',
    padding: '10px',
    margin: '5px'
  }
}

const MessageListNoMemo = ({ messages, removeMessage, user }) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <>
      <div style={styles.chatWelcome}>
        Welcome to Chat Room
      </div>
      <ListGroup variant='flush' style={styles.listStyles}>
        <span ref={messagesEndRef}></span>
        {messages.map((message) => (
          <MessageListItem
            key={message._id}
            message={message}
            removeMessage={removeMessage}
            user={user}
          />
        ))}
      </ListGroup>
    </>
  )
}

export const MessageList = React.memo(MessageListNoMemo);