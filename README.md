# cnode one of the Black Science and Technology
react native for cnode use redux
## dependencies
+ antd-mobile
+ babel-plugin-module-alias
+ moment
+ react-native-barcodescanner
+ redux
+ redux-persist
+ redux-thunk

## stage-0 
```javascript
use {...a,...b} replace Object.assign({a,b})
`````````````````

## transform-decorators-legacy
```javascript
//new
@connect()

//old
const a = ...
connect()(a)
`````````````````

## Dynamic Route
load the functional module when we need!

## QA
### SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.
echo "sdk.dir = /Users/$(whoami)/Library/Android/sdk" > android/local.properties
