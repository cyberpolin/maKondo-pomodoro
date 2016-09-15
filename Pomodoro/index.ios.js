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
    this.state = {timeLeft: 0}
  }
  toggleTimer(){
    var currentTime = 1500 // 25 min
    var min = function(time){
      return Math.floor(time/60)
    }
    var seg = function(time){
      return time%60
    }

    setInterval(()=>{
      currentTime--
      this.setState({timeLeft: String(min(currentTime))+':'+String(seg(currentTime))})

    }, 1000)

  }
  render() {
    return (
      <View style={styles.view}>
        <CheckList/>
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
        <Text>check list </Text>
      </View>
    )
  }
}

class MainContainer extends Component{
  render(){
    return(

      <TouchableOpacity onPress={this.props.toggleTimer} style={styles.mainContainer}>
        <Text>{String(this.props.time)}</Text>
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
  }
});

AppRegistry.registerComponent('Pomodoro', () => Pomodoro);
