import { IonButton, IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { IIngredientViewmodel } from "../types/IngredientViewmodel";

import "./IngredientSummaryEntry.css";

interface IngredientSummaryEntryProps {
    ingredientSummary: IIngredientViewmodel;
    removeIngredient: (ingredientToRemove: IIngredientViewmodel) => void;
}

export const IngredientSummaryEntry: React.FC<IngredientSummaryEntryProps> = ({ingredientSummary, removeIngredient}) => {
    const ingredientSrc = `/assets/ingredients/${ingredientSummary.ingredientName.toLocaleLowerCase().replace(/ /g, '_').replace(/'/g, '')}.png`
    return (
        <div className="ingredientSummaryEntry">
            <IonCard>
                <img alt={'picture of ' + ingredientSummary.ingredientName} src={ingredientSrc} className="ion-padding"/>
                <IonCardContent>
                    <h2>{ ingredientSummary.ingredientName }</h2>
                </IonCardContent>
            </IonCard>
            <IonButton shape="round" size="small" color="danger" onClick={() => removeIngredient(ingredientSummary)}>
                <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
            </IonButton>
        </div>
    );
}