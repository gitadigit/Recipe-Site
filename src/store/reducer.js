import * as actionsName from './action'

const initlaseState =
{
    user:{},
    recipes: [],
    category: [],
    shoppingCart: []

}

const reducer = (state = initlaseState, action) => {
    switch (action.type) {

        case actionsName.GET_USER: {
            const user = action.payload;
            state.user = user;
            return { ...state, user }
        }

        //מתכונים
        case actionsName.GET_RECIPES: {
            const recipies = action.payload;
            state.recipes = recipies;
            return { ...state, recipies }
        }

        case actionsName.DELETE_RECIPES: {
            const delete_recipe = state.recipes.filter(d => d.Id !== action.payload)
            state.recipes = delete_recipe;
            return { ...state, delete_recipe }
        }

        case actionsName.EDIT_RECIPES: {
            const recipe = action.payload;
            const index = state.recipes.findIndex((x) => x.Id === recipe.Id)
            state.recipes[index] = recipe;
            return { ...state, recipe }
        }

        case actionsName.ADD_RECIPES: {
            const recipe = action.payload;
            state.recipes.push(recipe)
            return { ...state, recipe }
        }


        //קטגוריה 
        case actionsName.GET_CATEGORY: {
            const categories = action.payload;
            state.category = categories;
            return { ...state, categories }
        }

        case actionsName.ADD_CATEGORY: {
            const categor = action.payload;
            state.category.push(categor)
            return { ...state, categor }
        }

        //סל קניות 
        case actionsName.ADD_SHOPPING: {
            const prodect = action.payload;
            const index = state.shoppingCart.findIndex(item => item.Name === action.payload.Name);

            if (index !== -1) {
                state.shoppingCart[index].Count= Number(action.payload.Count);
            } else {
                state.shoppingCart.push(prodect);
            }
            return { ...state, prodect }
        }
        case actionsName.GET_SHOPPING: {
            const prodect = action.payload;
            state.shoppingCart = prodect;
            return { ...state, prodect }
        }

        case actionsName.DELETE_SHOPPING: {
            const delete_prodect = state.shoppingCart.filter(s => s.Id !== action.payload)
            state.shoppingCart = delete_prodect;
            return { ...state, delete_prodect }
        }

        case actionsName.EDIT_SHOPPING: {
            const edit_shopping = action.payload;
            const index = state.shoppingCart.findIndex((s) => s.Id === edit_shopping.Id)
            state.shoppingCart[index] = edit_shopping;
            return { ...state, edit_shopping }
        }

        default: {

        }

    }

}
export default reducer;