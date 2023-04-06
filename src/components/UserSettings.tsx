import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { dLCService } from "../services/DLCService";
import { dataManager } from "../services/DataManager";
import { IAvailabilityOptionsSelection } from "../types/AvailabilityOptionsSelection";
import { IDLCViewmodel } from "../types/DLCViewmodel";
import { ALL_DLC_INSTANCES, DEFAULT_AVAILABILITY_OPTIONS_SELECTION } from "../utils/constants";
import { IIdSelectionUpdate } from "../types/IdSelectionUpdate";

interface UserSettingsProps {
    dismiss?: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({dismiss}) => {
    const standardDLCIds = [0,1,2];
    const anniversaryDLCIds = [3];
    const getDLCSelctions = (dLCIds: number[], isSelected: boolean): IIdSelectionUpdate[] => {
        return dLCIds.map(id => ({id, isSelected}));
    }
    const getStandardDLCSelections = (isSelected: boolean): IIdSelectionUpdate[] => {
        return getDLCSelctions(standardDLCIds, isSelected);
    }
    const getAnniversaryDLCSelection = (isSelected: boolean): IIdSelectionUpdate[] => {
        return getDLCSelctions(anniversaryDLCIds, isSelected);
    }
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

    const isDLCOptionSelected = (dLCIds: number[]): boolean => {
        return dLCIds.every(id => dLCs.find(dlc => dlc.dLCId === id)?.isSelected);
    }
    const isStandardDLCOptionSelected = (): boolean => {
        return isDLCOptionSelected(standardDLCIds);
    } 
    const isAnniversaryOptionSelected = (): boolean => {
        return isDLCOptionSelected(anniversaryDLCIds);
    }

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
                    <IonTitle><h2>Settings</h2></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Ingredient Availability</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonCheckbox slot='start' checked={isStandardDLCOptionSelected()} onIonChange={(event) => dataManager.updateDLCInclusion(getStandardDLCSelections(event.detail.checked))}></IonCheckbox>
                        <IonLabel class="ion-text-wrap">Include ingredients from standard DLCs (Dawnguard, Dragonborn, Hearthfire)</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonCheckbox slot='start' checked={isAnniversaryOptionSelected()} onIonChange={(event) => dataManager.updateDLCInclusion(getAnniversaryDLCSelection(event.detail.checked))}></IonCheckbox>
                        <IonLabel class="ion-text-wrap">Include ingredients from Creation Club/Anniversary Edition add-ons</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonCheckbox slot='start' checked={availabilityOptionsSelection.noMerchants} onIonChange={(event) => dataManager.updateIngredientAvailabilityOptions('noMerchants', event.detail.checked)}></IonCheckbox>
                        <IonLabel class="ion-text-wrap">Include ingredients that can't be bought from merchants</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </>
    )
}
