import React, { FC } from 'react';
import ProfileInfo from './ProfleInfo/ProfileInfo';
import { ProfileType } from '../../types/types';

type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  savePhoto: (file: File) => void;
  updateStatus: (text: string) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
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
    </div>
  );
};

export default Profile;
