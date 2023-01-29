import {API_GOOGLE_MAPS_KEY} from '@env';
import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useSharedValue} from 'react-native-reanimated';

import HeaderInputsContainer from '../components/HeaderInputsContainer';
import StyledBottomSheet from '../components/StyledBottomSheet';
import {useGeoLocation} from '../hooks/useGeoLocation';

const EDGE_PADDING_VALUE = 70;

const MapScreen = () => {
  const mapViewRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetAnimatedIndex = useSharedValue(0);

  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();

  const {location} = useGeoLocation();

  const handleCollapseBottomSheet = () => bottomSheetRef.current?.collapse();

  const triggerMapDirections = () => {
    const edgePadding = {
      top: EDGE_PADDING_VALUE,
      right: EDGE_PADDING_VALUE,
      bottom: EDGE_PADDING_VALUE,
      left: EDGE_PADDING_VALUE,
    };

    if (origin && destination) {
      mapViewRef.current?.fitToCoordinates([origin, destination], {
        edgePadding,
      });
    }
  };

  useEffect(() => {
    setOrigin(location);
  }, [location]);

  useEffect(() => {
    triggerMapDirections();
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={location}
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        showsUserLocation
        showsMyLocationButton>
        {origin && destination ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={API_GOOGLE_MAPS_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
        ) : null}
      </MapView>
      <HeaderInputsContainer
        bottomSheetAnimatedIndex={bottomSheetAnimatedIndex}
        handleCollapseBottomSheet={handleCollapseBottomSheet}
        setOrigin={setOrigin}
        setDestination={setDestination}
      />
      <StyledBottomSheet
        animatedIndex={bottomSheetAnimatedIndex}
        ref={bottomSheetRef}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    top: 120,
    width: '100%',
    color: 'red',
    borderColor: '#888',
    borderWidth: 1,
    zIndex: 100,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
