import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

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
      style={[
        styles.codeInput,
        styledFocusedInput ? styles.codeInputFocused : styles.codeInput,
      ]}>
      <Text style={styles.codeInputText}>{digit}</Text>
    </View>
  );
};

export default CodeInputCell;

const styles = StyleSheet.create({
  codeInput: {
    minWidth: '15%',
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 5,
    padding: 12,
  },
  codeInputFocused: {
    borderColor: 'red',
  },
  codeInputText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
});
