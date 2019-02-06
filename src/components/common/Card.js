import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    // props.children refers all child elements that existed inside the call to
    // <Card><Text>Foo</Text></Card> (<Text>Foo</Text> in this case)
    // in other words, the parent (AlbumDetail) will define props.children just
    // as it does with props
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 1
  }
};

export { Card };
