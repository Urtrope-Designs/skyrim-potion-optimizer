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
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RecipesTab } from './pages/RecipesTab';
import { WatchListTab } from './pages/WatchListTab';
import { storage } from './services/Storage';
import { BEST_RECIPES, DLC_MAPPINGS, STORAGE_KEY_INCLUDED_DLCS, STORAGE_KEY_SELECTED_RECIPES } from './utils/constants';

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
import { distinctUntilChanged, skip } from 'rxjs';
import './App.css';
import { dataManager } from './services/DataManager';
import './theme/variables.css';

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
                <IonIcon icon={ellipse} />
                <IonLabel>Watch List</IonLabel>
              </IonTabButton>
              <IonTabButton tab="recipes" href="/recipes">
                <IonIcon icon={triangle} />
                <IonLabel>Recipes</IonLabel>
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
  const recipeIds: number[] = await storage.get(STORAGE_KEY_SELECTED_RECIPES);
  if (DLCIds) {
    const DLCs = DLC_MAPPINGS.filter(dlcM => DLCIds.includes(dlcM.id));
    dataManager.setIncludedDLCs(DLCs);
  }
  if (recipeIds) {
    const recipes = BEST_RECIPES.filter(r => recipeIds.includes(r.id));
    dataManager.setSelectedRecipes(recipes);
  }
}

function initializeStorageUpdateHandlers() {
  dataManager.includedDLCs$.pipe(skip(1), distinctUntilChanged()).subscribe(DLCs => {
    storage.set(STORAGE_KEY_INCLUDED_DLCS, DLCs.map(dlc => dlc.id));
  });
  dataManager.selectedRecipes$.pipe(skip(1), distinctUntilChanged()).subscribe(recipes => {
    storage.set(STORAGE_KEY_SELECTED_RECIPES, recipes.map(r => r.id));
  });
}