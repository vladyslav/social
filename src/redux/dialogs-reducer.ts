const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
  id: number;
  name: string;
};
type MessageType = {
  id: number;
  message: string;
};

let initialState = {
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

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = { id: 6, message: action.newMessageText };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

type addMessageActionType = {
  type: typeof ADD_MESSAGE;
  newMessageText: string;
};
export const addMessageActionCreator = (
  newMessageText: string
): addMessageActionType => ({
  type: ADD_MESSAGE,
  newMessageText
});

export default dialogsReducer;
