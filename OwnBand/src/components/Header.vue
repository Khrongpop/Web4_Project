<template>

	<b-navbar toggleable="sm" type="dark" variant="" style="background-color: #222; !important;" >
		<div class="container" v-for="user in users"  v-if="user.id == currentUser.uid">
		  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		  <b-navbar-brand to="/home" style="width: 10%">
			  <img :src="imgLogo" class="img-fluid" />
		  </b-navbar-brand>

		  <b-collapse is-nav id="nav_collapse">

			    <b-navbar-nav>
			      <!-- <b-nav-item href="#">Link</b-nav-item> -->
			      <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
			      <!--<b-nav-item to='/home'>Home   </b-nav-item>-->
					<b-nav-item to='/createband'>CreateBand</b-nav-item>

			    </b-navbar-nav>

			    <!-- Right aligned nav items -->
			    <b-navbar-nav class="ml-auto" >

			      <!--<b-nav-form>-->
			        <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
			        <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
			      <!--</b-nav-form>-->
					

			      <b-nav-item-dropdown right v-if="currentUser">
			        <!-- Using button-content slot -->
			        <template slot="button-content">
						<img :src="user.image"  class="img-fluid mr-3" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover"/>
			          <em>{{ user.displayName }}</em>
			        </template>
			        <b-dropdown-item href="#" @click="profile">Profile</b-dropdown-item>
			        <b-dropdown-item href="#" @click="signOut">Signout</b-dropdown-item>
			      </b-nav-item-dropdown>
			    </b-navbar-nav>

		  </b-collapse>
		 </div>

		
	</b-navbar>




	 <!--navbar-1.vue-->

	<!--<div>-->
		<!--<b-nav>-->
			<!--<b-nav-item active>Active</b-nav-item>-->
			<!--<b-nav-item>Link</b-nav-item>-->
			<!--<b-nav-item>Another Link</b-nav-item>-->
			<!--<b-nav-item disabled>Disabled</b-nav-item>-->
		<!--</b-nav>-->
	<!--</div>-->

</template>
<script >
	import { dbAuth  , userRef} from '../firebaseConfig.js'
    import ImgLazy from "bootstrap-vue/src/components/image/img-lazy";
	export default {
        components: {ImgLazy},
        firebase: {
            users: userRef
        },
        data() {
			return {
				currentUser:null,
				imgLogo: 'https://firebasestorage.googleapis.com/v0/b/vuefirebasee.appspot.com/o/myImg%2Flogo.png?alt=media&token=583ee908-77b4-4cef-b8e2-f91819cc30cb',
				this_user: {
				    displayName:'',
					image:'',
					uid:''
				}
			}
		},
		created() {
			let _this = this
			dbAuth.onAuthStateChanged(function (user) {
				_this.currentUser = user
                    userRef.child(user.uid).once("value").then(function(snapshot) {

                        // console.log(snapshot.child("displayName").val())
                        _this.this_user.uid = snapshot.child("id").val(),
                            _this.this_user.displayName = snapshot.child("displayName").val(),
                            // _this.user.email = snapshot.child("email").val(),
                            // _this.user.band = snapshot.child("band").val(),
                            _this.this_user.image = snapshot.child("image").val()
                    })
			})
		},
		methods: {
			signOut: function() {
				let _this = this
				dbAuth.signOut().then(()=> {
					_this.$router.push({name:'login'})
				})
			},
            profile: function () {
                this.$router.push({name:'profile'})
            }
		}
	}
</script>

