import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { IRecipe } from "../types/Recipe";

interface RecipeSummaryEntryProps {
  recipe: IRecipe & {isSelected: boolean};
  updateRecipeSelection: (recipeToUpdate: IRecipe, isChecked: boolean) => void;
}

export const RecipeSummaryEntry: React.FC<RecipeSummaryEntryProps> = ({ recipe, updateRecipeSelection }) => (
  <IonItem>
      <IonCheckbox slot="start" checked={recipe.isSelected} onIonChange={(event) => updateRecipeSelection(recipe, event.detail.checked)}></IonCheckbox>
      <IonLabel>
        <h3>{recipe.ingredients.join(', ')}</h3>
        {recipe.standardEffects.length > 0 && <p>Effects: {recipe.standardEffects.join(', ')}</p>}
      </IonLabel>

  </IonItem>
);
