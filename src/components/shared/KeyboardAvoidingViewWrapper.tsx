import React, {FC, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {statusBarHeight} from '../../constants/Layout';

interface KeyboardAvoidingViewWrapperProps {
  children: ReactNode;
}

const KeyboardAvoidingViewWrapper: FC<KeyboardAvoidingViewWrapperProps> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView style={[{flex: 1, backgroundColor: 'grey'}]}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewWrapper;
