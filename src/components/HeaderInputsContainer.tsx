import React, {FC, RefObject, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import {LatLng} from 'react-native-maps';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import CloseIcon from '../assets/close.svg';
import PlusIcon from '../assets/plus.svg';
import Layout from '../constants/Layout';
import InputAutoComplete from './shared/InputAutoComplete';

export const HEADER_HEIGHT = 200;

interface HeaderModalProps {
  bottomSheetAnimatedIndex: Animated.SharedValue<number>;
  handleCollapseBottomSheet: () => void;
  setOrigin: (v: LatLng | null) => void;
  setDestination: (v: LatLng | null) => void;
}

const HeaderInputsContainer: FC<HeaderModalProps> = ({
  bottomSheetAnimatedIndex,
  handleCollapseBottomSheet,
  setOrigin,
  setDestination,
}) => {
  const originInputRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationInputRef = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    originInputRef.current?.setAddressText('My location');
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    return {
      top: -HEADER_HEIGHT,
      transform: [
        {
          translateY:
            (HEADER_HEIGHT / 100) * (bottomSheetAnimatedIndex.value * 100),
        },
      ],
    };
  });

  const onPressInputHandler = (ref: RefObject<GooglePlacesAutocompleteRef>) => {
    if (!ref?.current?.getAddressText()) {
      ref?.current?.focus();
      return;
    }
    handleCollapseBottomSheet();
  };

  return (
    <Animated.View style={[headerStyle, styles.headerContainer]}>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={handleCollapseBottomSheet}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ваш маршрут</Text>
        <PlusIcon />
      </View>

      <View style={styles.inputsContainer}>
        <View style={{height: 38}}>
          <InputAutoComplete
            ref={originInputRef}
            onPressInputHandler={() => onPressInputHandler(destinationInputRef)}
            setCoords={setOrigin}
            placeholder="Место подачи"
          />
        </View>
        <View style={{height: 38}}>
          <InputAutoComplete
            autofocus
            ref={destinationInputRef}
            onPressInputHandler={() => onPressInputHandler(originInputRef)}
            setCoords={setDestination}
            placeholder="Пункт Назначения"
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderInputsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsContainer: {
    marginTop: 20,
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 5,
    height: HEADER_HEIGHT,
    width: Layout.window.width,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
});
