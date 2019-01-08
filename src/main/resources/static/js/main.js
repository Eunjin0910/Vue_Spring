Vue.component('message-form',{
    props : ['messages'],
    data: function(){
      return {
          text: ''
      }
    },
    template:'<div>' +
                '<input type="text" placeholder="Write someting" v-model="text">' +
                '<input type="button" value="SAVE" @click="save">' +
             '</div>',
    methods: {
        save: function(){
            var messages = this.messages;
            var message = {text : this.text};

            axios.post('/message',message).then(function(resultdata){
               messages.push(resultdata.data);
            });
        }
    }

});


Vue.component('message-row', {
    props : ['message'],
    template : '<div>' +
                    '<i>({{ message.id }})</i> {{ message.text }}' +
               '</div>'
});


Vue.component('message-list',{
    props: ['messages'],
    template: '<div>' +
                    '<message-form :messages="messages" />' +
                    '<message-row v-for="message in messages" :key="message.id" :message="message" />' +
              '</div>',
    created: function() {
        var messages = this.messages;
        axios.get('/message',{
        }).then(function(response){
            response.data.forEach(function (resultdata){
                messages.push(resultdata);
            });
        });
    }
});

Vue.config.devtools = true;

var app = new Vue({
   el : '#app',
   template: '<message-list :messages="messages"/>',
   data : {
       messages : []
   }
});

