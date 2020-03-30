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
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { http, LocalUrl, RequestPaths, RoutePaths } from "../Constant";
import { Redirect } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";
const { TextArea } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
export interface BlogAddState {
  blog_title: string;
  blog_author: string;
  blog_content: string;
  phone: string;
  wechatname: string;
  markdownValue:any;
  blog_type:string[]
}
export class BlogAdd extends React.Component<any, BlogAddState> {
  constructor(props: { location: string }) {
    super(props);
    this.state = {
      blog_title: "",
      blog_author: "",
      blog_content: "",
      phone: "",
      wechatname: "",
      markdownValue:"",
      blog_type:[],
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
  updateMarkdown(value: any) {
    console.log(value);
    this.setState({ blog_content: value });
  }
  handleSelectChange=(value:any)=> {
    this.setState({ blog_type: value });
  };

  getSelectionChildren=()=>{
    const ss= <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Select Blog Types"
        defaultValue={['personal']}
        onChange={this.handleSelectChange}
        optionLabelProp="label"
    >
      <Option value="personal" label="Personal">
       Personal(个人）
      </Option>
      <Option value="work" label="Work">
        Work (工作)
      </Option>
      <Option value="Tech" label="Tech">

        Tech (技术)
      </Option>
      <Option value="algorithm" label="Algorithm">

        Algorithm (算法)
      </Option>
    </Select>;
    return ss
  }
  render(){
    const Blogtype =this.getSelectionChildren();
    return (
      <div>
        <Form layout={"vertical"}>
          <Form.Item >
            <Input size="large" placeholder={"Type some words about this blog"} onChange={this.handleBlogTitle} />
          </Form.Item>
          <Form.Item label="CONTENT">
            <SimpleMDE onChange={(value)=>this.updateMarkdown(value)} />
          </Form.Item>
          <Form.Item label="BLOG CLASS">
            {Blogtype}
          </Form.Item>
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
