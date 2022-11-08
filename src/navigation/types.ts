import {FoodCategory} from '@src/api/food/types';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  FoodDetail: FoodCategory;
};

export type Screens = RootStackParamList;
