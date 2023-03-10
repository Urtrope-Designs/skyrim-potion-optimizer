import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from "@ionic/react";
import { close, flask } from "ionicons/icons";
import { useEffect, useState } from "react";
import { dataManager } from "../services/DataManager";
import { dLCService } from "../services/DLCService";
import { recipeService } from "../services/RecipeService";
import { IAvailabilityOptionsSelection } from "../types/AvailabilityOptionsSelection";
import { IDLCViewmodel } from "../types/DLCViewmodel";
import { ALL_DLC_INSTANCES, ALL_RECIPES, DEFAULT_AVAILABILITY_OPTIONS_SELECTION } from "../utils/constants";

interface UserSettingsProps {
    dismiss?: () => void;
}

async function resetToAllAvailableRecipes() {
    const availableRecipes = await recipeService.filterCurrentlyAvailableRecipes(ALL_RECIPES);
    dataManager.setSelectedRecipeIds(availableRecipes.map(recipe => recipe.id));
}

export const UserSettings: React.FC<UserSettingsProps> = ({dismiss}) => {
    const [dLCs, updateDLCs] = useState<IDLCViewmodel[]>([]);
    const [availabilityOptionsSelection, updateAvailabilityOptionsSelection] = useState<IAvailabilityOptionsSelection>(DEFAULT_AVAILABILITY_OPTIONS_SELECTION);

    useEffect(() => {
        dataManager.includedDLCIds$.subscribe(includedDLCIds => {
            const dLCVMs = dLCService.getDLCViewmodels(ALL_DLC_INSTANCES, includedDLCIds);
            updateDLCs(dLCVMs)
        });
        dataManager.ingredientAvailabilityOptions$.subscribe(availabilityOptionsSelection => {
            updateAvailabilityOptionsSelection(availabilityOptionsSelection);
        });
    }, []);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    {dismiss && 
                        <IonButtons slot='end'>
                            <IonButton onClick={dismiss}>
                                <IonIcon slot='icon-only' icon={close}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    }
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Ingredient Availability</IonLabel>
                    </IonListHeader>
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>DLCs</IonLabel>
                        </IonItemDivider>
                        { 
                            dLCs.map(dLC => {
                                return (
                                    <IonItem key={dLC.dLCId}>
                                        <IonCheckbox slot='start' checked={dLC.isSelected} onIonChange={(event) => dataManager.updateDLCInclusion(dLC.dLCId, event.detail.checked)}></IonCheckbox>
                                        <IonLabel>{dLC.dLCName}</IonLabel>
                                    </IonItem>
                                )
                            })
                        }
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>Other Settings</IonLabel>
                        </IonItemDivider>
                        <IonItem>
                            <IonCheckbox slot='start' checked={availabilityOptionsSelection.noMerchants} onIonChange={(event) => dataManager.updateIngredientAvailabilityOptions('noMerchants', event.detail.checked)}></IonCheckbox>
                            <IonLabel class="ion-text-wrap">Include ingredients that can't be bought from merchants</IonLabel>
                        </IonItem>
                    </IonItemGroup>
                </IonList>
                <IonButton expand='block' className='ion-padding' onClick={() => {resetToAllAvailableRecipes(); dismiss?.(); }} routerLink='/watchlist' routerDirection='none'>
                    Start with all available
                    <IonIcon slot='end' icon={flask}></IonIcon>
                </IonButton>
            </IonContent>
        </>
    )
}
