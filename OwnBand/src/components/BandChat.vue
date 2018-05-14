<template>
    <div class="container">
        <div class="row pt-4">

                <h2>{{Band.full_name}}</h2>

        </div> <!-- row -->

        <div class="row mt-2">
            <div class="col-md-5 text-left">
                <h3>Member</h3>
                <div v-for="band in bans" v-if="band['.key'] == key">
                    <div v-for="(instrument ,index) in band.memberInstrument" class="form-group">



                            <div v-if="band.Instrument[index] == member.uid" v-for="member in members" class="row">
                                <div class="col-md-2  col-sm-1"  >
                                    <!--<div class="img-avt" >-->
                                    <img :src="member.image"   style="width: 75px; height: 75px;" />
                                    <!--</div>-->
                                </div>
                                <div class="col-md-8 pt-1 col-sm-8 offset-sm-1 ">
                                            <h4> {{member.displayName}}</h4>
                                {{instrument}}
                                </div>
                           </div>




                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <h3 class="text-left">Chat</h3>
                    <div class="card" style="height: 500px; overflow-y: scroll">
                        <div class="card-body">
                            <!--<div class="" v-for="( message , index) in Band.messages" v-if="Band.messages != null">-->

                                <!--<div v-if="message.uid == currentUser.uid" class="text-right pull-right" >-->

                                    <!--<div v-for="member in members" class=" text-right mb-2" v-if="message.uid == member.uid">-->


                                        <!--{{message.message}}-->
                                        <!--<img :src="member.image"  class="img-fluid ml-3"  style="width: 50px; height: 50px; border-radius: 50%;"/>-->

                                    <!--</div>-->

                                <!--</div>-->

                                <!--<div v-else class="text-left">-->
                                    <!--<div v-for="member in members" class=" text-left mb-2" v-if="message.uid == member.uid">-->

                                        <!--<img :src="member.image"  class="img-fluid mr-3" style="width: 50px; height: 50px; border-radius: 50%;"/>-->
                                        <!--{{message.message}}-->


                                    <!--</div>-->
                                <!--</div>-->

                            <!--</div>-->
                            <div v-for="band in bans" v-if="band['.key'] == key">

                                <div class="" v-for="( message , index) in band.messages" v-if="band.messages != null">

                                    <div v-if="message.uid == currentUser.uid" class="text-right pull-right" >

                                        <div v-for="member in members" class=" text-right mb-2" v-if="message.uid == member.uid">


                                            {{message.message}}
                                            <img :src="member.image"  class="img-fluid ml-3"  style="width: 50px; height: 50px; border-radius: 50%;"/>

                                        </div>

                                    </div>

                                    <div v-else class="text-left">
                                        <div v-for="member in members" class=" text-left mb-2" v-if="message.uid == member.uid">

                                            <img :src="member.image"  class="img-fluid mr-3" style="width: 50px; height: 50px; border-radius: 50%;"/>
                                            {{message.message}}


                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                <div class="form-row mt-3">
                    <div class="col-md-10">
                        <b-form-input id="input_name" size="md" v-model="NewMessage.memsage" placeholder=" Message ...."   v-on:keyup.enter="addChats">
                        </b-form-input>
                    </div>
                    <div class="col-md-2 mt-sm-2">
                        <b-button variant="outline-dark" block @click="addChats" >
                            SEND
                        </b-button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { bandRef , dbAuth , userRef} from '../firebaseConfig.js'

    export default {
        firebase: {
            bans: bandRef
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
                    messages:[]
                },
                NewMessage: {
                    uid:'',
                    memsage:''
                },
                currentUser:null,
                myInstrument:'',
                types: [ 'Vocal' , 'Guitar' , 'Bass' , 'Drum' , 'Keyboard' ],
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
                members:[],
                key:''
            }
        },
        methods: {
            addChats: function () {

                this.Band.messages.push({
                   message: this.NewMessage.memsage,
                    uid: this.currentUser.uid
                })
                bandRef.child(this.Band.key).child('messages').update( this.Band.messages)
                // console.log(this.NewMessage.memsage)
                this.NewMessage.memsage = ''
            }  
        },
        created() {
            let key = this.$route.params.key
            this.key = key
            // console.log(key)
            if(key == null) {
                _this.$router.push({name:'home'})
            }

            let _this = this
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                //console.log(user.email)
            })

            bandRef.child(key).once("value").then(function(snapshot){
                console.log(snapshot.val())
                // if (snapshot.val() === null) {
                //     _this.$route.push( {name: 'home'} )
                // }
                _this.Band.full_name = snapshot.child("full_name").val()
                _this.Band.member = snapshot.child("member").val()
                _this.Band.memberInstrument = snapshot.child("memberInstrument").val()
                _this.Band.Instrument = snapshot.child("Instrument").val()
                _this.Band.mStyle = snapshot.child("mStyle").val()
                _this.Band.uid = snapshot.child("uid").val()
                if( snapshot.child("messages").val() != null) {
                    _this.Band.messages = snapshot.child("messages").val()
                }
                _this.Band.key = snapshot.key
                _this.Band.member*=1


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
                                image: snapshot.child("image").val(),
                            })
                        }
                        // console.log("user : " + users)
                    })
                    i++
                }



            })
        },
    }
</script>

<style scoped>
    .img-avt {
        height: 75px;
        width: 75px;
        border-radius: 50%;
        overflow: hidden;
    }
    img {
        object-fit: cover;
    }
</style>