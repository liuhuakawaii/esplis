// if (process.env.NODE_ENV !== 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
// }

import boot from '$pages/boot'
import page1 from './page1.vue'

boot(page1, {
  libs: ['echarts']
})