const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Vlad' },
    { id: 2, name: 'Dima' },
    { id: 3, name: 'Stas' },
    { id: 4, name: 'Zhora' },
    { id: 5, name: 'Victor' }
  ],

  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your day?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: '???' },
    { id: 5, message: 'I love you' }
  ]
};

const dialogsReducer = (state = initialState, action) => {
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

export const addMessageActionCreator = (newMessageText) => ({
  type: ADD_MESSAGE,
  newMessageText
});

export default dialogsReducer;
