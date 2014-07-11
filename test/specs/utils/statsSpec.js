/*global define, beforeEach, afterEach */
define(['locservices/ui/utils/stats', 'jquery'], function(Stats, $) {

  // mock echo client interface
  var echoClient = {
    userActionEvent: function() {

    }
  };

  describe('The Stats', function() {

    describe('constructor', function() {
      it('binds event listeners to UI events', function() {
        var stub = sinon.stub(Stats.prototype, '_bindUIEvents');
        new Stats({});
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
      it('throws an error if an echo client has not been passed as a parameter', function() {
        expect(function() { new Stats(); }).toThrow();
      });
    });

    describe('logActionEvent() method', function() {
      it('calls the userActionEvent() method on the echo client', function() {
        var stub = sinon.stub(echoClient, 'userActionEvent');
        var stats = new Stats(echoClient);
        var actionType = 'foo';
        var labels = { foo: 'bar' };

        stats.logActionEvent(actionType, labels);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(actionType, stats._actionName, labels)).toBe(true);
        stub.restore();
      });
    });

    describe('UI events listeners', function() {

      var stub, stats;

      beforeEach(function() {
        stats = new Stats(echoClient);
        stub = sinon.stub(stats, 'logActionEvent');
      });

      afterEach(function() {
        stub.restore();
      });

      it('listens for the geolocation location event', function() {
        $.emit(stats._ns + ':component:geolocation:location', [{ id: 1234 }]);
        expect(stub.calledOnce).toBe(true);
      });
    });

  });
});
