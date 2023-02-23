import { AlertInput, AlertOptions, IonContent, IonList, IonModal, IonPage, useIonAlert } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { combineLatest, take } from 'rxjs';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { StandardHeader } from '../components/StandardHeader';
import { UserSettings } from '../components/UserSettings';
import { dataManager } from '../services/DataManager';
import { ingredientsService } from '../services/IngredientsService';
import { recipeService } from '../services/RecipeService';
import { IIngredient } from '../types/Ingredient';
import { IRecipe } from '../types/Recipe';
import { IRecipeSummaryViewmodel } from '../types/RecipeSummaryViewmodel';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
  const [present] = useIonAlert();
  const settingsModal = useRef<HTMLIonModalElement>(null);
  const [recipeSummaries, setRecipeSummaries] = useState<IRecipeSummaryViewmodel[]>([]);
  const settingsToggleId = 'settings-toggle';
  
  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$]).subscribe(([selectedRecipeIds, includedDLCIds, ingredientAvailabilityOptions]) => {
      const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
      const selectedRecipes = availableRecipes.filter(aR => selectedRecipeIds.includes(aR.id));
      const recipeViewmodels = recipeService.getRecipeSummaryViewmodels(selectedRecipes, ALL_INGREDIENTS, selectedRecipeIds);
      setRecipeSummaries(recipeViewmodels);
    })
  }, []);

  const confirmRemoveRecipe = (recipeId: number) => {
    const recipe: IRecipe | undefined = recipeService.getRecipesById([recipeId], ALL_RECIPES)[0];
    if (recipe) {
      const ingredients = ingredientsService.getIngredientsById(recipe.ingredientIds, ALL_INGREDIENTS);
      present(buildRemoveRecipeDialogOptions(ingredients));
    }
  }

  return (
    <IonPage>
      <StandardHeader title="Potion Recipes" settingsToggleBtnId={settingsToggleId}></StandardHeader>
      <IonContent fullscreen>
        <IonList>
          {
            recipeSummaries.map(recipe => {
              return <RecipeSummaryEntry key={recipe.recipeId} recipeSummary={recipe} removeRecipe={confirmRemoveRecipe}></RecipeSummaryEntry>
            })
          }
        </IonList> 
        <IonModal ref={settingsModal} trigger={settingsToggleId}>
          <UserSettings dismiss={() => (settingsModal.current?.dismiss())}></UserSettings>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

function buildRemoveRecipeDialogOptions(ingredients: IIngredient[]): AlertOptions {
  const options: AlertOptions = {
    header: 'Done with this recipe?',
    message: 'Click "Yes" to hide it from this list until you click the "Start..." button in Settings.<br><br><ion-label class="ion-color ion-color-secondary">Select any ingredients below that were used up while making this recipe:</ion-label>',
    buttons: [
      {
        text: 'Wait a sec'
      },
      {
        text: 'Yes',
        handler: ((ingredientIds: number[]) => {
          dataManager.selectedRecipeIds$.pipe(take(1)).subscribe(recipeIds => {
            const recipes = recipeService.getRecipesById(recipeIds, ALL_RECIPES);
            const filteredRecipes = recipes.filter(r => !(ingredientIds.some(ingredientId => r.ingredientIds.includes(ingredientId))));
            const filteredRecipeIds = filteredRecipes.map(r => r.id);
            dataManager.setSelectedRecipeIds(filteredRecipeIds);
          })
        }),
      },
    ],
    inputs: ingredients.map(i => {
      const input: AlertInput = {
        label: i.name,
        type: 'checkbox',
        value: i.id,
      }
      return input;
    })
  };

  return options;
}