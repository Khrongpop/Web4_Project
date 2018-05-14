<template>

	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<div class="row pt-3">
					<div class="col-md-7">

					</div>

				</div> <!-- row breadcrumb -->

				<div class="row">
					<div class="col-sm-7 col-md-7">
						<h3>{{Band.full_name}}</h3>
					</div>

				</div> <!-- row -->

				<!--{{ Band.key }}-->
				<div class="row">
					<div class="col-md-12">

						<div class="form-group">
							<div class="image-preview" v-if="imageData.length > 0">
								<img class="preview" :src="imageData" style="width: 100%;">
							</div>
							<div v-else>
									<img :src="Band.file" class="img-fluid" style="width: 100%"/>
							</div>
						</div>

						<div class="form-group">
							<b-form-input id="input_name" size="md" v-model="Band.full_name" placeholder="Brand name">
							</b-form-input>
						</div>


						<div class="form-group">
							<b-form-file v-model="file"  placeholder="Choose a file..." @change="previewImage"></b-form-file>
						</div>


						<div class="form-group">
							<select  class="custom-select" v-model="Band.mStyle" v-bind="Band.mStyle">
								<option   disabled>Your music Style</option>
								<option  v-for="(style, index) in styles" >{{style}}</option>
							</select>
						</div>

						<div class="form-group">
							<b-form-input id="input_member" size="md" v-model="Band.member" placeholder="Number of member" type="number">
							</b-form-input>
						</div>



						<div v-if="Band.member > 0">


							<div class="form-row form-group ">
								<div class=" col-6" v-for="n in 100" v-if="n <= genRow">
									<div class="mb-3"  >
										<select   class="custom-select" v-model="Band.memberInstrument[n-1]" >
											<option  v-for="(type, index) in types" :value="type">{{type}}</option>
										</select>
									</div>
								</div>
							</div>

							<div class="form-group " v-if=" Band.memberInstrument ">
								<select   class="custom-select" v-model="myInstrument" >
									<option  disabled>Your Instrument</option>
									<option v-for="myIn in Band.memberInstrument">{{myIn}}</option>
									<!--<option  v-for="(type, index) in types" :value="type">{{type}}</option>-->
								</select>
							</div>

						</div>

						<div class="form-group mt-3" v-if="progress > 0">
							<div class="col-md-6 offset-3">
								<b-progress :value="progress" :max="100" show-progress class="mb-3"></b-progress>
							</div>
						</div>


						<div class="form-group">

							<div class="ml-auto  text-md-right">
								<b-button variant="success" block @click="EditBand">
									Save
								</b-button>
							</div>

						</div>

						<div class="form-group">

							<div class="ml-auto  text-md-right">
								<b-button variant="danger" block @click="showModal">
									Delete
								</b-button>
							</div>

						</div>

					</div>
				</div> <!-- row -->

			</div>
		</div> <!-- row -->
		<div>
			<b-modal ref="myModalRef" hide-footer title="Do you want to delete band" id="modalsm "  centered>
				<b-btn class="mt-3" variant="outline-danger"  @click="DeleteBand">Yes </b-btn>
				<b-btn class="mt-3" variant="outline-primary"  @click="hideModal">Close </b-btn>
			</b-modal>
		</div>
	</div>
</template>


<script>
    import { bandRef , dbAuth , userRef ,storage} from '../firebaseConfig.js'

    export default {
        firebase: {
            bands: bandRef
        },
        data() {
            return {
                breadcrumb: [
                    {
                        text: 'Home',
                        href: '/'
                    },
                    {
                        text: '555',
                        active: true
                    },

                ],
                Band: {
                    full_name:'',
                    member:0,
                    memberInstrument: [],
                    Instrument: [],
                    mStyle:'',
                    key:'',
                    uid:'',
                    file:null
                },
                imageData:'',
				file:null,
                currentUser:null,
                myInstrument:'',
                types: [ 'Vocal' , 'Guitar' , 'Bass' , 'Drum' , 'Keyboard' ],
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
                members:[],
                progress:0
            }
        },
        methods: {
            EditBand: function() {
                for (var i =0;i<this.Band.member;i++) {
                    if (this.myInstrument === this.Band.memberInstrument[i]) {
                        this.Band.Instrument[i] = this.currentUser.uid
                    }
                }

                bandRef.child(this.Band.key).update(this.Band)

				if(this.imageData != '') {

                    let filename = this.file.name
                    let ext = filename.slice(filename.lastIndexOf('.'))
                    let storageRef = storage.ref('band/' + this.Band.key + ext)
                    let uploadTask = storageRef.put(this.file)

                    let _this = this

                    uploadTask.on('state_changed', function (snapshot) {
                        _this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // var progress = (snapshot)
                    }, function (error) {

                    }, function () {
                        // var downloadURL = uploadTask.snapshot.downloadURL
                        // console.log(downloadURL)
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('File available at', downloadURL);
                            bandRef.child(_this.Band.key).update({file: downloadURL})

                            _this.$toaster.success('Update ' + _this.Band.full_name + ' Success')

                            // By pass to page home
                            _this.$router.push({name: 'home'})
                        });


                    })
                } else if(this.imageData == '') {
                    this.$toaster.success('Update ' + this.Band.full_name + ' Success')
                    this.$router.push({name:'home'})
				}




            },
            DeleteBand: function () {
                this.$refs.myModalRef.hide()
                bandRef.child(this.Band.key).remove()
				for( var member in this.members) {
                    userRef.child(this.members[member].uid).child('band').remove()
				}
                this.$toaster.success(this.Band.full_name+" Remove success")
                this.$router.push({name:'home'})
            },
            signOut: function() {
                let _this = this
                dbAuth.signOut().then(()=> {
                    _this.$router.push({name:'login'})
                })
            },
            showModal () {
                this.$refs.myModalRef.show()
            },
            hideModal () {
                // this.DeleteBand()
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
                //console.log(user.email)
            })
            let key = this.$route.params.key
			if(key == null) {
                _this.$router.push({name:'home'})
			}
            bandRef.child(key).once("value").then(function(snapshot){
                console.log(snapshot.val())
                if (snapshot.val() === null) {
                    _this.$route.push( {name: 'name'} )
                }
                _this.Band.full_name = snapshot.child("full_name").val()
                _this.Band.member = snapshot.child("member").val()
                _this.Band.memberInstrument = snapshot.child("memberInstrument").val()
                _this.Band.mStyle = snapshot.child("mStyle").val()
                _this.Band.uid = snapshot.child("uid").val()
                _this.Band.file = snapshot.child("file").val()
                _this.Band.key = snapshot.key
                _this.Band.member*=1

				if(_this.Band.uid != _this.currentUser.uid) {
                    _this.$router.push({name:'home'})
				}
            })

            userRef.once("value").then(function(snapshot){
                // _this.users = snapshot.val()
                console.log(snapshot.val())
                var i = 0
                for (var ukey in snapshot.val()) {
                    userRef.child(ukey).once("value").then(function(snapshot){
                        if(snapshot.child("band").val() == key) {
                            // console.log('member')
                            _this.members.push({
                                uid: snapshot.child("id").val(),
                                displayName: snapshot.child("displayName").val(),
                                email: snapshot.child("email").val(),
                                band: snapshot.child("band").val(),
                            })
                        }
                        // console.log("user : " + users)
                    })
                    i++
                }



            })
        },
        computed: {
            genRow: function () {
                return this.Band.member*1
            }
        }
    }
</script>

<style scoped>
	.modal-dialog {
		width: 250px !important;
		max-width: 250px !important;
	}
</style>