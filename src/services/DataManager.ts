import { BehaviorSubject } from 'rxjs';
import { IAvailabilityOptionsSelection } from '../types/AvailabilityOptionsSelection';
import { DEFAULT_AVAILABILITY_OPTIONS_SELECTION } from '../utils/constants';

const _includedDLCIds$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
const _ingredientAvailabilityOptions$: BehaviorSubject<IAvailabilityOptionsSelection> = new BehaviorSubject<IAvailabilityOptionsSelection>(DEFAULT_AVAILABILITY_OPTIONS_SELECTION);
const _selectedRecipeIds$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

export const dataManager = {
    includedDLCIds$: _includedDLCIds$.asObservable(),
    ingredientAvailabilityOptions$: _ingredientAvailabilityOptions$.asObservable(),
    selectedRecipeIds$: _selectedRecipeIds$.asObservable(),
    setIncludedDLCIds: (newDLCs: number[]) => _includedDLCIds$.next(newDLCs),
    setIngredientAvailabilityOptions: (newSelection: IAvailabilityOptionsSelection) => _ingredientAvailabilityOptions$.next(newSelection),
    setSelectedRecipeIds: (newRecipeIds: number[]) => _selectedRecipeIds$.next(newRecipeIds),
    updateDLCInclusion: (dLCIdToUpdate: number, isSelected: boolean) => {
        const curIncludedDLCIds = _includedDLCIds$.value;

        if (isSelected && !curIncludedDLCIds.includes(dLCIdToUpdate)) {
            _includedDLCIds$.next([...curIncludedDLCIds, dLCIdToUpdate]);
        } else if (!isSelected && curIncludedDLCIds.includes(dLCIdToUpdate)) {
            _includedDLCIds$.next(curIncludedDLCIds.filter(dLC => dLC !== dLCIdToUpdate));
        }
    },
    updateIngredientAvailabilityOptions: (newOption: keyof IAvailabilityOptionsSelection, isSelected: boolean) => {
        const curOptionsSelection = _ingredientAvailabilityOptions$.value;

        if (curOptionsSelection[newOption] !== isSelected) {
            _ingredientAvailabilityOptions$.next({...curOptionsSelection, [newOption]: isSelected});
        }
    },
    updateRecipeSelection: (recipeIdToUpdate: number, isSelected?: boolean) => {
        const curSelectedRecipeIds = _selectedRecipeIds$.value;
        const isRecipeIdExisting = curSelectedRecipeIds.includes(recipeIdToUpdate);

        if (isRecipeIdExisting && isSelected !== true) {
            _selectedRecipeIds$.next(curSelectedRecipeIds.filter(eR => eR !== recipeIdToUpdate));
        } else if (!isRecipeIdExisting && isSelected !== false) {
            _selectedRecipeIds$.next([...curSelectedRecipeIds, recipeIdToUpdate]);
        }
    }
}
