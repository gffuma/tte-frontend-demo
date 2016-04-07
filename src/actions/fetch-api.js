import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

const API_URL = 'https://tte.trizero.biz';
// i love my token <3
const TOKEN = 'MTQ1ODMxOTU2OA==.8LfkVjFEq4NAtLImtAZfjruCAPaajyU6o6lHw1mUnRkJGEMzUk2hRnWt5uKxP1l8UwFgkFrL1X3DfMFKkav';

function mergeAuthTokenConfig(config={}) {
  const authtoken = `Bearer ${TOKEN}`;
  return { ...config, headers: { ...config.headers, Authorization: authtoken } };
}

export default function fetchApi(url, additionalConfig = {}) {
  const config = mergeAuthTokenConfig(additionalConfig);
  return fetch(API_URL + url, config)
    .then(response => response.json())
    .then(json => camelizeKeys(json))
};
