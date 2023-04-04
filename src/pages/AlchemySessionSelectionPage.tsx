import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { alchemySessionService } from '../services/AlchemySessionService';
import { ALL_ALCHEMY_SESSIONS } from '../utils/constants';

import './AlchemySessionSelectionPage.css';

export const AlchemySessionSelectionPage: React.FC = () => {
    const alchemySessionsViewmodel = alchemySessionService.getNavListViewmodels(ALL_ALCHEMY_SESSIONS);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Potion Types</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>What kind of potion would you like to brew?</IonItem>
                <IonAccordionGroup multiple >
                    {
                        alchemySessionsViewmodel.map(grouping => (
                                <IonAccordion value={grouping.groupingLabel} key={grouping.groupingLabel}>
                                    <IonItem slot='header' className='ion-text-uppercase text-color-primary'>
                                        <h4>{grouping.groupingLabel}</h4>
                                    </IonItem>
                                    <IonItemGroup slot='content'>
                                    {
                                        grouping.items.map(item => (
                                            <IonItem key={item.labelText} onClick={() => item.clickHandler()} detail={true} routerLink='/recipes' className='ion-padding-start'>
                                                <IonLabel>{item.labelText}</IonLabel>
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
