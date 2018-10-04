import { GET_PLAN, GET_PLAN_FOR_EDITION, USER_LOGGED_OUT, ADD_TO_MEAL_PLAN, REMOVE_FROM_MEAL_PLAN, CHANGE_MEAL_PLAN_NAME } from "../types";

export default function mealPlan(state = {}, action = {}) {
    switch (action.type) {
    case GET_PLAN:
        return {...state, mealPlan: action.plan}
    case GET_PLAN_FOR_EDITION:
        return {...state, mealPlan: action.plan}
    case CHANGE_MEAL_PLAN_NAME:
        const mpn = {...state.mealPlan }; // eslint-disable-line
        mpn.name = action.name;
        return {...state, mealPlan: mpn}
    case ADD_TO_MEAL_PLAN:
        const mp = {...state.mealPlan }; // eslint-disable-line
        if(typeof(mp.dailyPlans.find(x=>x.day===action.day)) === 'undefined')
        {
            mp.dailyPlans.push({day:action.day, breakfast:{products:[]}, snap: {products:[]}, lunch:{products:[]}, supper:{products:[]}, dinner:{products:[]}});
        }
        if(action.meal==='breakfast')
        {
            mp.dailyPlans.find(x=>x.day===action.day).breakfast.products.push({productId:action.productId, quantity:action.quantity})
        }
        if(action.meal==='snap')
        {
            mp.dailyPlans.find(x=>x.day===action.day).snap.products.push({productId:action.productId, quantity:action.quantity})
        }
        if(action.meal==='lunch')
        {
            mp.dailyPlans.find(x=>x.day===action.day).lunch.products.push({productId:action.productId, quantity:action.quantity})
        }
        if(action.meal==='dinner')
        {
            mp.dailyPlans.find(x=>x.day===action.day).dinner.products.push({productId:action.productId, quantity:action.quantity})
        }
        if(action.meal==='supper')
        {
            mp.dailyPlans.find(x=>x.day===action.day).supper.products.push({productId:action.productId, quantity:action.quantity})
        }
        return {...state, mealPlan: mp}
    case REMOVE_FROM_MEAL_PLAN:
    const mpr = {...state.mealPlan }; // eslint-disable-line
        if(action.meal==='breakfast')
        {
            const index = mpr.dailyPlans.find(x=>x.day===action.day).breakfast.products.findIndex(y=>y.productId === action.productId && y.quantity === action.quantity);
            mpr.dailyPlans.find(x=>x.day===action.day).breakfast.products.splice(index, 1);
        }
        if(action.meal==='snap')
        {
            const index = mpr.dailyPlans.find(x=>x.day===action.day).snap.products.findIndex(y=>y.productId === action.productId && y.quantity === action.quantity);
            mpr.dailyPlans.find(x=>x.day===action.day).snap.products.splice(index, 1);
        }
        if(action.meal==='lunch')
        {
            const index = mpr.dailyPlans.find(x=>x.day===action.day).lunch.products.findIndex(y=>y.productId === action.productId && y.quantity === action.quantity);
            mpr.dailyPlans.find(x=>x.day===action.day).lunch.products.splice(index, 1);
        }
        if(action.meal==='dinner')
        {
            const index = mpr.dailyPlans.find(x=>x.day===action.day).dinner.products.findIndex(y=>y.productId === action.productId && y.quantity === action.quantity);
            mpr.dailyPlans.find(x=>x.day===action.day).dinner.products.splice(index, 1);
        }
        if(action.meal==='supper')
        {
            const index = mpr.dailyPlans.find(x=>x.day===action.day).supper.products.findIndex(y=>y.productId === action.productId && y.quantity === action.quantity);
            mpr.dailyPlans.find(x=>x.day===action.day).supper.products.splice(index, 1);
        }
        return {...state, mealPlan: mpr}
    case USER_LOGGED_OUT:
        return {...state, mealPlan: {}}    
    default:
        return state;
    }
}