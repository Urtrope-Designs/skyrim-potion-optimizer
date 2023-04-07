import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";

interface DismissablePageProps {
    children: React.ReactNode;
    headerText: string;
    dismiss?: () => void;
}

export const DismissablePage: React.FC<DismissablePageProps> = ({children, headerText, dismiss}) => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                {dismiss && 
                    <IonButtons slot='end'>
                        <IonButton onClick={dismiss}>
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