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
import {RQ} from './utils'
import Detail from './detail'
export default class extends Component {
    constructor(props){
        super(props)
        //console.disableYellowBox = true;
        let msgListView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        msgListView = msgListView.cloneWithRows([]);
        this.state = {
            listView :msgListView
        }
    }

    async componentDidMount(){
        let res = await RQ.get('/api/v1/topics',null,"https://cnodejs.org")
        console.log(res)
        this.setState({
            listView:this.state.listView.cloneWithRows(res.data)
        })
    }

    getDetail(id,nav){
        //let res = await RQ.get('/api/v1/topic/'+id,null,"https://cnodejs.org")
        nav.push({component:Detail})
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
                               style={{width: 40, height: 40,borderRadius:20,margin:5}} />
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text>{v.author.loginname}</Text>
                                <Text>创建于:{v.create_at}</Text>
                            </View>
                            <View>
                                <Text>{v.reply_count}/{v.visit_count}</Text>
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
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});