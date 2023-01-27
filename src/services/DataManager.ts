import { BehaviorSubject } from 'rxjs';
import { IDLCInstance } from '../types/DLCInstance';
import { IRecipe } from "../types/Recipe";

const _includedDLCs$: BehaviorSubject<IDLCInstance[]> = new BehaviorSubject<IDLCInstance[]>([]);
const _selectedRecipes$: BehaviorSubject<IRecipe[]> = new BehaviorSubject<IRecipe[]>([]);

export const dataManager = {
    includedDLCs$: _includedDLCs$.asObservable(),
    selectedRecipes$: _selectedRecipes$.asObservable(),
    setIncludedDLCs: (newDLCs: IDLCInstance[]) => _includedDLCs$.next(newDLCs),
    setSelectedRecipes: (newRecipes: IRecipe[]) => _selectedRecipes$.next(newRecipes),
    updateDLCInclusion: (dLCToUpdate: IDLCInstance, isSelected: boolean) => {
        const curIncludedDLCs = _includedDLCs$.value;

        if (isSelected && !curIncludedDLCs.some(dlc => dlc.id === dLCToUpdate.id)) {
            _includedDLCs$.next([...curIncludedDLCs, dLCToUpdate]);
        } else if (!isSelected && curIncludedDLCs.some(dlc => dlc.id === dLCToUpdate.id)) {
            _includedDLCs$.next(curIncludedDLCs.filter(dLC => dLC !== dLCToUpdate));
        }
    },
    updateRecipeSelection: (recipeToUpdate: IRecipe, isSelected?: boolean) => {
        const curSelectedRecipes = _selectedRecipes$.value;
        const existingRecipe = curSelectedRecipes.find(r => r.ingredients.join() === recipeToUpdate.ingredients.join());

        if (existingRecipe && isSelected !== true) {
            _selectedRecipes$.next(curSelectedRecipes.filter(eR => eR.ingredients.join() !== existingRecipe?.ingredients.join()));
        } else if (!existingRecipe && isSelected !== false) {
            _selectedRecipes$.next([...curSelectedRecipes, recipeToUpdate]);
        }
    }
}
