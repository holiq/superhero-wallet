import ConfirmTransactionSign from '../components/Modals/ConfirmTransactionSign.vue';
import ConfirmRawSign from '../components/Modals/ConfirmRawSign.vue';
import About from '../pages/About.vue';
import AccountDetails from '../pages/AccountDetails.vue';
import AccountDetailsTokens from '../pages/AccountDetailsTokens.vue';
import AccountDetailsTransactions from '../pages/AccountDetailsTransactions.vue';
import AccountDetailsNames from '../pages/AccountDetailsNames.vue';
import Dashboard from '../pages/Dashboard.vue';
import Address from '../pages/Address.vue';
import CommentNew from '../pages/CommentNew.vue';
import DonateError from '../pages/DonateError.vue';
import TokenDetails from '../pages/FungibleTokens/TokenDetails.vue';
import Index from '../pages/Index.vue';
import Invite from '../pages/Invite.vue';
import InviteClaim from '../pages/InviteClaim.vue';
import LanguageSettings from '../pages/LanguageSettings.vue';
import CurrencySettings from '../pages/CurrencySettings.vue';
import Auction from '../pages/Names/Auction.vue';
import AuctionBid from '../pages/Names/AuctionBid.vue';
import AuctionHistory from '../pages/Names/AuctionHistory.vue';
import AuctionList from '../pages/Names/AuctionList.vue';
import More from '../pages/More.vue';
import NameClaim from '../pages/Names/Claim.vue';
import NamesList from '../pages/Names/List.vue';
import NotFound from '../pages/NotFound.vue';
import Notifications from '../pages/Notifications.vue';
import NotificationSettings from '../pages/NotificationSettings.vue';
import ErrorLogSettings from '../pages/ErrorLogSettings.vue';
import PermissionsDetails from '../pages/PermissionsDetails.vue';
import PermissionsSettings from '../pages/PermissionsSettings.vue';
import PopupConnect from '../pages/Popups/Connect.vue';
import PopupMessageSign from '../pages/Popups/MessageSign.vue';
import PrivacyPolicy from '../pages/PrivacyPolicy.vue';
import Retip from '../pages/Retip.vue';
import SeedPhraseSettings from '../pages/SeedPhraseSettings.vue';
import SeedPhraseDetailsSettings from '../pages/SeedPhraseDetailsSettings.vue';
import SeedPhraseVerifySettings from '../pages/SeedPhraseVerifySettings.vue';
import Settings from '../pages/Settings.vue';
import SignMessage from '../pages/SignMessage.vue';
import SignTransaction from '../pages/SignTransaction.vue';
import TermsOfService from '../pages/TermsOfService.vue';
import TipsClaim from '../pages/TipsClaim.vue';
import TransactionDetails from '../pages/TransactionDetails.vue';
import ResetWallet from '../pages/ResetWallet.vue';
import webIframePopups from './web-iframe-popups';
import Networks from '../pages/Networks.vue';
import NetworkForm from '../pages/NetworkForm.vue';

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
    component: Dashboard,
  },
  {
    path: '/transfer*',
    redirect: '/account*',
  },
  {
    path: '/account-details/',
    component: AccountDetails,
    children: [
      {
        path: '',
        name: 'account-details',
        component: AccountDetailsTokens,
        meta: {
          hideHeader: true,
          asModal: true,
        },
      },
      {
        path: 'transactions',
        name: 'account-details-transactions',
        component: AccountDetailsTransactions,
        meta: {
          hideHeader: true,
          asModal: true,
        },
      },
      {
        path: 'names',
        component: AccountDetailsNames,
        children: [
          {
            path: '',
            name: 'account-details-names',
            component: NamesList,
            props: true,
            meta: {
              hideHeader: true,
              asModal: true,
            },
          },
          {
            path: 'auctions',
            component: AuctionList,
            props: true,
            name: 'account-details-names-auctions',
            meta: {
              hideHeader: true,
              asModal: true,
            },
          },
          {
            path: 'claim',
            component: NameClaim,
            props: true,
            name: 'account-details-names-claim',
            meta: {
              hideHeader: true,
              asModal: true,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'popup-sign-tx',
    path: '/popup-sign-tx',
    component: ConfirmTransactionSign,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'popup-raw-sign',
    path: '/popup-raw-sign',
    component: ConfirmRawSign,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'connect',
    path: '/connect',
    component: PopupConnect,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'message-sign',
    path: '/message-sign',
    component: PopupMessageSign,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    path: '/more/settings',
    name: 'settings',
    component: Settings,
    meta: {
      title: 'settings',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/reset-wallet',
    name: 'settings-reset-wallet',
    component: ResetWallet,
    meta: {
      title: 'reset-wallet',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/errors-log',
    name: 'settings-errors-log',
    component: ErrorLogSettings,
    meta: {
      title: 'save-errors-log',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/language',
    name: 'settings-language',
    component: LanguageSettings,
    meta: {
      title: 'language',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/currency',
    name: 'settings-currency',
    component: CurrencySettings,
    meta: {
      title: 'currency',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/seed-phrase',
    name: 'settings-seed-phrase',
    component: SeedPhraseSettings,
    meta: {
      title: 'seed-phrase',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/seed-phrase/details',
    name: 'settings-seed-phrase-details',
    component: SeedPhraseDetailsSettings,
    meta: {
      title: 'seed-phrase',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/seed-phrase/details/verify',
    name: 'settings-seed-phrase-verify',
    component: SeedPhraseVerifySettings,
    meta: {
      title: 'seed-phrase',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/networks',
    name: 'network-settings',
    component: Networks,
    props: true,
    meta: {
      title: 'networks',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/networks/add',
    name: 'network-add',
    component: NetworkForm,
    props: true,
    meta: {
      title: 'network-add',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/networks/edit/:name',
    name: 'network-edit',
    component: NetworkForm,
    props: true,
    meta: {
      title: 'network-edit',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/permissions',
    component: PermissionsSettings,
    name: 'permissions-settings',
    meta: {
      title: 'permissionsSettings',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/permissions/:host',
    component: PermissionsDetails,
    name: 'permissions-details',
    meta: {
      title: 'permissionsDetails',
    },
  },
  {
    path: '/more/about',
    component: About,
    name: 'about',
    meta: {
      title: 'about',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/about/terms',
    component: TermsOfService,
    name: 'about-terms',
    meta: {
      title: 'terms',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
      ifNotAuth: true,
    },
  },
  {
    path: '/more/about/privacy',
    component: PrivacyPolicy,
    name: 'about-privacy',
    meta: {
      title: 'privacy',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/tips-claim',
    name: 'tips-claim',
    component: TipsClaim,
    meta: {
      title: 'claim-tips',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/tips*',
    redirect: '/account*',
  },
  {
    path: '/retip',
    component: Retip,
    meta: {
      title: 'send-tip',
      notPersist: true,
    },
  },
  {
    name: 'tx-details',
    path: '/transactions/:hash',
    component: TransactionDetails,
    props: true,
    meta: {
      title: 'tx-details',
    },
  },
  {
    path: '/more',
    component: More,
    name: 'more',
    meta: {
      title: 'more',
      backButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/invite',
    name: 'invite',
    component: Invite,
    meta: {
      title: 'invite',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/more/settings/notifications',
    name: 'notification-settings',
    component: NotificationSettings,
    meta: {
      title: 'notifications',
      backButton: true,
      closeButton: true,
      hideNotificationsIcon: true,
    },
  },
  {
    path: '/names/auctions/:name/',
    component: Auction,
    props: true,
    children: [
      {
        path: '',
        component: AuctionBid,
        props: true,
        name: 'auction-bid',
        meta: {
          title: 'auction',
          backRoute: '/account-details/names/auctions',
        },
      },
      {
        path: 'history',
        component: AuctionHistory,
        props: true,
        name: 'auction-history',
        meta: {
          title: 'auction',
          backRoute: '/account-details/names/auctions',
        },
      },
    ],
  },
  {
    path: '/comment',
    component: CommentNew,
    meta: {
      title: 'comment-new',
      notPersist: true,
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
    },
  },
  {
    name: 'address',
    path: '/address',
    component: Address,
    meta: {
      title: 'address',
      notPersist: true,
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
    },
  },
  {
    name: 'sign-message',
    path: '/sign-message',
    component: SignMessage,
    meta: {
      title: 'sign-message',
      notPersist: true,
    },
  },
  {
    name: 'sign-transaction',
    path: '/sign-transaction',
    component: SignTransaction,
    meta: {
      title: 'sign-transaction',
      notPersist: true,
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
  ...webIframePopups,
];
