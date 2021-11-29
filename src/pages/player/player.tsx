import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { getMusicList, getLastOrNextMusic } from "@/mock/api";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import store from '@/store/store'
import { updatePlayer } from '@/store/modules/player/action'
import MusicSlider from '@/components/musicSlider/musicSlider'
import { secondsToMinuts } from "@/utils/date";
import "./player.less";

interface RouteParams {
  params:object|null
}
export default class Index extends Component {
  state = {
    musicInfo: {},
    playStatus: false,
    audioContext: {
      play: Function,
      pause: Function,
      destroy:Function
    },
    currentTime: '',
    durationTime: '',
    currentRate:0
  };

  /** 生命周期 */
  componentDidMount() {
    this.initParams();
  }
  componentDidHide() {}

  /** 初始化 */
  initParams = (): void => {
    const route: RouteParams = getCurrentInstance().router || { params: null };
    const params = route.params;
    this.getData(params);
  };
  getData = async (params) => {
    let res: any = await getMusicList({ id: params.id });
    if (res && res.length > 0) {
      this.setState({
        musicInfo: res[0],
      });
      this.initAudioContext('first');
    }
  };

  /** 播放 */
  // 初始化当前音乐实例
  initAudioContext = (type?: string) => {
    let audioContext: any = {}
    // 切歌初始化
    if (type === 'cut') {
      this.state.audioContext.destroy()
      audioContext = Taro.createInnerAudioContext();
    }
    // 进入页面初始化
    if (type === 'first') {
      let reduxContext = store.getState().playerReducer;
      if (JSON.stringify(reduxContext.context) !== '{}') {
        if (this.state.musicInfo["id"] == reduxContext.id) {
          // 路由传入的id和redux中的id一致，根据redux中的id进行初始化
        } else {
          // 根据传入的id进行初始化
        }
        audioContext = reduxContext.context
      } else {
        audioContext = Taro.createInnerAudioContext();
      }
    }

    audioContext.src = this.state.musicInfo["musicUrl"];
    audioContext.onTimeUpdate(this.updatePlayTime);

    this.setState({
      audioContext,
    }, () => {
      this.updateContextToRedux()
      this.updatePlayTime()
      this.play();
    });
  };
  // 更新音乐实例到redux
  updateContextToRedux = () => {
    let { audioContext } = this.state
    const patchData = {
      context: audioContext,
      name: this.state.musicInfo["name"],
      id: this.state.musicInfo["id"],
    };
    store.dispatch(updatePlayer(patchData));
  }
  // 更新播放时间
  updatePlayTime = () => {
    let audioContext = this.state.audioContext
    let currentTimeSeconds = audioContext["currentTime"];
    let durationSecond = audioContext["duration"];
    let currentRate: number = Number((currentTimeSeconds / durationSecond).toFixed(2)) * 100;
    let currentTime = secondsToMinuts(currentTimeSeconds);
    let durationTime = secondsToMinuts(durationSecond);
    console.log("currentTime"+currentTime);
    console.log("durationTime" + durationTime);
    this.setState({
      currentTime,
      durationTime,
      currentRate,
    });
  }
  // 切换播放状态
  togglePlayStatus = () => {
    this.setState(
      {
        playStatus: !this.state.playStatus,
      },
      () => {
        this.play();
      }
    );
  };
  // 播放或暂停
  play = () => {
    let { audioContext } = this.state;
    if (this.state.playStatus) {
      audioContext.play();
    } else {
      audioContext.pause();
    }
  };
  // 下一首
  nextMusic = async () => {
    let res = await getLastOrNextMusic(this.state.musicInfo["id"], "next");
    this.setState(
      {
        musicInfo: res,
      },
      () => {
        this.initAudioContext('cut');
      }
    );
  };
  // 上一首
  lastMusic = async () => {
    let res = await getLastOrNextMusic(this.state.musicInfo["id"], "last");
    this.setState(
      {
        musicInfo: res,
      },
      () => {
        this.initAudioContext('cut');
      }
    );
  };
  // 进度条变化
  onSliderChange = (e)=>{
    console.log(e);
  }

  render() {
    return (
      <View className='player h-screen px-8'>
        <View
          className='bg-img'
          style={{ backgroundImage: `url(${this.state.musicInfo["bgImage"]})` }}
        ></View>
        {/* 圆圈 */}
        <View className='flex justify-between py-8'>
          <View className=''></View>
          <View>
            <View className='text-white text-center text-xl text-shadow font-bold'>
              {this.state.musicInfo["name"]}
            </View>
            <View className='text-white text-xs text-center text-shadow'>
              {this.state.musicInfo["author"]}
            </View>
          </View>
          <View className='i-fenxiang icon text-2xl text-white'></View>
        </View>
        <View className='flex justify-center mt-12'>
          <View className='relative'>
            <View className='rounded-full circle-1'></View>
            <View className='rounded-full circle-2'></View>
            <View
              className={`rounded-full circle-3 rotate-animation ${
                this.state.playStatus ? "animation-running" : "animation-pause"
              }`}
            >
              <Image src={this.state.musicInfo["bgImage"]}></Image>
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
        <View className='my-12 mx-4 flex items-center'>
          <View className='text-white text-s w-16'>{this.state.currentTime}</View>
          <View className='flex-1'>
            <MusicSlider
              value={this.state.currentRate}
              onChange={this.onSliderChange}
            ></MusicSlider>
          </View>
          <View className='text-white text-s w-16'>{ this.state.durationTime }</View>
        </View>
        {/* 控制按钮 */}
        <View className='flex items-center justify-between px-16 '>
          <View className='i-aixin icon text-4xl text-white'></View>
          <View className='flex items-center'>
            <View
              className='i-zuojiantou icon  text-white left-btn'
              onClick={this.lastMusic}
            ></View>
            <View onClick={this.togglePlayStatus}>
              {this.state.playStatus ? (
                <View className='i-zanting icon pause-btn text-white mx-8 text-shadow transition' />
              ) : (
                <View className='i-zantinganniu icon pause-btn text-white mx-8 text-shadow transition' />
              )}
            </View>
            <View
              className='i-arrow-right icon  text-white right-btn'
              onClick={this.nextMusic}
            ></View>
          </View>
          <View className='i-liebiao icon text-4xl text-white'></View>
        </View>
      </View>
    );
  }
}
