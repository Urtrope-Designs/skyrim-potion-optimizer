import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { take } from "rxjs";
import { dataManager } from "../services/DataManager";
import { recipeService } from "../services/RecipeService";
import { ALL_RECIPES } from "../utils/constants";

export const Menu: React.FC = () => {
    const menuRef = useRef<HTMLIonMenuElement | null>(null);
    useEffect(() => {
        dataManager.selectedRecipeIds$.pipe(take(1)).subscribe(recipeIds => {
            if (recipeIds.length < 1) {
                menuRef.current?.open();
            }
        })
    }, [])

    return (
        <IonMenu contentId="main" ref={menuRef}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuToggle>
                            <IonButton>
                                <IonIcon slot='icon-only' icon={close}></IonIcon>
                            </IonButton>
                        </IonMenuToggle>
                    </IonButtons>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel className='ion-text-wrap'><h2>What kind of potions would you like to brew?</h2></IonLabel>
                    </IonItem>
                    {
                        menuActions.map(action => {
                            return (
                                <IonMenuToggle>
                                    <IonItem routerLink='/recipes' onClick={action.clickHandler} detail={true}>
                                        <IonLabel className='ion-text-wrap'>{action.labelText}</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

interface AlchemySessionAction {
    clickHandler: () => void;
    labelText: string;
}

const menuActions: AlchemySessionAction[] = [
    {
        clickHandler: () => resetRecipesWithIngredient(84),
        labelText: 'Best leveling potions: with Salmon Roe',
    },
    {
        clickHandler: () => resetRecipesWithIngredient(43),
        labelText: 'Best leveling potions: with Giant\'s Toe',
    },
    {
        clickHandler: () => resetRecipesExcludingIngredients([84, 43]),
        labelText: 'Best leveling potions: without Salmon Roe or Giant\'s Toe',
    },
]

async function resetRecipesWithIngredient(ingredientId: number) {
    const allAvailableRecipes = await recipeService.filterCurrentlyAvailableRecipes(ALL_RECIPES);
    const recipesWithIngredient = allAvailableRecipes.filter(recipe => recipe.ingredientIds.includes(ingredientId));

    dataManager.setSelectedRecipeIds(recipesWithIngredient.map(recipe => recipe.id));
}

async function resetRecipesExcludingIngredients(ingredientIdsToExclude: number[]) {
    const allAvailableRecipes = await recipeService.filterCurrentlyAvailableRecipes(ALL_RECIPES);
    const recipesExcludingIngredients = allAvailableRecipes.filter(recipe => recipe.ingredientIds.find(id => ingredientIdsToExclude.includes(id)) === undefined);

    dataManager.setSelectedRecipeIds(recipesExcludingIngredients.map(recipe => recipe.id));
}
