import {useHeaderHeight} from '@react-navigation/elements';
import {LinearGradient} from 'expo-linear-gradient';
import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Colors} from '../constants/Colors';
import {statusBarHeight} from '../constants/Layout';

interface AppLayoutProps {
  children: ReactNode;
  headerPadding?: boolean;
}

const ScreenWrapper: FC<AppLayoutProps> = ({
  children,
  headerPadding = false,
}) => {
  return (
    <LinearGradient
      colors={[Colors.lightGrey, Colors.semiGreen]}
      style={{flex: 1, paddingTop: headerPadding ? statusBarHeight : 0}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
