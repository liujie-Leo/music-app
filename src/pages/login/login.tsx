import { Component } from 'react'
import { View } from "@tarojs/components";
import Taro from '@tarojs/taro'
import store from "@/store/store";
import {createUpdateUserInfo} from "@/store/action"
import './login.less'


export default class Login extends Component {
  // state = {
  //   userInfo:{}
  // }

  login = () => {
    Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // this.setState({
        //   userInfo:res.userInfo
        // })
        store.dispatch(createUpdateUserInfo(res.userInfo));
        Taro.switchTab({ url: "/pages/my/my" });
      },
    });
  }
  render() {
    return (
      <View className='h-screen login'>
        {/* logo */}
        <View className='h-64 py-64 flex justify-center items-center'>
          <View className='h-28 w-28 rounded-full logo-box flex items-center justify-center'>
            <View className='i-guangbo-jishi icon text-7xl text-white'></View>
          </View>
        </View>
        <View className='flex justify-center'>
          <View className='mx-24 bg-white rounded-full w-full py-6 flex items-center justify-center' onClick={this.login}>
            <View className='text-red-500 text-base'>一键登录</View>
          </View>
        </View>
      </View>
    );
  }
}