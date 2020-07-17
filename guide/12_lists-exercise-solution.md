In this solution we're removed the individual `ColorBox`es and rendered them all using a `FlatList`. Some things to note:

- since we no longer have a containing `View`, we not pass in the component styles into the `FlatList` component instead. Almost all native components in React Native can by styled using the style prop
- notice that the name of the palette scrolls with the colors. This is because we added it to FlatList using the `ListHeaderComponent` prop
- we've used a little calculation to adjust text colour for the background colour. There are better algorithms to do this, but this is definitely the shortest: `parseInt(props.hexCode.replace('#', ''), 16) > 0xffffff / 1.1`. Here we essentially get the lightest 10% of the background colors and display black text for these, and white for the rest.

```js
// App.js

import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

import ColorBox from './components/ColorBox';
import React from 'react';

const COLORS = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const App = () => {
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={COLORS}
        keyExtractor={(item, index) => `${index}.${item.colorName}`}
        renderItem={({ item, index }) => (
          <ColorBox
            index={index}
            colorName={item.colorName}
            hexCode={item.hexCode}
          />
        )}
        ListHeaderComponent={<Text style={styles.text}>Solarized</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
```

```js
// components/ColorBox.js

import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const ColorBox = ({ index, colorName, hexCode }) => {
  const boxColor = {
    backgroundColor: hexCode,
  };
  const textColor = {
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <Text style={[styles.boxText, textColor]}>
        {index}. {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxText: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
```
