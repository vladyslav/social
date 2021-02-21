import { FC } from 'react';
import {
  createField,
  Input,
  Textarea,
  GetStringKeys
} from '../../common/FormsControl/FormsControl';
import { reduxForm, InjectedFormProps } from 'redux-form';
import s from './ProfileInfo.module.css';
import sq from '../../common/FormsControl/FormsControl.module.css';
import { ProfileType } from '../../../types/types';
import { Button } from 'antd';

type PropsType = {
  profile: ProfileType;
};
type ProfileDataFormTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Button>Save</Button>
      </div>
      {error && <div className={sq.formSummaryError}>{error}</div>}
      <div>
        <b>Full Name:</b>{' '}
        {createField<ProfileDataFormTypeKeys>(
          'Full Name',
          'fullName',
          [],
          Input
        )}
      </div>
      <div>
        <b>About me:</b>{' '}
        {createField<ProfileDataFormTypeKeys>(
          'About me',
          'aboutMe',
          [],
          Textarea
        )}
      </div>
      <div>
        <b>Looking for a job:</b>{' '}
        {createField<ProfileDataFormTypeKeys>('', 'lookingForAJob', [], Input, {
          type: 'checkbox'
        })}
      </div>
      <div>
        <b>My professional skills:</b>{' '}
        {createField<ProfileDataFormTypeKeys>(
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

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'editProfile'
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
