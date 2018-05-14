<template>

    <div class="container text-left" >
        <div class="row" v-for="band in bands" v-if="band['.key'] == key">
            <div class="col-md-12">

                <div class="row pt-3">

                    <h1> {{band.full_name}} </h1>

                </div> <!-- row breadcrumb -->



                <!--{{ Band.key }}-->

                <div class="row mt-3">
                    <div class="col-md-7 ">

                        <div class="">
                            <div class="form-group">
                                <!--<b-form-input id="input_name" size="md" v-model="Band.full_name" placeholder="Brand name">-->
                                <!--</b-form-input>-->
                                <div class="">

                                </div>

                                <div class="card-img">
                                    <div v-if="band.file != null">
                                        <img :src="band.file" class="img-fluid" style="width: 100%"/>
                                    </div>
                                </div>



                            </div>







                        </div>
                    </div>


                        <div class="col-md-5 text-left">
                            <div class="card-body">
                                <h2> {{band.mStyle}} Style</h2>
                                <h5>  Member : {{band.member}}</h5>

                                <!--<div v-for="(instrument ,index) in band.memberInstrument" class="">-->

                                    <!--&lt;!&ndash;<span v-for="member in Band.Instrument">&ndash;&gt;-->
                                        <!--&lt;!&ndash;{{ Band.Instrument[index]}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{instrument}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{Band.Instrument[index]}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;<span v-for="member in users" >&ndash;&gt;-->
                                        <!--&lt;!&ndash;{{band.Instrument[index]}}  ==   {{ member.uid}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<br>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<br>&ndash;&gt;-->
                                    <!--<div v-if="band.Instrument[index] == member.uid && band.Instrument[index] != null" v-for="member in busers" class="row mb-3">-->
                                    <!--&lt;!&ndash;<div v-if="getIntrument" v-for="member in users" class="row mb-3">&ndash;&gt;-->
                                        <!--&lt;!&ndash;{{member.displayName}}&ndash;&gt;-->
                                        <!--&lt;!&ndash;{{Band.Instrument[index]}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{ band.Instrument[index] }}&ndash;&gt;-->
                                        <!--<div class="col-md-2  "  >-->
                                            <!--&lt;!&ndash;<div class="img-avt" >&ndash;&gt;-->
                                            <!--<img :src="member.image"   style="width: 75px; height: 75px;" />-->
                                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                        <!--</div>-->
                                        <!--<div class="col-md-8 pt-1 pl-4">-->
                                            <!--<h4> {{member.displayName}}</h4>-->
                                            <!--{{instrument}}-->
                                            <!--&lt;!&ndash;{{ // band.Instrument[index] }}&ndash;&gt;-->
                                        <!--</div>-->
                                    <!--</div>-->

                                    <!--<div v-if="band.Instrument[index] == undefined ">-->
                                       <!--<h5>{{instrument}} :-->
                                           <!--<span v-if="currentUser.uid != band.uid">-->
                                               <!--<button class="btn btn-outline-dark" v-if="user.band == null "-->
                                               <!--@click="join(instrument)"> Join </button>-->
                                           <!--</span>-->
                                       <!--</h5>-->
                                    <!--</div>-->



                                <!--</div>-->

                                <div v-for="(instrument ,index) in band.memberInstrument" class="form-group">



                                    <div v-if="band.Instrument[index] == member.uid && band.Instrument[index] != null  " v-for="member in users" class="row">
                                        <div class="col-md-2  "  >
                                            <!--<div class="img-avt" >-->
                                            <img :src="member.image"   style="width: 75px; height: 75px;" />
                                            <!--</div>-->
                                        </div>
                                        <div class="col-md-8 pt-1 pl-4">
                                            <h4> {{member.displayName}}</h4>
                                            {{instrument}}
                                        </div>
                                    </div>

                                    <div v-if="band.Instrument[index] == undefined ">
                                        <h5>{{instrument}} :
                                            <span v-if="currentUser.uid != band.uid">
                                               <button class="btn btn-outline-dark" v-if="user.band == null "
                                                       @click="join(instrument)"> Join </button>
                                           </span>
                                        </h5>
                                    </div>




                                </div>


                                <span ></span>

                                <div v-if="currentUser.uid == band.uid" class="form-group mt-3">
                                    <router-link class="btn btn-outline-dark" :to="{ name: 'edit', params: { key: Band.key } }" style="width: 100%"> Edit  </router-link>
                                </div>
                                <!--{{ currentUser.uid}}-->
                                <div v-else class="form-group mt-3">

                                    <div  v-if="user.band == null ">
                                        <!--<router-link class="btn btn-primary" :to="{ name: 'join', params: { key: Band.key } }" style="width: 100%"> Join </router-link>-->
                                    </div >

                                    <div  v-if="user.band == Band.key ">
                                        <!--<router-link class="btn btn-primary" :to="{ name: 'home', params: { key: Band.key } }" style="width: 100%"  @click="leaveBand(user.uid,Band.key)"> Leave Band </router-link>-->
                                        <button  class="btn btn-outline-dark" style="width: 100%" @click="showModal(user.uid,Band.key)">Leave Band</button>
                                    </div>

                                </div>

                                <div v-if="currentUser.uid == member.uid" class="form-group" v-for="member in users">
                                    <router-link class="btn btn-dark" :to="{ name: 'bandchat', params: { key: Band.key } }" style="width: 100%"> Band Chat  </router-link>
                                </div>



                            </div>

                         </div>

                </div> <!-- row -->

            <!--<div v-for="user in users">-->
                <!--{{user}}-->
            <!--</div>-->



            </div>
        </div> <!-- row -->

        <div>
            <b-modal ref="myModalRef" hide-footer title="Do you want to Leave band" id="modalsm "  centered>
                <b-btn class="mt-3" variant="outline-danger"  @click="leaveBand(idL,bandL)">Yes </b-btn>
                <b-btn class="mt-3" variant="outline-primary"  @click="hideModal">Close </b-btn>
            </b-modal>
        </div>

    </div>
</template>


<script>
    import { bandRef,dbAuth ,userRef , mydb} from '../firebaseConfig.js'

    export default {
        firebase: {
            bands: bandRef,
            busers:userRef
        },
        data() {
            return {
                Band: {
                    uid:'',
                    full_name:'',
                    member:0,
                    memberInstrument: [],
                    Instrument:[],
                    nameMember:[],
                    mStyle:'',
                    key:'',
                    file:null
                },
                types: [ 'Vocal' , 'Guitar' , 'Bass' , 'Drum' , 'Keyboard' ],
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
                currentUser:null,
                users:[ ],
                idL:'',
                bandL: '',
                user: {
                    uid:'',
                    displayName:'',
                    email:'',
                    band:'',
                    image:'',
                },
                key:''

            }
        },
        methods: {
                signOut: function() {
                    let _this = this
                    dbAuth.signOut().then(()=> {
                        _this.$router.push( {name:'login'} )
                    })
                },
                 leaveBand: function (id,band) {
                     for (var i =0;i<this.Band.member;i++) {

                         if (id === this.Band.Instrument[i]) {
                             this.Band.Instrument[i] = null
                         }

                     }

                     for (var i in this.users) {
                         console.log(this.users[i].uid)
                         if(id === this.users[i].uid ) {

                                 // this.users[i] = null
                                 this.users.splice(i, 1)
                             }
                     }

                     this.user.band = null
                     mydb.ref('users').child(id).update({ band : null})
                     mydb.ref('bands').child(band).update({ Instrument : this.Band.Instrument})
                     // this.users[0].remove()
                     // this.users.splice(index, 1)
                     this.$toaster.success('Leave Success')
                     this.$refs.myModalRef.hide()
                     // this.$router.push( {name:'home'} )
                     // this.$router.push( {name:'show', params: { key: this.Band.key }} )
                     // _this.$router.push({name:'home'})
                 },
                showModal (id,band) {
                    this.idL = id
                    this.bandL = band
                    this.$refs.myModalRef.show()
                },
                hideModal () {
                    // this.DeleteBand()
                    this.$refs.myModalRef.hide()
                },
                join: function (instrument) {
                    for (var i =0;i<this.Band.member;i++) {
                        if (instrument === this.Band.memberInstrument[i]) {
                            this.Band.Instrument[i] = this.currentUser.uid
                        }
                    }
                    //

                    this.users.push({
                        uid: this.user.uid,
                        displayName: this.user.displayName,
                        email: this.user.email,
                        band: this.Band.key,
                        image: this.user.image
                    })


                    let update = {
                        full_name:this.Band.full_name ,
                        member:this.Band.member ,
                        memberInstrument:this.Band.memberInstrument ,
                        Instrument:this.Band.Instrument ,
                        mStyle:this.Band.mStyle ,
                    }

                    this.user.band = this.Band.key

                    bandRef.child(this.Band.key).update(update)
                    mydb.ref('users').child(this.currentUser.uid).update({ band : this.Band.key})
                    this.$toaster.success('Join '+instrument+' Success.')
                    // this.$router.push( {name:'home'} )
                    // this.$router.push( {name:'show', params: { key: this.Band.key }} )
                }
            },
            created() {
                let key = this.$route.params.key
                let _this = this
                this.key = key
                if(key == null) {
                    _this.$router.push({name:'home'})
                }
                // var users = this.users

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

                userRef.once("value").then(function(snapshot){
                    // _this.users = snapshot.val()
                    console.log(snapshot.val())
                    var i = 0
                    for (var ukey in snapshot.val()) {
                            userRef.child(ukey).once("value").then(function(snapshot){
                                if(snapshot.child("band").val() == key) {
                                    _this.users.push({
                                        uid: snapshot.child("id").val(),
                                        displayName: snapshot.child("displayName").val(),
                                        email: snapshot.child("email").val(),
                                        band: snapshot.child("band").val(),
                                        image: snapshot.child("image").val(),
                                    })
                                }
                                // console.log("user : " + users)
                            })
                        i++
                    }

                })

                bandRef.child(key).once("value").then(function(snapshot){
                    console.log(snapshot.val())
                    if (snapshot.val() === null) {
                        _this.$route.push( {name: 'name'} )
                    }
                    _this.Band.uid = snapshot.child("uid").val()
                    _this.Band.full_name = snapshot.child("full_name").val()
                    _this.Band.member = snapshot.child("member").val()
                    _this.Band.memberInstrument = snapshot.child("memberInstrument").val()
                    _this.Band.Instrument = snapshot.child("Instrument").val()
                    _this.Band.mStyle = snapshot.child("mStyle").val()
                    _this.Band.file = snapshot.child("file").val()
                    _this.Band.key = snapshot.key
                    _this.Band.member*=1



                })

                dbAuth.onAuthStateChanged(function (user) {
                    _this.currentUser = user
                    //console.log(user.email)
                })
            },
        computed: {
            genRow: function () {
                return this.Band.member*1
            },
            getIntrument: function (index , member) {
                return true
            }
        }
    }
</script>

<style scoped>
    img {
        object-fit: cover;
    }
</style>