/**
 * Created by hkc on 2016/9/22.
 */
import {
    WebView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl,
} from 'react-native'
import React, { Component } from 'react';
import {Toast,ActivityIndicator} from 'antd-mobile'
export default class extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            height:30
        };
      }
    onNavigationStateChange(navState){
        //Toast.info('height'+navState.title)
        //this.setState({
        //    height:navState.title
        //})
    }
    render (){
        var v = this.props.data
        //var html = '<!DOCTYPE html><html><body>' + v.content + '<script>window.location.hash = 1;document.title = document.height;</script></body></html>';
        return (
            <View style={{borderBottomWidth:1,borderBottomColor:'#f7f7f7',paddingHorizontal:15,paddingVertical:15}}>
                <View style={{flexDirection:'row',marginBottom:10}}>
                    <Image
                        source={{uri: v.author.avatar_url}}
                        style={{width: 40, height: 40,borderRadius:20,marginLeft:15,marginRight:10}}
                    />
                    <View style={{flex:1,justifyContent :'space-between'}}>
                        <View>
                            <Text>{v.author.loginname}</Text>
                            <Text>{this.state.height}</Text>
                        </View>
                    </View>
                </View>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    style={{height:40}}
                    source={{html:v.content}}
                />
            </View>
        )
    }
}