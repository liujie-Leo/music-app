import { Component } from "react";
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {getFormatUrl} from '@/utils/tools'

type Props = {
  musicList: Array<object>,
  showIndex:Boolean
}

export default class MusicList extends Component<Props> {
  navToPlayer = (item) => {
    const url = getFormatUrl("/pages/player/player", item);
    Taro.navigateTo({ url });
  };
  render() {
    let { musicList, showIndex } = this.props;
    return (
      <View>
        {musicList.map((item) => {
          return (
            <View
              className='flex items-center py-4 px-8'
              key={item["id"]}
              onClick={() => {
                this.navToPlayer(item);
              }}
              hoverClass='btn-hover'
            >
              {showIndex ? (
                <View className='w-16 text-gray-500 pl-2'>
                  {item["id"]}
                </View>
              ) : (
                ""
              )}
              <View className='flex-1'>
                <View className='text-gray-800'>{item["name"]}</View>
                <View className='text-gray-500 text-xs'>{item["author"]}</View>
              </View>
              <View>
                <Text className='icon i-24gl-playCircle text-2xl mr-8 text-gray-400'></Text>
                <Text className='icon i-yuandiancaidan text-2xl text-gray-400'></Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}