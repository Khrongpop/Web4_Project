<template>
    <div class="container">
        <div class="form-horizontal mt-5" role="form">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>Edit Profile </h2>
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group has-danger">
                        <!--<label class="sr-only" for="email">E-Mail Address</label>-->
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">


                            <div class="image-preview" v-if="imageData.length > 0">
                                <img class="preview" :src="imageData" >
                            </div>

                            <div v-else>

                                <img :src="user.image"  />
                            </div>

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
                            <b-form-file v-model="file"  placeholder="Choose a file..." @change="previewImage"></b-form-file>

                            <!--<input type="file"  class="form-control"  placeholder="Name" required  v-model='user.image'>-->
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

                            <input type="text" name="text" class="form-control"
                                   placeholder="Name" required autofocus v-model='user.displayName'>
                        </div>
                    </div>
                </div>
            </div>



            <div class="row" style="padding-top: 1rem">
                <div class="col-md-3">

                </div>
                <div class="col-md-6">
                    <button type="submit" class="btn btn-outline-dark"  @click="edit" style="width: 80%" > Edit</button>
                </div>
            </div>

            <div class="row mt-3" v-if="progress > 0">
                <div class="col-md-6 offset-3">
                    <b-progress :value="progress" :max="100" show-progress class="mb-3"></b-progress>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { storage , dbAuth , userRef} from '../firebaseConfig.js'
    export default {
        data() {
            return {
                currentUser:null,
                user: {
                    uid:'',
                    displayName:'',
                    email:'',
                    band:'',
                    image:'',
                },
                file:null,
                imageData:'',
                progress:0
            }
        },
        methods: {
            edit:function () {


                let  user = userRef.child(this.user.uid).update(this.user)


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
                            _this.$toaster.success('Update ' + _this.user.displayName+' Profile Success')
                            // By pass to page home
                            _this.$router.push({ name: 'home'})
                        });


                    })
                } else if (this.imageData == '') {
                    console.log('ele');
                    this.$toaster.success('Update ' + this.user.displayName+' Profile Success')
                    // By pass to page home
                    this.$router.push({ name: 'home'})
                }



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
                userRef.child(user.uid).once("value").then(function(snapshot){

                    // console.log(snapshot.child("displayName").val())
                    _this.user.uid = snapshot.child("id").val(),
                        _this.user.displayName = snapshot.child("displayName").val(),
                        _this.user.email = snapshot.child("email").val(),
                        _this.user.band = snapshot.child("band").val(),
                        _this.user.image = snapshot.child("image").val()



                })

            })


        },
    }
</script>

<style scoped>
    img {
        /*width: 100%;*/
        height: 500px;
        object-fit: cover;
    }
</style>