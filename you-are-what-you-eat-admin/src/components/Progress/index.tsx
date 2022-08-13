import React, { Component } from 'react';
import PropTypes from 'prop-types';

type props = {
  nums: number;
  index: number;
  progressColor: string;
};
export default class Progress extends Component<props> {
  propTypes = {
    //  进度条需要区分的个数
    nums: PropTypes.number.isRequired,
    //  当前进度条所处的位置
    index: PropTypes.number.isRequired,
    //  进度条的颜色
    progressColor: PropTypes.string.isRequired
  };
  constructor(props: any) {
    super(props);
  }
  renderProgress() {
    const progressItemStyle = {
      //  进度条的进度分成100份
      width: `${100 / this.props.nums}%`,
      height: '100%'
    };
    var ele = [];
    for (var i = 0; i < this.props.nums; i++) {
      if (i <= this.props.index) {
        ele.push(
          <div
            style={Object.assign(progressItemStyle, {
              backgroundColor: this.props.progressColor
            })}
            key={i}
          ></div>
        );
      }
      // else {
      //     ele.push(
      //         <div style={progressItemStyle} key={i}></div>
      //     )
      // }
    }
    return ele;
  }

  render() {
    const progressStyle = {
      display: '-webkit-flex',
      color: this.props.progressColor,
      margin: '0 25px'
    };

    //  进度条的样式
    const progressArticleStyle = {
      height: 12,
      border: '1px solid #B5D3FF',
      //  进度条的样式长度
      width: '70%',
      display: '-webkit-flex',
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 10,
      backgroundColor: '#B5D3FF',
      marginLeft: -25
    };

    return (
      <div style={progressStyle}>
        <div style={progressArticleStyle}>{this.renderProgress()}</div>
        <div style={{ marginLeft: '10px', color: '#000000', width: '15%' }}>
          {this.props.index}%
        </div>
      </div>
    );
  }
}
// <Progress nums={100} index={40} progressColor='green' />
