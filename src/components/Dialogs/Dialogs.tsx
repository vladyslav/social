import React, { FC } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Textarea, createField } from '../common/FormsControl/FormsControl';
import { required, maxLengthCreator } from '../../helpers/validators';
import { InitialStateType } from '../../redux/dialogs-reducer';

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (message: string) => void;
};

const Dialogs: FC<PropsType> = ({ dialogsPage, sendMessage }) => {
  const state = dialogsPage;

  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} id={d.id} name={d.name} />
  ));

  const messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  const addNewMessage = (values: { newMessageText: string }) => {
    sendMessage(values.newMessageText);
  };

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          <div>{messagesElements}</div>
        </div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export type NewMessageFormValuesType = {
  newMessageText: string;
};
type NewMessageFormKeysType = Extract<keyof NewMessageFormValuesType, string>;
type OwnPropsType = {};
const maxLength50 = maxLengthCreator(50);

const AddMessageForm: FC<
  InjectedFormProps<NewMessageFormValuesType, OwnPropsType> & OwnPropsType
> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField<NewMessageFormKeysType>(
          'Enter your message',
          'newMessageText',
          [required, maxLength50],
          Textarea
        )}
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, OwnPropsType>({
  form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;
