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
  TouchableOpacity
} from 'react-native';

class Pomodoro extends Component {
  constructor(props){
    super(props)
    this.state = {
      timeLeft: 0,
      timeRuning : false,
      currentTime: 15000
    }
  }
  toggleTimer(){
    var currentTime = this.state.currentTime // 25 min
    this.setState({
      timeLeft: this.state.timeLeft,
      timeRuning : !this.state.timeRuning,
      currentTime: this.state.currentTime
    })


    //TODO : Pass this into a helper
    var min = function(time){

      return doubleZero(Math.floor((time/60)))
    }
    var seg = function(time){

      console.log('----------------');
      console.log(time%60)
      console.log(doubleZero(time%60));
      console.log('----------------');

      return doubleZero(time%60)
    }
    var doubleZero = function(time){
      if (time < 10){
        time = '0' + time
      }
      return time
    }

    var formatTime = function(time){
      time = time/10
      time = time.toFixed(0)
      // return time
      return String(min(time))+':'+String(seg(time))
    }
    //TODO : Pass this into a helper
    setInterval(()=>{
      var timeLeft = formatTime(this.state.currentTime)
      if (this.state.timeRuning != true){
        this.setState({
          timeLeft: this.state.timeLeft,
          timeRuning : this.state.timeRuning,
          currentTime: this.state.currentTime
        })
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
      <View style={styles.view}>
        <CheckList state={this.state}/>
        <MainContainer time={this.state.timeLeft} toggleTimer={this.toggleTimer.bind(this)}/>
        <Adds/>
      </View>
    );
  }
}
class CheckList extends Component{
  render(){
    return(
      <View style={styles.checkList}>
        <Text>{JSON.stringify(this.props.state)}</Text>
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
        <Text>Beautiful money maker adds</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  checkList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  mainContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  adds: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  time:{
    fontSize:50
  }
});

AppRegistry.registerComponent('Pomodoro', () => Pomodoro);
