import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { dataManager } from '../services/DataManager';
import { IRecipe } from '../types/Recipe';
import './WatchListTab.css';

export const WatchListTab: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {dataManager.selectedRecipes$.subscribe(handleRecipesUpdate)}, []);
  
  const handleRecipesUpdate = (newRecipes: IRecipe[]) => {
    const ingredients = newRecipes.reduce((allIngredients: string[], curRecipe: IRecipe) => {
      curRecipe.ingredients.forEach(i => {
        if (!allIngredients.some(aI => aI.localeCompare(i) === 0)) {
          allIngredients.push(i);
        }
      });
      return allIngredients;
    }, [] as string[]);

    setIngredients(ingredients.sort());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingredient Watch List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          ingredients.length 
            ? <IonList>
              {
                ingredients.map(ingredient => (
                  <IonItem key={ingredient}>{ ingredient }</IonItem>
                ))
              }
            </IonList>
            : <p className='ion-padding'>Head to the <IonRouterLink routerLink='/recipes' routerDirection='none'>Recipes</IonRouterLink> tab to select the ingredients to watch for.</p>

        }
      </IonContent>
    </IonPage>
  );
};

