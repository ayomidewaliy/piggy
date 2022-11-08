import {request} from '../network';
import {ErrorResponse} from '../types';
import {CategoryResponse, FoodCategoryResponse} from './types';

export const getCategories = async (): Promise<
  [ErrorResponse | null, CategoryResponse | null]
> => {
  return request.get<CategoryResponse>('/categories.php');
};

export const getFoodCategory = async (
  category: string,
): Promise<[ErrorResponse | null, FoodCategoryResponse | null]> => {
  return request.get<FoodCategoryResponse>(`/filter.php?c=${category}`);
};
