import axios from 'axios'
import {COUNTRIES, ONBOARDING_DATA, RECURRENCES} from "./URLS";
import {csrfToken} from "../app_vue";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN']= csrfToken
axios.defaults.headers.common['Accept']= 'application/json'

export const getCountries = () => {
    return axios.get(COUNTRIES.index)
}
export const getOnboardingData = () => {
    return axios.get(ONBOARDING_DATA.show)
}
export const storeOnboardingData = data => {
    return axios.put(ONBOARDING_DATA.store, data)
}
export const storeRecurrences = data => {
    return axios.post(RECURRENCES.store,data)
}
