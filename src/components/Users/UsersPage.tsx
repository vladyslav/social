import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../common/preloader/Preloader';
import { getIsFetching } from '../../redux/users-selectors';
import { Users } from './Users';

type UserPagePropsType = {
  pageTitle: string;
};
export const UsersPage: FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
