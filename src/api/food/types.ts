export interface Category {
  idCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
  strCategory: string;
}

export interface FoodCategory {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface FoodCategoryResponse {
  meals: FoodCategory[];
}
