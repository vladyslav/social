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
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row>
        <Col span={20}>
          <div className={s.header}>
            <h1>
              Not<span>Facebook</span>
            </h1>
          </div>
        </Col>
        <Col span={4}>
          <div className={s.loginBlock}>
            {isAuth ? (
              <div>
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
