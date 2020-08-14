import React, { ComponentType, FC } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

const mapStateToPropsRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
});

type MapPropsType = {
  isAuth: boolean;
};

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
  const RedirectComponent: FC<MapPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to='/login' />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  const ConnectedRedirectComponent = connect<
    MapPropsType,
    {},
    WCP,
    AppStateType
  >(mapStateToPropsRedirect)(RedirectComponent);

  return ConnectedRedirectComponent;
}
