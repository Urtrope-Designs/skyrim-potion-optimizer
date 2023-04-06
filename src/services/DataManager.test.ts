import { Subscription, take } from "rxjs";
import { skipReplay, TEST_ALCHEMY_SESSIONS, TEST_RECIPES } from "../utils/TestUtils";
import { alchemySessionService } from "./AlchemySessionService";
import { dataManager } from "./DataManager";
import { recipeService } from "./RecipeService";
import { IIdSelectionUpdate } from "../types/IdSelectionUpdate";

jest.mock( './RecipeService' );

describe('DataManager', () => {
    describe('Selected Recipes', () => {
        afterAll(() => {
            dataManager.setSelectedRecipeIds([]);
        });
        
        let selectedRecipeIdsSubscription: Subscription;
        const testRecipeId = 0;

        afterEach(() => {
            if (selectedRecipeIdsSubscription) {
                selectedRecipeIdsSubscription.unsubscribe();
            }
        });
        
        describe('non-existing recipe', () => {
            beforeEach(() => {
                dataManager.setSelectedRecipeIds([]);
            });

            test('adds a non-existing recipe without the isSelected flag', done => {
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(recipeIds => {
                    try {
                        expect(recipeIds).toEqual(expect.arrayContaining([testRecipeId]));
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipeId);
            });
            test('adds a non-existing recipe with the isSelected flag', done => {
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual(expect.arrayContaining([testRecipeId]));
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipeId, true);
            });
            test('does nothing with a non-existing recipe and isSelected set to false', done => {
                let wasCalled = false;
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(() => wasCalled = true);

                dataManager.updateRecipeSelection(testRecipeId, false);

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
                dataManager.setSelectedRecipeIds([testRecipeId]);
            });
            
            test('removes an existing recipe without the isSelected flag', done => {
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual([]);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipeId);
            });
            test('removes an existing recipe with the isSelected flag', done => {
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(recipes => {
                    try {
                        expect(recipes).toEqual([]);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });

                dataManager.updateRecipeSelection(testRecipeId, false);
            });
            test('does nothing with an existing recipe and isSelected set to true', done => {
                let wasCalled = false;
                selectedRecipeIdsSubscription = skipReplay(dataManager.selectedRecipeIds$).subscribe(() => wasCalled = true);

                dataManager.updateRecipeSelection(testRecipeId, true);

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

    describe('Included DLCIds', () => {
        afterAll(() => {
            dataManager.setIncludedDLCIds([]);
        });

        let includedDLCIdsSubscription: Subscription;

        afterEach(() => {
            if (includedDLCIdsSubscription) {
                includedDLCIdsSubscription.unsubscribe();
            }
        });

        const DLC1Id: number = 0;
        const DLC2Id: number = 1;

        test('adds DLCId with no existing included DLCIds', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC1Id, isSelected: true}];
            dataManager.setIncludedDLCIds([]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCIds => {
                try {
                    expect(DLCIds.length).toEqual(1);
                    expect(DLCIds).toEqual([DLC1Id]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(updateData);
        });

        test('adds DLCId to existing included DLCIds', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC2Id, isSelected: true}];
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCIds => {
                try {
                    expect(DLCIds.length).toEqual(2);
                    expect(DLCIds).toEqual(expect.arrayContaining([DLC1Id, DLC2Id]));
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(updateData);
        });

        test('leaves other DLCIds after removing one of many', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC1Id, isSelected: false}];
            dataManager.setIncludedDLCIds([DLC1Id, DLC2Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCIds => {
                try {
                    expect(DLCIds.length).toEqual(1);
                    expect(DLCIds).toEqual([DLC2Id]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(updateData);
        });

        test('leaves empty array if removing only DLCId', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC1Id, isSelected: false}];
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCIds => {
                try {
                    expect(DLCIds).toEqual([]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(updateData);
        });

        test('updates multiple DLCIds with same selection value', done => {
            const updateData: IIdSelectionUpdate[] = [
                {id: DLC1Id, isSelected: true},
                {id: DLC2Id, isSelected: true},
            ]
            dataManager.setIncludedDLCIds([]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCIds => {
                try {
                    expect(DLCIds).toEqual([]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(updateData);
        });

        test('updates multiple DLCIds with different selection values', done => {

        });

        test('does nothing with a non-existing DLCId and isSelected set to false', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC1Id, isSelected: false}];
            let wasCalled = false;
            dataManager.setIncludedDLCIds([]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(() => wasCalled = true);

            dataManager.updateDLCInclusion(updateData);

            setTimeout(() => {
                try {
                    expect(wasCalled).toBe(false);
                    done();
                } catch (error) {
                    done(error);
                }
            }, (100));
        });

        test('does nothing with an existing DLCId and isSelected set to true', done => {
            const updateData: IIdSelectionUpdate[] = [{id: DLC1Id, isSelected: true}];
            let wasCalled = false;
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe((ids) => {console.log('ids: ', ids); wasCalled = true});

            dataManager.updateDLCInclusion(updateData);

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

    describe('Selected AlchemySession', () => {
        const filterCurrentlyAvailableRecipesMock = jest.spyOn(recipeService, 'filterCurrentlyAvailableRecipes');
        afterAll(() => {
            dataManager.setSelectedAlchemySessionId(-1);
            filterCurrentlyAvailableRecipesMock.mockRestore();
        });

        beforeEach(() => {
            dataManager.setSelectedAlchemySessionId(-1);
        })
        
        let selectedAlchemySessionIdSubscription: Subscription;
        const testAlchemySessionId = 0;

        afterEach(() => {
            if (selectedAlchemySessionIdSubscription) {
                selectedAlchemySessionIdSubscription.unsubscribe();
            }
        });

        test('sets the selected alchemy session id', done => {
            filterCurrentlyAvailableRecipesMock.mockImplementation(() => Promise.resolve([]));
            selectedAlchemySessionIdSubscription = skipReplay(dataManager.selectedAlchemySessionId$).subscribe(id => {
                try {
                    expect(id).toEqual(testAlchemySessionId);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateAlchemySessionSelection(testAlchemySessionId);
        });

        test('updates selected recipes', done => {
            const expectedRecipeIds = TEST_RECIPES.map(r => r.id);
            filterCurrentlyAvailableRecipesMock.mockImplementation(() => Promise.resolve(TEST_RECIPES));
            const alchemySessionGetByIdMock = jest.spyOn(alchemySessionService, 'getById');
            alchemySessionGetByIdMock.mockImplementation(() => TEST_ALCHEMY_SESSIONS[testAlchemySessionId]);
            dataManager.setSelectedRecipeIds([]);
            skipReplay(dataManager.selectedRecipeIds$).pipe(take(1)).subscribe(ids => {
                try {
                    expect(ids).toEqual(expectedRecipeIds);
                    done();
                } catch (error) {
                    done(error);
                } finally {
                    alchemySessionGetByIdMock.mockRestore();
                }
            });

            dataManager.updateAlchemySessionSelection(testAlchemySessionId);
        });
    });
});