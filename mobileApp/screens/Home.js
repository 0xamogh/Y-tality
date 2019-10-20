import React from 'react';
import { StyleSheet, Dimensions, ScrollView,Linking, Platform, Image } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Button from '../components/Button'
import Pulse from '../components/pulse'
import { Icon } from 'galio-framework';

import { Card } from '../components';
import call from 'react-native-phone-call';

import Gcard from '../components/graphcard'
import MapCard from '../components/mapcard'
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
      this.interval = setInterval(
      async () => {
        this.param = {
          ECG_raw_value : [],
          EEG_raw_value : [],
          pulse : [],
        };
        // previous param
        console.log(this.param);
        fetch('http://172.16.31.106:3000/quick')
        .then((response) => response.json())
        .then((responseJson) => {
          // this.setparam((prev_param) => {
            // Important: read `param` instead of `this.param` when updating.
            // if (!prev_param) {

            // }
            // responseJson.result = responseJson.result.map(res => JSON.parse(res));
            let final = responseJson.result.reduce( (total, currentValue) => {
              return {
                ID : currentValue.ID,
                ECG_prediction : parseInt(currentValue.ECG_prediction, 10),
                ECG_raw_value : [ ...total.ECG_raw_value, currentValue.ECG_raw_value].map((x) => { return parseInt(x, 10);}),
                EEG_prediction : parseInt(currentValue.EEG_prediction, 10),
                EEG_raw_value : [...total.EEG_raw_value, currentValue.EEG_raw_value].map((x) => { return parseInt(x, 10);}),
                GPS : parseInt(currentValue.GPS, 10),
                microphone_heart_prediction : parseInt(currentValue.microphone_heart_prediction, 10),
                pulse : [...total.pulse, currentValue.pulse].map((x) => { return parseInt(x, 10);}),
              }
            }, {
              ECG_raw_value : [],
              EEG_raw_value : [],
              pulse : [],
            })

            this.param = final;

            this.setState(final);
            // responseJson.result
            // return {
              
            // }

            // if (prev_param && prev_param.ECG_raw_value) {
            //   return {
            //     isLoading: false,
            //     ECG_prediction: responseJson.result.ECG_prediction,
            //     ECG_raw_value: [...prev_param.ECG_raw_value ,responseJson.result.ECG_raw_value],
            //     EEG_prediction: responseJson.result.EEG_prediction,
            //     EEG_raw_value: responseJson.result.EEG_raw_value,
            //     GPS: responseJson.result.GPS,
            //     ID: responseJson.result.ID,
            //     microphone_heart_prediction: responseJson.result.microphone_heart_prediction,
            //     pulse: responseJson.result.pulse,
            //     dataSource: responseJson.result.movies
            //   }
            // } else {
            //   return {
            //     isLoading: false,
            //     ECG_prediction: responseJson.result.ECG_prediction,
            //     ECG_raw_value: [responseJson.result.ECG_raw_value],
            //     EEG_prediction: responseJson.result.EEG_prediction,
            //     EEG_raw_value: responseJson.result.EEG_raw_value,
            //     GPS: responseJson.result.GPS,
            //     ID: responseJson.result.ID,
            //     microphone_heart_prediction: responseJson.result.microphone_heart_prediction,
            //     pulse: responseJson.result.pulse,
            //     dataSource: responseJson.result.movies
            //   }
            // }
          // })
        })
        .catch((error) =>{
          console.error(error);
        })
      }, 5000);
    return this.interval;
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  renderArticles = (props) => {
    return (
      <ScrollView
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Pulse data={props.pulse}></Pulse>
          <Gcard reading="ECG" data={props.ECG_raw_value} prediction={props.ECG_prediction} full  />
          <Gcard reading="EEG" data={props.EEG_raw_value} prediction={props.EEG_prediction} full  />
          <MapCard  full />
          {/* <Block flex row>
            <Card item={articles[0]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[0]} />
          </Block> */}
          {/* <Card item={articles[0]} full />
          <Card item={articles[0]} full /> */}
          <Card  full/>
          <Button
            color = {"error"}
            radius ={3}
            gradient={true}
            onPress ={ this.onEmergency}
          >CALL FOR HELP</Button>
        </Block>
      </ScrollView>
    )
  }
  
  onEmergency ()  {
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${911}';
    }
    else {
      phoneNumber = 'telprompt:${911}';
    }
    Linking.openURL(phoneNumber);

  }
  
  render() {
    
    return (
      <Block flex center style={styles.home}>
        {this.state && this.renderArticles(this.state)}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
