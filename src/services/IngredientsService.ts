import { IIngredient } from "../types/Ingredient";
import { IIngredientViewmodel } from "../types/IngredientViewmodel";

export const ingredientsService = {
    getByIds: (ids: number[], availableIngredients: IIngredient[]): IIngredient[] => {
        return ids.map(id => {
            const ingredient = availableIngredients.find(ingredient => ingredient.id === id);
            if (ingredient === undefined) {
                throw new Error('Invalid ingredientId provided: ' + id);
            }

            return ingredient;
        });
    },
    getViewmodels: (requestedIngredients: IIngredient[]): IIngredientViewmodel[] => {
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
