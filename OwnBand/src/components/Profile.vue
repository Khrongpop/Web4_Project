<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row mt-5">
                    <h1>Profile</h1>
                </div>
                <div class="row mt-5">
                    <div class="col-md-10 offset-1">

                        <!--<div class="card">-->
                        <div class="row">

                            <div class="card-img col-md-6">
                                <div v-if="user.image != null">
                                    <img :src="user.image" class="img-fluid" style="width: 100%;"/>
                                </div>
                            </div>



                        <!--</div>-->

                            <div class=" col-md-6">
                                <div class="card-body text-left ">
                                    <h1>{{user.displayName}}</h1>

                                    <div v-if="user.band != null">
                                        <h3 >
                                            Band :
                                            <router-link class=""  :to="{ name: 'show', params: { key: user.myBand.key } }" > {{user.myBand.full_name}}</router-link>
                                            <!--<a href='/show'>{{user.myBand.full_name}}</a>-->
                                        </h3>

                                        <h4 v-for="(instu,index) in user.myBand.Instrument" v-if="instu == user.uid">
                                            {{user.myBand.memberInstrument[index]}}

                                        </h4>
                                    </div>

                                    <h3 v-else>
                                        Don't have Band
                                    </h3>

                                    <h5>
                                        {{user.email}}
                                    </h5>

                                    <router-link class="btn btn-outline-dark mt-4"  :to="{ name: 'edituser', params: { key: user.uid } }" style="width: 100%;"> Edit </router-link>

                                </div>

                            </div>

                        </div>

                    </div>
                </div> <!-- row -->



                <!--{{ Band.key }}-->



            </div>
        </div> <!-- row -->


    </div>
</template>

<script>
    import { bandRef , dbAuth , userRef} from '../firebaseConfig.js'
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
                    myBand: {
                        uid:'',
                        full_name:'',
                        member:0,
                        memberInstrument: [],
                        Instrument:[],
                        nameMember:[],
                        mStyle:'',
                        key:'',
                        file:null
                    }
                }
            }
        },
        methods: {

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


                    if(snapshot.child("band").val() != null) {
                        bandRef.child(snapshot.child("band").val()).once("value").then(function(snapshot){
                            _this.user.myBand.uid = snapshot.child("uid").val()
                            _this.user.myBand.full_name = snapshot.child("full_name").val()
                            _this.user.myBand.member = snapshot.child("member").val()
                            _this.user.myBand.memberInstrument = snapshot.child("memberInstrument").val()
                            _this.user.myBand.Instrument = snapshot.child("Instrument").val()
                            _this.user.myBand.mStyle = snapshot.child("mStyle").val()
                            _this.user.myBand.file = snapshot.child("file").val()
                            _this.user.myBand.key = snapshot.key
                            _this.user.myBand.member*=1
                        })
                    }


                })

            })


        },
    }
</script>

<style scoped>

</style>