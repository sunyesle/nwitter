import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
          className="formBtn"
          style={{ marginTop: 10 }}
        />
        <input
          type="submit"
          value="Change"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log Out
      </span>
    </div>
  );
};

export default Profile;
