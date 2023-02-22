import { IonContent, IonList, IonModal, IonPage } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { combineLatest } from 'rxjs';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { StandardHeader } from '../components/StandardHeader';
import { UserSettings } from '../components/UserSettings';
import { dataManager } from '../services/DataManager';
import { recipeService } from '../services/RecipeService';
import { IRecipeSummaryViewmodel } from '../types/RecipeSummaryViewmodel';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
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

  return (
    <IonPage>
      <StandardHeader title="Potion Recipes" settingsToggleBtnId={settingsToggleId}></StandardHeader>
      <IonContent fullscreen>
        <IonList>
          {
            recipeSummaries.map(recipe => {
              return <RecipeSummaryEntry key={recipe.recipeId} recipeSummary={recipe}></RecipeSummaryEntry>
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
