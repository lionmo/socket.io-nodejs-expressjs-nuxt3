<template>
    <div>
        <form>
            <input type="text" name="sms" v-model="sms">
            <input type="number" name="myEmail" v-model="myEmail">
            <button @click="send">Send</button>
        </form>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        data() {
            return {
                sms: "",
                myEmail: 0
            }
        },
        mounted() {
            this.socket = io('http://localhost:3005')
            console.log('connected to server socket');
            this.socket.on('message', (data) => {
                console.log(data);
            })
        },
        methods: {
            async send(event) {
                event.preventDefault();
                let email = Math.floor(Math.random() * 10)
                console.log(email);
                let newMessage ={'myEmail': this.myEmail, 'email': email, 'sms': this.sms}
                this.socket.emit('message', newMessage)
                /*const { data } = await useFetch('http://localhost:3005', {
                    method: 'POST',
                    body: {
                        'email': email,
                        'sms': this.sms
                    }
                })*/
            }
        }
    }
</script>