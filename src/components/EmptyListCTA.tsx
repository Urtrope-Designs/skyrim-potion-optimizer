import { IonLabel } from "@ionic/react";

interface EmptyListCTAProps {
    listItemType: string;
    restartCallback: () => void;
}

export const EmptyListCTA: React.FC<EmptyListCTAProps> = ({listItemType, restartCallback}) => (
    <p className='ion-padding'>
        Looks like you've worked through all the { listItemType }s that you selected. 
        <br /><br />
        <IonLabel color='primary' onClick={() => restartCallback()}>Restart your selected list</IonLabel> or click the back arrow above to select a new type of potion to brew!
    </p>
)