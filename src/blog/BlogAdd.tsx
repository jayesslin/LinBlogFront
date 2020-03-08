import React from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Icon,
  message,
  Row,
  BackTop,
  Col
} from "antd";
import "./Blog.css";
import { http, LocalUrl, RequestPaths, RoutePaths } from "../Constant";
import { Redirect } from "react-router-dom";
const { TextArea } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
export interface BlogAddState {
  blog_title: string;
  blog_author: string;
  blog_content: string;
  phone: string;
  wechatname: string;
}
export class BlogAdd extends React.Component<any, BlogAddState> {
  constructor(props: { location: string }) {
    super(props);
    this.state = {
      blog_title: "",
      blog_author: "",
      blog_content: "",
      phone: "",
      wechatname: ""
    };
  }
  upload = () => {
    const {
      blog_title,
      blog_author,
      blog_content,
      wechatname,
      phone
    } = this.state;
    if (blog_title == "") {
      message.warn("Please Input Title");
      return;
    }
    if (blog_content == "") {
      message.warn("Type some contents");
      return;
    }
    const para: any = {
      blog_title: blog_title,
      blog_author: blog_author,
      blog_content: blog_content,
      wechatname: wechatname,
      phone: phone
    };
    const url = LocalUrl + RequestPaths.Add_Blog;
    console.log("para", para);
    http
      .post(url, para)
      .then(response => {
        console.log("提交成功：", response);
        message.success("Published Success");
        this.props.history.push(RoutePaths.BLOG);
      })
      .catch(error => {
        console.log("提交失败", error);
        message.error("Published Error");
      })
      .finally();
  };

  handlephone = (e: any) => {
    const { value } = e.target;
    this.setState({ phone: value });
  };
  handleBlogTitle = (e: any) => {
    const { value } = e.target;
    this.setState({ blog_title: value });
  };
  handleBlogAuthor = (e: any) => {
    const { value } = e.target;
    this.setState({ blog_author: value });
  };
  handleBlogContent = (e: any) => {
    const { value } = e.target;
    this.setState({ blog_content: value });
  };
  handlewechatname = (e: any) => {
    const { value } = e.target;
    this.setState({ wechatname: value });
  };

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div>
        <Form layout={"vertical"}>
          <Form.Item label="Title">
            <Input onChange={this.handleBlogTitle} />
          </Form.Item>
          {/*<Form.Item label="NetName">*/}
          {/*    <Input  onChange={this.handleBlogAuthor} placeholder="Jayess"/>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="WeChat">*/}
          {/*    <Input onChange={this.handlewechatname} placeholder="xxxx" />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item label="Phone">*/}
          {/*    <Input  onChange={this.handlephone} placeholder="133xxxx"/>*/}
          {/*</Form.Item>*/}
          <Form.Item label="Content">
            <TextArea
              //value={value}
              onChange={this.handleBlogContent}
              placeholder="..."
              autoSize={{ minRows: 18, maxRows: 200 }}
            />
          </Form.Item>
          {/*<Form.Item label="Cheating Pic">*/}

          {/*    <Upload.Dragger name="files" action="/upload.do">*/}
          {/*        <p className="ant-upload-drag-icon">*/}
          {/*            <Icon type="inbox" />*/}
          {/*        </p>*/}
          {/*        <p className="ant-upload-text">Click or Drag File Here</p>*/}
          {/*        /!*<p className="ant-upload-hint">支持多个文件上传</p>*!/*/}
          {/*    </Upload.Dragger>*/}
          {/*</Form.Item>*/}
          <Form.Item>
            <Row type={"flex"} justify={"center"}>
              <Col span={2}>
                <Button
                  type="default"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <Icon type="left" />
                </Button>
              </Col>
              <Col span={20}>
                <Row type={"flex"} justify={"center"}>
                  <Button
                    type="primary"
                    size={"large"}
                    onClick={() => this.upload()}
                  >
                    <Icon type="to-top" /> Publish
                  </Button>
                </Row>
              </Col>
              <Col span={2}></Col>
            </Row>
          </Form.Item>
        </Form>

        <BackTop>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
