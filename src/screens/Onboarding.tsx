import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SvgUri} from 'react-native-svg';

import {Screens} from '@navigation/types';
import Layout from '@src/components/Layout';
import {CustomText} from '@src/components/CustomText';
import {colors, font} from '@src/commons';
import Button from '@src/components/Button';
import {isAndroid, isSmallScreen, screenWidth} from '@src/utils';

type OnboardingProps = NativeStackScreenProps<Screens, 'Onboarding'>;

const ITEMS = [
  {
    title: 'Build your savings with ease & \ndiscipline',
    imgUri: 'https://miro.medium.com/max/1400/0*eqNajfCMACkQzZfv',
  },
  {
    title: 'Invest with ease in verified \nopportunities',
    imgUri:
      'https://storage.googleapis.com/piggybankservice.appspot.com/statics/piggyvest-story_v1.png',
  },
  {
    title: "Lock fund you don't want to \nbe tempted to touch",
    imgUri: 'https://piggycalcr.herokuapp.com/static/images/home.png',
  },
  {
    title: "Lock fund you don't want to \nbe tempted to touch",
    imgUri:
      'https://storage.googleapis.com/piggybankservice.appspot.com/statics/New-homepage-3.png',
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onPanResponderGrant: (_evt, _gestureState) => setIsTouched(true),
  //     onPanResponderMove: (_evt, _gestureState) => setIsTouched(true),
  //     onPanResponderRelease: (_evt, _gestureState) => setIsTouched(false),
  //   }),
  // ).current;

  const handleScroll = (event: NativeSyntheticEvent<any>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(selectedIndex);
  };

  const goToNextPage = () => {
    const currentIndex = selectedIndex + 1;
    scrollRef?.current?.scrollTo({
      x: currentIndex * screenWidth,
      animated: true,
    });
    setSelectedIndex(currentIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextPage, 2000);
    if (selectedIndex > 2) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleNav = () => navigation.navigate('Home');

  return (
    <Layout bgColor={colors.neutral.dark} noPadding={true}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        {ITEMS.map((item, index) => (
          <View
            style={styles.container}
            key={index}
            // {...panResponder.panHandlers}
          >
            <View style={styles.itemCenter}>
              <SvgUri
                uri="https://dashboard.piggyvest.com/static/media/piggyvest-logo.0b78a8fa.svg"
                width={150}
              />

              <Image source={{uri: item.imgUri}} style={styles.illustration} />
            </View>

            <View style={styles.bottomView}>
              <View style={styles.textWrap} key={index}>
                <CustomText
                  color={colors.neutral.white}
                  size={font.size.h2}
                  gut="0 0 16px 0"
                  align="center">
                  {item.title}
                </CustomText>

                <View style={styles.row}>
                  {ITEMS.map((_item, indx) => (
                    <View
                      style={[
                        styles.indicator,
                        selectedIndex === indx
                          ? styles.active
                          : styles.inactive,
                      ]}
                      key={indx}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.row}>
                <Button title="LOGIN" onPress={handleNav} bWidth={'48%'} />
                <Button
                  title="REGISTER"
                  onPress={handleNav}
                  bWidth={'48%'}
                  bHeight={54}
                  bgColor="transparent"
                  style={styles.registerButton}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: isSmallScreen || isAndroid ? 0 : 60,
    paddingHorizontal: 20,
    width: screenWidth,
  },
  topView: {},
  bottomView: {flex: 1, justifyContent: 'flex-end'},
  row: {flexDirection: 'row'},
  textWrap: {alignItems: 'center', marginBottom: 80},
  itemCenter: {alignItems: 'center'},
  illustration: {
    marginTop: 60,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 8,
  },
  registerButton: {
    marginLeft: 16,
    borderWidth: 1,
    borderColor: colors.neutral.white,
  },
  indicator: {
    borderRadius: 8,
    height: 4,
    width: 20,
    marginRight: 8,
    backgroundColor: colors.neutral.inactive,
    opacity: 0.9,
  },
  active: {backgroundColor: colors.neutral.white},
  inactive: {backgroundColor: colors.neutral.inactive, opacity: 0.3},
});
