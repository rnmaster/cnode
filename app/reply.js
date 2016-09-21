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
                <Text>回复列表</Text>
            </View>
        )

    }
}