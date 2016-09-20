/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import helpers from './helpers/helpers'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'



const times = [15000, 3000]
// const times = [100, 100]
// import * as Sound from 'react-native-simple-sound'
var Sound = require('react-native-simple-sound');
class Pomodoro extends Component {
  constructor(props){
    super(props)
    this.state = {
      timeLeft: helpers.formatTime(times[0]),
      timeRuning : false,
      currentTime: times[0],
      counter: 0,
      pomodoros: 0,
    }
  }

  toggleTimer(){
    var currentTime = this.state.currentTime // 25 min

    var state = this.state
    state.timeRuning = !this.state.timeRuning
    this.setState(state)

    if (this.state.timeRuning == false){
      clearInterval(interval)
    }



    var interval = setInterval(()=>{
      if (this.state.timeRuning == false){
        clearInterval(interval)
      }
      var timeLeft = helpers.formatTime(this.state.currentTime)
      if(this.state.currentTime <0){
        Sound.enable(true)
        Sound.prepare('ring.mp3')
        Sound.play('ring.mp3')
        var state = this.state
        state.counter = state.counter + 1
        state.timeRuning = false
        state.currentTime = times[state.counter%2]
        if (state.counter%2){
          state.pomodoros = state.pomodoros + 1
        }
        state.timeRuning != this.state.timeRuning
        this.setState(state)
        currentTime = this.state.currentTime
        return
      }
      currentTime--
      this.setState({
        timeLeft: timeLeft,
        timeRuning : this.state.timeRuning,
        currentTime: currentTime
      })


    }, 100)

  }
  render() {
    return (
      <Image source={require('./img/bg.png')} style={styles.bg}>
        <CheckList state={this.state}/>
        <MainContainer time={this.state.timeLeft} toggleTimer={this.toggleTimer.bind(this)}/>
        <Adds/>
      </Image>
    );
  }
}
class CheckList extends Component{
  render(){
    var pomodoros = []
    for (var i=0; i!=this.props.state.pomodoros; i++){
      pomodoros.push((<Image style={styles.checkItem} key={i}
          source={require('./img/checked_checkbox.png')}
        />))
    }

    return(
      <View style={styles.checkList}>
        {pomodoros.map((pomodoro, i)=>{return pomodoro})}
      </View>
    )
  }
}

class MainContainer extends Component{
  render(){
    return(

      <TouchableOpacity onPress={this.props.toggleTimer} style={styles.mainContainer}>
        <Text style={styles.time}>{String(this.props.time)}</Text>
      </TouchableOpacity>
    )
  }
}

class Adds extends Component{
  render(){
    return(
      <View style={styles.adds}>

        <AdMobBanner style={styles.adds}
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-4242008009100291/1926712041"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  checkList: {
    marginTop:25,
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  checkItem:{
    marginLeft:5,
  },
  mainContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adds: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  time:{
    fontSize:50
  },
  bg: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
 }
});

AppRegistry.registerComponent('Pomodoro', () => Pomodoro);
