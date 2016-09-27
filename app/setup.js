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
    Navigator,
    Platform,
    BackAndroid
} from 'react-native';
import moment from 'moment'
require('moment/locale/zh-cn');
moment.locale('zh-cn')
import {RQ} from 'app/utils'
import Main from 'app/main'
import Login from 'app/login'
//import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import {Toast} from 'antd-mobile'
export default class extends Component {
    constructor(props){
        super(props)
        console.disableYellowBox = true;
    }
    _renderScene(route, navigator){
        let Component = route.component
        //var c = require(`app/${route.id}.js`)
        return <Component {...route.params} navigator={navigator} />
    }
    render() {
        return (
            <View style={{flex:1}}>
                 <Navigator
                     ref="navigator"
                     initialRoute={{component:Main}}
                     renderScene={this._renderScene}
                 />
            </View>
        );
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnMount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.refs;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;
        }
        this.lastBackPressed = Date.now();
        Toast.info('再按一次退出应用')
        return true;
    };

}

GLOBAL.moment = moment

const styles = StyleSheet.create({

});