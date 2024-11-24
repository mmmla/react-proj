
 const EventBus = {
    events: {},
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    },
    off(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
      }
    },
    emit(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(callback => callback(...args));
      }
    }
  };
  export default EventBus
   