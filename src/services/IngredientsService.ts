import { IIngredient } from "../types/Ingredient";
import { IIngredientViewmodel } from "../types/IngredientViewmodel";

export const ingredientsService = {
    getIngredientsById: (ingredientIds: number[], ingredients: IIngredient[]): IIngredient[] => {
        return ingredientIds.map(id => {
            const ingredient = ingredients.find(ingredient => ingredient.id === id);
            if (ingredient === undefined) {
                throw new Error('Invalid ingredientId provided: ' + id);
            }

            return ingredient;
        });
    },
    getIngredientViewmodels: (requestedIngredients: IIngredient[]): IIngredientViewmodel[] => {
        const viewmodels = requestedIngredients.map(i => {
            const vm: IIngredientViewmodel = {
                ingredientId: i.id,
                ingredientName: i.name,
                sourceDescription: i.sourceDescription,
            };

            return vm;
        });

        return viewmodels;
    }
}
