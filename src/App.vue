<template>
    <div>
        <div class="messages">
            <div v-for="(msg,i) in messages" class="message-card">
                <div class="flex-msg"> <small >{{msg.date}} </small> {{msg.text}}</div>
            </div>
        </div>
        <div class="input-box">
            <input type="text" v-model="msg" v-on:change="addNewMsg()" placeholder="Write anything . . . ">
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import TimeAgo from 'javascript-time-ago'

    // Load locale-specific relative date/time formatting rules.
    import ar from 'javascript-time-ago/locale/ar'

    // Add locale-specific relative date/time formatting rules.
    TimeAgo.addLocale(ar)

    // Create relative date/time formatter.
    const timeAgo = new TimeAgo('ar-AU')


    export default {
        data() {
            return {
                messages: [],
                msg: ''
            }
        },
        created() {
            var config = {
                apiKey: "AIzaSyBaBSBLttoQYuiC44kbuyuM9FqBmDFPIEE",
                authDomain: "vue-chat-b98f3.firebaseapp.com",
                databaseURL: "https://vue-chat-b98f3.firebaseio.com",
                projectId: "vue-chat-b98f3",
                storageBucket: "vue-chat-b98f3.appspot.com",
                messagingSenderId: "335848919356"
            };
            firebase.initializeApp(config);
            const settings = { timestampsInSnapshots: true };
            firebase.firestore().settings(settings);


            firebase.firestore().collection("messages").orderBy("date", "desc").onSnapshot((querySnapshot) => {
                let msgs = [];
                querySnapshot.forEach((doc) => {
                    msgs.push({date:timeAgo.format(doc.data().date) , text:doc.data().text})
                });
                this.messages = msgs
            });
        },
        methods: {
            addNewMsg() {
                firebase.firestore().collection("messages").add({
                    text: this.msg,
                    date: Date.now()
                }).then(function (docRef) {
                    console.log("add success");
                }).catch(function (error) {
                    console.error("Error adding document");
                });
                this.msg = ''
            }
        }
    }
</script>