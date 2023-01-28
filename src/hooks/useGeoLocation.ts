import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {Region} from 'react-native-maps';
import Layout from '../constants/Layout';

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Region>();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const generateLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setLocation(generateLocation);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return {location};
};
