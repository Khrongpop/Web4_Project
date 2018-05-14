
<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<div class="row pt-3">
					<div class="col-md-7">

					</div>

				</div> <!-- row breadcrumb -->

				<!--<div class="row">-->
					<!--<div class="col-sm-7 col-md-7">-->
						<!--<h3>Home</h3>-->
					<!--</div>-->
					<!--<div class="col-md-5">-->

						<!--<b-dropdown class="mx-1" right text="menu">-->
							<!--<b-dropdown-item href="/">Home</b-dropdown-item>-->
							<!--<b-dropdown-item href="/createband">CreateBand</b-dropdown-item>-->
							<!--<b-dropdown-item @click="signOut">Signout</b-dropdown-item>-->
						<!--</b-dropdown>-->
					<!--</div>-->
				<!--</div> &lt;!&ndash; row &ndash;&gt;-->
				<div v-for="(style,index) in styles" >
					<div  v-for = " ( ban , jndx ) in bands " >
							<div v-if="style == ban.mStyle">
								<span style="display: none;"> {{sets[index] = 1}} </span>
							</div>
					</div>


				</div>


			<!--<div  v-for = " ( ban , indx ) in bands " >-->
					<div v-for="(style,index) in styles" >


						<div v-if="sets[index] == 1" >
							<h2 class="text-left" >{{style}}</h2>
							<div class="row pt-2">
								<div class="col-md-4" v-for = " band in bands " v-if="band.mStyle == style">
									<div class="card mb-3 text-left" >
										<div class="card-img band-img">
											<div v-if="band.file != null">
												<img :src="band.file" class="img-fluid"/>
											</div>
										</div>

										<div class="card-header" >
											<span style="font-size: 24px;">{{band.full_name}}</span>
										</div>
										<div class="card-body">

												Style : {{band.mStyle}} <br>
												Member : {{band.member}} <br>
											<strong>Instrumet</strong>   <br>
											<span v-for = " instrumet in band.memberInstrument ">
												{{instrumet}}
											</span>
											<br>
											 <div v-for="user in users" v-if="user.id == band.uid">
												by	{{user.displayName}} <br>
											</div>
											<!--<div v-if="currentUser.uid == band.uid">-->
												<router-link class="btn btn-outline-dark mt-4" :to="{ name: 'show', params: { key: band['.key'] } }" style="width: 100%; "> See more </router-link>
											<!--</div>-->

										</div>

									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			<!--</div>-->


		</div>

		<b-modal ref="myModalRef" hide-footer hide-title size="lg">
			<div class="d-block text-center">
				<h3>Set yours image profile</h3>
			</div>
			<div class="d-block text-center">
				<div class="image-preview mb-5" v-if="imageData.length > 0">
					<img class="preview" :src="imageData" style="width: 100%; height: 600px;">
				</div>
				<div v-else class="mb-5">
					<img class="preview" :src="user.image" style="width: 100%; height: 600px;">
				</div>
				<b-form-file v-model="file"  placeholder="Choose a file..." @change="previewImage"></b-form-file>
			</div>

			<div class="row">
				<div class="col-md-6">
					<b-btn class="mt-3" variant="outline-danger" block @click="nosave">No</b-btn>
				</div>

				<div class="col-md-6">
					<b-btn class="mt-3" variant="danger" block @click="saveImg">Save Image</b-btn>
				</div>
			</div>

		</b-modal>

	</div>


</template>

<script >

	import { bandRef , dbAuth , userRef ,storage} from '../firebaseConfig.js'

	export default {
		firebase: {
			bands: bandRef,
			users: userRef
		},
		data() {
            return {
                currentUser:null,
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
				sets:[],
				user: {
                    displayName:'',
					uid:'',
					image:'',
					email:''
				},
                imageData:'',
				file:null,
				defaultImage: 'https://firebasestorage.googleapis.com/v0/b/vuefirebasee.appspot.com/o/myImg%2Fdefault-user.png?alt=media&token=b7380061-e64b-412c-aa67-7b78fef6802b',
            }
		},
		methods: {
            signOut: function() {
                let _this = this
                dbAuth.signOut().then(()=> {
                    _this.$router.push({name:'login'})
                })
            },
            saveImg () {

                let _this = this

                if(this.imageData != ''){

                    let filename = this.file.name
                    let ext = filename.slice(filename.lastIndexOf('.'))
                    let storageRef = storage.ref('user/'+this.user.uid+ext)
                    let uploadTask = storageRef.put(this.file)

                    uploadTask.on('state_changed', function(snapshot) {
                        _this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // var progress = (snapshot)
                    }, function(error) {

                    }, function() {

                        // var downloadURL = uploadTask.snapshot.downloadURL
                        // console.log(downloadURL)
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('File available at', downloadURL);
                            userRef.child(_this.user.uid).update({ image:downloadURL })
                            userRef.child(_this.user.uid).child('first').remove()
                            _this.$toaster.success('Update ' + _this.user.displayName+' Profile Success')
                            // By pass to page home
                            // _this.$router.push({ name: 'home'})
                            _this.$refs.myModalRef.hide()
                        });


                    })
                } else if (this.imageData == '') {
                    console.log('ele');
                    this.$toaster.error('Please Select   Profile Image')
                    // By pass to page home
                    // this.$refs.myModalRef.hide()
                }


            },
            nosave () {
                userRef.child(this.user.uid).child('first').remove()
                this.$refs.myModalRef.hide()
            },
            previewImage: function(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imageData = e.target.result;
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            }

		},

        created() {
            let _this = this
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                userRef.child(user.uid).once("value").then(function(snapshot) {

                    // console.log(snapshot.child("displayName").val())
                    	_this.user.uid = snapshot.child("id").val(),
                        _this.user.displayName = snapshot.child("displayName").val(),
                        _this.user.email = snapshot.child("email").val()
					    _this.user.image = snapshot.child("image").val()
						if(snapshot.child("first").val() == 'yes') {
                                _this.$refs.myModalRef.show()
							}

                })
            })
        },
	}

</script>

<style scoped>
	img {
		object-fit: cover;
	}
	.band-img img {

		height: 250px;
	}
</style>