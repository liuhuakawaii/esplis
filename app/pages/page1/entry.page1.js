// if (process.env.NODE_ENV !== 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
// }
import { createApp } from "vue";
import page1 from "./page1.vue";


const app = createApp(page1)
app.mount('#root')