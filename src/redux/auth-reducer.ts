import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodesEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { stopSubmit, FormAction } from 'redux-form';

export type initialStateType = typeof initialState;
const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USER_DATA':
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

type ActionsType = InferActionsTypes<typeof actions>;
export const actions = {
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaUrl }
    } as const),

  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'SN/auth/SET_USER_DATA',
      payload: { userId, email, login, isAuth }
    } as const)
};

export const getAuthUserData = (): ThunkType => async dispatch => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async dispatch => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const getCaptchaUrl = (): ThunkType => async dispatch => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async dispatch => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
