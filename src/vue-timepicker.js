Vue.component('timepicker', {
  template: '#timepicker-template',

  props: {
    meridian: {
      type: Boolean,
      default: false,
      required: false
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    hideSpinners: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data: function() {
    return {
      momentDate: moment(),
      date: '',
      minute: '',
      hour: '',
      hourFormat: 'hh'
    }
  },

  watch: {
    hour: function() {
      this.setHours();
    },

    minute: function() {
      this.setMinutes();
    },

    date: function() {

      this.$dispatch('timepicker-date-changed', this.date);
    }
  },

  created: function() {

    this.init();
    this.updateTime();

    console.log('format', this.meridian);
    console.log('hide spinner', this.hideSpinners);
  },

  events: {

  },

  methods: {
    init: function() {
      moment().locale('de');


      // Meridian 24 hour format
      if (this.meridian) {
        this.hourFormat = 'HH';
      }
    },

    updateTime: function() {

      this.hour = this.momentDate.format(this.hourFormat);
      this.minute = this.momentDate.format('mm');
    },

    incrementHours: function() {
      this.momentDate = this.momentDate.add(1, 'h');
      this.hour = this.momentDate.format(this.hourFormat); // HH = 24hour format

      this.updateDate();

      //console.log('incrementHours: ', this.momentDate.format('DD.MM.YYYY HH:mm'));
    },

    decreaseHours: function() {
      this.momentDate = this.momentDate.subtract(1, 'h');
      this.hour = this.momentDate.format('HH'); // HH = 24hour format

      this.updateDate();
    },

    incrementMinutes: function() {
      this.momentDate = this.momentDate.add(1, 'm');
      this.minute = this.momentDate.format('mm');

      this.updateDate();

      //console.log('incrementMinutes: ', this.momentDate.format('DD.MM.YYYY HH:mm'));
    },

    decreaseMinutes: function() {
      this.momentDate = this.momentDate.subtract(1, 'm');
      this.minute = this.momentDate.format('mm');

      this.updateDate();
    },

    setMinutes: function() {

      // Set to 00 if value is empty
      if (this.minute.trim() === '') {
        this.minute = '00';
      }

      this.momentDate.set('m', this.minute);
      this.updateDate();
    },

    setHours: function() {

      // Set to 00 if value is empty
      if (this.hour.trim() === '') {
        this.hour = '00';
      }

      this.momentDate.set('h', this.hour);
      this.updateDate();
    },


    /**
     * Update the moment.js Date Object
     */
    updateDate: function() {
      this.date = this.momentDate.format();
    }
  }

});