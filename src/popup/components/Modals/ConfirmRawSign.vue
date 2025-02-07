<template>
  <Modal
    full-screen
    class="confirm-raw-sign"
    data-cy="popup-aex2"
  >
    <Overview
      :title="$t('modals.confirm-raw-sign.title')"
      :sender="{ name: app.name, address: app.host, url: app.url }"
      :recipient="account"
    />

    <div
      class="warning"
      data-cy="warning"
    >
      <span class="title">
        <Warning class="icon" />
        {{ $t('modals.confirm-raw-sign.warning.title') }}
      </span>
      <i18n
        path="modals.confirm-raw-sign.warning.content"
        tag="span"
        class="content"
      >
        <br>
      </i18n>
    </div>

    <DetailsItem
      :label="$t('modals.confirm-transaction-sign.data-sign')"
      :value="dataAsString"
      data-cy="data"
    >
      <template #label>
        <BtnCopy
          :value="dataAsString"
          :message="$t('copied')"
        />
      </template>
    </DetailsItem>

    <template #footer>
      <BtnMain
        third
        variant="secondary"
        @click="cancel"
      >
        {{ $t('modals.cancel') }}
      </BtnMain>
      <BtnMain
        third
        @click="confirm"
      >
        {{ $t('modals.confirm') }}
      </BtnMain>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Modal from '../Modal.vue';
import Overview from '../Overview.vue';
import BtnMain from '../buttons/BtnMain.vue';
import BtnCopy from '../buttons/BtnCopy.vue';
import DetailsItem from '../DetailsItem.vue';
import Warning from '../../../icons/warning.svg?vue-component';

export default {
  components: {
    Modal,
    Overview,
    BtnMain,
    BtnCopy,
    DetailsItem,
    Warning,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    data: { type: [String, Uint8Array], required: true },
    app: { type: Object, required: true },
  },
  computed: {
    ...mapGetters(['getExplorerPath']),
    ...mapState({
      account(_, { account }) {
        return {
          ...account,
          label: this.$t('transaction.overview.accountAddress'),
          url: this.getExplorerPath(account.address),
        };
      },
    }),
    dataAsString() {
      if (typeof this.data === 'string') return this.data;
      return Buffer.from(this.data).toString('hex');
    },
  },
  methods: {
    confirm() {
      this.resolve();
    },
    cancel() {
      this.reject(new Error('Rejected by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../../styles/variables';
@use '../../../styles/typography';

.confirm-raw-sign {
  .overview {
    margin: 16px;
  }

  .warning {
    margin: 16px;
    text-align: left;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      @extend %face-sans-15-medium;

      color: variables.$color-warning;

      .icon {
        width: 24px;
        height: 24px;
        padding-right: 4px;
      }
    }

    .content {
      @extend %face-sans-15-regular;

      color: variables.$color-white;
    }
  }

  .details-item {
    margin: 24px 16px 16px;
    text-align: left;
  }
}
</style>
