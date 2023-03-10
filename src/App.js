import { Button, Card, Col, Divider, Layout, Row, Typography } from "antd";
import { useRef, useState } from "react";
import CustomHeader from "./components/header/CustomHeader";
import PieForm from "./components/pieform/PieForm";
import PieChart from "./PieChart";

const App = () => {
  const { Title } = Typography;
  const onSubmit = (values) => {
    console.log(values);
    setPieData(values);
  };
  const initFormData = {
    value: [10, 20, 30, 40, 50],
    label: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  };
  const [pieData, setPieData] = useState(initFormData);
  const canvasRef = useRef(null);
  const download = () => {
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  };
  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <CustomHeader />
      <Row>
        <PieForm initFormData={initFormData} onSubmit={onSubmit} />

        <Divider type="vertical" style={{ color: "black" }} />
        <Col style={{ display: "flex", width: "60%" }}>
          <Card style={{ border: "2px solid #333", margin: "25px 0px 0px 0px" }}>
            <Row justify="space-between" align="middle">
              <Title level={3}>Customise Chart</Title>
              <Button onClick={() => download()}>Download</Button>
            </Row>
            <Divider style={{ margin: 0 }} />

            <PieChart canvasRef={canvasRef} outline={3} pieData={pieData} />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
