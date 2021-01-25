import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function StepsHeader() {
  return (
    <View style={styles.ordersStepsContainer} >
      <View style={styles.ordersStepsContent}>
        <Text style={styles.stepsTitle} >
          SIGA AS ETAPAS
                </Text>
        <Text style={styles.stepsItems}>
          <Text style={styles.stepsItemStepsNumber}>1</Text> Selecione os produtos e a localização.
                      <Text style={styles.stepsItemStepsNumber}>{'\n'}2</Text> Depois clique em <Text style={styles.textOrder}>ENVIAR PEDIDO</Text>
        </Text>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  ordersStepsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginBottom: '1%',
  },
  ordersStepsContent: {
    paddingTop: '1%',
    paddingRight: 0,
  },
  stepsTitle: {
    paddingTop: '2%',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.015,
    color: '#da5c5c',
    marginLeft: '20%',

  },
  stepsItems: {
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.015,
    color: '#9e9e9e',
    marginLeft: '2%'
  },
  stepsItemStepsNumber: {
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 33,
    letterSpacing: -0.015,
    color: '#da5c5c',
    marginRight: 10
  },
  textOrder: {
    fontWeight: 'bold'
  }
});

export default StepsHeader;