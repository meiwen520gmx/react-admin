import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";

import { Button, Switch, message, Modal } from "antd";
import TableComponent from "@/components/TableData";

import requestUrl from "@/api/requestUrl";
import { DelDepartment, SwitchStatus } from "@/api/department";


class JobList extends Component {
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
        url: requestUrl.jobList,
        method: "post",
        rowKey: "id", //table的key
        isShowPatchBtn: true, //显示批量删除按钮
        columns: [
          {
            title: "职位名称",
            key: "jobName",
            dataIndex: "jobName",
          },
          {
            title: "所属部门",
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
        formItem: [
          {
            type: "Input",
            label: "部门名称",
            name: "name",
            placeholder: "请输入部门名称",
            style: { width: "200px" },
          },
        ],
        formConfig: {
          Layout: "inline",
          btnText: "搜索",
        }, //form表单配置项
      },
    };
  }
 //切换禁用启用
 onHandlerSwitch(record) {
  if (!record.status) {
    return false;
  }
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

export default JobList;