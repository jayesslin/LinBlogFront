import * as React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  message,
  Result,
  Row,
  Select,
  Spin,
  Tooltip
} from "antd";
import "./App.css";
import moment from "moment";
import axios from "axios";
import { API_PREFIX, RoutePaths } from "./Constant";
const Option = Select.Option;
const { RangePicker } = DatePicker;

const http = axios.create();
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      const loginurl = API_PREFIX + RoutePaths.LOGIN_PREFIX;
      console.log("Exception", error);
      //location.pathname = loginurl.toString();
    }
    return Promise.reject(error);
  }
);
type Product = {
  app_id: number;
  name: string;
};
type DemoSubmitPageProps = {
  [propName: string]: any;
};

type DemoSubmitPageState = {
  title?: string;
  submitting: boolean;
  done: boolean;
  ticket_id: number | undefined;
  start_time: moment.Moment;
  end_time: moment.Moment;
  device_id: string;
  loading_netlog_command_result: boolean;
  seq: string;
  selected_wifi: number;
  upload_size: number;
  local_log_size: number;
  log_level: number;
  disable_detail: boolean;
  aid: number;
  app_name: string;
  productOptions: Product[];
  uid: number;
  seletProduct?: Product;
};

export class DemoSubmitPage extends React.Component<
  DemoSubmitPageProps,
  DemoSubmitPageState
> {
  constructor(props: DemoSubmitPageProps) {
    super(props);
    const end_time = moment();

    const start_time = end_time.clone().subtract(1, "hours");
    const device_id = ""; //57857781538
    const uid = 0; //默认为0
    const seq = ""; //20190315009
    const upload_size = 5;
    const local_log_size = 50;
    const log_level = 2;
    const aid = 13;

    this.state = {
      ticket_id: undefined,
      title: undefined,
      submitting: false,
      done: false,

      start_time: start_time,
      end_time: end_time,
      device_id: device_id,
      loading_netlog_command_result: false,
      app_name: "11",
      aid: aid,
      seq: seq,
      selected_wifi: 1,
      upload_size: upload_size,
      local_log_size: local_log_size,
      log_level: log_level,
      disable_detail: true,
      productOptions: [],
      uid: uid,
      seletProduct: undefined
    };
  }

  componentDidMount(): void {
    this.loadProducts();
  }
  loadProducts = () => {
    http
      .get(`${API_PREFIX}/product`)
      .then(response => {
        const { product_list } = response.data;
        this.setState({
          productOptions: product_list
        });
      })
      .catch(error => {
        if (error.response && error.response.status !== 401) {
          message.error("获取产品列表失败");
        }
      });
  };
  onSelectAid = (value: number) => {
    this.setState({
      aid: value
    });
    const product = this.state.productOptions.find(
      item => item.app_id === value
    )!;
    this.onSelectAid_setAidName(product.name);
    // console.log("product : " + product.app_id + "   " + product.name + " now app name " + this.state.app_name);
  };
  onSelectAid_setAidName = (name: string) => {
    this.setState({
      app_name: name
    });
  };
  onDatetimeChanged = (value: any) => {
    // let uri = new URI(this.props.location.pathname + this.props.location.search);
    const start_time = value[0];
    const end_time = value[1];
    this.setState({
      start_time: start_time,
      end_time: end_time
    });
  };
  onSelectedWifi = (value: number) => {
    this.setState({
      selected_wifi: value
    });
  };
  onUploadSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      upload_size: Number(e.target.value)
    });
  };

  onLogSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      local_log_size: Number(e.target.value)
    });
  };

  onLogLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      log_level: Number(e.target.value)
    });
  };
  submit = () => {
    this.setState({
      submitting: true
    });
    const end_time = this.state.end_time
      ? this.state.end_time.unix()
      : moment().unix();
    const start_time = this.state.start_time
      ? this.state.start_time.unix()
      : moment()
          .clone()
          .subtract(1, "hours")
          .unix();

    const user_name: string = localStorage.getItem("username") || "";

    const { title } = this.state;
    const params = {
      title: title,
      aid: this.state.aid,
      did: this.state.device_id,
      app_name: this.state.app_name,
      selected_wifi: this.state.selected_wifi,
      upload_size: this.state.upload_size,
      local_log_size: this.state.local_log_size,
      log_level: this.state.log_level,
      start: start_time,
      end_at: end_time,
      user_name: user_name
    };
    // 测试用 console.log("params : " + JSON.stringify(params));
    http
      .post(`${API_PREFIX}/tnc/netlog_fetch_command`, params)
      .then(response => {
        // const ticket: any = response.data.ticket.ticket;
        const ticketId = response.data.Tikcetid;
        if (response.data.WarnCode == 0) {
          message.success("工单创建成功");
        } else {
          message.warn(
            "工单创建成功, 给同一设备同一应用的指令下发的过于频繁，请减少操作次数，超过1000次，会禁止下发"
          );
        }
        this.setState({
          done: true,
          ticket_id: ticketId
        });
      })
      .catch(reason => {
        message.error("工单创建失败");
      })
      .finally(() => {
        this.setState({
          submitting: false
        });
      });
  };

  render() {
    const { title, submitting, done, ticket_id } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div className="netarch-content">
        <Breadcrumb className="application-sheet">
          <Breadcrumb.Item>
            <Icon type="control" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/tnctrafficmanage">流量调度</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>日志捞取</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="application-sheet">
          {done ? (
            <Result
              status="success"
              title="日志捞取指令下发工单创建成功"
              extra={[
                <Button type="link">
                  {ticket_id && (
                    <Link to={`/tnctickets/cfg/${ticket_id}`}>
                      前往工单详情
                    </Link>
                  )}
                </Button>
              ]}
            />
          ) : (
            <Spin tip="工单创建中" spinning={submitting} delay={500}>
              <Form {...formItemLayout}>
                <Form.Item label="标题" required={true}>
                  <Input
                    style={{ width: "40%" }}
                    placeholder="请输入工单标题"
                    value={title}
                    onChange={(e: any) => {
                      this.setState({
                        title: e.target.value
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item label="产品" required={true}>
                  <Select
                    style={{ width: "40%" }}
                    showSearch={true}
                    placeholder="请选择所属的产品"
                    // onChange={this.onSelectAid}
                    onChange={(value: number) => {
                      this.onSelectAid(value);
                    }}
                  >
                    {this.state.productOptions.map(item => {
                      return (
                        <Select.Option value={item.app_id} key={item.app_id}>
                          <Tooltip title={"aid:" + item.app_id}>
                            {item.name}
                          </Tooltip>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item label="设备号" required={true}>
                  <Input
                    placeholder="如：57857781538"
                    style={{ width: "40%" }}
                    defaultValue={this.state.device_id}
                    formNoValidate={false}
                    onChange={e => {
                      this.setState({
                        device_id: e.target.value
                      });
                      if (e.target.value != "") {
                        this.setState({
                          disable_detail: false
                        });
                      } else {
                        this.setState({
                          disable_detail: true
                        });
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item label="日志时间间隔" required={true}>
                  <RangePicker
                    showTime={true}
                    style={{ width: 380 }}
                    defaultValue={[this.state.start_time, this.state.end_time]}
                    ranges={{
                      "Last 1 Hours": [moment().subtract(1, "hours"), moment()],
                      "Last 3 Hours": [moment().subtract(3, "hours"), moment()],
                      "Last 6 Hours": [moment().subtract(6, "hours"), moment()],
                      "Last 12 Hours": [
                        moment().subtract(12, "hours"),
                        moment()
                      ],
                      "Last 24 Hours": [moment().subtract(1, "days"), moment()]
                    }}
                    onChange={this.onDatetimeChanged}
                    onOk={this.onDatetimeChanged}
                    disabledDate={current => current! > moment().endOf("day")}
                  />
                </Form.Item>

                <Form.Item label="仅在wifi下上传">
                  <Select
                    defaultActiveFirstOption={false}
                    onChange={this.onSelectedWifi}
                    defaultValue={1}
                    style={{ width: 75 }}
                    disabled={this.state.disable_detail}
                    filterOption={(input, option) => {
                      return (
                        (option.props.children! as React.ReactElement<
                          any
                        >).props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  >
                    <Option value={1} key="1">
                      是
                    </Option>
                    <Option value={0} key="0">
                      否
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item label="上传大小(M)">
                  <Input
                    defaultValue="5"
                    onChange={this.onUploadSizeChange}
                    value={this.state.upload_size}
                    style={{ width: 75 }}
                    disabled={this.state.disable_detail}
                  />
                </Form.Item>

                <Form.Item label="本地日志大小(M)">
                  <Input
                    defaultValue="50"
                    onChange={this.onLogSizeChange}
                    value={this.state.local_log_size}
                    style={{ width: 75 }}
                    disabled={this.state.disable_detail}
                  />
                </Form.Item>
                <Form.Item label="日志级别">
                  <Input
                    defaultValue="2"
                    onChange={this.onLogLevelChange}
                    value={this.state.log_level}
                    style={{ width: 75 }}
                    disabled={this.state.disable_detail}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <Tooltip title="未来合入长链push需要提供uid">
                      <span>
                        用户ID（uid）
                        <Icon type="question-circle" />
                      </span>
                    </Tooltip>
                  }
                >
                  <Input
                    style={{ width: "40%" }}
                    placeholder="请输入uid,默认为0"
                    defaultValue=""
                    disabled={true}
                    // onChange={this.onUidChange}
                    readOnly
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 }
                  }}
                >
                  <Button
                    disabled={!title || this.state.disable_detail || submitting}
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      this.submit();
                    }}
                  >
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          )}
        </Card>
      </div>
    );
  }
}
