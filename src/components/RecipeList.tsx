import { IonList } from "@ionic/react";
import { IRecipe } from "../types/Recipe";
import { RecipeSummaryEntry } from "./RecipeSummaryEntry";

interface RecipeListProps {
  recipes: IRecipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <IonList>
        {
            recipes.map(recipe => {
                return <RecipeSummaryEntry key={recipe.ingredients.join(',')} recipe={recipe}></RecipeSummaryEntry>
            })
        }
    </IonList>
  );
};

