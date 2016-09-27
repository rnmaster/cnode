/**
 * Created by hkc on 2016/9/21.
 * 过滤器
 */
'use strict'
let table = {
    'top':'置顶',
    'share':'分享',
    'ask':'问答',
    'job':'招聘',
    'good':'精华'
}
let filter = (type)=>{
    return table[type]
}
export default filter