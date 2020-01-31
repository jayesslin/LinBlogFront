import React from "react";
import "./App.css";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Row, Col, Avatar, Icon } from "antd";
import "antd/dist/antd.css";
// 可选地，上面的请求可以这样做
import {
  BrowserRouter,
  HashRouter,
  HashRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { DashBoard } from "./DashBoard";
import { StudentTable } from "./StudentTable";
import { ToolsDemo } from "./ToolsDemo";
import { DemoSubmitPage } from "./DemoSubmitPage";
import { RoutePaths } from "./Constant";
import { AccountForm } from "./AccountForm";

const { Header, Content, Footer } = Layout;
axios.defaults.baseURL = "http://localhost:8001";
axios
  .get("/ping")
  .then(function(response) {
    console.log("链接houduan：", response);
  })
  .catch(function(error) {
    console.log("请求失败", error);
  });

export class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Header style={{ background: "#fff" }}>
              <Menu
                mode="horizontal"
                theme="light"
                defaultSelectedKeys={[RoutePaths.DASHBOARD]} //可变
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key={RoutePaths.DASHBOARD}>
                  <Link to={RoutePaths.DASHBOARD}>
                    <Icon type="tag" />
                    表单一
                  </Link>
                </Menu.Item>
                <Menu.Item key={RoutePaths.DEMOSUBMITPAGE}>
                  <Link to={RoutePaths.DEMOSUBMITPAGE}>
                    <Icon type="tags" />
                    表单二
                  </Link>
                </Menu.Item>
                <Menu.Item key={RoutePaths.STUDENTTABLE}>
                  <Link to={RoutePaths.STUDENTTABLE}>
                    <Icon type="table" />
                    老师页面表格
                  </Link>
                </Menu.Item>
                <Menu.Item key={RoutePaths.TOOLSDEMO}>
                  <Link to={RoutePaths.TOOLSDEMO}>
                    <Icon type="deployment-unit" />
                    学生页面展示
                  </Link>
                </Menu.Item>
                <Menu.Item key={RoutePaths.Student_Form}>
                  <Link to={RoutePaths.Student_Form}>
                    <Icon type="form" />
                    个人页面展示
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Switch>
                  <PrivateRoute
                    path={RoutePaths.HOME}
                    component={DashBoard}
                    exact
                  />
                  <PrivateRoute
                    path={RoutePaths.DASHBOARD}
                    component={DashBoard}
                  />
                  <PrivateRoute
                    path={RoutePaths.DEMOSUBMITPAGE}
                    component={DemoSubmitPage}
                  />
                  <PrivateRoute
                    path={RoutePaths.STUDENTTABLE}
                    component={StudentTable}
                  />
                  <PrivateRoute
                    path={RoutePaths.TOOLSDEMO}
                    component={ToolsDemo}
                  />
                  <PrivateRoute
                    path={RoutePaths.Student_Form}
                    component={AccountForm}
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}> Jayesslin @2020 </Footer>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
function PrivateRoute({ component: Component, path: path, ...rest }: any) {
  console.log("path是:", path);
  return (
    <Route path={path} render={props => <Component {...props} {...rest} />} />
  );
}

export default App;
