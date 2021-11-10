import { Component } from "react";
import { View, Text,Image } from "@tarojs/components";
import { getPlayList } from "@/mock/api";
import { getFormatUrl } from "@/utils/tools";
import Taro from "@tarojs/taro";
import store from '@/store/store'

import "./my.less";


 // 路由
function navPage(type:string,options?) {
  const routeObj = {
    musicList: "/pages/musicList/musicList",
    login: "/pages/login/login",
    recentPlay: "/pages/recentPlay/recentPlay",
  };
  const url = options?getFormatUrl(routeObj[type],options):routeObj[type]
  Taro.navigateTo({url});
}

export default class Index extends Component {
  state = {
    favirateList: [],
    createdList: [],
    isLogin: false,
    userInfo:{}
  };

  componentDidMount() {
    this.getData();
  }

  componentDidShow() {
    this.initUserInfo();
  }

  // 初始化数据
  getData = async () => {
    let favirateList = await getPlayList("favorite");
    let createdList = await getPlayList("created");
    this.setState({ favirateList, createdList });
  };
  initUserInfo = () => {
    const userInfo = store.getState()
    if (JSON.stringify(userInfo) !== '{}') {
      this.setState({
        userInfo,
        isLogin:true
      });
    } else {
      this.setState({
        isLogin: false,
        userInfo:{}
      })
    }
  }

  onScroll = (id: string) => {
    console.log(id);
  };

  render() {
    return (
      <View className='p-6 bg-gray-200 my' id='my'>
        {/* 顶部栏 */}
        <View className='flex items-center justify-between'>
          <Text className='icon i-liebiao text-2xl text-gray-500'></Text>
          <Text className='icon i-aixin text-2xl text-gray-500'></Text>
        </View>
        {/* 用户名头像 */}
        <View className='flex px-10 mt-10'>
          <View className='h-24 w-24 bg-blue-500 rounded-full overflow-hidden'>
            <Image src={this.state.userInfo["avatarUrl"]}></Image>
          </View>
          {login.call(this, this.state.isLogin)}
        </View>
        {/* 导航栏 */}
        <View className='bg-white rounded-md p-8 mt-16'>
          <View className='flex mb-6'>
            <View
              className='flex flex-col items-center flex-1'
              onClick={() => {
                navPage("recentPlay");
              }}
            >
              <View className='icon i-24gf-playCircle text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>最近播放</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-weidaqiadewenjianjia text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>本地/下载</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-shangchuanyunpan text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>云盘</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-gouwudai text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>已购</View>
            </View>
          </View>
          <View className='flex mt-4'>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-haoyoutuijie text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>我的好友</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-shoucangxuanzhong text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>收藏和赞</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-guangbo-jishi text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>我的播客</View>
            </View>
            <View className='flex flex-col items-center flex-1'>
              <View className='icon i-zengjia1 text-6xl text-red-500'></View>
              <View className='text-gray-500 text-sm'>音乐</View>
            </View>
          </View>
        </View>
        {/* 我喜欢的音乐 */}
        <View
          className='bg-white rounded-md p-8 mt-8 flex'
          onClick={() => {
            navPage("musicList");
          }}
        >
          <View className='bg-gray-300 rounded-sm h-24 w-24 flex items-center justify-center'>
            <View className='i-aixin_shixin icon text-4xl text-white'></View>
          </View>
          <View className='flex ml-6 justify-between flex-1 items-center'>
            <View>
              <View className='font-bold'>我喜欢的音乐</View>
              <View className='text-gray-500 text-base'>106 首</View>
            </View>
            <View className='rounded-full border flex px-4 py-2'>
              <View className='i-aixin icon text-xl mr-2'></View>
              <View className='text-sm'>心动模式</View>
            </View>
          </View>
        </View>
        {/* 歌单 */}
        <View className='mt-12'>
          <View className='flex justify-between px-36 '>
            <View
              className='font-bold bar-item relative'
              onClick={() => {
                this.onScroll("#create-list");
              }}
            >
              <View className='z-50 relative'>创建歌单</View>
              <View className='bar'></View>
            </View>
            <View
              className='font-bold bar-item relative'
              onClick={() => {
                this.onScroll("#favorite-list");
              }}
            >
              <View className='z-50 relative'>收藏歌单</View>
              <View className='bar'></View>
            </View>
          </View>
          <MusicList title='创建歌单' banner='创建共享歌单，和你的好友一同管理' list={this.state.favirateList}></MusicList>
          <MusicList title='收藏歌单' list={this.state.createdList}></MusicList>
        </View>
      </View>
    );
  }
}

// 登录模块
const login = function (loginStatus) {
  if (loginStatus) {
    return (
      <View className='flex-1 flex items-center justify-between ml-8'>
        <View>
          <View className='block font-bold text-2xl'>{this.state.userInfo.nickName}</View>
          <View>
            <Text className='text-xs bg-gray-400 px-4 rounded-full text-white'>
              VIP续费
            </Text>
            <Text className='text-xs bg-gray-50 px-4 rounded-full ml-4'>
              Lv.6
            </Text>
          </View>
        </View>
        <View className='icon i-youjiantou text-2xl text-gray-500'></View>
      </View>
    );
  } else {
    return (
      <View
        className='flex-1 flex items-center justify-between ml-8'
        onClick={()=>{navPage('login')}}
      >
        <View>
          <View className='block font-bold text-2xl'>登录</View>
        </View>
        <View className='icon i-youjiantou text-2xl text-gray-500'></View>
      </View>
    );
  }
};


// 歌单
type MusicListType = {
  title?: String,
  list?: Array<any>,
  banner?:String
}
class MusicList extends Component<MusicListType> {
  render() {
    const title = this.props.title||'默认标题'
    const list = this.props.list || []
    const banner = this.props.banner || ''
    return (
      <View
        className='bg-white mt-8 rounded overflow-hidden pb-8'
        id='favorite-list'
      >
        {
          banner ? <View className='text-center py-4 text-yellow-600 bg-red-50 text-sm'>{ banner }</View>:null
        }
        <View className='flex justify-between px-8 py-6'>
          <View className='text-gray-500 text-base'>
            {title}({list.length}个)
          </View>
          <View className='flex items-center'>
            <View className='icon i-zengjia text-2xl text-gray-500'></View>
          </View>
        </View>
        <View className='px-8'>
          {list.map((item) => {
            return (
              <View
                className='flex mb-4'
                key={item["id"]}
                onClick={() => {
                  navPage("musicList",item);
                }}
              >
                <View className='w-24 h-24 rounded-sm bg-gray-200 mr-4 overflow-hidden'>
                  <Image src={item["coverImgUrl"]}></Image>
                </View>
                <View className='flex-1'>
                  <View className='font-bold tracking-tighter'>
                    {item["name"]}
                  </View>
                  <View className='text-sm text-gray-500'>
                    {item["nums"]}首
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}