import {API_GOOGLE_MAPS_KEY} from '@env';
import * as Location from 'expo-location';
import {LocationObject} from 'expo-location';
import React, {Ref, forwardRef, useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  DescriptionRow,
  GooglePlaceData,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {LatLng} from 'react-native-maps';

import {Colors} from '../../constants/Colors';
import RowPlaceSuggestion from '../RowPlaceSuggestion';

const initQuery = {
  key: API_GOOGLE_MAPS_KEY,
  language: 'ua',
};

interface IInputPlacesHandlers {
  placeholder: string;
  setCoords: (v: LatLng | null) => void;
  onPressInputHandler: () => void;
  autofocus?: boolean;
}

const InputAutoComplete = forwardRef(
  (props: IInputPlacesHandlers, ref: Ref<GooglePlacesAutocompleteRef>) => {
    const {
      onPressInputHandler,
      placeholder,
      setCoords,
      autofocus = false,
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const [status, requestPermission] = Location.useBackgroundPermissions();

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        query={initQuery}
        listViewDisplayed="auto"
        placeholder={placeholder}
        styles={isFocused ? focusedInputStyle : defaultInputStyle}
        fetchDetails={true}
        onPress={(data: any, details: any = null) => {
          if (details.geometry) {
            const newCoords = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setCoords(newCoords);
          }

          onPressInputHandler();
        }}
        onFail={error => console.error(error)}
        renderRow={(data: GooglePlaceData) => (
          <RowPlaceSuggestion data={data} />
        )}
        renderDescription={(description: DescriptionRow) =>
          description.structured_formatting.main_text
        }
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        textInputProps={{
          autoFocus: autofocus,
          returnKeyType: 'search',
          onChangeText: () => setCoords(null),
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />
    );
  },
);

export default InputAutoComplete;

export const defaultInputStyle = StyleSheet.create({
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: Colors.primary,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});

export const focusedInputStyle = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputContainer: {
    width: '100%',
  },
  listView: {
    top: 100,
    position: 'absolute',
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: 'white',
    borderColor: Colors.lightGreen,
    borderWidth: 2,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});
