import { favorateList, createdList, musicList, swiperPlayList } from "./const";

// 获取歌单列表
export const getPlayList = function (type: string) {
  if (type === "favorite") {
    return new Promise((resolve) => {
      resolve(favorateList);
    });
  }
  if (type === "created") {
    return new Promise((resolve) => {
      resolve(createdList);
    });
  }
};

// 获取swiper歌单列表
export const getSwiperPlayList = function (options) {
  if (options.type === "folk") {
    return new Promise((resolve) => {
      resolve(swiperPlayList);
    });
  }
}

// 获取歌曲列表
export const getMusicList = function (options?) {
  options = options?options:{}
  let resList = musicList;
  if (Object.keys(options).length>0) {
    resList = musicList.filter((item) => {
      return item.id == options.id;
    });
  }
  return new Promise((resolve) => {
    resolve(resList);
  });
};

// 上一首或下一首
export const getLastOrNextMusic = function (currentId, type = 'next') {
  let currentIndex = musicList.indexOf(musicList.filter(item => { return item.id == currentId })[0]);
  if (type === 'next') {
    if (currentIndex == musicList.length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    return new Promise(resolve => {
      resolve(musicList[currentIndex])
    })
  }
  if (type === 'last') {
    if (currentIndex == 0) {
      currentIndex = musicList.length - 1;
    } else {
      currentIndex--;
    }
    return new Promise((resolve) => {
      resolve(musicList[currentIndex]);
    });
  }
}