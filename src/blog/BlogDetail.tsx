import React from "react";
import { Form, Select, Input, Button, Icon, message, Row, BackTop } from "antd";
import "./Blog.css";
import {
  DEFUALT_BLOG_ID,
  http,
  LocalUrl,
  RequestPaths,
  RoutePaths
} from "../Constant";
import _ from "lodash";
import URI from "urijs";
import ReactMarkdown from "react-markdown";
export interface BlogDetailState {
  id: number;
  blog_title: string;
  blog_author: string;
  blog_content: string;
  phone: string;
  wechatname: string;
  create_time: string;
}
interface blog {
  id: number;
  blog_title: string;
  blog_author: string;
  blog_content: string;
  phone: string;
  wechatname: string;
  create_time: string;
}
export class BlogDetail extends React.Component<any, BlogDetailState> {
  constructor(props: any) {
    super(props);
    console.log(props.location.search);
    const query_params = URI.parseQuery(props.location.search);
    console.log(props.location.search);
    const id = Number(_.get(query_params, "id", DEFUALT_BLOG_ID));
    this.state = {
      id: id,
      blog_title: "",
      blog_author: "",
      blog_content: "",
      phone: "",
      wechatname: "",
      create_time: ""
    };
  }
  componentWillMount(): void {
    this.GetBlog();
  }

  componentDidMount(): void {
    this.GetBlog();
  }

  GetBlog = () => {
    const { id } = this.state;
    const para: any = {
      id: id
    };
    const url = LocalUrl + RequestPaths.Get_Detail_Blog;
    console.log("para", para);
    http
      .post(url, para)
      .then(response => {
        console.log(response.data);
        let blogobj = response.data;
        this.setState({
          blog_title: blogobj.blog_title,
          blog_content: blogobj.blog_content,
          create_time: blogobj.create_time
        });
      })
      .catch(error => {
        console.log("", error);
        message.error("Published Error", error);
      })
      .finally();
  };

  render() {
    const { id, blog_title, blog_content, create_time } = this.state;
    console.log("详细页面", id);
    const MarkedTitle = "# " + blog_title;
    const MarkedCreate = "创建时间: " + create_time;
    const MarkedContent = blog_content;
    return (
      <div>
        <ReactMarkdown source={MarkedTitle} />
        <ReactMarkdown source={MarkedCreate} />
        <ReactMarkdown source={MarkedContent} />
        <BackTop>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
