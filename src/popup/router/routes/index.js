import ConfirmTransactionSign from '../components/Modals/ConfirmTransactionSign.vue';
import ConfirmRawSign from '../components/Modals/ConfirmRawSign.vue';
import About from '../pages/About.vue';
import Account from '../pages/Account.vue';
import Accounts from '../pages/Accounts.vue';
import Address from '../pages/Address.vue';
import CommentNew from '../pages/CommentNew.vue';
import DonateError from '../pages/DonateError.vue';
import TokenDetails from '../pages/FungibleTokens/TokenDetails.vue';
import Balances from '../pages/FungibleTokens/Balances.vue';
import ImportAccount from '../pages/ImportAccount.vue';
import Index from '../pages/Index.vue';
import Intro from '../pages/Intro.vue';
import Invite from '../pages/Invite.vue';
import InviteClaim from '../pages/InviteClaim.vue';
import LanguageSettings from '../pages/LanguageSettings.vue';
import Auction from '../pages/Names/Auction.vue';
import AuctionBid from '../pages/Names/AuctionBid.vue';
import AuctionHistory from '../pages/Names/AuctionHistory.vue';
import AuctionList from '../pages/Names/AuctionList.vue';
import More from '../pages/More.vue';
import Names from '../pages/Names/Names.vue';
import NameClaim from '../pages/Names/Claim.vue';
import NamesList from '../pages/Names/List.vue';
import Networks from '../pages/Networks.vue';
import NotFound from '../pages/NotFound.vue';
import Notifications from '../pages/Notifications.vue';
import NotificationSettings from '../pages/NotificationSettings.vue';
import PermissionsDetails from '../pages/PermissionsDetails.vue';
import PermissionsSettings from '../pages/PermissionsSettings.vue';
import PopupConnect from '../pages/Popups/Connect.vue';
import PopupMessageSign from '../pages/Popups/MessageSign.vue';
import PrivacyPolicy from '../pages/PrivacyPolicy.vue';
import Retip from '../pages/Retip.vue';
import SecuritySettings from '../pages/SecuritySettings.vue';
import Transfer from '../pages/Transfer.vue';
import TransferSend from '../pages/TransferSend.vue';
import TransferReceive from '../pages/TransferReceive.vue';
import Settings from '../pages/Settings.vue';
import SignMessage from '../pages/SignMessage.vue';
import SuccessTip from '../pages/SuccessTip.vue';
import SignTransaction from '../pages/SignTransaction.vue';
import TermsOfService from '../pages/TermsOfService.vue';
import Tips from '../pages/Tips.vue';
import TipsSend from '../pages/TipsSend.vue';
import TipsClaim from '../pages/TipsClaim.vue';
import TransactionDetails from '../pages/TransactionDetails.vue';
import Transactions from '../pages/Transactions.vue';
import webIframePopups from './web-iframe-popups';

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '',
      navigation: false,
      ifNotAuthOnly: true,
      notPersist: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    meta: {
      title: 'accounts',
    },
  },
  {
    name: 'popup-sign-tx',
    path: '/popup-sign-tx',
    component: ConfirmTransactionSign,
    props: true,
    meta: {
      notPersist: true,
      hideTabBar: true,
    },
  },
  {
    name: 'popup-raw-sign',
    path: '/popup-raw-sign',
    component: ConfirmRawSign,
    props: true,
    meta: {
      notPersist: true,
      hideTabBar: true,
    },
  },
  {
    name: 'connect',
    path: '/connect',
    component: PopupConnect,
    props: true,
    meta: {
      notPersist: true,
      hideTabBar: true,
    },
  },
  {
    name: 'message-sign',
    path: '/message-sign',
    component: PopupMessageSign,
    props: true,
    meta: {
      notPersist: true,
      hideTabBar: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      title: 'settings',
      notRebrand: true,
    },
  },
  {
    path: '/settings/language',
    component: LanguageSettings,
    meta: {
      title: 'language',
      notRebrand: true,
    },
  },
  {
    path: '/settings/security',
    name: 'settings-security',
    component: SecuritySettings,
    meta: {
      title: 'security',
      notRebrand: true,
    },
  },
  {
    path: '/settings/networks',
    component: Networks,
    props: true,
    meta: {
      title: 'networks',
      notRebrand: true,
    },
  },
  {
    path: '/settings/permissions',
    component: PermissionsSettings,
    name: 'permissions-settings',
    meta: {
      title: 'permissionsSettings',
      notRebrand: true,
    },
  },
  {
    path: '/settings/permissions/:host',
    component: PermissionsDetails,
    name: 'permissions-details',
    meta: {
      title: 'permissionsDetails',
      notRebrand: true,
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'about',
      ifNotAuth: true,
      notRebrand: true,
    },
  },
  {
    path: '/about/termsOfService',
    component: TermsOfService,
    meta: {
      title: 'terms',
      ifNotAuth: true,
      notRebrand: true,
    },
  },
  {
    path: '/about/privacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: 'privacy',
      ifNotAuth: true,
      notRebrand: true,
    },
  },
  {
    path: '/tips',
    component: Tips,
    children: [{
      path: '',
      name: 'tips-send',
      component: TipsSend,
      props: true,
      meta: {
        title: 'tips',
        backButton: false,
      },
    }, {
      path: 'claim',
      name: 'tips-claim',
      component: TipsClaim,
      meta: {
        title: 'tips',
        backButton: false,
      },
    }],
  },
  {
    path: '/tip',
    redirect: '/tips',
  },
  {
    path: '/retip',
    component: Retip,
    meta: {
      title: 'send-tip',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    path: '/import-account',
    component: ImportAccount,
    meta: {
      title: 'importAccount',
      ifNotAuthOnly: true,
      notRebrand: true,
    },
  },
  {
    path: '/intro',
    component: Intro,
    meta: {
      ifNotAuthOnly: true,
      notPersist: true,
      notRebrand: true,
    },
  },

  {
    path: '/transactions',
    component: Transactions,
    meta: {
      title: 'transactions',
      notRebrand: true,
    },
  },
  {
    name: 'tx-details',
    path: '/transactions/:hash',
    component: TransactionDetails,
    props: true,
    meta: {
      title: 'tx-details',
      hideTabBar: true,
      newUI: true,
    },
  },
  {
    path: '/transfer',
    component: Transfer,
    children: [{
      path: '',
      name: 'transfer-send',
      component: TransferSend,
      props: true,
      meta: {
        title: 'transfer',
        backButton: false,
      },
    }, {
      path: 'receive',
      name: 'transfer-receive',
      component: TransferReceive,
      meta: {
        title: 'transfer',
        backButton: false,
      },
    }],
  },
  {
    path: '/success-tip',
    component: SuccessTip,
    name: 'success-tip',
    props: true,
    meta: {
      title: 'send',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    path: '/more',
    component: More,
    name: 'more',
    meta: {
      title: 'more',
      backButton: false,
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      title: 'notifications',
      notPersist: true,
    },
  },
  {
    path: '/notifications/settings',
    name: 'notification-settings',
    component: NotificationSettings,
    meta: {
      title: 'notification-settings',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    path: '/names',
    component: Names,
    props: true,
    children: [{
      path: '',
      name: 'name-list',
      component: NamesList,
      props: true,
      meta: {
        title: 'names',
        backButton: false,
      },
    }, {
      path: 'auctions',
      component: AuctionList,
      props: true,
      name: 'auction-list',
      meta: {
        title: 'name-auctions',
        backButton: false,
      },
    }, {
      path: 'claim',
      component: NameClaim,
      props: true,
      name: 'name-claim',
      meta: {
        title: 'register-name',
        backButton: false,
      },
    }],
  },
  {
    path: '/names/auctions/:name/',
    component: Auction,
    props: true,
    children: [{
      path: '',
      component: AuctionBid,
      props: true,
      name: 'auction-bid',
      meta: {
        title: 'auction',
        hideTabBar: true,
      },
    }, {
      path: 'history',
      component: AuctionHistory,
      props: true,
      name: 'auction-history',
      meta: {
        title: 'auction',
        hideTabBar: true,
      },
    }],
  },
  {
    path: '/comment',
    component: CommentNew,
    meta: {
      title: 'comment-new',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    name: 'donate-error',
    path: '/donate-error',
    component: DonateError,
    props: true,
    meta: {
      title: 'donate-error',
      notPersist: true,
      ifNotAuth: true,
      notRebrand: true,
    },
  },
  {
    name: 'address',
    path: '/address',
    component: Address,
    meta: {
      title: 'address',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    name: 'balances',
    path: '/balances',
    component: Balances,
    meta: {
      title: 'balances',
      backButton: false,
    },
  },
  {
    name: 'token-details',
    path: '/balances/:id',
    component: TokenDetails,
    props: true,
    meta: {
      title: 'token-details',
    },
  },
  {
    name: 'not-found',
    path: '*',
    component: NotFound,
    meta: {
      ifNotAuth: true,
      notRebrand: true,
    },
  },
  {
    name: 'sign-message',
    path: '/sign-message',
    component: SignMessage,
    meta: {
      title: 'sign-message',
      notPersist: true,
      notRebrand: true,
    },
  },
  {
    name: 'sign-transaction',
    path: '/sign-transaction',
    component: SignTransaction,
    meta: {
      title: 'sign-transaction',
      notPersist: true,
      hideTabBar: true,
    },
  },
  {
    name: 'invite',
    path: '/invite',
    component: Invite,
    meta: {
      title: 'invite',
      notRebrand: true,
    },
  },
  {
    name: 'invite-claim',
    path: '/invite/:secretKey',
    component: InviteClaim,
    props: true,
    meta: {
      title: 'invite',
      notPersist: true,
      notRebrand: true,
    },
  },
  ...webIframePopups,
];
