import { Button, Card, Col, Divider, Form, Input, Typography } from "antd";
import React from "react";
import "./PieForm.css";

const PieForm = ({ initFormData, onSubmit }) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const onFinish = (pieData) => {
    console.log(pieData);
    pieData.value = pieData["value"].toString().split(",").map(parseFloat);
    pieData.label = pieData["label"].toString().split(",");
    onSubmit(pieData);
  };
  return (
    <Col>
      <Card style={{ border: "2px solid #333", margin: 25, width: 450 }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={initFormData}
          requiredMark={false}
          autoSave={false}>
          <Title level={3}>Chart Information</Title>
          <Divider style={{ marginTop: 0 }} />
          <Form.Item
            label="Data"
            name="value"
            rules={[
              { required: true, message: "*required" },
              {
                pattern: /^[\d][\d.,]+[\d]$/,
                message: "Please enter data separated by ,",
              },
            ]}>
            <Input placeholder="input placeholder" style={{ height: 45, boxShadow: "none" }} />
          </Form.Item>

          <Form.Item label="Label" name="label" rules={[{ required: true, message: "*required" }]}>
            <Input placeholder="input placeholder" style={{ height: 45, boxShadow: "none" }} />
          </Form.Item>

          <Button
            style={{ border: "2px solid #000" }}
            type="primary"
            htmlType="submit"
            className="submit-button">
            Generate Chart
          </Button>
        </Form>
      </Card>
    </Col>
  );
};

export default PieForm;
