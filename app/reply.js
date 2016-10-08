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
import {RQ,Kstore} from './utils'
import KItem from './item'
import Login from './login'
import ToReply from './toReply'
import {Toast} from 'antd-mobile'
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

    async componentDidMount() {
        const {res,topicId} = this.props
        //Toast.info(res.replies.length+'&&&length')
        if(res && res.replies && res.replies.length>0){
            this.setState({
                data:res.replies,
                listView:this.state.listView.cloneWithRows(res.replies)
            })
        }else{
            let Nres = await RQ.get('/api/v1/topic/'+topicId,null,"https://cnodejs.org")
            console.log(Nres)
            if(Nres.success){
                //Toast.info("我进来了")
                this.setState({
                    data:Nres.data.replies,
                    listView:this.state.listView.cloneWithRows(Nres.data.replies)
                })
            }
        }
    }

    renderRow(v,nav){
        return (
            <KItem data={v} navigator = {nav}/>
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
    async authReply(id){
        if(id) Toast.info(id)
        let res = await Kstore.get('member')
        let nav = this.props.navigator
        const {topicId} = this.props
        if(res){
            //Toast.info(res.loginName+'已经登录')
            nav.replace({component:ToReply,params:{
                topicId:topicId
            }})//没有登录跳去登录
        }else{
            nav.replace({component:Login,params:{
                des:'ToReply',
                topicId:topicId,
            }})//没有登录跳去登录
            //Toast.info('没有登录')
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
                <TouchableOpacity onPress={()=>this.authReply()}
                      style={{alignItems:'center',backgroundColor:'#80bd01',justifyContent:'center',height:40}}>
                    <Text style={{color:'#fff'}}>点击发帖</Text>
                </TouchableOpacity>
            </View>
        )

    }
}