Vue.component('time-stamp',{
    data : function(){
        return {
            now_time : ''
        }
    },
    template : '<div>현재 시각 : {{ now_time }}</div>',
    created () {
        var timeFormat = function(time){

            var num = String(time);

            if(num.length <  2){
                num = '0' + num;
            }
            return num;
        }

        var returnTime = function(){
            var currentData = new Date();
            var ampm = 'AM';

            var currentHours = timeFormat(currentData.getHours());
            var currentMinute = timeFormat(currentData.getMinutes());
            var currentSeconds = timeFormat(currentData.getSeconds());

            if (currentHours >= 12){
                ampm = 'PM'
            }

            this.now_time = ampm + '  ' + currentHours + ' : ' + currentMinute + ' : ' + currentSeconds
            setTimeout(function(){
                returnTime();
            },1000);
        }.bind(this);
        returnTime();
    }
});

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
               this.text = '';
            }.bind(this));
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
                    '<time-stamp />' +
                    '<message-form :messages="messages" />' +
                    '<message-row v-for="message in messages" :key="message.id" :message="message" />' +
              '</div>',
    created: function() {
        var messages = this.messages;
        axios.get('/message',{
        }).then(function(response){
            response.data.forEach(function (resultdata) {
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

