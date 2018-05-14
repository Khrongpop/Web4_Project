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

                    </div>
                    <div class="col-md-5">
                    </div>
                </div> <!-- row -->

                <!--{{ Band.key }}-->

                <div class="form-group " v-if=" Band.memberInstrument ">
                    <select   class="custom-select" v-model="myInstrument" >
                        <option  disabled>Your Instrument</option>
                        <option v-for="(myIn , index)  in Band.memberInstrument" v-if="Band.Instrument[index] == null">{{myIn}}</option>
                        <!--<option  v-for="(type, index) in types" :value="type">{{type}}</option>-->
                    </select>
                </div>

                <div class="form-group">

                    <div class="ml-auto  text-md-right">
                        <b-button variant="success" block @click="Joinband">
                            Join
                        </b-button>
                    </div>

                </div>





            </div>
        </div> <!-- row -->
    </div>
</template>

<script>
    import { bandRef , dbAuth , mydb} from '../firebaseConfig.js'

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
                    uid:''
                },
                currentUser:null,
                myInstrument:'',
                types: [ 'Vocal' , 'Guitar' , 'Bass' , 'Drum' , 'Keyboard' ],
                styles: [ 'Rock' , 'Pop' , 'Jazz' , 'Blue' , 'Indy','Fusion','Alternative' ],
            }
        },
        methods: {
            Joinband: function() {
                for (var i =0;i<this.Band.member;i++) {
                    if (this.myInstrument === this.Band.memberInstrument[i]) {
                        this.Band.Instrument[i] = this.currentUser.uid
                    }
                }
                let update = {
                    full_name:this.Band.full_name ,
                    member:this.Band.member ,
                    memberInstrument:this.Band.memberInstrument ,
                    Instrument:this.Band.Instrument ,
                    mStyle:this.Band.mStyle ,
                }
                bandRef.child(this.Band.key).update(update)
                this.$toaster.success('Join '+this.Band.full_name+' Success')
                this.$router.push({name:'home'})
            },
            DeleteBand: function () {
                bandRef.child(this.Band.key).remove()
                this.$toaster.success(this.Band.full_name+"Remove success")
                this.$router.push({name:'home'})
            },
            signOut: function() {
                let _this = this
                dbAuth.signOut().then(()=> {
                    _this.$router.push({name:'login'})
                })
            }

        },
        created() {
            let _this = this
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                //console.log(user.email)
            })
            let key = this.$route.params.key
            bandRef.child(key).once("value").then(function(snapshot){
                console.log(snapshot.val())
                if (snapshot.val() === null) {
                    _this.$route.push( {name: 'name'} )
                }
                _this.Band.full_name = snapshot.child("full_name").val()
                _this.Band.member = snapshot.child("member").val()
                _this.Band.Instrument = snapshot.child("Instrument").val()
                _this.Band.memberInstrument = snapshot.child("memberInstrument").val()
                _this.Band.mStyle = snapshot.child("mStyle").val()
                _this.Band.uid = snapshot.child("uid").val()
                _this.Band.key = snapshot.key
                _this.Band.member*=1


                mydb.ref('users').child(_this.currentUser.uid).update({ band : _this.Band.key})
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

</style>