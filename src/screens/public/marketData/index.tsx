import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MarketDataProps } from '../../../navigation/types';
import useMarketDataSubscription from '../../../subscriptions/useMarketDataSubscription';

const MarketData: React.FC<MarketDataProps> = () => {
  const { marketData } = useMarketDataSubscription();

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.price}>${parseFloat(item.p).toFixed(2)}</Text>
      <Text style={styles.qty}>Qty: {item.q}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Live BTC/USDT Market</Text>
      <FlatList
        data={marketData}
        keyExtractor={item => item.a.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No trade data available.</Text>
        }
        style={{ marginTop: 10 }}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

export default MarketData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  header: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#1e293b',
    borderBottomWidth: 1,
  },
  price: {
    color: '#22c55e',
    fontWeight: '500',
    fontSize: 14,
  },
  qty: {
    color: '#94a3b8',
    fontSize: 13,
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
  },
});
