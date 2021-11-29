import { Component } from 'react'
import { AtSlider } from "taro-ui";
import { View } from "@tarojs/components";

interface Props{
  onChange: any,
  value:number
}

export default class musicSlider extends Component<Props> {
  onChange = (e) => {
    console.log(e);
  }
  render() {
    const {onChange,value} = this.props
    return (
      <View>
        <AtSlider
          value={value}
          blockSize={12}
          activeColor='#aeafa6'
          onChange={onChange}
        ></AtSlider>
      </View>
    );
  }
}
