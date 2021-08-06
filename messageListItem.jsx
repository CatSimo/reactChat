import { IconContext } from 'react-icons';
import { CgPlayListRemove } from 'react-icons/cg'

export const MessageListItem = ({ message, removeMessage, user }) => {
  const { _id, messageText, userId, senderName, color } = message;

  const styles = {
    messageBlock: { margin: '5px', color: '#333', width: '60%', backgroundColor: `${(userId == user.id) ? 'rgba(255, 96, 61, 0.05)' : '#fff'}`, padding: '3px 5px', borderRadius: '5px' },
    messageText: { color: '#333' },
    buttonRemove: { width: '3em', height: '1.5em', padding: '0 5px', border: 'none', float: 'right', backgroundColor: 'transparent' },
  }

  const handleRemoveMessage = (id) => {
    removeMessage(id)
  }

  return (
    <div className={`d-flex ${userId == user.id ? 'justify-content-end' : ''}`}>
      <div style={styles.messageBlock} >
        {(userId !== user.id) && <span style={{ fontWeight: 'bold', color: userId == user.id ? 'rgb(48, 48, 48)' : `${color}` }}>{senderName}: </span>}
        <span style={styles.messageText}>{messageText}</span>
        {(userId == user.id) && (
          <button
            style={styles.buttonRemove}
            onClick={() => handleRemoveMessage(_id)}
          >
            <IconContext.Provider value={{ backgroundColor: 'transparent', color: 'f00', className: 'global-class-name' }}>
              <div>
                <CgPlayListRemove size={20} />
              </div>
            </IconContext.Provider>
          </button>
        )}
      </div>
    </div>
  )
}