import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboardState = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardEvent>();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', event => {
      setIsKeyboardOpen(true);
      setKeyboardInfo(event);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', event => {
      setIsKeyboardOpen(false);
      setKeyboardInfo(event);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return {
    isKeyboardOpen,
    keyboardInfo,
  };
};

export default useKeyboardState;
