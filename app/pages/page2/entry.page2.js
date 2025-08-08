// if (process.env.NODE_ENV !== 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
// }
import { createApp } from "vue";
import page2 from "./page2.vue";


const app = createApp(page2)
app.mount('#root')