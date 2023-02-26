import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { settings } from "ionicons/icons";

interface StandardHeaderProps {
    title: string;
    settingsToggleBtnId: string;
}

export const StandardHeader: React.FC<StandardHeaderProps> = ({title, settingsToggleBtnId}) => {
    return ( 
        <IonHeader>
            <IonToolbar>
            {/* <IonButtons slot='start'>
                <IonButton onClick={() => {}}>
                    <IonIcon color='primary' slot='icon-only' icon={create}></IonIcon>
                </IonButton>
            </IonButtons> */}
            <IonButtons slot='end'>
                <IonButton id={settingsToggleBtnId}>
                    <IonIcon color='primary' slot='icon-only' icon={settings}></IonIcon>
                </IonButton>
            </IonButtons>
            <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}