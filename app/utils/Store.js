/**
 * Created by hkc on 16/9/20.
 */
import {
    AsyncStorage
} from 'react-native'

get = async (name)=>{
    let res = await AsyncStorage.getItem(name)
    return res?JSON.parse(res):''
}
set = async (name,val)=>{
    let store = JSON.stringify(val||{})
    await AsyncStorage.setItem(name,store)
}

del = async (name)=>{
    return await AsyncStorage.removeItem(name)
}
export default { get,set,del }