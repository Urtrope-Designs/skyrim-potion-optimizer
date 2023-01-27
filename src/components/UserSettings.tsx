import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { dataManager } from "../services/DataManager";
import { IDLCInstance } from "../types/DLCInstance";
import { DLC_MAPPINGS } from "../utils/constants";

interface UserSettingsProps {
    dismiss?: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({dismiss}) => {
    const [includedDLCs, updateIncludedDLCs] = useState<IDLCInstance[]>([]);

    useEffect(() => {dataManager.includedDLCs$.subscribe(updateIncludedDLCs)}, []);

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
                        DLC_MAPPINGS.map(DLC => {
                            return (
                                <IonItem key={DLC.id}>
                                    <IonCheckbox slot='start' checked={includedDLCs.some(dlc => dlc.id === DLC.id)} onIonChange={(event) => dataManager.updateDLCInclusion(DLC, event.detail.checked)}></IonCheckbox>
                                    <IonLabel>{DLC.name}</IonLabel>
                                </IonItem>
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </>
    )
}
