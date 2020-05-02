import React, { Component } from "react";
import { LocalUrl, RoutePaths, RequestPaths, http } from "../Constant";
import {
  Row,
  Col,
  Statistic,
  List,
  Avatar,
  Icon,
  Button,
  Layout,
  Menu
} from "antd";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {BlogTypesCategory} from "./BlogTypesCategory";
const { Header } = Layout;
export interface BlogHomeState {
  blog_data: any;
}
export class BlogHome extends Component<any, BlogHomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      blog_data: []
    };
  }
  componentDidMount(): void {
    this.getBlogData();
  }
  getBlogData = () => {
    const url = LocalUrl + RequestPaths.Get_Blog;
    let datas: [] = [];
    http
      .get(url)
      .then(response => {
        console.log("success：", response.data);
        datas = response.data;
        this.setState({
          blog_data: response.data
        });
      })
      .catch(err => {
        console.log("failed", err);
      })
      .finally();
    return datas;
  };
  getItemDescri=(content:any)=>{
    return <ReactMarkdown source={content} />
  }
  render() {
    const { blog_data } = this.state;
    console.log(blog_data);
    const BlogTypes =  <BlogTypesCategory/>;
    let listData: any[] = [];
    for (let i = 0; i < blog_data.length; i++) {
      listData.push({
        href: "/page?id=" + blog_data[i].id,
        title: blog_data[i].blog_title,
        description: "创建时间: " + blog_data[i].create_time,
        content:
          blog_data[i].blog_content != undefined
            ? blog_data[i].blog_content.toString().substring(0, 150)
            : []
      });
    }
    // @ts-ignore
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const bloglist = (
      <List

        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 7
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {/*{this.getItemDescri(item.content)}*/}
          </List.Item>
        )}
      />
    );
    return (
      <div style={{height:"60em"}}>
        <Row>
          <Col span={4} xs={4} sm={4} md={4} lg={4} xl={4} >
            {BlogTypes}
          </Col>
          <Col span={16} xs={16} sm={16} md={16} lg={16} xl={16}>{bloglist}</Col>
          <Col span={4} xs={4} sm={4} md={4} lg={4} xl={4}>
            <Row type="flex" justify={"end"}>
              <Col>
                <Link to={RoutePaths.ADDBLOG}>
                  <Button
                    size={"large"}
                    type="primary"
                    shape="circle"
                    icon="plus"
                  />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
