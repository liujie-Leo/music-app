import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import "./button.less";

type Props = {
  a:string
}

export default class Index extends Component<Props> {

  componentDidMount() {
    console.log(this);
  }

  render() {
    let {a} = this.props
    return (
      <View className='index'>
        <Text>button!{ a}</Text>
        <View>
          {this.props.children}
        </View>
      </View>
    )
  }
}
