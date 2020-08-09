import { PostType, ProfileType, PhotosType } from './../types/types';
import { profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likes: 10 },
    { id: 2, message: 'It`s my first post', likes: 15 }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = { id: 5, message: action.newPostText, likes: 0 };
      return { ...state, newPostText: '', posts: [...state.posts, newPost] };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId)
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    default:
      return state;
  }
};

type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): AddPostActionType => ({
  type: ADD_POST,
  newPostText
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId
});

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) dispatch(setStatus(status));
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0)
    dispatch(savePhotoSuccess(response.data.data.photos));
};

export const saveProfile = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const userId = getState().auth.userId;
  let response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('editProfile', { error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
