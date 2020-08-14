import { InferActionsTypes } from './redux-store';

type DialogType = { id: number; name: string };
type MessageType = { id: number; message: string };

const initialState = {
  dialogs: [
    { id: 1, name: 'Vlad' },
    { id: 2, name: 'Dima' },
    { id: 3, name: 'Stas' },
    { id: 4, name: 'Zhora' },
    { id: 5, name: 'Victor' }
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your day?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: '???' },
    { id: 5, message: 'I love you' }
  ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SN/DIALOGS/ADD_MESSAGE':
      let newMessage = { id: 6, message: action.newMessageText };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const actions = {
  addMessageActionCreator: (newMessageText: string) =>
    ({
      type: 'SN/DIALOGS/ADD_MESSAGE',
      newMessageText
    } as const)
};

export default dialogsReducer;
