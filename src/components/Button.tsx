import React from 'react';
import {TouchableOpacity, StyleProp, ViewStyle, StyleSheet} from 'react-native';

import {colors, font} from '../commons';
import {CustomText} from './CustomText';

interface ButtonProps {
  title: React.ReactNode;
  onPress: () => void;
  bHeight?: number;
  disabled?: boolean;
  borderRadius?: number;
  pFontSize?: number;
  fontColor?: string;
  bgColor?: string;
  fontBold?: boolean;
  alignText?: 'left' | 'right' | 'center';
  flexSize?: number;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  bWidth?: number | string;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    title,
    onPress,
    disabled,
    fontColor = colors.neutral.white,
    pFontSize = font.size.pl,
    fontBold = true,
    alignText,
    style,
  } = props;
  const styles = createStyles(props);

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.65}
      testID={props.testID}
      style={[styles.container, style]}>
      <CustomText
        color={fontColor}
        size={pFontSize}
        isBold={fontBold}
        align={alignText}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;

function createStyles({bHeight, bgColor, flexSize, bWidth}: ButtonProps) {
  let height: number | string = bHeight || 56;

  return StyleSheet.create({
    container: {
      backgroundColor: bgColor || colors.primary,
      flexDirection: 'row',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flex: flexSize || 0,
      width: bWidth,
      height,
    },
    mRight10: {marginRight: 10},
    icon: {marginRight: 9},
  });
}
