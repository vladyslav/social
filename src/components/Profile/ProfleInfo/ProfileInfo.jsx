import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <p>{profile.aboutMe}</p>
        <p>{profile.contacts.facebook}</p>
        <p>{profile.contacts.website}</p>
        <p>{profile.contacts.vk}</p>
        <p>{profile.contacts.twitter}</p>
        <p>{profile.contacts.instagram}</p>
        <p>{profile.contacts.youtube}</p>
        <p>{profile.fullName.github}</p>
        <p>{profile.userId.mainLink}</p>
        <p>{profile.lookingForAJob ? 'Yes!' : 'No'}</p>
        <p>{profile.lookingForAJobDescription}</p>
        <img src={profile.photos.large} alt=''></img>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
