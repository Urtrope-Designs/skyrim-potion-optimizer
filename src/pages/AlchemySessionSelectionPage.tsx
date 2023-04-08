import { IonAccordion, IonAccordionGroup, IonContent, IonItem, IonItemGroup, IonLabel, IonPage, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { combineLatest } from 'rxjs';
import { alchemySessionService } from '../services/AlchemySessionService';
import { dataManager } from '../services/DataManager';
import { INavigationListGroupingViewmodel } from '../types/NavigationListGroupingViewmodel';
import { ALL_ALCHEMY_SESSIONS, ALL_INGREDIENTS, ALL_RECIPES } from '../utils/constants';

import { StandardHeader } from '../components/StandardHeader';
import { recipeService } from '../services/RecipeService';
import { IAvailabilityOptionsSelection } from '../types/AvailabilityOptionsSelection';
import './AlchemySessionSelectionPage.css';

export const AlchemySessionSelectionPage: React.FC = () => {
    const [alchemySessionViewmodels, setAlchemySessionViewmodels] = useState<INavigationListGroupingViewmodel[]>([]);

    useEffect(() => {
        const data$ = combineLatest([dataManager.includedDLCIds$, dataManager.ingredientAvailabilityOptions$]);
        const subscription = data$.subscribe(([includedDLCIds, ingredientAvailabilityOptions]) => {
            setAlchemySessionViewmodels(buildAvailableAlchemySessionViewmodels(includedDLCIds, ingredientAvailabilityOptions)); 
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <IonPage>
            <StandardHeader showBackButton={false}>
                    <IonTitle><h1 className='ion-text-center ion-no-margin'>Potion Companion</h1></IonTitle>
            </StandardHeader>
            <IonContent>
                <IonItem>What kind of potion would you like to brew?</IonItem>
                <IonAccordionGroup multiple >
                    {
                        alchemySessionViewmodels.map(grouping => (
                                <IonAccordion value={grouping.groupingLabel} key={grouping.groupingLabel}>
                                    <IonItem slot='header' className='ion-text-uppercase text-color-primary'>
                                        <h4>{grouping.groupingLabel}</h4>
                                    </IonItem>
                                    <IonItemGroup slot='content'>
                                    {
                                        grouping.items.map(item => (
                                            <IonItem key={item.labelText} onClick={() => item.clickHandler()} detail={true} routerLink='/recipes'>
                                                <IonLabel className='ion-padding-start'>{item.labelText}</IonLabel>
                                            </IonItem>
                                        ))
                                    }
                                    </IonItemGroup>                                    
                                </IonAccordion>
                        ))
                    }
                </IonAccordionGroup>
            </IonContent>
        </IonPage>  
    )
};

function buildAvailableAlchemySessionViewmodels(includedDLCIds: number[], ingredientAvailabilityOptions: IAvailabilityOptionsSelection): INavigationListGroupingViewmodel[] {
    const availableRecipes = recipeService.getAvailableRecipes(ALL_RECIPES, ALL_INGREDIENTS, includedDLCIds, ingredientAvailabilityOptions);
    const availableAlchemySessions = ALL_ALCHEMY_SESSIONS.filter(session => {
        return availableRecipes.some(session.filterRecipePredicate);
    });
    const viewmodel = alchemySessionService.getNavListViewmodels(availableAlchemySessions);

    return viewmodel;
}
