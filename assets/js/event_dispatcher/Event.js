/**
 * Class Event
 */
export default class Event {
  /**
   * Event constrcutor
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.callbacks = [];
  }

  /**
   * Attach callback to event
   * @param {Callable} callback
   */
  attach(callback) {
    this.callbacks.push(callback);
  }
}
