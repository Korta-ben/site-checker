<template>
  <div class="container grid sm:grid-cols-2 lg:grid-cols-3 md mt-10 mx-auto">
    <SiteStatusComponent
      v-for="(siteStatus, i) in sortByStatusCode()"
      :key="`site-${i}`"
      v-bind="siteStatus"
      class="mx-4 my-2"
      @update-code="updateStatusCode($event, i)"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import SiteStatusComponent from './components/SiteStatusComponent';
  export default {
    name: 'App',
    components: {
      SiteStatusComponent,
    },
    created() {
      document.title = 'Sites Checker';
    },
    async mounted() {
      let loader = this.$loading.show();
      try {
        let response = await axios.post(
          `${process.env.VUE_APP_BASE_API_URL}/status`
        );
        this.siteStatuses = response.data;
      } catch (e) {
        alert('An Error Occured while retrieving the status of websites');
      }
      loader.hide();
    },
    data() {
      return {
        siteStatuses: [],
      };
    },
    methods: {
      sortByStatusCode() {
        return this.siteStatuses.sort((a, b) => b.statusCode - a.statusCode);
      },
      updateStatusCode(code, i) {
        this.siteStatuses[i].statusCode = code;
      },
    },
  };
</script>
