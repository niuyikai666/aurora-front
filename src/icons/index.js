import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import Doubt from '@/components/Doubt'// svg component
// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('doubt', Doubt)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
