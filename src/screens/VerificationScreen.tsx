import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import KeyboardAvoidingViewWrapper from '../components/shared/KeyboardAvoidingViewWrapper';
import CodeInputField from '../components/CodeInputField/CodeInputField';
import ResendTimer from '../components/ResendTimer';

const MAX_CODE_LENGTH = 5;

export type RequestStatusType = 'Resend' | 'Failed!' | 'Sent!';

const VerificationScreen = () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  //resend timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [activeResend, setActiveResend] = useState<boolean>(false);

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

  //verification button
  const [verifying, setVerifying] = useState(false);

  const submitOTPVerification = async () => {};

  useEffect(() => {
    triggerTimer();

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
