import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settings } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { combineLatest } from 'rxjs';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
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
  
  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$]).subscribe(([selectedRecipeIds, includedDLCIds]) => {
      const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds);
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='primary'>
            <IonButton id='settings-toggle'>
              <IonIcon slot='icon-only' icon={settings}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Potion Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
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
                color="secondary"
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
        <IonModal ref={settingsModal} trigger='settings-toggle'>
          <UserSettings dismiss={() => (settingsModal.current?.dismiss())}></UserSettings>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
