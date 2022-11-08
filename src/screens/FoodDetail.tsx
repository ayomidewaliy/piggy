import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {Screens} from '@navigation/types';
import Layout from '@src/components/Layout';
import {CustomText} from '@src/components/CustomText';
import {
  back_arrow,
  colors,
  font,
  heart_icon,
  PADDING,
  star,
  time_icon,
} from '@src/commons';
import Button from '@src/components/Button';
import {useAppDispatch, useAppSelector} from '@src/hooks';
import {CartItem, setCartItems} from '@src/store/actions';
import {selectCartItems} from '@src/store/selectors';
import {saveItem} from '@src/utils';

const ITEMS = [
  {title: 'Small"', price: 9.99},
  {title: 'Medium"', price: 12.99},
  {title: 'Large"', price: 15.99},
];

type FoodDetailProps = NativeStackScreenProps<Screens, 'FoodDetail'>;

export const FoodDetail: React.FC<FoodDetailProps> = ({navigation, route}) => {
  const {idMeal, strMeal, strMealThumb} = route.params;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [selectedIndex, setSelectedIndex] = useState<{
    index: number | null;
    price: number;
    size: string;
  }>({
    index: null,
    price: 0,
    size: '',
  });
  const [quantity, setQuantity] = useState<number>(1);

  const goBack = () => navigation.goBack();

  const increaseQuantity = () => {
    if (selectedIndex.price !== 0) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity !== 1 && selectedIndex.price !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const items = [
      {
        id: idMeal,
        meal: strMeal,
        price: selectedIndex.price,
        quantity: quantity,
        size: selectedIndex.size,
        imgUri: strMealThumb,
      },
      ...cartItems,
    ];
    const filtered = items.reduce((unique, o) => {
      if (
        !unique.some((obj: CartItem) => obj.id === o.id && obj.size === o.size)
      ) {
        // @ts-ignore
        unique.push(o);
      }
      return unique;
    }, []);
    saveItem('cartItems', JSON.stringify(filtered));
    dispatch(setCartItems(filtered));
    goBack();
  };

  return (
    <Layout
      noStatusBar={true}
      noPadding={true}
      bgColor={colors.green}
      header={
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
            <SvgXml xml={back_arrow} color={colors.neutral.white} />
          </TouchableOpacity>
          <SvgXml
            xml={heart_icon}
            color={colors.neutral.white}
            style={styles.mLeftAuto}
          />
        </View>
      }>
      <View style={styles.container}>
        <View style={styles.imgWrap}>
          <Image source={{uri: strMealThumb}} style={styles.img} />
        </View>

        <ScrollView>
          <View style={styles.itemCenter}>
            <CustomText
              align="center"
              gut="24px 0 12px 0"
              size={font.size.h3}
              isBold>
              {strMeal}
            </CustomText>
            <CustomText
              size={font.size.pl}
              color={colors.neutral.inactive}
              isBold
              align="center"
              gut="0 0 8px 0">
              Pizza Italiano
            </CustomText>

            <View style={styles.rowCenter}>
              <SvgXml xml={time_icon} width={16} />
              <CustomText
                gut="0 8px 0 4px"
                size={font.size.pl}
                color={colors.neutral.bodytext}>
                20 min
              </CustomText>
              <SvgXml xml={star} />
              <CustomText size={font.size.pl} gut="0 2px 0 8px">
                4.8{' '}
              </CustomText>
              <CustomText size={font.size.pl} color={colors.neutral.inactive}>
                (2.2k review){' '}
              </CustomText>
            </View>
          </View>

          <View style={[styles.rowCenter, styles.sizeWrap]}>
            {ITEMS.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.sizeCard,
                  selectedIndex.index === index
                    ? styles.sizeCardActive
                    : undefined,
                ]}
                key={index}
                activeOpacity={0.7}
                //  @ts-ignore
                onPress={() =>
                  setSelectedIndex({index, price: item.price, size: item.title})
                }>
                <View
                  style={[
                    styles.circleBorder,
                    selectedIndex.index === index
                      ? styles.dotActive
                      : undefined,
                  ]}>
                  {selectedIndex.index === index && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <CustomText
                  color={colors.neutral.silver}
                  size={font.size.pxl}
                  align="center">
                  {item.title}
                </CustomText>
                <CustomText
                  gut="4px 0 0 0"
                  size={font.size.pxl}
                  align="center"
                  isMedium>
                  ${item.price}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.padH20}>
            <CustomText
              gut="20px 0 40px 0"
              align="center"
              color={colors.neutral.silver}
              size={font.size.pl}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CustomText>
          </View>

          <View style={[styles.rowCenter, styles.padH20]}>
            <CustomText size={font.size.pxl} isBold>
              Total: ${selectedIndex.price * quantity}
            </CustomText>
            <View style={[styles.mLeftAuto, styles.rowCenter]}>
              <TouchableOpacity
                style={styles.count}
                activeOpacity={0.4}
                onPress={decreaseQuantity}>
                <CustomText>—</CustomText>
              </TouchableOpacity>
              <CustomText gut="0 16px 0 16px" size={font.size.pxl} isBold>
                {quantity}
              </CustomText>
              <TouchableOpacity
                style={styles.count}
                activeOpacity={0.4}
                onPress={increaseQuantity}>
                <CustomText>+</CustomText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.padH20, styles.button]}>
            <Button title="Next" onPress={addToCart} bgColor={colors.green} />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: PADDING,
    backgroundColor: colors.green,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mLeftAuto: {marginLeft: 'auto'},
  container: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },
  imgWrap: {alignItems: 'center', marginTop: -60},
  img: {overflow: 'hidden', borderRadius: 50, height: 100, width: 100},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  itemCenter: {alignItems: 'center'},
  sizeCard: {
    borderWidth: 1,
    borderColor: colors.neutral.borders,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 140,
    marginRight: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  sizeWrap: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  dotActive: {backgroundColor: colors.green},
  sizeCardActive: {borderColor: colors.green},
  circleBorder: {
    borderRadius: 50,
    width: 20,
    height: 20,
    borderColor: colors.neutral.inactive,
    borderWidth: 1,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    borderRadius: 50,
    width: 8,
    height: 8,
    backgroundColor: colors.neutral.white,
  },
  padH20: {paddingHorizontal: 20},
  count: {
    borderWidth: 1,
    borderColor: colors.neutral.borders,
    borderRadius: 5,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {marginTop: 24, paddingBottom: 60},
});
