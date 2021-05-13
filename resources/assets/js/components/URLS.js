export const BASE_URL = 'http://localhost:8000/'
export const API_URL = BASE_URL + 'api/v1/'
export const AP_BASE_URL = 'http://localhost:8001/'
export const AP_API_URL = AP_BASE_URL + 'api/'
export const STORAGE_URL = BASE_URL + 'storage/'
export const COUNTRIES = {
    index: AP_API_URL + 'countries'
}
export const ONBOARDING_DATA = {
    store: AP_API_URL + 'budgeting_tool/onboarding_data',
    show: API_URL + 'budgeting_tool/onboarding_data',
}
export const RECURRENCES ={
    store : API_URL + 'recurrences'
}
