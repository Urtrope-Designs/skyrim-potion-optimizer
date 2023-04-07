import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";

interface DismissablePageProps {
    children: React.ReactNode;
    headerText: string;
    onDismiss?: () => void;
}

export const DismissablePage: React.FC<DismissablePageProps> = ({children, headerText, onDismiss}) => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                {onDismiss && 
                    <IonButtons slot='end'>
                        <IonButton onClick={onDismiss}>
                            <IonIcon slot='icon-only' icon={close}></IonIcon>
                        </IonButton>
                    </IonButtons>
                }
                <IonTitle><h2>{headerText}</h2></IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding-horizontal'>
            {children}
        </IonContent>
    </IonPage>
)