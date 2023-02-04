import { ActionSheetButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { settings } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { IngredientSummaryEntry } from '../components/IngredientSummaryEntry';
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

  const confirmRemoveIngredient = (ingredient: IIngredientViewmodel) => {
    present({
      header: 'Are you sure?',
      subHeader: `This will de-select all recipes that include "${ingredient.ingredientName}"`,
      buttons: buildRemoveConfirmationButtons(ingredient.ingredientId),
    });
  }
  
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
                    <IonCol size='6' size-sm='4' size-lg='3' key={ingredient.ingredientId}>
                      <IngredientSummaryEntry ingredientSummary={ingredient} removeIngredient={confirmRemoveIngredient}></IngredientSummaryEntry>
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
