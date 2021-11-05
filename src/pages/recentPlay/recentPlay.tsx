import { Component } from "react";
import { View } from '@tarojs/components'
import MusicList from '@/components/musicList/musicList'
import { getMusicList} from '@/mock/api'

export default class RecentPlay extends Component{

  state = {
    list:[]
  }

  componentDidMount() {
    this.getData()
  }
  
  async getData() {
    let res = await getMusicList()
    console.log(res);
    console.log(this);
    this.setState({
      list:res
    })
  }

  render() {
    return (
      <View className='recent-play pt-8'>
        <View className='flex justify-between px-8'>
          <View className='flex'>
            <View className='i-24gf-playCircle icon text-3xl text-red-500'></View>
            <View className='flex items-end ml-4'>
              <View className='text-xl'>播放全部</View>
              <View className='text-xs text-gray-500'>（123）</View>
            </View>
          </View>
          <View className='i-queding1 icon text-3xl text-gray-500'></View>
        </View>
        <View className='mt-8'>
          <MusicList musicList={this.state.list} showIndex={false}></MusicList>
        </View>
      </View>
    );
  }
}