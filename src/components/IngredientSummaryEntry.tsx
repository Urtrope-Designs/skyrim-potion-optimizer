import { Color } from '@ionic/core';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { ban, informationCircleOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IIngredientViewmodel } from '../types/IngredientViewmodel';

import './IngredientSummaryEntry.css';

interface IngredientSummaryEntryProps {
    itemColor?: Color & string;
    ingredientSummary: IIngredientViewmodel;
    swipeSelectIngredient: (ingredientToSelect: IIngredientViewmodel) => void;
    slideOptionColor?: Color & string;
    slideOptionIcon?: string;
}

export const IngredientSummaryEntry: React.FC<IngredientSummaryEntryProps> = ({itemColor: color, ingredientSummary, swipeSelectIngredient, slideOptionColor, slideOptionIcon}) => {
    const ingredientSrc = `/assets/ingredients/${ingredientSummary.ingredientName.toLocaleLowerCase().replace(/ /g, '_').replace(/'/g, '')}.png`;
    const [isDetailShown, setIsDetailShown] = useState(false);
    const ingredientSlidingRef = useRef<HTMLIonItemSlidingElement | null>(null);
    const ingredientDetailInnerRef = useRef<HTMLDivElement | null>(null);

    function handleRemoveIngredient(ingredientSummary: IIngredientViewmodel) {
        ingredientSlidingRef.current?.close();
        swipeSelectIngredient(ingredientSummary);
    }
    
    return (
        <div className='ingredientSummaryEntry'>
            <IonItemSliding ref={ingredientSlidingRef}>
                <IonItem color={color} onClick={() => setIsDetailShown(!isDetailShown)}>
                    <IonLabel>
                        <h2>{ ingredientSummary.ingredientName }</h2>
                    </IonLabel>
                    <IonIcon slot='end' icon={informationCircleOutline} className={'ingredientSummary_showMoreButton' + (isDetailShown ? ' ingredientSummary_showMoreButton-detailShown' : '')}/>
                </IonItem>
                <IonItemOptions onIonSwipe={() => handleRemoveIngredient(ingredientSummary)}>
                    <IonItemOption expandable color={slideOptionColor ?? 'secondary'} onClick={() => handleRemoveIngredient(ingredientSummary)}>
                        <IonIcon slot='icon-only' icon={slideOptionIcon ?? ban}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
            <div className={`item-native ingredientDetail_wrapper${isDetailShown ? ' ingredientDetail_wrapper-detailShown' : ''}`} style={{['--ingredientDetail-innerHeight' as any]: `${ingredientDetailInnerRef.current?.clientHeight}px`}}>
                <div className={`ingredientDetail_inner ion-padding${isDetailShown ? ' animate-fade-in' : ''}`} ref={ingredientDetailInnerRef}>
                    <IonLabel color='primary' className='ion-text-wrap'>
                        {ingredientSummary.sourceDescription}
                    </IonLabel>
                </div>
            </div>
        </div>
    );
}