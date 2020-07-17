Before we get stuck into our form challenge, we'll need to do some prep work. Specifically, we need to open a modal to put that form in. This requires some tinkering with navigation again, so we'll dp that first.

For the forms challenge, we'd like to be start adding our own color schemes to the list. But the best way to do that would be using a modal, so first we need to update out navigation so allow us to trigger display modals. In order to do this, we'll have to once again refactor our navigation.

Source: react navigation [docs](https://reactnavigation.org/docs/modal/)

Our current layout only has the RootStack, HomeScreen, and DetailsScreen, so we need to add the a MainStack and a Modal Screen in the middle.

First lets rename our Stack to RootStack:

```js
// App.js

const RootStack = createStackNavigator();
```

Now below that, we declare our MainStack:

```js
// App.js

const MainStack = createStackNavigator();
```

Now let's add the MainStack and pull our existing navigation all out of the App component and into it's own MainStackScreen component:

```js
// App.js

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};
```

Finally, update the App component to use RootStack and MainStackScreen

```js
// App.js

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
```

Note that we had to use `mode="modal"` on `RootStack.Navigator` to tell the navigation that we're going to have a modal in there. We also had to add `options={{ headerShown: false }}` to `RootStack.Screen`. If we didn't do this, we'd end up with two top navs in our main stack!

Now all we need to do is add the modal. Create a new file called `ColorPaletteModal.js` in your `screens` directory and add some default content:

```js
// screens/AddNewPaletteModal.js

import React from 'react';
import { View, Text } from 'react-native';

const AddNewPaletteModal = () => {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
};

export default AddNewPaletteModal;
```

And finally import the Modal in your App.js and add the modal to the RootStack:

```js
import AddNewPaletteModal from './screens/AddNewPaletteModal';

// place this just before </RootStack.Navigator>
<RootStack.Screen name="AddNewPalette" component={AddNewPaletteModal} />;
```

```js
// App.js

import ColorPalette from './screens/ColorPalette';
import ColorPaletteModal from './screens/ColorPaletteModal';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({
          title: route.params.paletteName,
        })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="model">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ColorPaletteModal"
          component={ColorPaletteModal}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

```js
// screens/ColorPaletteModal.js

import { Text, View } from 'react-native';

import React from 'react';

const ColorPaletteModal = () => {
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
};

export default ColorPaletteModal;
```

```js
// screens/Home.js

import { FlatList, StyleSheet, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import PalettePreview from '../components/PalettePreview';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchColorPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );

    if (result.ok) {
      const pallets = await result.json();
      setColorPalettes(pallets);
    }
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(item, index) => `${index}.${item.paletteName}`}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={() => handleRefresh()}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}
        >
          <Text>Launch Modal</Text>
        </TouchableOpacity>
      }
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
