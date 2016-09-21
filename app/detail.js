/**
 * Created by hkc on 16/9/20.
 */
import {
    WebView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { Component } from 'react';
import {RQ} from './utils'
import Reply from './reply'
export default class extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            res: {}
        };
      }
    jumpReply(){
        const {navigator,topicId} = this.props
        navigator.push({component:Reply,params:{
            topicId:topicId,res:this.state.res
        }})
    }
    async componentDidMount() {
        const {topicId} = this.props
        let res = await RQ.get('/api/v1/topic/'+topicId,null,"https://cnodejs.org")
        if(res.success){
            this.setState({
                res:res.data
            })
        }
    }

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                        <View>
                            <View style={{paddingHorizontal:15,paddingVertical:10}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}} numberOfLines={1}>
                                    {this.state.res.title}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    source={{uri: this.state.res&&this.state.res.author?this.state.res.author.avatar_url:''}}
                                    style={{width: 40, height: 40,borderRadius:20,marginLeft:15,marginRight:10}}
                                />
                                <View style={{flex:1,justifyContent :'space-between'}}>
                                    <View>
                                        <Text>{this.state.res&&this.state.res.author?this.state.res.author.loginname:''}</Text>
                                    </View>
                                    <View>
                                        <Text>{this.state.res.visit_count}次浏览</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <WebView
                            ref='webview'
                            style={{flex:1}}
                            scalesPageToFit={true}
                            source={{html:this.state.res.content}}
                        />
                    </View>
                    <TouchableOpacity style={{position:'absolute',bottom:30,right:30,width:50,height:50,backgroundColor:'#80bd01',borderRadius:25,justifyContent:'center',alignItems:'center'}}  activeOpacity={0.9} onPress={()=>this.jumpReply()}>
                        <Image source={require('asset/reply.png')} style={{height:28,width:28}}/>
                    </TouchableOpacity>
            </View>
        )

    }
}