/**
 * Created by hkc on 16/5/20.
 */
import {
    StyleSheet,
    ActivityIndicatorIOS,
    View,
    Text
} from 'react-native'
import React, { Component } from 'react';
export default class ActivityIndicator extends Component {

    render() {
        let {tipText,cover} = this.props
        let tips = tipText?(<Text style={{fontSize:16,color:'#f3f3f3',marginTop:10}}>{tipText}</Text>):null
        let coverFrame=(cover||tipText)?(<View style={[{position:'absolute',top:0,left:0,bottom: 0,right:0,backgroundColor:'#000',opacity:0.7}]}></View>):null
        return (
            <View style={[styles.centering,{position:'absolute',top:0,left:0,bottom: 0,right:0}]}>
                {coverFrame}
                <ActivityIndicatorIOS
                    style={[ {height: 40, width:40,backgroundColor:'#000',opacity:0.7,borderRadius:5}]}
                    size="small"
                />
                {tips}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gray: {
        backgroundColor: '#cccccc',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})