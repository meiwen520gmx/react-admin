import React, { Component } from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";

import PropTypes from "prop-types";
const { Option } = Select;
class FormCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  //定义规则
  rules = (item) => {
    //包装rules
    const rules = [];
    if (item.required) {
      // let message = item.message || `${item.label}不能为空`;//如果不传message，就在这里自己拼接
      rules.push({ required: true, message: item.message });
    }
    if (item.rules && item.rules.length !== 0) {
      //不止一个rule对象
      rules.push(...item.rules);
    }
    return rules;
  };
  //初始化
  initFormItem = () => {
    const { formItem } = this.props;
    //检测formItem是否存在
    if (!formItem || (formItem && formItem.length === 0)) {
      return false;
    }
    const formList = [];
    //循环处理
    formItem.map((item) => {
      if (item.type === "Input") {
        formList.push(this.inputElem(item));
      }
      if (item.type === "Select") {
        formList.push(this.selectElem(item));
      }
      if (item.type === "InputNumber") {
        formList.push(this.inputNumberElem(item));
      }
      if (item.type === "Radio") {
        formList.push(this.radioElem(item));
      }
      if (item.type === "TextArea") {
        formList.push(this.textAreaElem(item));
      }
    });
    return formList;
  };

  //创建Input
  inputElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };
  //创建InputNumber
  inputNumberElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <InputNumber
          min={item.min || Number.MIN_SAFE_INTEGER}
          max={item.max || Number.MAX_SAFE_INTEGER}
          style={item.style}
        />
      </Form.Item>
    );
  };
  //创建TextAreaElem
  textAreaElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input.TextArea style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };
  //创建radio
  radioElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Radio.Group>
          {item.radios &&
            item.radios.map((ele) => {
              return (
                <Radio value={ele.value} key={ele.value}>
                  {ele.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };
  //创建select
  selectElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((ele) => {
              return (
                <Option value={ele.value} key={ele.value}>
                  {ele.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  //点击提交按钮
  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  //切换确认按钮的loading状态
  switchLoading = (value) => {
    this.setState({ loading: value });
  }


  render() {
    const { formLayout,formConfig } = this.props;
    const { loading } = this.state;
    return (
      <Form
        ref={(form) => (this.form = form)}
        onFinish={this.onSubmit}
        {...formLayout}
        layout={formConfig && formConfig.Layout}
        initialValues={{
          number: 1,
          status: false,
        }}
      >
        {this.initFormItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {formConfig.btnText || "确认"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
FormCom.propTypes = {
  formItem: PropTypes.array.isRequired,
  formLayout: PropTypes.object,
  formConfig: PropTypes.object,
};
export default FormCom;
