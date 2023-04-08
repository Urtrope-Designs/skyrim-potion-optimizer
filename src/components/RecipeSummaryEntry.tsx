import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonList } from '@ionic/react';
import { arrowUndoOutline, ban } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IIngredientViewmodel } from '../types/IngredientViewmodel';
import { IRecipeSummaryViewmodel } from '../types/RecipeSummaryViewmodel';
import { IngredientSummaryEntry } from './IngredientSummaryEntry';

import './RecipeSummaryEntry.css';

interface RecipeSummaryEntryProps {
  recipeSummary: IRecipeSummaryViewmodel;
  removeRecipe: (recipeIdToRemove: number, exhaustedIngredientIds: number[]) => void;
}

export const RecipeSummaryEntry: React.FC<RecipeSummaryEntryProps> = ({ recipeSummary, removeRecipe }) => {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);
  const [ingredientIdsUpdating, setIngredientIdsUpdating] = useState<number[]>([]);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const removeAnimDurationMs = 1000;
  const rootRef = useRef<HTMLIonCardElement>(null);

  function toggleIngredientSelection(ingredientToToggle: IIngredientViewmodel) {
    const removeNewId = selectedIngredientIds.includes(ingredientToToggle.ingredientId);
    const resultingSelectedIngredientIds = removeNewId ? selectedIngredientIds.filter(id => id !== ingredientToToggle.ingredientId) : [...selectedIngredientIds, ingredientToToggle.ingredientId];
    setIngredientIdsUpdating([...ingredientIdsUpdating, ingredientToToggle.ingredientId]);

    setTimeout(() => {
      setSelectedIngredientIds(resultingSelectedIngredientIds);
      setIngredientIdsUpdating(ingredientIdsUpdating.filter(id => id !== ingredientToToggle.ingredientId));
    }, 400);
  }

  function markForRemoval() {
    setIsRemoving(true);
    const animHeight = rootRef.current ? `-${rootRef.current.clientHeight + parseInt(window.getComputedStyle(rootRef.current).marginTop)}px` : '100%';
    document.documentElement.style.setProperty('--item-removal-anim-height', animHeight);
    setTimeout(() => {
      removeRecipe(recipeSummary.recipeId, selectedIngredientIds);
    }, removeAnimDurationMs);
  }

  return (
    <IonCard ref={rootRef} className={`recipeSummaryEntry${isRemoving ? ' removing' : ''}`} style={{'--remove-anim-duration': removeAnimDurationMs + 'ms'}}>
      <IonCardHeader>
        <IonCardTitle>
          <h2 className='ion-no-margin'><IonLabel>Potion of {recipeSummary.recipeName}</IonLabel></h2>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList inset className='ion-no-margin'>
          {
            recipeSummary.ingredients.map(ingredient => {
              const isSelected = selectedIngredientIds.includes(ingredient.ingredientId);
              const isUpdatingSelection = ingredientIdsUpdating.includes(ingredient.ingredientId);
              return (
                <IngredientSummaryEntry key={ingredient.ingredientId}
                  ingredientSummary={ingredient}
                  itemColor={isSelected || isUpdatingSelection ? 'secondary' : undefined}
                  swipeSelectIngredient={toggleIngredientSelection}
                  slideOptionColor={isSelected ? 'primary' : 'secondary'}
                  slideOptionIcon={isSelected ? arrowUndoOutline : ban}
                ></IngredientSummaryEntry>
              )
            })
          }
        </IonList>
        <div className='ion-padding-top ion-text-end'>
          <IonButton color='secondary' size='small' onClick={() => markForRemoval()}>Done</IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  )
}
