<template>
  <div class="flex shadow-lg site-status">
    <div
      class="status-color w-4"
      style="min-width:16px;"
      :class="statusClass"
    ></div>
    <div class="flex site-details py-2 px-3 items-center">
      <span class="status-code">{{ statusCode }}</span>
      <span class="site-name flex-grow mx-2">
        {{ siteName }}
      </span>
      <span class="server-name">{{ serverName }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 ml-2 text-gray-900 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="refreshSiteStatus()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'SiteStatusComponent',
    props: [
      'siteName',
      'serverName',
      'statusCode',
      'statusMessage',
      'isSecure',
      'url',
    ],
    computed: {
      statusClass() {
        if (this.statusCode < 300) return 'bg-status-green';
        if (this.statusCode < 400) return 'bg-status-yellow';
        return 'bg-status-orange';
      },
    },
    methods: {
      async refreshSiteStatus() {
        let loader = this.$loading.show();
        try {
          let response = await axios.get(
            `${process.env.VUE_APP_BASE_API_URL}/siteStatus/${this.siteName}`
          );
          this.$emit('update-code', response.data.statusCode);
        } catch (e) {
          console.log(e);
          alert('An Error Occured while trying to refresh the site status');
        }
        loader.hide();
      },
    },
  };
</script>

<style scoped>
  .site-details {
    flex-grow: 1;
    font-size: 11px;
  }
</style>
