import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlaceData} from 'react-native-google-places-autocomplete';

import MarkerIcon from '../assets/marker.svg';

interface IRowPlaceSuggestionProps {
  data: GooglePlaceData;
}

const RowPlaceSuggestion: React.FC<IRowPlaceSuggestionProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <MarkerIcon width={20} height={20} />
      <View>
        <Text>{data.structured_formatting.main_text}</Text>
        <Text style={styles.subText}>
          {data.structured_formatting.secondary_text}
        </Text>
      </View>
    </View>
  );
};

export default RowPlaceSuggestion;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  subText: {
    opacity: 0.5,
  },
});
