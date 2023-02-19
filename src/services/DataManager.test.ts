import { Observable, skip, Subscription } from "rxjs";
import { IDLCInstance } from "../types/DLCInstance";
import { ALL_DLC_INSTANCES } from "../utils/constants";
import { dataManager } from "./DataManager";

describe('DataManager', () => {
    const skipReplay = <T>(observable: Observable<T>): Observable<T> => {
        return observable.pipe(skip(1));
    }

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

            dataManager.updateDLCInclusion(DLC1Id, true);
        });

        test('adds DLCId to existing included DLCIds', done => {
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCs => {
                try {
                    expect(DLCs.length).toEqual(2);
                    expect(DLCs).toEqual(expect.arrayContaining([DLC1Id, DLC2Id]));
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC2Id, true);
        });

        test('leaves other DLCIds after removing one of many', done => {
            dataManager.setIncludedDLCIds([DLC1Id, DLC2Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCs => {
                try {
                    expect(DLCs.length).toEqual(1);
                    expect(DLCs).toEqual([DLC2Id]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC1Id, false);
        });

        test('leaves empty array if removing only DLCId', done => {
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(DLCs => {
                try {
                    expect(DLCs).toEqual([]);
                    done();
                } catch (error) {
                    done(error);
                }
            });

            dataManager.updateDLCInclusion(DLC1Id, false);
        });

        test('does nothing with a non-existing DLCId and isSelected set to false', done => {
            let wasCalled = false;
            dataManager.setIncludedDLCIds([]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe(() => wasCalled = true);

            dataManager.updateDLCInclusion(DLC1Id, false);

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
            let wasCalled = false;
            dataManager.setIncludedDLCIds([DLC1Id]);

            includedDLCIdsSubscription = skipReplay(dataManager.includedDLCIds$).subscribe((ids) => {console.log('ids: ', ids); wasCalled = true});

            dataManager.updateDLCInclusion(DLC1Id, true);

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