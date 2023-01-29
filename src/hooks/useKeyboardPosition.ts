import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboardPosition = () => {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setIsOpenKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIsOpenKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    isOpenKeyboard,
  };
};
