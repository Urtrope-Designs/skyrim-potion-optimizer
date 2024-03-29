import { ActionSheetButton, IonButton, IonCol, IonContent, IonIcon, IonItemDivider, IonLabel, IonList, IonPage, useIonActionSheet } from '@ionic/react';
import { filter } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmptyListCTA } from '../components/EmptyListCTA';
import { IngredientSummaryEntry } from '../components/IngredientSummaryEntry';
import { StandardHeader } from '../components/StandardHeader';
import { dataManager } from '../services/DataManager';
import { ingredientsService } from '../services/IngredientsService';
import { recipeService } from '../services/RecipeService';
import { IIngredientViewmodel } from '../types/IngredientViewmodel';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';
import './WatchListTab.css';

const toggleSortAlpha$: BehaviorSubject<boolean> = new BehaviorSubject(false);

export const WatchListTab: React.FC = () => {
  const [present] = useIonActionSheet();
  const [ingredients, setIngredients] = useState<IIngredientViewmodel[]>([]);
  const [sortAlpha, setSortAlpha] = useState<boolean>(false);

  useEffect(() => {
    combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$, toggleSortAlpha$]).subscribe(([selectedRecipeIds, includedDLCIds, ingredientAvailabilityOptions, doSortAlpha]) => {
      const selectedRecipes = recipeService.getRecipesById(selectedRecipeIds, ALL_RECIPES);
      const availableRecipes = recipeService.getAvailableRecipes(selectedRecipes, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
      const availableIngredientIds = recipeService.getAllIngredientIdsFromRecipes(availableRecipes);
      const availableIngredients = ingredientsService.getByIds(availableIngredientIds, ALL_INGREDIENTS);
      const ingredientVMs = ingredientsService.getViewmodels(availableIngredients);
      if (doSortAlpha) {
        ingredientVMs.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));
      }

      setSortAlpha(doSortAlpha);
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
      <StandardHeader title="Highest Value"></StandardHeader>
      <IonContent>
        {
          ingredients?.length 
            ? <IonList>
                <IonItemDivider sticky={true}>
                  <IonLabel>Sort:</IonLabel>
                  <IonButton fill='outline' slot='end' color='medium' onClick={() => toggleSortAlpha$.next(!sortAlpha)}>
                    <span className='ion-padding-end'>{sortAlpha ? 'Alphabetical' : 'By Recipe'}</span>
                    <IonIcon icon={filter}></IonIcon>
                  </IonButton>
                </IonItemDivider>
                {
                  ingredients.map(ingredient => (
                    <IonCol size='12' key={ingredient.ingredientId}>
                      <IngredientSummaryEntry ingredientSummary={ingredient} swipeSelectIngredient={confirmRemoveIngredient}></IngredientSummaryEntry>
                    </IonCol>
                  ))
                }
              </IonList>
            : <EmptyListCTA listItemType='Ingredient' restartCallback={() => {}}></EmptyListCTA>
        }
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
