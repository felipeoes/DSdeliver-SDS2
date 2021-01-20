import React from 'react';
// import { formatPrice } from '../helpers';
import { Product } from '../types';
import { View, StyleSheet, Text, Image } from 'react-native';
import "intl";
import "intl/locale-data/jsonp/pt-BR.js";

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

function ProductCard( { product, onSelectProduct, isSelected, }: Props) {
    return (
        <>
        <View style={styles.container} >
            <Text style={styles.productName}>
                {product.name}
                </Text>
            <Image style={styles.image} 
            source={require('../assets/homeapp.png') } ></Image>
            <Text style={styles.productPrice}>
                {formatPrice(product.price)}
            </Text>
            <View>
                <Text style={styles.text}>Descrição</Text>
                <Text>
                   {product.description}
                </Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%',
        padding: 15,
        backgroundColor: '#FFF',
        shadowOpacity: 0.25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 20,
        borderRadius: 10,
        elevation: 5
      },
    image: {
        height: 200,
        width: 100,
        resizeMode: 'contain',
      },
    ordersListContainer: {
        flex: 1,
        justifyContent: 'center'
      },
    ordersListItems: {
        width: '90%',
        flex: 1,
        justifyContent: 'space-between'
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
      text: {
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#9E9E9E',
      },
      productName: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#263238',
      },
      productPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'right',
        letterSpacing: -0.24,
        color: '#DA5C5C',
      },
      productsList: {
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
        marginTop: 20,
        paddingTop: 15
      }
  });

export default ProductCard;