import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { IRecipe } from "../types/Recipe";

interface RecipeListProps {
  recipe: IRecipe;
}

export const RecipeSummaryEntry: React.FC<RecipeListProps> = ({ recipe }) => {
  return (
    <IonItem>
        <IonCheckbox slot="start"></IonCheckbox>
        <IonLabel>{recipe.ingredients.join(', ')}</IonLabel>
    </IonItem>
  );
};

