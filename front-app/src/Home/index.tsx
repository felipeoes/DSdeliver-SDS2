import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Header from '../Header';

function Home() {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Orders');
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Image style={styles.image}
        source={require('../assets/homeapp.png') } 
        >
        </Image>
        <Text style={styles.title}>
          Peça sua refeição e {'\n'} receba no prazo indicado
      </Text>
        <Text style={styles.subTitle}>São milhares de restaurantes {'\n'}
      empenhados para entregar o melhor pra você
      </Text>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleOnPress}>
          <Text style={styles.buttonText}>
            FAÇA SEU PEDIDO
            </Text>
        </RectButton>
      </View> 

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center'
  },
  title: {
    color: '#263238',
    fontSize: 26,
    lineHeight: 35,
    fontWeight: 'bold',
    marginTop: 31,
    textAlign: 'center'
  },
  subTitle: {
    color: '#9E9E9E',
    fontSize: 16,
    marginTop: 15,
    lineHeight: 22,
    textAlign: 'center'
  },
  image: {
    height: 310,
    width: 310,
    // aspectRatio: 2, 
    resizeMode: 'contain',
  },
  footer: {
    marginTop: '5%',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24
  }
});

export default Home;
