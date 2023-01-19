import { ActionSheetButton, IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { take } from 'rxjs/operators';
import { dataManager } from '../services/DataManager';
import { IRecipe } from '../types/Recipe';
import './WatchListTab.css';

export const WatchListTab: React.FC = () => {
  const [present] = useIonActionSheet();
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
          ingredients?.length 
            ? <IonGrid>
                <IonRow>
                {
                  ingredients.map(ingredient => (
                    <IonCol size='12' size-sm='6' size-lg='3'>
                      <IonCard key={ingredient}>
                        <IonCardHeader class='display-flex ion-justify-content-between'>
                          <IonTitle>
                            { ingredient }
                          </IonTitle>
                          <IonButton
                            fill='clear' shape='round' color='danger'
                            onClick={() => 
                              present({
                                header: 'Are you sure?',
                                subHeader: 'This will de-select all recipes that include this ingredient',
                                buttons: buildRemoveConfirmationButtons(ingredient)
                              })
                            }
                          >
                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                          </IonButton>
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

const buildRemoveConfirmationButtons = (ingredient: string) => {
  const buttons: ActionSheetButton[] = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Remove',
      role: 'confirm',
      handler: () => {
        dataManager.selectedRecipes$.pipe(take(1)).subscribe(recipes => {
          dataManager.setSelectedRecipes(recipes.filter(r => !r.ingredients.includes(ingredient)))
        })
      }
    }
  ];

  return buttons;
}
