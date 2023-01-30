import { IDLCInstance } from "../types/DLCInstance";
import { IDLCViewmodel } from "../types/DLCViewmodel";

export const dLCService = {
    getDLCInstancesById: (dLCIds: number[], allDLCs: IDLCInstance[]): IDLCInstance[] => {
        return dLCIds.map(id => {
            const dLC = allDLCs.find(dLC => dLC.id === id);
            if (dLC === undefined) {
                throw new Error('Invalid dLCId provided: ' + id);
            }

            return dLC;
        });
    },
    getDLCViewmodels: (dLCs: IDLCInstance[], selectedDLCIds: number[]): IDLCViewmodel[] => {
        return dLCs.map(dLC => {
            const viewmodel: IDLCViewmodel = {
                dLCId: dLC.id,
                dLCName: dLC.name,
                isSelected: selectedDLCIds.includes(dLC.id),
            }
            return viewmodel;
        });
    },
}