import React, { FC } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import {
  Input,
  createField,
  GetStringKeys
} from '../common/FormsControl/FormsControl';
import { required } from '../../helpers/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControl/FormsControl.module.css';
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        'Email',
        'email',
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        'Password',
        'password',
        [required],
        Input,
        {
          type: 'password'
        }
      )}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        'rememberMe',
        [],
        Input,
        { type: 'checkbox' },
        'remember me'
      )}
      {captchaUrl && <img src={captchaUrl} alt='' />}
      {captchaUrl && createField('Captcha', 'captcha', [required], Input)}
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: FC<MapStatePropsType & MapDispatchPropsType> = ({
  isAuth,
  captchaUrl,
  login
}) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
