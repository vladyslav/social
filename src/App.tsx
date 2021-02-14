import React, { FC, ComponentType, Component } from "react";
import {
  Route,
  withRouter,
  Switch,
  Redirect,
  BrowserRouter,
  Link,
} from "react-router-dom";
import "./App.css";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersPage";
import { LoginPage } from "./components/Login/LoginPage";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import { withSuspense } from "./components/hoc/withSuspense";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  ProfileOutlined,
  MessageOutlined,
  NotificationOutlined,
  SoundOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AppHeader } from "./components/Header/Header";

const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = { initializeApp: () => void };

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChat = withSuspense(ChatPage);

class App extends Component<MapPropsType & DispatchPropsType> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<MessageOutlined />}>
              <Link to="/messages">Messages</Link>
            </Menu.Item> */}
            <Menu.Item key="3" icon={<MessageOutlined />}>
              <Link to="/chat">Chat</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to="/developers">Developers</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<NotificationOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SoundOutlined />}>
              <Link to="/music">Music</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<SettingOutlined />}>
              <Link to="/settings">Settings</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <AppHeader />
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={"/profile"} />}
                />
                <Route path="/messages" render={() => <SuspendedDialogs />} />
                <Route
                  path="/profile/:userId?"
                  render={() => <SuspendedProfile />}
                />
                <Route
                  path="/developers"
                  render={() => <UsersPage pageTitle={"Samurai"} />}
                />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/chat" render={() => <SuspendedChat />} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "white",
              padding: "13px 50px",
            }}
          >
            NotFacebook ©2021 Created by Vladyslav Vasylenko
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
