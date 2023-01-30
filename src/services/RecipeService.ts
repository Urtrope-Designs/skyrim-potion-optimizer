import { IIngredient } from "../types/Ingredient";
import { IRecipe } from "../types/Recipe";
import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";
import { ingredientsService } from "./IngredientsService";

export const recipeService = {
    getAllIngredientIdsFromRecipes: (requestedRecipes: IRecipe[]): number[] =>{
        return requestedRecipes.reduce((allIngredientIds: number[], curRecipe: IRecipe) => {
            curRecipe.ingredientIds.forEach(ingId => {
                const addIngredient = !allIngredientIds.includes(ingId);
                if (addIngredient) {
                    allIngredientIds.push(ingId);
                } 
            });

            return allIngredientIds;
          }, [] as number[]);
    },
    getAvailableRecipes: (allRecipes: IRecipe[], allIngredients: IIngredient[], includedDLCIds: number[]): IRecipe[] => {
        const availableRecipes: IRecipe[] = allRecipes.reduce((allRecs: IRecipe[], curRec: IRecipe) => {
            const newRecHolder: IRecipe[] = isRecipeAvailable(curRec) ? [curRec] : [];
            return [...allRecs, ...newRecHolder];
        }, [] as IRecipe[]);

        return availableRecipes;

        function isRecipeAvailable(curRecipe: IRecipe): boolean {
            const recipeIngredients: IIngredient[] = ingredientsService.getIngredientsById(curRecipe.ingredientIds, allIngredients);
            return recipeIngredients.every(ingredient => ingredient.dLCId === null || includedDLCIds.includes(ingredient.dLCId));
        }
    },
    getRecipesById: (requestedRecipeIds: number[], allRecipes: IRecipe[]): IRecipe[] => {
        return requestedRecipeIds.map(recId => {
            const recipe = allRecipes.find(recipe => recipe.id === recId);
            if (recipe === undefined) {
                throw new Error('Invalid recipeId provided: ' + recId);
            }

            return recipe;
        });
    },
    getRecipeSummaryViewmodels: (availableRecipes: IRecipe[], allIngredients: IIngredient[], selectedRecipeIds: number[]): IRecipeSummaryViewmodel[] => {
        const viewmodel: IRecipeSummaryViewmodel[] = availableRecipes.map((curRecipe: IRecipe) => {
            const newRecipeVM: IRecipeSummaryViewmodel = {
                ingredientsList: buildIngredientsListString(ingredientsService.getIngredientsById(curRecipe.ingredientIds, allIngredients)),
                isSelected: selectedRecipeIds.includes(curRecipe.id),
                recipeId: curRecipe.id,
                standardEffectsList: curRecipe.standardEffects.join(', '),
            };
    
            return newRecipeVM;
        });
    
        return viewmodel;
    
        function buildIngredientsListString(ingredients: IIngredient[]): string {
            return ingredients.map(ingredient => ingredient.name).join(', ');
        }
    }
}