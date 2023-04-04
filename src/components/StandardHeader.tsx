import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { flask, settings } from "ionicons/icons";

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
                    <IonButton routerLink="/select">
                        <IonIcon color='primary' slot='icon-only' icon={flask}></IonIcon>
                    </IonButton>
                </IonButtons>
                <span className='header-title'>{title}</span>
                <IonButtons slot='end'>
                    <IonButton id={settingsToggleBtnId}>
                        <IonIcon color='primary' slot='icon-only' icon={settings}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}