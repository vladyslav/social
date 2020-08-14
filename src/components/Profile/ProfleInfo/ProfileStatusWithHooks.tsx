import React, { useState, useEffect, FC, ChangeEvent } from 'react';

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
    setStatus(e.currentTarget.value);

  return (
    <>
      {!editMode && (
        <div>
          <b>Status:</b>{' '}
          <span onDoubleClick={activateEditMode}>
            {props.status || '-*-*-'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            autoFocus={true}
            onChange={onStatusChange}
            value={status}
          />
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;
