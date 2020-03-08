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

  render() {
    const { blog_data } = this.state;
    console.log(blog_data);
    let listData: any[] = [];
    for (let i = 0; i < blog_data.length; i++) {
      listData.push({
        href: "/page?id=" + blog_data[i].id,
        title: blog_data[i].blog_title,
        avatar: "https://api.uomg.com/api/rand.avatar",
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
          pageSize: 6
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" key="list-vertical-star-o" />,
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="message" text="2" key="list-vertical-message" />
            ]}
            // extra={
            //   <img
            //     width={272}
            //     alt="logo"
            //     src="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
            //   />
            // }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
    return (
      <div>
        <Row>
          <Col span={4}>
            <Row gutter={16}>
              <Statistic
                title="Feedback"
                value={"9999+"}
                prefix={<Icon type="like" />}
              />
            </Row>
            <br />
            <br />

            <br />

            {/*<Row>*/}
            {/*  <Calendar fullscreen={false} />*/}
            {/*</Row>*/}
          </Col>
          <Col span={16}>{bloglist}</Col>
          <Col span={4}>
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
