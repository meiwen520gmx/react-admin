import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { Button, Switch, message, Modal } from "antd";
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
        rowKey: "id", //table的key
        isShowPatchBtn: true, //显示批量删除按钮
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
  handleDel = (id) => {
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
  };

  //点击警告弹窗确定按钮进行删除
  okModal = () => {
    const { id } = this.state;
    DelDepartment({ id }).then((res) => {
      message.success(res.message);
      this.hideModal(); //隐藏警告弹窗
      this.childRef.getList(); //重新加载一遍数据
    });
  };

 

  hideModal = () => {
    this.setState({
      visible: false,
      id: "",
      rowSelection: { ...this.state.rowSelection, selectedRowKeys: [] },
    });
  };

  render() {
    const { visible, tableConfig, rowSelection } = this.state;
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
        <TableComponent
          config={tableConfig}
          rowSelection={rowSelection}
          handleDel={this.handleDel}
          ref={(c) => (this.childRef = c)}
        />
      </Fragment>
    );
  }
}

export default PartList;
