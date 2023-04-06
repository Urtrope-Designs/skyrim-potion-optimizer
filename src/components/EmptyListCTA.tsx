import { IonRouterLink } from "@ionic/react";

interface EmptyListCTAProps {
    listItemType: string;
}

export const EmptyListCTA: React.FC<EmptyListCTAProps> = ({listItemType}) => (
    <p className='ion-padding'>
        Looks like you've worked through all the { listItemType }s in your selected Alchemy session. 
        <br /><br />
        Tap the "Potion" icon above or 
            <IonRouterLink routerLink='/select' color='primary'> start a new potion brewing session</IonRouterLink>
        !
    </p>
)