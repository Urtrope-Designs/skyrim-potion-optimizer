import { IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { dataManager } from '../services/DataManager';
import { IRecipe } from '../types/Recipe';
import { BEST_RECIPES } from '../utils/constants';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<IRecipe[]>([]);
  
  useEffect(() => {dataManager.selectedRecipes$.subscribe(setSelectedRecipes)}, []);

  const toggleAllRecipes = () => {
    selectedRecipes.length === BEST_RECIPES.length ? dataManager.setSelectedRecipes([]) : dataManager.setSelectedRecipes(BEST_RECIPES);
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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


