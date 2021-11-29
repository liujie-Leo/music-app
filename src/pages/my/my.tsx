import { Component } from "react";
import { View, Text, Image, Input, Checkbox,CheckboxGroup } from "@tarojs/components";
import { getPlayList } from "@/mock/api";
import { getFormatUrl } from "@/utils/tools";
import Taro from "@tarojs/taro";
import store from '@/store/store'
import ActionSheet from '@/components/actionSheet/actionSheet'
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
    userInfo: {},
    openActionSheet: false,
    inputValue:''
  };

  // 生命周期
  componentDidMount() {
    this.getData();
  }
  componentDidShow() {
    this.initUserInfo();
  }
  componentDidHide() {
    this.initActionSheet();
  }

  // 初始化数据
  getData = async () => {
    let favirateList = await getPlayList("favorite");
    let createdList = await getPlayList("created");
    this.setState({ favirateList, createdList });
  };
  initUserInfo = () => {
    const userInfo = store.getState().userReducer;
    if (JSON.stringify(userInfo) !== "{}") {
      this.setState({
        userInfo,
        isLogin: true,
      });
    } else {
      this.setState({
        isLogin: false,
        userInfo: {},
      });
    }
  };
  initActionSheet = () => {
    this.setState({
      openActionSheet: false,
    });
  };

  // 自动滚动
  onScroll = (id?: string) => {
    console.log(id);
  };

  /** 新建歌单 */
  createMusicListType = "";
  // 新建歌单弹框
  createMusicList = (type: string) => {
    this.createMusicListType = type;
    this.setState({
      openActionSheet: true,
    });
  };
  // 关闭弹框
  onActionSheetClose = () => {
    this.setState({
      openActionSheet: false,
      inputValue:''
    });
  };
  checkboxChange = (e) => {
    console.log(e);
  };
  // 新建歌单确认
  onCreateMusicListConfirm = () => {
    let value = this.state.inputValue;
    const pushedObj = {
      id: new Date().getTime(),
      name: value,
      nums: "10",
      coverImgUrl: "https://www.betterleo.com/cdn/music_app/zhaolei.png",
    };
    if (this.createMusicListType === "创建歌单") {
      let list: any = [...this.state.createdList];
      list.push(pushedObj);
      this.setState({
        createdList: list,
      });
    }
    if (this.createMusicListType === "收藏歌单") {
      let list: any = [...this.state.favirateList];
      list.push(pushedObj);
      this.setState({
        favirateList: list,
      });
    }
    this.onActionSheetClose();
  };
  onMusicListInput = (e) => {
    this.setState({
      inputValue: e.detail.value,
    });
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
            navPage("musicList", {
              coverImgUrl:
                "https://www.betterleo.com/cdn/music_app/songdongye.png",
              name: "我喜欢的音乐",
            });
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
                this.onScroll();
              }}
            >
              <View className='z-50 relative'>创建歌单</View>
              <View className='bar'></View>
            </View>
            <View
              className='font-bold bar-item relative'
              onClick={() => {
                this.onScroll();
              }}
            >
              <View className='z-50 relative'>收藏歌单</View>
              <View className='bar'></View>
            </View>
          </View>
          {musicList({
            type: "创建歌单",
            list: this.state.createdList,
            title: "创建共享歌单，和你的好友一同管理",
            handleCreate: this.createMusicList,
          })}
          {musicList({
            type: "收藏歌单",
            list: this.state.favirateList,
            handleCreate: this.createMusicList,
          })}
        </View>
        {/* 弹出层 */}
        <ActionSheet
          isOpened={this.state.openActionSheet}
          onClose={this.onActionSheetClose}
          onConfirm={this.onCreateMusicListConfirm}
        >
          <View className='py-16 flex justify-start items-center'>
            <Input
              placeholder='输入新建歌单标题'
              className='text-gray-500 text-left w-full'
              onInput={this.onMusicListInput}
              value={this.state.inputValue}
            ></Input>
          </View>
          <View>
            <CheckboxGroup onChange={this.checkboxChange}>
              <View className='flex justify-start items-center mb-4'>
                <Checkbox value='123' color='#DC2626'></Checkbox>
                <Text className='text-xs text-gray-500'>
                  设置为共享歌单（和好友一起管理）
                </Text>
                <Text className='text-s px-1 text-red-500 border border-red-500'>
                  限免30天
                </Text>
              </View>
              <View className='flex justify-start items-center'>
                <Checkbox value='123' color='#DC2626'></Checkbox>
                <View className='text-xs text-gray-500'>设置为隐私歌单</View>
              </View>
            </CheckboxGroup>
          </View>
        </ActionSheet>
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



// 歌单列表
interface musicListOptions {
  type?: string;
  title?: string;
  list?: Array<any>;
  handleCreate?: any;
}
const musicList = function (options: musicListOptions) {
  const type = options.type || "";
  const title = options.title || "";
  const list = options.list || [];
  const handleCreate = options.handleCreate;
  return (
    <View
      className='bg-white mt-8 rounded overflow-hidden pb-8'
    >
      {title ? (
        <View className='text-center py-4 text-yellow-600 bg-red-50 text-sm'>
          {title}
        </View>
      ) : null}
      <View className='flex justify-between px-8 py-6'>
        <View className='text-gray-500 text-base'>
          {type}({list.length}个)
        </View>
        <View className='flex items-center'>
          <View
            className='icon i-zengjia text-2xl text-gray-500'
            onClick={() => {
              handleCreate(type);
            }}
          ></View>
        </View>
      </View>
      <View className='px-8'>
        {list.map((item) => {
          return (
            <View
              className='flex mb-4'
              key={item["id"]}
              onClick={() => {
                navPage("musicList", item);
              }}
            >
              <View className='w-24 h-24 rounded-sm bg-gray-200 mr-4 overflow-hidden'>
                <Image src={item["coverImgUrl"]}></Image>
              </View>
              <View className='flex-1'>
                <View className='font-bold tracking-tighter'>
                  {item["name"]}
                </View>
                <View className='text-sm text-gray-500'>{item["nums"]}首</View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};