import { IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
            ? <IonGrid>
                <IonRow>
                {
                  ingredients.map(ingredient => (
                    <IonCol size='12' size-sm='6' size-lg='3'>
                      <IonCard key={ingredient}>
                        <IonCardHeader>
                          { ingredient }
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>
                  ))
                }
              </IonRow>
            </IonGrid>
            : <p className='ion-padding'>Head to the <IonRouterLink routerLink='/recipes' routerDirection='none'>Recipes</IonRouterLink> tab to select the ingredients to watch for.</p>

        }
      </IonContent>
    </IonPage>
  );
};

