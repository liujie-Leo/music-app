import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { getMusicList } from "@/mock/api";
import {getCurrentInstance} from '@tarojs/taro'
import "./player.less";

export default class Index extends Component {
  state = {
    musicInfo:{}
  }

  componentWillMount () { }

  componentDidMount() {
    this.initParams()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }
  
  initParams = () => {
    const route = getCurrentInstance().router||{params:null};
    const params = route.params;
    this.getData(params)
  }

  getData = async(params) => {
    let res:any = await getMusicList({ id: params.id })
    if (res && res.length > 0) {
      this.setState({
        musicInfo:res[0]
      })
    }
  }

  render () {
    return (
      <View className='player h-screen px-8'>
        <View className='bg-img' style={{backgroundImage:`url(${this.state.musicInfo['bgImage']})`}}></View>
        <View className='flex justify-between py-8'>
          <View className=''></View>
          <View>
            <View className='text-white text-center text-xl text-shadow font-bold'>{this.state.musicInfo['name']}</View>
            <View className='text-white text-xs text-center text-shadow'>{this.state.musicInfo['author']}</View>
          </View>
          <View className='i-fenxiang icon text-2xl text-white'></View>
        </View>
        <View className='flex justify-center mt-12'>
          <View className='relative'>
            <View className='rounded-full circle-1'></View>
            <View className='rounded-full circle-2'></View>
            <View className='rounded-full circle-3 rotate-animation'>
              <Image src={this.state.musicInfo['bgImage']}></Image>
            </View>
          </View>
        </View>
        {/* 一排按钮 */}
        <View className='flex justify-between px-16 mt-24'>
          <View className='i-aixin icon  text-3xl text-white text-shadow'></View>
          <View className='i-xiazai icon text-4xl text-white text-shadow'></View>
          <View className='i-guangbo-jishi icon text-3xl text-white text-shadow'></View>
          <View className='i-pinglun icon text-3xl text-white text-shadow'></View>
          <View className='i-yuandiancaidan icon text-3xl text-white text-shadow'></View>
        </View>
        {/* 进度条 */}
        <View className='my-12 mx-12 bg-gray-100 h-2'></View>
        {/* 控制按钮 */}
        <View className='flex items-center justify-between px-16 '>
          <View className='i-aixin icon text-4xl text-white'></View>
          <View className='flex items-center'>
            <View className='i-zuojiantou icon  text-white left-btn'></View>
            <View className='i-24gl-playCircle icon pause-btn text-white mx-8'></View>
            <View className='i-arrow-right icon  text-white right-btn'></View>
          </View>
          <View className='i-liebiao icon text-4xl text-white'></View>
        </View>
      </View>
    );
  }
}
