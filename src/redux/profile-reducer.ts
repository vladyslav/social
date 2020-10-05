import { PostType, ProfileType, PhotosType } from './../types/types';
import { profileAPI } from '../api/profile-api';
import { stopSubmit, FormAction } from 'redux-form';
import { InferActionsTypes, BaseThunkType } from './redux-store';

export type InitialStateType = typeof initialState;
const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likes: 10 },
    { id: 2, message: 'It`s my first post', likes: 15 }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ''
};

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
      const newPost = { id: 5, message: action.newPostText, likes: 0 };
      return { ...state, posts: [...state.posts, newPost] };
    case 'SN/PROFILE/SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SN/PROFILE/SET_STATUS':
      return { ...state, status: action.status };
    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      };
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({ type: 'SN/PROFILE/ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) =>
    ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) =>
    ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  deletePost: (postId: number) =>
    ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
};

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async dispatch => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async dispatch => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) dispatch(actions.setStatus(status));
};

export const savePhoto = (file: File): ThunkType => async dispatch => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0)
    dispatch(actions.savePhotoSuccess(data.data.photos));
};

export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('userId cannot be null');
    }
  } else {
    dispatch(stopSubmit('editProfile', { error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
