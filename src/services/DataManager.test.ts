import { Observable, skip, Subscription } from "rxjs";
import { IDLCInstance } from "../types/DLCInstance";
import { IRecipe } from "../types/Recipe";
import { DLC_MAPPINGS } from "../utils/constants";
import { dataManager } from "./DataManager";

describe('DataManager', () => {
    const skipReplay = <T>(observable: Observable<T>): Observable<T> => {
        return observable.pipe(skip(1));
    }

    describe('Selected Recipes', () => {
        afterAll(() => {
            dataManager.setSelectedRecipes([]);
        });
        
        const testRecipe: IRecipe = {id: 0, ingredients: ['ingredient1', 'ingredient2'], standardEffects: []};
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
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual(expect.arrayContaining([testRecipe]));
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipe);
            });
            test('adds a non-existing recipe with the isSelected flag', done => {
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual(expect.arrayContaining([testRecipe]));
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipe, true);
            });
            test('does nothing with a non-existing recipe and isSelected set to false', done => {
                let wasCalled = false;
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(() => wasCalled = true);

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
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual([]);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipe);
            });
            test('removes an existing recipe with the isSelected flag', done => {
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual([]);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipe, false);
            });
            test('does nothing with an existing recipe and isSelected set to true', done => {
                let wasCalled = false;
                selectedRecipesSubsciption = skipReplay(dataManager.selectedRecipes$).subscribe(() => wasCalled = true);

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

    describe('Included DLCs', () => {
        afterAll(() => {
            dataManager.setIncludedDLCs([]);
        });

        let includedDLCsSubscription: Subscription;

        afterEach(() => {
            if (includedDLCsSubscription) {
                includedDLCsSubscription.unsubscribe();
            }
        });

        const DLC1: IDLCInstance = DLC_MAPPINGS[0];
        const DLC2: IDLCInstance = DLC_MAPPINGS[1];

        test('adds DLC with no existing included DLCs', done => {
            dataManager.setIncludedDLCs([]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(DLCs => {
                try {
                    expect(DLCs.length).toEqual(1);
                    expect(DLCs).toEqual([DLC1]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC1, true);
        });

        test('adds DLC to existing included DLCs', done => {
            dataManager.setIncludedDLCs([DLC1]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(DLCs => {
                try {
                    expect(DLCs.length).toEqual(2);
                    expect(DLCs).toEqual(expect.arrayContaining([DLC1, DLC2]));
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC2, true);
        });

        test('leaves other DLCs after removing one of many', done => {
            dataManager.setIncludedDLCs([DLC1, DLC2]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(DLCs => {
                try {
                    expect(DLCs.length).toEqual(1);
                    expect(DLCs).toEqual([DLC2]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC1, false);
        });

        test('leaves empty array if removing only DLC', done => {
            dataManager.setIncludedDLCs([DLC1]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(DLCs => {
                try {
                    expect(DLCs).toEqual([]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC1, false);
        });

        test('does nothing with a non-existing DLC and isSelected set to false', done => {
            let wasCalled = false;
            dataManager.setIncludedDLCs([]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(() => wasCalled = true);

            dataManager.updateDLCInclusion(DLC1, false);

            setTimeout(() => {
                try {
                    expect(wasCalled).toBe(false);
                    done();
                } catch (error) {
                    done(error);
                }
            }, (100));
        });

        test('does nothing with an existing DLC and isSelected set to true', done => {
            let wasCalled = false;
            dataManager.setIncludedDLCs([DLC1]);

            includedDLCsSubscription = skipReplay(dataManager.includedDLCs$).subscribe(() => wasCalled = true);

            dataManager.updateDLCInclusion(DLC1, true);

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