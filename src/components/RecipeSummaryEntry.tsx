import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";

interface RecipeSummaryEntryProps {
  recipeSummary: IRecipeSummaryViewmodel;
  updateRecipeSelection: (recipeIdToUpdate: number, isChecked: boolean) => void;
}

export const RecipeSummaryEntry: React.FC<RecipeSummaryEntryProps> = ({ recipeSummary, updateRecipeSelection }) => (
  <IonItem>
      <IonCheckbox slot="start" checked={recipeSummary.isSelected} onIonChange={(event) => updateRecipeSelection(recipeSummary.recipeId, event.detail.checked)}></IonCheckbox>
      <IonLabel>
        <h3>{recipeSummary.ingredientsList}</h3>
        {!!recipeSummary.standardEffectsList && <p>Effects: {recipeSummary.standardEffectsList}</p>}
      </IonLabel>
  </IonItem>
);
