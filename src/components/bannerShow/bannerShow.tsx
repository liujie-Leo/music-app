import { Component } from 'react'
import { View, Swiper,SwiperItem,Text,Image } from '@tarojs/components'
import "./bannerShow.less";

type Props = {
  title?: String,
  list?:Array<any>
}
export default class BannerShow extends Component<Props> {

  componentDidMount() {
  }

  render() {
    const list = this.props.list || []
    const title = this.props.title || ''
    console.log(list);
    return (
      <View className='banner-show bg-white px-8 py-8'>
        <View className='flex items-center justify-between'>
          <View className='flex items-center'>
            <View className='i-queding1 icon text-2xl text-gray-500 mr-2'></View>
            <View className='text-gray-700 text-base font-bold mt-1'>
              {title || "默认标题"}
            </View>
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
              <List list={list[0]}></List>
            </SwiperItem>
            <SwiperItem>
              <List list={list[1]}></List>
            </SwiperItem>
            <SwiperItem>
              <List list={list[2]}></List>
            </SwiperItem>
          </Swiper>
        </View>
      </View>
    );
  }
}


type ListProps = {
  list?:Array<any>
}
class List extends Component<ListProps> {
  componentDidMount() {
  }

  render() {
    let list = this.props.list||[]
    return (
      <View className='h-full'>
        {list.map((item) => {
          return (
            <View className='flex py-2 border-b' key={item["id"]}>
              <View className='h-24 w-24 rounded-sm bg-gray-200 overflow-hidden'>
                <Image src={item["coverImgUrl"]} className='max-h-full max-w-full'></Image>
              </View>
              <View className='flex-1 ml-4 flex flex-col justify-center'>
                <View className='text-sm'>{item["name"]}</View>
                <View className='text-xs flex items-center text-gray-500'>
                  <Text>{item["author"]}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
