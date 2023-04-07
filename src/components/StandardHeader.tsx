import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonToolbar, useIonModal } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { DismissablePage } from "../pages/DismissablePage";
import { AboutPanel } from "./AboutPanel";

import './StandardHeader.css';

interface StandardHeaderBaseProps {
    showBackButton?: boolean;
}
interface StandardHeaderWithTitleProps extends StandardHeaderBaseProps {
    title: string;
    children?: never;
} 
interface StandardHeaderWithChildrenProps extends StandardHeaderBaseProps {
    children: React.ReactNode;
    title?: never;
}

export const StandardHeader: React.FC<StandardHeaderWithTitleProps | StandardHeaderWithChildrenProps> = ({children, title, showBackButton = true}) => {
    const [present, dismiss] = useIonModal(DismissablePage, {
            onDismiss: () => dismiss(),
            headerText: 'About',
            children: <AboutPanel></AboutPanel>,
        });

    return (
        <IonHeader>
            <IonToolbar className='flex'>
                {showBackButton && 
                    <IonButtons slot='start'>
                        <IonBackButton text='' defaultHref='/select'></IonBackButton>
                    </IonButtons>
                }
                { children ?? <h2 className='header-title'>{title}</h2> }
                <IonButtons slot='end'>
                    <IonButton onClick={() => present()}>
                        <IonIcon color='primary' slot='icon-only' icon={informationCircleOutline}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}