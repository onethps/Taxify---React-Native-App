import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: statusBarHeight + 30,
    backgroundColor: 'yellow',
  },
});
