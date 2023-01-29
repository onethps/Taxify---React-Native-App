import ArrowIcon from '@expo/vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CodeInputField from '../components/CodeInputField/CodeInputField';
import ResendTimer from '../components/ResendTimer';
import KeyboardAvoidingViewWrapper from '../components/shared/KeyboardAvoidingViewWrapper';
import {Colors} from '../constants/Colors';
import Layout, {statusBarHeight} from '../constants/Layout';
import {useKeyboardPosition} from '../hooks/useKeyboardPosition';
import ScreenWrapper from '../layout/ScreenWrapper';

const MAX_CODE_LENGTH = 5;

export type RequestStatusType = 'Resend' | 'Failed!' | 'Sent!';

const VerificationScreen = () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  //resend timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [activeResend, setActiveResend] = useState<boolean>(false);

  const {isOpenKeyboard} = useKeyboardPosition();

  const [resendingCode, setResendingCode] = useState(false);
  const [resendStatus, setResendStatus] = useState<RequestStatusType>('Resend');

  let resendTimerInterval: any;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const calculateTimeLeft = (finalTime: number) => {
    const diff = finalTime - +new Date();
    if (diff >= 0) {
      setTimeLeft(Math.round(diff / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };

  const sharedValue = useSharedValue(0);

  console.log(isOpenKeyboard);

  //verification button
  const [verifying, setVerifying] = useState(false);

  const submitOTPVerification = async () => {};

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      width: isOpenKeyboard
        ? withSpring(Layout.window.height)
        : withSpring(300),
      paddingBottom: isOpenKeyboard ? withSpring(0) : withSpring(50),
    };
  });

  useEffect(() => {
    triggerTimer();

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  return (
    <ScreenWrapper headerPadding>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowIcon name="arrowleft" size={25} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextTitle}>Welcome</Text>
          <Text style={styles.headerTextBody}>
            We send code on phone +7222222222
          </Text>
        </View>
        <CodeInputField
          code={code}
          setCode={setCode}
          setPinReady={setPinReady}
          maxCodeLength={MAX_CODE_LENGTH}
        />
        <ResendTimer
          activeResend={activeResend}
          resendingCode={resendingCode}
          resendStatus={resendStatus}
          timeLeft={timeLeft}
          targetTime={targetTime}
        />
        <Animated.View style={[styles.bottomHalf, rButtonStyle]}>
          <TouchableOpacity style={[styles.buttonSubmit]}>
            <Text style={styles.buttonSubmitText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: Colors.white,
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    marginTop: 60,
    alignSelf: 'flex-start',
  },
  headerTextTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 30,
  },
  headerTextBody: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 30,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonSubmit: {
    backgroundColor: '#f6635e',
    paddingVertical: 22,
    paddingHorizontal: 35,
    borderRadius: 20,
  },
  buttonSubmitText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
