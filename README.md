# react-native-card-flip
Card flip animation for React Native

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/lhandel/react-native-card-flip/issues)
[![npm version](https://badge.fury.io/js/react-native-card-flip.svg)](https://badge.fury.io/js/react-native-card-flip)

## Installation

```
  npm install --save react-native-card-flip
```

## Preview
![App preview](/screenshots/animation.gif)
![App preview2](/screenshots/animation2.gif)

```javascript
import CardFlip from 'react-native-card-flip';
```

```javascript
  <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>AB</Text></TouchableOpacity>
    <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
  </CardFlip>
```

# CardFlip


## CardFlip props
| Props               | type          | description                     | required      | default       |
| --------------------| ------------- | --------------------------------| ------------- | ------------- |
| style               | object        | container style                 |               | {}            |
| duration            | number        | flip duration                   |               | 1000          |
| flipZoom            | number        | zoom level on flip              |               | 0.09          |
| flipDirection       | string        | the rotation axis. 'x' or 'y'   |               | 'y'           |
| perspective         | number        |                                 |               | 800           |




## CardFlip events
| Props             | type          | description                 |
| ----------------- | ------------- | --------------------------- |
| onFlip            | func           | function to be called when a card is fliped. it receives the card-sides index   |
| onFlipStart       | func           | function to be called when the flip-animation starts. it receives the card-sides index   |
| onFlipEnd         | func           | function to be called when the flip-animation ends. it receives the card-sides index   |


## CardStack actions
| Props             | type          | description                 | args                              | default       |
| ----------------- | ------------- | --------------------------- | --------------------------------- | ------------- |
| flip              | func          | Flips the card              |                                   |               |
| tip               | func          | Flips the card              | { direction, progress, duration } | { direction: 'left', progress: 0.05, duration: 150 } |
| jiggle            | func          | Jiggles the card            | { count, duration, progress }     | { count: 2, duration: 200, progress: 0.05 }|


### jiggle
![App jiggle](/screenshots/jiggle.gif)
```javascript
<CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
  <TouchableOpacity style={styles.card} onPress={() => this.card.jiggle({ count: 2, duration: 100, progress: 0.05 })} ><Text>AB</Text></TouchableOpacity>
  <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
</CardFlip>
```

### tip
![App tip](/screenshots/tip.gif)
```javascript
<CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
  <TouchableOpacity style={styles.card} onPress={() => this.card.tip({ direction: 'right', duration: 150 })} ><Text>AB</Text></TouchableOpacity>
  <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
</CardFlip>
```

## CardFlip in map
```javascript
{cards.map((item, index) => {
  return (
    <CardFlip style={ styles.cardContainer } ref={ (card) => this['card' + index] = card } >
      <TouchableOpacity style={ styles.card } onPress={() => this['card' + index].flip()} ><Text>{item}</Text></TouchableOpacity>
      <TouchableOpacity style={ styles.card } onPress={() => this['card' + index].flip()} ><Text>{item}</Text></TouchableOpacity>
    </CardFlip>
  )
})}
```
