import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RecipeList } from '../components/RecipeList';
import { IRecipe } from '../types/Recipe';
import './RecipesTab.css';

export const RecipesTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Potion Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <RecipeList recipes={TEST_RECIPES}></RecipeList>
      </IonContent>
    </IonPage>
  );
};


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