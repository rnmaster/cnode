/**
 * Created by hkc on 2016/9/21.
 */
/**
 * Created by hkc on 16/9/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    StatusBar,
    Image,
    TouchableHighlight,
    Navigator
} from 'react-native';

import {RQ} from 'app/utils'
import Detail from 'app/detail'
export default class extends Component {
    constructor(props){
        super(props)
        //console.disableYellowBox = true;
        let data = []
        let msgListView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        msgListView = msgListView.cloneWithRows(data);
        this.state = {
            listView :msgListView,
            data:data,
            pullLoading:false
        }
    }

    async componentDidMount(){
        let res = await RQ.get('/api/v1/topics',null,"https://cnodejs.org")
        console.log(res)

        this.setState({
            listView:this.state.listView.cloneWithRows(res.data),
            data:res.data,
            page:1
        })
    }
    async getRefreshData(){
        let res = await RQ.get('/api/v1/topics',null,"https://cnodejs.org")
        //console.log(res)

        this.setState({
            listView:this.state.listView.cloneWithRows(res.data),
            data:res.data,
            page:1
        })
    }
    async getMoreData(){
        let page = this.state.page +1
        let res = await RQ.get('/api/v1/topics',{page:page},"https://cnodejs.org")
        //console.log(res)
        let data = this.state.data
        data = data.concat(res.data)
        this.setState({
            listView:this.state.listView.cloneWithRows(data),
            data:data,
            page:page
        })
    }
    getDetail(id,nav){
        //let res = await RQ.get('/api/v1/topic/'+id,null,"https://cnodejs.org")
        nav.push({component:Detail,params:{
            topicId:id
        }})
    }
    renderRow(v,nav){
        return (
            <TouchableHighlight underlayColor="transparent" onPress={()=>this.getDetail(v.id,nav)}>
                <View style={{paddingHorizontal:15,paddingVertical:15,borderBottomWidth:1,borderColor:'#eee'}} >
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:5}}>{v.top?<Text>top</Text>:<Text>{v.tab}</Text>}</View>
                        <View style={{flex:1}}><Text numberOfLines={1}>{v.title}</Text></View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri: v.author.avatar_url}}
                               style={{width: 40, height: 40,borderRadius:20,margin:5,marginRight:10}} />
                        <View style={{flex:1,justifyContent :'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{flex:1}}>{v.author.loginname}</Text>
                                <Text>{v.reply_count}/{v.visit_count}</Text>
                            </View>
                            <View>
                                <Text>创建于:{GLOBAL.moment(v.create_at).fromNow()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View style={{flex:1}}>
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
                    removeClippedSubviews={true}
                    pageSize={1}
                    initialListSize={5}
                    scrollRenderAheadDistance={10}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={20}
                    onEndReached={()=>this.getMoreData()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});