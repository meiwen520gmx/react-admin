import React, { Component, Fragment } from "react";
import {Link} from "react-router-dom";

import { Form, Input, Button, Table, Switch, message, Modal } from "antd";

import { GetDepartmentList, DelDepartment, SwitchStatus } from "@/api/department";

class PartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchId: "",
      //table参数
      data: [],
      //复选框选中数据
      selectedRowKeys: [],
      //要删除的id
      id: "",
      //分页参数
      pageSize: 10,
      current: 1, //当前页码
      total: 1,
      keyWord: "",
      loading: false,
      //警告弹窗
      visible: false,
      columns: [
        {
          title: "部门名称",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "禁启用",
          key: "status",
          dataIndex: "status",
          render: (text, record) => {
            return (
              <Switch
                loading = {record.id === this.state.switchId}
                checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked={text === "1" ? true : false}
                onChange={() => this.onHandlerSwitch(record)}
              />
            );
          },
        },
        {
          title: "人员数量",
          key: "number",
          dataIndex: "number",
        },
        {
          title: "操作",
          key: "action",
          width: 215,
          render: (text, record) => (
            <div className="inline-button">
              <Button type="primary"><Link to={{pathname:'/index/department/addpart',state:{id:record.id}}}>编辑</Link></Button>
              <Button onClick={() => this.handleDel(record.id)}>删除</Button>
            </div>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    this.getList();
  }

  //获取列表
  getList = () => {
    const { pageSize, current, keyWord } = this.state;
    const requestData = {
      pageSize,
      pageNumber: current,
    };
    if (keyWord) {
      requestData.name = keyWord;
    }
    GetDepartmentList(requestData).then((res) => {
      const resData = res.data;
      if (resData.data) {
        this.setState({ data: resData.data, total: resData.total });
      }
    });
  };
  //切换禁用启用
  onHandlerSwitch(record) {
    if (!record.status) {
      return false;
    }
    this.setState({switchId: record.id})
    const requestData = {
      id: record.id,
      status: record.status === '1' ? false : true
    }
    SwitchStatus(requestData).then(res => {
      message.success(res.message);
      this.setState({switchId: ""})
    })
  }

  //勾选进行删除
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  //点击批量删除按钮
  clickDelBtn = () => {
    const { selectedRowKeys } = this.state;
    const ids = selectedRowKeys.join(",");
    // this.handleDel(ids);
  };

  //请求删除
  handleDel(id) {
    if (!id) {
      return false;
    }
    this.setState({
      visible: true,
      id,
    });
  }

  //点击警告弹窗确定按钮进行删除
  okModal = () => {
    const { id } = this.state;
    this.hideModal(); //隐藏警告弹窗
    DelDepartment({ id }).then((res) => {
      message.success(res.message);
      this.getList(); //重新加载一遍数据
    });
  };
  
  
  //改变页码
  handleTableChange = (pagination, filters, sorter) => {
    const { current } = pagination;
    this.setState(
      {
        current,
      },
      this.getList()
    );
  };

  //搜索
  onSearch = (value) => {
    this.setState({
      keyWord: value.name,
      pageSize: 10,
      current: 1,
    });
    this.getList();
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      columns,
      data,
      selectedRowKeys,
      loading,
      pageSize,
      current,
      total,
      visible,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      pageSize,
      current,
      total,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Fragment>
        <Modal
          title="提示"
          visible={visible}
          onOk={this.okModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>您确认要删除此信息吗？删除后将无法恢复</p>
        </Modal>
        <Form layout="inline" onFinish={this.onSearch}>
          <Form.Item name="name" label="部门名称">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="table-wrap">
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={this.handleTableChange}
            bordered
          />
          <Button
            type="primary"
            onClick={this.clickDelBtn}
            disabled={!hasSelected}
            loading={loading}
          >
            批量删除
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default PartList;
