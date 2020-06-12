let initialState = {
  friends: [
    {
      id: 1,
      name: 'Vlad',
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
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
};

const sidebarReducer = (state = initialState, action) => {
  return state;
};

export default sidebarReducer;
