'use strict';
const DOMException = require('domexception/webidl2js-wrapper');
const MessageEvent = require('./generated/MessageEvent');
const { isValidTargetOrigin } = require('../utils');
const { fireAnEvent } = require('./helpers/events');

module.exports = function (globalObject) {
  return function (message, targetOrigin, ports) {
    if (arguments.length < 2) {
      throw new TypeError(
        "'postMessage' requires 2 arguments: 'message' and 'targetOrigin'"
      );
    }

    targetOrigin = String(targetOrigin);

    if (!isValidTargetOrigin(targetOrigin)) {
      // TODO: Fix me
      throw DOMException.create(globalObject, [
        "Failed to execute 'postMessage' on 'Window': " +
          "Invalid target origin '" +
          targetOrigin +
          "' in a call to 'postMessage'.",
        'SyntaxError',
      ]);
    }

    // TODO: event.source - requires reference to source window
    // TODO: event.data - structured clone message - requires cloning DOM nodes
    setTimeout(() => {
      fireAnEvent('message', this, MessageEvent, {
        data: message,
        ports,
        origin: targetOrigin,
      });
    }, 0);
  };
};
