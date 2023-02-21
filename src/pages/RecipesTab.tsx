import { IonButton, IonButtons, IonContent, IonItem, IonList, IonModal, IonPage } from '@ionic/react';
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
  const [showOnlySelected, setShowOnlySelected] = useState<boolean>(false);
  const settingsToggleId = 'settings-toggle';
  
  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$]).subscribe(([selectedRecipeIds, includedDLCIds, ingredientAvailabilityOptions]) => {
      const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
      const recipeViewmodels = recipeService.getRecipeSummaryViewmodels(availableRecipes, ALL_INGREDIENTS, selectedRecipeIds);
      setRecipeSummaries(recipeViewmodels);
    })
  }, []);

  const toggleAllRecipes = () => {
      if (recipeSummaries.every(rS => rS.isSelected)) {
        dataManager.setSelectedRecipeIds([]);
      } else {
        dataManager.setSelectedRecipeIds(recipeSummaries.map(rS => rS.recipeId));
      }
  }
  
  return (
    <IonPage>
      <StandardHeader title="Potion Recipes" settingsToggleBtnId={settingsToggleId}></StandardHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonButtons slot="start">
              <IonButton
                color="primary"
                fill={recipeSummaries.every(rS => rS.isSelected) ? 'outline' : 'solid'}
                onClick={() => toggleAllRecipes()}
              >
                {recipeSummaries.every(rS => rS.isSelected) ? 'Deselect All' : 'Select All'}
              </IonButton>
              <IonButton
                color="primary"
                fill={showOnlySelected ? 'outline' : 'solid'}
                onClick={() => setShowOnlySelected(!showOnlySelected)}
              >
                {showOnlySelected ? 'Show All' : 'Hide Deselected'}
              </IonButton>
            </IonButtons>
          </IonItem>
          {
            recipeSummaries
            .filter(recipe => {
              return !showOnlySelected || recipe.isSelected;
            })
            .map(recipe => {
              return <RecipeSummaryEntry key={recipe.recipeId} recipeSummary={recipe} updateRecipeSelection={dataManager.updateRecipeSelection}></RecipeSummaryEntry>
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
