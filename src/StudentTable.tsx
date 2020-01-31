import React from "react";
import { DashBoardState } from "./DashBoard";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
export class StudentTable extends React.Component<any, any> {
  constructor(props: { location: string }) {
    super(props);
  }
  render() {
    const data = [
      {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ];
    return (
      <Table dataSource={data} style={{ height: 550 }}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map((tag: any) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
