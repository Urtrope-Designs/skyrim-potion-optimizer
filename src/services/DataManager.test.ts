import { skip, Subscription } from "rxjs";
import { IRecipe } from "../types/Recipe";
import { dataManager } from "./DataManager";

describe('DataManager', () => {
    afterAll(() => {
        dataManager.setSelectedRecipes([]);
    });
    
    const testRecipe: IRecipe = {ingredients: ['ingredient1', 'ingredient2'], standardEffects: []};
    let selectedRecipesSubsciption: Subscription;

    afterEach(() => {
        if (selectedRecipesSubsciption) {
            selectedRecipesSubsciption.unsubscribe();
        }
    });
    
    describe('non-existing recipe', () => {
        beforeEach(() => {
            dataManager.setSelectedRecipes([]);
        });

        test('adds a non-existing recipe without the isSelected flag', done => {
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(recipes => {
                expect(recipes).toEqual(expect.arrayContaining([testRecipe]));
                done();
            });

            dataManager.updateRecipeSelection(testRecipe);
        });
        test('adds a non-existing recipe with the isSelected flag', done => {
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(recipes => {
                expect(recipes).toEqual(expect.arrayContaining([testRecipe]));
                done();
            });

            dataManager.updateRecipeSelection(testRecipe, true);
        });
        test('does nothing with a non-existing recipe and isSelected set to false', done => {
            let wasCalled = false;
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(() => wasCalled = true);

            dataManager.updateRecipeSelection(testRecipe, false);

            setTimeout(() => {
                try {
                    expect(wasCalled).toBe(false);
                    done();
                } catch (error) {
                    done(error);
                }
            }, 100);
        });
    });

    describe('existing recipe', () => {
        beforeEach(() => {
            dataManager.setSelectedRecipes([testRecipe]);
        });
        
        test('removes an existing recipe without the isSelected flag', done => {
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(recipes => {
                expect(recipes).toEqual([]);
                done();
            });

            dataManager.updateRecipeSelection(testRecipe);
        });
        test('removes an existing recipe with the isSelected flag', done => {
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(recipes => {
                expect(recipes).toEqual([]);
                done();
            });

            dataManager.updateRecipeSelection(testRecipe, false);
        });
        test('does nothing with an existing recipe and isSelected set to true', done => {
            let wasCalled = false;
            selectedRecipesSubsciption = dataManager.selectedRecipes$.pipe(skip(1)).subscribe(() => wasCalled = true);

            dataManager.updateRecipeSelection(testRecipe, true);

            setTimeout(() => {
                try {
                    expect(wasCalled).toBe(false);
                    done();
                } catch (error) {
                    done(error);
                }
            }, 100);
        });
    });
});