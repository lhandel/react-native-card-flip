import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  Platform,
  StyleSheet,
  Animated
} from 'react-native';


export default class CardFlip extends Component<Props> {

  constructor(props) {
    super(props);
    this.state ={
      duration: 5000,
      side: 0,
      sides: [],
      progress: new Animated.Value(0),
      rotation: new Animated.ValueXY({x: 50, y: 50}),
      zoom: new Animated.Value(0),
      rotateOrientation: '',
      flipDirection: 'y'
    }
  }

  componentDidMount(){
    this.setState({
      duration: this.props.duration,
      flipZoom: this.props.flipZoom,
      sides: this.props.children
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      duration: nextProps.duration,
      flipZoom: nextProps.flipZoom,
      sides: nextProps.children
    });
  } 

  tip(customConfig){
    
    const defaultConfig = { direction: 'left', progress: 0.05, duration: 150 };
    const config = { ...defaultConfig, ...customConfig}
    const {direction, progress, duration } = config;
    
    const { rotation, side } = this.state;
    const sequence = [];

    if(direction === 'right'){
      sequence.push(Animated.timing(
        rotation,
        {
          toValue: {
            x: 0,
            y: (side === 0) ? 50 + progress*50 : 90,
          },
          duration,
          useNativeDriver: true,
        }
      ));
    }else{
      sequence.push(Animated.timing(
        rotation,
        {
          toValue: {
            x: 0,
            y: (side === 0) ? 50 - progress*50 : 90,
          },
          duration,
          useNativeDriver: true,
        }
      ));
    }
    sequence.push(Animated.timing(
      rotation,
      {
        toValue: {
          x: 0,
          y: (side === 0) ? 50 : 100,
        },
        duration,
        useNativeDriver: true,
      }
    ));
    Animated.sequence(sequence).start();
  }

  jiggle(customConfig = {}){

    const defaultConfig = { count: 2, duration: 100, progress: 0.05 };
    const config = { ...defaultConfig, ...customConfig}
    const { count, duration, progress } = config;

    const { rotation, side } = this.state;

    const sequence = [];
    for (let i = 0; i < count; i++){

      sequence.push(Animated.timing(
        rotation,
        {
          toValue: {
            x: 0,
            y: (side === 0) ? 50 + progress*50 : 90,
          },
          duration,
          useNativeDriver: true,
        }
      ));

      sequence.push(Animated.timing(
        rotation,
        {
          toValue: {
            x: 0,
            y: (side === 0) ? 50 - progress*50 : 110,
          },
          duration,
          useNativeDriver: true,
        }
      ));

    }
    sequence.push(Animated.timing(
      rotation,
      {
        toValue: {
          x: 0,
          y: (side === 0) ? 50 : 100,
        },
        duration,
        useNativeDriver: true,
      }
    ));
    Animated.sequence(sequence).start();
  }



  flip() {
    if(this.props.flipDirection == 'y'){
      this.flipY()
    }else{
      this.flipX()
    }
  }


  flipY() {
    const { side }  = this.state;
    this.setState({
      side: (side === 0) ? 1 : 0,
      rotateOrientation: 'y',
    });
    this._flipTo({
      x: 50,
      y: (side === 0) ? 100 : 50,
    });
  }

  flipX() {
    const { side }  = this.state;

    this.setState({
      side: (side === 0) ? 1 : 0,
      rotateOrientation: 'x',
    });

    this._flipTo({
      y: 50,
      x: (side === 0) ? 100 : 50,
    });
  }

  _flipTo(toValue){

    const { duration, rotation, progress, zoom, side } = this.state;
    this.props.onFlip((side === 0) ? 1 : 0);
    this.props.onFlipStart((side === 0) ? 1 : 0);
    Animated.parallel([
      Animated.timing(
        progress,
        {
          toValue: (side === 0) ? 100 : 0,
          duration,
          useNativeDriver: true,
        }
      ),
      Animated.sequence([
        Animated.timing(
          zoom,
          {
            toValue: 100,
            duration: duration/2,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          zoom,
          {
            toValue: 0,
            duration: duration/2,
            useNativeDriver: true,
          }
        )
      ]),
      Animated.timing(
        rotation,
        {
          toValue,
          duration: duration,
          useNativeDriver: true,
        }
      )
    ]).start(() => {
      this.props.onFlipEnd((side === 0) ? 1 : 0);
    });

  }

  getCardATransformation(){
    //0, 50, 100
    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: 'clamp',
    });

    const sideATransform = {
      opacity: sideAOpacity,
      zIndex: (side === 0)? 1 : 0,
      transform: [
        { perspective: this.props.perspective },
      ]
    }
    if(rotateOrientation === 'x')
    {
      const aXRotation = rotation.x.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['-180deg', '0deg','180deg','0deg'],
        extrapolate: 'clamp',
      });
      sideATransform.transform.push({ rotateX: aXRotation })
    }
    else
    {
      // cardA Y-rotation
      const aYRotation = rotation.y.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['-180deg','0deg','180deg', '0deg'],
        extrapolate: 'clamp',
      });
      sideATransform.transform.push({ rotateY: aYRotation })
    }
    return sideATransform;

  }


  getCardBTransformation(){

    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const sideBTransform = {
      opacity: sideBOpacity,
      zIndex: (side === 0)? 0 : 1,
      transform: [
        { perspective: (-1 * this.props.perspective) },
      ]
    }

    if(rotateOrientation === 'x')
    {
      const bXRotation = rotation.x.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['0deg','-180deg','-360deg', '180deg'],
        extrapolate: 'clamp',
      });
      sideBTransform.transform.push({ rotateX: bXRotation })
    }
    else
    {
      // cardB Y-rotation
      const bYRotation = rotation.y.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['0deg', '180deg','0deg', '-180deg'],
        extrapolate: 'clamp',
      });
      sideBTransform.transform.push({ rotateY: bYRotation })
    }
    return sideBTransform;

  }



  render() {

    const { side, progress, rotateOrientation, zoom, sides } = this.state;
    const { flipZoom } = this.props

    // Handle cardA transformation
    const cardATransform = this.getCardATransformation()

    // Handle cardB transformation
    const cardBTransform = this.getCardBTransformation()

    // Handle cardPopup
    const cardZoom = zoom.interpolate({
      inputRange: [0,100],
      outputRange: [1, (1+flipZoom)],
      extrapolate: 'clamp',
    });

    const scaling = {
      transform: [
        { scale: cardZoom }
      ]
    }
    
    return (
      <Animated.View style={[this.props.style, scaling]}>
        <Animated.View style={[styles.cardContainer, cardATransform]}>{sides[0]}</Animated.View>
        <Animated.View style={[styles.cardContainer, cardBTransform]}>{sides[1]}</Animated.View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    position:'absolute',
    left:0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

CardFlip.defaultProps = {
  style: {},
  duration: 500,
  flipZoom: 0.09,
  flipDirection: 'y',
  perspective: 800,
  onFlip: () => {},
  onFlipStart: () => {},
  onFlipEnd: () => {},
}

CardFlip.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  duration: PropTypes.number,
  flipZoom: PropTypes.number,
  flipDirection: PropTypes.string,
  onFlip: PropTypes.func,
  onFlipEnd: PropTypes.func,
  onFlipStart: PropTypes.func,
  perspective: PropTypes.number,
}
