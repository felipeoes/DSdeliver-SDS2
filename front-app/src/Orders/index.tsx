import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { fetchProducts } from '../api';
import Header from '../Header';
import { checkIsSelected } from '../helpers';
import ProductCard from '../ProductCard';
import ProductsList from '../ProductsList';
import { Product } from '../types';
import StepsHeader from '../StepsHeader'
import { toast } from 'react-toastify';
import Map from '../Map';

type Props = {
  products: Product[];
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

function Orders() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => {
        toast.warning('Erro ao listar produtos');
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

  return (
    <>
      <Header />
      <StepsHeader />
      <ScrollView style={styles.container}>
      <ProductsList 
        products={products} 
        onSelectProduct={handleSelectProduct}
        selectedProducts={selectedProducts}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    paddingRight: '5%',
    paddingLeft: '5%',
  }
});

export default Orders;
