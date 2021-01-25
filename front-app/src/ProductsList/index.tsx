import React from 'react';
import { checkIsSelected } from "../helpers";
import { Product } from "../types";
import ProductCard from "../ProductCard";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { FlatList } from "react-native";

type Props = {
  products: Product[];
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

function ProductsList({ products, onSelectProduct, selectedProducts }: Props) {
  const columns = 2;
  return (
    <>
      <FlatList
        style={styles.listItems}
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
                amount={item.amount}
              />
            </View>
          );
        }}
      />
    </>
  );
}

function createRows(data: any, columns: number) {
  const rows = Math.floor(data.length / columns);
  let lastRowElements = data.length - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1;
  }

  return data;
}

const styles = StyleSheet.create({
  listItems: {
    marginBottom: '2%',
  },
  item: {
    flexGrow: 1,
    flexBasis: 0,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto'

  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

export default ProductsList;