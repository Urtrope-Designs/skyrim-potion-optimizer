import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { ban, chevronDown } from "ionicons/icons";
import { useRef, useState } from "react";
import { IIngredientViewmodel } from "../types/IngredientViewmodel";

import './IngredientSummaryEntry.css';

interface IngredientSummaryEntryProps {
    ingredientSummary: IIngredientViewmodel;
    removeIngredient: (ingredientToRemove: IIngredientViewmodel) => void;
}

export const IngredientSummaryEntry: React.FC<IngredientSummaryEntryProps> = ({ingredientSummary, removeIngredient}) => {
    const ingredientSrc = `/assets/ingredients/${ingredientSummary.ingredientName.toLocaleLowerCase().replace(/ /g, '_').replace(/'/g, '')}.png`;
    const [isDetailShown, setIsDetailShown] = useState(false);
    const ingredientDetailInnerRef = useRef<HTMLIonLabelElement | null>(null);
    
    return (
        <div className="ingredientSummaryEntry">
            <IonItemSliding>
                <IonItem onClick={() => setIsDetailShown(!isDetailShown)}>
                    <IonThumbnail slot='start'>
                        <img alt={'picture of ' + ingredientSummary.ingredientName} src={ingredientSrc}/>
                    </IonThumbnail>
                    <IonLabel>
                        <h2>{ ingredientSummary.ingredientName }</h2>
                        <div className={`item-native ingredientDetail_wrapper${isDetailShown ? ' ingredientDetail_wrapper-detailShown' : ''}`} style={{['--ingredientDetail-innerHeight' as any]: `${ingredientDetailInnerRef.current?.clientHeight}px`}}>
                            <IonLabel color='primary' className="ion-text-wrap ion-padding stoneDetail_inner" ref={ingredientDetailInnerRef}>
                                {ingredientSummary.sourceDescription}
                            </IonLabel>
                        </div>
                    </IonLabel>
                    <IonIcon slot="end" icon={chevronDown} className={'ingredientSummary_showMoreButton' + (isDetailShown ? ' ingredientSummary_showMoreButton-detailShown' : '')}/>
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