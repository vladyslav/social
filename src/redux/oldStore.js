import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likes: 10 },
        { id: 2, message: 'It`s my first post', likes: 15 }
      ],
      newPostText: ''
    },

    dialogsPage: {
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
      ],
      newMessageText: ''
    },

    sidebar: {
      friends: [
        {
          id: 1,
          name: 'Vlad',
          img:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
        },
        {
          id: 2,
          name: 'Dima',
          img:
            'https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg'
        },
        {
          id: 3,
          name: 'Zhora',
          img: 'https://cdn.eso.org/images/thumb300y/eso1907a.jpg'
        }
      ]
    }
  },
  _callSubscriber() {
    console.log('state was changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
};

export default store;
window.store = store;
// store - OOP
