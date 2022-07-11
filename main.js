Pusher.logToConsole = true

let pusher = new Pusher('key', {
    cluster: 'ap1',
    encrypted: true
})

let channel = pusher.subscribe('chat-channel')

let vi = new Vue({
    el: '#app',
    data: {
        url: 'http://localhost/pusher-php/chat/',
        chats: [],
        username: '',
        chatInput: '',
        last_inserted_id: ''
    },

    methods: {
        sendMessage: function (e) {

            // console.log(e)
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault()

                if (this.chatInput == '' || this.chatInput.trim() == '')
                    return

                let date = new Date()
                // membuat text area kosong setelah di input 
                let themChatInput = this.chatInput
                // membuat variabel untuk menampung id chat
                let now = this.last_inserted_id = Date.now()


                this.chatInput = ''

                // menampilkan data lewat front end
                this.chats.push({
                    id: now,
                    username: this.username,
                    message: themChatInput,
                    time: date.toLocaleString()

                })

                // menampilkan data dari server
                axios.post(this.url + '?method=sendMessage', {
                    id: now,
                    username: this.username,
                    message: themChatInput,
                    time: date.toLocaleString(),
                })

                // .then(function (data) {
                //     console.log(data)
                // })
            }
        }
    }
})

channel.bind('chat-event', function (data) {
    if (data.username != null && data.id != vi.last_inserted_id)
        vi.chats.push({
            id: data.id,
            username: data.username,
            message: data.message,
            time: data.time,
        })
})
