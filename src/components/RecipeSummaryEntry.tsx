import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { IRecipeSummaryViewmodel } from "../types/RecipeSummaryViewmodel";

interface RecipeSummaryEntryProps {
  recipeSummary: IRecipeSummaryViewmodel;
  removeRecipe: (recipeIdToRemove: number) => void;
}

export const RecipeSummaryEntry: React.FC<RecipeSummaryEntryProps> = ({ recipeSummary, removeRecipe }) => (
  <IonItemSliding>
    <IonItem>
        <IonLabel color='primary' className='ion-text-wrap'>
          <h3>{recipeSummary.ingredientsList}</h3>
          {!!recipeSummary.standardEffectsList && <p>Effects: {recipeSummary.standardEffectsList}</p>}
        </IonLabel>
    </IonItem>
    <IonItemOptions onIonSwipe={() => removeRecipe(recipeSummary.recipeId)}>
      <IonItemOption expandable color='primary' onClick={() => removeRecipe(recipeSummary.recipeId)}>
        <IonIcon slot='icon-only' icon={checkmark}></IonIcon>
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
);
