import React, { Component } from "react";
import { Select } from "antd";

import requestUrl from "@/api/requestUrl";
import { GetTableList } from "@/api/common";

import PropTypes from "prop-types";
const { Option } = Select;
class SelectComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { label: "开发岗位", value: "a" },
        { label: "人事岗位", value: "b" },
        { label: "销售岗位", value: "c" },
      ],
      props: props.propKeys,
      value: props.value,//这里使用父组件传递下来的value绑定到select上，让父组件控制
    };
  }
  componentDidMount() {
    this.getSelectList();
  }
  //根据url获取选项列表数据
  getSelectList = () => {
    const requestData = {
      url: requestUrl[this.props.url],
    };
    if(!requestData.url){return false}
    GetTableList(requestData).then((res) => {
      this.setState({options: res.data.data})
    });
  };
  triggerChange = (changedValue) => {//把选择的值抛给父组件
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({
        value: changedValue,
        // selectComponent: true
      });
    }
  };
  //改变选项
  onCurrencyChange = (value) => {
    this.setState({value})
    this.triggerChange(value)
  }
  render() {
    const {value, label} = this.state.props;
    return (
      <Select value={ this.state.value} onChange={this.onCurrencyChange}>
        {this.state.options &&
          this.state.options.map((ele) => {
            return (
              <Option value={ele[value]} key={Number(ele[value])}>
                {ele[label]}
              </Option>
            );
          })}
      </Select>
    );
  }
}
SelectComp.propTypes = {
  url: PropTypes.string.isRequired,
  propKeys: PropTypes.object.isRequired
};
export default SelectComp;
