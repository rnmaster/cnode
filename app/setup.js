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
import Main from './main'
import moment from 'moment'
export default class extends Component {
    constructor(props){
        super(props)
        //console.disableYellowBox = true;
    }
    _renderScene(route, navigator){
        let Component = route.component;
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
}

const styles = StyleSheet.create({

});