<template>
  <div class="notifications">
    <div class="tabs">
      <BtnPlain
        :class="{ active: direction === '' }"
        @click="direction = ''"
      >
        {{ $t('pages.notifications.all') }}
      </BtnPlain>
      <BtnPlain
        :class="{ active: direction === 'superhero' }"
        @click="direction = 'superhero'"
      >
        {{ $t('pages.notifications.superhero') }}
      </BtnPlain>
      <BtnPlain
        :class="{ active: direction === 'wallet' }"
        @click="direction = 'wallet'"
      >
        {{ $t('pages.notifications.wallet') }}
      </BtnPlain>
    </div>
    <div class="list">
      <NotificationItem
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :address="notification.sender || ''"
        :name="
          notification.wallet ? notification.title : notification.chainName || 'Fellow Superhero'
        "
        :text="notificationText(notification)"
        :date="new Date(notification.createdAt)"
        :to="notification.path"
        :status="notification.status.toLocaleLowerCase()"
        v-bind="notification.wallet && { wallet: true }"
        @click="onClickHandler(notification)"
        @toggle-read="modifyNotificationStatus(notification)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NotificationItem from '../components/NotificationItem.vue';
import BtnPlain from '../components/buttons/BtnPlain.vue';

export default {
  components: {
    NotificationItem,
    BtnPlain,
  },
  data: () => ({
    direction: '',
  }),
  computed: {
    ...mapState(['notifications', 'notificationSettings']),
    filteredNotifications() {
      return [...this.observableNotifications, ...this.notifications]
        .filter(
          (n) => this.direction === ''
            || (this.direction === 'superhero' && n.type !== 'wallet')
            || (this.direction === 'wallet' && n.type === 'wallet'),
        )
        .filter(
          (n) => n.status === 'READ'
            || this.notificationSettings
              .filter((s) => s.checked)
              .map((s) => s.type)
              .includes(n.type),
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    ...mapMutations(['setNotificationsStatus']),
    async modifyNotificationStatus(notification) {
      const status = notification.status === 'READ' ? 'CREATED' : 'READ';
      if (notification.type === 'wallet') {
        this.setNotificationsStatus({ createdAt: notification.createdAt, status });
      } else {
        await this.$store.dispatch('modifyNotification', [notification.id, status]);
        this.observableNotifications.find((n) => n.id === notification.id).status = status;
      }
    },
    async onClickHandler(notification) {
      await this.modifyNotificationStatus(notification);
      if (/^\w+:\D+/.test(notification.path)) {
        window.open(notification.path, '_blank');
      } else {
        this.$router.push(notification.path);
      }
    },
    notificationText(notification) {
      switch (notification.type) {
        case 'COMMENT_ON_COMMENT':
          return this.$t('pages.notifications.commentOnComment');
        case 'COMMENT_ON_TIP':
          return this.$t('pages.notifications.commentOnTip');
        case 'TIP_ON_COMMENT':
          return this.$t('pages.notifications.tipOnComment');
        case 'RETIP_ON_TIP':
          return this.$t('pages.notifications.retipOnTip');
        case 'CLAIM_OF_TIP':
          return this.$t('pages.notifications.claimOfTip');
        case 'CLAIM_OF_RETIP':
          return this.$t('pages.notifications.claimOfRetip');
        case 'wallet':
          return notification.text;
        default:
          throw new Error(`Unknown notification status: ${notification.type}`);
      }
    },
  },
  subscriptions() {
    return {
      observableNotifications: this.$store.state.observables.notifications,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';

.notifications {
  padding: 0;

  .tabs {
    position: sticky;
    top: 48px;
    z-index: 1;
    background-color: variables.$color-bg-2;
    box-shadow: 0 -1px 0 variables.$color-black;
    padding: 0 1rem;
    text-align: left;

    .button-plain {
      display: inline-block;
      text-align: center;
      font-size: 0.95rem;
      color: variables.$color-grey-dark;
      font-weight: 600;
      padding: 0.95rem 0;
      margin-left: 1rem;
      border-bottom: 0.2rem solid transparent;

      &:hover {
        color: variables.$color-light-grey;
      }

      &.active {
        color: variables.$color-green;
        border-bottom-color: variables.$color-green;
      }
    }
  }

  .list {
    overflow: scroll;
  }
}
</style>
