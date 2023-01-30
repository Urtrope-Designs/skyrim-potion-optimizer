import { BehaviorSubject } from 'rxjs';

const _includedDLCIds$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
const _selectedRecipeIds$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

export const dataManager = {
    includedDLCIds$: _includedDLCIds$.asObservable(),
    selectedRecipeIds$: _selectedRecipeIds$.asObservable(),
    setIncludedDLCIds: (newDLCs: number[]) => _includedDLCIds$.next(newDLCs),
    setSelectedRecipeIds: (newRecipeIds: number[]) => _selectedRecipeIds$.next(newRecipeIds),
    updateDLCInclusion: (dLCIdToUpdate: number, isSelected: boolean) => {
        const curIncludedDLCIds = _includedDLCIds$.value;

        if (isSelected && !curIncludedDLCIds.includes(dLCIdToUpdate)) {
            _includedDLCIds$.next([...curIncludedDLCIds, dLCIdToUpdate]);
        } else if (!isSelected && curIncludedDLCIds.includes(dLCIdToUpdate)) {
            _includedDLCIds$.next(curIncludedDLCIds.filter(dLC => dLC !== dLCIdToUpdate));
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
