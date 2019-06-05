import {Platform,AlertIOS,ToastAndroid} from 'react-native'

export default  class Notification {

    static show(title,message){
        switch (Platform.OS) {
            case "android": ToastAndroid.show(message,ToastAndroid.SHORT);
                break;
            case "ios": AlertIOS.alert(title,message);
                break;
            default: alert(message)
        }
    }
}