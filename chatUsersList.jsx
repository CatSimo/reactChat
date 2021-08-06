import React, { useState } from 'react';

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { GrSearch } from 'react-icons/gr';

import { IconContext } from 'react-icons';

const styles = {
  userListBlock: { padding: '1em 2em', width: '100%', fontSize: '1.1em' },
  activeUsers: { textAlign: 'center', marginBottom: '1em' },
  searchField: { fontSize: '0.9em', color: '#aaa', margin: '5px auto', textAlign: 'center', border: '1px solid #aaa', borderRadius: '4px', padding: '3px 10px', width: '13em' },
  ownerName: { color: '#ff5f4d' },
  title: { clear: 'both', marginTop: '1em' },
  userBanned: { color: 'red', padding: '0 0.5em', fontWeight: 'lighter' },
  modalStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1em'
    }
  },
  modalUserName: { textAlign: 'center', fontSize: '1.1em' },
  modalUserAvatar: { margin: '1em auto' } 
}

const ChatUsersListNoMemo = ({ users, state, owner, toggleUserBan }) => {
  // search/filter
  const [userSample, setUserSample] = useState('');
  const [foundUsers, setFoundUsers] = useState(users);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = users.filter((user) => {
        return user.userName.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      // If the text field is empty, show all users
      setFoundUsers(users);      
    }
    setUserSample(keyword);
  };

  // modal form
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userModal, setUserModal] = useState(null);

  const openModal = (user) => {
    setUserModal(user);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);    
  }

  const toggleBan = (user) => {
    if(owner.id == state.ownerId) {
      toggleUserBan(user.userId);
      setIsOpen(false);     
    } else {
      // authorized user hasn't rights to ban/unban this user
    }
  }

  return (
    <div style={styles.userListBlock}>

      <div style={styles.activeUsers}>Active Users in Chat</div>

      <div style={styles.searchField}>
        <IconContext.Provider value={{ className: 'global-class-name' }}>
          <GrSearch size={14}/>
        </IconContext.Provider>
        <input type='search' value={userSample} placeholder="Search User"
          className='search-user'
          onChange={filter}         
        />
      </div>
      
      <div style={styles.title}>Streamer</div>
      <div style={styles.ownerName}>{state.owner}</div>
      <div style={styles.title}>Users</div>

      {foundUsers.map(user => (
        <div key={user._id}             
          className='user'          
          onClick={() => openModal(user)}
          style={{ color: user.isOnline ? '#ff5f4d' : '#aaa' }}   
        >
          {user.userName}
          {user.banned && <span style={styles.userBanned}>banned</span> }
        </div>
      ))}  

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles.modalStyles}
        contentLabel="control chat user"
      >
        <div className="channel__author__photo" style={styles.modalUserAvatar}>
          <img src="/img/channels/1/avatar.png" alt="Dalila Paula" />
        </div>
        {userModal && <div style={styles.modalUserName}>{userModal.userName}</div>}
        {userModal && <button className='private-button' onClick={() => toggleBan(userModal)}>{userModal.banned ? 'Unban' : 'Ban' } user</button>}
      </Modal>

    </div>
  )
}

export const ChatUsersList = React.memo(ChatUsersListNoMemo)