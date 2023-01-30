import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { dataManager } from "../services/DataManager";
import { dLCService } from "../services/DLCService";
import { IDLCViewmodel } from "../types/DLCViewmodel";
import { ALL_DLC_INSTANCES } from "../utils/constants";

interface UserSettingsProps {
    dismiss?: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({dismiss}) => {
    const [dLCs, updateDLCs] = useState<IDLCViewmodel[]>([]);

    useEffect(() => {
        dataManager.includedDLCIds$.subscribe(includedDLCIds => {
            const dLCVMs = dLCService.getDLCViewmodels(ALL_DLC_INSTANCES, includedDLCIds);
            updateDLCs(dLCVMs)
        })
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
                        <IonLabel>DLCs</IonLabel>
                    </IonListHeader>
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
                </IonList>
            </IonContent>
        </>
    )
}
