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
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                mode="horizontal"
                theme="dark"
                defaultSelectedKeys={["2"]} //可变
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1">
                  <Link to="/dashboard">表单</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/studenttable">表格</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/toolsdemo">工具展示</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                {" "}
                <Switch>
                  <Route
                    path="/dashboard"
                    render={props => <DashBoard {...props} />}
                  />
                  <Route
                    path="/studenttable"
                    render={props => <StudentTable {...props} />}
                  />
                  <Route
                    path="/toolsdemo"
                    render={props => <ToolsDemo {...props} />}
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
