import React from 'react';
import {
  createField,
  Input,
  Textarea
} from '../../common/FormsControl/FormsControl';
import { reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import sq from '../../common/FormsControl/FormsControl.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={sq.formSummaryError}>{error}</div>}
      <div>
        <b>Full Name:</b> {createField('Full Name', 'fullName', [], Input)}
      </div>
      <div>
        <b>About me:</b> {createField('About me', 'aboutMe', [], Textarea)}
      </div>
      <div>
        <b>Looking for a job:</b>{' '}
        {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>
      <div>
        <b>My professional skills:</b>{' '}
        {createField(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>
      <div>
        <b>Contacts:</b>{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>
                {key}: {createField(key, 'contacts.' + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
