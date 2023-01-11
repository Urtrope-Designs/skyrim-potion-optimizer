import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { dataManager } from '../services/DataManager';
import { IRecipe } from '../types/Recipe';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<IRecipe[]>([]);
  
  useEffect(() => {dataManager.selectedRecipes$.subscribe(setSelectedRecipes)}, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Potion Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
              getRecipesWithSelection(selectedRecipes).map(recipe => {
                  return <RecipeSummaryEntry key={recipe.ingredients.join(',')} recipe={recipe} updateRecipeSelection={dataManager.updateRecipeSelection}></RecipeSummaryEntry>
              })
          }
        </IonList> 
      </IonContent>
    </IonPage>
  );
};

function getRecipesWithSelection(selectedRecipes: IRecipe[]): (IRecipe & {isSelected: boolean})[] {
  return TEST_RECIPES.map(recipe => {
    return {
      ...recipe,
      isSelected: selectedRecipes.some(sR => sR.ingredients.join() === recipe.ingredients.join()),
    }
  })
}


const TEST_RECIPES: IRecipe[] = [
  {
    standardEffects: [],
    ingredients: ['Bear Claws', 'Giant\'s Toe', 'Hanging Moss'],
  },
  {
    standardEffects: [],
    ingredients: ['Blue Butterfly Wing', 'Blue Mountain Flower', 'Giant\'s Toe'],
  },
  {
    standardEffects: [],
    ingredients: ['Creep Cluster', 'Giant\'s Toe', 'Hanging Moss'],
  },
]