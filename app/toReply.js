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
    TextInput
} from 'react-native'
import React, { Component } from 'react';
import {RQ,Kstore} from './utils'
import Reply from './reply'
import {Toast,ActivityIndicator} from 'antd-mobile'
export default class extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:'',
            load:false
        };
    }

    async toReply(){
        let member = await Kstore.get('member')
        let accessToken = member.accessToken

        let {topicId,replyId} = this.props
        let params = {
            accesstoken:accessToken,
            content:this.state.text
        }
        if(replyId) params.reply_id = replyId
        let res = await RQ.post(`/topic/${topicId}/replies`,params,'https://cnodejs.org/api/v1')
        this.setState({
            load:true
        })
        if(res){
            this.setState({
                load:false
            })
            if(res.success){
                Toast.info("评论成功")
                this.props.navigator.replace({
                    component:Reply,params:{
                        topicId:topicId
                    }
                })
            }else{
                Toast.info("评论失败，请稍后重试")
            }
        }
    }
    render(){
        return (
            <View style={{flex:1}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={()=>this.toReply()}
                                  style={{alignItems:'center',backgroundColor:'#80bd01',justifyContent:'center',height:40}}>
                    <Text style={{color:'#fff'}}>评论</Text>
                </TouchableOpacity>
                {this.state.load?<ActivityIndicator
                    toast text="正在加载"
                />:null}
            </View>
        )
    }
}