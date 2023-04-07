import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";

import './StandardHeader.css';

interface StandardHeaderProps {
    title: string;
    settingsToggleBtnId: string;
}

export const StandardHeader: React.FC<StandardHeaderProps> = ({title, settingsToggleBtnId}) => {
    return ( 
        <IonHeader>
            <IonToolbar className='flex'>
                <IonButtons slot='start'>
                    <IonBackButton text='' defaultHref='/select'></IonBackButton>
                </IonButtons>
                <h2 className='header-title'>{title}</h2>
                <IonButtons slot='end'>
                    <IonButton id={settingsToggleBtnId}>
                        <IonIcon color='primary' slot='icon-only' icon={informationCircleOutline}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}