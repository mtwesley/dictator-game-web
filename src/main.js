import { createApp } from "vue";
import App from "./App.vue";
import Buefy from "buefy";

import router from "./router";
import store from "./store";

// import "bulma/css/bulma.css";
import "buefy/dist/buefy.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
