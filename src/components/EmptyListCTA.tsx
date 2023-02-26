import { IonLabel } from "@ionic/react";
import { dataManager } from "../services/DataManager";
import { recipeService } from "../services/RecipeService";
import { ALL_RECIPES } from "../utils/constants";

interface EmptyListCTAProps {
    listItemType: string;
}

async function restartRecipes() {
    const availableRecipes = await recipeService.filterCurrentlyAvailableRecipes(ALL_RECIPES);
    dataManager.setSelectedRecipeIds(availableRecipes.map(recipe => recipe.id));
}

export const EmptyListCTA: React.FC<EmptyListCTAProps> = ({listItemType}) => (
    <p className='ion-padding'>
        Looks like you've worked through all the { listItemType }s that match your availability settings. 
        Adjust those settings by tapping the gear icon above, or <IonLabel color='primary' onClick={() => restartRecipes()}>click here to start a new potion brewing session</IonLabel>!
    </p>
)