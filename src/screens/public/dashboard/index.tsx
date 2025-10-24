import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shallowEqual } from 'react-redux';
import IpInfoBoard from '../../../components/dashboard/IpInfoBoard';
import PrimaryInput from '../../../components/PrimaryInput';
import { useGetIpInfoMutation } from '../../../features/ip/ipApiSlice';
import { setCarouselImage, setIpInfo } from '../../../features/ip/ipSlice';
import { CarouselImage } from '../../../features/ip/types';
import { store, useAppSelector } from '../../../features/store';
import { useTheme } from '../../../hooks/useTheme';
import { DashboardProps } from '../../../navigation/types';

const { width } = Dimensions.get('window');

const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    id: '0',
    image:
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&q=60&w=3000',
  },
  {
    id: '1',
    image:
      'https://i.pinimg.com/236x/94/3b/37/943b3731d7471be0fc3f6af944ed0f74.jpg',
  },
  {
    id: '2',
    image:
      'https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg',
  },
];

const Dashboard = ({ navigation }: DashboardProps) => {
  const { fonts } = useTheme();
  const [ip, setIp] = useState('');
  const [ipInfo, ipInfoProps] = useGetIpInfoMutation();

  const { carouselImage } = useAppSelector(
    (state) => ({ carouselImage: state.ip.carouselImage }),
    shallowEqual
  );

  const progress = useSharedValue(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleGetIpInfo = useCallback(async () => {
    try {
      const res = await ipInfo({ ip }).unwrap();
 store.dispatch(setIpInfo(res));
if (!ip.length) {
  setIp(res.ip)
}
    } catch (error) {
      console.warn('Failed to fetch IP info:', error);
    }
  }, [ip, ipInfo]);

  useEffect(() => {
    handleGetIpInfo();
  }, []);

  const handlePaginationPress = useCallback(
    (index: number) => {
      carouselRef.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    },
    [progress]
  );

  const handleImagePress = useCallback(
    (item: CarouselImage) => {
      store.dispatch(setCarouselImage(item));
      navigation.navigate('Profile');
    },
    [navigation]
  );

  const renderCarouselItem = useCallback(
    ({ item }: { item: CarouselImage }) => {
      const isSelected = carouselImage?.id === item.id;

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleImagePress(item)}
          style={[
            styles.carouselItem,
            isSelected && styles.carouselItemSelected,
          ]}
        >
          <FastImage
            style={styles.carouselImage}
            source={{ uri: item.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      );
    },
    [carouselImage, handleImagePress]
  );

  const renderPagination = () => (
    <Pagination.Basic
      progress={progress}
      data={CAROUSEL_IMAGES}
      dotStyle={styles.dotStyle}
      containerStyle={styles.paginationContainer}
      onPress={handlePaginationPress}
    />
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, fonts.bold]}>IP Tracker</Text>

        <PrimaryInput
          containerStyle={styles.inputContainer}
          placeholder="Search for any IP address"
          value={ip}
          onChangeText={setIp}
          onSubmitEditing={handleGetIpInfo}
          renderRightItem={() => (
            <TouchableOpacity
              onPress={handleGetIpInfo}
              disabled={ipInfoProps.isLoading}
              style={styles.searchButton}
            >
              {ipInfoProps.isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="enter-outline" size={24} color="white" />
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* IP INFO CARD */}
      <IpInfoBoard ipInfoData={store.getState().ip.ipInfo} />

      {/* CAROUSEL SECTION */}
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={width / 2}
          data={CAROUSEL_IMAGES}
          onProgressChange={progress}
          renderItem={renderCarouselItem}
        />
        {renderPagination()}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: 200,
    backgroundColor: '#3453D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    width: '80%',
    marginTop: 25,
  },
  searchButton: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselItemSelected: {
    borderColor: 'red',
    borderWidth: 4,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
  },
  paginationContainer: {
    gap: 5,
    marginTop: 10,
  },
});
