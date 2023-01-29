import React, {ComponentType, FC, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInputProps, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import CodeInputCell from './CodeInputCell';

interface CodeInputFieldProps {
  code: string;
  setCode: (v: string) => void;
  setPinReady: (v: boolean) => void;
  maxCodeLength: number;
}

const CodeInputField: FC<CodeInputFieldProps> = ({
  code,
  setCode,
  setPinReady,
  maxCodeLength,
}) => {
  const codeDigitsArray = new Array(maxCodeLength).fill(0);

  const inputRef = useRef<any>(null);
  const [inputContainerFocused, setInputContainerFocused] = useState(false);

  const handleOnPress = () => {
    setInputContainerFocused(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    setPinReady(code.length === maxCodeLength);
    return () => {
      setPinReady(false);
    };
  }, [code]);

  const handleOnBlur = () => setInputContainerFocused(false);

  useEffect(() => {
    handleOnPress();
  }, []);

  return (
    <View style={styles.codeInputSection}>
      <Pressable style={styles.codeInputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map((_, index) => {
          return (
            <CodeInputCell
              key={index.toString()}
              code={code}
              index={index}
              maxCodeLength={maxCodeLength}
              inputContainerFocused={inputContainerFocused}
            />
          );
        })}
      </Pressable>
      <TextInput
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        ref={inputRef}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={maxCodeLength}
        style={styles.hiddenTextInput}
      />
    </View>
  );
};

export default CodeInputField;

const styles = StyleSheet.create({
  codeInputSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  codeInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  hiddenTextInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
