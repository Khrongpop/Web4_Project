<template>

    <div class="container">
        <div class="row">
            <div class="col-md-12">



                <div class="row">
                    <div class="col-md-12 text-left">
                        <h3>Create New Band</h3>
                        <!--{{ currentUser.displayName}}-->


                        </div>
                </div> <!-- row -->
                <div class="row">

                    <div class="col-md-12">

                        <!--<b-form-group horizontal-->
                                      <!--:label-cols="1"-->
                                      <!--label-size="md"-->
                                      <!--label="Full Name"-->
                                      <!--label-class="text-md-right"-->
                                      <!--label-for="input_name"-->

                        <!--&gt;-->
                        <div class="form-group">
                            <div class="image-preview" v-if="imageData.length > 0">
                                <img class="preview" :src="imageData" style="width: 100%;">
                            </div>
                        </div>

                        <div class="form-group">
                            <b-form-input id="input_name" size="md" v-model="newBand.full_name" placeholder="Brand name">
                            </b-form-input>
                        </div>

                        <div class="form-group">
                          <b-form-file v-model="newBand.file" :state="Boolean(newBand.file)" placeholder="Choose a file..." @change="previewImage"></b-form-file>
                        </div>

                        <div class="form-group">
                            <select  class="custom-select" v-model="newBand.mStyle" v-bind:value="newBand.mStyle">
                                <option   disabled>Your music Style</option>
                                <option  v-for="(style, index) in styles"  v-bind:value="style">{{style}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <b-form-input id="input_member" size="md" v-model="newBand.member" placeholder="Number of member" type="number">
                            </b-form-input>
                        </div>

                        <div v-if="newBand.member > 0">


                            <div class="form-row form-group ">
                                <div class=" col-6" v-for="n in genRow">
                                    <div class="mb-3" >
                                        <select   class="custom-select" v-model="newBand.memberInstrument[n-1]" >
                                            <!--<option  disabled>Music Instrument</option>-->
                                            <option  v-for="(type, index) in types" v-bind:value="type">{{type}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group " v-if=" newBand.memberInstrument ">
                                <select   class="custom-select" v-model="myInstrument" >
                                    <option  disabled>Your Instrument</option>
                                    <option v-for="myIn in newBand.memberInstrument">{{myIn}}</option>
                                    <!--<option  v-for="(type, index) in types" :value="type">{{type}}</option>-->
                                </select>
                            </div>


                        </div>


                        <!--</b-form-group>-->

                        <!--<b-form-group horizontal-->
                                      <!--:label-cols="1"-->
                                      <!--label-size="md"-->
                                      <!--label="Student ID"-->
                                      <!--label-class="text-md-right"-->
                                      <!--label-for="input_id"-->

                        <!--&gt;-->
                            <!--<b-form-input id="id" size="md" v-model="newStudent.student_id">-->
                            <!--</b-form-input>-->

                        <!--</b-form-group>-->


                        <div class="form-group">

                            <div class="ml-auto  text-md-right">
                                <b-button variant="outline-dark" block @click="addBand">
                                    save
                                </b-button>
                            </div>

                        </div>

                        <div class="form-group mt-3" v-if="progress > 0">
                            <div class="col-md-6 offset-3">
                                <b-progress :value="progress" :max="100" show-progress class="mb-3"></b-progress>
                            </div>
                        </div>

                    </div>
                </div> <!-- row -->

            </div>
        </div> <!-- row -->
    </div>

</template>

<script >

    import { bandRef , mydb , dbAuth ,userRef ,storage} from '../firebaseConfig.js'


    export default {
        data() {
            return {
                breadcrumb: [

                    {
                        text: 'Home',
                        href:'/'
                    },

                    {
                        text: 'CreateBand',
                        active:true
                    },

                ],
                imageData: "",
                newBand: {
                    // Band_id:'',
                    full_name:'',
                    member:0,
                    memberInstrument: [],
                    Instrument: [],
                    mStyle:'',
                    uid:'',
                    file:null
                },
                types: [ 'Vocal' , 'Guitar' , 'Bass' , 'Drum' , 'Keyboard' ],
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
                foods: [
                    { text: 'Select One', value: null },
                    'Carrots', 'Beans', 'Tomatoes', 'Corn'
                ],
                currentUser:null,
                myInstrument: '',
                progress:0

            }
        },
        methods: {
            addBand: function() {
                for (var i =0;i<this.newBand.member;i++) {
                    if (this.myInstrument === this.newBand.memberInstrument[i]) {
                        this.newBand.Instrument[i] = this.currentUser.uid
                    }
                }
                this.newBand.uid = this.currentUser.uid

                let filename = this.newBand.file.name
                let ext = filename.slice(filename.lastIndexOf('.'))
                let band = bandRef.push(this.newBand)
                let storageRef = storage.ref('band/'+band.key+ext)
                let uploadTask = storageRef.put(this.newBand.file)

                let _this = this


                uploadTask.on('state_changed', function(snapshot) {
                    _this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // var progress = (snapshot)
                }, function(error) {

                }, function() {

                    // var downloadURL = uploadTask.snapshot.downloadURL
                    // console.log(downloadURL)
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                        bandRef.child(band.key).update({ file:downloadURL })
                        _this.newBand.full_name = ''
                        _this.newBand.member = 0
                        _this.newBand.memberInstrument = []
                        _this.newBand.mStyle = ''

                        mydb.ref('users').child(_this.currentUser.uid).update({ band : band.key})

                        _this.$toaster.success('Create ' + _this.newBand.full_name+' Success')

                        // By pass to page home
                        _this.$router.push({ name: 'home'})
                    });


                })


                // mydb.ref('users').child(this.currentUser.uid).update({ band : band.key})
                //
                // this.$toaster.success('Create ' + this.newBand.full_name+' Success')
                // this.$router.push({name:'home'})

            },
            signOut: function() {
                let _this = this
                dbAuth.signOut().then(()=> {
                    _this.$router.push({name:'login'})
                })
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
            // addStudent: function() {
            //     studentRef.push(this.newStudent);
            //     this.newStudent.full_name = ''
            //     this.newStudent.student_id = ''
            //     this.$router.push({name:'home'})
            // }
        },
        computed: {
            genRow: function () {
                return this.newBand.member*1
            },
            getMyInstrument: function () {
                // for (var i =0;i<this.newBand.member;i++) {
                //     if (this.myInstrument === this.newBand.memberInstrument[i]) {
                //         this.Instrument[i] = this.currentUser.uid
                //     }
                // }
                var s = ''
                for (var i =0;i<this.newBand.member;i++) {
                    if (this.myInstrument === this.newBand.memberInstrument[i]) {
                        this.newBand.Instrument[i] = this.currentUser.uid
                        console.log(this.newBand.Instrument[i])
                    }
                    s +=   i + ' , '
                }
                // return this.In
            }
        },
        created() {
            let _this = this
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user

                userRef.child(user.uid).once("value").then(function(snapshot){
                // console.log(snapshot.child("band").val() )

                    if( snapshot.child("band").val() != null) {
                    // console.log("have band")
                        _this.$toaster.error("You already have Band")
                        _this.$router.push({name:'home'})
                    }
                    // console.log("user : " + users)
                })

                //console.log(user.email)
            })


        },

    }
</script>

