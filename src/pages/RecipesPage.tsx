import { IonContent, IonList, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { combineLatest, take } from 'rxjs';
import { EmptyListCTA } from '../components/EmptyListCTA';
import { RecipeSummaryEntry } from '../components/RecipeSummaryEntry';
import { StandardHeader } from '../components/StandardHeader';
import { alchemySessionService } from '../services/AlchemySessionService';
import { dataManager } from '../services/DataManager';
import { recipeService } from '../services/RecipeService';
import { IAvailabilityOptionsSelection } from '../types/AvailabilityOptionsSelection';
import { IRecipe } from '../types/Recipe';
import { IRecipeSummaryViewmodel } from '../types/RecipeSummaryViewmodel';
import { ALL_ALCHEMY_SESSIONS, ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';

import './RecipesPage.css';

export const RecipesPage: React.FC = () => {
  const [recipeSummaries, setRecipeSummaries] = useState<IRecipeSummaryViewmodel[]>([]);
  const [headerText, setHeaderText] = useState<string>('Potion Recipes');
  
  useEffect(() => {
    const recipeState$ = combineLatest([dataManager.selectedRecipeIds$, dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$]);
    const subscription = recipeState$.subscribe(([selectedRecipeIds, includedDLCIds, ingredientAvailabilityOptions]) => {
      setRecipeSummaries(buildActiveRecipeSummaries(selectedRecipeIds, includedDLCIds, ingredientAvailabilityOptions));
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    const subscription = dataManager.selectedAlchemySessionId$.subscribe(selectedAlchemySessionId => {
      setHeaderText(buildHeaderText(selectedAlchemySessionId));
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const confirmRemoveRecipe = (recipeId: number, exhaustedIngredientIds: number[]) => {
    const recipe: IRecipe | undefined = recipeService.getRecipesById([recipeId], ALL_RECIPES)[0];
    if (recipe) {
      dataManager.selectedRecipeIds$.pipe(take(1)).subscribe(recipeIds => {
        const recipes = recipeService.getRecipesById(recipeIds, ALL_RECIPES);
        const filteredRecipes = recipes.filter(r => !(exhaustedIngredientIds.some(ingredientId => r.ingredientIds.includes(ingredientId))) && !(r.id === recipeId));
        const filteredRecipeIds = filteredRecipes.map(r => r.id);
        dataManager.setSelectedRecipeIds(filteredRecipeIds);
      });  
    }  
  }  

  const restartSession = () => {
    dataManager.selectedAlchemySessionId$.pipe(take(1)).subscribe(alchemySessionId => {
      dataManager.updateAlchemySessionSelection(alchemySessionId);
    });
  }

  return (
    <IonPage>
      <StandardHeader title={headerText}></StandardHeader>
      <IonContent fullscreen>
        {
          recipeSummaries.length > 0
            ? <IonList class='recipesList'>
                {
                  recipeSummaries.map(recipe => (
                    <RecipeSummaryEntry key={recipe.recipeId} recipeSummary={recipe} removeRecipe={confirmRemoveRecipe}></RecipeSummaryEntry>
                  ))
                }
              </IonList> 
            : <EmptyListCTA listItemType='Recipe' restartCallback={restartSession}></EmptyListCTA>
        }
      </IonContent>
    </IonPage>
  );
};

function buildActiveRecipeSummaries(selectedRecipeIds: number[], includedDLCIds: number[], ingredientAvailabilityOptions: IAvailabilityOptionsSelection): IRecipeSummaryViewmodel[] {
  const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
  const selectedRecipes = availableRecipes.filter(aR => selectedRecipeIds.includes(aR.id));
  const recipeViewmodels = recipeService.getRecipeSummaryViewmodels(selectedRecipes, ALL_INGREDIENTS);
  
  return recipeViewmodels;
}

function buildHeaderText(selectedAlchemySessionId: number): string {
  const selectedAlchemySession = alchemySessionService.getById(selectedAlchemySessionId, ALL_ALCHEMY_SESSIONS);
  const headerText = selectedAlchemySession.sessionCategory + ': ' + selectedAlchemySession.name;

  return headerText;
}
