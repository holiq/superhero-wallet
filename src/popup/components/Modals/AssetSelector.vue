<template>
  <Modal
    full-screen
    from-bottom
    no-padding
    has-close-button
    class="asset-selector"
    @close="handleClose"
    @opened="onModalOpen"
  >
    <template #header>
      <span class="title">{{ $t('pages.fungible-tokens.select-asset') }}</span>
      <InputSearch
        v-model="searchTerm"
        class="search-bar"
        :placeholder="$t('pages.fungible-tokens.searchAssetsPlaceholder')"
      />
    </template>

    <Loader
      :class="['appearing-element', { visible: loading }]"
    />
    <div
      v-show="isFullyOpen"
      :class="['appearing-element', { visible: !loading }]"
    >
      <TokensListItem
        v-for="token in filteredResults"
        :key="token.contractId || token.id"
        :token-data="token"
        :class="{ selected: isTokenSelected(token) }"
        prevent-navigation
        show-current-price
        asset-selector
        @click="handleChange(token)"
      />
    </div>
    <BackToTop />
  </Modal>
</template>

<script>
import balanceListMixin from '../../../mixins/balanceListMixin';
import Modal from '../Modal.vue';
import TokensListItem from '../FungibleTokens/TokensListItem.vue';
import InputSearch from '../InputSearch.vue';
import BackToTop from '../BackToTop.vue';

export default {
  components: {
    BackToTop,
    TokensListItem,
    Modal,
    InputSearch,
  },
  mixins: [balanceListMixin(true)],
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    selectedToken: { type: Object, default: null },
  },
  data() {
    return {
      searchTerm: '',
      isFullyOpen: false,
      loading: true,
    };
  },
  methods: {
    handleChange(token) {
      this.resolve(token);
    },
    handleClose() {
      this.reject();
    },
    isTokenSelected(token) {
      if (!this.selectedToken) return false;
      return token.contractId
        ? this.selectedToken.contractId === token.contractId
        : this.selectedToken.id === token.id;
    },
    /**
     * Delay displaying tokens list until the modal transition is finished to prevent
     * performance issues when both animating the modal and rendering large amount of data.
     */
    onModalOpen() {
      this.$nextTick(() => {
        this.isFullyOpen = true;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../../styles/variables';
@use '../../../styles/typography';
@use '../../../styles/mixins';

.asset-selector {
  padding-top: env(safe-area-inset-top);

  .search-bar {
    margin: 8px 8px 16px;
  }

  .title {
    @extend %face-sans-15-medium;

    margin-left: 16px;
    margin-bottom: 0;
    line-height: 48px;
    text-align: left;
    color: rgba(variables.$color-white, 0.75);
  }

  .appearing-element {
    opacity: 0;
    z-index: -1;
    transition: opacity 0.25s ease-in-out;

    &.visible {
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>
