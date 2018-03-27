/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adapter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var SDPUtils = require('sdp');

function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : dtlsRole || 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' +
        transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' ' + msid;
      sdp += 'a=ssrc-group:FID ' +
          transceiver.sendEncodingParameters[0].ssrc + ' ' +
          transceiver.sendEncodingParameters[0].rtx.ssrc +
          '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
      ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
}

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
  var hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(function(server) {
    if (server && (server.urls || server.url)) {
      var urls = server.urls || server.url;
      if (server.url && !server.urls) {
        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
      }
      var isString = typeof urls === 'string';
      if (isString) {
        urls = [urls];
      }
      urls = urls.filter(function(url) {
        var validTurn = url.indexOf('turn:') === 0 &&
            url.indexOf('transport=udp') !== -1 &&
            url.indexOf('turn:[') === -1 &&
            !hasTurn;

        if (validTurn) {
          hasTurn = true;
          return true;
        }
        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
            url.indexOf('?transport=udp') === -1;
      });

      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
    return false;
  });
}

// Determines the intersection of local and remote capabilities.
function getCommonCapabilities(localCapabilities, remoteCapabilities) {
  var commonCapabilities = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: []
  };

  var findCodecByPayloadType = function(pt, codecs) {
    pt = parseInt(pt, 10);
    for (var i = 0; i < codecs.length; i++) {
      if (codecs[i].payloadType === pt ||
          codecs[i].preferredPayloadType === pt) {
        return codecs[i];
      }
    }
  };

  var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
    return lCodec && rCodec &&
        lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
  };

  localCapabilities.codecs.forEach(function(lCodec) {
    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
      var rCodec = remoteCapabilities.codecs[i];
      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
          lCodec.clockRate === rCodec.clockRate) {
        if (lCodec.name.toLowerCase() === 'rtx' &&
            lCodec.parameters && rCodec.parameters.apt) {
          // for RTX we need to find the local rtx that has a apt
          // which points to the same local codec as the remote one.
          if (!rtxCapabilityMatches(lCodec, rCodec,
              localCapabilities.codecs, remoteCapabilities.codecs)) {
            continue;
          }
        }
        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
        // number of channels is the highest common number of channels
        rCodec.numChannels = Math.min(lCodec.numChannels,
            rCodec.numChannels);
        // push rCodec so we reply with offerer payload type
        commonCapabilities.codecs.push(rCodec);

        // determine common feedback mechanisms
        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
            if (lCodec.rtcpFeedback[j].type === fb.type &&
                lCodec.rtcpFeedback[j].parameter === fb.parameter) {
              return true;
            }
          }
          return false;
        });
        // FIXME: also need to determine .parameters
        //  see https://github.com/openpeer/ortc/issues/569
        break;
      }
    }
  });

  localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
    for (var i = 0; i < remoteCapabilities.headerExtensions.length;
         i++) {
      var rHeaderExtension = remoteCapabilities.headerExtensions[i];
      if (lHeaderExtension.uri === rHeaderExtension.uri) {
        commonCapabilities.headerExtensions.push(rHeaderExtension);
        break;
      }
    }
  });

  // FIXME: fecMechanisms
  return commonCapabilities;
}

// is action=setLocalDescription with type allowed in signalingState
function isActionAllowedInSignalingState(action, type, signalingState) {
  return {
    offer: {
      setLocalDescription: ['stable', 'have-local-offer'],
      setRemoteDescription: ['stable', 'have-remote-offer']
    },
    answer: {
      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
    }
  }[type][action].indexOf(signalingState) !== -1;
}

function maybeAddCandidate(iceTransport, candidate) {
  // Edge's internal representation adds some fields therefore
  // not all fieldѕ are taken into account.
  var alreadyAdded = iceTransport.getRemoteCandidates()
      .find(function(remoteCandidate) {
        return candidate.foundation === remoteCandidate.foundation &&
            candidate.ip === remoteCandidate.ip &&
            candidate.port === remoteCandidate.port &&
            candidate.priority === remoteCandidate.priority &&
            candidate.protocol === remoteCandidate.protocol &&
            candidate.type === remoteCandidate.type;
      });
  if (!alreadyAdded) {
    iceTransport.addRemoteCandidate(candidate);
  }
  return !alreadyAdded;
}

module.exports = function(window, edgeVersion) {
  var RTCPeerConnection = function(config) {
    var self = this;

    var _eventTarget = document.createDocumentFragment();
    ['addEventListener', 'removeEventListener', 'dispatchEvent']
        .forEach(function(method) {
          self[method] = _eventTarget[method].bind(_eventTarget);
        });

    this.onicecandidate = null;
    this.onaddstream = null;
    this.ontrack = null;
    this.onremovestream = null;
    this.onsignalingstatechange = null;
    this.oniceconnectionstatechange = null;
    this.onicegatheringstatechange = null;
    this.onnegotiationneeded = null;
    this.ondatachannel = null;
    this.canTrickleIceCandidates = null;

    this.needNegotiation = false;

    this.localStreams = [];
    this.remoteStreams = [];

    this.localDescription = null;
    this.remoteDescription = null;

    this.signalingState = 'stable';
    this.iceConnectionState = 'new';
    this.iceGatheringState = 'new';

    config = JSON.parse(JSON.stringify(config || {}));

    this.usingBundle = config.bundlePolicy === 'max-bundle';
    if (config.rtcpMuxPolicy === 'negotiate') {
      var e = new Error('rtcpMuxPolicy \'negotiate\' is not supported');
      e.name = 'NotSupportedError';
      throw(e);
    } else if (!config.rtcpMuxPolicy) {
      config.rtcpMuxPolicy = 'require';
    }

    switch (config.iceTransportPolicy) {
      case 'all':
      case 'relay':
        break;
      default:
        config.iceTransportPolicy = 'all';
        break;
    }

    switch (config.bundlePolicy) {
      case 'balanced':
      case 'max-compat':
      case 'max-bundle':
        break;
      default:
        config.bundlePolicy = 'balanced';
        break;
    }

    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

    this._iceGatherers = [];
    if (config.iceCandidatePoolSize) {
      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
        this._iceGatherers = new window.RTCIceGatherer({
          iceServers: config.iceServers,
          gatherPolicy: config.iceTransportPolicy
        });
      }
    } else {
      config.iceCandidatePoolSize = 0;
    }

    this._config = config;

    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
    // everything that is needed to describe a SDP m-line.
    this.transceivers = [];

    this._sdpSessionId = SDPUtils.generateSessionId();
    this._sdpSessionVersion = 0;

    this._dtlsRole = undefined; // role for a=setup to use in answers.
  };

  RTCPeerConnection.prototype._emitGatheringStateChange = function() {
    var event = new Event('icegatheringstatechange');
    this.dispatchEvent(event);
    if (typeof this.onicegatheringstatechange === 'function') {
      this.onicegatheringstatechange(event);
    }
  };

  RTCPeerConnection.prototype.getConfiguration = function() {
    return this._config;
  };

  RTCPeerConnection.prototype.getLocalStreams = function() {
    return this.localStreams;
  };

  RTCPeerConnection.prototype.getRemoteStreams = function() {
    return this.remoteStreams;
  };

  // internal helper to create a transceiver object.
  // (whih is not yet the same as the WebRTC 1.0 transceiver)
  RTCPeerConnection.prototype._createTransceiver = function(kind) {
    var hasBundleTransport = this.transceivers.length > 0;
    var transceiver = {
      track: null,
      iceGatherer: null,
      iceTransport: null,
      dtlsTransport: null,
      localCapabilities: null,
      remoteCapabilities: null,
      rtpSender: null,
      rtpReceiver: null,
      kind: kind,
      mid: null,
      sendEncodingParameters: null,
      recvEncodingParameters: null,
      stream: null,
      wantReceive: true
    };
    if (this.usingBundle && hasBundleTransport) {
      transceiver.iceTransport = this.transceivers[0].iceTransport;
      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
    } else {
      var transports = this._createIceAndDtlsTransports();
      transceiver.iceTransport = transports.iceTransport;
      transceiver.dtlsTransport = transports.dtlsTransport;
    }
    this.transceivers.push(transceiver);
    return transceiver;
  };

  RTCPeerConnection.prototype.addTrack = function(track, stream) {
    var transceiver;
    for (var i = 0; i < this.transceivers.length; i++) {
      if (!this.transceivers[i].track &&
          this.transceivers[i].kind === track.kind) {
        transceiver = this.transceivers[i];
      }
    }
    if (!transceiver) {
      transceiver = this._createTransceiver(track.kind);
    }

    this._maybeFireNegotiationNeeded();

    if (this.localStreams.indexOf(stream) === -1) {
      this.localStreams.push(stream);
    }

    transceiver.track = track;
    transceiver.stream = stream;
    transceiver.rtpSender = new window.RTCRtpSender(track,
        transceiver.dtlsTransport);
    return transceiver.rtpSender;
  };

  RTCPeerConnection.prototype.addStream = function(stream) {
    var self = this;
    if (edgeVersion >= 15025) {
      stream.getTracks().forEach(function(track) {
        self.addTrack(track, stream);
      });
    } else {
      // Clone is necessary for local demos mostly, attaching directly
      // to two different senders does not work (build 10547).
      // Fixed in 15025 (or earlier)
      var clonedStream = stream.clone();
      stream.getTracks().forEach(function(track, idx) {
        var clonedTrack = clonedStream.getTracks()[idx];
        track.addEventListener('enabled', function(event) {
          clonedTrack.enabled = event.enabled;
        });
      });
      clonedStream.getTracks().forEach(function(track) {
        self.addTrack(track, clonedStream);
      });
    }
  };

  RTCPeerConnection.prototype.removeStream = function(stream) {
    var idx = this.localStreams.indexOf(stream);
    if (idx > -1) {
      this.localStreams.splice(idx, 1);
      this._maybeFireNegotiationNeeded();
    }
  };

  RTCPeerConnection.prototype.getSenders = function() {
    return this.transceivers.filter(function(transceiver) {
      return !!transceiver.rtpSender;
    })
    .map(function(transceiver) {
      return transceiver.rtpSender;
    });
  };

  RTCPeerConnection.prototype.getReceivers = function() {
    return this.transceivers.filter(function(transceiver) {
      return !!transceiver.rtpReceiver;
    })
    .map(function(transceiver) {
      return transceiver.rtpReceiver;
    });
  };


  RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
      usingBundle) {
    var self = this;
    if (usingBundle && sdpMLineIndex > 0) {
      return this.transceivers[0].iceGatherer;
    } else if (this._iceGatherers.length) {
      return this._iceGatherers.shift();
    }
    var iceGatherer = new window.RTCIceGatherer({
      iceServers: this._config.iceServers,
      gatherPolicy: this._config.iceTransportPolicy
    });
    Object.defineProperty(iceGatherer, 'state',
        {value: 'new', writable: true}
    );

    this.transceivers[sdpMLineIndex].candidates = [];
    this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
      var end = !event.candidate || Object.keys(event.candidate).length === 0;
      // polyfill since RTCIceGatherer.state is not implemented in
      // Edge 10547 yet.
      iceGatherer.state = end ? 'completed' : 'gathering';
      if (self.transceivers[sdpMLineIndex].candidates !== null) {
        self.transceivers[sdpMLineIndex].candidates.push(event.candidate);
      }
    };
    iceGatherer.addEventListener('localcandidate',
      this.transceivers[sdpMLineIndex].bufferCandidates);
    return iceGatherer;
  };

  // start gathering from an RTCIceGatherer.
  RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
    var self = this;
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer.onlocalcandidate) {
      return;
    }
    var candidates = this.transceivers[sdpMLineIndex].candidates;
    this.transceivers[sdpMLineIndex].candidates = null;
    iceGatherer.removeEventListener('localcandidate',
      this.transceivers[sdpMLineIndex].bufferCandidates);
    iceGatherer.onlocalcandidate = function(evt) {
      if (self.usingBundle && sdpMLineIndex > 0) {
        // if we know that we use bundle we can drop candidates with
        // ѕdpMLineIndex > 0. If we don't do this then our state gets
        // confused since we dispose the extra ice gatherer.
        return;
      }
      var event = new Event('icecandidate');
      event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

      var cand = evt.candidate;
      // Edge emits an empty object for RTCIceCandidateComplete‥
      var end = !cand || Object.keys(cand).length === 0;
      if (end) {
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
          iceGatherer.state = 'completed';
        }
      } else {
        if (iceGatherer.state === 'new') {
          iceGatherer.state = 'gathering';
        }
        // RTCIceCandidate doesn't have a component, needs to be added
        cand.component = 1;
        event.candidate.candidate = SDPUtils.writeCandidate(cand);
      }

      // update local description.
      var sections = SDPUtils.splitSections(self.localDescription.sdp);
      if (!end) {
        sections[event.candidate.sdpMLineIndex + 1] +=
            'a=' + event.candidate.candidate + '\r\n';
      } else {
        sections[event.candidate.sdpMLineIndex + 1] +=
            'a=end-of-candidates\r\n';
      }
      self.localDescription.sdp = sections.join('');
      var complete = self.transceivers.every(function(transceiver) {
        return transceiver.iceGatherer &&
            transceiver.iceGatherer.state === 'completed';
      });

      if (self.iceGatheringState !== 'gathering') {
        self.iceGatheringState = 'gathering';
        self._emitGatheringStateChange();
      }

      // Emit candidate. Also emit null candidate when all gatherers are
      // complete.
      if (!end) {
        self.dispatchEvent(event);
        if (typeof self.onicecandidate === 'function') {
          self.onicecandidate(event);
        }
      }
      if (complete) {
        self.dispatchEvent(new Event('icecandidate'));
        if (typeof self.onicecandidate === 'function') {
          self.onicecandidate(new Event('icecandidate'));
        }
        self.iceGatheringState = 'complete';
        self._emitGatheringStateChange();
      }
    };

    // emit already gathered candidates.
    window.setTimeout(function() {
      candidates.forEach(function(candidate) {
        var e = new Event('RTCIceGatherEvent');
        e.candidate = candidate;
        iceGatherer.onlocalcandidate(e);
      });
    }, 0);
  };

  // Create ICE transport and DTLS transport.
  RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
    var self = this;
    var iceTransport = new window.RTCIceTransport(null);
    iceTransport.onicestatechange = function() {
      self._updateConnectionState();
    };

    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
    dtlsTransport.ondtlsstatechange = function() {
      self._updateConnectionState();
    };
    dtlsTransport.onerror = function() {
      // onerror does not set state to failed by itself.
      Object.defineProperty(dtlsTransport, 'state',
          {value: 'failed', writable: true});
      self._updateConnectionState();
    };

    return {
      iceTransport: iceTransport,
      dtlsTransport: dtlsTransport
    };
  };

  // Destroy ICE gatherer, ICE transport and DTLS transport.
  // Without triggering the callbacks.
  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
      sdpMLineIndex) {
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer) {
      delete iceGatherer.onlocalcandidate;
      delete this.transceivers[sdpMLineIndex].iceGatherer;
    }
    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
    if (iceTransport) {
      delete iceTransport.onicestatechange;
      delete this.transceivers[sdpMLineIndex].iceTransport;
    }
    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
    if (dtlsTransport) {
      delete dtlsTransport.ondtlsstatechange;
      delete dtlsTransport.onerror;
      delete this.transceivers[sdpMLineIndex].dtlsTransport;
    }
  };

  // Start the RTP Sender and Receiver for a transceiver.
  RTCPeerConnection.prototype._transceive = function(transceiver,
      send, recv) {
    var params = getCommonCapabilities(transceiver.localCapabilities,
        transceiver.remoteCapabilities);
    if (send && transceiver.rtpSender) {
      params.encodings = transceiver.sendEncodingParameters;
      params.rtcp = {
        cname: SDPUtils.localCName,
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.recvEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
      }
      transceiver.rtpSender.send(params);
    }
    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
      // remove RTX field in Edge 14942
      if (transceiver.kind === 'video'
          && transceiver.recvEncodingParameters
          && edgeVersion < 15019) {
        transceiver.recvEncodingParameters.forEach(function(p) {
          delete p.rtx;
        });
      }
      params.encodings = transceiver.recvEncodingParameters;
      params.rtcp = {
        cname: transceiver.rtcpParameters.cname,
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.sendEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
      }
      transceiver.rtpReceiver.receive(params);
    }
  };

  RTCPeerConnection.prototype.setLocalDescription = function(description) {
    var self = this;
    var args = arguments;

    if (!isActionAllowedInSignalingState('setLocalDescription',
        description.type, this.signalingState)) {
      return new Promise(function(resolve, reject) {
        var e = new Error('Can not set local ' + description.type +
            ' in state ' + self.signalingState);
        e.name = 'InvalidStateError';
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [e]);
        }
        reject(e);
      });
    }

    var sections;
    var sessionpart;
    if (description.type === 'offer') {
      // VERY limited support for SDP munging. Limited to:
      // * changing the order of codecs
      sections = SDPUtils.splitSections(description.sdp);
      sessionpart = sections.shift();
      sections.forEach(function(mediaSection, sdpMLineIndex) {
        var caps = SDPUtils.parseRtpParameters(mediaSection);
        self.transceivers[sdpMLineIndex].localCapabilities = caps;
      });

      this.transceivers.forEach(function(transceiver, sdpMLineIndex) {
        self._gather(transceiver.mid, sdpMLineIndex);
      });
    } else if (description.type === 'answer') {
      sections = SDPUtils.splitSections(self.remoteDescription.sdp);
      sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart,
          'a=ice-lite').length > 0;
      sections.forEach(function(mediaSection, sdpMLineIndex) {
        var transceiver = self.transceivers[sdpMLineIndex];
        var iceGatherer = transceiver.iceGatherer;
        var iceTransport = transceiver.iceTransport;
        var dtlsTransport = transceiver.dtlsTransport;
        var localCapabilities = transceiver.localCapabilities;
        var remoteCapabilities = transceiver.remoteCapabilities;

        // treat bundle-only as not-rejected.
        var rejected = SDPUtils.isRejected(mediaSection) &&
            !SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 1;

        if (!rejected && !transceiver.isDatachannel) {
          var remoteIceParameters = SDPUtils.getIceParameters(
              mediaSection, sessionpart);
          var remoteDtlsParameters = SDPUtils.getDtlsParameters(
              mediaSection, sessionpart);
          if (isIceLite) {
            remoteDtlsParameters.role = 'server';
          }

          if (!self.usingBundle || sdpMLineIndex === 0) {
            self._gather(transceiver.mid, sdpMLineIndex);
            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters,
                  isIceLite ? 'controlling' : 'controlled');
            }
            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          }

          // Calculate intersection of capabilities.
          var params = getCommonCapabilities(localCapabilities,
              remoteCapabilities);

          // Start the RTCRtpSender. The RTCRtpReceiver for this
          // transceiver has already been started in setRemoteDescription.
          self._transceive(transceiver,
              params.codecs.length > 0,
              false);
        }
      });
    }

    this.localDescription = {
      type: description.type,
      sdp: description.sdp
    };
    switch (description.type) {
      case 'offer':
        this._updateSignalingState('have-local-offer');
        break;
      case 'answer':
        this._updateSignalingState('stable');
        break;
      default:
        throw new TypeError('unsupported type "' + description.type +
            '"');
    }

    // If a success callback was provided, emit ICE candidates after it
    // has been executed. Otherwise, emit callback after the Promise is
    // resolved.
    var cb = arguments.length > 1 && typeof arguments[1] === 'function' &&
        arguments[1];
    return new Promise(function(resolve) {
      if (cb) {
        cb.apply(null);
      }
      resolve();
    });
  };

  RTCPeerConnection.prototype.setRemoteDescription = function(description) {
    var self = this;
    var args = arguments;

    if (!isActionAllowedInSignalingState('setRemoteDescription',
        description.type, this.signalingState)) {
      return new Promise(function(resolve, reject) {
        var e = new Error('Can not set remote ' + description.type +
            ' in state ' + self.signalingState);
        e.name = 'InvalidStateError';
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [e]);
        }
        reject(e);
      });
    }

    var streams = {};
    this.remoteStreams.forEach(function(stream) {
      streams[stream.id] = stream;
    });
    var receiverList = [];
    var sections = SDPUtils.splitSections(description.sdp);
    var sessionpart = sections.shift();
    var isIceLite = SDPUtils.matchPrefix(sessionpart,
        'a=ice-lite').length > 0;
    var usingBundle = SDPUtils.matchPrefix(sessionpart,
        'a=group:BUNDLE ').length > 0;
    this.usingBundle = usingBundle;
    var iceOptions = SDPUtils.matchPrefix(sessionpart,
        'a=ice-options:')[0];
    if (iceOptions) {
      this.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
          .indexOf('trickle') >= 0;
    } else {
      this.canTrickleIceCandidates = false;
    }

    sections.forEach(function(mediaSection, sdpMLineIndex) {
      var lines = SDPUtils.splitLines(mediaSection);
      var kind = SDPUtils.getKind(mediaSection);
      // treat bundle-only as not-rejected.
      var rejected = SDPUtils.isRejected(mediaSection) &&
          !SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 1;
      var protocol = lines[0].substr(2).split(' ')[2];

      var direction = SDPUtils.getDirection(mediaSection, sessionpart);
      var remoteMsid = SDPUtils.parseMsid(mediaSection);

      var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

      // Reject datachannels which are not implemented yet.
      if (kind === 'application' && protocol === 'DTLS/SCTP') {
        self.transceivers[sdpMLineIndex] = {
          mid: mid,
          isDatachannel: true
        };
        return;
      }

      var transceiver;
      var iceGatherer;
      var iceTransport;
      var dtlsTransport;
      var rtpReceiver;
      var sendEncodingParameters;
      var recvEncodingParameters;
      var localCapabilities;

      var track;
      // FIXME: ensure the mediaSection has rtcp-mux set.
      var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
      var remoteIceParameters;
      var remoteDtlsParameters;
      if (!rejected) {
        remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
            sessionpart);
        remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
            sessionpart);
        remoteDtlsParameters.role = 'client';
      }
      recvEncodingParameters =
          SDPUtils.parseRtpEncodingParameters(mediaSection);

      var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

      var isComplete = SDPUtils.matchPrefix(mediaSection,
          'a=end-of-candidates', sessionpart).length > 0;
      var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
          .map(function(cand) {
            return SDPUtils.parseCandidate(cand);
          })
          .filter(function(cand) {
            return cand.component === 1;
          });

      // Check if we can use BUNDLE and dispose transports.
      if ((description.type === 'offer' || description.type === 'answer') &&
          !rejected && usingBundle && sdpMLineIndex > 0 &&
          self.transceivers[sdpMLineIndex]) {
        self._disposeIceAndDtlsTransports(sdpMLineIndex);
        self.transceivers[sdpMLineIndex].iceGatherer =
            self.transceivers[0].iceGatherer;
        self.transceivers[sdpMLineIndex].iceTransport =
            self.transceivers[0].iceTransport;
        self.transceivers[sdpMLineIndex].dtlsTransport =
            self.transceivers[0].dtlsTransport;
        if (self.transceivers[sdpMLineIndex].rtpSender) {
          self.transceivers[sdpMLineIndex].rtpSender.setTransport(
              self.transceivers[0].dtlsTransport);
        }
        if (self.transceivers[sdpMLineIndex].rtpReceiver) {
          self.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
              self.transceivers[0].dtlsTransport);
        }
      }
      if (description.type === 'offer' && !rejected) {
        transceiver = self.transceivers[sdpMLineIndex] ||
            self._createTransceiver(kind);
        transceiver.mid = mid;

        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = self._createIceGatherer(sdpMLineIndex,
              usingBundle);
        }

        if (cands.length && transceiver.iceTransport.state === 'new') {
          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
            transceiver.iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function(candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

        // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js
        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(
              function(codec) {
                return codec.name !== 'rtx';
              });
        }

        sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 2) * 1001
        }];

        var isNewTrack = false;
        if (direction === 'sendrecv' || direction === 'sendonly') {
          isNewTrack = !transceiver.rtpReceiver;
          rtpReceiver = transceiver.rtpReceiver ||
              new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

          if (isNewTrack) {
            var stream;
            track = rtpReceiver.track;
            // FIXME: does not work with Plan B.
            if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
                Object.defineProperty(streams[remoteMsid.stream], 'id', {
                  get: function() {
                    return remoteMsid.stream;
                  }
                });
              }
              Object.defineProperty(track, 'id', {
                get: function() {
                  return remoteMsid.track;
                }
              });
              stream = streams[remoteMsid.stream];
            } else {
              if (!streams.default) {
                streams.default = new window.MediaStream();
              }
              stream = streams.default;
            }
            stream.addTrack(track);
            receiverList.push([track, rtpReceiver, stream]);
          }
        }

        transceiver.localCapabilities = localCapabilities;
        transceiver.remoteCapabilities = remoteCapabilities;
        transceiver.rtpReceiver = rtpReceiver;
        transceiver.rtcpParameters = rtcpParameters;
        transceiver.sendEncodingParameters = sendEncodingParameters;
        transceiver.recvEncodingParameters = recvEncodingParameters;

        // Start the RTCRtpReceiver now. The RTPSender is started in
        // setLocalDescription.
        self._transceive(self.transceivers[sdpMLineIndex],
            false,
            isNewTrack);
      } else if (description.type === 'answer' && !rejected) {
        transceiver = self.transceivers[sdpMLineIndex];
        iceGatherer = transceiver.iceGatherer;
        iceTransport = transceiver.iceTransport;
        dtlsTransport = transceiver.dtlsTransport;
        rtpReceiver = transceiver.rtpReceiver;
        sendEncodingParameters = transceiver.sendEncodingParameters;
        localCapabilities = transceiver.localCapabilities;

        self.transceivers[sdpMLineIndex].recvEncodingParameters =
            recvEncodingParameters;
        self.transceivers[sdpMLineIndex].remoteCapabilities =
            remoteCapabilities;
        self.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

        if (cands.length && iceTransport.state === 'new') {
          if ((isIceLite || isComplete) &&
              (!usingBundle || sdpMLineIndex === 0)) {
            iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function(candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        if (!usingBundle || sdpMLineIndex === 0) {
          if (iceTransport.state === 'new') {
            iceTransport.start(iceGatherer, remoteIceParameters,
                'controlling');
          }
          if (dtlsTransport.state === 'new') {
            dtlsTransport.start(remoteDtlsParameters);
          }
        }

        self._transceive(transceiver,
            direction === 'sendrecv' || direction === 'recvonly',
            direction === 'sendrecv' || direction === 'sendonly');

        if (rtpReceiver &&
            (direction === 'sendrecv' || direction === 'sendonly')) {
          track = rtpReceiver.track;
          if (remoteMsid) {
            if (!streams[remoteMsid.stream]) {
              streams[remoteMsid.stream] = new window.MediaStream();
            }
            streams[remoteMsid.stream].addTrack(track);
            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
          } else {
            if (!streams.default) {
              streams.default = new window.MediaStream();
            }
            streams.default.addTrack(track);
            receiverList.push([track, rtpReceiver, streams.default]);
          }
        } else {
          // FIXME: actually the receiver should be created later.
          delete transceiver.rtpReceiver;
        }
      }
    });

    if (this._dtlsRole === undefined) {
      this._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
    }

    this.remoteDescription = {
      type: description.type,
      sdp: description.sdp
    };
    switch (description.type) {
      case 'offer':
        this._updateSignalingState('have-remote-offer');
        break;
      case 'answer':
        this._updateSignalingState('stable');
        break;
      default:
        throw new TypeError('unsupported type "' + description.type +
            '"');
    }
    Object.keys(streams).forEach(function(sid) {
      var stream = streams[sid];
      if (stream.getTracks().length) {
        if (self.remoteStreams.indexOf(stream) === -1) {
          self.remoteStreams.push(stream);
          var event = new Event('addstream');
          event.stream = stream;
          window.setTimeout(function() {
            self.dispatchEvent(event);
            if (typeof self.onaddstream === 'function') {
              self.onaddstream(event);
            }
          });
        }

        receiverList.forEach(function(item) {
          var track = item[0];
          var receiver = item[1];
          if (stream.id !== item[2].id) {
            return;
          }
          var trackEvent = new Event('track');
          trackEvent.track = track;
          trackEvent.receiver = receiver;
          trackEvent.transceiver = {receiver: receiver};
          trackEvent.streams = [stream];
          window.setTimeout(function() {
            self.dispatchEvent(trackEvent);
            if (typeof self.ontrack === 'function') {
              self.ontrack(trackEvent);
            }
          });
        });
      }
    });

    // check whether addIceCandidate({}) was called within four seconds after
    // setRemoteDescription.
    window.setTimeout(function() {
      if (!(self && self.transceivers)) {
        return;
      }
      self.transceivers.forEach(function(transceiver) {
        if (transceiver.iceTransport &&
            transceiver.iceTransport.state === 'new' &&
            transceiver.iceTransport.getRemoteCandidates().length > 0) {
          console.warn('Timeout for addRemoteCandidate. Consider sending ' +
              'an end-of-candidates notification');
          transceiver.iceTransport.addRemoteCandidate({});
        }
      });
    }, 4000);

    return new Promise(function(resolve) {
      if (args.length > 1 && typeof args[1] === 'function') {
        args[1].apply(null);
      }
      resolve();
    });
  };

  RTCPeerConnection.prototype.close = function() {
    this.transceivers.forEach(function(transceiver) {
      /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
      if (transceiver.iceTransport) {
        transceiver.iceTransport.stop();
      }
      if (transceiver.dtlsTransport) {
        transceiver.dtlsTransport.stop();
      }
      if (transceiver.rtpSender) {
        transceiver.rtpSender.stop();
      }
      if (transceiver.rtpReceiver) {
        transceiver.rtpReceiver.stop();
      }
    });
    // FIXME: clean up tracks, local streams, remote streams, etc
    this._updateSignalingState('closed');
  };

  // Update the signaling state.
  RTCPeerConnection.prototype._updateSignalingState = function(newState) {
    this.signalingState = newState;
    var event = new Event('signalingstatechange');
    this.dispatchEvent(event);
    if (typeof this.onsignalingstatechange === 'function') {
      this.onsignalingstatechange(event);
    }
  };

  // Determine whether to fire the negotiationneeded event.
  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
    var self = this;
    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
      return;
    }
    this.needNegotiation = true;
    window.setTimeout(function() {
      if (self.needNegotiation === false) {
        return;
      }
      self.needNegotiation = false;
      var event = new Event('negotiationneeded');
      self.dispatchEvent(event);
      if (typeof self.onnegotiationneeded === 'function') {
        self.onnegotiationneeded(event);
      }
    }, 0);
  };

  // Update the connection state.
  RTCPeerConnection.prototype._updateConnectionState = function() {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      connecting: 0,
      checking: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function(transceiver) {
      states[transceiver.iceTransport.state]++;
      states[transceiver.dtlsTransport.state]++;
    });
    // ICETransport.completed and connected are the same for this purpose.
    states.connected += states.completed;

    newState = 'new';
    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.connecting > 0 || states.checking > 0) {
      newState = 'connecting';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states.new > 0) {
      newState = 'new';
    } else if (states.connected > 0 || states.completed > 0) {
      newState = 'connected';
    }

    if (newState !== this.iceConnectionState) {
      this.iceConnectionState = newState;
      var event = new Event('iceconnectionstatechange');
      this.dispatchEvent(event);
      if (typeof this.oniceconnectionstatechange === 'function') {
        this.oniceconnectionstatechange(event);
      }
    }
  };

  RTCPeerConnection.prototype.createOffer = function() {
    var self = this;
    var args = arguments;

    var offerOptions;
    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
      offerOptions = arguments[0];
    } else if (arguments.length === 3) {
      offerOptions = arguments[2];
    }

    var numAudioTracks = this.transceivers.filter(function(t) {
      return t.kind === 'audio';
    }).length;
    var numVideoTracks = this.transceivers.filter(function(t) {
      return t.kind === 'video';
    }).length;

    // Determine number of audio and video tracks we need to send/recv.
    if (offerOptions) {
      // Reject Chrome legacy constraints.
      if (offerOptions.mandatory || offerOptions.optional) {
        throw new TypeError(
            'Legacy mandatory/optional constraints not supported.');
      }
      if (offerOptions.offerToReceiveAudio !== undefined) {
        if (offerOptions.offerToReceiveAudio === true) {
          numAudioTracks = 1;
        } else if (offerOptions.offerToReceiveAudio === false) {
          numAudioTracks = 0;
        } else {
          numAudioTracks = offerOptions.offerToReceiveAudio;
        }
      }
      if (offerOptions.offerToReceiveVideo !== undefined) {
        if (offerOptions.offerToReceiveVideo === true) {
          numVideoTracks = 1;
        } else if (offerOptions.offerToReceiveVideo === false) {
          numVideoTracks = 0;
        } else {
          numVideoTracks = offerOptions.offerToReceiveVideo;
        }
      }
    }

    this.transceivers.forEach(function(transceiver) {
      if (transceiver.kind === 'audio') {
        numAudioTracks--;
        if (numAudioTracks < 0) {
          transceiver.wantReceive = false;
        }
      } else if (transceiver.kind === 'video') {
        numVideoTracks--;
        if (numVideoTracks < 0) {
          transceiver.wantReceive = false;
        }
      }
    });

    // Create M-lines for recvonly streams.
    while (numAudioTracks > 0 || numVideoTracks > 0) {
      if (numAudioTracks > 0) {
        this._createTransceiver('audio');
        numAudioTracks--;
      }
      if (numVideoTracks > 0) {
        this._createTransceiver('video');
        numVideoTracks--;
      }
    }

    var sdp = SDPUtils.writeSessionBoilerplate(this._sdpSessionId,
        this._sdpSessionVersion++);
    this.transceivers.forEach(function(transceiver, sdpMLineIndex) {
      // For each track, create an ice gatherer, ice transport,
      // dtls transport, potentially rtpsender and rtpreceiver.
      var track = transceiver.track;
      var kind = transceiver.kind;
      var mid = SDPUtils.generateIdentifier();
      transceiver.mid = mid;

      if (!transceiver.iceGatherer) {
        transceiver.iceGatherer = self._createIceGatherer(sdpMLineIndex,
            self.usingBundle);
      }

      var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
      // filter RTX until additional stuff needed for RTX is implemented
      // in adapter.js
      if (edgeVersion < 15019) {
        localCapabilities.codecs = localCapabilities.codecs.filter(
            function(codec) {
              return codec.name !== 'rtx';
            });
      }
      localCapabilities.codecs.forEach(function(codec) {
        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
        // by adding level-asymmetry-allowed=1
        if (codec.name === 'H264' &&
            codec.parameters['level-asymmetry-allowed'] === undefined) {
          codec.parameters['level-asymmetry-allowed'] = '1';
        }
      });

      // generate an ssrc now, to be used later in rtpSender.send
      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
        ssrc: (2 * sdpMLineIndex + 1) * 1001
      }];
      if (track) {
        // add RTX
        if (edgeVersion >= 15019 && kind === 'video' &&
            !sendEncodingParameters[0].rtx) {
          sendEncodingParameters[0].rtx = {
            ssrc: sendEncodingParameters[0].ssrc + 1
          };
        }
      }

      if (transceiver.wantReceive) {
        transceiver.rtpReceiver = new window.RTCRtpReceiver(
            transceiver.dtlsTransport, kind);
      }

      transceiver.localCapabilities = localCapabilities;
      transceiver.sendEncodingParameters = sendEncodingParameters;
    });

    // always offer BUNDLE and dispose on return if not supported.
    if (this._config.bundlePolicy !== 'max-compat') {
      sdp += 'a=group:BUNDLE ' + this.transceivers.map(function(t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    sdp += 'a=ice-options:trickle\r\n';

    this.transceivers.forEach(function(transceiver, sdpMLineIndex) {
      sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
          'offer', transceiver.stream, self._dtlsRole);
      sdp += 'a=rtcp-rsize\r\n';

      if (transceiver.iceGatherer && self.iceGatheringState !== 'new' &&
          (sdpMLineIndex === 0 || !self.usingBundle)) {
        transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
          cand.component = 1;
          sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
        });

        if (transceiver.iceGatherer.state === 'completed') {
          sdp += 'a=end-of-candidates\r\n';
        }
      }
    });

    var desc = new window.RTCSessionDescription({
      type: 'offer',
      sdp: sdp
    });
    return new Promise(function(resolve) {
      if (args.length > 0 && typeof args[0] === 'function') {
        args[0].apply(null, [desc]);
        resolve();
        return;
      }
      resolve(desc);
    });
  };

  RTCPeerConnection.prototype.createAnswer = function() {
    var self = this;
    var args = arguments;

    var sdp = SDPUtils.writeSessionBoilerplate(this._sdpSessionId,
        this._sdpSessionVersion++);
    if (this.usingBundle) {
      sdp += 'a=group:BUNDLE ' + this.transceivers.map(function(t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    var mediaSectionsInOffer = SDPUtils.splitSections(
        this.remoteDescription.sdp).length - 1;
    this.transceivers.forEach(function(transceiver, sdpMLineIndex) {
      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
        return;
      }
      if (transceiver.isDatachannel) {
        sdp += 'm=application 0 DTLS/SCTP 5000\r\n' +
            'c=IN IP4 0.0.0.0\r\n' +
            'a=mid:' + transceiver.mid + '\r\n';
        return;
      }

      // FIXME: look at direction.
      if (transceiver.stream) {
        var localTrack;
        if (transceiver.kind === 'audio') {
          localTrack = transceiver.stream.getAudioTracks()[0];
        } else if (transceiver.kind === 'video') {
          localTrack = transceiver.stream.getVideoTracks()[0];
        }
        if (localTrack) {
          // add RTX
          if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
              !transceiver.sendEncodingParameters[0].rtx) {
            transceiver.sendEncodingParameters[0].rtx = {
              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
            };
          }
        }
      }

      // Calculate intersection of capabilities.
      var commonCapabilities = getCommonCapabilities(
          transceiver.localCapabilities,
          transceiver.remoteCapabilities);

      var hasRtx = commonCapabilities.codecs.filter(function(c) {
        return c.name.toLowerCase() === 'rtx';
      }).length;
      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
        delete transceiver.sendEncodingParameters[0].rtx;
      }

      sdp += writeMediaSection(transceiver, commonCapabilities,
          'answer', transceiver.stream, self._dtlsRole);
      if (transceiver.rtcpParameters &&
          transceiver.rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
      }
    });

    var desc = new window.RTCSessionDescription({
      type: 'answer',
      sdp: sdp
    });
    return new Promise(function(resolve) {
      if (args.length > 0 && typeof args[0] === 'function') {
        args[0].apply(null, [desc]);
        resolve();
        return;
      }
      resolve(desc);
    });
  };

  RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
    var err;
    var sections;
    if (!candidate || candidate.candidate === '') {
      for (var j = 0; j < this.transceivers.length; j++) {
        if (this.transceivers[j].isDatachannel) {
          continue;
        }
        this.transceivers[j].iceTransport.addRemoteCandidate({});
        sections = SDPUtils.splitSections(this.remoteDescription.sdp);
        sections[j + 1] += 'a=end-of-candidates\r\n';
        this.remoteDescription.sdp = sections.join('');
        if (this.usingBundle) {
          break;
        }
      }
    } else if (!(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
      throw new TypeError('sdpMLineIndex or sdpMid required');
    } else if (!this.remoteDescription) {
      err = new Error('Can not add ICE candidate without ' +
          'a remote description');
      err.name = 'InvalidStateError';
    } else {
      var sdpMLineIndex = candidate.sdpMLineIndex;
      if (candidate.sdpMid) {
        for (var i = 0; i < this.transceivers.length; i++) {
          if (this.transceivers[i].mid === candidate.sdpMid) {
            sdpMLineIndex = i;
            break;
          }
        }
      }
      var transceiver = this.transceivers[sdpMLineIndex];
      if (transceiver) {
        if (transceiver.isDatachannel) {
          return Promise.resolve();
        }
        var cand = Object.keys(candidate.candidate).length > 0 ?
            SDPUtils.parseCandidate(candidate.candidate) : {};
        // Ignore Chrome's invalid candidates since Edge does not like them.
        if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
          return Promise.resolve();
        }
        // Ignore RTCP candidates, we assume RTCP-MUX.
        if (cand.component && cand.component !== 1) {
          return Promise.resolve();
        }
        // when using bundle, avoid adding candidates to the wrong
        // ice transport. And avoid adding candidates added in the SDP.
        if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
            transceiver.iceTransport !== this.transceivers[0].iceTransport)) {
          if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
            err = new Error('Can not add ICE candidate');
            err.name = 'OperationError';
          }
        }

        if (!err) {
          // update the remoteDescription.
          var candidateString = candidate.candidate.trim();
          if (candidateString.indexOf('a=') === 0) {
            candidateString = candidateString.substr(2);
          }
          sections = SDPUtils.splitSections(this.remoteDescription.sdp);
          sections[sdpMLineIndex + 1] += 'a=' +
              (cand.type ? candidateString : 'end-of-candidates')
              + '\r\n';
          this.remoteDescription.sdp = sections.join('');
        }
      } else {
        err = new Error('Can not add ICE candidate');
        err.name = 'OperationError';
      }
    }
    var args = arguments;
    return new Promise(function(resolve, reject) {
      if (err) {
        if (args.length > 2 && typeof args[2] === 'function') {
          args[2].apply(null, [err]);
        }
        reject(err);
      } else {
        if (args.length > 1 && typeof args[1] === 'function') {
          args[1].apply(null);
        }
        resolve();
      }
    });
  };

  RTCPeerConnection.prototype.getStats = function() {
    var promises = [];
    this.transceivers.forEach(function(transceiver) {
      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
          'dtlsTransport'].forEach(function(method) {
            if (transceiver[method]) {
              promises.push(transceiver[method].getStats());
            }
          });
    });
    var cb = arguments.length > 1 && typeof arguments[1] === 'function' &&
        arguments[1];
    var fixStatsType = function(stat) {
      return {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      }[stat.type] || stat.type;
    };
    return new Promise(function(resolve) {
      // shim getStats with maplike support
      var results = new Map();
      Promise.all(promises).then(function(res) {
        res.forEach(function(result) {
          Object.keys(result).forEach(function(id) {
            result[id].type = fixStatsType(result[id]);
            results.set(id, result[id]);
          });
        });
        if (cb) {
          cb.apply(null, results);
        }
        resolve(results);
      });
    });
  };
  return RTCPeerConnection;
};

},{"sdp":2}],2:[function(require,module,exports){
 /* eslint-env node */
'use strict';

// SDP helpers.
var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
  return blob.trim().split('\n').map(function(line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
  var parts = blob.split('\nm=');
  return parts.map(function(part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function(line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function(line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.
        candidate.usernameFragment = parts[i + 1];
        break;
      default: // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function(candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress &&
      candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress); // was: relAddr
    sdp.push('rport');
    sdp.push(candidate.relatedPort); // was: relPort
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function(line) {
  return line.substr(14).split(' ');
}

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  // was: channels
  parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
      (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
          ? '/' + headerExtension.direction
          : '') +
      ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function(line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function(param) {
      params.push(param + '=' + codec.parameters[param]);
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
          '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function(mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substr(6);
  }
}

SDPUtils.parseFingerprint = function(line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function(fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function(line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function(line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
      'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(
        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(
          mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(
          mediaSection, 'a=rtcp-fb:' + pt + ' ')
        .map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default: // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function(codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function(codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function(codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }
  sdp += 'a=rtcp-mux\r\n';

  caps.headerExtensions.forEach(function(extension) {
    sdp += SDPUtils.writeExtmap(extension);
  });
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
  .map(function(line) {
    var parts = line.split(' ');
    parts.shift();
    return parts.map(function(part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function(codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10),
        rtx: {
          ssrc: secondarySsrc
        }
      };
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: secondarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
          - (50 * 40 * 8);
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function(params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function(mediaSection) {
  var rtcpParameters = {};

  var cname;
  // Gets the first SSRC. Note that with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(obj) {
        return obj.attribute === 'cname';
      })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;

  return rtcpParameters;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function(mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return {stream: parts[0], track: parts[1]};
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return {stream: parts[0], track: parts[1]};
  }
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function() {
  return Math.random().toString().substr(2, 21);
};

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' +
      'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' +
      's=-\r\n' +
      't=0 0\r\n';
};

SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' +
        transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' ' + msid;
      sdp += 'a=ssrc-group:FID ' +
          transceiver.sendEncodingParameters[0].ssrc + ' ' +
          transceiver.sendEncodingParameters[0].rtx.ssrc +
          '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
      ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
        // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

SDPUtils.getKind = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};

SDPUtils.isRejected = function(mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return {
    kind: mline[0].substr(2),
    port: parseInt(mline[1], 10),
    protocol: mline[2],
    fmt: mline.slice(3).join(' ')
  };
};

// Expose public methods.
if (typeof module === 'object') {
  module.exports = SDPUtils;
}

},{}],3:[function(require,module,exports){
(function (global){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */

'use strict';

var adapterFactory = require('./adapter_factory.js');
module.exports = adapterFactory({window: global.window});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./adapter_factory.js":4}],4:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */

'use strict';

var utils = require('./utils');
// Shimming starts here.
module.exports = function(dependencies, opts) {
  var window = dependencies && dependencies.window;

  var options = {
    shimChrome: true,
    shimFirefox: true,
    shimEdge: true,
    shimSafari: true,
  };

  for (var key in opts) {
    if (hasOwnProperty.call(opts, key)) {
      options[key] = opts[key];
    }
  }

  // Utils.
  var logging = utils.log;
  var browserDetails = utils.detectBrowser(window);

  // Export to the adapter global object visible in the browser.
  var adapter = {
    browserDetails: browserDetails,
    extractVersion: utils.extractVersion,
    disableLog: utils.disableLog,
    disableWarnings: utils.disableWarnings
  };

  // Uncomment the line below if you want logging to occur, including logging
  // for the switch statement below. Can also be turned on in the browser via
  // adapter.disableLog(false), but then logging from the switch statement below
  // will not appear.
  // require('./utils').disableLog(false);

  // Browser shims.
  var chromeShim = require('./chrome/chrome_shim') || null;
  var edgeShim = require('./edge/edge_shim') || null;
  var firefoxShim = require('./firefox/firefox_shim') || null;
  var safariShim = require('./safari/safari_shim') || null;
  var commonShim = require('./common_shim') || null;

  // Shim browser if found.
  switch (browserDetails.browser) {
    case 'chrome':
      if (!chromeShim || !chromeShim.shimPeerConnection ||
          !options.shimChrome) {
        logging('Chrome shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming chrome.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = chromeShim;
      commonShim.shimCreateObjectURL(window);

      chromeShim.shimGetUserMedia(window);
      chromeShim.shimMediaStream(window);
      chromeShim.shimSourceObject(window);
      chromeShim.shimPeerConnection(window);
      chromeShim.shimOnTrack(window);
      chromeShim.shimAddTrackRemoveTrack(window);
      chromeShim.shimGetSendersWithDtmf(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'firefox':
      if (!firefoxShim || !firefoxShim.shimPeerConnection ||
          !options.shimFirefox) {
        logging('Firefox shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming firefox.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = firefoxShim;
      commonShim.shimCreateObjectURL(window);

      firefoxShim.shimGetUserMedia(window);
      firefoxShim.shimSourceObject(window);
      firefoxShim.shimPeerConnection(window);
      firefoxShim.shimOnTrack(window);
      firefoxShim.shimRemoveStream(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    case 'edge':
      if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
        logging('MS edge shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming edge.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = edgeShim;
      commonShim.shimCreateObjectURL(window);

      edgeShim.shimGetUserMedia(window);
      edgeShim.shimPeerConnection(window);
      edgeShim.shimReplaceTrack(window);

      // the edge shim implements the full RTCIceCandidate object.
      break;
    case 'safari':
      if (!safariShim || !options.shimSafari) {
        logging('Safari shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming safari.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = safariShim;
      commonShim.shimCreateObjectURL(window);

      safariShim.shimRTCIceServerUrls(window);
      safariShim.shimCallbacksAPI(window);
      safariShim.shimLocalStreamsAPI(window);
      safariShim.shimRemoteStreamsAPI(window);
      safariShim.shimTrackEventTransceiver(window);
      safariShim.shimGetUserMedia(window);
      safariShim.shimCreateOfferLegacy(window);

      commonShim.shimRTCIceCandidate(window);
      break;
    default:
      logging('Unsupported browser!');
      break;
  }

  return adapter;
};

},{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":10,"./safari/safari_shim":12,"./utils":13}],5:[function(require,module,exports){

/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';
var utils = require('../utils.js');
var logging = utils.log;

var chromeShim = {
  shimMediaStream: function(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  },

  shimOnTrack: function(window) {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
        window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function() {
          return this._ontrack;
        },
        set: function(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
          }
          this.addEventListener('track', this._ontrack = f);
        }
      });
      var origSetRemoteDescription =
          window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function() {
        var pc = this;
        if (!pc._ontrackpoly) {
          pc._ontrackpoly = function(e) {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', function(te) {
              var receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = pc.getReceivers().find(function(r) {
                  return r.track && r.track.id === te.track.id;
                });
              } else {
                receiver = {track: te.track};
              }

              var event = new Event('track');
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = {receiver: receiver};
              event.streams = [e.stream];
              pc.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(function(track) {
              var receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = pc.getReceivers().find(function(r) {
                  return r.track && r.track.id === track.id;
                });
              } else {
                receiver = {track: track};
              }
              var event = new Event('track');
              event.track = track;
              event.receiver = receiver;
              event.transceiver = {receiver: receiver};
              event.streams = [e.stream];
              pc.dispatchEvent(event);
            });
          };
          pc.addEventListener('addstream', pc._ontrackpoly);
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  },

  shimGetSendersWithDtmf: function(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if (typeof window === 'object' && window.RTCPeerConnection &&
        !('getSenders' in window.RTCPeerConnection.prototype) &&
        'createDTMFSender' in window.RTCPeerConnection.prototype) {
      var shimSenderWithDtmf = function(pc, track) {
        return {
          track: track,
          get dtmf() {
            if (this._dtmf === undefined) {
              if (track.kind === 'audio') {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };

      // augment addTrack when getSenders is not available.
      if (!window.RTCPeerConnection.prototype.getSenders) {
        window.RTCPeerConnection.prototype.getSenders = function() {
          this._senders = this._senders || [];
          return this._senders.slice(); // return a copy of the internal state.
        };
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
          var pc = this;
          var sender = origAddTrack.apply(pc, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(pc, track);
            pc._senders.push(sender);
          }
          return sender;
        };

        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function(sender) {
          var pc = this;
          origRemoveTrack.apply(pc, arguments);
          var idx = pc._senders.indexOf(sender);
          if (idx !== -1) {
            pc._senders.splice(idx, 1);
          }
        };
      }
      var origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function(stream) {
        var pc = this;
        pc._senders = pc._senders || [];
        origAddStream.apply(pc, [stream]);
        stream.getTracks().forEach(function(track) {
          pc._senders.push(shimSenderWithDtmf(pc, track));
        });
      };

      var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream = function(stream) {
        var pc = this;
        pc._senders = pc._senders || [];
        origRemoveStream.apply(pc, [stream]);

        stream.getTracks().forEach(function(track) {
          var sender = pc._senders.find(function(s) {
            return s.track === track;
          });
          if (sender) {
            pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
          }
        });
      };
    } else if (typeof window === 'object' && window.RTCPeerConnection &&
               'getSenders' in window.RTCPeerConnection.prototype &&
               'createDTMFSender' in window.RTCPeerConnection.prototype &&
               window.RTCRtpSender &&
               !('dtmf' in window.RTCRtpSender.prototype)) {
      var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      window.RTCPeerConnection.prototype.getSenders = function() {
        var pc = this;
        var senders = origGetSenders.apply(pc, []);
        senders.forEach(function(sender) {
          sender._pc = pc;
        });
        return senders;
      };

      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  },

  shimSourceObject: function(window) {
    var URL = window && window.URL;

    if (typeof window === 'object') {
      if (window.HTMLMediaElement &&
        !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function() {
            return this._srcObject;
          },
          set: function(stream) {
            var self = this;
            // Use _srcObject as a private property for this shim
            this._srcObject = stream;
            if (this.src) {
              URL.revokeObjectURL(this.src);
            }

            if (!stream) {
              this.src = '';
              return undefined;
            }
            this.src = URL.createObjectURL(stream);
            // We need to recreate the blob url when a track is added or
            // removed. Doing it manually since we want to avoid a recursion.
            stream.addEventListener('addtrack', function() {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
            stream.addEventListener('removetrack', function() {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
          }
        });
      }
    }
  },

  shimAddTrackRemoveTrack: function(window) {
    var browserDetails = utils.detectBrowser(window);
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack &&
        browserDetails.version >= 64) {
      return;
    }

    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    var origGetLocalStreams = window.RTCPeerConnection.prototype
        .getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function() {
      var self = this;
      var nativeStreams = origGetLocalStreams.apply(this);
      self._reverseStreams = self._reverseStreams || {};
      return nativeStreams.map(function(stream) {
        return self._reverseStreams[stream.id];
      });
    };

    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function(stream) {
      var pc = this;
      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};

      stream.getTracks().forEach(function(track) {
        var alreadyExists = pc.getSenders().find(function(s) {
          return s.track === track;
        });
        if (alreadyExists) {
          throw new DOMException('Track already exists.',
              'InvalidAccessError');
        }
      });
      // Add identity mapping for consistency with addTrack.
      // Unless this is being used with a stream from addTrack.
      if (!pc._reverseStreams[stream.id]) {
        var newStream = new window.MediaStream(stream.getTracks());
        pc._streams[stream.id] = newStream;
        pc._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(pc, [stream]);
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function(stream) {
      var pc = this;
      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};

      origRemoveStream.apply(pc, [(pc._streams[stream.id] || stream)]);
      delete pc._reverseStreams[(pc._streams[stream.id] ?
          pc._streams[stream.id].id : stream.id)];
      delete pc._streams[stream.id];
    };

    window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
      var pc = this;
      if (pc.signalingState === 'closed') {
        throw new DOMException(
          'The RTCPeerConnection\'s signalingState is \'closed\'.',
          'InvalidStateError');
      }
      var streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 ||
          !streams[0].getTracks().find(function(t) {
            return t === track;
          })) {
        // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException(
          'The adapter.js addTrack polyfill only supports a single ' +
          ' stream which is associated with the specified track.',
          'NotSupportedError');
      }

      var alreadyExists = pc.getSenders().find(function(s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.',
            'InvalidAccessError');
      }

      pc._streams = pc._streams || {};
      pc._reverseStreams = pc._reverseStreams || {};
      var oldStream = pc._streams[stream.id];
      if (oldStream) {
        // this is using odd Chrome behaviour, use with caution:
        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
        // Note: we rely on the high-level addTrack/dtmf shim to
        // create the sender with a dtmf sender.
        oldStream.addTrack(track);

        // Trigger ONN async.
        Promise.resolve().then(function() {
          pc.dispatchEvent(new Event('negotiationneeded'));
        });
      } else {
        var newStream = new window.MediaStream([track]);
        pc._streams[stream.id] = newStream;
        pc._reverseStreams[newStream.id] = stream;
        pc.addStream(newStream);
      }
      return pc.getSenders().find(function(s) {
        return s.track === track;
      });
    };

    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
            externalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      var sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
        var externalStream = pc._reverseStreams[internalId];
        var internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
            internalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp: sdp
      });
    }
    ['createOffer', 'createAnswer'].forEach(function(method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      window.RTCPeerConnection.prototype[method] = function() {
        var pc = this;
        var args = arguments;
        var isLegacyCall = arguments.length &&
            typeof arguments[0] === 'function';
        if (isLegacyCall) {
          return nativeMethod.apply(pc, [
            function(description) {
              var desc = replaceInternalStreamId(pc, description);
              args[0].apply(null, [desc]);
            },
            function(err) {
              if (args[1]) {
                args[1].apply(null, err);
              }
            }, arguments[2]
          ]);
        }
        return nativeMethod.apply(pc, arguments)
        .then(function(description) {
          return replaceInternalStreamId(pc, description);
        });
      };
    });

    var origSetLocalDescription =
        window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function() {
      var pc = this;
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(pc, arguments);
      }
      arguments[0] = replaceExternalStreamId(pc, arguments[0]);
      return origSetLocalDescription.apply(pc, arguments);
    };

    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

    var origLocalDescription = Object.getOwnPropertyDescriptor(
        window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype,
        'localDescription', {
          get: function() {
            var pc = this;
            var description = origLocalDescription.get.apply(this);
            if (description.type === '') {
              return description;
            }
            return replaceInternalStreamId(pc, description);
          }
        });

    window.RTCPeerConnection.prototype.removeTrack = function(sender) {
      var pc = this;
      if (pc.signalingState === 'closed') {
        throw new DOMException(
          'The RTCPeerConnection\'s signalingState is \'closed\'.',
          'InvalidStateError');
      }
      // We can not yet check for sender instanceof RTCRtpSender
      // since we shim RTPSender. So we check if sender._pc is set.
      if (!sender._pc) {
        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
            'does not implement interface RTCRtpSender.', 'TypeError');
      }
      var isLocal = sender._pc === pc;
      if (!isLocal) {
        throw new DOMException('Sender was not created by this connection.',
            'InvalidAccessError');
      }

      // Search for the native stream the senders track belongs to.
      pc._streams = pc._streams || {};
      var stream;
      Object.keys(pc._streams).forEach(function(streamid) {
        var hasTrack = pc._streams[streamid].getTracks().find(function(track) {
          return sender.track === track;
        });
        if (hasTrack) {
          stream = pc._streams[streamid];
        }
      });

      if (stream) {
        if (stream.getTracks().length === 1) {
          // if this is the last track of the stream, remove the stream. This
          // takes care of any shimmed _senders.
          pc.removeStream(pc._reverseStreams[stream.id]);
        } else {
          // relying on the same odd chrome behaviour as above.
          stream.removeTrack(sender.track);
        }
        pc.dispatchEvent(new Event('negotiationneeded'));
      }
    };
  },

  shimPeerConnection: function(window) {
    var browserDetails = utils.detectBrowser(window);

    // The RTCPeerConnection object.
    if (!window.RTCPeerConnection) {
      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
        // Translate iceTransportPolicy to iceTransports,
        // see https://code.google.com/p/webrtc/issues/detail?id=4869
        // this was fixed in M56 along with unprefixing RTCPeerConnection.
        logging('PeerConnection');
        if (pcConfig && pcConfig.iceTransportPolicy) {
          pcConfig.iceTransports = pcConfig.iceTransportPolicy;
        }

        return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype =
          window.webkitRTCPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      if (window.webkitRTCPeerConnection.generateCertificate) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get: function() {
            return window.webkitRTCPeerConnection.generateCertificate;
          }
        });
      }
    } else {
      // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
      var OrigPeerConnection = window.RTCPeerConnection;
      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
          var newIceServers = [];
          for (var i = 0; i < pcConfig.iceServers.length; i++) {
            var server = pcConfig.iceServers[i];
            if (!server.hasOwnProperty('urls') &&
                server.hasOwnProperty('url')) {
              utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
              server = JSON.parse(JSON.stringify(server));
              server.urls = server.url;
              newIceServers.push(server);
            } else {
              newIceServers.push(pcConfig.iceServers[i]);
            }
          }
          pcConfig.iceServers = newIceServers;
        }
        return new OrigPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }

    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function(selector,
        successCallback, errorCallback) {
      var self = this;
      var args = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats.apply(this, arguments);
      }

      // When spec-style getStats is supported, return those when called with
      // either no arguments or the selector argument is null.
      if (origGetStats.length === 0 && (arguments.length === 0 ||
          typeof arguments[0] !== 'function')) {
        return origGetStats.apply(this, []);
      }

      var fixChromeStats_ = function(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function(report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[report.type] || report.type
          };
          report.names().forEach(function(name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      // shim getStats with maplike support
      var makeMapStats = function(stats) {
        return new Map(Object.keys(stats).map(function(key) {
          return [key, stats[key]];
        }));
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper_ = function(response) {
          args[1](makeMapStats(fixChromeStats_(response)));
        };

        return origGetStats.apply(this, [successCallbackWrapper_,
          arguments[0]]);
      }

      // promise-support
      return new Promise(function(resolve, reject) {
        origGetStats.apply(self, [
          function(response) {
            resolve(makeMapStats(fixChromeStats_(response)));
          }, reject]);
      }).then(successCallback, errorCallback);
    };

    // add promise support -- natively available in Chrome 51
    if (browserDetails.version < 51) {
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
          .forEach(function(method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function() {
              var args = arguments;
              var self = this;
              var promise = new Promise(function(resolve, reject) {
                nativeMethod.apply(self, [args[0], resolve, reject]);
              });
              if (args.length < 2) {
                return promise;
              }
              return promise.then(function() {
                args[1].apply(null, []);
              },
              function(err) {
                if (args.length >= 3) {
                  args[2].apply(null, [err]);
                }
              });
            };
          });
    }

    // promise support for createOffer and createAnswer. Available (without
    // bugs) since M52: crbug/619289
    if (browserDetails.version < 52) {
      ['createOffer', 'createAnswer'].forEach(function(method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        window.RTCPeerConnection.prototype[method] = function() {
          var self = this;
          if (arguments.length < 1 || (arguments.length === 1 &&
              typeof arguments[0] === 'object')) {
            var opts = arguments.length === 1 ? arguments[0] : undefined;
            return new Promise(function(resolve, reject) {
              nativeMethod.apply(self, [resolve, reject, opts]);
            });
          }
          return nativeMethod.apply(this, arguments);
        };
      });
    }

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
        .forEach(function(method) {
          var nativeMethod = window.RTCPeerConnection.prototype[method];
          window.RTCPeerConnection.prototype[method] = function() {
            arguments[0] = new ((method === 'addIceCandidate') ?
                window.RTCIceCandidate :
                window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          };
        });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate =
        window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function() {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }
};


// Expose public methods.
module.exports = {
  shimMediaStream: chromeShim.shimMediaStream,
  shimOnTrack: chromeShim.shimOnTrack,
  shimAddTrackRemoveTrack: chromeShim.shimAddTrackRemoveTrack,
  shimGetSendersWithDtmf: chromeShim.shimGetSendersWithDtmf,
  shimSourceObject: chromeShim.shimSourceObject,
  shimPeerConnection: chromeShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};

},{"../utils.js":13,"./getusermedia":6}],6:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';
var utils = require('../utils.js');
var logging = utils.log;

// Expose public methods.
module.exports = function(window) {
  var browserDetails = utils.detectBrowser(window);
  var navigator = window && window.navigator;

  var constraintsToChrome_ = function(c) {
    if (typeof c !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function(key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname_ = function(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return (name === 'deviceId') ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function(mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };

  var shimConstraints_ = function(constraints, func) {
    if (browserDetails.version >= 61) {
      return func(constraints);
    }
    constraints = JSON.parse(JSON.stringify(constraints));
    if (constraints && typeof constraints.audio === 'object') {
      var remap = function(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      constraints = JSON.parse(JSON.stringify(constraints));
      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
      constraints.audio = constraintsToChrome_(constraints.audio);
    }

    if (constraints && typeof constraints.video === 'object') {
      // Shim facingMode for mobile & surface pro.
      var face = constraints.video.facingMode;
      face = face && ((typeof face === 'object') ? face : {ideal: face});
      var getSupportedFacingModeLies = browserDetails.version < 66;

      if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                    face.ideal === 'user' || face.ideal === 'environment')) &&
          !(navigator.mediaDevices.getSupportedConstraints &&
            navigator.mediaDevices.getSupportedConstraints().facingMode &&
            !getSupportedFacingModeLies)) {
        delete constraints.video.facingMode;
        var matches;
        if (face.exact === 'environment' || face.ideal === 'environment') {
          matches = ['back', 'rear'];
        } else if (face.exact === 'user' || face.ideal === 'user') {
          matches = ['front'];
        }
        if (matches) {
          // Look for matches in label, or use last cam for back (typical).
          return navigator.mediaDevices.enumerateDevices()
          .then(function(devices) {
            devices = devices.filter(function(d) {
              return d.kind === 'videoinput';
            });
            var dev = devices.find(function(d) {
              return matches.some(function(match) {
                return d.label.toLowerCase().indexOf(match) !== -1;
              });
            });
            if (!dev && devices.length && matches.indexOf('back') !== -1) {
              dev = devices[devices.length - 1]; // more likely the back cam
            }
            if (dev) {
              constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
                                                        {ideal: dev.deviceId};
            }
            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }
      constraints.video = constraintsToChrome_(constraints.video);
    }
    logging('chrome: ' + JSON.stringify(constraints));

    return func(constraints);
  };

  var shimError_ = function(e) {
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        InvalidStateError: 'NotReadableError',
        DevicesNotFoundError: 'NotFoundError',
        ConstraintNotSatisfiedError: 'OverconstrainedError',
        TrackStartError: 'NotReadableError',
        MediaDeviceFailedDueToShutdown: 'NotReadableError',
        MediaDeviceKillSwitchOn: 'NotReadableError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraintName,
      toString: function() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  var getUserMedia_ = function(constraints, onSuccess, onError) {
    shimConstraints_(constraints, function(c) {
      navigator.webkitGetUserMedia(c, onSuccess, function(e) {
        if (onError) {
          onError(shimError_(e));
        }
      });
    });
  };

  navigator.getUserMedia = getUserMedia_;

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function(constraints) {
    return new Promise(function(resolve, reject) {
      navigator.getUserMedia(constraints, resolve, reject);
    });
  };

  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {
      getUserMedia: getUserMediaPromise_,
      enumerateDevices: function() {
        return new Promise(function(resolve) {
          var kinds = {audio: 'audioinput', video: 'videoinput'};
          return window.MediaStreamTrack.getSources(function(devices) {
            resolve(devices.map(function(device) {
              return {label: device.label,
                kind: kinds[device.kind],
                deviceId: device.id,
                groupId: ''};
            }));
          });
        });
      },
      getSupportedConstraints: function() {
        return {
          deviceId: true, echoCancellation: true, facingMode: true,
          frameRate: true, height: true, width: true
        };
      }
    };
  }

  // A shim for getUserMedia method on the mediaDevices object.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      return getUserMediaPromise_(constraints);
    };
  } else {
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(cs) {
      return shimConstraints_(cs, function(c) {
        return origGetUserMedia(c).then(function(stream) {
          if (c.audio && !stream.getAudioTracks().length ||
              c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach(function(track) {
              track.stop();
            });
            throw new DOMException('', 'NotFoundError');
          }
          return stream;
        }, function(e) {
          return Promise.reject(shimError_(e));
        });
      });
    };
  }

  // Dummy devicechange event methods.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
    navigator.mediaDevices.addEventListener = function() {
      logging('Dummy mediaDevices.addEventListener called.');
    };
  }
  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
    navigator.mediaDevices.removeEventListener = function() {
      logging('Dummy mediaDevices.removeEventListener called.');
    };
  }
};

},{"../utils.js":13}],7:[function(require,module,exports){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var SDPUtils = require('sdp');
var utils = require('./utils');

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object.
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
  if (!window.RTCPeerConnection) {
    return;
  }
  var proto = window.RTCPeerConnection.prototype;
  var nativeAddEventListener = proto.addEventListener;
  proto.addEventListener = function(nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap) {
      return nativeAddEventListener.apply(this, arguments);
    }
    var wrappedCallback = function(e) {
      cb(wrapper(e));
    };
    this._eventMap = this._eventMap || {};
    this._eventMap[cb] = wrappedCallback;
    return nativeAddEventListener.apply(this, [nativeEventName,
      wrappedCallback]);
  };

  var nativeRemoveEventListener = proto.removeEventListener;
  proto.removeEventListener = function(nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap || !this._eventMap
        || !this._eventMap[cb]) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    var unwrappedCb = this._eventMap[cb];
    delete this._eventMap[cb];
    return nativeRemoveEventListener.apply(this, [nativeEventName,
      unwrappedCb]);
  };

  Object.defineProperty(proto, 'on' + eventNameToWrap, {
    get: function() {
      return this['_on' + eventNameToWrap];
    },
    set: function(cb) {
      if (this['_on' + eventNameToWrap]) {
        this.removeEventListener(eventNameToWrap,
            this['_on' + eventNameToWrap]);
        delete this['_on' + eventNameToWrap];
      }
      if (cb) {
        this.addEventListener(eventNameToWrap,
            this['_on' + eventNameToWrap] = cb);
      }
    }
  });
}

module.exports = {
  shimRTCIceCandidate: function(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (window.RTCIceCandidate && 'foundation' in
        window.RTCIceCandidate.prototype) {
      return;
    }

    var NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function(args) {
      // Remove the a= which shouldn't be part of the candidate string.
      if (typeof args === 'object' && args.candidate &&
          args.candidate.indexOf('a=') === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substr(2);
      }

      // Augment the native candidate with the parsed fields.
      var nativeCandidate = new NativeRTCIceCandidate(args);
      var parsedCandidate = SDPUtils.parseCandidate(args.candidate);
      var augmentedCandidate = Object.assign(nativeCandidate,
          parsedCandidate);

      // Add a serializer that does not serialize the extra attributes.
      augmentedCandidate.toJSON = function() {
        return {
          candidate: augmentedCandidate.candidate,
          sdpMid: augmentedCandidate.sdpMid,
          sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
          usernameFragment: augmentedCandidate.usernameFragment,
        };
      };
      return augmentedCandidate;
    };

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    wrapPeerConnectionEvent(window, 'icecandidate', function(e) {
      if (e.candidate) {
        Object.defineProperty(e, 'candidate', {
          value: new window.RTCIceCandidate(e.candidate),
          writable: 'false'
        });
      }
      return e;
    });
  },

  // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

  shimCreateObjectURL: function(window) {
    var URL = window && window.URL;

    if (!(typeof window === 'object' && window.HTMLMediaElement &&
          'srcObject' in window.HTMLMediaElement.prototype &&
        URL.createObjectURL && URL.revokeObjectURL)) {
      // Only shim CreateObjectURL using srcObject if srcObject exists.
      return undefined;
    }

    var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
    var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
    var streams = new Map(), newId = 0;

    URL.createObjectURL = function(stream) {
      if ('getTracks' in stream) {
        var url = 'polyblob:' + (++newId);
        streams.set(url, stream);
        utils.deprecated('URL.createObjectURL(stream)',
            'elem.srcObject = stream');
        return url;
      }
      return nativeCreateObjectURL(stream);
    };
    URL.revokeObjectURL = function(url) {
      nativeRevokeObjectURL(url);
      streams.delete(url);
    };

    var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype,
                                              'src');
    Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
      get: function() {
        return dsc.get.apply(this);
      },
      set: function(url) {
        this.srcObject = streams.get(url) || null;
        return dsc.set.apply(this, [url]);
      }
    });

    var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
    window.HTMLMediaElement.prototype.setAttribute = function() {
      if (arguments.length === 2 &&
          ('' + arguments[0]).toLowerCase() === 'src') {
        this.srcObject = streams.get(arguments[1]) || null;
      }
      return nativeSetAttribute.apply(this, arguments);
    };
  }
};

},{"./utils":13,"sdp":2}],8:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var utils = require('../utils');
var shimRTCPeerConnection = require('rtcpeerconnection-shim');

module.exports = {
  shimGetUserMedia: require('./getusermedia'),
  shimPeerConnection: function(window) {
    var browserDetails = utils.detectBrowser(window);

    if (window.RTCIceGatherer) {
      // ORTC defines an RTCIceCandidate object but no constructor.
      // Not implemented in Edge.
      if (!window.RTCIceCandidate) {
        window.RTCIceCandidate = function(args) {
          return args;
        };
      }
      // ORTC does not have a session description object but
      // other browsers (i.e. Chrome) that will support both PC and ORTC
      // in the future might have this defined already.
      if (!window.RTCSessionDescription) {
        window.RTCSessionDescription = function(args) {
          return args;
        };
      }
      // this adds an additional event listener to MediaStrackTrack that signals
      // when a tracks enabled property was changed. Workaround for a bug in
      // addStream, see below. No longer required in 15025+
      if (browserDetails.version < 15025) {
        var origMSTEnabled = Object.getOwnPropertyDescriptor(
            window.MediaStreamTrack.prototype, 'enabled');
        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
          set: function(value) {
            origMSTEnabled.set.call(this, value);
            var ev = new Event('enabled');
            ev.enabled = value;
            this.dispatchEvent(ev);
          }
        });
      }
    }

    // ORTC defines the DTMF sender a bit different.
    // https://github.com/w3c/ortc/issues/714
    if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get: function() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = new window.RTCDtmfSender(this);
            } else if (this.track.kind === 'video') {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }

    window.RTCPeerConnection =
        shimRTCPeerConnection(window, browserDetails.version);
  },
  shimReplaceTrack: function(window) {
    // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
    if (window.RTCRtpSender &&
        !('replaceTrack' in window.RTCRtpSender.prototype)) {
      window.RTCRtpSender.prototype.replaceTrack =
          window.RTCRtpSender.prototype.setTrack;
    }
  }
};

},{"../utils":13,"./getusermedia":9,"rtcpeerconnection-shim":1}],9:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

// Expose public methods.
module.exports = function(window) {
  var navigator = window && window.navigator;

  var shimError_ = function(e) {
    return {
      name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
      message: e.message,
      constraint: e.constraint,
      toString: function() {
        return this.name;
      }
    };
  };

  // getUserMedia error shim.
  var origGetUserMedia = navigator.mediaDevices.getUserMedia.
      bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = function(c) {
    return origGetUserMedia(c).catch(function(e) {
      return Promise.reject(shimError_(e));
    });
  };
};

},{}],10:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var utils = require('../utils');

var firefoxShim = {
  shimOnTrack: function(window) {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
        window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function() {
          return this._ontrack;
        },
        set: function(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
            this.removeEventListener('addstream', this._ontrackpoly);
          }
          this.addEventListener('track', this._ontrack = f);
          this.addEventListener('addstream', this._ontrackpoly = function(e) {
            e.stream.getTracks().forEach(function(track) {
              var event = new Event('track');
              event.track = track;
              event.receiver = {track: track};
              event.transceiver = {receiver: event.receiver};
              event.streams = [e.stream];
              this.dispatchEvent(event);
            }.bind(this));
          }.bind(this));
        }
      });
    }
    if (typeof window === 'object' && window.RTCTrackEvent &&
        ('receiver' in window.RTCTrackEvent.prototype) &&
        !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function() {
          return {receiver: this.receiver};
        }
      });
    }
  },

  shimSourceObject: function(window) {
    // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
    if (typeof window === 'object') {
      if (window.HTMLMediaElement &&
        !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function() {
            return this.mozSrcObject;
          },
          set: function(stream) {
            this.mozSrcObject = stream;
          }
        });
      }
    }
  },

  shimPeerConnection: function(window) {
    var browserDetails = utils.detectBrowser(window);

    if (typeof window !== 'object' || !(window.RTCPeerConnection ||
        window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }
    // The RTCPeerConnection object.
    if (!window.RTCPeerConnection) {
      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
        if (browserDetails.version < 38) {
          // .urls is not supported in FF < 38.
          // create RTCIceServers with a single url.
          if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for (var i = 0; i < pcConfig.iceServers.length; i++) {
              var server = pcConfig.iceServers[i];
              if (server.hasOwnProperty('urls')) {
                for (var j = 0; j < server.urls.length; j++) {
                  var newServer = {
                    url: server.urls[j]
                  };
                  if (server.urls[j].indexOf('turn') === 0) {
                    newServer.username = server.username;
                    newServer.credential = server.credential;
                  }
                  newIceServers.push(newServer);
                }
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
        }
        return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype =
          window.mozRTCPeerConnection.prototype;

      // wrap static methods. Currently just generateCertificate.
      if (window.mozRTCPeerConnection.generateCertificate) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get: function() {
            return window.mozRTCPeerConnection.generateCertificate;
          }
        });
      }

      window.RTCSessionDescription = window.mozRTCSessionDescription;
      window.RTCIceCandidate = window.mozRTCIceCandidate;
    }

    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
        .forEach(function(method) {
          var nativeMethod = window.RTCPeerConnection.prototype[method];
          window.RTCPeerConnection.prototype[method] = function() {
            arguments[0] = new ((method === 'addIceCandidate') ?
                window.RTCIceCandidate :
                window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          };
        });

    // support for addIceCandidate(null or undefined)
    var nativeAddIceCandidate =
        window.RTCPeerConnection.prototype.addIceCandidate;
    window.RTCPeerConnection.prototype.addIceCandidate = function() {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };

    // shim getStats with maplike support
    var makeMapStats = function(stats) {
      var map = new Map();
      Object.keys(stats).forEach(function(key) {
        map.set(key, stats[key]);
        map[key] = stats[key];
      });
      return map;
    };

    var modernStatsTypes = {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    };

    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function(
      selector,
      onSucc,
      onErr
    ) {
      return nativeGetStats.apply(this, [selector || null])
        .then(function(stats) {
          if (browserDetails.version < 48) {
            stats = makeMapStats(stats);
          }
          if (browserDetails.version < 53 && !onSucc) {
            // Shim only promise getStats with spec-hyphens in type names
            // Leave callback version alone; misc old uses of forEach before Map
            try {
              stats.forEach(function(stat) {
                stat.type = modernStatsTypes[stat.type] || stat.type;
              });
            } catch (e) {
              if (e.name !== 'TypeError') {
                throw e;
              }
              // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
              stats.forEach(function(stat, i) {
                stats.set(i, Object.assign({}, stat, {
                  type: modernStatsTypes[stat.type] || stat.type
                }));
              });
            }
          }
          return stats;
        })
        .then(onSucc, onErr);
    };
  },

  shimRemoveStream: function(window) {
    if ('removeStream' in window.RTCPeerConnection.prototype) {
      return;
    }
    window.RTCPeerConnection.prototype.removeStream = function(stream) {
      var pc = this;
      utils.deprecated('removeStream', 'removeTrack');
      this.getSenders().forEach(function(sender) {
        if (sender.track && stream.getTracks().indexOf(sender.track) !== -1) {
          pc.removeTrack(sender);
        }
      });
    };
  }
};

// Expose public methods.
module.exports = {
  shimOnTrack: firefoxShim.shimOnTrack,
  shimSourceObject: firefoxShim.shimSourceObject,
  shimPeerConnection: firefoxShim.shimPeerConnection,
  shimRemoveStream: firefoxShim.shimRemoveStream,
  shimGetUserMedia: require('./getusermedia')
};

},{"../utils":13,"./getusermedia":11}],11:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var utils = require('../utils');
var logging = utils.log;

// Expose public methods.
module.exports = function(window) {
  var browserDetails = utils.detectBrowser(window);
  var navigator = window && window.navigator;
  var MediaStreamTrack = window && window.MediaStreamTrack;

  var shimError_ = function(e) {
    return {
      name: {
        InternalError: 'NotReadableError',
        NotSupportedError: 'TypeError',
        PermissionDeniedError: 'NotAllowedError',
        SecurityError: 'NotAllowedError'
      }[e.name] || e.name,
      message: {
        'The operation is insecure.': 'The request is not allowed by the ' +
        'user agent or the platform in the current context.'
      }[e.message] || e.message,
      constraint: e.constraint,
      toString: function() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  // getUserMedia constraints shim.
  var getUserMedia_ = function(constraints, onSuccess, onError) {
    var constraintsToFF37_ = function(c) {
      if (typeof c !== 'object' || c.require) {
        return c;
      }
      var require = [];
      Object.keys(c).forEach(function(key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = c[key] = (typeof c[key] === 'object') ?
            c[key] : {ideal: c[key]};
        if (r.min !== undefined ||
            r.max !== undefined || r.exact !== undefined) {
          require.push(key);
        }
        if (r.exact !== undefined) {
          if (typeof r.exact === 'number') {
            r. min = r.max = r.exact;
          } else {
            c[key] = r.exact;
          }
          delete r.exact;
        }
        if (r.ideal !== undefined) {
          c.advanced = c.advanced || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[key] = {min: r.ideal, max: r.ideal};
          } else {
            oc[key] = r.ideal;
          }
          c.advanced.push(oc);
          delete r.ideal;
          if (!Object.keys(r).length) {
            delete c[key];
          }
        }
      });
      if (require.length) {
        c.require = require;
      }
      return c;
    };
    constraints = JSON.parse(JSON.stringify(constraints));
    if (browserDetails.version < 38) {
      logging('spec: ' + JSON.stringify(constraints));
      if (constraints.audio) {
        constraints.audio = constraintsToFF37_(constraints.audio);
      }
      if (constraints.video) {
        constraints.video = constraintsToFF37_(constraints.video);
      }
      logging('ff37: ' + JSON.stringify(constraints));
    }
    return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
      onError(shimError_(e));
    });
  };

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function(constraints) {
    return new Promise(function(resolve, reject) {
      getUserMedia_(constraints, resolve, reject);
    });
  };

  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
      addEventListener: function() { },
      removeEventListener: function() { }
    };
  }
  navigator.mediaDevices.enumerateDevices =
      navigator.mediaDevices.enumerateDevices || function() {
        return new Promise(function(resolve) {
          var infos = [
            {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
            {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
          ];
          resolve(infos);
        });
      };

  if (browserDetails.version < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices =
        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function() {
      return orgEnumerateDevices().then(undefined, function(e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
  if (browserDetails.version < 49) {
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
      return origGetUserMedia(c).then(function(stream) {
        // Work around https://bugzil.la/802326
        if (c.audio && !stream.getAudioTracks().length ||
            c.video && !stream.getVideoTracks().length) {
          stream.getTracks().forEach(function(track) {
            track.stop();
          });
          throw new DOMException('The object can not be found here.',
                                 'NotFoundError');
        }
        return stream;
      }, function(e) {
        return Promise.reject(shimError_(e));
      });
    };
  }
  if (!(browserDetails.version > 55 &&
      'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
    var remap = function(obj, a, b) {
      if (a in obj && !(b in obj)) {
        obj[b] = obj[a];
        delete obj[a];
      }
    };

    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
      if (typeof c === 'object' && typeof c.audio === 'object') {
        c = JSON.parse(JSON.stringify(c));
        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
      }
      return nativeGetUserMedia(c);
    };

    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
      var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
      MediaStreamTrack.prototype.getSettings = function() {
        var obj = nativeGetSettings.apply(this, arguments);
        remap(obj, 'mozAutoGainControl', 'autoGainControl');
        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
        return obj;
      };
    }

    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
      var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
      MediaStreamTrack.prototype.applyConstraints = function(c) {
        if (this.kind === 'audio' && typeof c === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c, 'autoGainControl', 'mozAutoGainControl');
          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeApplyConstraints.apply(this, [c]);
      };
    }
  }
  navigator.getUserMedia = function(constraints, onSuccess, onError) {
    if (browserDetails.version < 44) {
      return getUserMedia_(constraints, onSuccess, onError);
    }
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    utils.deprecated('navigator.getUserMedia',
        'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };
};

},{"../utils":13}],12:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';
var utils = require('../utils');

var safariShim = {
  // TODO: DrAlex, should be here, double check against LayoutTests

  // TODO: once the back-end for the mac port is done, add.
  // TODO: check for webkitGTK+
  // shimPeerConnection: function() { },

  shimLocalStreamsAPI: function(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getLocalStreams = function() {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getStreamById = function(id) {
        var result = null;
        if (this._localStreams) {
          this._localStreams.forEach(function(stream) {
            if (stream.id === id) {
              result = stream;
            }
          });
        }
        if (this._remoteStreams) {
          this._remoteStreams.forEach(function(stream) {
            if (stream.id === id) {
              result = stream;
            }
          });
        }
        return result;
      };
    }
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
      var _addTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addStream = function(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (this._localStreams.indexOf(stream) === -1) {
          this._localStreams.push(stream);
        }
        var self = this;
        stream.getTracks().forEach(function(track) {
          _addTrack.call(self, track, stream);
        });
      };

      window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
        if (stream) {
          if (!this._localStreams) {
            this._localStreams = [stream];
          } else if (this._localStreams.indexOf(stream) === -1) {
            this._localStreams.push(stream);
          }
        }
        _addTrack.call(this, track, stream);
      };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.removeStream = function(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        var index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        var self = this;
        var tracks = stream.getTracks();
        this.getSenders().forEach(function(sender) {
          if (tracks.indexOf(sender.track) !== -1) {
            self.removeTrack(sender);
          }
        });
      };
    }
  },
  shimRemoteStreamsAPI: function(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getRemoteStreams = function() {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
        get: function() {
          return this._onaddstream;
        },
        set: function(f) {
          if (this._onaddstream) {
            this.removeEventListener('addstream', this._onaddstream);
            this.removeEventListener('track', this._onaddstreampoly);
          }
          this.addEventListener('addstream', this._onaddstream = f);
          this.addEventListener('track', this._onaddstreampoly = function(e) {
            var stream = e.streams[0];
            if (!this._remoteStreams) {
              this._remoteStreams = [];
            }
            if (this._remoteStreams.indexOf(stream) >= 0) {
              return;
            }
            this._remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = e.streams[0];
            this.dispatchEvent(event);
          }.bind(this));
        }
      });
    }
  },
  shimCallbacksAPI: function(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    var prototype = window.RTCPeerConnection.prototype;
    var createOffer = prototype.createOffer;
    var createAnswer = prototype.createAnswer;
    var setLocalDescription = prototype.setLocalDescription;
    var setRemoteDescription = prototype.setRemoteDescription;
    var addIceCandidate = prototype.addIceCandidate;

    prototype.createOffer = function(successCallback, failureCallback) {
      var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
      var promise = createOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    prototype.createAnswer = function(successCallback, failureCallback) {
      var options = (arguments.length >= 2) ? arguments[2] : arguments[0];
      var promise = createAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };

    var withCallback = function(description, successCallback, failureCallback) {
      var promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;

    withCallback = function(description, successCallback, failureCallback) {
      var promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;

    withCallback = function(candidate, successCallback, failureCallback) {
      var promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  },
  shimGetUserMedia: function(window) {
    var navigator = window && window.navigator;

    if (!navigator.getUserMedia) {
      if (navigator.webkitGetUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
      } else if (navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia) {
        navigator.getUserMedia = function(constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints)
          .then(cb, errcb);
        }.bind(navigator);
      }
    }
  },
  shimRTCIceServerUrls: function(window) {
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    var OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (!server.hasOwnProperty('urls') &&
              server.hasOwnProperty('url')) {
            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in window.RTCPeerConnection) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  },
  shimTrackEventTransceiver: function(window) {
    // Add event.transceiver member over deprecated event.receiver
    if (typeof window === 'object' && window.RTCPeerConnection &&
        ('receiver' in window.RTCTrackEvent.prototype) &&
        // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
        // defined for some reason even when window.RTCTransceiver is not.
        !window.RTCTransceiver) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get: function() {
          return {receiver: this.receiver};
        }
      });
    }
  },

  shimCreateOfferLegacy: function(window) {
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function(offerOptions) {
      var pc = this;
      if (offerOptions) {
        var audioTransceiver = pc.getTransceivers().find(function(transceiver) {
          return transceiver.sender.track &&
              transceiver.sender.track.kind === 'audio';
        });
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === 'sendrecv') {
            audioTransceiver.setDirection('sendonly');
          } else if (audioTransceiver.direction === 'recvonly') {
            audioTransceiver.setDirection('inactive');
          }
        } else if (offerOptions.offerToReceiveAudio === true &&
            !audioTransceiver) {
          pc.addTransceiver('audio');
        }

        var videoTransceiver = pc.getTransceivers().find(function(transceiver) {
          return transceiver.sender.track &&
              transceiver.sender.track.kind === 'video';
        });
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === 'sendrecv') {
            videoTransceiver.setDirection('sendonly');
          } else if (videoTransceiver.direction === 'recvonly') {
            videoTransceiver.setDirection('inactive');
          }
        } else if (offerOptions.offerToReceiveVideo === true &&
            !videoTransceiver) {
          pc.addTransceiver('video');
        }
      }
      return origCreateOffer.apply(pc, arguments);
    };
  }
};

// Expose public methods.
module.exports = {
  shimCallbacksAPI: safariShim.shimCallbacksAPI,
  shimLocalStreamsAPI: safariShim.shimLocalStreamsAPI,
  shimRemoteStreamsAPI: safariShim.shimRemoteStreamsAPI,
  shimGetUserMedia: safariShim.shimGetUserMedia,
  shimRTCIceServerUrls: safariShim.shimRTCIceServerUrls,
  shimTrackEventTransceiver: safariShim.shimTrackEventTransceiver,
  shimCreateOfferLegacy: safariShim.shimCreateOfferLegacy
  // TODO
  // shimPeerConnection: safariShim.shimPeerConnection
};

},{"../utils":13}],13:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var logDisabled_ = true;
var deprecationWarnings_ = true;

// Utility methods.
var utils = {
  disableLog: function(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + typeof bool +
          '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return (bool) ? 'adapter.js logging disabled' :
        'adapter.js logging enabled';
  },

  /**
   * Disable or enable deprecation warnings
   * @param {!boolean} bool set to true to disable warnings.
   */
  disableWarnings: function(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + typeof bool +
          '. Please use a boolean.');
    }
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
  },

  log: function() {
    if (typeof window === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  },

  /**
   * Shows a deprecation warning suggesting the modern and spec-compatible API.
   */
  deprecated: function(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
        ' instead.');
  },

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  extractVersion: function(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  },

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  detectBrowser: function(window) {
    var navigator = window && window.navigator;

    // Returned result object.
    var result = {};
    result.browser = null;
    result.version = null;

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
      result.browser = 'Not a browser.';
      return result;
    }

    // Firefox.
    if (navigator.mozGetUserMedia) {
      result.browser = 'firefox';
      result.version = this.extractVersion(navigator.userAgent,
          /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia) {
      // Chrome, Chromium, Webview, Opera, all use the chrome shim for now
      if (window.webkitRTCPeerConnection) {
        result.browser = 'chrome';
        result.version = this.extractVersion(navigator.userAgent,
          /Chrom(e|ium)\/(\d+)\./, 2);
      } else { // Safari (in an unpublished version) or unknown webkit-based.
        if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
          result.browser = 'safari';
          result.version = this.extractVersion(navigator.userAgent,
            /AppleWebKit\/(\d+)\./, 1);
        } else { // unknown webkit-based browser.
          result.browser = 'Unsupported webkit-based browser ' +
              'with GUM support but no WebRTC support.';
          return result;
        }
      }
    } else if (navigator.mediaDevices &&
        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
      result.browser = 'edge';
      result.version = this.extractVersion(navigator.userAgent,
          /Edge\/(\d+).(\d+)$/, 2);
    } else if (navigator.mediaDevices &&
        navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        // Safari, with webkitGetUserMedia removed.
      result.browser = 'safari';
      result.version = this.extractVersion(navigator.userAgent,
          /AppleWebKit\/(\d+)\./, 1);
    } else { // Default fallthrough: not supported.
      result.browser = 'Not a supported browser.';
      return result;
    }

    return result;
  },

};

// Export.
module.exports = {
  log: utils.log,
  deprecated: utils.deprecated,
  disableLog: utils.disableLog,
  disableWarnings: utils.disableWarnings,
  extractVersion: utils.extractVersion,
  shimCreateObjectURL: utils.shimCreateObjectURL,
  detectBrowser: utils.detectBrowser.bind(utils)
};

},{}]},{},[3])(3)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WebRTCStat = {
    Info: {
        MediaList: [],
        Video: null
    },
    DataEnum: {
        terminal_type: ["mobile", "iphone", "ipad", "andriod phone", "pc", "windows pad ", "windows phone ", "android pad", "voip", "mac", "pstn"]
    },
    getTerminalType: function() {
        var keystring = "";
        var index = "";
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("iphone")!== -1) {
            keystring = "iphone";
        } else if (agent.indexOf("android")!== -1) {
            keystring = "andriod phone";
        } else if (agent.indexOf("ipad")!== -1) {
            keystring = "ipad";
        } else if (agent.indexOf("macintosh")!== -1) {
            keystring = "mac"
        } else if (agent.indexOf("windows")!== -1) {
            keystring = "pc"
        } else {
            keystring = "pc"
        }
        this.DataEnum.terminal_type.forEach(function(item, idx) {
            if (item.toLowerCase().indexOf(keystring) !== -1) {
                index = idx + 1;
            }
        });
        return String(index);
    },
    //视频源类型
    // 1：摄像头
    // 2：播片
    // 3：捕捉屏幕
    // 4：android
    // 5：iPad
    // 6：iPhone
    getVideoSrcType: function() {
        var type = 1;
        var termType = parseInt(this.getTerminalType());
        var deviceName = this.DataEnum.terminal_type[termType - 1];
        if (deviceName === "andriod phone") {
            type = 4;
        } else if (deviceName === "ipad") {
            type = 5;
        } else if (deviceName === "iphone") {
            type = 6;
        }
        return type;
    },

    getDeviceInfo: function() {
        var self = this;
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                devices.forEach(function(device) {

                    if (device.kind === "videoinput" && !self.Info.Video) {
                        self.Info.Video = {
                            kind: device.kind,
                            label: device.label,
                            id: device.deviceId
                        };
                    }
                });
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });
    },
    getExplore: function () {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
            (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
                (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
                    (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
                        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
                            (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
                                (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;

        if (Sys.ie) return ('IE: ' + Sys.ie);
        if (Sys.edge) return ('EDGE: ' + Sys.edge);
        if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
        if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
        if (Sys.opera) return ('Opera: ' + Sys.opera);
        if (Sys.safari) return ('Safari: ' + Sys.safari);
        return 'Unkonwn';
    },
    ability: function(constraints) {
        var connectionType = 0;
        if (navigator && navigator.connection && navigator.connection.type) {
            if (navigator.connection.type === "wifi") {
                connectionType = 1;
            } else if (navigator.connection.type === "cellular") {
                connectionType = 4;
            }
        }
        var cpuMaxFrequency = 0;
        if (navigator && navigator.cpuMaxFrequency) {
            cpuMaxFrequency = navigator.cpuMaxFrequency;
        }
        var totalMemory = 0;
        if (navigator && navigator.totalMemory) {
            totalMemory = navigator.totalMemory;
        }
        var cpuModelName = "";
        if (navigator && navigator.cpuModelName) {
            cpuModelName =  navigator.cpuModelName;
        }
        var pindex = parseInt(this.getTerminalType());
        var platform = this.DataEnum.terminal_type[pindex - 1];
        var versionDetail = "";
        try {
            versionDetail = this.getExplore();
        } catch (e) {

        }
        return {
            AbilityOption: {
                GeneralLimit: {
                    CPULimit: {
                        uint32_CPU_num: String(navigator.hardwareConcurrency || 0), //CPU核心数   ok
                        str_CPU_name : String(navigator.platform),
                        uint32_CPU_maxfreq : String(cpuMaxFrequency),
                        model : cpuModelName,
                        uint32_total_memory : String(totalMemory)
                    },
                    uint32_terminal_type: WebRTCStat.getTerminalType(), //终端类型，使用enum TERMINAL_TYPE
                    uint32_device_type: String(0), //机型、设备类型(比如iphone4、iphone5s)，只针对移动终端，pc不用填写
                    str_os_verion: platform, //操作系统类型、版本
                    uint32_link_type: String(1), //客户端接口机连接类型，1表示UDP，2表示TCP，0未知（旧版本没有上报此字段）
                    str_client_version: String(WebRTCAPI.version || "0"),
                    uint32_net_type : String(connectionType),
                    ua : navigator.userAgent,
                    version : versionDetail
                },
                VideoLimit: {
                    CameraLimit: {
                        str_camera_auth_name: WebRTCStat.Info.Video && WebRTCStat.Info.Video.label,
                        uint32_video_src_type: WebRTCStat.getVideoSrcType()

                    },
                    uint32_screen_width: String(window.screen.width), //屏幕宽
                    uint32_screen_height: String(window.screen.height) //屏幕高
                },
                SpeciParam: {
                    SpeciVidParam : {
                        uint32_spcivid_proto: String(3), //角色类型
                        uint32_spcivid_width: String(640),
                        uint32_spcivid_height: String(368),
                        uint32_spcivid_fps : String(20)
                    },
                    SpeciAudParam : {
                        uint32_spciaud_fs : String(48000),
                        uint32_spciaud_ch: String(2)
                    }
                }
            }
        };
    },
    isSupport : function () {
        var isWebRTCSupported = false;
        ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function(item) {
            if (isWebRTCSupported) {
                return;
            }

            if (item in window) {
                isWebRTCSupported = true;
            }
        });
        return isWebRTCSupported;
    },
    init: function() {
        if (this.isSupport()) {
            this.getDeviceInfo();
        }
    }
};
WebRTCStat.init();



window.WebRTCAPI = {
    version: 0x00014,
    GLOBAL: {
        AudioContext: null,
        PeerConnections: null
    },
    /*
     *  步骤：
     *       1: init
     *       2: createRoom
     *       3: startWebRTC
     *       ...
     *       房间控制
     *       ...
     *       4: quit
     *
     * */
    /*
     * function init
     *   API初始化，TLS登录 webim sdk登录
     * params:
     *   listener :  -事件回调函数集合, 详见下面
     *   {
     *
     *      onKickout: function(),              -自己被踢下线通知
     *      onInitResult: function(result),     -WebRTCAPI 初始化结果
     *      onLocalStreamAdd: function(stream), -本地媒体数据采集成功通知  stream为 MediaStream对象
     *      onRemoteStreamAdd: function(stream) -对端媒体数据采集成功通知  stream为 MediaStream对象
     *   }
     * return:
     *   true                                   -params符合要求，返回true
     *   false                                  -params不符合要求，返回false
     * */
    init: function(listener, config) {},

    /*
     * function createRoom
     *   创建会话房间
     * params :
     *   opts :                                 -房间号  数字
     *   callback : function(result)            -返回回调
     * return:
     *   true                                   -params符合要求并且已经初始化，返回true
     *   false                                  -params不符合要求或者没有初始化，返回false
     * */
    createRoom: function(opts, callback) {},

    /*
     * function startWebRTC
     *   启动WebRTC
     * params :
     *   callback : function(result)             -启动WebRTC回调
     * return:
     *   true                                    -params符合要求并且已经初始化并且房间创建成功，返回true
     *   false                                   -params不符合要求或者没有初始化或者没有创建成功房间，返回false
     * */
    startWebRTC: function(callback) {},

    /*
     * function closeVideo
     *   关闭视频
     * params :
     *   null
     * return:
     *   true                                    -params关闭成功，返回true
     *   false                                   -params关闭失败，返回false
     * */
    closeVideo: function() {},

    /*
     * function openVideo
     *   打开视频（默认初始化打开）
     * params :
     *   null
     * return:
     *   true                                    -params打开成功，返回true
     *   false                                   -params打开失败，返回false
     * */
    openVideo: function() {},

    /*
     * function closeAudio
     *   关闭音频
     * params :
     *   null
     * return:
     *   true                                    -params关闭成功，返回true
     *   false                                   -params关闭失败，返回false
     * */
    closeAudio: function() {},

    /*
     * function openAudio
     *   打开音频（默认初始化打开）
     * params :
     *   null
     * return:
     *   true                                    -params打开成功，返回true
     *   false                                   -params打开失败，返回false
     * */
    openAudio: function() {},

    /*
     * function quit
     *   退出（会清除掉tls和imweb sdk的登录态）
     * params :
     *   null
     * return :
     *   true                                      -params退出成功，返回true
     *   false                                     -params退出失败，返回false
     * */
    quit: function() {}
    /*
     * function quit
     *   退出（会清除掉tls和imweb sdk的登录态）
     * */
};

var webrtc = {
    init: function(conf, callback) {},
    createRoom: function(opts, callback) {},
    startWebRTC: function(callback) {},
    setlistener: function(listener) {},
    closeVideo: function() {},
    closeAudio: function() {},
    openVideo: function() {},
    openAudio: function() {},
    setMicVolume: function(val) {},
    setConstraints: function() {},
    changeSpearRole: function(val) {},
    getOpenId: function(val) {},
    quit: function() {},
    wsreconnect : function (sig) {}
};


(function(webrtc) {
    var SERVER_TYPE = {
        FOR_EDU  : 1,
        FOR_OPEN : 2
    };
    //不要修改这个值
    var CURRENT_SERVER_TYPE = SERVER_TYPE.FOR_OPEN;
    var SvrDomain = "webrtc.qq.com";
    if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_EDU) {
        SvrDomain = "edu.rtc.qq.com"
    }
    if (/test(\d*)\.rtc\.qq\.com/.test(document.domain)) {
        SvrDomain = document.domain;
    }
    var Util = {
        query:function(n){
            var m = window.location.search.match(new RegExp( "(\\?|&)"+n+"=([^&]*)(&|$)"));
            return !m ? "":decodeURIComponent(m[2]);
        },
        getHash:function(n){
            var m = window.location.hash.match(new RegExp( "(#|&)"+n+"=([^&]*)(&|$)"));
            return !m ? "":decodeURIComponent(m[2]);
        }
    };
    function WebSocketClient() {
        this.instance = null;
        this.autoReconnectInterval = 3 * 1000;
        this.retryCount = 5;
        this.url = null;
        this.hasConnect = false;
        this.relayInfo = {
            innerip : null,
            outterip : null,
            dataport : 0,
            stunport : 0
        };
        this.sessioninfo = {
            openid : null,
            tinyid : null,
            srcids : [],
            sessionid : 0,
            peersdp : {}
        };
        this.reconnectTimer = null;
    }

    WebSocketClient.prototype.open = function (url, orignalUrl) {
        uploadWebLog("[WebSocketClient : begin connection websocket server, url = ] " + url, null, "WebSocketTag");
        var ourl = orignalUrl || url;
        // console.info("[wadesheng ] open url = " + url);
        this.url = ourl;
        if (this.instance) {
            try {
                uploadWebLog("[WebSocketClient : old instance is not close! close it before create the new one! old readyState = ]" + this.instance.readyState + " , old url = " + this.instance.url, null, "WebSocketTag");
                this.instance.close(1000);
                this.instance = null;
            } catch (e) {
                uploadWebLog("[WebSocketClient close last instance error : ]" + e.message, null, "WebSocketTag");
                console.error("WebSocketClient close last instance error : ", e);
            }
        }
        this.instance = new WebSocket(url);
        var that = this;
        this.instance.onopen = function () {
            uploadWebLog("[WebSocketClient instance is open success!!!]", null, "WebSocketTag");
            console.info("websocketclient instance on open!");
            that.hasConnect = true;
            that.retryCount = 5;
            that.onopen();
        };
        this.instance.onerror = function (e) {
            console.error("websocketclient instance on error!", e);
            uploadWebLog("[WebSocketClient instance onerror! url = ]" + e.currentTarget.url, null, "WebSocketTag");
            that.onerror(e);
        };
        this.instance.onclose = function (e) {
            console.warn("websocketclient instance close!");
            uploadWebLog("[WebSocketClient instance close!, code = ]" + e.code + " , url = " + e.currentTarget.url, null, "WebSocketTag");
            switch (e.code) {
                case 1000:
                    that.onclose(e);
                    break;
                case 1006:
                    if (that.retryCount <= 0) {
                        that.onclose(e);
                    } else {
                        that.onneedreconnect(e);
                    }
                    break;
                default:
                    that.onclose(e);
                    break;
            }
        };
        this.instance.onmessage = function (e) {
            that.onmessage(e);
        };
    };

    WebSocketClient.prototype.onopen = function () {
        console.info("WebSocketClient : onopen ", arguments);
    };

    WebSocketClient.prototype.onmessage = function (data) {

    };

    WebSocketClient.prototype.onerror = function (e) {
        console.error("WebSocketClient : onerror ", arguments);
    };

    WebSocketClient.prototype.onclose = function (e) {
        console.warn("WebSocketClient : onclose", arguments);
    };

    WebSocketClient.prototype.onneedreconnect = function (e) {
        uploadWebLog("[WebSocketClient --> on need reconnect websocket!!!]");
        console.warn("WebSocketClient : onreconnect", arguments);
    };

    WebSocketClient.prototype.close = function () {
        uploadWebLog("[WebSocketClient --> on close!]");
        clearTimeout(this.reconnectTimer);
        if (this.instance) {
            this.instance.close(1000);
            this.instance = null;
        }
        this.hasConnect = false;
        this.url = null;
        this.relayInfo = {
            innerip : null,
            outterip : null,
            dataport : 0,
            stunport : 0
        };
        this.sessioninfo = {
            openid : null,
            tinyid : null,
            srcids : [],
            peersdp : {}
        };
        this.retryCount = 3;
    };


    WebSocketClient.prototype.reconnect = function (sig) {
	    uploadWebLog("[WebSocketClient --> begin reconnect!!! sig = ]" + sig);
        console.warn("websocketclient try reconnect!");
        var that = this;
        if (sig) {
            this.url = this.replaceURLValue(this.url, "userSig", sig);
        }
        this.reconnectTimer = setTimeout(function () {
            if (that.retryCount <= 0) {
                that.close();
                return;
            }
            that.retryCount --;
            uploadWebLog("[WebSocketClient --> reconnectting!!!]");
            console.warn("websocketclient reconnectting");
            if (!that.hasConnect) {
                that.open(that.url);
            } else {
                var finalurl = that.url + "&iip=" + that.relayInfo.innerip + "&dp=" + that.relayInfo.dataport + "&oip=" + that.relayInfo.outterip + "&sp=" + that.relayInfo.stunport + "&rc=1";
                that.open(finalurl, that.url);
            }
        }, this.autoReconnectInterval);
    };

    WebSocketClient.prototype.send = function (msg) {
        if (this.instance) {
            this.instance.send(msg);
        }
    };

    WebSocketClient.prototype.replaceURLValue = function (url, paramName, replaceWith) {
        var re = eval('/('+ paramName+'=)([^&]*)/gi');
        return url.replace(re, paramName + '=' + replaceWith);
    };

    var global = new function() {
        this.deviceInfo = {
            hasVideo : false,
            hasAudio : false
        };
        this.VERSION = WebRTCAPI.version;
        this.checkSigSeq = null;
        this.relayip = null;
        this.localip = null;
        this.signalip = null;
        this.ostype = null;
        this.cpunum = 0;
        this.cpuname = null;
        this.devicename = null;
        this.dataport = null;
        this.stunport = null;
        this.stunportList = null;
        this.websocket = null;
        this.peerConnection = null;
        this.peerConnections = {};
        this.remoteStreams = {};
        this.preReportData = null;
        this.WEBRTC_WS_SERVER = "wss://" + SvrDomain + ":8687";
        this.WEBRTC_STUN_SERVER = "";
        this.WEBRTC_CGI_URL = "https://webrtc.qq.com:8687/api/uploadlog";
        if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_EDU) {
            this.WEBRTC_CGI_URL = "https://edu.rtc.qq.com:8687/api/uploadlog";
        }
        this.config = {
            sdkAppId: "",
            openid: "",
            tinyid: "",
            srctinyid: "",
            userSig: "",
            accountType: "",
            closeLocalMedia:false
        };
        this.reportSto = null;
        this.reportTime = 0;
        this.roomid = -1;
        this.localStream = null;
        this.specifyConstraints  = null;//是否由用户指定Constraints
        this.gainNode = null;

        this.constraints = {
            "audio": true,
            "video": true //this.constraintVideo
        };

        this.offerSdpOption = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
            voiceActivityDetection: false
        };

        this.hasRetryOpenCamera = false;

        this.openIdMap = {};

        this.RTC_EVENT = {
            ON_PEER_SDP: "on_peer_sdp",
            ON_UPDATE_PEER_SDP: "on_update_peer_sdp",
            ON_PEER_CANDIDATE: "on_peer_candidate",
            ON_BIND_SESSION: "on_bind_session",
            ON_MEDIA_CHANGE: "on_media_change",
            ON_START_CHAT: "on_start_chat",
            ON_QUIT_CHAT: "on_quit_chat",
            ON_CREATE_ROOM: "on_create_room",
            ON_CREATE_PEER: "on_create_peer",
            ON_QUALITY_REPORT: "on_quality_report",
            ON_GET_USER_MEDIA_FAILED : "on_get_user_media_failed",
            ON_GET_LOACL_SDP_FAILED : "on_get_local_sdp_failed",
            ON_SET_REMOTE_SDP_FAILED : "on_set_remote_sdp_failed",
            ON_GET_LOCAL_CANDIDATE_FAILED : "on_get_local_candidate_failed",
            ON_SET_REMOTE_CANDIDATE_FAILED : "on_set_remote_candidate_failed",
            ON_GET_SRC_PEER_CONNECTION_FAILED : "on_get_srctinyid_peerconnection_failed",
            ON_SET_REMOTE_CANDIDATE_SUC : "on_set_remote_candidate_suc",
            ON_SET_REMOTE_SDP_SUC : "on_set_remote_sdp_suc",
            ON_ICE_COMPLETE : "on_ice_complete",
            ON_ICE_BROKEN : "on_ice_broken",
            ON_START_WEBRTC_FAILED_WITHOUT_CALLBACK : "on_start_webrtc_failed_without_callback",
            ON_CREATE_PEERCONNECTION_FAILED : "on_create_peerconnection_failed",
            ON_END_REPORT : "on_end_report",
            ON_SPEAR_ROLE_CHANGE : "on_spear_role_change",
            ON_REBUILD_SESSION : "on_rebuild_session",
            ON_GET_USER_MEDIA_OK : "on_get_user_media_ok",
            ON_START_WEBRTC : "on_start_webrtc",
            ON_GET_USER_MEDIA : "on_get_user_media",
            ON_UPLOAD_WEB_LOG : "on_upload_web_log",
            INIT_END_REPORT: "init_end_report",
            ON_GET_MAX_TIMEMS : "on_get_max_timems",
        };

        this.KEY_TAG = {
            WEBSOCKET_TAG : "websocket_tag",
            SDP_TAG : "sdp_tag",
            CANDIDATE_TAG : "candidate_tag",
            USER_MEDIA_TAG : "user_media_tag",
            UPDATE_VIDEO_SSRC_TAG : "update_video_ssrc_tag",
            UPDATE_AUDIO_SSRC_TAG : "update_audio_ssrc_tag",
            UPDATE_LOCAL_MEDIA_STREAM_TAG : "update_local_media_stream_tag",
            UPDATE_SUB_VIDEO_TAG : "update_sub_video_tag",
            RTC_LOG_TAG : "rtc_log_tag",
            WEBSOCKET_BUILD_FAILED_TAG : "websocket_build_failed_tag",
            WEBSOCKET_REBUILD_TAG : "websocket_rebuild_tag",
            REPORT_TIME_OUT_TAG : "report_timeout"
        };

        this.MEDIA_CHANGE = {
            OPEN_VIDEO: 1,
            CLOSE_VIDEO: 2,
            OPEN_AUDIO: 3,
            CLOSE_AUDIO: 4
        };

        this.WS_CMD = {
            SDP: 0x2,
            CANDIDATE: 0x4,
            MEDIA_CHANGE: 0x0d,
            START_CHAT: 0x06,
            QUIT_CHAT: 0x08,
            ON_STAGE: 0x0c,
            WS_INIT_OK: 0x13,
            WS_INIT_FAILED: 0x50,
            CREATE_ROOM_RESULT: 0x14,
            NOTIFY_CREATE_PEER_CONNECTION: 0x10,      //通知建立新peerconnection
            NOTIFY_CREATE_PEER_CONNECTION_RES: 0x11, //通知建立新peerconnection
            NOTIFY_CLOSE_PEER_CONNECTION: 0x12,      //通知关闭peerconnection
            NOTIFY_CHANGE_CONSTRAINTS: 0x20,         //通知改变上行视频分辨率、帧率
            NOTIFY_SUB_VIDEO_STATE: 0x30,             //通知增加辅路
            NOTIFY_UPDATE_AUDIO_SSRC: 0x32,           //通知更新音频ssrc
            NOTIFY_UPDATE_VIDEO_SSRC: 0x34,           //通知更新主路视频ssrc
            NOTIFY_MAX_TIMEMS: 0x302           	     //通知当前上行音频、视频数据的最大时间戳
        };

        this.STREAM_TYPE = {
            NONE : 0,
            AUDIO : 1,      //音频
            MAIN : 2,     //主路
            AID : 7       //辅路
        };

        this.STREAM_MISD = {
            MAIN:'5Y2wZK8nANNAoVw6dSAHVjNxrD1ObBM2kBPV',
            AID:'224d130c-7b5c-415b-aaa2-79c2eb5a6df2'
        };

        this.USER_DEFINED_EVENT = {
            NOTICE_PEERCONNECTION : "notice_pc"
        };

    };

    function initEndReport(ostype, devicename, serverip, clientip, tinyid, roomid, cpunumber, cpudevice) {
        var sendData = createJsonFromTag(global.RTC_EVENT.INIT_END_REPORT);
        sendData.data = {
            socketid : global.websocket.socketid,
            tinyid : tinyid,
            clientip : clientip,
            devicename : devicename,
            ostype : ostype,
            sdkAppId : global.config.sdkAppId,
            roomid : roomid,
            serverip : serverip,
            cpunumber : cpunumber,
            cpudevice : cpudevice
        };

        global.websocket.send(JSON.stringify(sendData));

        console.log("init end report");

    }

    var ICE_BUILD_STATE = {
        SUC : 0,
        SDP_FAILED : 1,
        CANDIDATE_FAILED : 2,
        H264_NOT_SUPPORT : 3,
        GET_STUN_IP_FAILED : 4
    };

    function endEndReport(endResult) {
        try {
            if (!global.websocket || !global.websocket.socketid) {
                rtcLog.warn("do not send endreason to server, the socketid is null!");
                return;
            }

            var sendData = createJsonFromTag(global.RTC_EVENT.ON_END_REPORT);
            sendData.data = {
                dwExitRoomTime :(new Date()).getTime(),
                dwEndResult : endResult,
                socketid : global.websocket.socketid
            };

            if (global.websocket) {
                global.websocket.send(JSON.stringify(sendData));
            }
        } catch (e) {
            rtcLog.error("send end report data error : " + e.message);
        }
    }

    var rtclistener = new function() {
        this.config = {
            onRemoteLeave: null,
            onLocalStreamAdd: null,
            onPeerStreamAdd: null,
            onPeerStreamRemove: null,
            onUpdateRemoteStream: null,
            onMediaChange: null,
            onCreateRoomResult: null,
            onCreatePeerResult: null,
            onWebSocketInit: null,
            onWSClose: null,
            onIceConnectionClose: null,
            onIceConnectionFailed: null,
            onRelayTimeout: null,
            onIceConnectionBuild : null,
            onKeylogWrite : null,
            onWebSocketReconnection : null,
            onUserDefinedWebRTCEventNotice : null
        };
    };

    var createVConsole = function () {
        var scriptEle = document.createElement("script");
        scriptEle.src = 'https://sqimg.qq.com/expert_qq/webrtc/vconsole.min.js';
                    document.body.appendChild(scriptEle)
    };

    function uploadWebLog(msg, obj, tag) {
        try {
            if (!window.XMLHttpRequest) {
                console.error("XMLHttpRequest not support!");
                return;
            }

            if (!global.WEBRTC_CGI_URL) {
                console.warn("CGI URL not ready!");
                return;
            }

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", global.WEBRTC_CGI_URL, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            if (obj) {
                msg += " \r\n " + JSON.stringify({
                    OBJ : obj
                });
            }
            var sendData = JSON.stringify({
                localip : global.localip,
                relayip : global.relayip,
                signalip : global.signalip,
                tinyid :  global.config.tinyid,
                openid :  global.config.openid,
                appid : global.config.sdkAppId,
                tag : tag,
                log : msg
            });
          //xmlhttp.send("data="+sendData);
        } catch (e) {
             console.error("upload log error : ", e);
        }
    }

    var rtcLog = new function() {
        var TAG = "WEBRTC_API : ";
        this._debugLogOpen = Util.query('debug') || false;
        this._uploadLogOpen = Util.query('uploadlog') || false;
        if(Util.query("debug")){
            createVConsole();
        }
        this.LOG_LEVEL = {
            RTC_LOG_DEBUG : "RTC_LOG_DEBUG",
            RTC_LOG_INFO : "RTC_LOG_INFO",
            RTC_LOG_WARN : "RTC_LOG_WARN",
            RTC_LOG_ERROR : "RTC_LOG_ERROR"
        };
        this.error = function(msg, obj) {
            if (!obj) {
                console.error(TAG + msg);
            } else {
                console.error(TAG + msg, obj);
            }
            this.uploadLog(msg, obj, this.LOG_LEVEL.RTC_LOG_ERROR);
            if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_EDU) {
                if (rtclistener.config.onKeylogWrite) {
                    rtclistener.config.onKeylogWrite(this.LOG_LEVEL.RTC_LOG_ERROR, msg, obj);
                }
            }
        };
        this.debug = function(msg, obj) {
            if (!this._debugLogOpen) {
                return;
            }
            if (!obj) {
                console.log(TAG + msg);
            } else {
                console.log(TAG + msg, obj);
            }

        };
        this.info = function (msg, obj) {
            if (!obj) {
                console.info(TAG + msg);
            } else {
                console.info(TAG + msg, obj);
            }
            this.uploadLog(msg, obj, this.LOG_LEVEL.RTC_LOG_INFO);
            if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_EDU) {
                if (rtclistener.config.onKeylogWrite) {
                    rtclistener.config.onKeylogWrite(this.LOG_LEVEL.RTC_LOG_INFO, msg, obj);
                }
            }
        };
        this.warn = function (msg, obj) {
            if (!obj) {
                console.warn(TAG + msg);
            } else {
                console.warn(TAG + msg, obj);
            }
            this.uploadLog(msg, obj, this.LOG_LEVEL.RTC_LOG_WARN);
            if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_EDU) {
                if (rtclistener.config.onKeylogWrite) {
                    rtclistener.config.onKeylogWrite(this.LOG_LEVEL.RTC_LOG_WARN, msg, obj);
                }
            }
        };
        this.uploadLog = function (msg, obj, level) {
            if (!this._uploadLogOpen) {
                return;
            }
            uploadWebLog(msg, obj, global.KEY_TAG.RTC_LOG_TAG);
        }
    };

    var initWebSocket = function(callback) {
        try {
            //step 1 : init webrtc upload key step
            uploadWebLog("begin init websocket", null, global.KEY_TAG.WEBSOCKET_TAG);
            rtclistener.config.onWebSocketInit = callback;

            //set userSig appid identifer in url
            var identifier = encodeURIComponent(global.config.openid).replace(/'/g, "%27").replace(/"/g, "%22");
            var url = global.WEBRTC_WS_SERVER + "?" + "userSig=" + global.config.userSig + "&sdkAppid=" + global.config.sdkAppId + "&identifier=" + identifier;

            if (global.websocket) {
                try {
                    uploadWebLog("create a websocket instance, but the old one not destroy! close the old one!", null, global.KEY_TAG.WEBSOCKET_TAG);
                    global.websocket.close();
                } catch (e) {
                    console.error(e);
                }
                global.websocket = null;
            }

            global.websocket = new WebSocketClient();

            global.websocket.onmessage = wsonmessage;
            global.websocket.onopen = wsonopen;
            global.websocket.onclose = wsonclose;
            global.websocket.onneedreconnect = wsonneedreconnect;

            global.websocket.open(url);

        } catch (e) {
            var errorStr = "init web socket failed!!! exception = " + e.message;
            rtclistener.config.onWebSocketInit({
                result : -10005,
                error : errorStr
            });

            uploadWebLog(errorStr, null, global.KEY_TAG.WEBSOCKET_BUILD_FAILED_TAG);
            rtcLog.error(errorStr);
        }
    };

    var setlistener = function(listeners) {
        if (!listeners.onRemoteLeave || !listeners.onLocalStreamAdd ||
            !listeners.onPeerStreamAdd || !listeners.onPeerStreamRemove || !listeners.onMediaChange) {
            rtcLog.error("listener is empty!!!");
            return false;
        }
        rtclistener.config.onMediaChange = listeners.onMediaChange;
        rtclistener.config.onRemoteLeave = listeners.onRemoteLeave;
        rtclistener.config.onLocalStreamAdd = listeners.onLocalStreamAdd;
        rtclistener.config.onPeerStreamAdd = listeners.onPeerStreamAdd;
        rtclistener.config.onPeerStreamRemove = listeners.onPeerStreamRemove;
        rtclistener.config.onUpdateRemoteStream= listeners.onUpdateRemoteStream;
        rtclistener.config.onWSClose = listeners.onWSClose;
        rtclistener.config.onRelayTimeout = listeners.onRelayTimeout;
        rtclistener.config.onKickout = listeners.onKickout;
        rtclistener.config.onIceConnectionClose = listeners.onIceConnectionClose;
        if (listeners.onIceConnectionBuild) {
            rtclistener.config.onIceConnectionBuild = listeners.onIceConnectionBuild;
        }
        if(listeners.onQualityReport){
            rtclistener.config.onQualityReport=listeners.onQualityReport;
        }
        if (listeners.onKeylogWrite) {
            rtclistener.config.onKeylogWrite = listeners.onKeylogWrite;
        }
        if (listeners.onWebSocketReconnection) {
            rtclistener.config.onWebSocketReconnection = listeners.onWebSocketReconnection;
        }
        if (listeners.onUserDefinedWebRTCEventNotice) {
            rtclistener.config.onUserDefinedWebRTCEventNotice = listeners.onUserDefinedWebRTCEventNotice;
        }
        rtclistener.config.onChangeRemoteStreamState = listeners.onChangeRemoteStreamState;
        return true;
    };

    var getLocalStream = function(callback) {
        try {
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_USER_MEDIA);
                global.websocket.send(JSON.stringify(sendData));
            }
        } catch (e) {
            console.error("send get open camera failed! ", e);
        }

        if (isSafari()) {
            global.constraints = {
                "audio": true,
                "video": true
            };
        }

        if (!global.deviceInfo.hasAudio) {
            global.constraints.audio = false;
        }
        if (!global.deviceInfo.hasVideo) {
            global.constraints.video = false;
        }

        navigator.mediaDevices.getUserMedia(global.constraints).then(function (media) {
            rtcLog.info("get user media ok! global.constraints:" + JSON.stringify(global.constraints));
            uploadWebLog("get user media ok! global.constraints:" + JSON.stringify(global.constraints), null, global.KEY_TAG.RTC_LOG_TAG);
            WebRTCAPI.GLOBAL.LocalStream = global.localStream = media;
            var peerConnection = global.peerConnections[0];
            if (peerConnection) {
                peerConnection.addStream(media);
            }
            try {
                if (global.websocket) {
                    var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_USER_MEDIA_OK);
                    global.websocket.send(JSON.stringify(sendData));
                }
            } catch (e) {
                console.error("send get open camera suc failed! ", e);
            }
            callback(0, media);
        }).catch(function (error) {
            if (global.hasRetryOpenCamera) {
                var errorMsg = "get user media failed : error = " + error.message + " global.constraints:" + JSON.stringify(global.constraints);
                rtcLog.error(errorMsg);
                uploadWebLog(errorMsg, null, global.KEY_TAG.RTC_LOG_TAG);
                callback(-10008, error);
            } else {
                var errorMsg = "get user media failed, error = " + error.message  + " global.constraints:" + JSON.stringify(global.constraints) + " RetryOpenCamera";
                rtcLog.error(errorMsg);
                uploadWebLog(errorMsg, null, global.KEY_TAG.RTC_LOG_TAG);
                global.constraints.video = true;
                global.hasRetryOpenCamera = true;
                getLocalStream(function (result, media) {
                    callback(result, media);
                });
            }
        });

    };

    var updateLocalStream = function(newConstraints, callback) {
        if (global.hasRetryOpenCamera) {
            rtcLog.warn("update local stream : camera not support, try default constraints");
            return;
        }

        global.localStream.getVideoTracks().forEach(function(videoTrack) {
            var constraints = videoTrack.getConstraints();
            for (var key in constraints) {
                for (var subkey in constraints[key]) {
                    rtcLog.info("old key:" + key + "|" + subkey + " value:" + constraints[key][subkey]);
                }
            }
            videoTrack.stop();
            global.localStream.removeTrack(videoTrack);
        });

        try {
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_USER_MEDIA);
                global.websocket.send(JSON.stringify(sendData));
            }
        } catch (e) {
            console.error("send get open camera failed! ", e);
        }

        navigator.mediaDevices.getUserMedia(newConstraints).then(function (media) {
            rtcLog.info("get new user media ok!!!  newConstraints");
            var videoTracks = media.getVideoTracks();
            if (videoTracks.length > 0) {
                global.localStream.addTrack(videoTracks[0]);
                var peerConnection = global.peerConnections[0];
                if (peerConnection) {
                    peerConnection.addTrack(videoTracks[0], global.localStream);
                }
            }
            callback(0, media);
        }).catch(function (error) {
            var errorMsg = "get new user media failed : error = " + error.message;
            rtcLog.error(errorMsg);
            callback(-10008, error);
        });
    };

    function isSupportH264(sdp) {
        var supportH264 = false;
        try {
            var sdpList = sdp.split("\r\n");
            for (var i = 0; i < sdpList.length; i++) {
                var sdpStr = sdpList[i];
                if (sdpStr.indexOf("a=rtpmap") !== -1 &&
                    (sdpStr.indexOf("H264/") !== -1 || sdpStr.indexOf("h264/") !== -1)) {
                    supportH264 = true;
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
        return supportH264;
    }

    var getSdp = function(srctinyid, callback) {
        if (!srctinyid) {
            srctinyid = 0;
        }
        var peerConnection = global.peerConnections[srctinyid];
        var offerOption = global.offerSdpOption;

        peerConnection.createOffer(offerOption).then(function(offer) {
            if (isSupportH264(offer.sdp)) {
                return peerConnection.setLocalDescription(offer);
            } else {
                if (rtclistener.config.onIceConnectionBuild) {
                    rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.H264_NOT_SUPPORT);
                }
                var errorStr = "this web browser do not support h264. srctinyid = " + srctinyid;
                rtcLog.error(errorStr);
                uploadWebLog(errorStr, null, global.KEY_TAG.SDP_TAG);
                callback(-10009, errorStr);
            }
        }).then(function() {
            var desc = peerConnection.localDescription;
            rtcLog.info("get local sdp info : " + desc.sdp);
            callback(0, desc);
        }).catch(function(reason) {
            rtcLog.error("create offer failed : reason = " + reason);
            callback(-10009, reason);
        });
    };

    var clearGlobalValues = function() {

        global.config = {
            sdkAppId: "",
            openid: "",
            tinyid: "",
            srctinyid: "",
            userSig: "",
            accountType: ""
        };

        global.constraints = {
            "audio": true,
            "video": true
        };

        global.checkSigSeq = null;
        global.reportTime = 0;

        global.specifyConstraints = null;
        global.hasRetryOpenCamera = false;
    };

    var createPeerConnection = function(srctinyid) {
        rtcLog.debug('createPeerConnection with srctinyid:' + srctinyid);
        var stun = {
            iceServers: [{
                urls: global.WEBRTC_STUN_SERVER
            }],
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require",
            tcpCandidatePolicy: "disable",
            IceTransportsType: "nohost"
        };

        var optional = {
            optional: [{
                DtlsSrtpKeyAgreement: true
            }]
        };
        try {

            var peerConnection = new RTCPeerConnection(stun, optional);
            peerConnection.localCandidateList = [];
            peerConnection.isSdpSendOK = false;
            peerConnection.hasSendCandidate = false;
            peerConnection.videoStreams = {};
            global.peerConnections[srctinyid] = peerConnection;

            peerConnection.onicecandidate = function(e) {
                onIceCandidate(e, srctinyid);
            };
            peerConnection.onaddstream = function(e) {
                rtcLog.info("peerConnection.onaddstream:" + e.stream.id);
            };
            peerConnection.oniceconnectionstatechange = function(e) {
                onIceConnectionStateChange(e, srctinyid);
            };
            peerConnection.ontrack = function(e) {
                rtcLog.info("peerConnection.ontrack: streams.length=" + e.streams.length);
                onAddTrack(e.streams[0], e.track.kind,srctinyid);
            };
            peerConnection.onremovestream = function(e) {
                rtcLog.info("peerConnection.onremovestream:" + e.stream.id);
                onRemoveStream(e.stream, srctinyid);
            };
            peerConnection.onsignalingstatechange = function(e) {
                rtcLog.info("peerConnection.onsignalingstatechange:" + peerConnection.signalingState);
            };
            peerConnection.onicegatheringstatechange = function(e) {
                rtcLog.info("peerConnection.onicegatheringstatechange : " + e.target.iceGatheringState);
            };
            peerConnection.onnegotiationneeded = function(e) {
                rtcLog.info("peerConnection.onnegotiationneeded");
            };

        } catch (e) {
            var errorMsg = "create peer connection failed!!! exception : " + e;
            rtcLog.error(errorMsg);
            if (global.websocket) {
                var sendMsg = createJsonFromTag(global.RTC_EVENT.ON_CREATE_PEERCONNECTION_FAILED);
                sendMsg.data = errorMsg;
                global.websocket.send(JSON.stringify(sendMsg));
            }
         //   alert(errorMsg);
            return false;
        }
        return true;
    };

    var wsonopen = function() {
        uploadWebLog("web socket init success", null, global.KEY_TAG.WEBSOCKET_TAG);
        rtcLog.info("web socket init success");
    };
    var setConstraints = function(videoCtrlAbility , ext) {

        if (videoCtrlAbility) {
            rtcLog.info("videoCtrlAbility.length=" + videoCtrlAbility.length);
            if (videoCtrlAbility.length > 0) {
                var VidWidth =  (ext && ext.VidWidth) ||  videoCtrlAbility[0].VidWidth;
                var VidHeight = (ext && ext && ext.VidHeight) || videoCtrlAbility[0].VidHeight;
                var VidFr = (ext && ext && ext.VidFr) || videoCtrlAbility[0].VidFr;
                var CpuOverUseDetect = videoCtrlAbility[0].CpuOverUseDetect;

                if (VidWidth > 0 && VidHeight > 0 && VidFr > 0) {
                    global.constraints = {
                        "audio": true,
                        "video": {
                            width: { exact: VidWidth },
                            height: { exact: VidHeight },
                            frameRate: { exact: VidFr },
                            googCpuOveruseDetection: CpuOverUseDetect ? true : false
                        }
                    };
                }
            }
        }
    };

    var wsonneedreconnect = function (e) {
        if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_OPEN) {
            if (global.websocket) {
                global.websocket.reconnect();
            }
        } else {
            if (rtclistener.config.onWebSocketReconnection) {
                rtclistener.config.onWebSocketReconnection();
            }
        }
    };

    function startQualityReport() {
        global.reportSto = setInterval(reportQuality, 2000);
    }

    var wsonmessage = function(message) {
        var msg = message.data;
        var resJson = JSON.parse(msg);
        var cmd = resJson.cmd;
        rtcLog.info("on websocket message, cmd = " + cmd);
        var LOGTAG = "RECV_CMD_FROM_SIGNAL";
        uploadWebLog("WebRTCJSAPI receive cmd from signal server : cmd = " + cmd, null, LOGTAG);

        if (cmd === global.WS_CMD.CANDIDATE) {
            uploadWebLog("WebRTCJSAPI receive remote candidate from siganl server, srctinyid = " + resJson.srctinyid, null, LOGTAG);
            onRemoteCandidate(resJson.content, resJson.srctinyid);
        } else if (cmd === global.WS_CMD.SDP) {
            uploadWebLog("WebRTCJSAPI receive remote sdp from siganl server, srctinyid = " + resJson.srctinyid, null, LOGTAG);
            onRemoteSdp(resJson.content, resJson.srctinyid);
        } else if (cmd === global.WS_CMD.MEDIA_CHANGE) {
            uploadWebLog("WebRTCJSAPI receive media change from siganl server", null, LOGTAG);
            onMediaChange(resJson.content);
        } else if (cmd === global.WS_CMD.QUIT_CHAT) {
            uploadWebLog("WebRTCJSAPI receive quit chat from siganl server, info = " + JSON.stringify(resJson), null, LOGTAG);
            onQuitChat(resJson.content);
        } else if (cmd === global.WS_CMD.WS_INIT_OK) {
            global.websocket.socketid = resJson.content.socketid;
            global.relayip = resJson.content.relayip;
            global.localip = resJson.content.localip;
            global.signalip = resJson.content.signalip;
            global.dataport = resJson.content.dataport;
            global.stunport = resJson.content.stunport;
            global.localip = resJson.content.localip;
            global.checkSigSeq = resJson.content.checkSigSeq;
            global.stunportList = resJson.content.stunportList;
            if (!global.stunportList || global.stunportList.length <= 0) {
                global.WEBRTC_STUN_SERVER = "stun:" + global.relayip + ":" + global.stunport;
            } else {
                var webrtcStunList = [];
                for (var i = 0 ; i < global.stunportList.length; i++) {
                    var port = global.stunportList[i];
                    var stunserver = "stun:" + global.relayip + ":" + port;
                    webrtcStunList.push(stunserver);
                }
                global.WEBRTC_STUN_SERVER = webrtcStunList;
            }

            if (resJson.content.cgiurl) {
                global.WEBRTC_CGI_URL = resJson.content.cgiurl;
            }

            rtcLog.info("WS_INIT_OK : data = " + JSON.stringify(resJson.content) + " , stun server = " + global.WEBRTC_STUN_SERVER);

            global.websocket.relayInfo.stunport = global.stunport;
            global.websocket.relayInfo.outterip = global.relayip;
            global.websocket.relayInfo.dataport = global.dataport;
            global.websocket.relayInfo.innerip = resJson.content.innerip;
            global.websocket.sessioninfo.openid = resJson.content.openid;
            global.websocket.sessioninfo.tinyid = resJson.content.tinyid;
            global.config.tinyid = resJson.content.tinyid;
            global.config.openid = resJson.content.openid;

            var rc = resJson.content.rc;

            uploadWebLog("WebRTCJSAPI receive websocket init from siganl server, info = " + JSON.stringify(resJson.content), null, LOGTAG);

            if (rc === 1) {
                console.info("reconnect ok, now rebuild session!");
                var result = rebuildSession();
                if (!result) {
                    try {
                        global.websocket.close();
                        global.websocket = null;
                    } catch (e) {
                        console.error(e);
                    }
                    rtclistener.config.onWebSocketInit({
                        result : -11001
                    });
                }
                return;
            }

            if (rc !== 1) {
                rtclistener.config.onWebSocketInit({
                    result : 0,
                    openid : resJson.content.openid,
                    tinyid : resJson.content.tinyid,
                    relayip : global.relayip,
                    innerip :resJson.content.innerip
                });
            }

        } else if (cmd === global.WS_CMD.WS_INIT_FAILED) {
            rtcLog.error("ws init failed !!!  ");
            uploadWebLog("WebRTCJSAPI receive websocket init failed from siganl server", null, LOGTAG);
            try {
                global.websocket.close();
                global.websocket = null;
            } catch (e) {
                console.error(e);
            }
            rtclistener.config.onWebSocketInit({
                result : -11000
            });
        } else if (cmd === global.WS_CMD.CREATE_ROOM_RESULT) {

            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive create room result from siganl server, info = " + JSON.stringify(data), null, LOGTAG);
            if (data.ret !== 0) {
                rtcLog.error("create room error!!! e = " + data.error);
                try {
                    global.websocket.close();
                    global.websocket = null;
                } catch (e) {
                    console.error(e);
                }
                rtclistener.config.onCreateRoomResult(data.ret);
                return;
            }
            global.roomid = data.data.roomid;
            global.config.tinyid = data.data.tinyid;
            global.config.srctinyid = data.data.srctinyid;
            global.openIdMap[data.data.tinyid] = data.data.openid;

            global.websocket.sessioninfo.sessionid = global.roomid;
            global.websocket.hasConnect = true;
            //init end report
            initEndReport(global.ostype, global.ostype, global.relayip, global.localip, global.config.tinyid, global.roomid, global.cpunum, global.cpuname);

            if (data.data.videoability && global.specifyConstraints) {
                setConstraints(data.data.videoability , global.specifyConstraints);
            }else{
                setConstraints(data.data.videoability);
            }


            console.debug('global.constraints',global.constraints);
            rtcLog.info("create room ok!!! data = " + JSON.stringify(data.data));
            rtclistener.config.onCreateRoomResult(0);

            global.reportTime = (new Date()).valueOf();
            rtcLog.info("start quality report : time = " + global.reportTime);
            startQualityReport();
            /*用户配置是否打开上行*/
            if(global.config.closeLocalMedia){
                return;
            }
            webrtc.startWebRTC(startWebRTCCalllback);

        } else if (cmd === global.WS_CMD.NOTIFY_CREATE_PEER_CONNECTION) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive create peerconnection from siganl server, info = " + JSON.stringify(data), null, LOGTAG);
            addPeer(data.openid, data.tinyid, global.roomid, data.srctinyid, data.userSig, data.peerconnectionport);

        } else if (cmd === global.WS_CMD.NOTIFY_CREATE_PEER_CONNECTION_RES) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive create peerconnection res from siganl server, info = " + JSON.stringify(data), null, LOGTAG);
            //video control
            if (data.data.videoability) {
                setConstraints(data.data.videoability);
            }
            rtcLog.debug("add peer ok!!! data = " + JSON.stringify(data.data));

            if(data.data.srcopenid){
                global.openIdMap[data.data.srctinyid] = data.data.srcopenid;
            }
            webrtc.startWebRTC(startWebRTCCalllback, data.data.srctinyid);

        } else if (cmd === global.WS_CMD.NOTIFY_CLOSE_PEER_CONNECTION) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive close peerconnection from siganl server, info = " + JSON.stringify(data), null, LOGTAG);
            onClosePeerConnections(data);
        }
        else if (cmd === global.WS_CMD.NOTIFY_CHANGE_CONSTRAINTS) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive change constraints from siganl server", null, LOGTAG);
            onChangeConstraints(data);
        }
        else if (cmd === global.WS_CMD.NOTIFY_SUB_VIDEO_STATE) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive notify sub video state from siganl server", null, LOGTAG);
            onSubVideoState(data);
        }
        else if (cmd === global.WS_CMD.NOTIFY_UPDATE_AUDIO_SSRC) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive update audio ssrc from siganl server", null, LOGTAG);
            onUpdateAudSsrc(data);
        }
        else if (cmd === global.WS_CMD.NOTIFY_UPDATE_VIDEO_SSRC) {
            var data = resJson.content;
            uploadWebLog("WebRTCJSAPI receive update video ssrc from siganl server", null, LOGTAG);
            onUpdateVidSsrc(data);
        }
        else if (cmd === global.WS_CMD.NOTIFY_MAX_TIMEMS) {
            var data = resJson.content;
            if( onGetMaxTimeMs ){
                onGetMaxTimeMs({
                    "maxAudTimeMs": data.maxAudTimeMs,
                    "maxVidTimeMs": data.maxVidTimeMs
                });
            }
        }
    };

    function rebuildSession() {
        try {
            console.log("begin rebuild session!!!  size = " + global.websocket.sessioninfo.srcids.length);
            var sendData = createJsonFromTag(global.RTC_EVENT.ON_REBUILD_SESSION);
            sendData.data = {
                socketid : global.websocket.socketid,
                tinyid : global.websocket.sessioninfo.tinyid,
                appid : global.config.sdkAppId,
                openid : global.websocket.sessioninfo.openid,
                sessionid : global.websocket.sessioninfo.sessionid,
                sids : global.websocket.sessioninfo.srcids,
                relayInfo : global.websocket.relayInfo.innerip,
                remotesdp : global.websocket.sessioninfo.peersdp
            };
            global.websocket.send(JSON.stringify(sendData));
            return true;
        } catch (e) {
            console.error("rebuild session exception : ", e);
            return false;
        }
    }

    var wsonclose = function(e) {
        var str = "websocket close! , code = " + e.code;
        rtcLog.warn(str);
        switch (e.code) {
            case 1000:
                break;
            default:
                break;
        }
        if (rtclistener.config.onWSClose) {
            rtclistener.config.onWSClose();
        }
    };

    var filterIceCandidate = function(candidate) {
        var str = candidate.candidate;
        if (str.indexOf("tcp") !== -1) {
            return false;
        }
        var type = getIceCandidateType(candidate);
        if (type !== "srflx") {
            return false;
        }
        return true;
    };

    var getIceCandidateType = function(candidate) {
        try {
            var str = candidate.candidate;
            var params = str.split(" ");
            return params[7];
        } catch (e) {
            rtcLog.error("Get Ice Candidate Type Error : e = " + e);
            return null;
        }
    };

    var onIceCandidate = function(e, srctinyid) {

        var pc = global.peerConnections[srctinyid];
        var candidate = e.candidate;
        if (!candidate) {
            rtcLog.debug("Ice Candidate End!");

            //no srflex candidate, report candidate fail
            if (pc.localCandidateList.length <= 0) {
                //candidate 失败
                rtcLog.error("get local candidate failed!");

                if (rtclistener.config.onIceConnectionBuild) {
                    rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.GET_STUN_IP_FAILED);
                }

                if (global.websocket) {
                    var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_LOCAL_CANDIDATE_FAILED);
                    sendData.data = {
                        stunserver : global.WEBRTC_STUN_SERVER
                    };
                    global.websocket.send(JSON.stringify(sendData));
                }
                return;
            }

            if (pc.isSdpSendOK && !pc.hasSendCandidate) {
                rtcLog.info("send candidate when ice end!");
                pc.hasSendCandidate = true;
                var len = pc.localCandidateList.length;
                var c = pc.localCandidateList[len - 1];
                sendLocalCandidate(c, srctinyid);
            }
            return;
        }

        rtcLog.info("on ice candidate : sdpMLineIndex = " + candidate.sdpMLineIndex +
            " , sdpMid = " + candidate.sdpMid +
            " , candidate = " + candidate.candidate);

        if (filterIceCandidate(candidate)) {
            var msg = {
                sdpMLineIndex: candidate.sdpMLineIndex,
                sdpMid: candidate.sdpMid,
                candidate: candidate.candidate
            };
            pc.localCandidateList.push(msg);

            if (pc.localCandidateList.length > 0 && pc.isSdpSendOK) {
                pc.hasSendCandidate = true;
                sendLocalCandidate(pc.localCandidateList[pc.localCandidateList.length - 1], srctinyid);
            }
        }
    };

    var onAddTrack = function(stream, type,srctinyid) {

        rtcLog.info("onAddTrack, srctinyid:" + srctinyid + "stream.getVideoTracks().length="+ stream.getVideoTracks().length+ "stream.getAudioTracks().length="+ stream.getAudioTracks().length);
        if (srctinyid != "0") {
            var peerConnection = global.peerConnections[srctinyid];
            if(peerConnection)
            {
                /*加入主辅路解析逻辑*/
                var sdp = peerConnection.remoteDescription.sdp;
                var splitAudio = sdp.split("a=mid:audio");
                var videoAndAudioArray;
                if (splitAudio.length > 1) {//不存在没有audio也没有video的情况
                    videoAndAudioArray = splitAudio[1].split("a=mid:video");//有audio过来，这时候再解析video
                } else {
                    videoAndAudioArray = splitAudio[0].split("a=mid:video");//没有audio，直接解析video
                }

                var audioArray = [];
                var videoArray = [];
                for (var i = 0; i < videoAndAudioArray.length; i++) {
                    var strArray = videoAndAudioArray[i].split("\r\n");
                    var count = strArray.length;
                    var ssrc;
                    for (var j = 0; j < count; j++) {
                        if (i === 0) {//音频的处理
                            if (strArray[j].indexOf("a=ssrc:") === 0) {//以这个标记开头
                                ssrc = parseInt(strArray[j].split(" ")[0].split(":")[1]);
                                if (!audioArray.includes(ssrc)) {
                                    audioArray.push(ssrc);
                                }
                            }
                        } else {//视频处理逻辑
                            if (strArray[j].indexOf("a=ssrc-group:") === 0) {//以这个标记开头
                                ssrc = parseInt(strArray[j].split(" ")[1]);
                                if (!videoArray.includes(ssrc)) {
                                    videoArray.push(ssrc);
                                }
                            }
                        }

                    }
                }

                /*ssrState里面，会有多路视频，所以返回对象格式*/
                var SsrcState = {
                    video: {},
                    audio: []
                };
                var index;
                for (index in audioArray) {
                    SsrcState.audio.push((audioArray[index] >> 16) & 0XFF);
                }
                var state, streamID;
                for (index in videoArray) {
                    state = (videoArray[index] >> 16) & 0XFF;
                    if (state === global.STREAM_TYPE.MAIN) {
                        streamID = srctinyid + "_" + global.STREAM_MISD.MAIN;
                    } else if (state === global.STREAM_TYPE.AID) {
                        streamID = srctinyid + "_" + global.STREAM_MISD.AID;
                    }
                    SsrcState.video[streamID] = state;
                }
                /*主辅路解析逻辑结束*/

                var videoId = srctinyid + "_" + stream.id;
                rtcLog.info("onAddTrack, videoId:" + videoId);
                peerConnection.videoStreams[videoId] = stream;
                rtclistener.config.onUpdateRemoteStream(stream,videoId, type,SsrcState);
            }
        }
    };

    var onIceConnectionStateChange = function (e, srctinyid) {
        rtcLog.info("on ice connection state change : iceConnectionState = " + e.target.iceConnectionState + " , iceGatheringState = " + e.target.iceGatheringState + " srctinyid = " + srctinyid);
        if ("completed" === e.target.iceConnectionState && "completed" === e.target.iceGatheringState) {
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_ICE_COMPLETE);
                global.websocket.send(JSON.stringify(sendData));
            }
        }

        if (e.target.iceConnectionState === "failed" || e.target.iceGatheringState === "failed" ||
            e.target.iceConnectionState === "disconnected" || e.target.iceGatheringState === "disconnected") {

            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_ICE_BROKEN);
                sendData.data = {
                    iceConnectionState : e.target.iceConnectionState,
                    iceGatheringState : e.target.iceGatheringState,
                    openid : global.config.openid,
                    tinyid : global.config.tinyid,
                    srctinyid : srctinyid
                };
                global.websocket.send(JSON.stringify(sendData));
            }
        } else if (e.target.iceConnectionState === "closed" || e.target.iceGatheringState === "closed") {
            rtclistener.config.onIceConnectionClose();
        }
    };

    var onRemoveStream = function(stream, srctinyid) {
        rtcLog.info("on remove stream : srctinyid = " + srctinyid);

        var peerConnection = global.peerConnections[srctinyid];
        if (peerConnection) {
            var videoId = srctinyid + "_" + stream.id;
            rtclistener.config.onPeerStreamRemove(videoId);

        }
    };

    var onClosePeerConnections = function(data) {
        rtcLog.info("onClosePeerConnections : srctinyid = " + data.srctinyid);
        global.websocket.sessioninfo.peersdp[data.srctinyid + ""] = null;
        for (var i = 0; i < global.websocket.sessioninfo.srcids.length; i++) {
            if (global.websocket.sessioninfo.srcids[i] == data.srctinyid) {
                global.websocket.sessioninfo.srcids.splice(i, 1);
                break;
            }
        }
        var peerConnection = global.peerConnections[data.srctinyid];
        if (peerConnection) {

            for(var videoId in peerConnection.videoStreams)
            {
                rtcLog.info("onClosePeerConnections: videoId = " + videoId);
                rtclistener.config.onPeerStreamRemove(videoId);
            }

            if (peerConnection.signalingState !== 'closed') {
                peerConnection.close();
            }
            peerConnection = null;
            delete global.peerConnections[data.srctinyid];
            //
        }
    };
    var onChangeConstraints = function(data) {
        rtcLog.info("on change constraints : " + JSON.stringify(data) );

        if(data.srctinyid == undefined || parseInt(data.srctinyid) != 0)
            return;

        var srctinyid = 0;
        var newConstraints = {
            "video": {
                width: { exact: parseInt(data.width) },
                height: { exact: parseInt(data.height) },
                frameRate: { exact: parseInt(data.frameRate) },
            }
        };

        rtcLog.info("on change constraints newConstraints: " + JSON.stringify(newConstraints) );

        updateLocalStream(newConstraints, function(result, media) {
            media.getVideoTracks().forEach(function(videoTrack) {
                var constraints = videoTrack.getConstraints();
                for(var key in constraints)
                {
                    for(var subkey in constraints[key])
                    {
                        rtcLog.info("new key:" + key + "|" + subkey + " value:" + constraints[key][subkey]);
                    }
                }
            });

            rtclistener.config.onLocalStreamAdd(global.localStream);

            getSdp(srctinyid, function(result, info) {
                if (result !== 0) {
                    rtcLog.error("get local sdp failed!!! e = " + info);
                    callback(result);
                    return;
                }
                rtcLog.info("get new local sdp success!" );
                sendUpdateSdp(info, srctinyid);
            });
        });

    };

    var updateRemoteSdp = function(srctinyid, newSdp) {
       // rtcLog.info("onUpdateRemoteSdp: srctinyid" + srctinyid + "  newSdp:" + newSdp.sdp);

        if(parseInt(srctinyid || 0) == 0)
            return;

        var peerConnection = global.peerConnections[srctinyid];

        if (!peerConnection) {
            var errorMsg = "onUpdateRemoteSdp, failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            return;
        }

        rtcLog.info("onUpdateRemoteSdp peerConnection.localDescription:" + peerConnection.localDescription.sdp + "\r\n"
            + peerConnection.localDescription.type);
        rtcLog.info("onUpdateRemoteSdp peerConnection.remoteDescription:" + peerConnection.remoteDescription.sdp + "\r\n"
            + peerConnection.remoteDescription.type);
        rtcLog.info("onUpdateRemoteSdp new sdp :" + newSdp.sdp + "\r\n" + newSdp.type);

       // newSdp.type = "pranswer";

        peerConnection.setRemoteDescription(new RTCSessionDescription(newSdp), function() {
            if (srctinyid != 0) {
                global.websocket.sessioninfo.peersdp[srctinyid + ""] = newSdp.sdp;
            }
            rtcLog.info("onUpdateRemoteSdp setRemoteDescription success!");
        }, function() {
            rtcLog.info("onUpdateRemoteSdp setRemoteDescription failed!");
        });
    };

    var onSubVideoState = function(data) {
        rtcLog.info("onSubVideoState");

        if(parseInt(data.srctinyid || 0) == 0)
            return;

        /*加入主辅路判断逻辑*/
        var videoState=data.state;
        var localSubVidSsrc=parseInt(data.localSubVidSsrc);
        var streamType=(localSubVidSsrc >> 16) & 0XFF;
        var videoId;
        if(streamType===global.STREAM_TYPE.MAIN){
            videoId=data.srctinyid+'_'+global.STREAM_MISD.MAIN;
        }else{
            videoId=data.srctinyid+'_'+global.STREAM_MISD.AID;
        }
        var checkResult={
            type:streamType,
            state:videoState,
            videoId:videoId
        };
        rtclistener.config.onChangeRemoteStreamState(checkResult);

        /*主辅路判断逻辑结束*/

        var peerConnection = global.peerConnections[data.srctinyid];

        if (!peerConnection) {
            var errorMsg = "onSubVideoState, failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            return;
        }

        data.newSdp.type = "pranswer";

        updateRemoteSdp(data.srctinyid, data.newSdp);
    };

    var onUpdateAudSsrc = function(data) {
        rtcLog.info("onUpdateAudSsrc");

        if(parseInt(data.srctinyid || 0) == 0)
            return;

        var peerConnection = global.peerConnections[data.srctinyid];

        if (!peerConnection) {
            var errorMsg = "onUpdateAudSsrc, failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            return;
        }

        data.newSdp.type = "pranswer";

        updateRemoteSdp(data.srctinyid, data.newSdp);
    };

    var onUpdateVidSsrc = function(data) {
        rtcLog.info("onUpdateVidSsrc:\r\n " + JSON.stringify(data) );

        if(parseInt(data.srctinyid || 0) == 0)
            return;

        var peerConnection = global.peerConnections[data.srctinyid];

        if (!peerConnection) {
            var errorMsg = "onUpdateVidSsrc, failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            return;
        }

        data.newSdp.type = "pranswer";

        updateRemoteSdp(data.srctinyid, data.newSdp);
    };

    var onGetMaxTimeMs = function(data) {
        rtcLog.info("onGetMaxTimeMs: " + JSON.stringify(data) );
    };

    var onRemoteCandidate = function(remoteCandidate, srctinyid) {
        rtcLog.info("on peer candidate : remote candidate = " + JSON.stringify(remoteCandidate) + ' ,srctinyid ' + srctinyid);
        srctinyid = global.config.tinyid === srctinyid ? 0 :srctinyid;
        var peerConnection = global.peerConnections[srctinyid || 0];

        if (!peerConnection) {
            var errorMsg = "on remote candidate , failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_SRC_PEER_CONNECTION_FAILED);
                sendData.data = errorMsg;
                global.websocket.send(JSON.stringify(sendData));
            }
            if (rtclistener.config.onIceConnectionBuild) {
                rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.CANDIDATE_FAILED);
            }
            return;
        }

        peerConnection.addIceCandidate(remoteCandidate, function() {
            rtcLog.info("add ice candidate ok");

            //set srcids in websocket
            rtcLog.warn("push src tiny id in src list, tinyid = " + global.config.tinyid + " , src tinyid = " + srctinyid);
            global.websocket.sessioninfo.srcids.push(srctinyid + "");

            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_SET_REMOTE_CANDIDATE_SUC);
                global.websocket.send(JSON.stringify(sendData));
            }
            if (rtclistener.config.onIceConnectionBuild) {
                rtclistener.config.onIceConnectionBuild(true, ICE_BUILD_STATE.SUC);
            }
        }, function (e) {
            if (rtclistener.config.onIceConnectionBuild) {
                rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.CANDIDATE_FAILED);
            }
            var errorMsg = "add remote candidate failed!  exception = " + e;
            rtcLog.error(errorMsg);
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_SET_REMOTE_CANDIDATE_FAILED);
                sendData.data  = {
                    errorMsg : errorMsg,
                    openid : global.config.openid,
                    tinyid : global.config.tinyid,
                    sessionid: global.roomid
                };
                global.websocket.send(JSON.stringify(sendData));
            }
      //      alert(errorMsg);
        });
    };

    var sendLocalCandidate = function(candidate, srctinyid) {
        if (candidate) {
            var sendData = createJsonFromTag(global.RTC_EVENT.ON_PEER_CANDIDATE);
            sendData.data = candidate;
            sendData.srctinyid = srctinyid || "0";
            global.websocket.send(JSON.stringify(sendData));
        }
    };

    var onRemoteSdp = function(remoteSdp, srctinyid) {
        rtcLog.info("srctinyid:" + srctinyid + "on anwser sdp : " + remoteSdp.sdp);
        srctinyid = global.config.tinyid === srctinyid ? 0 :srctinyid;
        var peerConnection = global.peerConnections[srctinyid];

        if (!peerConnection) {
            var errorMsg = "on remote sdp , failed to get peerconnection. srctinyid = " + srctinyid;
            rtcLog.error(errorMsg);
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_GET_SRC_PEER_CONNECTION_FAILED);
                sendData.data = errorMsg;
                global.websocket.send(JSON.stringify(sendData));
            }
            if (rtclistener.config.onIceConnectionBuild) {
                rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.SDP_FAILED);
            }
     //       alert(errorMsg);
            return;
        }

        if(srctinyid != 0)
        {
            remoteSdp.type = "pranswer";
        }

        peerConnection.setRemoteDescription(new RTCSessionDescription(remoteSdp), function() {
            if (peerConnection.localCandidateList.length > 0 && !peerConnection.hasSendCandidate) {
                peerConnection.hasSendCandidate = true;
                sendLocalCandidate(peerConnection.localCandidateList[peerConnection.localCandidateList.length - 1], srctinyid);
            }
            if (srctinyid != 0) {
                global.websocket.sessioninfo.peersdp[srctinyid + ""] = remoteSdp.sdp;
            }

            peerConnection.isSdpSendOK = true;
            if (global.websocket) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_SET_REMOTE_SDP_SUC);
                global.websocket.send(JSON.stringify(sendData));
            }
        }, function(e) {
            if (rtclistener.config.onIceConnectionBuild) {
                rtclistener.config.onIceConnectionBuild(false, ICE_BUILD_STATE.SDP_FAILED);
            }
            try {
                var errorMsg = "on set remote sdp failed , exception = " + e.message;
                if (global.websocket) {
                    var sendData = createJsonFromTag(global.RTC_EVENT.ON_SET_REMOTE_SDP_FAILED);
                    sendData.data = {
                        errorMsg : errorMsg,
                        tinyid : global.config.tinyid,
                        openid: global.config.openid,
                        sessionid: global.roomid
                    };
                    global.websocket.send(JSON.stringify(sendData));
                }
                rtcLog.error(errorMsg);
             //   alert(errorMsg);
            } catch (e2) {
                console.log(e2);
            }

        });
    };

    var onMediaChange = function(info) {

    };
    var onQuitChat = function(info) {
        rtcLog.debug("onQuitChat , call onRelayTimeout");
        webrtc.quit();
        if (info.type === 'kick') {
            rtclistener.config.onKickout(info);
        } else {
            rtclistener.config.onRelayTimeout(info);
        }
    };

    var openRoom = function(openid, tinyid, roomid, role, userSig, peerconnectionport) {
        rtcLog.debug("open room : openid = " + openid + " , tinyid = " + tinyid + " ,  roomid = " + roomid);
        var sendData = createJsonFromTag(global.RTC_EVENT.ON_CREATE_ROOM);
        sendData.data = {
            openid: openid,
            tinyid: tinyid,
            peerconnectionport: peerconnectionport,
            roomid: String(roomid),
            sdkAppID: String(global.config.sdkAppId),
            socketid: global.websocket.socketid,
            userSig: userSig || global.config.userSig,
            relayip: global.websocket.relayInfo.innerip,
            dataport: global.dataport,
            stunport: global.stunport,
            checkSigSeq : global.checkSigSeq,
            role : role
        };
        //能力上报
        var reportData = WebRTCStat.ability(global.constraints);
        global.ostype = reportData.AbilityOption.GeneralLimit.str_os_verion;
        global.cpunum = parseInt(reportData.AbilityOption.GeneralLimit.CPULimit.uint32_CPU_num);
        global.cpuname = reportData.AbilityOption.GeneralLimit.CPULimit.str_CPU_name;
        sendData.report = reportData || null;
        global.websocket.send(JSON.stringify(sendData));
        return true;
    };
    var addPeer = function(openid, tinyid, roomid, srctinyid, userSig, peerconnectionport) {

        var data = {
            openid: openid,
            tinyid: tinyid,
            srctinyid: srctinyid,
            peerconnectionport: peerconnectionport,
            roomid: roomid,
            sdkAppID: String(global.config.sdkAppId),
            socketid: global.websocket.socketid,
            userSig: userSig || global.config.userSig,
            relayip: global.websocket.relayInfo.innerip,
            dataport: global.dataport,
            stunport: global.stunport
        };
        rtcLog.debug("add peer : openid = " + JSON.stringify(data));
        var sendData = createJsonFromTag(global.RTC_EVENT.ON_CREATE_PEER);
        sendData.data = data;
        global.websocket.send(JSON.stringify(sendData));
        return true;
    };

    function parseFinalReport(finalReportData, isSafari) {
        isSafari = isSafari || false;
        finalReportData.WebRTCQualityReq.uint64_end_utime = new Date().getTime();
        if (!global.preReportData) {
            global.preReportData = cloneObj(finalReportData);

            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br * 8 / 2;
            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br = finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br * 8 / 2;

            if (isSafari) {
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br = finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br * 8 / 2;
            }

            var videoDecLen = finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState.length;
            for (var i = 0; i < videoDecLen; i++) {
                finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState[i].uint32_video_recv_br = finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState[i].uint32_video_recv_br * 8 / 2;
            }

            finalReportData.WebRTCQualityReq.uint32_total_send_bps = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br + finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br;
            return finalReportData;
        } else {
            var tmp = cloneObj(finalReportData);
            finalReportData.WebRTCQualityReq.uint64_begine_utime = global.preReportData.WebRTCQualityReq.uint64_end_utime;

            finalReportData.WebRTCQualityReq.uint32_real_num -= global.preReportData.WebRTCQualityReq.uint32_real_num;
            if (finalReportData.WebRTCQualityReq.uint32_real_num <= 0) {
                finalReportData.WebRTCQualityReq.uint32_real_num = 0;
            }

            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg -= global.preReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg;
            if (finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg <= 0) {
                finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg = 0;
            }

            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br -= global.preReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br;
            if (finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br <= 0) {
                finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br = 0;
            }
            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br * 8 / 2;

            if (isSafari) {
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br -= global.preReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br;
                if (finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br <= 0) {
                    finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br = 0;
                }
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br = finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br * 8 / 2;
            }

            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow -= global.preReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow;
            if (finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow <= 0) {
                finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow = 0;
            }

            finalReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg -= global.preReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg;
            if (finalReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg <= 0) {
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg = 0;
            }

            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br -= global.preReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br;
            if (finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br <= 0) {
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br = 0;
            }
            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br = finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br * 8 / 2;

            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg -= global.preReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg;
            if (finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg <= 0) {
                finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg = 0;
            }

            //统计各路
            var len = finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState.length;
            for (var i = 0; i < len; i++) {
                var decVideoItem = finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState[i];
                var tinyid = decVideoItem.uint64_sender_uin;
                var recvPackage = decVideoItem.uint32_video_real_recv_pkg;
                var recvBr = decVideoItem.uint32_video_recv_br;

                for (var k = 0; k < global.preReportData.WebRTCQualityReq.VideoReportState.VideoDecState.length; k++) {
                    var tempItem = global.preReportData.WebRTCQualityReq.VideoReportState.VideoDecState[k];

                    if (tempItem.uint64_sender_uin === tinyid) {
                        //console.error("1 = " + recvPackage + " 2 = " + recvBr + " 3 = " + tempItem.uint32_video_real_recv_pkg + " 4 = " + tempItem.uint32_video_recv_br);
                        recvPackage -= tempItem.uint32_video_real_recv_pkg;
                        if (recvPackage <= 0) {
                            recvPackage = 0;
                        }

                        recvBr -= tempItem.uint32_video_recv_br;
                        if (recvBr <= 0) {
                            recvBr = 0;
                        }
                        break;
                    }
                }
                finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState[i].uint32_video_real_recv_pkg = recvPackage;
                finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState[i].uint32_video_recv_br = recvBr * 8 / 2;
            }

            len = finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState.length;
            for (var i = 0; i < len; i++) {
                var decAudioItem = finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState[i];
                var audioRecvPack = decAudioItem.uint32_audio_real_recv_pkg;
                var audioRecvFlow = decAudioItem.uint32_audio_flow;
                var tinyid = decAudioItem.uint64_sender_uin;
                for (var h = 0; h < global.preReportData.WebRTCQualityReq.AudioReportState.AudioDecState.length; h++) {
                    var tempAudioItem = global.preReportData.WebRTCQualityReq.AudioReportState.AudioDecState[h];
                    if (tempAudioItem.uint64_sender_uin === tinyid) {
                        audioRecvPack -= tempAudioItem.uint32_audio_real_recv_pkg;
                        if (audioRecvPack <= 0) {
                            audioRecvPack = 0;
                        }

                        audioRecvFlow -= tempAudioItem.uint32_audio_flow;
                        if (audioRecvFlow <= 0) {
                            audioRecvFlow = 0;
                        }
                        break;
                    }
                }
                finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState[i].uint32_audio_real_recv_pkg = audioRecvPack;
                finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState[i].uint32_audio_flow = audioRecvFlow;
                finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState[i].uint32_audio_real_recv_br = audioRecvFlow * 8 / 2;
            }

            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_br = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow * 8 / 2;
            finalReportData.WebRTCQualityReq.uint32_real_num = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg + finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg;
            finalReportData.WebRTCQualityReq.uint32_total_send_bps = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br + finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br;
            finalReportData.WebRTCQualityReq.uint32_total_recv_bps = finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_br + finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br;
            global.preReportData = tmp;
            return finalReportData;
        }
    }

    function handleTotalReportData(statsMap) {
        var cpuMaxFrequency = 0;
        if (navigator && navigator.cpuMaxFrequency) {
            cpuMaxFrequency = navigator.cpuMaxFrequency;
        }
        var micStatus = 0;
        if (WebRTCAPI.GLOBAL.LocalStream) {
            var audioTracks = WebRTCAPI.GLOBAL.LocalStream.getAudioTracks();
            if (audioTracks && audioTracks[0] && audioTracks[0].muted) {
                micStatus = 3;
            } else {
                micStatus = 1;
            }
        }
        var finalReportData = {
            WebRTCQualityReq: {
                uint64_begine_utime: new Date().getTime(),
                uint64_end_utime: 0,
                uint32_real_num: 0, //音频总下行包
                uint32_delay: 0,   // Conn-audio-1-0 googRtt
                uint32_CPU_curfreq: cpuMaxFrequency,
                uint32_total_send_bps: 0, //总上行码率
                uint32_total_recv_bps : 0,
                AudioReportState: {
                    uint32_audio_enc_pkg_br: 0,  //音频上行码率
                    uint32_audio_real_recv_pkg: 0, //音频下行收包
                    uint32_audio_flow: 0, //音频下行流量
                    uint32_audio_real_recv_br : 0, //音频下行码率
                    uint32_audio_delay: 0, //googCurrentDelayMs
                    uint32_audio_jitter: 0, //googJitterBufferMs
                    uint32_microphone_status: micStatus,
                    AudioDecState: []
                },
                VideoReportState: {
                    uint32_video_delay: 0, //googTargetDelayMs
                    uint32_video_snd_br: 0, //视频上行码率
                    uint32_video_total_real_recv_pkg: 0, //视频下行收包
                    uint32_video_rcv_br: 0, //视频下行码率
                    uint32_send_total_pkg: 0, //视频上行发包
                    VideoEncState: [{
                        uint32_enc_width: 0,
                        uint32_enc_height: 0,
                        uint32_capture_fps: 0,
                        uint32_enc_fps: 0
                    }],
                    VideoDecState: []
                }
            }
        };
        for (var mapKey in statsMap) {
            var itemList = statsMap[mapKey];
            if (mapKey === 0 || mapKey === "0") {
                //统计上行
                itemList.forEach(function (value) {
                    var id = value["id"];
                    var mediaType = value["mediaType"];
                    if (id.indexOf("ssrc") !== -1 && id.indexOf("send") !== -1) {
                        if (mediaType === "video") {
                            //视频上行
                            finalReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg = parseInt(value["packetsSent"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.VideoEncState[0].uint32_capture_fps = parseInt(value["googFrameRateInput"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.VideoEncState[0].uint32_enc_fps = parseInt(value["googFrameRateSent"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.VideoEncState[0].uint32_enc_width = parseInt(value["googFrameWidthSent"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.VideoEncState[0].uint32_enc_height = parseInt(value["googFrameHeightSent"] || 0);
                        } else {
                            //音频上行
                            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br = parseInt(value["bytesSent"] || 0);
                        }
                    }

                    if (id.indexOf("bweforvideo") !== -1) {
                        var transmitBitrate = value["googTransmitBitrate"];
                        finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br = parseInt(transmitBitrate || 0);
                    }

                    if (id.indexOf("Conn-audio-1-0") !== -1) {
                        finalReportData.WebRTCQualityReq.uint32_delay = parseInt(value["googRtt"] || 0);
                    }
                });
            } else {
                //统计下行
                itemList.forEach(function (value) {
                    var id = value["id"];
                    var mediaType = value["mediaType"];
                    if (id.indexOf("ssrc") !== -1 && id.indexOf("recv") !== -1) {
                        if (mediaType === "video") {
                            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_delay = parseInt(value["googTargetDelayMs"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg += parseInt(value["packetsReceived"] || 0);
                            finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br += parseInt(value["bytesReceived"] || 0);
                            var videoDec = {
                                uint32_video_recv_fps: 0,
                                uint32_video_recv_br: 0, //单路视频下行码率
                                uint32_video_real_recv_pkg: 0, //单路下行收包
                                uint32_dec_height: 0,
                                uint32_dec_width: 0,
                                uint32_video_jitter: 0,
                                uint64_sender_uin: "" //tinyid
                            };
                            videoDec.uint32_dec_height = parseInt(value["googFrameHeightReceived"] || 0);
                            videoDec.uint32_dec_width = parseInt(value["googFrameWidthReceived"] || 0);
                            videoDec.uint32_video_real_recv_pkg = parseInt(value["packetsReceived"] || 0);
                            videoDec.uint32_video_recv_fps = parseInt(value["googFrameRateReceived"] || 0);
                            videoDec.uint32_video_recv_br = parseInt(value["bytesReceived"] || 0);
                            videoDec.uint32_video_jitter = parseInt(value["googJitterBufferMs"] || 0);


                            videoDec.uint64_sender_uin = mapKey;

                            finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState.push(videoDec);

                        } else {
                            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_delay = parseInt(value["googCurrentDelayMs"] || 0);
                            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_jitter = parseInt(value["googJitterBufferMs"] || 0);
                            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg += parseInt(value["packetsReceived"] || 0);
                            finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow += parseInt(value["bytesReceived"] || 0);
                            finalReportData.WebRTCQualityReq.uint32_real_num += parseInt(value["packetsReceived"] || 0);

                            var audioItem = {
                                uint32_audio_delay : 0,
                                uint32_audio_jitter : 0,
                                uint32_audio_real_recv_pkg : 0,
                                uint32_audio_flow : 0,
                                uint32_audio_real_recv_br : 0,
                                uint64_sender_uin : ""
                            };

                            audioItem.uint32_audio_flow = parseInt(value["bytesReceived"] || 0);
                            audioItem.uint32_audio_delay =  parseInt(value["googCurrentDelayMs"] || 0);
                            audioItem.uint32_audio_real_recv_pkg = parseInt(value["packetsReceived"] || 0);
                            audioItem.uint32_audio_jitter = parseInt(value["googJitterBufferMs"] || 0);
                            audioItem.uint64_sender_uin = mapKey;

                            finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState.push(audioItem);

                        }
                    }
                });
            }
        }

        //统计结束
        return parseFinalReport(finalReportData);
    }

    function getQulityAsync(pcMap, callback) {
        var size = Object.keys(pcMap).length;
        var doneSize = 0;

        if (size === 0) {
            rtcLog.warn("get quality async failed! peerconnection size is 0!");
            /*加入能力上报*/
            if (rtclistener.config.onQualityReport) {
                rtclistener.config.onQualityReport(size);
            }
            callback(false, null);
            return;
        }

        var statsMap = {};
        for (var key in pcMap) {
            (function (index) {
                var testPC = pcMap[index];

                testPC.getStats(function (stats) {
                    var results = stats.result();
                    var items = [];

                    for (var i = 0; i < results.length; i++) {

                        var res = results[i];

                        var item = {};
                        res.names().forEach(function (name) {
                            item[name] = res.stat(name);
                        });
                        item.id = res.id;
                        item.type = res.type;
                        item.timestamp = res.timestamp;
                        items.push(item);

                    }
                    statsMap[index] = items;
                    doneSize ++;
                    if (doneSize >= size) {
                        var result = handleTotalReportData(statsMap);
                        callback(true, result);
                    }
                }, function (error) {
                    rtcLog.error("get state failed! index = " + index);
                    doneSize ++;
                    if (doneSize >= size) {
                        var result = handleTotalReportData(statsMap);
                        callback(true, result);
                    }
                });

            })(key);
        }
    }

    function getQualityReportFronSafariAsync(peerconnections, callback) {
        var size = Object.keys(peerconnections).length;
        var doneSize = 0;

        if (size === 0) {
            rtcLog.warn("get quality async failed! peerconnection size is 0!");
            callback(false, null);
            return;
        }

        var cpuMaxFrequency = 0;
        if (navigator && navigator.cpuMaxFrequency) {
            cpuMaxFrequency = navigator.cpuMaxFrequency;
        }
        var micStatus = 0;
        if (WebRTCAPI.GLOBAL.LocalStream) {
            var audioTracks = WebRTCAPI.GLOBAL.LocalStream.getAudioTracks();
            if (audioTracks && audioTracks[0] && audioTracks[0].muted) {
                micStatus = 3;
            } else {
                micStatus = 1;
            }
        }
        var decodeVideoItemMap = {};
        var decodeAudioItemMap = {};
        var finalReportData = {
            WebRTCQualityReq: {
                uint64_begine_utime: new Date().getTime(),
                uint64_end_utime: 0,
                uint32_real_num: 0, //音频总下行包
                uint32_delay: 0,   // Conn-audio-1-0 googRtt
                uint32_CPU_curfreq: cpuMaxFrequency,
                uint32_total_send_bps: 0, //总上行码率
                uint32_total_recv_bps : 0,
                AudioReportState: {
                    uint32_audio_enc_pkg_br: 0,  //音频上行码率
                    uint32_audio_real_recv_pkg: 0, //音频下行收包
                    uint32_audio_flow: 0, //音频下行流量
                    uint32_audio_real_recv_br : 0, //音频下行码率
                    uint32_audio_delay: 0, //googCurrentDelayMs
                    uint32_audio_jitter: 0, //googJitterBufferMs
                    uint32_microphone_status: micStatus,
                    AudioDecState: []
                },
                VideoReportState: {
                    uint32_video_delay: 0, //googTargetDelayMs
                    uint32_video_snd_br: 0, //视频上行码率
                    uint32_video_total_real_recv_pkg: 0, //视频下行收包
                    uint32_video_rcv_br: 0, //视频下行码率
                    uint32_send_total_pkg: 0, //视频上行发包
                    VideoEncState: [{
                        uint32_enc_width: 0,
                        uint32_enc_height: 0,
                        uint32_capture_fps: 0,
                        uint32_enc_fps: 0
                    }],
                    VideoDecState: []
                }
            }
        };
        for (var key in peerconnections) {
            (function (index) {
                var currentPC = peerconnections[index];
                currentPC.getStats().then(function (result) {
                    //console.log("[wadesheng] BEGIN , INDEX = " + index);
                    var videoDec = {
                        uint32_video_recv_fps: 0,
                        uint32_video_recv_br: 0, //单路视频下行码率
                        uint32_video_real_recv_pkg: 0, //单路下行收包
                        uint32_dec_height: 0,
                        uint32_dec_width: 0,
                        uint32_video_jitter: 0,
                        uint64_sender_uin: "" //tinyid
                    };

                    var audioItem = {
                        uint32_audio_delay : 0,
                        uint32_audio_jitter : 0,
                        uint32_audio_real_recv_pkg : 0,
                        uint32_audio_flow : 0,
                        uint32_audio_real_recv_br : 0,
                        uint64_sender_uin : ""
                    };

                    result.forEach(function (value) {
                        var type = value.type;
                        // console.info("[wadesheng] node type " + type, value);
                        if (type === "inbound-rtp" && index != 0) {
                            var id = value["id"];
                            var mediaType = null;
                            if (!!id) {
                                if (id.toLowerCase().indexOf("video") !== -1) {
                                    mediaType = "video";
                                } else if (id.toLowerCase().indexOf("audio") !== -1) {
                                    mediaType = "audio";
                                }
                            }

                            if (mediaType === "video" || mediaType === "audio") {
                                var bytesReceived = value["bytesReceived"] || "0";
                                var packetsReceived = value["packetsReceived"] || "0";
                                if (mediaType === "video") {
                                    finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_rcv_br += parseInt(bytesReceived);
                                    finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_total_real_recv_pkg = parseInt(packetsReceived);

                                    videoDec.uint64_sender_uin = key;
                                    videoDec.uint32_video_real_recv_pkg = parseInt(packetsReceived);
                                    videoDec.uint32_video_recv_br = parseInt(bytesReceived);
                                    videoDec.uint32_video_jitter = value["jitter"] * 1000;
                                } else {
                                    finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_br += parseInt(bytesReceived);
                                    finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_real_recv_pkg += parseInt(packetsReceived);
                                    finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_flow += parseInt(bytesReceived);

                                    audioItem.uint64_sender_uin = index;
                                    audioItem.uint32_audio_real_recv_pkg = parseInt(packetsReceived);
                                    audioItem.uint32_audio_flow = parseInt(bytesReceived);
                                    audioItem.uint32_audio_jitter = value["jitter"] * 1000;
                                }
                            }
                        } else if (type === "outbound-rtp" && index == "0") {
                            var mediaType = value["mediaType"];
                            if (mediaType === "video" || mediaType === "audio") {
                                var bytesSend = value["bytesSent"] || "0";
                                var packetsSend = value["packetsSent"] || "0";

                                if (mediaType === "video") {
                                    finalReportData.WebRTCQualityReq.VideoReportState.uint32_video_snd_br += parseInt(bytesSend);
                                    finalReportData.WebRTCQualityReq.VideoReportState.uint32_send_total_pkg = parseInt(packetsSend);
                                } else {
                                    finalReportData.WebRTCQualityReq.AudioReportState.uint32_audio_enc_pkg_br += parseInt(bytesSend);
                                }
                            }
                        } else if (type === "track") {
                            var id = value["id"];
                            if (index == "0") {

                            } else {
                                if (!!id && id.toLowerCase().indexOf("video") !== -1) {
                                    videoDec.uint32_video_recv_fps = parseInt(value["framesPerSecond"] || "0");
                                    videoDec.uint32_dec_width = parseInt(value["frameWidth"]);
                                    videoDec.uint32_dec_height = parseInt(value["frameHeight"]);
                                }
                            }
                        } else if (type === "candidate-pair") {
                            var rrt = value["currentRoundTripTime"] * 1000;
                            if (index == "0") {
                                finalReportData.WebRTCQualityReq.uint32_delay = rrt;
                            } else {

                            }
                        }
                    });

                    if (index != "0") {
                        finalReportData.WebRTCQualityReq.AudioReportState.AudioDecState.push(audioItem);
                        finalReportData.WebRTCQualityReq.VideoReportState.VideoDecState.push(videoDec);
                    }

                    doneSize ++;
                    if (doneSize >= size) {
                        finalReportData = parseFinalReport(finalReportData, true);
                        callback(true, finalReportData);
                    }
                }).catch(function (error) {
                    doneSize ++;
                    if (doneSize >= size) {
                        finalReportData = parseFinalReport(finalReportData, true);
                        callback(true, finalReportData);
                    }
                });
            })(key);
        }
    }

    var reportQuality = function() {

        if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_OPEN) {
            uploadWebLog("start report quality data", null, global.KEY_TAG.RTC_LOG_TAG);
        }

        if (!global.websocket) {
            rtcLog.error("report quality data end, websocket is null!");
            uploadWebLog("report quality data end, websocket is null!", null, global.KEY_TAG.RTC_LOG_TAG);
            return;
        }


        if ((new Date()).valueOf() - global.reportTime > 5000) {
            var errMsg = "report quality time out, pre report time " + global.reportTime + " this report time " + (new Date()).valueOf();
            rtcLog.error(errMsg);
            uploadWebLog(errMsg, null, global.KEY_TAG.REPORT_TIME_OUT_TAG);
        }

        if (!isSafari()) {
            getQulityAsync(global.peerConnections, function (result, data) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_QUALITY_REPORT);
                if (!result) {
                    sendData.data = handleTotalReportData({});
                } else {
                    rtcLog.debug("get qualityData : " + JSON.stringify(data));
                    sendData.data = data;

                    /*加入能力上报*/
                    if (rtclistener.config.onQualityReport) {
                        rtclistener.config.onQualityReport(data);
                    }
                }

                try {
                    if (global.websocket) {
                        global.websocket.send(JSON.stringify(sendData));
                        if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_OPEN) {
                            uploadWebLog("report quality data send!", null, global.KEY_TAG.RTC_LOG_TAG);
                        }
                        global.reportTime = (new Date()).valueOf();
                    }
                } catch (e) {
                    rtcLog.error("websocket send data error : " + e.message);
                    uploadWebLog("[QUALITY REPORT]websocket send data error : " + e.message, null, global.KEY_TAG.RTC_LOG_TAG);
                }
            });
        } else {
            getQualityReportFronSafariAsync(global.peerConnections, function (result, data) {
                var sendData = createJsonFromTag(global.RTC_EVENT.ON_QUALITY_REPORT);

                if (!result) {
                    rtcLog.error("[GetQualityReportFronSafariAsync] failed! ");
                    sendData.data = handleTotalReportData({});
                } else {
                    rtcLog.debug("get qualityData : " + JSON.stringify(data));
                    sendData.data = data;

                    /*加入能力上报*/
                    if (rtclistener.config.onQualityReport) {
                        rtclistener.config.onQualityReport(data);
                    }
                }

                //sendData.data = data;
                try {
                    if (global.websocket) {
                        global.websocket.send(JSON.stringify(sendData));
                        uploadWebLog("report quality data send!", null, global.KEY_TAG.RTC_LOG_TAG);
                        global.reportTime = (new Date()).valueOf();
                    }
                } catch (e) {
                    rtcLog.error("websocket send data error : " + e.message);
                    uploadWebLog("websocket send data error : " + e.message, null, global.KEY_TAG.RTC_LOG_TAG);
                }

            });
        }

    };

    function cloneObj(obj) {

        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj),
                newobj = JSON.parse(str);
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }

    function isSafari() {
        return WebRTCStat.getExplore().toLowerCase().indexOf("safari") !== -1;
    }

    var createJsonFromTag = function(tag) {
        return {
            tag_key : tag,
            data : "",
            openid : global.config.openid,
            tinyid : global.config.tinyid,
            version : global.VERSION,
            ua : navigator.userAgent,
            sessionid : global.roomid
        };
    };

    var sendSdp = function(sdp, srctinyid) {
        var sendData = createJsonFromTag(global.RTC_EVENT.ON_PEER_SDP);
        sendData.data = sdp;
        sendData.srctinyid = srctinyid;
        global.websocket.send(JSON.stringify(sendData));
    };

    var sendUpdateSdp = function(sdp, srctinyid) {
        var sendData = createJsonFromTag(global.RTC_EVENT.ON_UPDATE_PEER_SDP);
        sendData.data = sdp;
        sendData.srctinyid = srctinyid;
        global.websocket.send(JSON.stringify(sendData));
    };

    var changeLocalMedia = function(isVideo, isOpen) {
        rtcLog.debug("change local media : is video : " + isVideo + " , is open = " + isOpen);
        if (!global.localStream) {
            rtcLog.error("change local media failed! local media is null");
            return false;
        }
        var tracks = null;
        var mediaType = 0;
        if (isVideo) {
            tracks = global.localStream.getVideoTracks();
            if (isOpen) {
                mediaType = global.MEDIA_CHANGE.OPEN_VIDEO;
            } else {
                mediaType = global.MEDIA_CHANGE.CLOSE_VIDEO;
            }
        } else {
            tracks = global.localStream.getAudioTracks();
            if (isOpen) {
                mediaType = global.MEDIA_CHANGE.OPEN_AUDIO;
            } else {
                mediaType = global.MEDIA_CHANGE.CLOSE_AUDIO;
            }
        }
        for (var i = 0; i < tracks.length; i++) {
            tracks[i].enabled = isOpen;
        }
        if (global.websocket) {
            var sendData = createJsonFromTag(global.RTC_EVENT.ON_MEDIA_CHANGE);
            sendData.data = {
                mediatype: mediaType
            };
            global.websocket.send(JSON.stringify(sendData));
        }
        return true;
    };

    webrtc.uploadWebLog = function (msg, obj, tag) {
        uploadWebLog(msg, obj, tag);
    };

    webrtc.init = function(config, callback) {
        global.config.userSig = config.userSig;
        global.config.openid = config.openid;
        global.config.sdkAppId = config.sdkAppId;
        global.config.accountType = config.accountType;
        global.config.srctinyid = config.srctinyid;
        global.config.closeLocalMedia = config.closeLocalMedia;

        try {
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                devices.forEach(function (dev) {
                    if (dev.kind === "videoinput") {
                        global.deviceInfo.hasVideo = true;
                    }
                    if (dev.kind === "audioinput") {
                        global.deviceInfo.hasAudio = true;
                    }
                });
                initWebSocket(function(ret) {
                    callback(ret);
                });
            }).catch(function (e) {
                uploadWebLog("WEBRTC--enumeadevice failed!!! failed = " + e.message, null, "ENUM_DEVICE");
                global.deviceInf.hasVideo = true;
                global.deviceInf.hasAudio = true;
                initWebSocket(function(ret) {
                    callback(ret);
                });
            });
        } catch (e) {
            uploadWebLog("WEBRTC--enumeadevice failed!!! failed = " + e.message, null, "ENUM_DEVICE");
            global.deviceInf.hasVideo = true;
            global.deviceInf.hasAudio = true;
            initWebSocket(function(ret) {
                callback(ret);
            });
        }
        return 0;
    };

    var startWebRTCCalllback = function(result) {


        if (result !== 0) {
            var errorStr = "";
            if (result === -10007) {
                errorStr = "PeerConnection 创建失败";
            } else if (result === -10008) {
                errorStr = "getUserMedia 失败";
            } else if (result === -10009) {
                errorStr = "getLocalSdp 失败";
            } else {
                errorStr = "start WebRTC failed!!!";
            }

            webrtc.quit();
            console.error(errorStr);
        }
    };

    webrtc.createRoom = function(opts, callback) {
        rtclistener.config.onCreateRoomResult = callback;
        if (!global.config.openid) return;
        var roomid , role = "";
        if(typeof opts === 'object'){
            roomid = opts.roomid;
            role = opts.role;
        }else{
            roomid = opts;
        }
        openRoom(global.config.openid, global.config.tinyid, roomid, role, global.config.userSig);
    };

    webrtc.setlistener = function(listener) {
        return setlistener(listener);
    };
    webrtc.quit = function() {
        //clearTimeout(global.reportSto);
        if (global.reportSto) {
            clearInterval(global.reportSto);
        }
        global.reportSto = null;
        global.preReportData = null;

        endEndReport(0);

        if (global.localStream) {
            global.localStream.getTracks().forEach(function(track) {
                track.stop();
            });
            global.localStream = null;
        }
        if (global.peerConnections) {
            for (var key in global.peerConnections) {
                var item = global.peerConnections[key];
                if (item) {
                    if (item.signalingState !== 'closed') {
                        item.close();
                    }
                    item = null;
                }
            }
        }

        if (global.websocket) {
            global.websocket.close();
            global.websocket = null;
        }
        clearGlobalValues();
    };
    webrtc.closeAudio = function() {
        return changeLocalMedia(false, false);
    };
    webrtc.closeVideo = function() {
        return changeLocalMedia(true, false);
    };
    webrtc.openAudio = function() {
        return changeLocalMedia(false, true);
    };
    webrtc.openVideo = function() {
        return changeLocalMedia(true, true);
    };
    webrtc.setMicVolume = function(val) {
        if (global.gainNode)
            global.gainNode.gain.value = val;
    };
    webrtc.setConstraints = function(opt){
        // console.error('用户指定constraints');
        if((opt.width && opt.height) || opt.frameRate){
            rtcLog.info('用户指定constraints',opt);
            var videoCtrlAbility = {
                VidWidth :opt.width,
                VidHeight : opt.height,
                VidFr :  opt.frameRate || 20,
                CpuOverUseDetect : false
            };
            global.specifyConstraints = videoCtrlAbility;
            return true;
        }else{
            global.specifyConstraints = null;
        }
        return false;
    };
    webrtc.changeSpearRole = function(role){

        var sendMsg = createJsonFromTag(global.RTC_EVENT.ON_SPEAR_ROLE_CHANGE);
        sendMsg.data = {role: role};
        console.log(sendMsg)
        global.websocket.send(JSON.stringify(sendMsg));
    };
    webrtc.getOpenId = function(tinyid){
        // console.log("openid:" + global.openIdMap[tinyid])
        return global.openIdMap[tinyid] || null;
    };
    webrtc.getMaxTimeMs = function(callback){
        rtcLog.debug("request maximun timestamp");
        var sendMsg = createJsonFromTag(global.RTC_EVENT.ON_GET_MAX_TIMEMS);
        sendMsg.data = {};
        global.websocket.send(JSON.stringify(sendMsg));
        onGetMaxTimeMs = callback
    };

    webrtc.startWebRTC = function(callback, srctinyid) {
        rtcLog.info("start webrtc : src tinyid = " + srctinyid);
        if (global.websocket) {
            var sendTag = createJsonFromTag(global.RTC_EVENT.ON_START_WEBRTC);
            global.websocket.send(JSON.stringify(sendTag));
        }
        if (!callback) {
            var errorMsg = "start webrtc failed! did not set callback";
            rtcLog.error(errorMsg);
          //  alert(errorMsg);
            if (global.websocket) {
                var msg = createJsonFromTag(global.RTC_EVENT.ON_START_WEBRTC_FAILED_WITHOUT_CALLBACK);
                global.websocket.send(JSON.stringify(msg));
            }
            return false;
        }
        if (!createPeerConnection(srctinyid || 0)) {
            rtcLog.error("create peer connection failed!");
            callback(-10007);
            return;
        }
        if (parseInt(srctinyid || 0) === 0) {
            getLocalStream(function (result, data) {
                if (result !== 0) {
                    var errorMsg = "get local stream failed! exception : " + data;
                    rtcLog.error(errorMsg);
                    uploadWebLog(errorMsg, null, global.KEY_TAG.RTC_LOG_TAG);

                    if (global.websocket) {
                        var sendMsg = createJsonFromTag(global.RTC_EVENT.ON_GET_USER_MEDIA_FAILED);
                        sendMsg.data = errorMsg;
                        global.websocket.send(JSON.stringify(sendMsg));
                    }
                    callback(result);
                    return;
                }
                rtclistener.config.onLocalStreamAdd(data);
                getSdp(srctinyid, function(result, info) {
                    if (result !== 0) {
                        var errorMsg = "get local sdp failed!!! e = " + info;
                        rtcLog.error(errorMsg);
                        uploadWebLog(errorMsg, null, global.KEY_TAG.RTC_LOG_TAG);
                        callback(result);
                        return;
                    }
                    sendSdp(info, srctinyid);
                    callback(0);
                });
            });
            //通过枚举设备，来判断是否需要打开摄像头和麦克风

        } else {
            getSdp(srctinyid, function(result, info) {
                if (result !== 0) {
                    rtcLog.error("get local sdp failed!!! e = " + info);
                    callback(result);
                    return;
                }
                sendSdp(info, srctinyid);
                callback(0);
            });
        }
    };
    webrtc.wsreconnect = function (sig) {
        if (CURRENT_SERVER_TYPE === SERVER_TYPE.FOR_OPEN) {
            //这个接口只给edu开放
            rtcLog.errorMsg("[WSRECONNECT]this interface can only use by edu");
            return false;
        }
        if (!sig) {
            return false;
        }
        if (!global.websocket) {
            return false;
        }
        global.websocket.reconnect(sig);
        return true;
    }

})(webrtc);

var PingUtil = function(times , callback){
    var Count = 0;
    var CountTimes = times;
    var Res = [];
    var Ping = function(opt) {
        this.opt = opt || {};
        this.favicon = this.opt.favicon || "/favicon.ico";
        this.timeout = this.opt.timeout || 0;
    };
    Ping.prototype.ping = function(source, callback) {
        this.img = new Image();
        var timer;
        var start = new Date();
        this.img.onload = pingCheck;
        this.img.onerror = pingCheck;
        if (this.timeout) { timer = setTimeout(pingCheck, this.timeout); }
        function pingCheck(e) {
            if (timer) { clearTimeout(timer); }
            var pong = new Date() - start;

            if (typeof callback === "function") {
                if (e.type === "error") {
                    console.error("error loading resource");
                    return callback("error", pong);
                }
                return callback(null, pong);
            }
        }
        this.img.src = source + this.favicon + "?" + (+new Date()); // Trigger image load with cache
    };

    function doPing() {
        if( Count < CountTimes ) {
            Count ++ ;
            var p = new Ping();
            p.ping("https://webrtc.qq.com:8687", function(err, data) {
                Res.push(data);
                doPing();
            });
        }else {
            if( Res.length == Count ){
                var ret = 0;
                for(var i = 0; i < Res.length; i++){
                    ret += Res[i];
                }
                callback( parseInt(ret / Res.length), Res );
            }else{
                setTimeout(doPing,100)
            }
        }
    }
    doPing();
};

(function(WebRTCAPI) {
    var global = new function() {
        this.config = {
            openid: "",
            userSig: "",
            sdkAppId: "",
            accountType: "",
            srctinyid: ""
        };
        this.jumpurl = null;
        this.listener = {
            onKickout: null,
            onInitResult: null,
            onWebSocketClose: null,
            onRelayTimeout: null,
            onQualityReport:null
        };
        this.roomid = 0;
    };

    var onMediaChange = function(isVideo, isOpen) {

    };

    var onRemoteLeave = function() {

    };


    var createVideoElement = function(id, opt) {
        var video = document.createElement('video');
        video.setAttribute("playsinline","true");
        video.className = "video-item ";
        video.autoplay = true;
        video.muted = true;
        for (var a in opt) {
            video[a] = opt[a];
        }
        // document.querySelector("#" + id).appendChild(video);
        return video;
    };


    var createAudioElement = function(id, opt) {
        var audio = document.createElement('audio');
        audio.setAttribute("playsinline","true");
        audio.className = "audio-item";
        audio.autoplay = true;
        for (var a in opt) {
            audio[a] = opt[a];
        }
        // document.querySelector("#" + id).appendChild(audio);
        return audio;
    };



    var onLocalStreamAdd = function(stream) {
        console.info("local stream add!!!");
        global.listener.onLocalStreamAdd(stream);
    };


    var onPeerStreamAdd = function(stream, videoId) {
        console.info("remote stream add!!!, videoId = " + videoId);
        global.listener.onRemoteStreamAdd(stream, videoId);
    };

    var onUpdateRemoteStream = function(stream, videoId,type,SsrcState) {
        console.info("onUpdateRemoteStream!!!, videoId = " + videoId);
        global.listener.onUpdateRemoteStream(stream, videoId, type, SsrcState);
    };

    var onPeerStreamRemove = function(videoId) {
        console.info("onPeerStreamRemove!!! videoId = " + videoId);
        global.listener.onRemoteStreamRemove(videoId);
    };

    var onWSClose = function() {
        console.log("on websocket close!");
        webrtc.quit();
        if( global.listener.onWebSocketClose ) {
            global.listener.onWebSocketClose();
        }
    };

    var onRelayTimeout = function(info) {
        if( global.listener.onRelayTimeout ) {
            global.listener.onRelayTimeout(info);
        }
    };

    var onKickout = function(info) {
        if(global.listener.onKickout){
            global.listener.onKickout(info);
        }
    };

    var onIceConnectionClose = function() {
        if(global.listener.onIceConnectionClose){
            global.listener.onIceConnectionClose();
        }
    };
    var onChangeRemoteStreamState = function (data) {
        if(global.listener.onChangeRemoteStreamState){
            global.listener.onChangeRemoteStreamState(data);
        }
    };

    var onQualityReport = function (data) {
        if (global.listener.onQualityReport) {
            global.listener.onQualityReport(data);
        }
    };

    var onIceConnectionBuild = function (result, code) {
        if (global.listener.onIceConnectionBuild) {
            global.listener.onIceConnectionBuild(result, code);
        }
    };

    var onKeylogWrite = function (tag, msg, obj) {
        if (global.listener.onKeylogWrite) {
            global.listener.onKeylogWrite(tag, msg, obj);
        }
    };

    var onWebSocketReconnection = function () {
        if (global.listener.onWebSocketReconnection) {
            global.listener.onWebSocketReconnection();
        }
    };

    var onUserDefinedWebRTCEventNotice = function (event, obj) {
        if (global.listener.onUserDefinedWebRTCEventNotice) {
            global.listener.onUserDefinedWebRTCEventNotice(event, obj);
        }
    };

    var webrtcListener = {
        onMediaChange: onMediaChange,
        onRemoteLeave: onRemoteLeave,
        onLocalStreamAdd: onLocalStreamAdd,
        onPeerStreamAdd: onPeerStreamAdd,
        onPeerStreamRemove: onPeerStreamRemove,
        onUpdateRemoteStream: onUpdateRemoteStream,
        onWSClose: onWSClose,
        onKickout: onKickout,
        onRelayTimeout: onRelayTimeout,
        onIceConnectionClose: onIceConnectionClose,
        onChangeRemoteStreamState:onChangeRemoteStreamState,
        onQualityReport : onQualityReport,
        onIceConnectionBuild : onIceConnectionBuild,
        onKeylogWrite : onKeylogWrite,
        onWebSocketReconnection : onWebSocketReconnection,
        onUserDefinedWebRTCEventNotice : onUserDefinedWebRTCEventNotice
    };

    WebRTCAPI.init = function(listener, config) {
        var listener_list = [
            'onInitResult',
            'onLocalStreamAdd',
            'onRemoteStreamAdd',
            'onUpdateRemoteStream',
            'onRemoteStreamRemove',
            'onWebSocketClose',
            'onRelayTimeout',
            'onIceConnectionClose',
            'onChangeRemoteStreamState',
            'onQualityReport'
        ];
        var unlisten = [];
        if (listener) {
            listener_list.forEach(function(item) {
                if (!listener[item]) {
                    unlisten.push(item);
                }
            });
        }
        if (!listener || unlisten.length > 0) {
            var errorMsg = "WebRTC API init failed! listener is incorrect! " + unlisten.join(",");
            webrtc.uploadWebLog(errorMsg, null, "websocket_tag");
            console.error(errorMsg);
            return -10001;
        }

        global.listener.onInitResult = listener.onInitResult;
        global.listener.onLocalStreamAdd = listener.onLocalStreamAdd;
        global.listener.onRemoteStreamAdd = listener.onRemoteStreamAdd;
        global.listener.onUpdateRemoteStream = listener.onUpdateRemoteStream;
        global.listener.onRemoteStreamRemove = listener.onRemoteStreamRemove;
        global.listener.onWebSocketClose = listener.onWebSocketClose;
        global.listener.onKickout = listener.onKickout;
        global.listener.onRelayTimeout = listener.onRelayTimeout;
        global.listener.onIceConnectionClose = listener.onIceConnectionClose;
        global.listener.onChangeRemoteStreamState = listener.onChangeRemoteStreamState;
        if (listener.onIceConnectionBuild) {
            global.listener.onIceConnectionBuild = listener.onIceConnectionBuild;
        }

        if(listener.onQualityReport){
            global.listener.onQualityReport = listener.onQualityReport;
        }

        if (listener.onKeylogWrite) {
            global.listener.onKeylogWrite = listener.onKeylogWrite;
        }

        if (listener.onWebSocketReconnection) {
            global.listener.onWebSocketReconnection = listener.onWebSocketReconnection;
        }

        if (listener.onUserDefinedWebRTCEventNotice) {
            global.listener.onUserDefinedWebRTCEventNotice = listener.onUserDefinedWebRTCEventNotice;
        }

        //check config
        if (!config || !config.openid || !config.userSig || !config.sdkAppId || !config.accountType) {
            var errorMsg = "WebRTC API init failed! config is incorrect!";
            webrtc.uploadWebLog(errorMsg, null, "websocket_tag");
            console.error(errorMsg);
            global.listener.onInitResult(-10001);
            return 0;
        }

        global.config = config;

        var isWebRTCSupported = false;
        ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function(item) {
            if (isWebRTCSupported) {
                return;
            }

            if (item in window) {
                isWebRTCSupported = true;
            }
        });

        if (!isWebRTCSupported) {
            var errorMsg = "WebRTC API init failed! browser not support webrtc!";
            webrtc.uploadWebLog(errorMsg, null, "websocket_tag");
            console.error(errorMsg);
            global.listener.onInitResult(-10002);
            return 0;
        }

        webrtc.setlistener(webrtcListener);
        return webrtc.init(global.config, function(ret) {
            global.listener.onInitResult(ret.result, ret);
        });
    };

    WebRTCAPI.createRoom = function(opts, callback) {
        return webrtc.createRoom(opts, callback);
    };


    WebRTCAPI.startWebRTC = function(callback, srctinyid) {
        return webrtc.startWebRTC(callback, srctinyid);
    };

    WebRTCAPI.closeAudio = function() {
        return webrtc.closeAudio();
    };

    WebRTCAPI.closeVideo = function() {
        return webrtc.closeVideo();
    };

    WebRTCAPI.openAudio = function() {
        return webrtc.openAudio();
    };

    WebRTCAPI.openVideo = function() {
        return webrtc.openVideo();
    };
    WebRTCAPI.setMicVolume = function(val) {
        return webrtc.setMicVolume(val);
    };
    WebRTCAPI.setConstraints = function(opts) {
        return webrtc.setConstraints(opts);
    };

    WebRTCAPI.quit = function() {
        return webrtc.quit();
    };

    WebRTCAPI.changeSpearRole = function(role) {
        return webrtc.changeSpearRole(role);
    };


    WebRTCAPI.getOpenId = function(tinyid){
        return webrtc.getOpenId(tinyid);
    };


    WebRTCAPI.ping = function(times, callback){
        return new PingUtil(times, callback)
    };

    WebRTCAPI.wsreconnect = function (sig) {
        if (!sig) {
            console.error("wsreconnect --> sig is null!");
            return false;
        }

        webrtc.wsreconnect(sig);
        return true;
    };

    WebRTCAPI.getMaxTimeMs = function(callback){
        webrtc.getMaxTimeMs(callback)
    }
})(WebRTCAPI);


/***/ })
/******/ ]);
