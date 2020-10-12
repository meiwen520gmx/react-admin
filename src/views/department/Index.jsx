import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { Form, Input, Button, Switch, message, Modal } from "antd";
import TableComponent from "@/components/TableData/Index";

import requestUrl from "@/api/requestUrl";

import { DelDepartment, SwitchStatus } from "@/api/department";

class PartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchId: "",
      //要删除的id
      id: "",
      keyWord: "",
      //批量删除按钮加载动画
      loading: false,
      //警告弹窗
      visible: false,
      //复选框选中数据
      rowSelection: {
        selectedRowKeys: [],
        onChange: this.onSelectChange,
      },
      tableConfig: {
        url: requestUrl.departmentList,
        method: "post",
        rowKey: "id",
        isShowSelection: true,
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
                  loading={record.id === this.state.switchId}
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
                <Button type="primary">
                  <Link
                    to={{
                      pathname: "/index/department/addpart",
                      state: { id: record.id },
                    }}
                  >
                    编辑
                  </Link>
                </Button>
                <Button onClick={() => this.handleDel(record.id)}>删除</Button>
              </div>
            ),
          },
        ],
      },
    };
  }

  //切换禁用启用
  onHandlerSwitch(record) {
    if (!record.status) {
      return false;
    }
    /**
     * 第二种方法是自己定义一个开关flag:false，走到这里判断如果为true就return false,不让请求
     * 请求数据的时候就修改为flag:true,此时如果用户连续点击这里会阻止，
     * 最后请求成功后修改为flag:false,获取请求出错修改为flag:false
     */
    this.setState({ switchId: record.id });
    const requestData = {
      id: record.id,
      status: record.status === "1" ? false : true,
    };
    SwitchStatus(requestData)
      .then((res) => {
        message.success(res.message);
        this.setState({ switchId: "" });
      })
      .catch((error) => {
        this.setState({ switchId: "" });
      });
  }

  //勾选进行删除
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      rowSelection: { ...this.state.rowSelection, selectedRowKeys },
    });
  };

  //请求删除
  handleDel(id) {
    if (!id) {
      const { selectedRowKeys } = this.state.rowSelection;
      if (selectedRowKeys.length === 0) {
        return false;
      }
      id = selectedRowKeys.join();
    }
    this.setState({
      visible: true,
      id,
    });
  }

  //点击警告弹窗确定按钮进行删除
  okModal = () => {
    const { id } = this.state;
    DelDepartment({ id }).then((res) => {
      message.success(res.message);
      this.hideModal(); //隐藏警告弹窗
      this.childRef.getList(); //重新加载一遍数据
    });
  };

  //搜索
  onSearch = (value) => {
    if (this.state.loadingTable) {
      return false;
    }
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
      id: "",
      rowSelection: { ...this.state.rowSelection, selectedRowKeys: [] },
    });
  };

  render() {
    const { visible, tableConfig, rowSelection, loading } = this.state;
    const { selectedRowKeys } = this.state.rowSelection;
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
          <TableComponent
            config={tableConfig}
            rowSelection={rowSelection}
            ref={(c) => (this.childRef = c)}
          />
          <Button
            type="primary"
            onClick={() => this.handleDel()}
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
