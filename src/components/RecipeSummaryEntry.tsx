import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { IRecipe } from "../types/Recipe";

interface RecipeListProps {
  recipe: IRecipe & {isSelected: boolean};
  updateRecipeSelection: (recipeToUpdate: IRecipe) => void;
}

export const RecipeSummaryEntry: React.FC<RecipeListProps> = ({ recipe, updateRecipeSelection }) => {
  return (
    <IonItem>
        <IonCheckbox slot="start" checked={recipe.isSelected} onIonChange={() => updateRecipeSelection(recipe)}></IonCheckbox>
        <IonLabel>{recipe.ingredients.join(', ')}</IonLabel>
    </IonItem>
  );
};

