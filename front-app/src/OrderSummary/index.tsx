import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { formatPrice } from "../helpers";

type Props = {
  amount: number;
  totalPrice: number;
  onSubmit: () => void;
}

function OrderSummary({ totalPrice, onSubmit, amount }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.orderSummaryContent}>
        <View>
          <Text style={styles.amountSelectedContainer} >
            <Text style={styles.amountSelected}>{amount} </Text>
            ITENS SELECIONADOS
          </Text>
          <Text style={styles.orderSummaryTotal}>
            <Text style={{
              fontWeight: 'normal',
              fontSize: 12,
              lineHeight: 15,
              letterSpacing: -0.015
            }}>VALOR TOTAL DE</Text>
            <Text style={styles.amountSelected}>
              <Text style={styles.amountTotal}> {formatPrice(totalPrice)}</Text>
            </Text>
          </Text>
        </View>
        <RectButton
          style={styles.orderSummaryMakeOrder}
          onPress={onSubmit}
        >
          <Text style={styles.orderMakeOrderText}>FAZER PEDIDO </Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2%',
    marginRight: '2%',
  },
  orderSummaryContent: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    // boxShadow: 0 4 20 rgba(0, 0, 0, 0.25);
    backgroundColor: '#da5c5c',
    color: '#FFF',
    padding: 15,
    flexDirection: 'row',
    borderRadius: 10,
  },
  amountSelectedContainer: {
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: -0.015,
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: -5,
    color: '#FFF',
  },
  amountTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 15,
    letterSpacing: -0.015,
    paddingLeft: 10
  },

  amountSelected: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 15,
    letterSpacing: -0.015,
  },
  orderSummaryTotal: {
    color: '#FFF',
    marginLeft: -5,
  },
  orderSummaryMakeOrder: {
    width: '40%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  orderMakeOrderText: {
    fontSize: 14,
    letterSpacing: -0.015,
    color: '#da5c5c',
    fontWeight: 'bold',
    lineHeight: 25,
  }
});

export default OrderSummary;
