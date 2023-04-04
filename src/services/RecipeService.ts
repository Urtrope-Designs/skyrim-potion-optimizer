import { combineLatest, firstValueFrom, map } from "rxjs";
import { IAvailabilityOptionsSelection } from "../types/AvailabilityOptionsSelection";
import { IIngredient } from "../types/Ingredient";
import { IRecipe } from "../types/Recipe";
import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";
import { ALL_INGREDIENTS } from "../utils/constants";
import { dataManager } from "./DataManager";
import { ingredientsService } from "./IngredientsService";

export const recipeService = {
    filterCurrentlyAvailableRecipes: async (allRecipes: IRecipe[]): Promise<IRecipe[]> => {
        const source$ = combineLatest([dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$]).pipe(
            map(([includedDLCIds, ingredientAvailabilityOptions]) => {
                const availableRecipes = recipeService.getAvailableRecipes(allRecipes, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
                return availableRecipes;
            })
        );

        return firstValueFrom(source$);
    },
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
    getAvailableRecipes: (allRecipes: IRecipe[], allIngredients: IIngredient[], includedDLCIds: number[], ingredientAvailabilityOptions: IAvailabilityOptionsSelection): IRecipe[] => {
        const availableRecipes: IRecipe[] = allRecipes.reduce((allRecs: IRecipe[], curRec: IRecipe) => {
            const newRecHolder: IRecipe[] = isRecipeAvailable(curRec) ? [curRec] : [];
            return [...allRecs, ...newRecHolder];
        }, [] as IRecipe[]);

        return availableRecipes;

        function isRecipeAvailable(curRecipe: IRecipe): boolean {
            const recipeIngredients = ingredientsService.getByIds(curRecipe.ingredientIds, allIngredients);
            const areAllDLCsSelected = recipeIngredients.every(ingredient => ingredient.dLCId === null || includedDLCIds.includes(ingredient.dLCId));
            const areAllAvailabilityOptionsSatisfied: boolean = testAvailabilityOptions(curRecipe);
            return areAllDLCsSelected && areAllAvailabilityOptionsSatisfied;
        }

        function testAvailabilityOptions(curRecipe: IRecipe): boolean {
            const recipeIngredients = ingredientsService.getByIds(curRecipe.ingredientIds, allIngredients);
            return ingredientAvailabilityOptions.noMerchants || recipeIngredients.every(ingredient => ingredient.merchantAvailabilityId > 0 && ingredient.merchantAvailabilityId <= 3);
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
    getRecipeSummaryViewmodels: (availableRecipes: IRecipe[], allIngredients: IIngredient[]): IRecipeSummaryViewmodel[] => {
        const viewmodel: IRecipeSummaryViewmodel[] = availableRecipes.map((curRecipe: IRecipe) => {
            const newRecipeVM: IRecipeSummaryViewmodel = {
                ingredients: ingredientsService.getViewmodels(ingredientsService.getByIds(curRecipe.ingredientIds, allIngredients)),
                recipeId: curRecipe.id,
                recipeName: curRecipe.standardEffects[0],
                standardEffectsList: curRecipe.standardEffects.join(', '),
            };
    
            return newRecipeVM;
        });
    
        return viewmodel;
    }
}