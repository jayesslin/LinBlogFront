import React from "react";
import { Form, Select, Input, Button, Icon, Upload, Breadcrumb } from "antd";
import axios from "axios";
const { TextArea } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
export interface DashBoardState {
  projectname: string;
  projectdesc: string;
  phone: string;
  wechatname: string;
}
export class DashBoard extends React.Component<any, DashBoardState> {
  constructor(props: { location: string }) {
    super(props);
    this.state = {
      projectdesc: "",
      projectname: "",
      phone: "",
      wechatname: ""
    };
  }
  upload = () => {
    const { projectdesc, projectname, wechatname, phone } = this.state;
    let para = {
      projectdesc: projectdesc,
      projectname: projectname,
      wechatname: wechatname,
      phone: phone
    };
    axios.defaults.baseURL = "http://localhost:5000";
    console.log("canshu", projectname, projectdesc);
    axios
      .post("/upload/", para)
      .then(function(response) {
        console.log("[python]提交成功：", response);
      })
      .catch(function(error) {
        console.log("[python]提交失败", error);
      });
  };

  handlephone = (e: any) => {
    const { value } = e.target;
    this.setState({ phone: value });
  };
  handleprojectname = (e: any) => {
    const { value } = e.target;
    this.setState({ projectname: value });
  };
  handleprojectdesc = (e: any) => {
    const { value } = e.target;
    this.setState({ projectdesc: value });
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
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="book" />
            <span>提交细节</span>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          style={{ marginTop: "3%" }}
        >
          <Form.Item label="项目名">
            <Input onChange={this.handleprojectname} />
          </Form.Item>
          <Form.Item label="联系电话">
            <Input onChange={this.handlephone} placeholder="133xxxx" />
          </Form.Item>
          <Form.Item label="微信号">
            <Input onChange={this.handlewechatname} placeholder="xxxx" />
          </Form.Item>
          <Form.Item label="项目简介">
            <TextArea
              //value={value}
              onChange={this.handleprojectdesc}
              placeholder="项目简介"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item label="项目材料">
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件到此处</p>
              <p className="ant-upload-hint">支持多个文件上传</p>
            </Upload.Dragger>
            ,
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => this.upload()}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
