import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {Screens} from '@navigation/types';
import Layout from '@src/components/Layout';
import {CustomText} from '@src/components/CustomText';
import {
  colors,
  filter,
  font,
  images,
  PADDING,
  search_icon,
  shopping_bag,
  time_icon,
} from '@src/commons';
import {ResultsLoader} from '@src/components/ResultsLoader';
import {getCategories, getFoodCategory} from '@src/api';
import Input from '@src/components/Input';
import {
  Category,
  CategoryResponse,
  FoodCategory,
  FoodCategoryResponse,
} from '@src/api/food/types';
import {SvgXml} from 'react-native-svg';
import {CardLoader} from '@src/components/CardLoader';
import {useAppSelector} from '@src/hooks';
import {selectCartItems} from '@src/store/selectors';
import {getItem} from '@src/utils';
import {CartItem} from '@src/store/actions';

type HomeProps = NativeStackScreenProps<Screens, 'Home'>;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const cartItems = useAppSelector(selectCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse['categories']>(
    [],
  );
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryResponse['categories']
  >([]);
  const [foodCategory, setFoodCategory] = useState<
    FoodCategoryResponse['meals']
  >([]);
  const [selectedCategory, setSelectedcategory] = useState('');
  const [selectedCategoryId, setSelectedcategoryId] = useState('');
  const [isFoodLoading, setIsFoodLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [carts, setCarts] = useState<CartItem[]>([]);

  const list = useMemo(
    () => (filteredCategories.length ? filteredCategories : categories),
    [filteredCategories, categories],
  );

  const fetchCategories = async () => {
    setIsLoading(true);
    const [, response] = await getCategories();
    setIsLoading(false);

    if (response) {
      setCategories(response.categories);
    }
  };

  const fetchFoodCategory = async () => {
    setIsFoodLoading(true);
    const [, response] = await getFoodCategory(selectedCategory);
    setIsFoodLoading(false);

    if (response) {
      setFoodCategory(response.meals);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearch(keyword);

    if (!keyword) {
      setFilteredCategories([]);
    } else {
      const filteredList = categories.filter(c =>
        c.strCategory?.toLowerCase().startsWith(keyword.toLowerCase()),
      );
      setFilteredCategories(filteredList);
    }
  };

  const handleSelection = (value: Category) => {
    setSelectedcategory(value.strCategory);
    setSelectedcategoryId(value.idCategory);
  };

  const handleNav = (value: FoodCategory) =>
    navigation.navigate('FoodDetail', value);

  const getCartItems = async () => {
    const result = await getItem('cartItems');
    if (result) {
      return setCarts(JSON.parse(result));
    }
    return [];
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFoodCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      setCarts(cartItems);
    } else {
      getCartItems();
    }
  }, [cartItems]);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <CustomText
            size={font.size.pxl}
            color={colors.neutral.inactive}
            isMedium>
            Hi Waliyu
          </CustomText>
          <CustomText gut="4px 0 0 0" size={font.size.h2} isBold>
            Hungry now? 🔥
          </CustomText>
        </View>

        <Image
          source={images.profile_image}
          style={[styles.profileImg, styles.mLeftAuto]}
        />
      </View>
    );
  };

  return (
    <Layout noPadding={true} header={renderHeader()}>
      {isLoading ? (
        <ResultsLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padH20}>
            <Input
              placeholder="Search..."
              value={search}
              onChangeText={handleSearch}
              prefix={<SvgXml xml={search_icon} width={20} />}
              suffix={<SvgXml xml={filter} />}
              mBottom={20}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {list.slice(0, 6).map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.mealCategoryWrap,
                    selectedCategoryId === item.idCategory
                      ? styles.active
                      : undefined,
                  ]}
                  key={index}
                  onPress={() => handleSelection(item)}>
                  <Image
                    source={{uri: item.strCategoryThumb}}
                    style={styles.profileImg}
                  />
                  <CustomText
                    size={font.size.pl}
                    color={
                      selectedCategoryId === item.idCategory
                        ? colors.neutral.white
                        : colors.neutral.bodytext
                    }
                    gut="8px 0 0 0"
                    align="center"
                    isBold>
                    {item.strCategory}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {foodCategory.length ? (
              <View style={[styles.row, styles.mVertical32]}>
                <CustomText
                  size={font.size.h3}
                  color={colors.neutral.bodytext}
                  isBold>
                  Popular Items
                </CustomText>
                <CustomText
                  size={font.size.pl}
                  color={colors.neutral.inactive}
                  style={styles.mLeftAuto}
                  isMedium>
                  See All
                </CustomText>
              </View>
            ) : null}
          </View>

          {isFoodLoading ? (
            <CardLoader />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {foodCategory.slice(0, 6).map((item, index) => (
                <TouchableOpacity
                  style={styles.foodCategoryWrap}
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => handleNav(item)}>
                  <View style={styles.itemCenter}>
                    <CustomText size={font.size.pxl} align="center" isBold>
                      {item.strMeal.substring(0, 20)}
                    </CustomText>
                    <CustomText gut="8px 0 24px 0" size={font.size.pxl} isBold>
                      $9.99
                    </CustomText>

                    <Image
                      source={{uri: item.strMealThumb}}
                      style={styles.foodCategoryImage}
                    />
                  </View>

                  <View style={styles.row}>
                    <View>
                      <CustomText
                        gut="24px 0 4px 0"
                        size={font.size.pl}
                        isMedium>
                        🔥 44 Calories
                      </CustomText>
                      <View style={styles.row}>
                        <SvgXml xml={time_icon} width={16} />
                        <CustomText
                          gut="0 0 0 6px"
                          size={font.size.ps}
                          color={colors.neutral.inactive}>
                          20 min
                        </CustomText>
                      </View>
                    </View>

                    <View style={styles.iconWrap}>
                      <SvgXml xml={shopping_bag} width={24} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      )}

      {carts.length ? (
        <View style={styles.padH20}>
          <View style={styles.cartCard}>
            <View>
              <CustomText
                size={font.size.h2}
                color={colors.neutral.white}
                isBold>
                Cart
              </CustomText>
              <CustomText
                size={font.size.pxl}
                color={colors.neutral.white}
                gut="4px 0 0 0">
                {carts.length} items
              </CustomText>
            </View>
            <View style={[styles.mLeftAuto, styles.row]}>
              {carts?.slice(0, 5).map((item, index) => (
                <Image
                  source={{uri: item.imgUri}}
                  key={index}
                  style={styles.cartImg}
                />
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    overflow: 'hidden',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  padH20: {paddingHorizontal: 20},
  mealCategoryWrap: {
    borderWidth: 1,
    borderColor: colors.neutral.borders,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 140,
    marginRight: 16,
    paddingHorizontal: 12,
  },
  active: {backgroundColor: colors.green},
  categoryImage: {},
  foodCategoryWrap: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: colors.neutral.bg,
    width: 250,
    height: 290,
    marginHorizontal: 16,
  },
  foodCategoryImage: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
  iconWrap: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 'auto',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  mLeftAuto: {marginLeft: 'auto'},
  mVertical32: {marginVertical: 32},
  itemCenter: {alignItems: 'center'},
  cartCard: {
    marginTop: 40,
    backgroundColor: colors.green,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  cartImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
  },
});
