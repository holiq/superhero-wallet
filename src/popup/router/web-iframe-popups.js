import { IN_POPUP } from '../../lib/environment';

import ConfirmConnect from '../pages/Popups/Connect.vue';
import ConfirmRawSign from '../components/Modals/ConfirmRawSign.vue';
import ConfirmTransactionSign from '../components/Modals/ConfirmTransactionSign.vue';
import MessageSign from '../pages/Popups/MessageSign.vue';

export default process.env.PLATFORM === 'web' && IN_POPUP
  ? [
    { name: 'confirm-connect', component: ConfirmConnect },
    { name: 'confirm-raw-sign', component: ConfirmRawSign },
    { name: 'confirm-transaction-sign', component: ConfirmTransactionSign },
    { name: 'confirm-message-sign', component: MessageSign },
  ].map(({ name, component }) => ({
    name: `web-iframe-popup-${name}`,
    path: `/web-iframe-popup/${name}`,
    component: {
      functional: true,
      render: (createElement) => {
        const unloadHandler = () => window.popupProps.reject(new Error('Rejected by user'));
        window.addEventListener('beforeunload', unloadHandler);
        const closingWrapper = (f) => (...args) => {
          f(...args);
          window.removeEventListener('beforeunload', unloadHandler);
          window.close();
        };

        return createElement(component, {
          props: {
            ...window.popupProps,
            resolve: closingWrapper(window.popupProps.resolve),
            reject: closingWrapper(window.popupProps.reject),
          },
        });
      },
    },
    meta: {
      notPersist: true,
    },
  }))
  : [];
