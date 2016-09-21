/**
 * Created by hkc on 16/9/20.
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
import {RQ} from './utils'
export default class extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let data = []
        let msgListView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        msgListView = msgListView.cloneWithRows(data);
        this.state = {
            listView :msgListView,
            data:data,
            pullLoading:false,
        }
    }

    componentDidMount() {
        const {res} = this.props
        console.log(res,"reply")
        if(res.replies && res.replies.length>0){
            this.setState({
                data:res.replies,
                listView:this.state.listView.cloneWithRows(res.replies)
            })
        }
    }
    renderRow(v,nav){
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
                        </View>
                    </View>
                </View>
                <WebView
                    style={{flex:1}}
                    source={{html:v.content}}
                    scalesPageToFit={true}
                />
            </View>
        )
    }
    async getRefreshData(){
        const {topicId} = this.props
        let res = await RQ.get('/api/v1/topic/'+topicId,null,"https://cnodejs.org")
        if(res.success){
            this.setState({
                data:res.data.replies,
                listView:this.state.listView.cloneWithRows(res.data.replies)
            })
        }
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <ListView
                    dataSource={this.state.listView}
                    renderRow={(v) =>  this.renderRow(v,this.props.navigator)}
                    refreshControl={
                          <RefreshControl
                            refreshing={this.state.pullLoading}
                            onRefresh={()=>this.getRefreshData()}
                            tintColor="#34495e"
                            title="下拉加載更多"
                            colors={['#34495e']}
                            progressBackgroundColor="#ffffff"
                          />
                    }
                />
                <View style={{alignItems:'center',backgroundColor:'#80bd01',justifyContent:'center',height:40}}>
                    <Text style={{color:'#fff'}}>点击发帖</Text>
                </View>
            </View>
        )

    }
}