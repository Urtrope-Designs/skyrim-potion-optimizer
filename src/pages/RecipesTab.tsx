import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settings } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { UserSettings } from '../components/UserSettings';
import { dataManager } from '../services/DataManager';
import { IRecipe } from '../types/Recipe';
import { BEST_RECIPES } from '../utils/constants';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
  const settingsModal = useRef<HTMLIonModalElement>(null);
  const [selectedRecipes, setSelectedRecipes] = useState<IRecipe[]>([]);
  
  useEffect(() => {dataManager.selectedRecipes$.subscribe(setSelectedRecipes)}, []);

  const toggleAllRecipes = () => {
    selectedRecipes.length === BEST_RECIPES.length ? dataManager.setSelectedRecipes([]) : dataManager.setSelectedRecipes(BEST_RECIPES);
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
          <IonCheckbox slot="start" checked={selectedRecipes.length === BEST_RECIPES.length} onClick={() => toggleAllRecipes()}></IonCheckbox>
          <IonLabel>
            <h2>Toggle All</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          {
              getRecipesWithSelection(selectedRecipes).map(recipe => {
                  return <RecipeSummaryEntry key={recipe.id} recipe={recipe} updateRecipeSelection={dataManager.updateRecipeSelection}></RecipeSummaryEntry>
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

function getRecipesWithSelection(selectedRecipes: IRecipe[]): (IRecipe & {isSelected: boolean})[] {
  return BEST_RECIPES.map(recipe => {
    return {
      ...recipe,
      isSelected: selectedRecipes.some(sR => sR.ingredients.join() === recipe.ingredients.join()),
    }
  })
}


