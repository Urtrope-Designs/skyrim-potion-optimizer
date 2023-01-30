import { TEST_INGREDIENTS } from "../utils/TestUtils";
import { ingredientsService } from "./IngredientsService";

describe('ingredientsService', () => {
    describe('#getIngredientsByIds', () => {
        test('returns an ingredient with a valid id', () => {
            const testId = 0;
            const expectedIngredients = [TEST_INGREDIENTS[testId]];

            const result = ingredientsService.getIngredientsById([testId], TEST_INGREDIENTS);

            expect(result).toEqual(expectedIngredients);
        });

        test('throws error if ingredientId is not found in allIngredients', () => {
            const testId = TEST_INGREDIENTS.length;

            expect(() => ingredientsService.getIngredientsById([testId], TEST_INGREDIENTS)).toThrow();
        });
    });

    describe('#getIngredientViewmodels', () => {
        test.todo('test this function');
    });
});