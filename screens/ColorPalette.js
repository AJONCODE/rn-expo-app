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
