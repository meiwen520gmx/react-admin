import React, { Component, Fragment } from "react";

import { Table, Button, Form, Input } from "antd";
import FormCom from "@/components/form/Index";

import { GetTableList } from "@/api/common";

import PropTypes from "prop-types";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], //table列表数据
      pageSize: 5,
      current: 1, //当前页码
      total: 1,
      loadingTable: false, //数据加载动画
      keyWord: "", //搜索关键字
    };
  }
  componentDidMount() {
    this.getList();
  }
  //改变页码
  handleTableChange = (pagination, filters, sorter) => {
    const { current } = pagination;
    this.setState(
      {
        current,
      },
      () => {
        this.getList();
      }
    );
  };
  //获取列表
  getList = () => {
    const { config } = this.props; //接收传过来的table配置数据
    this.setState({ loadingTable: true });
    const { pageSize, current } = this.state;
    const requestData = {
      url: config.url,
      method: config.method,
      data: {
        pageSize,
        pageNumber: current,
      },
    };
    if (this.state.keyWord) {
      requestData.data.name = this.state.keyWord;
    }
    GetTableList(requestData).then((res) => {
      const resData = res.data;
      if (resData.data) {
        this.setState({
          data: resData.data,
          total: resData.total,
          loadingTable: false,
        });
      }
    });
  };
  //点击批量删除按钮调用父组件方法
  Del = () => {
    this.props.handleDel();
  };

  //搜索
  onSearch = (value) => {
    if (this.state.loadingTable) {
      return false;
    }
    this.setState({
      keyWord: value.name,
      pageSize: 5,
      current: 1,
    });
    this.getList();
  };
  render() {
    const { pageSize, current, total, data, loadingTable } = this.state;
    const { columns, rowKey, isShowPatchBtn,formItem,formConfig } = this.props.config;
    const { rowSelection } = this.props;
    const hasSelected = rowSelection.selectedRowKeys.length > 0;
    const pagination = {
      pageSize,
      current,
      total,
    };
    return (
      <Fragment>
        <FormCom
          formItem={formItem}
          formConfig={formConfig}
          onSubmit={this.onSearch}
        />
        <div className="table-wrap">
          <Table
            rowKey={rowKey || "id"}
            rowSelection={rowSelection ? rowSelection : null}
            columns={columns}
            dataSource={data}
            loading={loadingTable}
            pagination={pagination}
            onChange={this.handleTableChange}
            bordered
          />
          {!!rowSelection && isShowPatchBtn ? (
            <Button type="primary" onClick={this.Del} disabled={!hasSelected}>
              批量删除
            </Button>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}
TableComponent.propTypes = {
  config: PropTypes.object,
  rowSelection: PropTypes.object,
  handleDel: PropTypes.func,
};
export default TableComponent;
