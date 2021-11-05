export default {
  pages: [
    "pages/found/found",
    "pages/podcast/podcast",
    "pages/my/my",
    "pages/musicList/musicList",
    "pages/player/player",
    "pages/login/login",
    "pages/recentPlay/recentPlay",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#ccc",
    selectedColor: "#000",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/found/found",
        text: "发现",
        iconPath: "assets/images/tabBar/1.png",
        selectedIconPath: "assets/images/tabBar/1s.png",
      },
      // {
      //   pagePath: "pages/podcast/podcast",
      //   text: "播客",
      //   iconPath: "assets/images/tabBar/2.png",
      //   selectedIconPath: "assets/images/tabBar/2s.png",
      // },
      {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "assets/images/tabBar/3.png",
        selectedIconPath: "assets/images/tabBar/3s.png",
      },
    ],
  },
};
