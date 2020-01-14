import React from "react";
import {
  Layout,
  Breadcrumb,
  Icon,
  Steps,
  Row,
  Timeline,
  Descriptions,
  Badge
} from "antd";
const { Step } = Steps;
const { Header, Footer, Sider, Content } = Layout;
export class ToolsDemo extends React.Component<any, any> {
  constructor(props: { location: string }) {
    super(props);
  }

  render() {
    const bread = (
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Icon type="user" />
          <span>Application List</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
      </Breadcrumb>
    );
    const ProcessSteps = (
      <Steps>
        <Step status="finish" title="Login" icon={<Icon type="user" />} />
        <Step
          status="finish"
          title="Verification"
          icon={<Icon type="solution" />}
        />
        <Step status="process" title="Pay" icon={<Icon type="loading" />} />
        <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
      </Steps>
    );
    const TimeLine = (
      <Timeline>
        <Timeline.Item color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item color="red">
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
      </Timeline>
    );
    const StudentDesc = (
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
    );
    return (
      <Layout>
        <Layout>
          <Content>
            {bread}
            <br />
            <Row style={{ background: "#FFF5EE" }}>{ProcessSteps}</Row>
            <br />
            <Row style={{ background: "#FFFFE0" }}>{StudentDesc}</Row>
            <br />
            <Row style={{ background: "#F8F8FF" }}>{TimeLine}</Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
