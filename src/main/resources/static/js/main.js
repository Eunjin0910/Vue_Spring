Vue.component('time-stamp',{
    data : function (){
        return {
            now_time : '',
            ampm : '',
        }
    },
    template : '<div style="color: #666;">' +
                    '<span style="font-size: 30px; font-weight: bold;">{{ now_time }} </span>' +
                    '<span style="font-weight: bold;">{{ ampm }}</span>' +
               '</div>',
    created () {
        var timeFormat = function (time){

            var num = String(time);

            if(num.length <  2){
                num = '0' + num;
            }
            return num;
        }

        var returnTime = function (){
            var currentData = new Date();
            this.ampm = 'AM';

            var currentHours = timeFormat(currentData.getHours());
            var currentMinute = timeFormat(currentData.getMinutes());
            var currentSeconds = timeFormat(currentData.getSeconds());

            if (currentHours >= 12){
                this.ampm = 'PM'
            }

            this.now_time = currentHours + ' : ' + currentMinute + ' : ' + currentSeconds
            setTimeout(function (){
                returnTime();
            },1000);
        }.bind(this);
        returnTime();
    }
});

function getIndex (list, id){
    for (var i = 0 ; i < list.length ; i ++){
        if (list[i].id == id){
            return i;
        }
    }

    return -1;
}

Vue.component('message-form',{
    props : ['messages','messageAttr'],
    data: function (){
      return {
          text: '',
          id : ''
      }
    },
    watch : {
        messageAttr : function (newVal, oldVal){
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:'<div>' +
                '<input type="text" placeholder="Write someting" v-model="text" @keydown.enter="save">' +
                '<input type="button" value="SAVE" @click="save">' +
             '</div>',
    methods: {
        save: function (){
            if (this.text != null && this.text != ''){
                var messages = this.messages;
                var message = {text : this.text};

                if (this.id){
                    axios.put('/message/' + this.id, message).then(function (resultData){
                        var index = getIndex(this.messages, this.id);
                        messages.splice(index, 1, resultData.data);

                        this.id = '';
                        this.text = '';
                    }.bind(this));
                }else {
                    axios.post('/message',message).then(function (resultData){

                        messages.push(resultData.data);
                        this.text = '';
                    }.bind(this));
                }
            }
        }
    }

});


Vue.component('message-row', {
    props : ['message','editMessage','messages'],
    template : '<div>' +
                    '<i>{{ message.id }}.</i> {{ message.text }}' +
                    '<span  style="position: absolute; right: 0">' +
                        '<input type="button" value="Edit" @click="edit">' +
                        '<input type="button" value="Del" @click="del">' +
                    '</span>' +
               '</div>',
    methods : {
        edit : function (){
            this.editMessage(this.message)
        },
        del : function (){
            axios.delete('/message/' + this.message.id).then(function (resultData){
                  if (resultData.status){
                        this.messages.splice(this.messages.indexOf(this.message), 1)
                  }
            }.bind(this));
        }
    }
});


Vue.component('message-list',{
    props: ['messages'],
    data : function (){
        return {
            message : null
        }
    },
    template: '<div>' +
                      '<time-stamp />' +
                      '<div style="position: relative; width: 300px;">' +
                            '<message-form :messages="messages" :messageAttr="message" />' +
                            '<message-row v-for="message in messages" :key="message.id" :message="message" :editMessage="editMessage" :messages="messages" />' +
                      '</div>' +
              '<div>',
    created: function (){
        var messages = this.messages;
        axios.get('/message',{
        }).then(function (response){
            response.data.forEach(function (resultData){
                messages.push(resultData);
            });
        });
    },
    methods : {
        editMessage : function (message){
            this.message = message;
        }
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

