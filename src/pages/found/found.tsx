import { Component } from 'react'
import {
  View,
  Input,
  Swiper,
  SwiperItem,
  Image,
  ScrollView,
} from "@tarojs/components";
import BannerShow from '@/components/bannerShow/bannerShow'
import { getSwiperPlayList } from "@/mock/api";
import "./found.less";


export default class Index extends Component {
  state = {
    swiperFolkPlayList:[]
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let swiperFolkPlayList = await getSwiperPlayList({ type: "folk" });
    this.setState({
      swiperFolkPlayList
    });
  };

  render() {
    return (
      <View className='index pt-8 found bg-gray-200 min-h-screen'>
        {/* 搜索栏 */}
        <View className='flex justify-between items-center px-8'>
          <View className='i-liebiao icon text-3xl text-gray-500'></View>
          <View className='bg-white rounded flex-1 mx-8 h-20 flex items-center px-8'>
            <Input className='text-gray-700 text-base'></Input>
          </View>
          <View className='i-guangbo-jishi icon text-3xl text-gray-500'></View>
        </View>
        {/* banner */}
        <View className='px-8 banner'>
          <View className='mt-8 rounded-sm bg-white h-76 overflow-hidden bg-gray-200'>
            <Swiper
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
            >
              <SwiperItem>
                <Image
                  className='rounded-sm'
                  src='https://www.betterleo.com/cdn/music1.JPG'
                ></Image>
              </SwiperItem>
              <SwiperItem>
                <Image
                  className='rounded-sm'
                  src='https://www.betterleo.com/cdn/music2.JPG'
                ></Image>
              </SwiperItem>
              <SwiperItem>
                <Image
                  className='rounded-sm'
                  src='https://www.betterleo.com/cdn/music3.JPG'
                ></Image>
              </SwiperItem>
            </Swiper>
          </View>
        </View>
        {/* 菜单 */}
        <ScrollView scrollX className='mt-8'>
          <View className='flex items-center '>
            <View className='flex flex-col items-center mr-8 menu-item ml-6'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-guangbo-jishi icon text-2xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>每日推荐</View>
            </View>
            <View className='flex flex-col items-center mr-8 menu-item'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-zengjia1 icon text-5xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>私人FM</View>
            </View>
            <View className='flex flex-col items-center mr-8 menu-item'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-liebiao icon text-2xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>歌单</View>
            </View>
            <View className='flex flex-col items-center mr-8 menu-item'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-haoyoutuijie icon text-5xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>排行榜</View>
            </View>
            <View className='flex flex-col items-center mr-8 menu-item'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-daoru icon text-2xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>直播</View>
            </View>
            <View className='flex flex-col items-center mr-8 menu-item mr-6'>
              <View className=' bg-red-100 h-20 w-20 rounded-full flex items-center justify-center mb-2'>
                <View className='i-24gf-playCircle icon text-2xl text-red-500'></View>
              </View>
              <View className='text-xs text-gray-700'>数字专辑</View>
            </View>
          </View>
        </ScrollView>
        {/* 热门播客 */}
        <View className='mt-8'>
          {this.state.swiperFolkPlayList.length > 0 ? (
            <BannerShow
              title='民谣和你，故事与风'
              list={this.state.swiperFolkPlayList}
            />
          ) : null}
        </View>
        {/* 歌单推荐 */}
        <View className='mt-8'>
          {this.state.swiperFolkPlayList.length > 0 ? (
            <BannerShow
              title='欧美热门精选'
              list={this.state.swiperFolkPlayList}
            />
          ) : null}
        </View>
        <View className='place'></View>
      </View>
    );
  }
}
