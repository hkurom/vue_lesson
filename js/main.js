(function() {
  'use strict'

  // two way data binding to UI
  var likeComponent = Vue.extend({
    props: {
      message: {
        type: String,
        default: "Like",
      },
    },
    data: function() {
      return {
        count: 0
      }
    },
    templete: '<button @click="countup">{{ message }} {{ count }}</button>',
    methods: {
      countup: function() {
        this.count++;
        this.$emit('increment');
      }
    }
  });

  var vm = new Vue({
    el: '#app',
    components: {
      'like-component': likeComponent
    },
    data: {
      newitem: "",
      todos: [],
      total: 0,
    },
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saved.');  
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      additem: function() {
        var item = {
          title: this.newitem,
          isDone: false,
        }
        this.todos.push(item);
        this.newitem = "";
      },
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1); // $1から$2個削除
        }
      },
      purge: function(index) {
        if (!confirm('delete finished?')) {
          return;
        }
        this.todos = this.remaining;
      },
      incrementTotal: function() {
        this.total++;
      },
    },
    computed: {
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });

})();
