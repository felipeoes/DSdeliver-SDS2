import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { fetchProducts, saveOrder } from '../api';
import Header from '../Header';
import { checkIsSelected } from '../helpers';
import ProductsList from '../ProductsList';
import {  OrderLocationData, Product } from '../types';
import StepsHeader from '../StepsHeader'
import Map from '../OrderLocation';
import Toast from 'react-native-simple-toast';


type Props = {
  products: Product[];
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

function Orders() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => {
        Toast.showWithGravity('Erro ao listar produtos', Toast.LONG, Toast.TOP);
      })
  }, []);
  
  const handleOnPress = () => {
    navigation.navigate('Orders');
  }

  

  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = checkIsSelected(selectedProducts, product);
  
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }
  }

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds
    }

    saveOrder(payload).then((response) => {
        Toast.show(`Pedido enviado com sucesso! Nº ${response.data.id}`);
        setSelectedProducts([]);
      })
        .catch(() => {
          Toast.showWithGravity('Erro ao enviar pedido', Toast.LONG, Toast.TOP);
        })
    }

  return (
    <>
      <Header />
      <StepsHeader />
      <ScrollView style={styles.container}
      keyboardShouldPersistTaps='always'>
      <ProductsList 
        products={products} 
        onSelectProduct={handleSelectProduct}
        selectedProducts={selectedProducts}
        />
        <Map 
        onChangeLocation={(location) => setOrderLocation(location)} 
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    // padding: '5%'
    paddingRight: '5%',
    paddingLeft: '5%',
  }
});

export default Orders;
