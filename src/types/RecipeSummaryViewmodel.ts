import { IIngredientViewmodel } from "./IngredientViewmodel";

export interface IRecipeSummaryViewmodel {
    ingredients: IIngredientViewmodel[];
    recipeId: number;
    recipeName: string;
    standardEffectsList: string;
}