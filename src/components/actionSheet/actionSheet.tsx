import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtActionSheet } from "taro-ui";
import "./actionSheet.less";

type Props = {
  isOpened: boolean;
  onClose?: any;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?:any
};

export default class ActionSheet extends Component<Props> {

  componentDidMount() {
    console.log(this);
  }

  render() {
    let isOpened: boolean = this.props.isOpened || false;
    let onClose = this.props.onClose;
    let onConfirm = this.props.onConfirm;
    let cancelButtonText = this.props.cancelButtonText || '取消'
    let confirmButtonText = this.props.confirmButtonText || '确认'
    return (
      <View className='action-sheet'>
        <AtActionSheet isOpened={isOpened} onClose={onClose}>
          <View className='px-8 pt-8 pb-12'>
            <View className='flex justify-between'>
              <View className='text-xl text-gray-700 font-bold' onClick={onClose}>{cancelButtonText}</View>
              <View className='text-xl text-gray-700 font-bold' onClick={()=>{onConfirm()}}>{confirmButtonText}</View>
            </View>
            <View>{this.props.children}</View>
          </View>
        </AtActionSheet>
      </View>
    );
  }
}
