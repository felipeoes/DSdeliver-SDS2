import React from 'react';
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
  
    let prodImage ={ uri: product.imageUri};

    return (
        <>
        <View style={styles.container} >
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
        shadowColor: '#263238',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 20,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
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
  });

export default ProductCard;