import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../features/store';
import { ProfileProps } from '../../../navigation/types';
import IpInfoBoard from '../../../components/dashboard/IpInfoBoard';

const Profile: React.FC<ProfileProps> = () => {
  const { carouselImage, ipInfo } = useAppSelector(
    state => ({
      ipInfo: state.ip.ipInfo,
      carouselImage: state.ip.carouselImage,
    }),
    shallowEqual,
  );

  if (!carouselImage && !ipInfo) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    );
  }

  if (!carouselImage || !ipInfo) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3453D0" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: carouselImage.image }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <IpInfoBoard ipInfoData={ipInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingText: {
    color: '#555',
    marginTop: 10,
    fontSize: 14,
  },
});

export default Profile;
