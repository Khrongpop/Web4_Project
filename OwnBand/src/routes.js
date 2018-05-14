
import	Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import CreateBand from './components/CreateBand.vue'
import Show from './components/Show.vue'
import Join from './components/Join.vue'
import BandChat from './components/BandChat.vue'
import Profile from './components/Profile.vue'
import EditUser from './components/EditUser.vue'



export	const routes = [

    { path: '/', component: Login, name:'login'  } ,
    { path: '/register', component: Register, name:'register'  } ,
    { path: '/home', component: Home, name:'home' , meta: { requireAuth: true } } ,
    { path: '/show/edit' ,component: Edit, name: 'edit', meta: { requireAuth: true } } ,
    { path: '/show/join' ,component: Join, name: 'join', meta: { requireAuth: true } } ,
    { path: '/createband', component: CreateBand, name:'createband' , meta: { requireAuth: true } } ,
    { path: '/show', component: Show, name:'show' , meta: { requireAuth: true } },
    { path: '/show/BandChat', component: BandChat, name:'bandchat' , meta: { requireAuth: true } },
    { path: '/profile', component: Profile, name:'profile' , meta: { requireAuth: true } },
    { path: '/user/edit', component: EditUser, name:'edituser' , meta: { requireAuth: true } },

]