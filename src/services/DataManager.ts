import { BehaviorSubject } from 'rxjs';
import { IRecipe } from "../types/Recipe";

const _selectedRecipes$: BehaviorSubject<IRecipe[]> = new BehaviorSubject<IRecipe[]>([]);

export const dataManager = {
    selectedRecipes$: _selectedRecipes$.asObservable(),
    setSelectedRecipes: (newRecipes: IRecipe[]) => _selectedRecipes$.next(newRecipes),
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
