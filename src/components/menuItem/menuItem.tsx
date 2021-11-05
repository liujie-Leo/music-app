import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import "./menuItem.less";

type Props = {
  title:string
}

export default class Index extends Component<Props> {

  componentDidMount() {
    console.log(this);
  }

  render() {
    return (
      <View className='index'>
        <Text>button!</Text>
        <View>
          {this.props.children}
        </View>
      </View>
    )
  }
}
