<template>


	<div class="container">

		<div class="form-horizontal mt-5" role="form">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<h2>Register </h2>
					<hr>
				</div>
			</div>

			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<div class="form-group has-danger">
						<!--<label class="sr-only" for="email">E-Mail Address</label>-->
						<div class="input-group mb-2 mr-sm-2 mb-sm-0">

							<input type="text" name="text" class="form-control"
								   placeholder="Name" required autofocus v-model='displayName'>
						</div>
					</div>
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
					<button type="submit" class="btn btn-outline-dark"  @click="signUp" style="width: 80%" >
						<!--<icon name="home"/> -->
						Register</button>
					<a class="btn btn-link"  @click="signIn" >Don't have an account ? Login</a>
				</div>
			</div>
		</div>



	</div>
</template>

<script >
	import { dbAuth  , mydb ,userRef} from '../firebaseConfig.js'

	export default {
		data(){
			return {
				email:'',
				password:'',
				displayName:''
			}
		},
		methods: {

			signUp: function () {
				let _this = this


                dbAuth.createUserWithEmailAndPassword(this.email,this.password)
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                            _this.$toaster.error('The password is too weak.');
                        } else {
                            _this.$toaster.error(errorMessage);
                        }
                        console.log(error);
                    });

                dbAuth.onAuthStateChanged(function (user) {
                   			 let newUser = {
                        		    id: user.uid,
                        		    email :_this.email,
                        			displayName : _this.displayName,
								 	image : 'https://firebasestorage.googleapis.com/v0/b/vuefirebasee.appspot.com/o/myImg%2Fdefault-user.png?alt=media&token=b7380061-e64b-412c-aa67-7b78fef6802b',
								    first: 'yes'
                        		}
                    mydb.ref('users').child(user.uid).set(newUser);
                    _this.$router.replace('home')
                })

			},
            signIn: function() {
                this.$router.replace('home')
            }
		}
	}
</script>