import { IIngredientViewmodel } from "../types/IngredientViewmodel";
import { TEST_INGREDIENTS } from "../utils/TestUtils";
import { ingredientsService } from "./IngredientsService";

describe('ingredientsService', () => {
    describe('#getByIds', () => {
        test('returns an ingredient with a valid id', () => {
            const testId = 0;
            const expectedIngredients = [TEST_INGREDIENTS[testId]];

            const result = ingredientsService.getByIds([testId], TEST_INGREDIENTS);

            expect(result).toEqual(expectedIngredients);
        });

        test('throws error if ingredientId is not found in allIngredients', () => {
            const testId = TEST_INGREDIENTS.length;

            expect(() => ingredientsService.getByIds([testId], TEST_INGREDIENTS)).toThrow();
        });
    });

    describe('#getViewmodels', () => {
        test('builds ingredient viewmodels', () => {
            const testIngredients = TEST_INGREDIENTS.slice(0,2);
            const expectedVM: IIngredientViewmodel[] = [
                {
                    ingredientId: testIngredients[0].id,
                    ingredientName: testIngredients[0].name,
                    sourceDescription: testIngredients[0].sourceDescription,
                },
                {
                    ingredientId: testIngredients[1].id,
                    ingredientName: testIngredients[1].name,
                    sourceDescription: testIngredients[1].sourceDescription,
                },
            ]
            const result = ingredientsService.getViewmodels(testIngredients);
    
            expect(result).toEqual(expectedVM);
        });
    });
});