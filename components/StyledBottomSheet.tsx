import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, Ref, useCallback, useMemo} from 'react';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Animated from 'react-native-reanimated';

interface StyledBottomSheetProps {
  animatedIndex: Animated.SharedValue<number>;
}

const StyledBottomSheet = forwardRef(
  (props: StyledBottomSheetProps, ref: Ref<BottomSheetMethods>) => {
    const {animatedIndex} = props;
    const snapPoints = useMemo(() => ['20%', '80%'], []);

    const handleSheetChanges = useCallback((index: number) => {}, []);

    return (
      <BottomSheet
        ref={ref}
        index={0}
        animatedIndex={animatedIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    );
  },
);

export default StyledBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
