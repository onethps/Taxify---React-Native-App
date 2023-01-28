import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import {RequestStatusType} from '../screens/VerificationScreen';

interface ResendTimerProps {
  activeResend: boolean;
  resendingCode: boolean;
  resendStatus: RequestStatusType;
  timeLeft: number | null;
  targetTime: number | null;
}

const ResendTimer: FC<ResendTimerProps> = ({
  activeResend,
  resendingCode,
  resendStatus,
  timeLeft,
  targetTime,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inlineGroup}>
        {activeResend ? (
          <TouchableOpacity style={styles.textLink}>
            <Text style={styles.textLinkContent}>Надіслати код</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.inlineGroup}>
            <Text>Надіслати код повторно </Text>
            <Text>{timeLeft || targetTime}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ResendTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLinkContent: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.greenLight,
  },
  inlineGroup: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
