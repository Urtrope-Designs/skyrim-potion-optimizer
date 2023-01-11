import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, triangle } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { RecipesTab } from './pages/RecipesTab';
import { WatchListTab } from './pages/WatchListTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/recipes">
            <RecipesTab/>
          </Route>
          <Route exact path="/watchlist">
            <WatchListTab/>
          </Route>
          <Route exact path="/">
            <Redirect to="/watchlist" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="recipes" href="/recipes">
            <IonIcon icon={triangle} />
            <IonLabel>Recipes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="watchList" href="/watchlist">
            <IonIcon icon={ellipse} />
            <IonLabel>Watch List</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
