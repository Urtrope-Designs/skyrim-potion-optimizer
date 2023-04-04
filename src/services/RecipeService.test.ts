import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";
import { TEST_INGREDIENTS, TEST_RECIPES } from "../utils/TestUtils";
import { recipeService } from "./RecipeService";

describe('RecipeService', () => {
    describe('#getAllIngredientIdsFromRecipes', () => {
        test('pulls correct ingredientIds from 1 provided recipe', () => {
            const testRecipe = TEST_RECIPES[0];
            const expectedIngredientIds = TEST_RECIPES[0].ingredientIds;

            const result = recipeService.getAllIngredientIdsFromRecipes([testRecipe]);

            expect(result).toEqual(expectedIngredientIds);
        });

        test('pulls deduped ingredientIds from multiple recipes', () => {
            const testRecipes = TEST_RECIPES;
            const expectedIngredientIds = [0,1,2,3];

            const result = recipeService.getAllIngredientIdsFromRecipes(testRecipes);

            expect(result.length).toBe(expectedIngredientIds.length);
            expect(result).toEqual(expect.arrayContaining(expectedIngredientIds));
        });
    });

    describe('#getAvailableRecipes', () => {
        test('returns valid recipes with no DLCs selected', () => {
            const expectedRecipes = [TEST_RECIPES[0]];
            const result = recipeService.getAvailableRecipes(TEST_RECIPES, TEST_INGREDIENTS, [], {noMerchants: true});

            expect(result).toEqual(expectedRecipes);
        });

        test('returns valid recipes with one DLC selected', () => {
            const expectedRecipes = TEST_RECIPES.slice(0,2);
            const result = recipeService.getAvailableRecipes(TEST_RECIPES, TEST_INGREDIENTS, [0], {noMerchants: true});

            expect(result).toEqual(expectedRecipes);
        });

        test('returns valid recipes with non-merchant ingredients excluded', () => {
            const expectedRecipes = [TEST_RECIPES[1]];
            const result = recipeService.getAvailableRecipes(TEST_RECIPES, TEST_INGREDIENTS, [0,1], {noMerchants: false});

            expect(result).toEqual(expectedRecipes);
        });
    });

    describe('#getRecipesById', () => {
        test('returns a recipe with a valid id', () => {
            const testId = 0;
            const expectedRecipes = [TEST_RECIPES[testId]];

            const result = recipeService.getRecipesById([testId], TEST_RECIPES);

            expect(result).toEqual(expectedRecipes);
        });

        test('throws error if ingredientId is not found in allRecipes', () => {
            const testId = TEST_RECIPES.length;
            expect(() => recipeService.getRecipesById([testId], TEST_RECIPES)).toThrow();
        });
    });

    // describe('#getRecipeSummaryViewmodels', () => {
    //     test('builds recipe summary viewmodel', () => {
    //         const expectedVM: IRecipeSummaryViewmodel[] = [
    //             {
    //                 ingredientsList: 'ing1\u2003\u2014\u2003ing2',
    //                 isSelected: true,
    //                 recipeId: 0,
    //                 standardEffectsList: 'eff1, eff2',
    //             },
    //             {
    //                 ingredientsList: 'ing2\u2003\u2014\u2003ing3',
    //                 isSelected: false,
    //                 recipeId: 1,
    //                 standardEffectsList: 'eff3, eff4',
    //             },
    //         ]
    //         const result = recipeService.getRecipeSummaryViewmodels(TEST_RECIPES.slice(0,2), TEST_INGREDIENTS, [0]);
    
    //         expect(result).toEqual(expectedVM);
    //     });
    // });
});