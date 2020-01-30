import Vue from 'vue';
import Vuex from 'vuex';

import { getters } from './getters';
import mutations from './mutations';
import actions from './actions';
import { POPUP_PROPS } from '../popup/utils/popup-messages';
import { networks } from '../popup/utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    subaccounts: [],
    account: {},
    activeAccount: 0,
    names: [],
    pendingNames: [],
    wallet: [],
    balance: 0,
    current: {
      network: 'Testnet',
      language: '',
      token: 0
    },
    network: networks,
    userNetworks: [],
    popup: Object.assign({}, POPUP_PROPS),
    isLoggedIn: false,
    transactions: {
      latest: [],
      all: [],
      new: []
    },
    sdk: null,
    aeppPopup: false,
    ledgerApi: null,
    background:null,
    txAdvancedMode:false,
    tipping:null,
    tippingReceiver: {}
  },
  getters,
  mutations,
  actions,
  plugins: [ ]
});