import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchProducts, saveOrder } from '../api';
import Header from '../Header';
import { checkIsSelected } from '../helpers';
import ProductsList from '../ProductsList';
import { OrderLocationData, Product } from '../types';
import StepsHeader from '../StepsHeader'
import Toast from 'react-native-simple-toast';
import OrderLocation from '../OrderLocation';
import OrderSummary from '../OrderSummary';


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
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => {
        Toast.showWithGravity('Erro ao listar produtos', Toast.LONG, Toast.TOP);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

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
      Toast.showWithGravity(`Pedido enviado com sucesso! Nº ${response.data.id}`, Toast.LONG, Toast.BOTTOM);
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
        {isLoading ? (
          <View style={styles.waitingTextContainer}>
            <Text style={styles.waitingText}>Buscando pedidos...</Text>
          </View>
        ) : (
            <>
              <ProductsList
                products={products}
                onSelectProduct={handleSelectProduct}
                selectedProducts={selectedProducts} /><OrderLocation
                onChangeLocation={(location) => setOrderLocation(location)} />
              <OrderSummary
                amount={selectedProducts.length}
                totalPrice={totalPrice}
                onSubmit={handleSubmit} />
            </>
          )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  waitingTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400
  },
  waitingText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default Orders;
