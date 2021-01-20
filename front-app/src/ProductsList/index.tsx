import React, {Component} from 'react';
import { checkIsSelected } from "../helpers";
import { Product } from "../types";
import ProductCard from "../ProductCard";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { FlatList, SafeAreaView} from "react-native";
import { render } from 'react-dom';
import { fetchProducts } from '../api';

let {width} = Dimensions.get('window')

let numberGrid = 2
let itemWidth = width / numberGrid

type Props = {
    products: Product[];
    selectedProducts: Product[];
    onSelectProduct: (product: Product) => void;
}

function ProductsList ( { products, onSelectProduct, selectedProducts }: Props) {
    const columns = 2;
    return (
        <>
      <SafeAreaView>
        <FlatList
          data={createRows(products, columns)}
          keyExtractor={item => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[styles.item, styles.itemEmpty]} />;
            }
            return (
                <View style={styles.item}>
                    <ProductCard 
                    key={item.id} 
                    product={item} 
                    onSelectProduct={onSelectProduct}
                    isSelected={checkIsSelected(selectedProducts, item)}
                    amount = {item.amount}
                    />
              </View>
            );
          }}
        />
      </SafeAreaView>
      </>
    );
  }

function createRows(data, columns) {
  const rows = Math.floor((data.length / 2) / columns);
  let lastRowElements = (data.length / 2) - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1;
  }

  return data;
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
  item: {
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

export default ProductsList;