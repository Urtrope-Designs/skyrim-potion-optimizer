import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { ban } from "ionicons/icons";
import { IIngredientViewmodel } from "../types/IngredientViewmodel";

interface IngredientSummaryEntryProps {
    ingredientSummary: IIngredientViewmodel;
    removeIngredient: (ingredientToRemove: IIngredientViewmodel) => void;
}

export const IngredientSummaryEntry: React.FC<IngredientSummaryEntryProps> = ({ingredientSummary, removeIngredient}) => {
    const ingredientSrc = `/assets/ingredients/${ingredientSummary.ingredientName.toLocaleLowerCase().replace(/ /g, '_').replace(/'/g, '')}.png`
    return (
        <div className="ingredientSummaryEntry">
            <IonItemSliding>
                <IonItem>
                    <IonThumbnail slot='start'>
                        <img alt={'picture of ' + ingredientSummary.ingredientName} src={ingredientSrc}/>
                    </IonThumbnail>
                    <IonLabel color='primary'>{ ingredientSummary.ingredientName }</IonLabel>
                </IonItem>
                <IonItemOptions onIonSwipe={() => removeIngredient(ingredientSummary)}>
                    <IonItemOption expandable color='secondary' onClick={() => removeIngredient(ingredientSummary)}>
                        <IonIcon slot="icon-only" icon={ban}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </div>
    );
}