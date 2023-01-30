import { ActionSheetButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { settings, trash } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserSettings } from '../components/UserSettings';
import { dataManager } from '../services/DataManager';
import { ingredientsService } from '../services/IngredientsService';
import { recipeService } from '../services/RecipeService';
import { IIngredientViewmodel } from '../types/IngredientViewmodel';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';
import './WatchListTab.css';

export const WatchListTab: React.FC = () => {
  const [present] = useIonActionSheet();
  const settingsModal = useRef<HTMLIonModalElement>(null);
  const [ingredients, setIngredients] = useState<IIngredientViewmodel[]>([]);

  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$]).subscribe(([selectedRecipeIds, includedDLCIds]) => {
      const selectedRecipes = recipeService.getRecipesById(selectedRecipeIds, ALL_RECIPES);
      const availableRecipes = recipeService.getAvailableRecipes(selectedRecipes, ALL_INGREDIENTS, includedDLCIds);
      const availableIngredientIds = recipeService.getAllIngredientIdsFromRecipes(availableRecipes);
      const availableIngredients = ingredientsService.getIngredientsById(availableIngredientIds, ALL_INGREDIENTS);
      const ingredientVMs = ingredientsService.getIngredientViewmodels(availableIngredients);
      ingredientVMs.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));

      setIngredients(ingredientVMs);
    });
  }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='primary'>
            <IonButton id='watchlist-settings-toggle'>
              <IonIcon slot='icon-only' icon={settings}></IonIcon>
            </IonButton>
          </IonButtons>
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
                    <IonCol size='12' size-sm='6' size-lg='3' key={ingredient.ingredientId}>
                      <IonCard>
                        <IonCardHeader class='display-flex ion-justify-content-between'>
                          <IonTitle>
                            { ingredient.ingredientName }
                          </IonTitle>
                          <IonButton
                            fill='clear' shape='round' color='danger'
                            onClick={() => 
                              present({
                                header: 'Are you sure?',
                                subHeader: 'This will de-select all recipes that include this ingredient',
                                buttons: buildRemoveConfirmationButtons(ingredient.ingredientId)
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
        <IonModal ref={settingsModal} trigger='watchlist-settings-toggle'>
          <UserSettings dismiss={() => (settingsModal.current?.dismiss())}></UserSettings>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

const buildRemoveConfirmationButtons = (ingredientId: number) => {
  const buttons: ActionSheetButton[] = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Remove',
      role: 'confirm',
      handler: () => {
        dataManager.selectedRecipeIds$.pipe(take(1)).subscribe(recipeIds => {
          const recipes = recipeService.getRecipesById(recipeIds, ALL_RECIPES);
          const filteredRecipes = recipes.filter(r => !r.ingredientIds.includes(ingredientId));
          const filteredRecipeIds = filteredRecipes.map(r => r.id);
          dataManager.setSelectedRecipeIds(filteredRecipeIds);
        })
      }
    }
  ];

  return buttons;
}
