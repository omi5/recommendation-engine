import { IIngredient } from "./ingredients.interface";
export interface IRecipe {
    restaurantId: number;
    recipeId: number;
    recipeName: string;
    recipeItemPortionSize: number;
    recipeItemPreparationTime: number;
    recipeItemCost: number;
    recipeItemCalories: number;
    ingredients: IIngredient[];
    _id: string;
  }