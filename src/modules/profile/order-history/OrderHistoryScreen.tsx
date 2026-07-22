import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { CustomHeader, OrderCard, OrderTabs, Text } from '../../../components';
import { useTheme } from '../../../hooks';
import { Colors } from '../../../theme';
import styleSheet from './OrderHistoryStyles';
import { useOrderHistory } from './useOrderHistory';

const TABS = [
  { id: 'all', title: 'All' },
  { id: 'active', title: 'Active' },
  { id: 'delivered', title: 'Delivered' },
  { id: 'cancelled', title: 'Cancelled' }
];

/**
 * OrderHistoryScreen Component
 * Displays user's previous order history organized by status tabs.
 * Manages header via CustomHeader inside the screen.
 *
 * @returns {React.ReactElement} The OrderHistoryScreen component.
 */
const OrderHistoryScreen: React.FC = () => {
  const { styles, theme } = useTheme(styleSheet);
  const {
    orders,
    loading,
    refreshing,
    loadingMore,
    selectedTab,
    setSelectedTab,
    loadInitial,
    loadMore,
    refresh,
    reorder
  } = useOrderHistory();

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader title="My Orders" showGradientBG />
        }}
      />
      <OrderTabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
      {loading && orders.length === 0 ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={Colors[theme]?.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard onReorder={() => reorder(item)} order={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            { paddingTop: 12 },
            orders.length === 0 && styles.emptyList
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={Colors[theme]?.primary}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={Colors[theme]?.primary} style={styles.footer} />
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <LottieView
                source={require('../../../assets/lotties/emptyOrder.json')}
                style={styles.emptyIcon}
                autoPlay
                loop
              />

              <Text variant="titleMedium" style={styles.emptyTitle}>
                No Orders Found
              </Text>

              <Text variant="bodySmall" style={styles.emptySubtitle}>
                {selectedTab === 'all'
                  ? "You haven't placed any orders yet."
                  : `No ${selectedTab} orders available.`}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

OrderHistoryScreen.displayName = 'OrderHistoryScreen';

export default OrderHistoryScreen;
