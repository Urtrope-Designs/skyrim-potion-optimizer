import { filter, Observable, ReplaySubject, take } from 'rxjs';
import { IAvailabilityOptionsSelection } from '../types/AvailabilityOptionsSelection';
import { ALL_ALCHEMY_SESSIONS, ALL_RECIPES } from '../utils/constants';
import { alchemySessionService } from './AlchemySessionService';
import { recipeService } from './RecipeService';

const _includedDLCIds$: ReplaySubject<number[]> = new ReplaySubject<number[]>(1);
const _ingredientAvailabilityOptions$: ReplaySubject<IAvailabilityOptionsSelection> = new ReplaySubject<IAvailabilityOptionsSelection>(1);
const _selectedAlchemySessionId$: ReplaySubject<number> = new ReplaySubject<number>(1);
const _selectedRecipeIds$: ReplaySubject<number[]> = new ReplaySubject<number[]>(1);

export const dataManager = {
    includedDLCIds$: _includedDLCIds$.asObservable(),
    ingredientAvailabilityOptions$: _ingredientAvailabilityOptions$.asObservable(),
    selectedAlchemySessionId$: _selectedAlchemySessionId$.asObservable(),
    selectedRecipeIds$: _selectedRecipeIds$.asObservable(),
    setIncludedDLCIds: (newDLCs: number[]) => _includedDLCIds$.next(newDLCs),
    setIngredientAvailabilityOptions: (newSelection: IAvailabilityOptionsSelection) => _ingredientAvailabilityOptions$.next(newSelection),
    setSelectedAlchemySessionId: (newId: number) => _selectedAlchemySessionId$.next(newId),
    setSelectedRecipeIds: (newRecipeIds: number[]) => _selectedRecipeIds$.next(newRecipeIds),
    updateDLCInclusion: (dLCIdToUpdate: number, isSelected: boolean) => {
        getCurrentValueIfSet(_includedDLCIds$).subscribe(curIncludedDLCIds => {
            if (isSelected && !curIncludedDLCIds.includes(dLCIdToUpdate)) {
                _includedDLCIds$.next([...curIncludedDLCIds, dLCIdToUpdate]);
            } else if (!isSelected && curIncludedDLCIds.includes(dLCIdToUpdate)) {
                _includedDLCIds$.next(curIncludedDLCIds.filter(dLC => dLC !== dLCIdToUpdate));
            }
        });
    },
    updateIngredientAvailabilityOptions: (newOption: keyof IAvailabilityOptionsSelection, isSelected: boolean) => {
        getCurrentValueIfSet(_ingredientAvailabilityOptions$).subscribe(curOptionsSelection => {
            if (curOptionsSelection[newOption] !== isSelected) {
                _ingredientAvailabilityOptions$.next({...curOptionsSelection, [newOption]: isSelected});
            }
        });
    },
    updateAlchemySessionSelection: async (newAlchemySessionId: number) => {
        const availableRecipes = await recipeService.filterCurrentlyAvailableRecipes(ALL_RECIPES);
        const newAlchemySession = alchemySessionService.getById(newAlchemySessionId, ALL_ALCHEMY_SESSIONS);
        const matchingRecipes = availableRecipes.filter(newAlchemySession.filterRecipePredicate);

        dataManager.setSelectedAlchemySessionId(newAlchemySessionId);
        dataManager.setSelectedRecipeIds(matchingRecipes.map(r => r.id));
    },
    updateRecipeSelection: (recipeIdToUpdate: number, isSelected?: boolean) => {
        getCurrentValueIfSet(_selectedRecipeIds$).subscribe(curSelectedRecipeIds => {
            const isRecipeIdExisting = curSelectedRecipeIds.includes(recipeIdToUpdate);
            
            if (isRecipeIdExisting && isSelected !== true) {
                _selectedRecipeIds$.next(curSelectedRecipeIds.filter(eR => eR !== recipeIdToUpdate));
            } else if (!isRecipeIdExisting && isSelected !== false) {
                _selectedRecipeIds$.next([...curSelectedRecipeIds, recipeIdToUpdate]);
            }
        });
    }
}

function getCurrentValueIfSet<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(take(1), filter(data => !!data));
}