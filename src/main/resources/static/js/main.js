Vue.component('message-row', {
    props : ['message'],
    template : '<div><i>({{ message.id }})</i> {{ message.text }}</div>'
});


Vue.component('message-list',{
    props: ['messages'],
    template: '<div><message-row v-for="message in messages" :key="message.id" :message="message" /></div>',
    created: function() {
        axios.get('/message',{
        }).then(function(response){
            console.log(response.data);
            response.data.forEach(function (message){
                console.log(message);
                app.messages.push(message);
            });
        });
    }
});

var app = new Vue({
   el : '#app',
   template: '<message-list :messages="messages"/>',
   data : {
       messages : []
   }
});