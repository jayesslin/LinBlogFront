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
import { BlogHome } from "./blog/BlogHome";
import { BlogAdd } from "./blog/BlogAdd";
import { BlogDetail } from "./blog/BlogDetail";
const { Header, Content, Footer } = Layout;
export class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <HashRouter>
          <Layout>
            <Header style={{height:"5em", background: "#fff" }}>
              <Menu
                mode="horizontal"
                theme="light"
                defaultSelectedKeys={[RoutePaths.BLOG]} //可变
              >
                <Menu.Item key={RoutePaths.BLOG}>
                  <Link to={RoutePaths.BLOG}>
                    <Icon type="font-size" />
                    Lin BLOG
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 50px"  ,background: "#fff" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Switch>
                  <PrivateRoute
                    path={RoutePaths.HOME}
                    component={BlogHome}
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
                  <PrivateRoute path={RoutePaths.BLOG} component={BlogHome} />
                  <PrivateRoute path={RoutePaths.ADDBLOG} component={BlogAdd} />
                  <PrivateRoute
                    path={RoutePaths.BlogDetail}
                    component={BlogDetail}
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}> Jayesslin @2020 </Footer>
          </Layout>
        </HashRouter>
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
