var demo = new Vue({

  el: '#demo',

  data: {
    date: 'blaaa'
  },

  events: {
    'timepicker-date-changed': function(date) {
      this.date = date;

      this.convertToMysql();

      console.log('vue instance: ', date);
    }
  },

  methods: {
    convertToMysql: function() {
      console.log('MySQL: ', moment(this.date).format('YYYY-MM-DD HH:mm:ss'));
      console.log('--------');
    }
  }
});