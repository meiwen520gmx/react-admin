import React, { Component, Fragment } from "react";

import { Table } from "antd";

import { GetTableList } from "@/api/common";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], //table列表数据
      pageSize: 5,
      current: 1, //当前页码
      total: 1,
      loadingTable: false, //数据加载动画
      
    };
  }
  componentDidMount() {
    console.log(this.props);
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
  render() {
    const {
      pageSize,
      current,
      total,
      data,
      loadingTable,
    } = this.state;
    const { columns, rowKey } = this.props.config;
    const {rowSelection} = this.props;
    const pagination = {
      pageSize,
      current,
      total,
    };
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default TableComponent;
