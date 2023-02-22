import { IonItem, IonLabel } from "@ionic/react";
import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";

interface RecipeSummaryEntryProps {
  recipeSummary: IRecipeSummaryViewmodel;
}

export const RecipeSummaryEntry: React.FC<RecipeSummaryEntryProps> = ({ recipeSummary }) => (
  <IonItem>
      <IonLabel>
        <h3>{recipeSummary.ingredientsList}</h3>
        {!!recipeSummary.standardEffectsList && <p>Effects: {recipeSummary.standardEffectsList}</p>}
      </IonLabel>
  </IonItem>
);
