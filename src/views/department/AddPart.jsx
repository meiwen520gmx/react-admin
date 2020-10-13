import React, { Component } from "react";

import { message } from "antd";

import { AddDepartment, CheckDetail, EditDepartment } from "@/api/department";

import FormCom from "@/components/form/Index";

class AddPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {
        Layout: "horizontal",
        btnText: "确认",
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      formItem: [
        {
          type: "Input",
          label: "部门名称",
          name: "name",
          required: true,
          message: "部门不能为空！",
          placeholder: "请输入部门名称",
          style: { width: "200px" },
          rules: [{ name: "eee" }],
        },
        {
          type: "InputNumber",
          label: "人员数量",
          name: "number",
          required: true,
          message: "人员数量不能为空！",
          min: 1,
          max: 50,
          style: { width: "200px" },
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          style: { width: "200px" },
          radios: [
            { label: "禁用", value: false },
            { label: "启用", value: true },
          ],
        },
        {
          type: "TextArea",
          label: "描述",
          name: "content",
          required: true,
          message: "描述不能为空！",
          placeholder: "请输入描述",
          style: { width: "500px" },
        },
        // {
        //   type: "Select",
        //   label: "职位名称",
        //   name: "job",
        //   required: true,
        //   message: "职位名称不能为空！",
        //   placeholder: "请选择职位名称",
        //   style: { width: "200px" },
        //   options: [
        //     { label: "开发岗位", value: "a" },
        //     { label: "人事岗位", value: "b" },
        //     { label: "销售岗位", value: "c" },
        //   ],
        // },
      ],
      id: "",
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
        formConfig: { ...this.state.formConfig, btnText: "编辑" },
      }); //保存传过来的id
      console.log(this.state.formConfig)
    } else {
      this.setState({
        formConfig: { ...this.state.formConfig, btnText: "确认" },
      });
    }
  }
  componentDidMount() {
    //如果有传参过来，就去请求数据
    if (this.state.id) {
      this.getDetail();
    }
  }
  //获取传过来的id，去请求数据进行填充
  getDetail = () => {
    CheckDetail({ id: this.state.id }).then((res) => {
      this.formEle.form.setFieldsValue(res.data); //设置表单数据
    });
  };
  //点击提交按钮
  onSubmit = (values) => {
    this.formEle.switchLoading(true); //切换子组件提交按钮的loading
    if (this.state.id) {
      this.onEdit(values);
    } else {
      this.onAdd(values);
    }
  };
  //添加信息
  onAdd = (values) => {
    AddDepartment(values)
      .then((res) => {
        //.then方法里面的第二个回调不存在的时候，会调用catch方法，如果存在第二个回调，则不会执行catch
        message.success(res.message);
        this.formEle.switchLoading(false); //切换子组件提交按钮的loading
        this.formEle.form.resetFields(); //重置表单
      })
      .catch((error) => {
        this.formEle.switchLoading(false); //切换子组件提交按钮的loading
      });
  };
  //编辑信息
  onEdit = (values) => {
    values.id = this.state.id;
    EditDepartment(values)
      .then((res) => {
        message.success(res.message);
        this.formEle.switchLoading(false); //切换子组件提交按钮的loading
      })
      .catch((error) => {
        this.formEle.switchLoading(false); //切换子组件提交按钮的loading
      });
  };
  render() {
    return (
      <FormCom
        ref={(form) => (this.formEle = form)}
        formItem={this.state.formItem}
        formLayout={this.state.formLayout}
        formConfig={this.state.formConfig}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default AddPart;
