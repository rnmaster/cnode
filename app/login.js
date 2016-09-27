/**
 * Created by hkc on 2016/9/23.
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
import {Kstore,RQ} from './utils'
import ToReply from './toReply'
import BarcodeScanner from 'react-native-barcodescanner';
export default class extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {
              torchMode: 'off',
              cameraType: 'back',
              load:false
          };
      }
    async barcodeReceived(e) {
        /*console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);*/
        //Toast.info('Barcode: ' + e.data)
        /*this.setState({
            load:true
        })*/
        //setTimeout(function(){},1000)
        let accessToken = e.data
        if(accessToken){
            var res =await RQ.post('/accesstoken',{accesstoken:accessToken},'https://cnodejs.org/api/v1')
            this.setState({
                load:true
            })
            if(res) {
                this.setState({
                    load:false
                })
                if(res.success) {
                    await Kstore.set('member',{
                        accessToken:accessToken,
                        loginName:res.loginname
                    })
                    GLOBAL.member = {
                        accessToken:accessToken,
                        loginName:res.loginname
                    }
                    Toast.info(res.loginname+'，登录成功')
                    const {des,topicId,replyId,navigator} = this.props
                    if(des){
                        navigator.replace({component:ToReply,params:{
                            topicId:topicId,
                            replyId:replyId
                        }})
                    } else navigator.pop()
                }
                else Toast.info(res.error_msg)

            }
            //let nav = this.props.navigator
        }
    }

    render(){
        return  (
            <View style={{flex:1}}>
                <BarcodeScanner
                    onBarCodeRead={(e)=>this.barcodeReceived(e)}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}
                />
                {this.state.load?<ActivityIndicator
                    toast text="正在加载"
                />:null}

            </View>
        )
    }
}