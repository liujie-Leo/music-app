import { Component } from 'react'
import { View, Swiper,SwiperItem,Text } from '@tarojs/components'
import "./bannerShow.less";

export default class BannerShow extends Component {

  componentDidMount() {
    console.log(this);
  }

  render() {
    return (
      <View className='banner-show bg-white px-8 py-8'>
        <View className='flex items-center justify-between'>
          <View className='flex items-center'>
            <View className='i-queding1 icon text-2xl text-gray-500 mr-2'></View>
            <View className='text-gray-700 text-base'>欧美流行精选</View>
          </View>
          <View>
            <View className='text-base text-gray-700'>播放</View>
          </View>
        </View>
        <View className='mt-4'>
          <Swiper
            indicatorColor='#999'
            indicatorActiveColor='#333'
            nextMargin='64rpx'
          >
            <SwiperItem>
              <List></List>
            </SwiperItem>
            <SwiperItem>
              <List></List>
            </SwiperItem>
            <SwiperItem>
              <List></List>
            </SwiperItem>
          </Swiper>
        </View>
      </View>
    );
  }
}



class List extends Component{
  render() {
    return (
      <View className='h-full'>
        <View className='flex py-2 border-b'>
          <View className='h-24 w-24 rounded-sm bg-gray-200'></View>
          <View className='flex-1 ml-4 flex flex-col justify-center'>
            <View className='text-sm'>我的歌声里</View>
            <View className='text-xs flex items-center text-gray-500'>
              <Text>超3千人点赞</Text>
              <Text>卢卢快闭嘴</Text>
            </View>
          </View>
        </View>
        <View className='flex py-2 border-b'>
          <View className='h-24 w-24 rounded-sm bg-gray-200'></View>
          <View className='flex-1 ml-4 flex flex-col justify-center'>
            <View className='text-sm'>我的歌声里</View>
            <View className='text-xs flex items-center text-gray-500'>
              <Text>超3千人点赞</Text>
              <Text>卢卢快闭嘴</Text>
            </View>
          </View>
        </View>
        <View className='flex py-2 '>
          <View className='h-24 w-24 rounded-sm bg-gray-200'></View>
          <View className='flex-1 ml-4 flex flex-col justify-center'>
            <View className='text-sm'>我的歌声里</View>
            <View className='text-xs flex items-center text-gray-500'>
              <Text>超3千人点赞</Text>
              <Text>卢卢快闭嘴</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
