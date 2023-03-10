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
import { flask, listCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RecipesTab } from './pages/RecipesTab';
import { WatchListTab } from './pages/WatchListTab';
import { storage } from './services/Storage';
import { ALL_DLC_INSTANCES, ALL_RECIPES, DEFAULT_AVAILABILITY_OPTIONS_SELECTION, STORAGE_KEY_AVAILABILITY_OPTIONS, STORAGE_KEY_INCLUDED_DLCS, STORAGE_KEY_SELECTED_RECIPES } from './utils/constants';
import { distinctUntilChanged, skip } from 'rxjs';
import { dataManager } from './services/DataManager';
import { IAvailabilityOptionsSelection } from './types/AvailabilityOptionsSelection';

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

import './App.css';

setupIonicReact();

initializeApp();

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    storage.ready().then(() => setLoading(false));
  }, []);

  return loading ? (
      <div>Loading...</div>
    ) : (
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
              <IonTabButton tab="watchList" href="/watchlist">
                <IonIcon icon={listCircleOutline} />
                <IonLabel>Gather</IonLabel>
              </IonTabButton>
              <IonTabButton tab="recipes" href="/recipes">
                <IonIcon icon={flask} />
                <IonLabel>Brew</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
};

async function initializeApp() {
  await initializeValuesFromStorage();
  initializeStorageUpdateHandlers();
}

async function initializeValuesFromStorage() {
  const DLCIds: number[] = await storage.get(STORAGE_KEY_INCLUDED_DLCS);
  const availabilityOptions: IAvailabilityOptionsSelection = await storage.get(STORAGE_KEY_AVAILABILITY_OPTIONS);
  const recipeIds: number[] = await storage.get(STORAGE_KEY_SELECTED_RECIPES);

  dataManager.setIncludedDLCIds(DLCIds || ALL_DLC_INSTANCES.map(dLC => dLC.id));
  dataManager.setIngredientAvailabilityOptions({...DEFAULT_AVAILABILITY_OPTIONS_SELECTION, ...availabilityOptions});
  dataManager.setSelectedRecipeIds(recipeIds || ALL_RECIPES.map(r => r.id));
}

function initializeStorageUpdateHandlers() {
  dataManager.includedDLCIds$.pipe(skip(1), distinctUntilChanged()).subscribe(dLCIds => {
    storage.set(STORAGE_KEY_INCLUDED_DLCS, dLCIds);
  });
  dataManager.ingredientAvailabilityOptions$.pipe(skip(1), distinctUntilChanged()).subscribe(availabilityOptions => {
    storage.set(STORAGE_KEY_AVAILABILITY_OPTIONS, availabilityOptions)
  })
  dataManager.selectedRecipeIds$.pipe(skip(1), distinctUntilChanged()).subscribe(recipeIds => {
    storage.set(STORAGE_KEY_SELECTED_RECIPES, recipeIds);
  });
}