import {StyleSheet} from 'react-native';
import React, {forwardRef, Ref, useState} from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
  DescriptionRow,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import RowPlaceSuggestion from '../RowPlaceSuggestion';
import Colors from '../../constants/Colors';
import {LatLng} from 'react-native-maps';
import {API_GOOGLE_MAPS_KEY} from '@env';

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

    console.log(API_GOOGLE_MAPS_KEY);

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        query={initQuery}
        placeholder={placeholder}
        styles={isFocused ? focusedInputStyle : defaultInputStyle}
        fetchDetails={true}
        onPress={(data: any, details: any = null) => {
          if (details.geometry) {
            const newCoords = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            // console.log(newCoords);
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
    borderColor: Colors.greenLight,
    borderWidth: 2,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});
