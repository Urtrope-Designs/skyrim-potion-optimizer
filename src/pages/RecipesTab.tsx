import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settings } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { combineLatest, take } from 'rxjs';
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
  
  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$]).subscribe(([selectedRecipeIds, includedDLCIds]) => {
      const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds);
      const recipeViewmodels = recipeService.getRecipeSummaryViewmodels(availableRecipes, ALL_INGREDIENTS, selectedRecipeIds);
      setRecipeSummaries(recipeViewmodels);
    })
  }, []);

  const toggleAllRecipes = () => {
    dataManager.includedDLCIds$.pipe(take(1)).subscribe((includedDLCIds) => {
      const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds);
      recipeSummaries.length === availableRecipes.length ? dataManager.setSelectedRecipeIds([]) : dataManager.setSelectedRecipeIds(availableRecipes.map(r => r.id));
    });
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
        <IonItem>
          <IonCheckbox slot="start" checked={recipeSummaries.length === ALL_RECIPES.length} onClick={() => toggleAllRecipes()}></IonCheckbox>
          <IonLabel>
            <h2>Toggle All</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          {
              recipeSummaries.map(recipe => {
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
