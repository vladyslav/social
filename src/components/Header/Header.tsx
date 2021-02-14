import React, { FC } from "react";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Layout from "antd/lib/layout";
import { Button, Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuth,
  selectCurrentUserLogin,
} from "../../redux/auth-selectors";
import { logout } from "../../redux/auth-reducer";

export const AppHeader: FC = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const logoutCallback = () => dispatch(logout());

  return (
    <Header className="header-header" style={{ height: 45, lineHeight: 45}}>
      <Row style={{ height: 45 }}>
        <Col style={{ height: 45 }} span={20}>
          <div className={s.header}>
            <h1>
              Not<span>Facebook</span>
            </h1>
          </div>
        </Col>
        <Col style={{ height: 45 }} span={4}>
          <div style={{ height: 45 }} className={s.loginBlock}>
            {isAuth ? (
              <div style={{ height: 45 }}>
                <Avatar alt={login || ""} icon={<UserOutlined />} />
                <Button onClick={logoutCallback}>Log Out</Button>
              </div>
            ) : (
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Header>
  );
};
