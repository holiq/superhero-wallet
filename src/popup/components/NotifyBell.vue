<template>
  <BtnPlain
    v-if="!$route.path.startsWith('/notifications') && !hideNotificationsIcon"
    class="notifications"
    data-cy="noti"
    @click="toNotifications"
  >
    <Bell class="bell-icon" />
    <span
      v-if="notificationsCount"
      class="badge"
      data-cy="noti-count"
    >
      {{ notificationsCount }}
    </span>
  </BtnPlain>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import BtnPlain from './buttons/BtnPlain.vue';
import Bell from '../../icons/bell.svg?vue-component';

const notificationStatus = {
  created: 'CREATED',
  peeked: 'PEEKED',
};

export default {
  name: 'NotifyBell',
  components: {
    Bell,
    BtnPlain,
  },
  subscriptions() {
    return {
      superheroNotifications: this.$store.state.observables.notifications,
    };
  },
  computed: {
    ...mapState(['notifications', 'pageTitle']),
    notificationsCount() {
      const count = [...(this.notifications || []), ...(this.superheroNotifications || [])].filter(
        (n) => n.status === notificationStatus.created,
      ).length;

      return count > 99 ? '99+' : count;
    },
    hideNotificationsIcon() {
      return this.$route.meta.hideNotificationsIcon;
    },
  },
  methods: {
    ...mapMutations(['setNotificationsStatus']),
    async toNotifications() {
      this.notifications.forEach((n) => this.setNotificationsStatus({
        createdAt: n.createdAt,
        status: notificationStatus.peeked,
      }));
      await this.$store.dispatch('modifyNotifications', [
        this.superheroNotifications.filter(
          (n) => n.status === notificationStatus.created,
        ).map((n) => n.id),
        notificationStatus.peeked,
      ]);
      if (this.$store.state.route.fullPath !== '/notifications') {
        this.$router.push('/notifications');
      }
    },
  },

};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/typography';
@use '../../styles/mixins';

.notifications {
  position: relative;
  min-width: 32px;
  height: 32px;

  .badge {
    @extend %face-sans-11-regular;

    color: variables.$color-white;
    position: absolute;
    left: 50%;
    top: 4px;
    min-width: 14px;
    height: 14px;
    background: variables.$color-pink;
    border-radius: 7px;
    text-align: center;
    line-height: 14px;
    padding: 0 3px;
  }

  .bell-icon {
    width: 24px;
    height: 24px;
  }

  &:hover {
    border-radius: 50%;
    background-color: variables.$color-hover;

    .bell-icon {
      opacity: 1;
    }
  }
}
</style>
