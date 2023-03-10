import { PieChartOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Header } from "antd/es/layout/layout";

const CustomHeader = () => {
  const headerStyle = {
    color: "#fff",
    height: 50,
    paddingInline: 20,
    lineHeight: "50px",
  };
  return (
    <Header style={headerStyle}>
      <Space>
        <PieChartOutlined />
        Make me pie!
      </Space>
    </Header>
  );
};

export default CustomHeader;
