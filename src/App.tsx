import React from "react";
import "./App.css";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Row, Col, Avatar } from "antd";
import "antd/dist/antd.css";
// 可选地，上面的请求可以这样做
import {
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
import { DASHBOARD, DEMOSUBMITPAGE, STUDENTTABLE, TOOLSDEMO } from "./Constant";

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
        <Router>
          <Layout>
            <Header style={{ background: "#fff" }}>
              <Menu
                mode="horizontal"
                theme="light"
                defaultSelectedKeys={[DASHBOARD]} //可变
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key={DASHBOARD}>
                  <Link to={DASHBOARD}>表单</Link>
                </Menu.Item>
                <Menu.Item key={STUDENTTABLE}>
                  <Link to={STUDENTTABLE}>表格</Link>
                </Menu.Item>
                <Menu.Item key={TOOLSDEMO}>
                  <Link to={TOOLSDEMO}>工具展示</Link>
                </Menu.Item>
                <Menu.Item key={DEMOSUBMITPAGE}>
                  <Link to={DEMOSUBMITPAGE}>提交表单展示二</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Switch>
                  <Route
                    path={DASHBOARD}
                    render={props => <DashBoard {...props} />}
                  />
                  <Route
                    path={STUDENTTABLE}
                    render={props => <StudentTable {...props} />}
                  />
                  <Route
                    path={TOOLSDEMO}
                    render={props => <ToolsDemo {...props} />}
                  />
                  <Route
                    path={DEMOSUBMITPAGE}
                    render={props => <DemoSubmitPage {...props} />}
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}> Jayesslin @2020 </Footer>
          </Layout>
        </Router>
      </div>
    );
  }
}
export default App;
