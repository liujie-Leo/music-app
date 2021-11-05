import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getMusicList } from '@/mock/api'
import {getFormatUrl} from '@/utils/tools'
import Taro from '@tarojs/taro'
import MusicList from '@/components/musicList/musicList'
import "./musicList.less";

export default class Index extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.getData();
  }

  componentDidShow() {}

  componentDidHide() {}

  getData = async () => {
    const res = await getMusicList();
    this.setState({ list: res });
  };

  onShare = () => {};

  // 分享功能
  onShareAppMessage = () => {
    return {
      title: "自定义标题",
      path: "/pages/musicList/musicList",
      imageUrl: "", // 图片路径
    };
  };

  navToPlayer = (item) => {
    const url = getFormatUrl("/pages/player/player",item);
    Taro.navigateTo({url});
  }

  render() {
    return (
      <View className='music-list'>
        {/* nav-bar */}
        <View className='bg-gray-500 px-8 pb-32 pt-12 relative'>
          <View className='flex justify-between'>
            <View className=''></View>
            <View className='text-white'>歌单©</View>
            <View>
              <Text className='icon i-sousuo text-2xl mr-8 text-white'></Text>
              <Text className='icon i-yuandiancaidan text-2xl text-white'></Text>
            </View>
          </View>
          <View className='flex mt-16'>
            <View className='w-48 h-48 rounded-sm bg-white'></View>
            <View className='ml-6'>
              <View className='text-white'>我喜欢的音乐</View>
              <View className='flex mt-4'>
                <View className='w-12 h-12 bg-white rounded-full'></View>
                <View className='ml-2'>
                  <Text className='text-gray-300 text-sm'>牛炮炮</Text>
                  <Text className='i-youjiantou icon text-white text-xs text-gray-300'></Text>
                </View>
              </View>
            </View>
          </View>
          <View className='flex px-8 py-4 bg-white rounded-full  absolute -bottom-10 left-28 shadow'>
            <View className='flex-1 flex items-center px-4 border-r'>
              <Text className='i--queding icon text-white text-2xl text-gray-400 mr-4'></Text>
              <Text className='text-sm text-gray-700'>收藏</Text>
            </View>
            <View className='flex-1 flex items-center px-4 border-r'>
              <Text className='i-pinglun icon text-white text-2xl text-gray-400 mr-4'></Text>
              <Text className='text-sm text-gray-700'>评论</Text>
            </View>
            <View
              className='flex-1 flex items-center px-4'
              onClick={this.onShare}
            >
              <Text className='i-fenxiang icon text-white text-2xl text-gray-400 mr-4'></Text>
              <Text className='text-sm text-gray-700'>分享</Text>
            </View>
          </View>
        </View>
        {/* list */}
        <View className='mt-20'>
          <View className='flex justify-between items-center pb-6 border-b mb-4 px-4'>
            <View className='flex items-center'>
              <Text className='i-24gf-playCircle icon text-2xl text-red-500'></Text>
              <View>
                <Text className='ml-4'>播放全部</Text>
                <Text className='text-xs text-gray-500'>（106）</Text>
              </View>
            </View>
            <View>
              <Text className='icon i-xiazai text-3xl mr-8 text-gray-500'></Text>
              <Text className='icon i--queding text-xl text-gray-500'></Text>
            </View>
          </View>
          <MusicList musicList={this.state.list} showIndex></MusicList>
        </View>
        <View className='place'></View>
      </View>
    );
  }
}
