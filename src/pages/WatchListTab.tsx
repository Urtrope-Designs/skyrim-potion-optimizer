import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import './WatchListTab.css';

export const WatchListTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingredient Watch List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <p>Head to the <IonRouterLink routerLink='/recipes' routerDirection='none'>Recipes</IonRouterLink> tab to select the ingredients to watch for.</p>
      </IonContent>
    </IonPage>
  );
};
