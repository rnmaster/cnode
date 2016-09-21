/**
 * Created by hkc on 16/9/20.
 */
import {
    WebView,
} from 'react-native'
import React, { Component } from 'react';
export default class extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }


    render(){
        return (
            <WebView
                ref='webview'
                style={{flex:1}}
                source={{uri: 'http://baidu.com'}}
            />
        )

    }
}