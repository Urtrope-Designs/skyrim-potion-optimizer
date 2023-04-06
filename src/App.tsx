import {
  IonApp, IonRouterOutlet,
  IonSplitPane, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { distinctUntilChanged, skip } from 'rxjs';
import { RecipesPage } from './pages/RecipesPage';
import { WatchListTab } from './pages/WatchListTab';
import { dataManager } from './services/DataManager';
import { storage } from './services/Storage';
import { IAvailabilityOptionsSelection } from './types/AvailabilityOptionsSelection';
import { ALL_DLC_INSTANCES, DEFAULT_AVAILABILITY_OPTIONS_SELECTION, STORAGE_KEY_AVAILABILITY_OPTIONS, STORAGE_KEY_INCLUDED_DLCS, STORAGE_KEY_SELECTED_ALCHEMY_SESSION, STORAGE_KEY_SELECTED_RECIPES } from './utils/constants';

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
import { AlchemySessionSelectionPage } from './pages/AlchemySessionSelectionPage';

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
          <IonSplitPane contentId='main'>
            <IonRouterOutlet id='main'>
              <Route exact path='/recipes'>
                <RecipesPage/>
              </Route>
              <Route exact path='/watchlist'>
                <WatchListTab/>
              </Route>
              <Route exact path='/select'>
                <AlchemySessionSelectionPage/>
              </Route>
              <Route>
                <Redirect to='/recipes' />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
};

async function initializeApp() {
  await initializeValuesFromStorage();
  initializeStorageUpdateHandlers();
}

async function initializeValuesFromStorage() {
  const DLCIds: number[] | undefined = await storage.get(STORAGE_KEY_INCLUDED_DLCS);
  const availabilityOptions: IAvailabilityOptionsSelection | undefined = await storage.get(STORAGE_KEY_AVAILABILITY_OPTIONS);
  const recipeIds: number[] | undefined = await storage.get(STORAGE_KEY_SELECTED_RECIPES);
  const alchemySessionId: number | undefined = await storage.get(STORAGE_KEY_SELECTED_ALCHEMY_SESSION);

  dataManager.setIncludedDLCIds(DLCIds ?? ALL_DLC_INSTANCES.map(dLC => dLC.id));
  dataManager.setIngredientAvailabilityOptions({...DEFAULT_AVAILABILITY_OPTIONS_SELECTION, ...availabilityOptions});
  dataManager.setSelectedAlchemySessionId(alchemySessionId ?? -1);
  dataManager.setSelectedRecipeIds(recipeIds ?? []);
}

function initializeStorageUpdateHandlers() {
  dataManager.includedDLCIds$.pipe(skip(1), distinctUntilChanged()).subscribe(dLCIds => {
    storage.set(STORAGE_KEY_INCLUDED_DLCS, dLCIds);
  });
  dataManager.ingredientAvailabilityOptions$.pipe(skip(1), distinctUntilChanged()).subscribe(availabilityOptions => {
    storage.set(STORAGE_KEY_AVAILABILITY_OPTIONS, availabilityOptions)
  })
  dataManager.selectedAlchemySessionId$.pipe(skip(1), distinctUntilChanged()).subscribe(alchemySessionId => {
    storage.set(STORAGE_KEY_SELECTED_ALCHEMY_SESSION, alchemySessionId);
  });
  dataManager.selectedRecipeIds$.pipe(skip(1), distinctUntilChanged()).subscribe(recipeIds => {
    storage.set(STORAGE_KEY_SELECTED_RECIPES, recipeIds);
  });
}