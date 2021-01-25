import React, { useState } from 'react';
import { Product } from '../types';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import "intl";
import "intl/locale-data/jsonp/pt-BR.js";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

type Props = {
  product: Product;
  amount: number;
  onSelectProduct: (product: Product) => void;
  isSelected: boolean;
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  return formatter.format(price);
}

function ProductCard({ product, onSelectProduct, isSelected, }: Props) {
  const [isDisabled, setDisabled] = useState(false);

  const handleOnPress = () => {
    onSelectProduct(product)

    if (isDisabled == true) {
      setDisabled(false)
    }
    else {
      setDisabled(true);
    }
  };

  let prodImage = { uri: product.imageUri };
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          isDisabled && styles.containerSelected
        ]}
        onPress={handleOnPress}
      >
        <View style={styles.ordersListItems}>
          <Text style={styles.productName}>
            {product.name}
          </Text>
          <Image style={styles.image}
            source={prodImage} ></Image>
          <Text style={styles.productPrice}>
            {formatPrice(product.price)}
          </Text>
          <View>
            <Text style={styles.textDescription} >Descrição</Text>
            <Text style={styles.text}>
              {product.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%',
    padding: 15,
    backgroundColor: '#FFF',
    shadowOpacity: 0.25,
    shadowColor: '#263238',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    marginTop: 15,
    width: 110,
    height: 90,
    resizeMode: 'stretch',
    marginBottom: 20,
  },
  ordersListItems: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
  },
  textDescription: {
    marginTop: 10,
    paddingBottom: 10
  },
  textAmount: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  textTotalAmount: {
    paddingTop: '5%',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#263238',
  },
  textSelected: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    // color: '#9E9E9E',
    marginBottom: '2%',
    color: '#008E5B'
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#9E9E9E',
    marginBottom: '2%',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.24,
    color: '#263238',
    textAlign: 'center',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#DA5C5C',
  },
  containerSelected: {
    borderStyle: 'solid',
    borderWidth: 1.5,
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    borderRadius: 10,
    borderColor: '#008E5B',
  }
});

export default ProductCard;