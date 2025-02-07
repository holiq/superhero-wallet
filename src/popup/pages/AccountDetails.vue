<template>
  <div class="account-details">
    <div class="account-info-wrapper">
      <AccountInfo
        :account-idx="activeIdx"
        can-copy-address
      />

      <BtnIcon
        class="close-button"
        :to="{ name: 'index' }"
      >
        <CloseIcon />
      </BtnIcon>
    </div>

    <BalanceInfo :account-idx="activeIdx" />

    <div class="buttons">
      <BtnBox
        v-for="(action, index) in actions"
        :key="index"
        @click="action.onClick"
      >
        <Component :is="action.icon" />
        <div>{{ action.text }}</div>
      </BtnBox>
    </div>

    <div class="header">
      <Tabs>
        <Tab
          v-for="tab in tabs"
          :key="tab.routeName"
          :exact-path="tab.exact"
          :to="{ name: tab.routeName }"
          :text="tab.text"
        />
      </Tabs>

      <div
        v-if="searchTermPlaceholder"
        class="search-bar-wrapper"
      >
        <InputSearch
          v-model="searchTerm"
          :placeholder="searchTermPlaceholder"
        />
      </div>
    </div>

    <div class="tabs-content">
      <transition
        name="fade-transition"
        mode="out-in"
      >
        <RouterView :search-term="searchTerm" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import {
  MODAL_TRANSFER_RECEIVE,
  MODAL_TRANSFER_SEND,
  DEX_URL,
} from '../utils/constants';
import AccountInfo from '../components/AccountInfo.vue';
import BalanceInfo from '../components/BalanceInfo.vue';
import BtnPlain from '../components/buttons/BtnPlain.vue';
import BtnBox from '../components/buttons/BtnBox.vue';
import InputSearch from '../components/InputSearch.vue';
import BtnIcon from '../components/buttons/BtnIcon.vue';
import Tabs from '../components/tabs/Tabs.vue';
import Tab from '../components/tabs/Tab.vue';
import ArrowReceiveIcon from '../../icons/arrow-receive.svg?vue-component';
import ArrowSendIcon from '../../icons/arrow-send.svg?vue-component';
import CreditCardIcon from '../../icons/credit-card.svg?vue-component';
import SwapIcon from '../../icons/swap.svg?vue-component';
import CloseIcon from '../../icons/close.svg?vue-component';
import { buildSimplexLink } from '../utils';

export default {
  name: 'AccountDetails',
  components: {
    AccountInfo,
    BalanceInfo,
    BtnPlain,
    Tabs,
    Tab,
    CloseIcon,
    BtnIcon,
    BtnBox,
    InputSearch,
  },
  data() {
    return {
      actions: [
        {
          text: this.$t('pages.token-details.receive'),
          onClick: () => this.$store.dispatch('modals/open', {
            name: MODAL_TRANSFER_RECEIVE,
          }),
          icon: ArrowReceiveIcon,
        },
        {
          text: this.$t('pages.token-details.send'),
          onClick: () => this.$store.dispatch('modals/open', {
            name: MODAL_TRANSFER_SEND,
          }),
          icon: ArrowSendIcon,
        },
        {
          text: this.$t('pages.token-details.buy'),
          onClick: () => window.open(this.simplexLink, '_blank'),
          icon: CreditCardIcon,
        },
        {
          text: this.$t('pages.token-details.swap'),
          onClick: () => window.open(DEX_URL, '_blank'),
          icon: SwapIcon,
        },
      ],
      tabs: [
        {
          text: this.$t('modals.account-details.assets'),
          routeName: 'account-details',
          exact: true,
        },
        {
          text: this.$t('modals.account-details.transactions'),
          routeName: 'account-details-transactions',
        },
        {
          text: this.$t('modals.account-details.names'),
          routeName: 'account-details-names',
        },
      ],
      searchTerm: '',
    };
  },
  computed: {
    ...mapState('accounts', ['activeIdx']),
    ...mapGetters(['account']),
    simplexLink() {
      return buildSimplexLink(this.account.address);
    },
    searchTermPlaceholder() {
      switch (this.$route.name) {
        case 'account-details':
          return this.$t('pages.fungible-tokens.searchPlaceholder');
        case 'account-details-transactions':
          return this.$t('pages.recentTransactions.searchPlaceholder');
        default:
          return null;
      }
    },
    mobile() {
      return process.env.PLATFORM === 'cordova';
    },
  },
  mounted() {
    if (this.mobile) {
      window.StatusBar.backgroundColorByHexString('#191919');
    }
  },
  beforeDestroy() {
    if (this.mobile) {
      window.StatusBar.backgroundColorByHexString('#141414');
    }
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/mixins';
@use '../../styles/typography';

.account-details {
  --screen-padding-x: 12px;
  --screen-bg-color: #{variables.$color-bg-modal};

  border-radius: variables.$border-radius-app;
  min-height: 100%;
  font-weight: 500;
  color: variables.$color-white;
  background-color: var(--screen-bg-color);
  box-shadow:
    0 0 0 1px variables.$color-border,
    0 0 50px rgba(variables.$color-black, 0.6);

  @include mixins.mobile {
    min-height: 100vh;
  }

  .account-info-wrapper {
    position: sticky;
    top: env(safe-area-inset-top);
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 8px 6px 6px;
    background-color: var(--screen-bg-color);

    .button-plain {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 7px;
      top: 7px;
      color: variables.$color-white;

      svg {
        width: 24px;
      }
    }

    ::v-deep .account-info .title {
      justify-content: flex-start;
      word-break: normal;

      @extend %face-sans-16-regular;
    }
  }

  .balance-info {
    padding-top: calc(8px + env(safe-area-inset-top));
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: var(--gap);
    width: 100%;
    margin-top: 20px;
    padding: 0 var(--screen-padding-x);
  }

  .header {
    position: sticky;
    z-index: 2;
    top: calc(env(safe-area-inset-top) + 62px);
    padding: var(--gap) var(--screen-padding-x);
    background-color: var(--screen-bg-color);
  }

  .search-bar-wrapper {
    position: sticky;
    top: calc(env(safe-area-inset-top) + 104px);
    z-index: 1;
    margin-top: var(--gap);
  }

  .tabs-content {
    position: relative;
    padding: 0 var(--screen-padding-x);
  }
}
</style>
