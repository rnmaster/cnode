/**
 * Created by hkc on 2016/3/18.
 */
import{
    StyleSheet,
    ProgressBarAndroid,
    View,
    Text
} from 'react-native'
import React, { Component } from 'react';
export default class ActivityIndicator extends Component {

    render() {
        let {tipText,cover} = this.props
        let tips = tipText?(<Text style={{fontSize:16,color:'#f7f7f7',marginTop:10}}>{tipText}</Text>):null
        let coverFrame=(cover||tipText)?(<View style={[{position:'absolute',top:0,left:0,bottom: 0,right:0,backgroundColor:'transparent',opacity:0.5}]}></View>):null
        return (
            <View style={[styles.centering,{backgroundColor:'transparent',position:'absolute',top:0,left:0,bottom: 0,right:0}]}>
                {coverFrame}
                <ProgressBarAndroid
                    style={[ {height: 40, width:40,borderRadius:5}]}
                    styleAttr ="Small" color="#de1c65"
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