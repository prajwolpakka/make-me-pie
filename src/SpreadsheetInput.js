import { Table } from "antd";

const data = [
  {
    key: "1",
    label: "John Brown",
    data: 32,
  },
  {
    key: "2",
    label: "sadf",
    data: 10,
  },
  {
    key: "3",
    label: "dasgfs",
    data: 20,
  },
];

function SpreadsheetTable() {
  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
  ];

  return <Table dataSource={data} columns={columns} />;
}

export default SpreadsheetTable;
