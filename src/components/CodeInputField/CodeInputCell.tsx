import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../constants/Colors';

interface CodeInputCellProps {
  code: string;
  index: number;
  maxCodeLength: number;
  inputContainerFocused: boolean;
}

const CodeInputCell: FC<CodeInputCellProps> = ({
  code,
  index,
  maxCodeLength,
  inputContainerFocused,
}) => {
  const emptyInputChar = ' ';
  const digit = code[index] || emptyInputChar;

  //formating
  const isCurrentDigit = index === code.length;
  const isLastDigit = index === maxCodeLength - 1;
  const isFullCode = code.length === maxCodeLength;

  const isDigitFocused = isCurrentDigit || (isLastDigit && isFullCode);

  const styledFocusedInput = isDigitFocused && inputContainerFocused;

  return (
    <View
      style={[styles.codeInput, styledFocusedInput && styles.codeInputFocused]}>
      <Text style={styles.codeInputText}>{digit}</Text>
    </View>
  );
};

export default CodeInputCell;

const styles = StyleSheet.create({
  codeInput: {
    width: 55,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 20,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputFocused: {
    opacity: 1,
  },
  codeInputText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
});
