import React, { FC } from 'react';
import ProfileInfo from './ProfleInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  isOwner: boolean;
  profile: ProfileType;
  status: string;
  savePhoto: () => void;
  updateStatus: () => void;
  saveProfile: () => void;
};

const Profile: FC<PropsType> = ({
  isOwner,
  profile,
  status,
  savePhoto,
  updateStatus,
  saveProfile
}) => {
  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        savePhoto={savePhoto}
        updateStatus={updateStatus}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
