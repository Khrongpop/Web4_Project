<template>
	<div class="container">


		<div class="form-horizontal mt-5" role="form">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<h2>Please Login</h2>
					<hr>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<div class="form-group has-danger">
						<!--<label class="sr-only" for="email">E-Mail Address</label>-->
						<div class="input-group mb-2 mr-sm-2 mb-sm-0">

							<input type="text" name="email" class="form-control" id="email"
								   placeholder="Email" required autofocus v-model='email'>
						</div>
					</div>
				</div>
				<!--<div class="col-md-3">-->
					<!--<div class="form-control-feedback">-->
                        <!--<span class="text-danger align-middle">-->
                            <!--<i class="fa fa-close"></i> Example error message-->
                        <!--</span>-->
					<!--</div>-->
				<!--</div>-->
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<div class="form-group">
						<!--<label class="sr-only" for="password"> Password</label>-->
						<div class="input-group mb-2 mr-sm-2 mb-sm-0">

							<input type="password" name="password" class="form-control" id="password"
								   placeholder="Password" required v-model='password'>
						</div>
					</div>
				</div>
				<div class="col-md-3">

					<div class="form-control-feedback">
                        <span class="text-danger align-middle">
                        <!-- Put password error message here -->
                        </span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6" style="padding-top: .35rem">
					<div class="form-check mb-2 mr-sm-2 mb-sm-0">
						<label class="form-check-label">
							<input class="form-check-input" name="remember"
								   type="checkbox" >
							<span style="padding-bottom: .15rem">Remember me</span>
						</label>
					</div>
				</div>
			</div>
			<div class="row" style="padding-top: 1rem">
				<div class="col-md-3">

				</div>
				<div class="col-md-6">
					<button type="submit" class="btn btn-outline-dark"  @click="signIn" style="width: 80%" >
						<!--<icon name="home"/>-->
						Login</button>
					<a class="btn btn-link"  @click="signUp" >Don't have an account ? Register</a>
				</div>
			</div>
		</div>




	</div>
		<!--<div class="form-signin mt-4">-->
			<!--<h4>SignIn</h4>-->
			<!--<input type="text" class="form-control" placeholder="email" v-model='email'>-->
			<!--<br>-->
			<!--<input type="password" class="form-control" placeholder="password" v-model='password'>-->
			<!--<br>-->
			<!--<button class="btn btn-primary btn-block" @click="signIn">SignIn</button>-->
			<!--<br>-->
			<!--&lt;!&ndash; <b-nav-item >Create</b-nav-item> &ndash;&gt;-->
			<!--<button class="btn btn-primary btn-block btn-sm" @click="signUp">signUp</button>-->
		<!--</div>-->

</template>

<script >
	import { dbAuth } from '../firebaseConfig.js'

	export default {
		data(){
			return {
				email:'',
				password:''
			}
		},
		methods: {

			signIn: function () {
				let _this = this
				dbAuth.signInWithEmailAndPassword(this.email,this.password).then(function(user){
					//console.log(user)
	
						_this.$router.replace('home')
					} ,
					function(err) {
						_this.$toaster.error(err.message)
					}
				)
			},
			signUp: function() {
				this.$router.replace('register')
			}
		}
	}
</script>