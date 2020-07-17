## Navigation Exercise Solution - Part 1

_Update the app so that the colors and name are being passed into the ColorPalette component, making it reusable._

For this we need to move the `COLORS` constant from `ColorPalette` to `Home` and pass in both the paletteName and colors as a second argument to `navigation.navigate`.

Then in `ColorPalette`, use the `route` prop, specifically `route.params.paletteName` and `route.params.colors` to replace the previously hardcoded values.

Finally, if you haven't done so already, add `backgroundColor: 'white'` to the `container` style in `ColorPalette`. React Navigation adds a greyish background to pages by default.

## Navigation Exercise Solution - Part 2

_Make sure the page title will be the name of the color palette instead of the name of the page._

As in the [docs](https://reactnavigation.org/docs/headers#using-params-in-the-title), open `App.js` and add an extra prop to the ColorPalette screen:

```js
options={({ route }) => ({ title: route.params.paletteName })}
```

You can also delete the `ListHeaderComponent` prop from `ColorPalette`, since the palette name is already displayed as the page title.

## Navigation Exercise Solution - Part 3

_Add a the new color schemes._

Fist off we'll want to create a new array for `COLOR_PALETTES`:

```js
// screens/Home.js

const COLOR_PALETTES = [
  { paletteName: 'Solarized', colors: SOLARIZED },
  { paletteName: 'Random', colors: RANDOM },
  { paletteName: 'Rainbow', colors: RAINBOW },
];
```

Next up we can replace our existing code in the render with a single FlatList:

```js
// screens/Home.js

<FlatList
  data={COLOR_PALETTES}
  keyExtractor={(item) => item.paletteName}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigation.push('ColorPalette', item)}>
      <Text>{item.paletteName}</Text>
    </TouchableOpacity>
  )}
/>
```

Make sure you've replaced the hardcoded values in renderItem with the dynamic ones we're done!

## Navigation Exercise Solution - Part 4

Update the Home page to display the first 5 colors of the color scheme as preview

Create a new component in out components directory and let's call it `PalettePreview`. Before you start adding styling and colors to it, make sure the existing functionality remains unbroken.

In the Home component, update the `renderItem` to use `PalettePreview` instead:

```js
// screens/Home.js

<PalettePreview
  onPress={() => navigation.push('ColorPalette', item)}
  palette={item}
/>
```

And in PalettePreview, copy the code that used to be in renderItem and use the passed in props to display the component name and handle onPress"

```js
// components/PalettePreview.js

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const PalettePreview = ({ palette, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{palette.paletteName}</Text>
    </TouchableOpacity>
  );
};

export default PalettePreview;
```

Now, add a FlatList under the `<Text>` in `PalettePreview` to render the three preview colors. Technically you could get away with not using `FlatList` here, since we know we'll only ever have 3 items to display, but using FlatList it's a good habit to get into and there's no harm, so I'd recommend always using a `FlatList` for 3+ items.

Note, you can use `palette.colors.slice(0, 3)` to get the first 3 items of your color array (never splice, as it mutates the array).

You'll have to pass in an array of styles to the little color square in order to set the background dynamically, like so:

```js
// components/PalettePreview.js

renderItem={({ item }) => (
    <View style={[styles.color, { backgroundColor: item.hexCode }]} />
)}
```

Finally, in order to ensure that the white palette colors still show up on the white background, add a shadow:

```js
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.3,
shadowRadius: 1,
elevation: 2,
```

`elevation: 2` is Android only and the rest is iOS only.

```js
// App.js

import ColorPalette from './screens/ColorPalette';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }) => ({
            title: route.params.paletteName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
```

```js
// components/PalettePreview.js

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const PalettePreview = ({ handlePress, colorPalette }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{colorPalette.paletteName}</Text>
      <FlatList
        style={styles.list}
        data={colorPalette.colors.slice(0, 5)}
        keyExtractor={(item, index) => `${index}.${item.colorName}`}
        renderItem={({ item }) => (
          <View style={[styles.box, { backgroundColor: item.hexCode }]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default PalettePreview;
```

```js
// screens/Home.js

import { FlatList, StyleSheet } from 'react-native';

import PalettePreview from '../components/PalettePreview';
import React from 'react';

const SOLARIZED = [
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

const RANDOM = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const RAINBOW = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const COLOR_PALETTES = [
  { paletteName: 'Solarized', colors: SOLARIZED },
  { paletteName: 'Random', colors: RANDOM },
  { paletteName: 'Rainbow', colors: RAINBOW },
];

const Home = ({ navigation }) => {
  return (
    <FlatList
      style={styles.list}
      data={COLOR_PALETTES}
      keyExtractor={(item, index) => `${index}.${item.paletteName}`}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
});

export default Home;
```

```js
// screens/ColorPalette.js

import { FlatList, StyleSheet, Text } from 'react-native';

import ColorBox from '../components/ColorBox';
import React from 'react';

const ColorPalette = ({ route }) => {
  const { paletteName, colors } = route.params;
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={(item, index) => `${index}.${item.colorName}`}
      renderItem={({ item, index }) => (
        <ColorBox
          index={index}
          colorName={item.colorName}
          hexCode={item.hexCode}
        />
      )}
      ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
```
