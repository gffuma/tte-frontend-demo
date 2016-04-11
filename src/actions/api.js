import fetch from 'isomorphic-fetch';
import url from 'url';
import qs from 'qs';
import { camelizeKeys } from 'humps';
import { merge } from 'lodash';
import {
  SET_API_TOKEN,
  SET_API_LOCALE
} from '../constants/ActionTypes';

const API_URL = 'https://tte.trizero.biz';

function mergeAuthTokenConfig(token, config={}) {
  const authtoken = `Bearer ${token}`;
  return { ...config, headers: { ...config.headers, Authorization: authtoken } };
}

function mergeQueryStringWithLocale(locale, callUrl) {
  const { pathname, query } = url.parse(callUrl);
  const queryWithLocale = qs.stringify(merge(qs.parse(query), {locale}));
  return pathname + '?' + queryWithLocale;
}

export function fetchApi(state, callUrl, additionalConfig = {}) {
  const { token, locale } = state.api;

  // Merge token to config if present in state
  let config;
  if (token) {
    config = mergeAuthTokenConfig(token, additionalConfig);
  } else {
    config = additionalConfig;
  }

  // Add locale to query string if present in state
  let fullUrl;
  if (locale) {
    fullUrl = API_URL + mergeQueryStringWithLocale(locale, callUrl);
  } else {
    fullUrl = API_URL + callUrl;
  }

  return fetch(fullUrl, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return camelizeKeys(json);
    });
};

export function setApiToken(token) {
  return { type: SET_API_TOKEN, token };
};

export function setApiLocale(locale) {
  return { type: SET_API_LOCALE, locale };
};
