/**
 * Modal
 * Dependencies:
 * - @gorhom/bottom-sheet.
 *
 * Props:
 * - All `BottomSheetModalProps` props.
 * - `title` (string | undefined): Optional title for the modal header.
 * - `containerStyle` (StyleProp<ViewStyle>): Custom styles for the modal container.
 * - `handleStyle` (StyleProp<ViewStyle>): Custom styles for the handle component.
 * - `headerStyle` (StyleProp<ViewStyle>): Custom styles for the header container.
 * - `titleStyle` (StyleProp<TextStyle>): Custom styles for the title text.
 * - `closeButtonStyle` (StyleProp<ViewStyle>): Custom styles for the close button.
 * - `closeIconColor` (string): Color for the close icon.
 *
 * Usage Example:
 * import { Modal, useModal } from './modal';
 *
 * function DisplayModal() {
 *   const { ref, present, dismiss } = useModal();
 *
 *   return (
 *     <View>
 *       <Modal
 *         snapPoints={['60%']} // optional
 *         title="Modal Title"
 *         ref={ref}
 *         containerStyle={{ backgroundColor: '#FFFFFF' }}
 *         titleStyle={{ color: '#333333', fontSize: 18 }}
 *       >
 *         Modal Content
 *       </Modal>
 *     </View>
 *   );
 * }
 *
 */

import type {
  BottomSheetBackdropProps,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModal, useBottomSheet } from '@gorhom/bottom-sheet';
import * as React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

type ModalProps = BottomSheetModalProps & {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  closeIconColor?: string;
  isShowCloseBtn?: boolean;
};

type ModalRef = React.ForwardedRef<BottomSheetModal>;

type ModalHeaderProps = {
  title?: string;
  dismiss: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  closeIconColor?: string;
  isShowCloseBtn?: boolean;
};

export const useModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);
  const present = React.useCallback((data?: any) => {
    ref.current?.present(data);
  }, []);
  const dismiss = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);
  return { dismiss, present, ref };
};

export const Modal = React.forwardRef(
  (
    {
      snapPoints: _snapPoints = ['60%'],
      title,
      detached = false,
      containerStyle,
      handleStyle,
      headerStyle,
      titleStyle,
      closeButtonStyle,
      closeIconColor,
      isShowCloseBtn,
      ...props
    }: ModalProps,
    ref: ModalRef,
  ) => {
    const detachedProps = React.useMemo(
      () => getDetachedProps(detached),
      [detached],
    );
    const modal = useModal();
    const snapPoints = React.useMemo(() => _snapPoints, [_snapPoints]);

    React.useImperativeHandle(
      ref,
      () => (modal.ref.current as BottomSheetModal) || null,
    );

    const renderHandleComponent = React.useCallback(
      () => (
        <>
          <View style={[styles.handle, handleStyle]} />
          <ModalHeader
            title={title}
            dismiss={modal.dismiss}
            headerStyle={headerStyle}
            titleStyle={titleStyle}
            closeButtonStyle={closeButtonStyle}
            closeIconColor={closeIconColor}
            isShowCloseBtn={isShowCloseBtn}
          />
        </>
      ),
      [
        title,
        modal.dismiss,
        handleStyle,
        headerStyle,
        titleStyle,
        closeButtonStyle,
        closeIconColor,
        isShowCloseBtn,
      ],
    );

    const modalStyle = React.useMemo(() => {
      return [detached && styles.detachedContainer, containerStyle];
    }, [detached, containerStyle]);

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        ref={modal.ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={props.backdropComponent || renderBackdrop}
        enableDynamicSizing={false}
        handleComponent={renderHandleComponent}
        style={modalStyle}
      />
    );
  },
);

/**
 * Custom Backdrop
 */

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const { close } = useBottomSheet();
  return (
    <AnimatedPressable
      onPress={() => close()}
      entering={FadeIn.duration(50)}
      exiting={FadeOut.duration(20)}
      style={[style, styles.backdrop]}
    />
  );
};

export const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <CustomBackdrop {...props} />
);

/**
 *
 * @param detached
 * @returns
 *
 * @description
 * In case the modal is detached, we need to add some extra props to the modal to make it look like a detached modal.
 */

const getDetachedProps = (detached: boolean) => {
  if (detached) {
    return {
      bottomInset: 46,
      detached: true,
    } as Partial<BottomSheetModalProps>;
  }
  return {} as Partial<BottomSheetModalProps>;
};

/**
 * ModalHeader
 */

const ModalHeader = React.memo(
  ({
    title,
    dismiss,
    headerStyle,
    titleStyle,
    closeButtonStyle,
    closeIconColor,
    isShowCloseBtn = true,
  }: ModalHeaderProps) => {
    return (
      <>
        {title && (
          <View style={[styles.headerContainer, headerStyle]}>
            <View style={styles.placeholderIcon} />
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, titleStyle]}>{title}</Text>
            </View>
          </View>
        )}
        {isShowCloseBtn && (
          <CloseButton
            close={dismiss}
            style={closeButtonStyle}
            iconColor={closeIconColor}
          />
        )}
      </>
    );
  },
);

const CloseButton = ({
  close,
  style,
  iconColor = '#000000',
}: {
  close: () => void;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
}) => {
  return (
    <Pressable
      onPress={close}
      style={[styles.closeButton, style]}
      hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
      accessibilityLabel="close modal"
      accessibilityRole="button"
      accessibilityHint="closes the modal">
      <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <Path
          d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293Z"
          fill={iconColor}
        />
      </Svg>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  closeButton: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 24,
  },
  detachedContainer: {
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#9ca3af',
    borderRadius: 8,
    height: 4,
    marginBottom: 32,
    marginTop: 8,
    width: 48,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  placeholderIcon: {
    height: 24,
    width: 24,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: '#26313D',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
