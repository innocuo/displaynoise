/*! p5.sound.min.js v0.3.10 2019-01-10 */

/**
 *  p5.sound
 *  https://p5js.org/reference/#/libraries/p5.sound
 *
 *  From the Processing Foundation and contributors
 *  https://github.com/processing/p5.js-sound/graphs/contributors
 *
 *  MIT License (MIT)
 *  https://github.com/processing/p5.js-sound/blob/master/LICENSE
 *
 *  Some of the many audio libraries & resources that inspire p5.sound:
 *   - TONE.js (c) Yotam Mann. Licensed under The MIT License (MIT). https://github.com/TONEnoTONE/Tone.js
 *   - buzz.js (c) Jay Salvat. Licensed under The MIT License (MIT). http://buzz.jaysalvat.com/
 *   - Boris Smus Web Audio API book, 2013. Licensed under the Apache License http://www.apache.org/licenses/LICENSE-2.0
 *   - wavesurfer.js https://github.com/katspaugh/wavesurfer.js
 *   - Web Audio Components by Jordan Santell https://github.com/web-audio-components
 *   - Wilm Thoben's Sound library for Processing https://github.com/processing/processing/tree/master/java/libraries/sound
 *
 *   Web Audio API: http://w3.org/TR/webaudio/
 */

!(function(t, e) {
  'function' == typeof define && define.amd
    ? define('p5.sound', ['p5'], function(t) {
        e(t);
      })
    : e('object' == typeof exports ? require('../p5') : t.p5);
})(this, function(t) {
  var e;
  e = (function() {
    !(function() {
      function t(t) {
        t &&
          (t.setTargetAtTime || (t.setTargetAtTime = t.setTargetValueAtTime));
      }
      window.hasOwnProperty('webkitAudioContext') &&
        !window.hasOwnProperty('AudioContext') &&
        ((window.AudioContext = window.webkitAudioContext),
        'function' != typeof AudioContext.prototype.createGain &&
          (AudioContext.prototype.createGain =
            AudioContext.prototype.createGainNode),
        'function' != typeof AudioContext.prototype.createDelay &&
          (AudioContext.prototype.createDelay =
            AudioContext.prototype.createDelayNode),
        'function' != typeof AudioContext.prototype.createScriptProcessor &&
          (AudioContext.prototype.createScriptProcessor =
            AudioContext.prototype.createJavaScriptNode),
        'function' != typeof AudioContext.prototype.createPeriodicWave &&
          (AudioContext.prototype.createPeriodicWave =
            AudioContext.prototype.createWaveTable),
        (AudioContext.prototype.internal_createGain =
          AudioContext.prototype.createGain),
        (AudioContext.prototype.createGain = function() {
          var e = this.internal_createGain();
          return t(e.gain), e;
        }),
        (AudioContext.prototype.internal_createDelay =
          AudioContext.prototype.createDelay),
        (AudioContext.prototype.createDelay = function(e) {
          var i = e
            ? this.internal_createDelay(e)
            : this.internal_createDelay();
          return t(i.delayTime), i;
        }),
        (AudioContext.prototype.internal_createBufferSource =
          AudioContext.prototype.createBufferSource),
        (AudioContext.prototype.createBufferSource = function() {
          var e = this.internal_createBufferSource();
          return (
            e.start
              ? ((e.internal_start = e.start),
                (e.start = function(t, i, n) {
                  'undefined' != typeof n
                    ? e.internal_start(t || 0, i, n)
                    : e.internal_start(t || 0, i || 0);
                }))
              : (e.start = function(t, e, i) {
                  e || i ? this.noteGrainOn(t || 0, e, i) : this.noteOn(t || 0);
                }),
            e.stop
              ? ((e.internal_stop = e.stop),
                (e.stop = function(t) {
                  e.internal_stop(t || 0);
                }))
              : (e.stop = function(t) {
                  this.noteOff(t || 0);
                }),
            t(e.playbackRate),
            e
          );
        }),
        (AudioContext.prototype.internal_createDynamicsCompressor =
          AudioContext.prototype.createDynamicsCompressor),
        (AudioContext.prototype.createDynamicsCompressor = function() {
          var e = this.internal_createDynamicsCompressor();
          return (
            t(e.threshold),
            t(e.knee),
            t(e.ratio),
            t(e.reduction),
            t(e.attack),
            t(e.release),
            e
          );
        }),
        (AudioContext.prototype.internal_createBiquadFilter =
          AudioContext.prototype.createBiquadFilter),
        (AudioContext.prototype.createBiquadFilter = function() {
          var e = this.internal_createBiquadFilter();
          return t(e.frequency), t(e.detune), t(e.Q), t(e.gain), e;
        }),
        'function' != typeof AudioContext.prototype.createOscillator &&
          ((AudioContext.prototype.internal_createOscillator =
            AudioContext.prototype.createOscillator),
          (AudioContext.prototype.createOscillator = function() {
            var e = this.internal_createOscillator();
            return (
              e.start
                ? ((e.internal_start = e.start),
                  (e.start = function(t) {
                    e.internal_start(t || 0);
                  }))
                : (e.start = function(t) {
                    this.noteOn(t || 0);
                  }),
              e.stop
                ? ((e.internal_stop = e.stop),
                  (e.stop = function(t) {
                    e.internal_stop(t || 0);
                  }))
                : (e.stop = function(t) {
                    this.noteOff(t || 0);
                  }),
              e.setPeriodicWave || (e.setPeriodicWave = e.setWaveTable),
              t(e.frequency),
              t(e.detune),
              e
            );
          }))),
        window.hasOwnProperty('webkitOfflineAudioContext') &&
          !window.hasOwnProperty('OfflineAudioContext') &&
          (window.OfflineAudioContext = window.webkitOfflineAudioContext);
    })(window),
      (navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    var e = document.createElement('audio');
    t.prototype.isSupported = function() {
      return !!e.canPlayType;
    };
    var i = function() {
        return !!e.canPlayType && e.canPlayType('audio/ogg; codecs="vorbis"');
      },
      n = function() {
        return !!e.canPlayType && e.canPlayType('audio/mpeg;');
      },
      o = function() {
        return !!e.canPlayType && e.canPlayType('audio/wav; codecs="1"');
      },
      r = function() {
        return (
          !!e.canPlayType &&
          (e.canPlayType('audio/x-m4a;') || e.canPlayType('audio/aac;'))
        );
      },
      s = function() {
        return !!e.canPlayType && e.canPlayType('audio/x-aiff;');
      };
    t.prototype.isFileSupported = function(t) {
      switch (t.toLowerCase()) {
        case 'mp3':
          return n();
        case 'wav':
          return o();
        case 'ogg':
          return i();
        case 'aac':
        case 'm4a':
        case 'mp4':
          return r();
        case 'aif':
        case 'aiff':
          return s();
        default:
          return !1;
      }
    };
  })();
  var i;
  !(function(t, e) {
    i = (function() {
      return e();
    })();
  })(this, function() {
    function t(t) {
      var e = t.createBuffer(1, 1, t.sampleRate),
        i = t.createBufferSource();
      (i.buffer = e),
        i.connect(t.destination),
        i.start(0),
        t.resume && t.resume();
    }
    function e(t) {
      return 'running' === t.state;
    }
    function i(t, i) {
      function n() {
        e(t) ? i() : (requestAnimationFrame(n), t.resume && t.resume());
      }
      e(t) ? i() : n();
    }
    function n(t, e, i) {
      if (Array.isArray(t) || (NodeList && t instanceof NodeList))
        for (var o = 0; o < t.length; o++) n(t[o], e, i);
      else if ('string' == typeof t) n(document.querySelectorAll(t), e, i);
      else if (t.jquery && 'function' == typeof t.toArray) n(t.toArray(), e, i);
      else if (Element && t instanceof Element) {
        var s = new r(t, i);
        e.push(s);
      }
    }
    function o(t, e, o) {
      var r = new Promise(function(e) {
          i(t, e);
        }),
        s = [];
      return (
        e || (e = document.body),
        n(e, s, t),
        r.then(function() {
          for (var t = 0; t < s.length; t++) s[t].dispose();
          (s = null), o && o();
        }),
        r
      );
    }
    var r = function(t, e) {
      (this._dragged = !1),
        (this._element = t),
        (this._bindedMove = this._moved.bind(this)),
        (this._bindedEnd = this._ended.bind(this, e));
    };
    return (
      (r.prototype._moved = function(t) {
        this._dragged = !0;
      }),
      (r.prototype._ended = function(e) {
        this._dragged || t(e), (this._dragged = !1);
      }),
      (r.prototype.dispose = function() {
        this._element.removeEventListener('touchstart', this._bindedEnd),
          this._element.removeEventListener('touchmove', this._bindedMove),
          this._element.removeEventListener('touchend', this._bindedEnd),
          this._element.removeEventListener('mouseup', this._bindedEnd),
          (this._bindedMove = null),
          (this._bindedEnd = null),
          (this._element = null);
      }),
      o
    );
  });
  var n;
  n = (function(e) {
    var i = new window.AudioContext();
    return (
      (t.prototype.getAudioContext = function() {
        return i;
      }),
      (t.prototype.userStartAudio = function(n, o) {
        var r = n;
        return (
          n instanceof t.Element
            ? (r = n.elt)
            : n instanceof Array &&
              n[0] instanceof t.Element &&
              (r = n.map(function(t) {
                return t.elt;
              })),
          e(i, r, o)
        );
      }),
      i
    );
  })(i);
  var o;
  o = (function() {
    var e = function() {
        var e = t.prototype.getAudioContext();
        (this.input = e.createGain()),
          (this.output = e.createGain()),
          (this.limiter = e.createDynamicsCompressor()),
          (this.limiter.threshold.value = -3),
          (this.limiter.ratio.value = 20),
          (this.limiter.knee.value = 1),
          (this.audiocontext = e),
          this.output.disconnect(),
          this.input.connect(this.limiter),
          this.limiter.connect(this.output),
          (this.meter = e.createGain()),
          (this.fftMeter = e.createGain()),
          this.output.connect(this.meter),
          this.output.connect(this.fftMeter),
          this.output.connect(this.audiocontext.destination),
          (this.soundArray = []),
          (this.parts = []),
          (this.extensions = []);
      },
      i = new e();
    return (
      (t.prototype.getMasterVolume = function() {
        return i.output.gain.value;
      }),
      (t.prototype.masterVolume = function(t, e, n) {
        if ('number' == typeof t) {
          var e = e || 0,
            n = n || 0,
            o = i.audiocontext.currentTime,
            r = i.output.gain.value;
          i.output.gain.cancelScheduledValues(o + n),
            i.output.gain.linearRampToValueAtTime(r, o + n),
            i.output.gain.linearRampToValueAtTime(t, o + n + e);
        } else {
          if (!t) return i.output.gain;
          t.connect(i.output.gain);
        }
      }),
      (t.prototype.soundOut = t.soundOut = i),
      (t.soundOut._silentNode = i.audiocontext.createGain()),
      (t.soundOut._silentNode.gain.value = 0),
      t.soundOut._silentNode.connect(i.audiocontext.destination),
      i
    );
  })();
  var r;
  r = (function() {
    function e(t) {
      var e, o;
      (e = t.getChannelData(0)),
        (o = t.numberOfChannels > 1 ? t.getChannelData(1) : e);
      var r = i(e, o),
        s = new window.ArrayBuffer(44 + 2 * r.length),
        a = new window.DataView(s);
      n(a, 0, 'RIFF'),
        a.setUint32(4, 36 + 2 * r.length, !0),
        n(a, 8, 'WAVE'),
        n(a, 12, 'fmt '),
        a.setUint32(16, 16, !0),
        a.setUint16(20, 1, !0),
        a.setUint16(22, 2, !0),
        a.setUint32(24, 44100, !0),
        a.setUint32(28, 176400, !0),
        a.setUint16(32, 4, !0),
        a.setUint16(34, 16, !0),
        n(a, 36, 'data'),
        a.setUint32(40, 2 * r.length, !0);
      for (var u = r.length, c = 44, p = 1, h = 0; u > h; h++)
        a.setInt16(c, r[h] * (32767 * p), !0), (c += 2);
      return a;
    }
    function i(t, e) {
      for (
        var i = t.length + e.length, n = new Float32Array(i), o = 0, r = 0;
        i > r;

      )
        (n[r++] = t[o]), (n[r++] = e[o]), o++;
      return n;
    }
    function n(t, e, i) {
      for (var n = i.length, o = 0; n > o; o++)
        t.setUint8(e + o, i.charCodeAt(o));
    }
    var r = o;
    (t.prototype.sampleRate = function() {
      return r.audiocontext.sampleRate;
    }),
      (t.prototype.freqToMidi = function(t) {
        var e = Math.log(t / 440) / Math.log(2),
          i = Math.round(12 * e) + 69;
        return i;
      });
    var s = (t.prototype.midiToFreq = function(t) {
        return 440 * Math.pow(2, (t - 69) / 12);
      }),
      a = function(t) {
        if ('string' != typeof t) return t;
        var e = { A: 21, B: 23, C: 24, D: 26, E: 28, F: 29, G: 31 },
          i = e[t[0].toUpperCase()],
          n = ~~t.slice(-1);
        switch (((i += 12 * (n - 1)), t[1])) {
          case '#':
            i += 1;
            break;
          case 'b':
            i -= 1;
        }
        return s(i);
      };
    return (
      (t.prototype.soundFormats = function() {
        r.extensions = [];
        for (var t = 0; t < arguments.length; t++) {
          if (
            ((arguments[t] = arguments[t].toLowerCase()),
            !(['mp3', 'wav', 'ogg', 'm4a', 'aac'].indexOf(arguments[t]) > -1))
          )
            throw arguments[t] + ' is not a valid sound format!';
          r.extensions.push(arguments[t]);
        }
      }),
      (t.prototype.disposeSound = function() {
        for (var t = 0; t < r.soundArray.length; t++) r.soundArray[t].dispose();
      }),
      t.prototype.registerMethod('remove', t.prototype.disposeSound),
      (t.prototype._checkFileFormats = function(e) {
        var i;
        if ('string' == typeof e) {
          i = e;
          var n = i.split('.').pop();
          if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].indexOf(n) > -1)
            if (t.prototype.isFileSupported(n)) i = i;
            else
              for (
                var o = i.split('.'), s = o[o.length - 1], a = 0;
                a < r.extensions.length;
                a++
              ) {
                var u = r.extensions[a],
                  c = t.prototype.isFileSupported(u);
                if (c) {
                  (s = ''), 2 === o.length && (s += o[0]);
                  for (var a = 1; a <= o.length - 2; a++) {
                    var p = o[a];
                    s += '.' + p;
                  }
                  (i = s += '.'), (i = i += u);
                  break;
                }
              }
          else
            for (var a = 0; a < r.extensions.length; a++) {
              var u = r.extensions[a],
                c = t.prototype.isFileSupported(u);
              if (c) {
                i = i + '.' + u;
                break;
              }
            }
        } else if ('object' == typeof e)
          for (var a = 0; a < e.length; a++) {
            var u = e[a].split('.').pop(),
              c = t.prototype.isFileSupported(u);
            if (c) {
              i = e[a];
              break;
            }
          }
        return i;
      }),
      (t.prototype._mathChain = function(t, e, i, n, o) {
        for (var r in t.mathOps)
          t.mathOps[r] instanceof o &&
            (t.mathOps[r].dispose(),
            (i = r),
            i < t.mathOps.length - 1 && (n = t.mathOps[r + 1]));
        return (
          t.mathOps[i - 1].disconnect(),
          t.mathOps[i - 1].connect(e),
          e.connect(n),
          (t.mathOps[i] = e),
          t
        );
      }),
      { convertToWav: e, midiToFreq: s, noteToFreq: a }
    );
  })(o);
  var s;
  s = (function() {
    var t = function(t, e, i) {
      var n,
        o,
        r = new Error();
      (r.name = t),
        (r.originalStack = r.stack + e),
        (n = r.stack + e),
        (r.failedPath = i);
      var o = n.split('\n');
      return (
        (o = o.filter(function(t) {
          return !t.match(/(p5.|native code|globalInit)/g);
        })),
        (r.stack = o.join('\n')),
        r
      );
    };
    return t;
  })();
  var a;
  a = (function() {
    var e = o,
      i = e.audiocontext;
    'undefined' != typeof i.createStereoPanner
      ? ((t.Panner = function(t, e) {
          (this.stereoPanner = this.input = i.createStereoPanner()),
            t.connect(this.stereoPanner),
            this.stereoPanner.connect(e);
        }),
        (t.Panner.prototype.pan = function(t, e) {
          var n = e || 0,
            o = i.currentTime + n;
          this.stereoPanner.pan.linearRampToValueAtTime(t, o);
        }),
        (t.Panner.prototype.inputChannels = function() {}),
        (t.Panner.prototype.connect = function(t) {
          this.stereoPanner.connect(t);
        }),
        (t.Panner.prototype.disconnect = function() {
          this.stereoPanner && this.stereoPanner.disconnect();
        }))
      : ((t.Panner = function(t, e, n) {
          (this.input = i.createGain()),
            t.connect(this.input),
            (this.left = i.createGain()),
            (this.right = i.createGain()),
            (this.left.channelInterpretation = 'discrete'),
            (this.right.channelInterpretation = 'discrete'),
            n > 1
              ? ((this.splitter = i.createChannelSplitter(2)),
                this.input.connect(this.splitter),
                this.splitter.connect(
                  this.left,
                  1
                ),
                this.splitter.connect(
                  this.right,
                  0
                ))
              : (this.input.connect(this.left), this.input.connect(this.right)),
            (this.output = i.createChannelMerger(2)),
            this.left.connect(
              this.output,
              0,
              1
            ),
            this.right.connect(
              this.output,
              0,
              0
            ),
            this.output.connect(e);
        }),
        (t.Panner.prototype.pan = function(t, e) {
          var n = e || 0,
            o = i.currentTime + n,
            r = (t + 1) / 2,
            s = Math.cos((r * Math.PI) / 2),
            a = Math.sin((r * Math.PI) / 2);
          this.left.gain.linearRampToValueAtTime(a, o),
            this.right.gain.linearRampToValueAtTime(s, o);
        }),
        (t.Panner.prototype.inputChannels = function(t) {
          1 === t
            ? (this.input.disconnect(),
              this.input.connect(this.left),
              this.input.connect(this.right))
            : 2 === t &&
              ((this.splitter = i.createChannelSplitter(2)),
              this.input.disconnect(),
              this.input.connect(this.splitter),
              this.splitter.connect(
                this.left,
                1
              ),
              this.splitter.connect(
                this.right,
                0
              ));
        }),
        (t.Panner.prototype.connect = function(t) {
          this.output.connect(t);
        }),
        (t.Panner.prototype.disconnect = function() {
          this.output && this.output.disconnect();
        }));
  })(o);
  var u;
  u = (function() {
    function e(t, e) {
      for (var i = {}, n = t.length, o = 0; n > o; o++) {
        if (t[o] > e) {
          var r = t[o],
            s = new m(r, o);
          (i[o] = s), (o += 6e3);
        }
        o++;
      }
      return i;
    }
    function i(t) {
      for (var e = [], i = Object.keys(t).sort(), n = 0; n < i.length; n++)
        for (var o = 0; 10 > o; o++) {
          var r = t[i[n]],
            s = t[i[n + o]];
          if (r && s) {
            var a = r.sampleIndex,
              u = s.sampleIndex,
              c = u - a;
            c > 0 && r.intervals.push(c);
            var p = e.some(function(t) {
              return t.interval === c ? (t.count++, t) : void 0;
            });
            p || e.push({ interval: c, count: 1 });
          }
        }
      return e;
    }
    function n(t, e) {
      var i = [];
      return (
        t.forEach(function(t) {
          try {
            var n = Math.abs(60 / (t.interval / e));
            n = u(n);
            var o = i.some(function(e) {
              return e.tempo === n ? (e.count += t.count) : void 0;
            });
            if (!o) {
              if (isNaN(n)) return;
              i.push({ tempo: Math.round(n), count: t.count });
            }
          } catch (r) {
            throw r;
          }
        }),
        i
      );
    }
    function a(t, e, i, n) {
      for (var o = [], r = Object.keys(t).sort(), s = 0; s < r.length; s++)
        for (var a = r[s], c = t[a], p = 0; p < c.intervals.length; p++) {
          var h = Math.round(Math.abs(60 / (c.intervals[p] / i)));
          (h = u(h)), Math.abs(h - e) < n && o.push(c.sampleIndex / i);
        }
      return (o = o.filter(function(t, e, i) {
        var n = i[e + 1] - t;
        return n > 0.01 ? !0 : void 0;
      }));
    }
    function u(t) {
      if (isFinite(t) && 0 !== t) {
        for (; 90 > t; ) t *= 2;
        for (; t > 180 && t > 90; ) t /= 2;
        return t;
      }
    }
    var c = s,
      p = o,
      h = p.audiocontext,
      l = r.midiToFreq,
      f = r.convertToWav;
    (t.SoundFile = function(e, i, n, o) {
      if ('undefined' != typeof e) {
        if ('string' == typeof e || 'string' == typeof e[0]) {
          var r = t.prototype._checkFileFormats(e);
          this.url = r;
        } else if (
          'object' == typeof e &&
          !(window.File && window.FileReader && window.FileList && window.Blob)
        )
          throw 'Unable to load file because the File API is not supported';
        e.file && (e = e.file), (this.file = e);
      }
      (this._onended = function() {}),
        (this._looping = !1),
        (this._playing = !1),
        (this._paused = !1),
        (this._pauseTime = 0),
        (this._cues = []),
        (this._cueIDCounter = 0),
        (this._lastPos = 0),
        (this._counterNode = null),
        (this._scopeNode = null),
        (this.bufferSourceNodes = []),
        (this.bufferSourceNode = null),
        (this.buffer = null),
        (this.playbackRate = 1),
        (this.input = p.audiocontext.createGain()),
        (this.output = p.audiocontext.createGain()),
        (this.reversed = !1),
        (this.startTime = 0),
        (this.endTime = null),
        (this.pauseTime = 0),
        (this.mode = 'sustain'),
        (this.startMillis = null),
        (this.panPosition = 0),
        (this.panner = new t.Panner(this.output, p.input, 2)),
        (this.url || this.file) && this.load(i, n),
        p.soundArray.push(this),
        'function' == typeof o
          ? (this._whileLoading = o)
          : (this._whileLoading = function() {});
    }),
      t.prototype.registerPreloadMethod('loadSound', t.prototype),
      (t.prototype.loadSound = function(e, i, n, o) {
        window.location.origin.indexOf('file://') > -1 &&
          'undefined' === window.cordova &&
          window.alert(
            'This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS'
          );
        var r = this,
          s = new t.SoundFile(
            e,
            function() {
              'function' == typeof i && i.apply(r, arguments),
                'function' == typeof r._decrementPreload &&
                  r._decrementPreload();
            },
            n,
            o
          );
        return s;
      }),
      (t.SoundFile.prototype.load = function(t, e) {
        var i = this,
          n = new Error().stack;
        if (void 0 !== this.url && '' !== this.url) {
          var o = new XMLHttpRequest();
          o.addEventListener(
            'progress',
            function(t) {
              i._updateProgress(t);
            },
            !1
          ),
            o.open('GET', this.url, !0),
            (o.responseType = 'arraybuffer'),
            (o.onload = function() {
              if (200 === o.status) {
                if (!i.panner) return;
                h.decodeAudioData(
                  o.response,
                  function(e) {
                    i.panner &&
                      ((i.buffer = e),
                      i.panner.inputChannels(e.numberOfChannels),
                      t && t(i));
                  },
                  function() {
                    if (i.panner) {
                      var t = new c('decodeAudioData', n, i.url),
                        o =
                          'AudioContext error at decodeAudioData for ' + i.url;
                      e
                        ? ((t.msg = o), e(t))
                        : console.error(
                            o +
                              '\n The error stack trace includes: \n' +
                              t.stack
                          );
                    }
                  }
                );
              } else {
                if (!i.panner) return;
                var r = new c('loadSound', n, i.url),
                  s =
                    'Unable to load ' +
                    i.url +
                    '. The request status was: ' +
                    o.status +
                    ' (' +
                    o.statusText +
                    ')';
                e
                  ? ((r.message = s), e(r))
                  : console.error(
                      s + '\n The error stack trace includes: \n' + r.stack
                    );
              }
            }),
            (o.onerror = function() {
              var t = new c('loadSound', n, i.url),
                o =
                  'There was no response from the server at ' +
                  i.url +
                  '. Check the url and internet connectivity.';
              e
                ? ((t.message = o), e(t))
                : console.error(
                    o + '\n The error stack trace includes: \n' + t.stack
                  );
            }),
            o.send();
        } else if (void 0 !== this.file) {
          var r = new FileReader();
          (r.onload = function() {
            i.panner &&
              h.decodeAudioData(r.result, function(e) {
                i.panner &&
                  ((i.buffer = e),
                  i.panner.inputChannels(e.numberOfChannels),
                  t && t(i));
              });
          }),
            (r.onerror = function(t) {
              i.panner && onerror && onerror(t);
            }),
            r.readAsArrayBuffer(this.file);
        }
      }),
      (t.SoundFile.prototype._updateProgress = function(t) {
        if (t.lengthComputable) {
          var e = (t.loaded / t.total) * 0.99;
          this._whileLoading(e, t);
        } else this._whileLoading('size unknown');
      }),
      (t.SoundFile.prototype.isLoaded = function() {
        return this.buffer ? !0 : !1;
      }),
      (t.SoundFile.prototype.play = function(t, e, i, n, o) {
        if (!this.output)
          return void console.warn('SoundFile.play() called after dispose');
        var r,
          s,
          a = this,
          u = p.audiocontext.currentTime,
          c = t || 0;
        if (
          (0 > c && (c = 0),
          (c += u),
          'undefined' != typeof e && this.rate(e),
          'undefined' != typeof i && this.setVolume(i),
          !this.buffer)
        )
          throw 'not ready to play file, buffer has yet to load. Try preload()';
        if (
          ((this._pauseTime = 0),
          'restart' === this.mode &&
            this.buffer &&
            this.bufferSourceNode &&
            (this.bufferSourceNode.stop(c), this._counterNode.stop(c)),
          'untildone' !== this.mode || !this.isPlaying())
        ) {
          if (
            ((this.bufferSourceNode = this._initSourceNode()),
            delete this._counterNode,
            (this._counterNode = this._initCounterNode()),
            n)
          ) {
            if (!(n >= 0 && n < this.buffer.duration))
              throw 'start time out of range';
            r = n;
          } else r = 0;
          o && (o = o <= this.buffer.duration - r ? o : this.buffer.duration),
            this._paused
              ? (this.bufferSourceNode.start(c, this.pauseTime, o),
                this._counterNode.start(c, this.pauseTime, o))
              : (this.bufferSourceNode.start(c, r, o),
                this._counterNode.start(c, r, o)),
            (this._playing = !0),
            (this._paused = !1),
            this.bufferSourceNodes.push(this.bufferSourceNode),
            (this.bufferSourceNode._arrayIndex =
              this.bufferSourceNodes.length - 1);
          var h = function() {
            (this._playing = !1),
              this.removeEventListener('ended', h, !1),
              a._onended(a),
              a.bufferSourceNodes.forEach(function(t, e) {
                t._playing === !1 && a.bufferSourceNodes.splice(e);
              }),
              0 === a.bufferSourceNodes.length && (a._playing = !1);
          };
          (this.bufferSourceNode.onended = h),
            (this.bufferSourceNode.loop = this._looping),
            (this._counterNode.loop = this._looping),
            this._looping === !0 &&
              ((s = o ? o : r - 1e-15),
              (this.bufferSourceNode.loopStart = r),
              (this.bufferSourceNode.loopEnd = s),
              (this._counterNode.loopStart = r),
              (this._counterNode.loopEnd = s));
        }
      }),
      (t.SoundFile.prototype.playMode = function(t) {
        var e = t.toLowerCase();
        if ('restart' === e && this.buffer && this.bufferSourceNode)
          for (var i = 0; i < this.bufferSourceNodes.length - 1; i++) {
            var n = p.audiocontext.currentTime;
            this.bufferSourceNodes[i].stop(n);
          }
        if ('restart' !== e && 'sustain' !== e && 'untildone' !== e)
          throw 'Invalid play mode. Must be either "restart" or "sustain"';
        this.mode = e;
      }),
      (t.SoundFile.prototype.pause = function(t) {
        var e = p.audiocontext.currentTime,
          i = t || 0,
          n = i + e;
        this.isPlaying() && this.buffer && this.bufferSourceNode
          ? ((this.pauseTime = this.currentTime()),
            this.bufferSourceNode.stop(n),
            this._counterNode.stop(n),
            (this._paused = !0),
            (this._playing = !1),
            (this._pauseTime = this.currentTime()))
          : (this._pauseTime = 0);
      }),
      (t.SoundFile.prototype.loop = function(t, e, i, n, o) {
        (this._looping = !0), this.play(t, e, i, n, o);
      }),
      (t.SoundFile.prototype.setLoop = function(t) {
        if (t === !0) this._looping = !0;
        else {
          if (t !== !1) throw 'Error: setLoop accepts either true or false';
          this._looping = !1;
        }
        this.bufferSourceNode &&
          ((this.bufferSourceNode.loop = this._looping),
          (this._counterNode.loop = this._looping));
      }),
      (t.SoundFile.prototype.isLooping = function() {
        return this.bufferSourceNode &&
          this._looping === !0 &&
          this.isPlaying() === !0
          ? !0
          : !1;
      }),
      (t.SoundFile.prototype.isPlaying = function() {
        return this._playing;
      }),
      (t.SoundFile.prototype.isPaused = function() {
        return this._paused;
      }),
      (t.SoundFile.prototype.stop = function(t) {
        var e = t || 0;
        if ('sustain' === this.mode || 'untildone' === this.mode)
          this.stopAll(e),
            (this._playing = !1),
            (this.pauseTime = 0),
            (this._paused = !1);
        else if (this.buffer && this.bufferSourceNode) {
          var i = p.audiocontext.currentTime,
            n = e || 0;
          (this.pauseTime = 0),
            this.bufferSourceNode.stop(i + n),
            this._counterNode.stop(i + n),
            (this._playing = !1),
            (this._paused = !1);
        }
      }),
      (t.SoundFile.prototype.stopAll = function(t) {
        var e = p.audiocontext.currentTime,
          i = t || 0;
        if (this.buffer && this.bufferSourceNode) {
          for (var n = 0; n < this.bufferSourceNodes.length; n++)
            if (void 0 !== typeof this.bufferSourceNodes[n])
              try {
                (this.bufferSourceNodes[n].onended = function() {}),
                  this.bufferSourceNodes[n].stop(e + i);
              } catch (o) {}
          this._counterNode.stop(e + i), this._onended(this);
        }
      }),
      (t.SoundFile.prototype.setVolume = function(t, e, i) {
        if ('number' == typeof t) {
          var n = e || 0,
            o = i || 0,
            r = p.audiocontext.currentTime,
            s = this.output.gain.value;
          this.output.gain.cancelScheduledValues(r + o),
            this.output.gain.linearRampToValueAtTime(s, r + o),
            this.output.gain.linearRampToValueAtTime(t, r + o + n);
        } else {
          if (!t) return this.output.gain;
          t.connect(this.output.gain);
        }
      }),
      (t.SoundFile.prototype.amp = t.SoundFile.prototype.setVolume),
      (t.SoundFile.prototype.fade = t.SoundFile.prototype.setVolume),
      (t.SoundFile.prototype.getVolume = function() {
        return this.output.gain.value;
      }),
      (t.SoundFile.prototype.pan = function(t, e) {
        (this.panPosition = t), this.panner.pan(t, e);
      }),
      (t.SoundFile.prototype.getPan = function() {
        return this.panPosition;
      }),
      (t.SoundFile.prototype.rate = function(t) {
        var e = !1;
        if ('undefined' == typeof t) return this.playbackRate;
        if (
          ((this.playbackRate = t),
          0 === t
            ? (t = 1e-13)
            : 0 > t && !this.reversed
            ? ((t = Math.abs(t)), (e = !0))
            : t > 0 && this.reversed && (e = !0),
          this.bufferSourceNode)
        ) {
          var i = p.audiocontext.currentTime;
          this.bufferSourceNode.playbackRate.cancelScheduledValues(i),
            this.bufferSourceNode.playbackRate.linearRampToValueAtTime(
              Math.abs(t),
              i
            ),
            this._counterNode.playbackRate.cancelScheduledValues(i),
            this._counterNode.playbackRate.linearRampToValueAtTime(
              Math.abs(t),
              i
            );
        }
        return e && this.reverseBuffer(), this.playbackRate;
      }),
      (t.SoundFile.prototype.setPitch = function(t) {
        var e = l(t) / l(60);
        this.rate(e);
      }),
      (t.SoundFile.prototype.getPlaybackRate = function() {
        return this.playbackRate;
      }),
      (t.SoundFile.prototype.duration = function() {
        return this.buffer ? this.buffer.duration : 0;
      }),
      (t.SoundFile.prototype.currentTime = function() {
        return this.reversed
          ? Math.abs(this._lastPos - this.buffer.length) / h.sampleRate
          : this._lastPos / h.sampleRate;
      }),
      (t.SoundFile.prototype.jump = function(t, e) {
        if (0 > t || t > this.buffer.duration) throw 'jump time out of range';
        if (e > this.buffer.duration - t) throw 'end time out of range';
        var i = t || 0,
          n = e || void 0;
        this.isPlaying() && this.stop(0),
          this.play(0, this.playbackRate, this.output.gain.value, i, n);
      }),
      (t.SoundFile.prototype.channels = function() {
        return this.buffer.numberOfChannels;
      }),
      (t.SoundFile.prototype.sampleRate = function() {
        return this.buffer.sampleRate;
      }),
      (t.SoundFile.prototype.frames = function() {
        return this.buffer.length;
      }),
      (t.SoundFile.prototype.getPeaks = function(t) {
        if (!this.buffer) throw 'Cannot load peaks yet, buffer is not loaded';
        if ((t || (t = 5 * window.width), this.buffer)) {
          for (
            var e = this.buffer,
              i = e.length / t,
              n = ~~(i / 10) || 1,
              o = e.numberOfChannels,
              r = new Float32Array(Math.round(t)),
              s = 0;
            o > s;
            s++
          )
            for (var a = e.getChannelData(s), u = 0; t > u; u++) {
              for (
                var c = ~~(u * i), p = ~~(c + i), h = 0, l = c;
                p > l;
                l += n
              ) {
                var f = a[l];
                f > h ? (h = f) : -f > h && (h = f);
              }
              (0 === s || Math.abs(h) > r[u]) && (r[u] = h);
            }
          return r;
        }
      }),
      (t.SoundFile.prototype.reverseBuffer = function() {
        if (!this.buffer) throw 'SoundFile is not done loading';
        var t = this._lastPos / h.sampleRate,
          e = this.getVolume();
        this.setVolume(0, 0.001);
        const i = this.buffer.numberOfChannels;
        for (var n = 0; i > n; n++) this.buffer.getChannelData(n).reverse();
        (this.reversed = !this.reversed),
          t && this.jump(this.duration() - t),
          this.setVolume(e, 0.001);
      }),
      (t.SoundFile.prototype.onended = function(t) {
        return (this._onended = t), this;
      }),
      (t.SoundFile.prototype.add = function() {}),
      (t.SoundFile.prototype.dispose = function() {
        var t = p.audiocontext.currentTime,
          e = p.soundArray.indexOf(this);
        if (
          (p.soundArray.splice(e, 1),
          this.stop(t),
          this.buffer && this.bufferSourceNode)
        ) {
          for (var i = 0; i < this.bufferSourceNodes.length - 1; i++)
            if (null !== this.bufferSourceNodes[i]) {
              this.bufferSourceNodes[i].disconnect();
              try {
                this.bufferSourceNodes[i].stop(t);
              } catch (n) {
                console.warning('no buffer source node to dispose');
              }
              this.bufferSourceNodes[i] = null;
            }
          if (this.isPlaying()) {
            try {
              this._counterNode.stop(t);
            } catch (n) {
              console.log(n);
            }
            this._counterNode = null;
          }
        }
        this.output && (this.output.disconnect(), (this.output = null)),
          this.panner && (this.panner.disconnect(), (this.panner = null));
      }),
      (t.SoundFile.prototype.connect = function(t) {
        t
          ? t.hasOwnProperty('input')
            ? this.panner.connect(t.input)
            : this.panner.connect(t)
          : this.panner.connect(p.input);
      }),
      (t.SoundFile.prototype.disconnect = function() {
        this.panner && this.panner.disconnect();
      }),
      (t.SoundFile.prototype.getLevel = function() {
        console.warn(
          'p5.SoundFile.getLevel has been removed from the library. Use p5.Amplitude instead'
        );
      }),
      (t.SoundFile.prototype.setPath = function(e, i) {
        var n = t.prototype._checkFileFormats(e);
        (this.url = n), this.load(i);
      }),
      (t.SoundFile.prototype.setBuffer = function(t) {
        var e = t.length,
          i = t[0].length,
          n = h.createBuffer(e, i, h.sampleRate);
        t[0] instanceof Float32Array || (t[0] = new Float32Array(t[0]));
        for (var o = 0; e > o; o++) {
          var r = n.getChannelData(o);
          r.set(t[o]);
        }
        (this.buffer = n), this.panner.inputChannels(e);
      });
    var d = function(t) {
      const e = t.length,
        i = h.createBuffer(1, t.length, h.sampleRate),
        n = i.getChannelData(0);
      for (var o = 0; e > o; o++) n[o] = o;
      return i;
    };
    (t.SoundFile.prototype._initCounterNode = function() {
      var e = this,
        i = h.currentTime,
        n = h.createBufferSource();
      return (
        e._scopeNode &&
          (e._scopeNode.disconnect(),
          delete e._scopeNode.onaudioprocess,
          delete e._scopeNode),
        (e._scopeNode = h.createScriptProcessor(256, 1, 1)),
        (n.buffer = d(e.buffer)),
        n.playbackRate.setValueAtTime(e.playbackRate, i),
        n.connect(e._scopeNode),
        e._scopeNode.connect(t.soundOut._silentNode),
        (e._scopeNode.onaudioprocess = function(t) {
          var i = t.inputBuffer.getChannelData(0);
          (e._lastPos = i[i.length - 1] || 0), e._onTimeUpdate(e._lastPos);
        }),
        n
      );
    }),
      (t.SoundFile.prototype._initSourceNode = function() {
        var t = h.createBufferSource();
        return (
          (t.buffer = this.buffer),
          (t.playbackRate.value = this.playbackRate),
          t.connect(this.output),
          t
        );
      }),
      (t.SoundFile.prototype.processPeaks = function(t, o, r, s) {
        var u = this.buffer.length,
          c = this.buffer.sampleRate,
          p = this.buffer,
          h = [],
          l = o || 0.9,
          f = l,
          d = r || 0.22,
          m = s || 200,
          y = new window.OfflineAudioContext(1, u, c),
          v = y.createBufferSource();
        v.buffer = p;
        var g = y.createBiquadFilter();
        (g.type = 'lowpass'),
          v.connect(g),
          g.connect(y.destination),
          v.start(0),
          y.startRendering(),
          (y.oncomplete = function(o) {
            if (self.panner) {
              var r = o.renderedBuffer,
                s = r.getChannelData(0);
              do (h = e(s, f)), (f -= 0.005);
              while (Object.keys(h).length < m && f >= d);
              var u = i(h),
                c = n(u, r.sampleRate),
                p = c
                  .sort(function(t, e) {
                    return e.count - t.count;
                  })
                  .splice(0, 5);
              this.tempo = p[0].tempo;
              var l = 5,
                y = a(h, p[0].tempo, r.sampleRate, l);
              t(y);
            }
          });
      });
    var m = function(t, e) {
        (this.sampleIndex = e),
          (this.amplitude = t),
          (this.tempos = []),
          (this.intervals = []);
      },
      y = function(t, e, i, n) {
        (this.callback = t), (this.time = e), (this.id = i), (this.val = n);
      };
    (t.SoundFile.prototype.addCue = function(t, e, i) {
      var n = this._cueIDCounter++,
        o = new y(e, t, n, i);
      return this._cues.push(o), n;
    }),
      (t.SoundFile.prototype.removeCue = function(t) {
        for (var e = this._cues.length, i = 0; e > i; i++) {
          var n = this._cues[i];
          if (n.id === t) {
            this._cues.splice(i, 1);
            break;
          }
        }
        0 === this._cues.length;
      }),
      (t.SoundFile.prototype.clearCues = function() {
        this._cues = [];
      }),
      (t.SoundFile.prototype._onTimeUpdate = function(t) {
        for (
          var e = t / this.buffer.sampleRate, i = this._cues.length, n = 0;
          i > n;
          n++
        ) {
          var o = this._cues[n],
            r = o.time,
            s = o.val;
          this._prevTime < r && e >= r && o.callback(s);
        }
        this._prevTime = e;
      }),
      (t.SoundFile.prototype.save = function(e) {
        const i = f(this.buffer);
        t.prototype.saveSound([i], e, 'wav');
      }),
      (t.SoundFile.prototype.getBlob = function() {
        const t = f(this.buffer);
        return new Blob([t], { type: 'audio/wav' });
      });
  })(s, o, r, r);
  var c;
  c = (function() {
    var e = o;
    (t.Amplitude = function(t) {
      (this.bufferSize = 2048),
        (this.audiocontext = e.audiocontext),
        (this.processor = this.audiocontext.createScriptProcessor(
          this.bufferSize,
          2,
          1
        )),
        (this.input = this.processor),
        (this.output = this.audiocontext.createGain()),
        (this.smoothing = t || 0),
        (this.volume = 0),
        (this.average = 0),
        (this.stereoVol = [0, 0]),
        (this.stereoAvg = [0, 0]),
        (this.stereoVolNorm = [0, 0]),
        (this.volMax = 0.001),
        (this.normalize = !1),
        (this.processor.onaudioprocess = this._audioProcess.bind(this)),
        this.processor.connect(this.output),
        (this.output.gain.value = 0),
        this.output.connect(this.audiocontext.destination),
        e.meter.connect(this.processor),
        e.soundArray.push(this);
    }),
      (t.Amplitude.prototype.setInput = function(i, n) {
        e.meter.disconnect(),
          n && (this.smoothing = n),
          null == i
            ? (console.log(
                'Amplitude input source is not ready! Connecting to master output instead'
              ),
              e.meter.connect(this.processor))
            : i instanceof t.Signal
            ? i.output.connect(this.processor)
            : i
            ? (i.connect(this.processor),
              this.processor.disconnect(),
              this.processor.connect(this.output))
            : e.meter.connect(this.processor);
      }),
      (t.Amplitude.prototype.connect = function(t) {
        t
          ? t.hasOwnProperty('input')
            ? this.output.connect(t.input)
            : this.output.connect(t)
          : this.output.connect(this.panner.connect(e.input));
      }),
      (t.Amplitude.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.Amplitude.prototype._audioProcess = function(t) {
        for (var e = 0; e < t.inputBuffer.numberOfChannels; e++) {
          for (
            var i,
              n = t.inputBuffer.getChannelData(e),
              o = n.length,
              r = 0,
              s = 0,
              a = 0;
            o > a;
            a++
          )
            (i = n[a]),
              this.normalize
                ? ((r += Math.max(Math.min(i / this.volMax, 1), -1)),
                  (s +=
                    Math.max(Math.min(i / this.volMax, 1), -1) *
                    Math.max(Math.min(i / this.volMax, 1), -1)))
                : ((r += i), (s += i * i));
          var u = r / o,
            c = Math.sqrt(s / o);
          (this.stereoVol[e] = Math.max(c, this.stereoVol[e] * this.smoothing)),
            (this.stereoAvg[e] = Math.max(
              u,
              this.stereoVol[e] * this.smoothing
            )),
            (this.volMax = Math.max(this.stereoVol[e], this.volMax));
        }
        var p = this,
          h = this.stereoVol.reduce(function(t, e, i) {
            return (
              (p.stereoVolNorm[i - 1] = Math.max(
                Math.min(p.stereoVol[i - 1] / p.volMax, 1),
                0
              )),
              (p.stereoVolNorm[i] = Math.max(
                Math.min(p.stereoVol[i] / p.volMax, 1),
                0
              )),
              t + e
            );
          });
        (this.volume = h / this.stereoVol.length),
          (this.volNorm = Math.max(Math.min(this.volume / this.volMax, 1), 0));
      }),
      (t.Amplitude.prototype.getLevel = function(t) {
        return 'undefined' != typeof t
          ? this.normalize
            ? this.stereoVolNorm[t]
            : this.stereoVol[t]
          : this.normalize
          ? this.volNorm
          : this.volume;
      }),
      (t.Amplitude.prototype.toggleNormalize = function(t) {
        'boolean' == typeof t
          ? (this.normalize = t)
          : (this.normalize = !this.normalize);
      }),
      (t.Amplitude.prototype.smooth = function(t) {
        t >= 0 && 1 > t
          ? (this.smoothing = t)
          : console.log('Error: smoothing must be between 0 and 1');
      }),
      (t.Amplitude.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.input && (this.input.disconnect(), delete this.input),
          this.output && (this.output.disconnect(), delete this.output),
          delete this.processor;
      });
  })(o);
  var p;
  p = (function() {
    var e = o;
    (t.FFT = function(t, i) {
      (this.input = this.analyser = e.audiocontext.createAnalyser()),
        Object.defineProperties(this, {
          bins: {
            get: function() {
              return this.analyser.fftSize / 2;
            },
            set: function(t) {
              this.analyser.fftSize = 2 * t;
            },
            configurable: !0,
            enumerable: !0
          },
          smoothing: {
            get: function() {
              return this.analyser.smoothingTimeConstant;
            },
            set: function(t) {
              this.analyser.smoothingTimeConstant = t;
            },
            configurable: !0,
            enumerable: !0
          }
        }),
        this.smooth(t),
        (this.bins = i || 1024),
        e.fftMeter.connect(this.analyser),
        (this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount)),
        (this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount)),
        (this.bass = [20, 140]),
        (this.lowMid = [140, 400]),
        (this.mid = [400, 2600]),
        (this.highMid = [2600, 5200]),
        (this.treble = [5200, 14e3]),
        e.soundArray.push(this);
    }),
      (t.FFT.prototype.setInput = function(t) {
        t
          ? (t.output
              ? t.output.connect(this.analyser)
              : t.connect && t.connect(this.analyser),
            e.fftMeter.disconnect())
          : e.fftMeter.connect(this.analyser);
      }),
      (t.FFT.prototype.waveform = function() {
        for (var e, i, n, o = 0; o < arguments.length; o++)
          'number' == typeof arguments[o] &&
            ((e = arguments[o]), (this.analyser.fftSize = 2 * e)),
            'string' == typeof arguments[o] && (i = arguments[o]);
        if (i && !t.prototype._isSafari())
          return (
            r(this, this.timeDomain),
            this.analyser.getFloatTimeDomainData(this.timeDomain),
            this.timeDomain
          );
        s(this, this.timeDomain),
          this.analyser.getByteTimeDomainData(this.timeDomain);
        for (var n = new Array(), a = 0; a < this.timeDomain.length; a++) {
          var u = t.prototype.map(this.timeDomain[a], 0, 255, -1, 1);
          n.push(u);
        }
        return n;
      }),
      (t.FFT.prototype.analyze = function() {
        for (var t, e = 0; e < arguments.length; e++)
          'number' == typeof arguments[e] &&
            ((this.bins = arguments[e]),
            (this.analyser.fftSize = 2 * this.bins)),
            'string' == typeof arguments[e] && (t = arguments[e]);
        if (t && 'db' === t.toLowerCase())
          return (
            i(this),
            this.analyser.getFloatFrequencyData(this.freqDomain),
            this.freqDomain
          );
        n(this, this.freqDomain),
          this.analyser.getByteFrequencyData(this.freqDomain);
        var o = Array.apply([], this.freqDomain);
        return o.length === this.analyser.fftSize, o.constructor === Array, o;
      }),
      (t.FFT.prototype.getEnergy = function(t, i) {
        var n = e.audiocontext.sampleRate / 2;
        if (
          ('bass' === t
            ? ((t = this.bass[0]), (i = this.bass[1]))
            : 'lowMid' === t
            ? ((t = this.lowMid[0]), (i = this.lowMid[1]))
            : 'mid' === t
            ? ((t = this.mid[0]), (i = this.mid[1]))
            : 'highMid' === t
            ? ((t = this.highMid[0]), (i = this.highMid[1]))
            : 'treble' === t && ((t = this.treble[0]), (i = this.treble[1])),
          'number' != typeof t)
        )
          throw 'invalid input for getEnergy()';
        if (i) {
          if (t && i) {
            if (t > i) {
              var o = i;
              (i = t), (t = o);
            }
            for (
              var r = Math.round((t / n) * this.freqDomain.length),
                s = Math.round((i / n) * this.freqDomain.length),
                a = 0,
                u = 0,
                c = r;
              s >= c;
              c++
            )
              (a += this.freqDomain[c]), (u += 1);
            var p = a / u;
            return p;
          }
          throw 'invalid input for getEnergy()';
        }
        var h = Math.round((t / n) * this.freqDomain.length);
        return this.freqDomain[h];
      }),
      (t.FFT.prototype.getFreq = function(t, e) {
        console.log('getFreq() is deprecated. Please use getEnergy() instead.');
        var i = this.getEnergy(t, e);
        return i;
      }),
      (t.FFT.prototype.getCentroid = function() {
        for (
          var t = e.audiocontext.sampleRate / 2, i = 0, n = 0, o = 0;
          o < this.freqDomain.length;
          o++
        )
          (i += o * this.freqDomain[o]), (n += this.freqDomain[o]);
        var r = 0;
        0 !== n && (r = i / n);
        var s = r * (t / this.freqDomain.length);
        return s;
      }),
      (t.FFT.prototype.smooth = function(t) {
        return 'undefined' != typeof t && (this.smoothing = t), this.smoothing;
      }),
      (t.FFT.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.analyser && (this.analyser.disconnect(), delete this.analyser);
      }),
      (t.FFT.prototype.linAverages = function(t) {
        for (
          var t = t || 16,
            e = this.freqDomain,
            i = e.length,
            n = Math.floor(i / t),
            o = new Array(t),
            r = 0,
            s = 0;
          i > s;
          s++
        )
          (o[r] = void 0 !== o[r] ? (o[r] + e[s]) / 2 : e[s]),
            s % n === n - 1 && r++;
        return o;
      }),
      (t.FFT.prototype.logAverages = function(t) {
        for (
          var i = e.audiocontext.sampleRate / 2,
            n = this.freqDomain,
            o = n.length,
            r = new Array(t.length),
            s = 0,
            a = 0;
          o > a;
          a++
        ) {
          var u = Math.round((a * i) / this.freqDomain.length);
          u > t[s].hi && s++,
            (r[s] = void 0 !== r[s] ? (r[s] + n[a]) / 2 : n[a]);
        }
        return r;
      }),
      (t.FFT.prototype.getOctaveBands = function(t, i) {
        var t = t || 3,
          i = i || 15.625,
          n = [],
          o = {
            lo: i / Math.pow(2, 1 / (2 * t)),
            ctr: i,
            hi: i * Math.pow(2, 1 / (2 * t))
          };
        n.push(o);
        for (var r = e.audiocontext.sampleRate / 2; o.hi < r; ) {
          var s = {};
          (s.lo = o.hi),
            (s.ctr = o.ctr * Math.pow(2, 1 / t)),
            (s.hi = s.ctr * Math.pow(2, 1 / (2 * t))),
            n.push(s),
            (o = s);
        }
        return n;
      });
    var i = function(t) {
        t.freqDomain instanceof Float32Array == !1 &&
          (t.freqDomain = new Float32Array(t.analyser.frequencyBinCount));
      },
      n = function(t) {
        t.freqDomain instanceof Uint8Array == !1 &&
          (t.freqDomain = new Uint8Array(t.analyser.frequencyBinCount));
      },
      r = function(t) {
        t.timeDomain instanceof Float32Array == !1 &&
          (t.timeDomain = new Float32Array(t.analyser.frequencyBinCount));
      },
      s = function(t) {
        t.timeDomain instanceof Uint8Array == !1 &&
          (t.timeDomain = new Uint8Array(t.analyser.frequencyBinCount));
      };
  })(o);
  var h;
  h = (function() {
    'use strict';
    var t = function(t, e) {
      this.isUndef(t) || 1 === t
        ? (this.input = this.context.createGain())
        : t > 1 && (this.input = new Array(t)),
        this.isUndef(e) || 1 === e
          ? (this.output = this.context.createGain())
          : e > 1 && (this.output = new Array(t));
    };
    (t.prototype.set = function(e, i, n) {
      if (this.isObject(e)) n = i;
      else if (this.isString(e)) {
        var o = {};
        (o[e] = i), (e = o);
      }
      t: for (var r in e) {
        i = e[r];
        var s = this;
        if (-1 !== r.indexOf('.')) {
          for (var a = r.split('.'), u = 0; u < a.length - 1; u++)
            if (((s = s[a[u]]), s instanceof t)) {
              a.splice(0, u + 1);
              var c = a.join('.');
              s.set(c, i);
              continue t;
            }
          r = a[a.length - 1];
        }
        var p = s[r];
        this.isUndef(p) ||
          ((t.Signal && p instanceof t.Signal) ||
          (t.Param && p instanceof t.Param)
            ? p.value !== i &&
              (this.isUndef(n) ? (p.value = i) : p.rampTo(i, n))
            : p instanceof AudioParam
            ? p.value !== i && (p.value = i)
            : p instanceof t
            ? p.set(i)
            : p !== i && (s[r] = i));
      }
      return this;
    }),
      (t.prototype.get = function(e) {
        this.isUndef(e)
          ? (e = this._collectDefaults(this.constructor))
          : this.isString(e) && (e = [e]);
        for (var i = {}, n = 0; n < e.length; n++) {
          var o = e[n],
            r = this,
            s = i;
          if (-1 !== o.indexOf('.')) {
            for (var a = o.split('.'), u = 0; u < a.length - 1; u++) {
              var c = a[u];
              (s[c] = s[c] || {}), (s = s[c]), (r = r[c]);
            }
            o = a[a.length - 1];
          }
          var p = r[o];
          this.isObject(e[o])
            ? (s[o] = p.get())
            : t.Signal && p instanceof t.Signal
            ? (s[o] = p.value)
            : t.Param && p instanceof t.Param
            ? (s[o] = p.value)
            : p instanceof AudioParam
            ? (s[o] = p.value)
            : p instanceof t
            ? (s[o] = p.get())
            : this.isFunction(p) || this.isUndef(p) || (s[o] = p);
        }
        return i;
      }),
      (t.prototype._collectDefaults = function(t) {
        var e = [];
        if (
          (this.isUndef(t.defaults) || (e = Object.keys(t.defaults)),
          !this.isUndef(t._super))
        )
          for (
            var i = this._collectDefaults(t._super), n = 0;
            n < i.length;
            n++
          )
            -1 === e.indexOf(i[n]) && e.push(i[n]);
        return e;
      }),
      (t.prototype.toString = function() {
        for (var e in t) {
          var i = e[0].match(/^[A-Z]$/),
            n = t[e] === this.constructor;
          if (this.isFunction(t[e]) && i && n) return e;
        }
        return 'Tone';
      }),
      Object.defineProperty(t.prototype, 'numberOfInputs', {
        get: function() {
          return this.input
            ? this.isArray(this.input)
              ? this.input.length
              : 1
            : 0;
        }
      }),
      Object.defineProperty(t.prototype, 'numberOfOutputs', {
        get: function() {
          return this.output
            ? this.isArray(this.output)
              ? this.output.length
              : 1
            : 0;
        }
      }),
      (t.prototype.dispose = function() {
        return (
          this.isUndef(this.input) ||
            (this.input instanceof AudioNode && this.input.disconnect(),
            (this.input = null)),
          this.isUndef(this.output) ||
            (this.output instanceof AudioNode && this.output.disconnect(),
            (this.output = null)),
          this
        );
      }),
      (t.prototype.connect = function(t, e, i) {
        return (
          Array.isArray(this.output)
            ? ((e = this.defaultArg(e, 0)),
              this.output[e].connect(
                t,
                0,
                i
              ))
            : this.output.connect(
                t,
                e,
                i
              ),
          this
        );
      }),
      (t.prototype.disconnect = function(t, e, i) {
        this.isArray(this.output)
          ? this.isNumber(t)
            ? this.output[t].disconnect()
            : ((e = this.defaultArg(e, 0)), this.output[e].disconnect(t, 0, i))
          : this.output.disconnect.apply(this.output, arguments);
      }),
      (t.prototype.connectSeries = function() {
        if (arguments.length > 1)
          for (var t = arguments[0], e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            t.connect(i), (t = i);
          }
        return this;
      }),
      (t.prototype.chain = function() {
        if (arguments.length > 0)
          for (var t = this, e = 0; e < arguments.length; e++) {
            var i = arguments[e];
            t.connect(i), (t = i);
          }
        return this;
      }),
      (t.prototype.fan = function() {
        if (arguments.length > 0)
          for (var t = 0; t < arguments.length; t++) this.connect(arguments[t]);
        return this;
      }),
      (AudioNode.prototype.chain = t.prototype.chain),
      (AudioNode.prototype.fan = t.prototype.fan),
      (t.prototype.defaultArg = function(t, e) {
        if (this.isObject(t) && this.isObject(e)) {
          var i = {};
          for (var n in t) i[n] = this.defaultArg(e[n], t[n]);
          for (var o in e) i[o] = this.defaultArg(t[o], e[o]);
          return i;
        }
        return this.isUndef(t) ? e : t;
      }),
      (t.prototype.optionsObject = function(t, e, i) {
        var n = {};
        if (1 === t.length && this.isObject(t[0])) n = t[0];
        else for (var o = 0; o < e.length; o++) n[e[o]] = t[o];
        return this.isUndef(i) ? n : this.defaultArg(n, i);
      }),
      (t.prototype.isUndef = function(t) {
        return 'undefined' == typeof t;
      }),
      (t.prototype.isFunction = function(t) {
        return 'function' == typeof t;
      }),
      (t.prototype.isNumber = function(t) {
        return 'number' == typeof t;
      }),
      (t.prototype.isObject = function(t) {
        return (
          '[object Object]' === Object.prototype.toString.call(t) &&
          t.constructor === Object
        );
      }),
      (t.prototype.isBoolean = function(t) {
        return 'boolean' == typeof t;
      }),
      (t.prototype.isArray = function(t) {
        return Array.isArray(t);
      }),
      (t.prototype.isString = function(t) {
        return 'string' == typeof t;
      }),
      (t.noOp = function() {}),
      (t.prototype._readOnly = function(t) {
        if (Array.isArray(t))
          for (var e = 0; e < t.length; e++) this._readOnly(t[e]);
        else Object.defineProperty(this, t, { writable: !1, enumerable: !0 });
      }),
      (t.prototype._writable = function(t) {
        if (Array.isArray(t))
          for (var e = 0; e < t.length; e++) this._writable(t[e]);
        else Object.defineProperty(this, t, { writable: !0 });
      }),
      (t.State = { Started: 'started', Stopped: 'stopped', Paused: 'paused' }),
      (t.prototype.equalPowerScale = function(t) {
        var e = 0.5 * Math.PI;
        return Math.sin(t * e);
      }),
      (t.prototype.dbToGain = function(t) {
        return Math.pow(2, t / 6);
      }),
      (t.prototype.gainToDb = function(t) {
        return 20 * (Math.log(t) / Math.LN10);
      }),
      (t.prototype.intervalToFrequencyRatio = function(t) {
        return Math.pow(2, t / 12);
      }),
      (t.prototype.now = function() {
        return t.context.now();
      }),
      (t.now = function() {
        return t.context.now();
      }),
      (t.extend = function(e, i) {
        function n() {}
        t.prototype.isUndef(i) && (i = t),
          (n.prototype = i.prototype),
          (e.prototype = new n()),
          (e.prototype.constructor = e),
          (e._super = i);
      });
    var e;
    return (
      Object.defineProperty(t, 'context', {
        get: function() {
          return e;
        },
        set: function(i) {
          (e = t.Context && i instanceof t.Context ? i : new t.Context(i)),
            t.Context && t.Context.emit('init', e);
        }
      }),
      Object.defineProperty(t.prototype, 'context', {
        get: function() {
          return t.context;
        }
      }),
      (t.setContext = function(e) {
        t.context = e;
      }),
      Object.defineProperty(t.prototype, 'blockTime', {
        get: function() {
          return 128 / this.context.sampleRate;
        }
      }),
      Object.defineProperty(t.prototype, 'sampleTime', {
        get: function() {
          return 1 / this.context.sampleRate;
        }
      }),
      Object.defineProperty(t, 'supported', {
        get: function() {
          var t =
              window.hasOwnProperty('AudioContext') ||
              window.hasOwnProperty('webkitAudioContext'),
            e = window.hasOwnProperty('Promise'),
            i = window.hasOwnProperty('Worker');
          return t && e && i;
        }
      }),
      (t.version = 'r10'),
      !window.TONE_SILENCE_VERSION_LOGGING,
      t
    );
  })();
  var l;
  l = (function(t) {
    'use strict';
    return (
      (t.SignalBase = function() {}),
      t.extend(t.SignalBase),
      (t.SignalBase.prototype.connect = function(e, i, n) {
        return (
          (t.Signal && t.Signal === e.constructor) ||
          (t.Param && t.Param === e.constructor) ||
          (t.TimelineSignal && t.TimelineSignal === e.constructor)
            ? (e._param.cancelScheduledValues(0),
              (e._param.value = 0),
              (e.overridden = !0))
            : e instanceof AudioParam &&
              (e.cancelScheduledValues(0), (e.value = 0)),
          t.prototype.connect.call(this, e, i, n),
          this
        );
      }),
      t.SignalBase
    );
  })(h);
  var f;
  f = (function(t) {
    'use strict';
    return (
      (t.WaveShaper = function(t, e) {
        (this._shaper = this.input = this.output = this.context.createWaveShaper()),
          (this._curve = null),
          Array.isArray(t)
            ? (this.curve = t)
            : isFinite(t) || this.isUndef(t)
            ? (this._curve = new Float32Array(this.defaultArg(t, 1024)))
            : this.isFunction(t) &&
              ((this._curve = new Float32Array(this.defaultArg(e, 1024))),
              this.setMap(t));
      }),
      t.extend(t.WaveShaper, t.SignalBase),
      (t.WaveShaper.prototype.setMap = function(t) {
        for (var e = 0, i = this._curve.length; i > e; e++) {
          var n = (e / (i - 1)) * 2 - 1;
          this._curve[e] = t(n, e);
        }
        return (this._shaper.curve = this._curve), this;
      }),
      Object.defineProperty(t.WaveShaper.prototype, 'curve', {
        get: function() {
          return this._shaper.curve;
        },
        set: function(t) {
          (this._curve = new Float32Array(t)),
            (this._shaper.curve = this._curve);
        }
      }),
      Object.defineProperty(t.WaveShaper.prototype, 'oversample', {
        get: function() {
          return this._shaper.oversample;
        },
        set: function(t) {
          if (-1 === ['none', '2x', '4x'].indexOf(t))
            throw new RangeError(
              "Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'"
            );
          this._shaper.oversample = t;
        }
      }),
      (t.WaveShaper.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._shaper.disconnect(),
          (this._shaper = null),
          (this._curve = null),
          this
        );
      }),
      t.WaveShaper
    );
  })(h);
  var d;
  d = (function(t) {
    return (
      (t.TimeBase = function(e, i) {
        if (!(this instanceof t.TimeBase)) return new t.TimeBase(e, i);
        if (((this._expr = this._noOp), e instanceof t.TimeBase)) this.copy(e);
        else if (!this.isUndef(i) || this.isNumber(e)) {
          i = this.defaultArg(i, this._defaultUnits);
          var n = this._primaryExpressions[i].method;
          this._expr = n.bind(this, e);
        } else
          this.isString(e)
            ? this.set(e)
            : this.isUndef(e) && (this._expr = this._defaultExpr());
      }),
      t.extend(t.TimeBase),
      (t.TimeBase.prototype.set = function(t) {
        return (this._expr = this._parseExprString(t)), this;
      }),
      (t.TimeBase.prototype.clone = function() {
        var t = new this.constructor();
        return t.copy(this), t;
      }),
      (t.TimeBase.prototype.copy = function(t) {
        var e = t._expr();
        return this.set(e);
      }),
      (t.TimeBase.prototype._primaryExpressions = {
        n: {
          regexp: /^(\d+)n/i,
          method: function(t) {
            return (
              (t = parseInt(t)),
              1 === t
                ? this._beatsToUnits(this._timeSignature())
                : this._beatsToUnits(4 / t)
            );
          }
        },
        t: {
          regexp: /^(\d+)t/i,
          method: function(t) {
            return (t = parseInt(t)), this._beatsToUnits(8 / (3 * parseInt(t)));
          }
        },
        m: {
          regexp: /^(\d+)m/i,
          method: function(t) {
            return this._beatsToUnits(parseInt(t) * this._timeSignature());
          }
        },
        i: {
          regexp: /^(\d+)i/i,
          method: function(t) {
            return this._ticksToUnits(parseInt(t));
          }
        },
        hz: {
          regexp: /^(\d+(?:\.\d+)?)hz/i,
          method: function(t) {
            return this._frequencyToUnits(parseFloat(t));
          }
        },
        tr: {
          regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
          method: function(t, e, i) {
            var n = 0;
            return (
              t &&
                '0' !== t &&
                (n += this._beatsToUnits(
                  this._timeSignature() * parseFloat(t)
                )),
              e && '0' !== e && (n += this._beatsToUnits(parseFloat(e))),
              i && '0' !== i && (n += this._beatsToUnits(parseFloat(i) / 4)),
              n
            );
          }
        },
        s: {
          regexp: /^(\d+(?:\.\d+)?s)/,
          method: function(t) {
            return this._secondsToUnits(parseFloat(t));
          }
        },
        samples: {
          regexp: /^(\d+)samples/,
          method: function(t) {
            return parseInt(t) / this.context.sampleRate;
          }
        },
        default: {
          regexp: /^(\d+(?:\.\d+)?)/,
          method: function(t) {
            return this._primaryExpressions[this._defaultUnits].method.call(
              this,
              t
            );
          }
        }
      }),
      (t.TimeBase.prototype._binaryExpressions = {
        '+': {
          regexp: /^\+/,
          precedence: 2,
          method: function(t, e) {
            return t() + e();
          }
        },
        '-': {
          regexp: /^\-/,
          precedence: 2,
          method: function(t, e) {
            return t() - e();
          }
        },
        '*': {
          regexp: /^\*/,
          precedence: 1,
          method: function(t, e) {
            return t() * e();
          }
        },
        '/': {
          regexp: /^\//,
          precedence: 1,
          method: function(t, e) {
            return t() / e();
          }
        }
      }),
      (t.TimeBase.prototype._unaryExpressions = {
        neg: {
          regexp: /^\-/,
          method: function(t) {
            return -t();
          }
        }
      }),
      (t.TimeBase.prototype._syntaxGlue = {
        '(': { regexp: /^\(/ },
        ')': { regexp: /^\)/ }
      }),
      (t.TimeBase.prototype._tokenize = function(t) {
        function e(t, e) {
          for (
            var i = [
                '_binaryExpressions',
                '_unaryExpressions',
                '_primaryExpressions',
                '_syntaxGlue'
              ],
              n = 0;
            n < i.length;
            n++
          ) {
            var o = e[i[n]];
            for (var r in o) {
              var s = o[r],
                a = s.regexp,
                u = t.match(a);
              if (null !== u)
                return {
                  method: s.method,
                  precedence: s.precedence,
                  regexp: s.regexp,
                  value: u[0]
                };
            }
          }
          throw new SyntaxError('Tone.TimeBase: Unexpected token ' + t);
        }
        for (var i = -1, n = []; t.length > 0; ) {
          t = t.trim();
          var o = e(t, this);
          n.push(o), (t = t.substr(o.value.length));
        }
        return {
          next: function() {
            return n[++i];
          },
          peek: function() {
            return n[i + 1];
          }
        };
      }),
      (t.TimeBase.prototype._matchGroup = function(t, e, i) {
        var n = !1;
        if (!this.isUndef(t))
          for (var o in e) {
            var r = e[o];
            if (r.regexp.test(t.value)) {
              if (this.isUndef(i)) return r;
              if (r.precedence === i) return r;
            }
          }
        return n;
      }),
      (t.TimeBase.prototype._parseBinary = function(t, e) {
        this.isUndef(e) && (e = 2);
        var i;
        i = 0 > e ? this._parseUnary(t) : this._parseBinary(t, e - 1);
        for (
          var n = t.peek();
          n && this._matchGroup(n, this._binaryExpressions, e);

        )
          (n = t.next()),
            (i = n.method.bind(this, i, this._parseBinary(t, e - 1))),
            (n = t.peek());
        return i;
      }),
      (t.TimeBase.prototype._parseUnary = function(t) {
        var e, i;
        e = t.peek();
        var n = this._matchGroup(e, this._unaryExpressions);
        return n
          ? ((e = t.next()), (i = this._parseUnary(t)), n.method.bind(this, i))
          : this._parsePrimary(t);
      }),
      (t.TimeBase.prototype._parsePrimary = function(t) {
        var e, i;
        if (((e = t.peek()), this.isUndef(e)))
          throw new SyntaxError('Tone.TimeBase: Unexpected end of expression');
        if (this._matchGroup(e, this._primaryExpressions)) {
          e = t.next();
          var n = e.value.match(e.regexp);
          return e.method.bind(this, n[1], n[2], n[3]);
        }
        if (e && '(' === e.value) {
          if (
            (t.next(),
            (i = this._parseBinary(t)),
            (e = t.next()),
            !e || ')' !== e.value)
          )
            throw new SyntaxError('Expected )');
          return i;
        }
        throw new SyntaxError('Tone.TimeBase: Cannot process token ' + e.value);
      }),
      (t.TimeBase.prototype._parseExprString = function(t) {
        this.isString(t) || (t = t.toString());
        var e = this._tokenize(t),
          i = this._parseBinary(e);
        return i;
      }),
      (t.TimeBase.prototype._noOp = function() {
        return 0;
      }),
      (t.TimeBase.prototype._defaultExpr = function() {
        return this._noOp;
      }),
      (t.TimeBase.prototype._defaultUnits = 's'),
      (t.TimeBase.prototype._frequencyToUnits = function(t) {
        return 1 / t;
      }),
      (t.TimeBase.prototype._beatsToUnits = function(e) {
        return (60 / t.Transport.bpm.value) * e;
      }),
      (t.TimeBase.prototype._secondsToUnits = function(t) {
        return t;
      }),
      (t.TimeBase.prototype._ticksToUnits = function(e) {
        return e * (this._beatsToUnits(1) / t.Transport.PPQ);
      }),
      (t.TimeBase.prototype._timeSignature = function() {
        return t.Transport.timeSignature;
      }),
      (t.TimeBase.prototype._pushExpr = function(e, i, n) {
        return (
          e instanceof t.TimeBase || (e = new this.constructor(e, n)),
          (this._expr = this._binaryExpressions[i].method.bind(
            this,
            this._expr,
            e._expr
          )),
          this
        );
      }),
      (t.TimeBase.prototype.add = function(t, e) {
        return this._pushExpr(t, '+', e);
      }),
      (t.TimeBase.prototype.sub = function(t, e) {
        return this._pushExpr(t, '-', e);
      }),
      (t.TimeBase.prototype.mult = function(t, e) {
        return this._pushExpr(t, '*', e);
      }),
      (t.TimeBase.prototype.div = function(t, e) {
        return this._pushExpr(t, '/', e);
      }),
      (t.TimeBase.prototype.valueOf = function() {
        return this._expr();
      }),
      (t.TimeBase.prototype.dispose = function() {
        this._expr = null;
      }),
      t.TimeBase
    );
  })(h);
  var m;
  m = (function(t) {
    return (
      (t.Time = function(e, i) {
        return this instanceof t.Time
          ? ((this._plusNow = !1), void t.TimeBase.call(this, e, i))
          : new t.Time(e, i);
      }),
      t.extend(t.Time, t.TimeBase),
      (t.Time.prototype._unaryExpressions = Object.create(
        t.TimeBase.prototype._unaryExpressions
      )),
      (t.Time.prototype._unaryExpressions.quantize = {
        regexp: /^@/,
        method: function(e) {
          return t.Transport.nextSubdivision(e());
        }
      }),
      (t.Time.prototype._unaryExpressions.now = {
        regexp: /^\+/,
        method: function(t) {
          return (this._plusNow = !0), t();
        }
      }),
      (t.Time.prototype.quantize = function(t, e) {
        return (
          (e = this.defaultArg(e, 1)),
          (this._expr = function(t, e, i) {
            (t = t()), (e = e.toSeconds());
            var n = Math.round(t / e),
              o = n * e,
              r = o - t;
            return t + r * i;
          }.bind(this, this._expr, new this.constructor(t), e)),
          this
        );
      }),
      (t.Time.prototype.addNow = function() {
        return (this._plusNow = !0), this;
      }),
      (t.Time.prototype._defaultExpr = function() {
        return (this._plusNow = !0), this._noOp;
      }),
      (t.Time.prototype.copy = function(e) {
        return (
          t.TimeBase.prototype.copy.call(this, e),
          (this._plusNow = e._plusNow),
          this
        );
      }),
      (t.Time.prototype.toNotation = function() {
        var t = this.toSeconds(),
          e = ['1m', '2n', '4n', '8n', '16n', '32n', '64n', '128n'],
          i = this._toNotationHelper(t, e),
          n = [
            '1m',
            '2n',
            '2t',
            '4n',
            '4t',
            '8n',
            '8t',
            '16n',
            '16t',
            '32n',
            '32t',
            '64n',
            '64t',
            '128n'
          ],
          o = this._toNotationHelper(t, n);
        return o.split('+').length < i.split('+').length ? o : i;
      }),
      (t.Time.prototype._toNotationHelper = function(t, e) {
        for (
          var i = this._notationToUnits(e[e.length - 1]), n = '', o = 0;
          o < e.length;
          o++
        ) {
          var r = this._notationToUnits(e[o]),
            s = t / r,
            a = 1e-6;
          if ((a > 1 - (s % 1) && (s += a), (s = Math.floor(s)), s > 0)) {
            if (
              ((n += 1 === s ? e[o] : s.toString() + '*' + e[o]),
              (t -= s * r),
              i > t)
            )
              break;
            n += ' + ';
          }
        }
        return '' === n && (n = '0'), n;
      }),
      (t.Time.prototype._notationToUnits = function(t) {
        for (
          var e = this._primaryExpressions, i = [e.n, e.t, e.m], n = 0;
          n < i.length;
          n++
        ) {
          var o = i[n],
            r = t.match(o.regexp);
          if (r) return o.method.call(this, r[1]);
        }
      }),
      (t.Time.prototype.toBarsBeatsSixteenths = function() {
        var t = this._beatsToUnits(1),
          e = this.toSeconds() / t,
          i = Math.floor(e / this._timeSignature()),
          n = (e % 1) * 4;
        (e = Math.floor(e) % this._timeSignature()),
          (n = n.toString()),
          n.length > 3 && (n = parseFloat(n).toFixed(3));
        var o = [i, e, n];
        return o.join(':');
      }),
      (t.Time.prototype.toTicks = function() {
        var e = this._beatsToUnits(1),
          i = this.valueOf() / e;
        return Math.floor(i * t.Transport.PPQ);
      }),
      (t.Time.prototype.toSamples = function() {
        return this.toSeconds() * this.context.sampleRate;
      }),
      (t.Time.prototype.toFrequency = function() {
        return 1 / this.toSeconds();
      }),
      (t.Time.prototype.toSeconds = function() {
        return this.valueOf();
      }),
      (t.Time.prototype.toMilliseconds = function() {
        return 1e3 * this.toSeconds();
      }),
      (t.Time.prototype.valueOf = function() {
        var t = this._expr();
        return t + (this._plusNow ? this.now() : 0);
      }),
      t.Time
    );
  })(h);
  var y;
  y = (function(t) {
    (t.Frequency = function(e, i) {
      return this instanceof t.Frequency
        ? void t.TimeBase.call(this, e, i)
        : new t.Frequency(e, i);
    }),
      t.extend(t.Frequency, t.TimeBase),
      (t.Frequency.prototype._primaryExpressions = Object.create(
        t.TimeBase.prototype._primaryExpressions
      )),
      (t.Frequency.prototype._primaryExpressions.midi = {
        regexp: /^(\d+(?:\.\d+)?midi)/,
        method: function(t) {
          return this.midiToFrequency(t);
        }
      }),
      (t.Frequency.prototype._primaryExpressions.note = {
        regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
        method: function(t, i) {
          var n = e[t.toLowerCase()],
            o = n + 12 * (parseInt(i) + 1);
          return this.midiToFrequency(o);
        }
      }),
      (t.Frequency.prototype._primaryExpressions.tr = {
        regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
        method: function(t, e, i) {
          var n = 1;
          return (
            t &&
              '0' !== t &&
              (n *= this._beatsToUnits(this._timeSignature() * parseFloat(t))),
            e && '0' !== e && (n *= this._beatsToUnits(parseFloat(e))),
            i && '0' !== i && (n *= this._beatsToUnits(parseFloat(i) / 4)),
            n
          );
        }
      }),
      (t.Frequency.prototype.transpose = function(t) {
        return (
          (this._expr = function(t, e) {
            var i = t();
            return i * this.intervalToFrequencyRatio(e);
          }.bind(this, this._expr, t)),
          this
        );
      }),
      (t.Frequency.prototype.harmonize = function(t) {
        return (
          (this._expr = function(t, e) {
            for (var i = t(), n = [], o = 0; o < e.length; o++)
              n[o] = i * this.intervalToFrequencyRatio(e[o]);
            return n;
          }.bind(this, this._expr, t)),
          this
        );
      }),
      (t.Frequency.prototype.toMidi = function() {
        return this.frequencyToMidi(this.valueOf());
      }),
      (t.Frequency.prototype.toNote = function() {
        var e = this.valueOf(),
          n = Math.log(e / t.Frequency.A4) / Math.LN2,
          o = Math.round(12 * n) + 57,
          r = Math.floor(o / 12);
        0 > r && (o += -12 * r);
        var s = i[o % 12];
        return s + r.toString();
      }),
      (t.Frequency.prototype.toSeconds = function() {
        return 1 / this.valueOf();
      }),
      (t.Frequency.prototype.toFrequency = function() {
        return this.valueOf();
      }),
      (t.Frequency.prototype.toTicks = function() {
        var e = this._beatsToUnits(1),
          i = this.valueOf() / e;
        return Math.floor(i * t.Transport.PPQ);
      }),
      (t.Frequency.prototype._frequencyToUnits = function(t) {
        return t;
      }),
      (t.Frequency.prototype._ticksToUnits = function(e) {
        return 1 / ((60 * e) / (t.Transport.bpm.value * t.Transport.PPQ));
      }),
      (t.Frequency.prototype._beatsToUnits = function(e) {
        return 1 / t.TimeBase.prototype._beatsToUnits.call(this, e);
      }),
      (t.Frequency.prototype._secondsToUnits = function(t) {
        return 1 / t;
      }),
      (t.Frequency.prototype._defaultUnits = 'hz');
    var e = {
        cbb: -2,
        cb: -1,
        c: 0,
        'c#': 1,
        cx: 2,
        dbb: 0,
        db: 1,
        d: 2,
        'd#': 3,
        dx: 4,
        ebb: 2,
        eb: 3,
        e: 4,
        'e#': 5,
        ex: 6,
        fbb: 3,
        fb: 4,
        f: 5,
        'f#': 6,
        fx: 7,
        gbb: 5,
        gb: 6,
        g: 7,
        'g#': 8,
        gx: 9,
        abb: 7,
        ab: 8,
        a: 9,
        'a#': 10,
        ax: 11,
        bbb: 9,
        bb: 10,
        b: 11,
        'b#': 12,
        bx: 13
      },
      i = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return (
      (t.Frequency.A4 = 440),
      (t.Frequency.prototype.midiToFrequency = function(e) {
        return t.Frequency.A4 * Math.pow(2, (e - 69) / 12);
      }),
      (t.Frequency.prototype.frequencyToMidi = function(e) {
        return 69 + (12 * Math.log(e / t.Frequency.A4)) / Math.LN2;
      }),
      t.Frequency
    );
  })(h);
  var v;
  v = (function(t) {
    return (
      (t.TransportTime = function(e, i) {
        return this instanceof t.TransportTime
          ? void t.Time.call(this, e, i)
          : new t.TransportTime(e, i);
      }),
      t.extend(t.TransportTime, t.Time),
      (t.TransportTime.prototype._unaryExpressions = Object.create(
        t.Time.prototype._unaryExpressions
      )),
      (t.TransportTime.prototype._unaryExpressions.quantize = {
        regexp: /^@/,
        method: function(e) {
          var i = this._secondsToTicks(e()),
            n = Math.ceil(t.Transport.ticks / i);
          return this._ticksToUnits(n * i);
        }
      }),
      (t.TransportTime.prototype._secondsToTicks = function(e) {
        var i = this._beatsToUnits(1),
          n = e / i;
        return Math.round(n * t.Transport.PPQ);
      }),
      (t.TransportTime.prototype.valueOf = function() {
        var e = this._secondsToTicks(this._expr());
        return e + (this._plusNow ? t.Transport.ticks : 0);
      }),
      (t.TransportTime.prototype.toTicks = function() {
        return this.valueOf();
      }),
      (t.TransportTime.prototype.toSeconds = function() {
        var e = this._expr();
        return e + (this._plusNow ? t.Transport.seconds : 0);
      }),
      (t.TransportTime.prototype.toFrequency = function() {
        return 1 / this.toSeconds();
      }),
      t.TransportTime
    );
  })(h);
  var g;
  g = (function(t) {
    'use strict';
    return (
      (t.Emitter = function() {
        this._events = {};
      }),
      t.extend(t.Emitter),
      (t.Emitter.prototype.on = function(t, e) {
        for (var i = t.split(/\W+/), n = 0; n < i.length; n++) {
          var o = i[n];
          this._events.hasOwnProperty(o) || (this._events[o] = []),
            this._events[o].push(e);
        }
        return this;
      }),
      (t.Emitter.prototype.off = function(e, i) {
        for (var n = e.split(/\W+/), o = 0; o < n.length; o++)
          if (((e = n[o]), this._events.hasOwnProperty(e)))
            if (t.prototype.isUndef(i)) this._events[e] = [];
            else
              for (var r = this._events[e], s = 0; s < r.length; s++)
                r[s] === i && r.splice(s, 1);
        return this;
      }),
      (t.Emitter.prototype.emit = function(t) {
        if (this._events) {
          var e = Array.apply(null, arguments).slice(1);
          if (this._events.hasOwnProperty(t))
            for (var i = this._events[t], n = 0, o = i.length; o > n; n++)
              i[n].apply(this, e);
        }
        return this;
      }),
      (t.Emitter.mixin = function(e) {
        var i = ['on', 'off', 'emit'];
        e._events = {};
        for (var n = 0; n < i.length; n++) {
          var o = i[n],
            r = t.Emitter.prototype[o];
          e[o] = r;
        }
      }),
      (t.Emitter.prototype.dispose = function() {
        return t.prototype.dispose.call(this), (this._events = null), this;
      }),
      t.Emitter
    );
  })(h);
  var _;
  _ = (function(t) {
    function e() {
      function e(e, i, o) {
        if (e.input)
          Array.isArray(e.input)
            ? (t.prototype.isUndef(o) && (o = 0), this.connect(e.input[o]))
            : this.connect(
                e.input,
                i,
                o
              );
        else
          try {
            e instanceof AudioNode ? n.call(this, e, i, o) : n.call(this, e, i);
          } catch (r) {
            throw new Error('error connecting to node: ' + e + '\n' + r);
          }
      }
      function i(e, i, n) {
        if (e && e.input && Array.isArray(e.input))
          t.prototype.isUndef(n) && (n = 0), this.disconnect(e.input[n], i, n);
        else if (e && e.input) this.disconnect(e.input, i, n);
        else
          try {
            o.apply(this, arguments);
          } catch (r) {
            throw new Error('error disconnecting node: ' + e + '\n' + r);
          }
      }
      var n = AudioNode.prototype.connect,
        o = AudioNode.prototype.disconnect;
      AudioNode.prototype.connect !== e &&
        ((AudioNode.prototype.connect = e),
        (AudioNode.prototype.disconnect = i));
    }
    return (
      !window.hasOwnProperty('AudioContext') &&
        window.hasOwnProperty('webkitAudioContext') &&
        (window.AudioContext = window.webkitAudioContext),
      (t.Context = function(e) {
        t.Emitter.call(this),
          e || (e = new window.AudioContext()),
          (this._context = e);
        for (var i in this._context) this._defineProperty(this._context, i);
        (this._latencyHint = 'interactive'),
          (this._lookAhead = 0.1),
          (this._updateInterval = this._lookAhead / 3),
          (this._computedUpdateInterval = 0),
          (this._worker = this._createWorker()),
          (this._constants = {});
      }),
      t.extend(t.Context, t.Emitter),
      t.Emitter.mixin(t.Context),
      (t.Context.prototype._defineProperty = function(t, e) {
        this.isUndef(this[e]) &&
          Object.defineProperty(this, e, {
            get: function() {
              return 'function' == typeof t[e] ? t[e].bind(t) : t[e];
            },
            set: function(i) {
              t[e] = i;
            }
          });
      }),
      (t.Context.prototype.now = function() {
        return this._context.currentTime;
      }),
      (t.Context.prototype._createWorker = function() {
        window.URL = window.URL || window.webkitURL;
        var t = new Blob([
            'var timeoutTime = ' +
              (1e3 * this._updateInterval).toFixed(1) +
              ";self.onmessage = function(msg){	timeoutTime = parseInt(msg.data);};function tick(){	setTimeout(tick, timeoutTime);	self.postMessage('tick');}tick();"
          ]),
          e = URL.createObjectURL(t),
          i = new Worker(e);
        return (
          i.addEventListener(
            'message',
            function() {
              this.emit('tick');
            }.bind(this)
          ),
          i.addEventListener(
            'message',
            function() {
              var t = this.now();
              if (this.isNumber(this._lastUpdate)) {
                var e = t - this._lastUpdate;
                this._computedUpdateInterval = Math.max(
                  e,
                  0.97 * this._computedUpdateInterval
                );
              }
              this._lastUpdate = t;
            }.bind(this)
          ),
          i
        );
      }),
      (t.Context.prototype.getConstant = function(t) {
        if (this._constants[t]) return this._constants[t];
        for (
          var e = this._context.createBuffer(1, 128, this._context.sampleRate),
            i = e.getChannelData(0),
            n = 0;
          n < i.length;
          n++
        )
          i[n] = t;
        var o = this._context.createBufferSource();
        return (
          (o.channelCount = 1),
          (o.channelCountMode = 'explicit'),
          (o.buffer = e),
          (o.loop = !0),
          o.start(0),
          (this._constants[t] = o),
          o
        );
      }),
      Object.defineProperty(t.Context.prototype, 'lag', {
        get: function() {
          var t = this._computedUpdateInterval - this._updateInterval;
          return (t = Math.max(t, 0));
        }
      }),
      Object.defineProperty(t.Context.prototype, 'lookAhead', {
        get: function() {
          return this._lookAhead;
        },
        set: function(t) {
          this._lookAhead = t;
        }
      }),
      Object.defineProperty(t.Context.prototype, 'updateInterval', {
        get: function() {
          return this._updateInterval;
        },
        set: function(e) {
          (this._updateInterval = Math.max(e, t.prototype.blockTime)),
            this._worker.postMessage(Math.max(1e3 * e, 1));
        }
      }),
      Object.defineProperty(t.Context.prototype, 'latencyHint', {
        get: function() {
          return this._latencyHint;
        },
        set: function(t) {
          var e = t;
          if (((this._latencyHint = t), this.isString(t)))
            switch (t) {
              case 'interactive':
                (e = 0.1), (this._context.latencyHint = t);
                break;
              case 'playback':
                (e = 0.8), (this._context.latencyHint = t);
                break;
              case 'balanced':
                (e = 0.25), (this._context.latencyHint = t);
                break;
              case 'fastest':
                e = 0.01;
            }
          (this.lookAhead = e), (this.updateInterval = e / 3);
        }
      }),
      t.supported
        ? (e(), (t.context = new t.Context()))
        : console.warn('This browser does not support Tone.js'),
      t.Context
    );
  })(h);
  var T;
  T = (function(t) {
    return (
      (t.Type = {
        Default: 'number',
        Time: 'time',
        Frequency: 'frequency',
        TransportTime: 'transportTime',
        Ticks: 'ticks',
        NormalRange: 'normalRange',
        AudioRange: 'audioRange',
        Decibels: 'db',
        Interval: 'interval',
        BPM: 'bpm',
        Positive: 'positive',
        Cents: 'cents',
        Degrees: 'degrees',
        MIDI: 'midi',
        BarsBeatsSixteenths: 'barsBeatsSixteenths',
        Samples: 'samples',
        Hertz: 'hertz',
        Note: 'note',
        Milliseconds: 'milliseconds',
        Seconds: 'seconds',
        Notation: 'notation'
      }),
      (t.prototype.toSeconds = function(e) {
        return this.isNumber(e)
          ? e
          : this.isUndef(e)
          ? this.now()
          : this.isString(e)
          ? new t.Time(e).toSeconds()
          : e instanceof t.TimeBase
          ? e.toSeconds()
          : void 0;
      }),
      (t.prototype.toFrequency = function(e) {
        return this.isNumber(e)
          ? e
          : this.isString(e) || this.isUndef(e)
          ? new t.Frequency(e).valueOf()
          : e instanceof t.TimeBase
          ? e.toFrequency()
          : void 0;
      }),
      (t.prototype.toTicks = function(e) {
        return this.isNumber(e) || this.isString(e)
          ? new t.TransportTime(e).toTicks()
          : this.isUndef(e)
          ? t.Transport.ticks
          : e instanceof t.TimeBase
          ? e.toTicks()
          : void 0;
      }),
      t
    );
  })(h, m, y, v);
  var b;
  b = (function(t) {
    'use strict';
    return (
      (t.Param = function() {
        var e = this.optionsObject(
          arguments,
          ['param', 'units', 'convert'],
          t.Param.defaults
        );
        (this._param = this.input = e.param),
          (this.units = e.units),
          (this.convert = e.convert),
          (this.overridden = !1),
          (this._lfo = null),
          this.isObject(e.lfo)
            ? (this.value = e.lfo)
            : this.isUndef(e.value) || (this.value = e.value);
      }),
      t.extend(t.Param),
      (t.Param.defaults = {
        units: t.Type.Default,
        convert: !0,
        param: void 0
      }),
      Object.defineProperty(t.Param.prototype, 'value', {
        get: function() {
          return this._toUnits(this._param.value);
        },
        set: function(e) {
          if (this.isObject(e)) {
            if (this.isUndef(t.LFO))
              throw new Error(
                "Include 'Tone.LFO' to use an LFO as a Param value."
              );
            this._lfo && this._lfo.dispose(),
              (this._lfo = new t.LFO(e).start()),
              this._lfo.connect(this.input);
          } else {
            var i = this._fromUnits(e);
            this._param.cancelScheduledValues(0), (this._param.value = i);
          }
        }
      }),
      (t.Param.prototype._fromUnits = function(e) {
        if (!this.convert && !this.isUndef(this.convert)) return e;
        switch (this.units) {
          case t.Type.Time:
            return this.toSeconds(e);
          case t.Type.Frequency:
            return this.toFrequency(e);
          case t.Type.Decibels:
            return this.dbToGain(e);
          case t.Type.NormalRange:
            return Math.min(Math.max(e, 0), 1);
          case t.Type.AudioRange:
            return Math.min(Math.max(e, -1), 1);
          case t.Type.Positive:
            return Math.max(e, 0);
          default:
            return e;
        }
      }),
      (t.Param.prototype._toUnits = function(e) {
        if (!this.convert && !this.isUndef(this.convert)) return e;
        switch (this.units) {
          case t.Type.Decibels:
            return this.gainToDb(e);
          default:
            return e;
        }
      }),
      (t.Param.prototype._minOutput = 1e-5),
      (t.Param.prototype.setValueAtTime = function(t, e) {
        return (
          (t = this._fromUnits(t)),
          (e = this.toSeconds(e)),
          e <= this.now() + this.blockTime
            ? (this._param.value = t)
            : this._param.setValueAtTime(t, e),
          this
        );
      }),
      (t.Param.prototype.setRampPoint = function(t) {
        t = this.defaultArg(t, this.now());
        var e = this._param.value;
        return (
          0 === e && (e = this._minOutput),
          this._param.setValueAtTime(e, t),
          this
        );
      }),
      (t.Param.prototype.linearRampToValueAtTime = function(t, e) {
        return (
          (t = this._fromUnits(t)),
          this._param.linearRampToValueAtTime(t, this.toSeconds(e)),
          this
        );
      }),
      (t.Param.prototype.exponentialRampToValueAtTime = function(t, e) {
        return (
          (t = this._fromUnits(t)),
          (t = Math.max(this._minOutput, t)),
          this._param.exponentialRampToValueAtTime(t, this.toSeconds(e)),
          this
        );
      }),
      (t.Param.prototype.exponentialRampToValue = function(t, e, i) {
        return (
          (i = this.toSeconds(i)),
          this.setRampPoint(i),
          this.exponentialRampToValueAtTime(t, i + this.toSeconds(e)),
          this
        );
      }),
      (t.Param.prototype.linearRampToValue = function(t, e, i) {
        return (
          (i = this.toSeconds(i)),
          this.setRampPoint(i),
          this.linearRampToValueAtTime(t, i + this.toSeconds(e)),
          this
        );
      }),
      (t.Param.prototype.setTargetAtTime = function(t, e, i) {
        return (
          (t = this._fromUnits(t)),
          (t = Math.max(this._minOutput, t)),
          (i = Math.max(this._minOutput, i)),
          this._param.setTargetAtTime(t, this.toSeconds(e), i),
          this
        );
      }),
      (t.Param.prototype.setValueCurveAtTime = function(t, e, i) {
        for (var n = 0; n < t.length; n++) t[n] = this._fromUnits(t[n]);
        return (
          this._param.setValueCurveAtTime(
            t,
            this.toSeconds(e),
            this.toSeconds(i)
          ),
          this
        );
      }),
      (t.Param.prototype.cancelScheduledValues = function(t) {
        return this._param.cancelScheduledValues(this.toSeconds(t)), this;
      }),
      (t.Param.prototype.rampTo = function(e, i, n) {
        return (
          (i = this.defaultArg(i, 0)),
          this.units === t.Type.Frequency ||
          this.units === t.Type.BPM ||
          this.units === t.Type.Decibels
            ? this.exponentialRampToValue(e, i, n)
            : this.linearRampToValue(e, i, n),
          this
        );
      }),
      Object.defineProperty(t.Param.prototype, 'lfo', {
        get: function() {
          return this._lfo;
        }
      }),
      (t.Param.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          (this._param = null),
          this._lfo && (this._lfo.dispose(), (this._lfo = null)),
          this
        );
      }),
      t.Param
    );
  })(h);
  var x;
  x = (function(t) {
    'use strict';
    return (
      window.GainNode &&
        !AudioContext.prototype.createGain &&
        (AudioContext.prototype.createGain =
          AudioContext.prototype.createGainNode),
      (t.Gain = function() {
        var e = this.optionsObject(
          arguments,
          ['gain', 'units'],
          t.Gain.defaults
        );
        (this.input = this.output = this._gainNode = this.context.createGain()),
          (this.gain = new t.Param({
            param: this._gainNode.gain,
            units: e.units,
            value: e.gain,
            convert: e.convert
          })),
          this._readOnly('gain');
      }),
      t.extend(t.Gain),
      (t.Gain.defaults = { gain: 1, convert: !0 }),
      (t.Gain.prototype.dispose = function() {
        t.Param.prototype.dispose.call(this),
          this._gainNode.disconnect(),
          (this._gainNode = null),
          this._writable('gain'),
          this.gain.dispose(),
          (this.gain = null);
      }),
      (t.prototype.createInsOuts = function(e, i) {
        1 === e
          ? (this.input = new t.Gain())
          : e > 1 && (this.input = new Array(e)),
          1 === i
            ? (this.output = new t.Gain())
            : i > 1 && (this.output = new Array(e));
      }),
      t.Gain
    );
  })(h, b);
  var S;
  S = (function(t) {
    'use strict';
    return (
      (t.Signal = function() {
        var e = this.optionsObject(
          arguments,
          ['value', 'units'],
          t.Signal.defaults
        );
        (this.output = this._gain = this.context.createGain()),
          (e.param = this._gain.gain),
          t.Param.call(this, e),
          (this.input = this._param = this._gain.gain),
          this.context.getConstant(1).chain(this._gain);
      }),
      t.extend(t.Signal, t.Param),
      (t.Signal.defaults = { value: 0, units: t.Type.Default, convert: !0 }),
      (t.Signal.prototype.connect = t.SignalBase.prototype.connect),
      (t.Signal.prototype.dispose = function() {
        return (
          t.Param.prototype.dispose.call(this),
          (this._param = null),
          this._gain.disconnect(),
          (this._gain = null),
          this
        );
      }),
      t.Signal
    );
  })(h, f, T, b);
  var w;
  w = (function(t) {
    'use strict';
    return (
      (t.Add = function(e) {
        this.createInsOuts(2, 0),
          (this._sum = this.input[0] = this.input[1] = this.output = new t.Gain()),
          (this._param = this.input[1] = new t.Signal(e)),
          this._param.connect(this._sum);
      }),
      t.extend(t.Add, t.Signal),
      (t.Add.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._sum.dispose(),
          (this._sum = null),
          this._param.dispose(),
          (this._param = null),
          this
        );
      }),
      t.Add
    );
  })(h, S);
  var A;
  A = (function(t) {
    'use strict';
    return (
      (t.Multiply = function(e) {
        this.createInsOuts(2, 0),
          (this._mult = this.input[0] = this.output = new t.Gain()),
          (this._param = this.input[1] = this.output.gain),
          (this._param.value = this.defaultArg(e, 0));
      }),
      t.extend(t.Multiply, t.Signal),
      (t.Multiply.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._mult.dispose(),
          (this._mult = null),
          (this._param = null),
          this
        );
      }),
      t.Multiply
    );
  })(h, S);
  var P;
  P = (function(t) {
    'use strict';
    return (
      (t.Scale = function(e, i) {
        (this._outputMin = this.defaultArg(e, 0)),
          (this._outputMax = this.defaultArg(i, 1)),
          (this._scale = this.input = new t.Multiply(1)),
          (this._add = this.output = new t.Add(0)),
          this._scale.connect(this._add),
          this._setRange();
      }),
      t.extend(t.Scale, t.SignalBase),
      Object.defineProperty(t.Scale.prototype, 'min', {
        get: function() {
          return this._outputMin;
        },
        set: function(t) {
          (this._outputMin = t), this._setRange();
        }
      }),
      Object.defineProperty(t.Scale.prototype, 'max', {
        get: function() {
          return this._outputMax;
        },
        set: function(t) {
          (this._outputMax = t), this._setRange();
        }
      }),
      (t.Scale.prototype._setRange = function() {
        (this._add.value = this._outputMin),
          (this._scale.value = this._outputMax - this._outputMin);
      }),
      (t.Scale.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._add.dispose(),
          (this._add = null),
          this._scale.dispose(),
          (this._scale = null),
          this
        );
      }),
      t.Scale
    );
  })(h, w, A);
  var k;
  k = (function() {
    var e = S,
      i = w,
      n = A,
      r = P,
      s = h,
      a = o;
    s.setContext(a.audiocontext),
      (t.Signal = function(t) {
        var i = new e(t);
        return i;
      }),
      (e.prototype.fade = e.prototype.linearRampToValueAtTime),
      (n.prototype.fade = e.prototype.fade),
      (i.prototype.fade = e.prototype.fade),
      (r.prototype.fade = e.prototype.fade),
      (e.prototype.setInput = function(t) {
        t.connect(this);
      }),
      (n.prototype.setInput = e.prototype.setInput),
      (i.prototype.setInput = e.prototype.setInput),
      (r.prototype.setInput = e.prototype.setInput),
      (e.prototype.add = function(t) {
        var e = new i(t);
        return this.connect(e), e;
      }),
      (n.prototype.add = e.prototype.add),
      (i.prototype.add = e.prototype.add),
      (r.prototype.add = e.prototype.add),
      (e.prototype.mult = function(t) {
        var e = new n(t);
        return this.connect(e), e;
      }),
      (n.prototype.mult = e.prototype.mult),
      (i.prototype.mult = e.prototype.mult),
      (r.prototype.mult = e.prototype.mult),
      (e.prototype.scale = function(e, i, n, o) {
        var s, a;
        4 === arguments.length
          ? ((s = t.prototype.map(n, e, i, 0, 1) - 0.5),
            (a = t.prototype.map(o, e, i, 0, 1) - 0.5))
          : ((s = arguments[0]), (a = arguments[1]));
        var u = new r(s, a);
        return this.connect(u), u;
      }),
      (n.prototype.scale = e.prototype.scale),
      (i.prototype.scale = e.prototype.scale),
      (r.prototype.scale = e.prototype.scale);
  })(S, w, A, P, h, o);
  var O;
  O = (function() {
    var e = o,
      i = w,
      n = A,
      r = P;
    (t.Oscillator = function(i, n) {
      if ('string' == typeof i) {
        var o = n;
        (n = i), (i = o);
      }
      if ('number' == typeof n) {
        var o = n;
        (n = i), (i = o);
      }
      (this.started = !1),
        (this.phaseAmount = void 0),
        (this.oscillator = e.audiocontext.createOscillator()),
        (this.f = i || 440),
        (this.oscillator.type = n || 'sine'),
        this.oscillator.frequency.setValueAtTime(
          this.f,
          e.audiocontext.currentTime
        ),
        (this.output = e.audiocontext.createGain()),
        (this._freqMods = []),
        (this.output.gain.value = 0.5),
        this.output.gain.setValueAtTime(0.5, e.audiocontext.currentTime),
        this.oscillator.connect(this.output),
        (this.panPosition = 0),
        (this.connection = e.input),
        (this.panner = new t.Panner(this.output, this.connection, 1)),
        (this.mathOps = [this.output]),
        e.soundArray.push(this);
    }),
      (t.Oscillator.prototype.start = function(t, i) {
        if (this.started) {
          var n = e.audiocontext.currentTime;
          this.stop(n);
        }
        if (!this.started) {
          var o = i || this.f,
            r = this.oscillator.type;
          this.oscillator &&
            (this.oscillator.disconnect(), delete this.oscillator),
            (this.oscillator = e.audiocontext.createOscillator()),
            (this.oscillator.frequency.value = Math.abs(o)),
            (this.oscillator.type = r),
            this.oscillator.connect(this.output),
            (t = t || 0),
            this.oscillator.start(t + e.audiocontext.currentTime),
            (this.freqNode = this.oscillator.frequency);
          for (var s in this._freqMods)
            'undefined' != typeof this._freqMods[s].connect &&
              this._freqMods[s].connect(this.oscillator.frequency);
          this.started = !0;
        }
      }),
      (t.Oscillator.prototype.stop = function(t) {
        if (this.started) {
          var i = t || 0,
            n = e.audiocontext.currentTime;
          this.oscillator.stop(i + n), (this.started = !1);
        }
      }),
      (t.Oscillator.prototype.amp = function(t, i, n) {
        var o = this;
        if ('number' == typeof t) {
          var i = i || 0,
            n = n || 0,
            r = e.audiocontext.currentTime;
          this.output.gain.linearRampToValueAtTime(t, r + n + i);
        } else {
          if (!t) return this.output.gain;
          t.connect(o.output.gain);
        }
      }),
      (t.Oscillator.prototype.fade = t.Oscillator.prototype.amp),
      (t.Oscillator.prototype.getAmp = function() {
        return this.output.gain.value;
      }),
      (t.Oscillator.prototype.freq = function(t, i, n) {
        if ('number' != typeof t || isNaN(t)) {
          if (!t) return this.oscillator.frequency;
          t.output && (t = t.output),
            t.connect(this.oscillator.frequency),
            this._freqMods.push(t);
        } else {
          this.f = t;
          var o = e.audiocontext.currentTime,
            i = i || 0,
            n = n || 0;
          0 === i
            ? this.oscillator.frequency.setValueAtTime(t, n + o)
            : t > 0
            ? this.oscillator.frequency.exponentialRampToValueAtTime(
                t,
                n + i + o
              )
            : this.oscillator.frequency.linearRampToValueAtTime(t, n + i + o),
            this.phaseAmount && this.phase(this.phaseAmount);
        }
      }),
      (t.Oscillator.prototype.getFreq = function() {
        return this.oscillator.frequency.value;
      }),
      (t.Oscillator.prototype.setType = function(t) {
        this.oscillator.type = t;
      }),
      (t.Oscillator.prototype.getType = function() {
        return this.oscillator.type;
      }),
      (t.Oscillator.prototype.connect = function(t) {
        t
          ? t.hasOwnProperty('input')
            ? (this.panner.connect(t.input), (this.connection = t.input))
            : (this.panner.connect(t), (this.connection = t))
          : this.panner.connect(e.input);
      }),
      (t.Oscillator.prototype.disconnect = function() {
        this.output && this.output.disconnect(),
          this.panner &&
            (this.panner.disconnect(),
            this.output && this.output.connect(this.panner)),
          (this.oscMods = []);
      }),
      (t.Oscillator.prototype.pan = function(t, e) {
        (this.panPosition = t), this.panner.pan(t, e);
      }),
      (t.Oscillator.prototype.getPan = function() {
        return this.panPosition;
      }),
      (t.Oscillator.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        if ((e.soundArray.splice(t, 1), this.oscillator)) {
          var i = e.audiocontext.currentTime;
          this.stop(i),
            this.disconnect(),
            (this.panner = null),
            (this.oscillator = null);
        }
        this.osc2 && this.osc2.dispose();
      }),
      (t.Oscillator.prototype.phase = function(i) {
        var n = t.prototype.map(i, 0, 1, 0, 1 / this.f),
          o = e.audiocontext.currentTime;
        (this.phaseAmount = i),
          this.dNode ||
            ((this.dNode = e.audiocontext.createDelay()),
            this.oscillator.disconnect(),
            this.oscillator.connect(this.dNode),
            this.dNode.connect(this.output)),
          this.dNode.delayTime.setValueAtTime(n, o);
      });
    var s = function(t, e, i, n, o) {
      var r = t.oscillator;
      for (var s in t.mathOps)
        t.mathOps[s] instanceof o &&
          (r.disconnect(),
          t.mathOps[s].dispose(),
          (i = s),
          i < t.mathOps.length - 2 && (n = t.mathOps[s + 1]));
      return (
        i === t.mathOps.length - 1 && t.mathOps.push(n),
        s > 0 && (r = t.mathOps[s - 1]),
        r.disconnect(),
        r.connect(e),
        e.connect(n),
        (t.mathOps[i] = e),
        t
      );
    };
    (t.Oscillator.prototype.add = function(t) {
      var e = new i(t),
        n = this.mathOps.length - 1,
        o = this.output;
      return s(this, e, n, o, i);
    }),
      (t.Oscillator.prototype.mult = function(t) {
        var e = new n(t),
          i = this.mathOps.length - 1,
          o = this.output;
        return s(this, e, i, o, n);
      }),
      (t.Oscillator.prototype.scale = function(e, i, n, o) {
        var a, u;
        4 === arguments.length
          ? ((a = t.prototype.map(n, e, i, 0, 1) - 0.5),
            (u = t.prototype.map(o, e, i, 0, 1) - 0.5))
          : ((a = arguments[0]), (u = arguments[1]));
        var c = new r(a, u),
          p = this.mathOps.length - 1,
          h = this.output;
        return s(this, c, p, h, r);
      }),
      (t.SinOsc = function(e) {
        t.Oscillator.call(this, e, 'sine');
      }),
      (t.SinOsc.prototype = Object.create(t.Oscillator.prototype)),
      (t.TriOsc = function(e) {
        t.Oscillator.call(this, e, 'triangle');
      }),
      (t.TriOsc.prototype = Object.create(t.Oscillator.prototype)),
      (t.SawOsc = function(e) {
        t.Oscillator.call(this, e, 'sawtooth');
      }),
      (t.SawOsc.prototype = Object.create(t.Oscillator.prototype)),
      (t.SqrOsc = function(e) {
        t.Oscillator.call(this, e, 'square');
      }),
      (t.SqrOsc.prototype = Object.create(t.Oscillator.prototype));
  })(o, w, A, P);
  var F;
  F = (function(t) {
    'use strict';
    return (
      (t.Timeline = function() {
        var e = this.optionsObject(arguments, ['memory'], t.Timeline.defaults);
        (this._timeline = []),
          (this._toRemove = []),
          (this._iterating = !1),
          (this.memory = e.memory);
      }),
      t.extend(t.Timeline),
      (t.Timeline.defaults = { memory: 1 / 0 }),
      Object.defineProperty(t.Timeline.prototype, 'length', {
        get: function() {
          return this._timeline.length;
        }
      }),
      (t.Timeline.prototype.add = function(t) {
        if (this.isUndef(t.time))
          throw new Error('Tone.Timeline: events must have a time attribute');
        if (this._timeline.length) {
          var e = this._search(t.time);
          this._timeline.splice(e + 1, 0, t);
        } else this._timeline.push(t);
        if (this.length > this.memory) {
          var i = this.length - this.memory;
          this._timeline.splice(0, i);
        }
        return this;
      }),
      (t.Timeline.prototype.remove = function(t) {
        if (this._iterating) this._toRemove.push(t);
        else {
          var e = this._timeline.indexOf(t);
          -1 !== e && this._timeline.splice(e, 1);
        }
        return this;
      }),
      (t.Timeline.prototype.get = function(t) {
        var e = this._search(t);
        return -1 !== e ? this._timeline[e] : null;
      }),
      (t.Timeline.prototype.peek = function() {
        return this._timeline[0];
      }),
      (t.Timeline.prototype.shift = function() {
        return this._timeline.shift();
      }),
      (t.Timeline.prototype.getAfter = function(t) {
        var e = this._search(t);
        return e + 1 < this._timeline.length ? this._timeline[e + 1] : null;
      }),
      (t.Timeline.prototype.getBefore = function(t) {
        var e = this._timeline.length;
        if (e > 0 && this._timeline[e - 1].time < t)
          return this._timeline[e - 1];
        var i = this._search(t);
        return i - 1 >= 0 ? this._timeline[i - 1] : null;
      }),
      (t.Timeline.prototype.cancel = function(t) {
        if (this._timeline.length > 1) {
          var e = this._search(t);
          if (e >= 0)
            if (this._timeline[e].time === t) {
              for (var i = e; i >= 0 && this._timeline[i].time === t; i--)
                e = i;
              this._timeline = this._timeline.slice(0, e);
            } else this._timeline = this._timeline.slice(0, e + 1);
          else this._timeline = [];
        } else
          1 === this._timeline.length &&
            this._timeline[0].time >= t &&
            (this._timeline = []);
        return this;
      }),
      (t.Timeline.prototype.cancelBefore = function(t) {
        if (this._timeline.length) {
          var e = this._search(t);
          e >= 0 && (this._timeline = this._timeline.slice(e + 1));
        }
        return this;
      }),
      (t.Timeline.prototype._search = function(t) {
        var e = 0,
          i = this._timeline.length,
          n = i;
        if (i > 0 && this._timeline[i - 1].time <= t) return i - 1;
        for (; n > e; ) {
          var o = Math.floor(e + (n - e) / 2),
            r = this._timeline[o],
            s = this._timeline[o + 1];
          if (r.time === t) {
            for (var a = o; a < this._timeline.length; a++) {
              var u = this._timeline[a];
              u.time === t && (o = a);
            }
            return o;
          }
          if (r.time < t && s.time > t) return o;
          r.time > t ? (n = o) : r.time < t && (e = o + 1);
        }
        return -1;
      }),
      (t.Timeline.prototype._iterate = function(t, e, i) {
        (this._iterating = !0),
          (e = this.defaultArg(e, 0)),
          (i = this.defaultArg(i, this._timeline.length - 1));
        for (var n = e; i >= n; n++) t(this._timeline[n]);
        if (((this._iterating = !1), this._toRemove.length > 0)) {
          for (var o = 0; o < this._toRemove.length; o++) {
            var r = this._timeline.indexOf(this._toRemove[o]);
            -1 !== r && this._timeline.splice(r, 1);
          }
          this._toRemove = [];
        }
      }),
      (t.Timeline.prototype.forEach = function(t) {
        return this._iterate(t), this;
      }),
      (t.Timeline.prototype.forEachBefore = function(t, e) {
        var i = this._search(t);
        return -1 !== i && this._iterate(e, 0, i), this;
      }),
      (t.Timeline.prototype.forEachAfter = function(t, e) {
        var i = this._search(t);
        return this._iterate(e, i + 1), this;
      }),
      (t.Timeline.prototype.forEachFrom = function(t, e) {
        for (var i = this._search(t); i >= 0 && this._timeline[i].time >= t; )
          i--;
        return this._iterate(e, i + 1), this;
      }),
      (t.Timeline.prototype.forEachAtTime = function(t, e) {
        var i = this._search(t);
        return (
          -1 !== i &&
            this._iterate(
              function(i) {
                i.time === t && e(i);
              },
              0,
              i
            ),
          this
        );
      }),
      (t.Timeline.prototype.dispose = function() {
        t.prototype.dispose.call(this),
          (this._timeline = null),
          (this._toRemove = null);
      }),
      t.Timeline
    );
  })(h);
  var q;
  q = (function(t) {
    'use strict';
    return (
      (t.TimelineSignal = function() {
        var e = this.optionsObject(
          arguments,
          ['value', 'units'],
          t.Signal.defaults
        );
        (this._events = new t.Timeline(10)),
          t.Signal.apply(this, e),
          (e.param = this._param),
          t.Param.call(this, e),
          (this._initial = this._fromUnits(this._param.value));
      }),
      t.extend(t.TimelineSignal, t.Param),
      (t.TimelineSignal.Type = {
        Linear: 'linear',
        Exponential: 'exponential',
        Target: 'target',
        Curve: 'curve',
        Set: 'set'
      }),
      Object.defineProperty(t.TimelineSignal.prototype, 'value', {
        get: function() {
          var t = this.now(),
            e = this.getValueAtTime(t);
          return this._toUnits(e);
        },
        set: function(t) {
          var e = this._fromUnits(t);
          (this._initial = e),
            this.cancelScheduledValues(),
            (this._param.value = e);
        }
      }),
      (t.TimelineSignal.prototype.setValueAtTime = function(e, i) {
        return (
          (e = this._fromUnits(e)),
          (i = this.toSeconds(i)),
          this._events.add({
            type: t.TimelineSignal.Type.Set,
            value: e,
            time: i
          }),
          this._param.setValueAtTime(e, i),
          this
        );
      }),
      (t.TimelineSignal.prototype.linearRampToValueAtTime = function(e, i) {
        return (
          (e = this._fromUnits(e)),
          (i = this.toSeconds(i)),
          this._events.add({
            type: t.TimelineSignal.Type.Linear,
            value: e,
            time: i
          }),
          this._param.linearRampToValueAtTime(e, i),
          this
        );
      }),
      (t.TimelineSignal.prototype.exponentialRampToValueAtTime = function(
        e,
        i
      ) {
        i = this.toSeconds(i);
        var n = this._searchBefore(i);
        n && 0 === n.value && this.setValueAtTime(this._minOutput, n.time),
          (e = this._fromUnits(e));
        var o = Math.max(e, this._minOutput);
        return (
          this._events.add({
            type: t.TimelineSignal.Type.Exponential,
            value: o,
            time: i
          }),
          e < this._minOutput
            ? (this._param.exponentialRampToValueAtTime(
                this._minOutput,
                i - this.sampleTime
              ),
              this.setValueAtTime(0, i))
            : this._param.exponentialRampToValueAtTime(e, i),
          this
        );
      }),
      (t.TimelineSignal.prototype.setTargetAtTime = function(e, i, n) {
        return (
          (e = this._fromUnits(e)),
          (e = Math.max(this._minOutput, e)),
          (n = Math.max(this._minOutput, n)),
          (i = this.toSeconds(i)),
          this._events.add({
            type: t.TimelineSignal.Type.Target,
            value: e,
            time: i,
            constant: n
          }),
          this._param.setTargetAtTime(e, i, n),
          this
        );
      }),
      (t.TimelineSignal.prototype.setValueCurveAtTime = function(e, i, n, o) {
        o = this.defaultArg(o, 1);
        for (var r = new Array(e.length), s = 0; s < r.length; s++)
          r[s] = this._fromUnits(e[s]) * o;
        (i = this.toSeconds(i)),
          (n = this.toSeconds(n)),
          this._events.add({
            type: t.TimelineSignal.Type.Curve,
            value: r,
            time: i,
            duration: n
          }),
          this._param.setValueAtTime(r[0], i);
        for (var a = 1; a < r.length; a++) {
          var u = i + (a / (r.length - 1)) * n;
          this._param.linearRampToValueAtTime(r[a], u);
        }
        return this;
      }),
      (t.TimelineSignal.prototype.cancelScheduledValues = function(t) {
        return (
          (t = this.toSeconds(t)),
          this._events.cancel(t),
          this._param.cancelScheduledValues(t),
          this
        );
      }),
      (t.TimelineSignal.prototype.setRampPoint = function(e) {
        e = this.toSeconds(e);
        var i = this._toUnits(this.getValueAtTime(e)),
          n = this._searchBefore(e);
        if (n && n.time === e) this.cancelScheduledValues(e + this.sampleTime);
        else if (
          n &&
          n.type === t.TimelineSignal.Type.Curve &&
          n.time + n.duration > e
        )
          this.cancelScheduledValues(e), this.linearRampToValueAtTime(i, e);
        else {
          var o = this._searchAfter(e);
          o &&
            (this.cancelScheduledValues(e),
            o.type === t.TimelineSignal.Type.Linear
              ? this.linearRampToValueAtTime(i, e)
              : o.type === t.TimelineSignal.Type.Exponential &&
                this.exponentialRampToValueAtTime(i, e)),
            this.setValueAtTime(i, e);
        }
        return this;
      }),
      (t.TimelineSignal.prototype.linearRampToValueBetween = function(t, e, i) {
        return this.setRampPoint(e), this.linearRampToValueAtTime(t, i), this;
      }),
      (t.TimelineSignal.prototype.exponentialRampToValueBetween = function(
        t,
        e,
        i
      ) {
        return (
          this.setRampPoint(e), this.exponentialRampToValueAtTime(t, i), this
        );
      }),
      (t.TimelineSignal.prototype._searchBefore = function(t) {
        return this._events.get(t);
      }),
      (t.TimelineSignal.prototype._searchAfter = function(t) {
        return this._events.getAfter(t);
      }),
      (t.TimelineSignal.prototype.getValueAtTime = function(e) {
        e = this.toSeconds(e);
        var i = this._searchAfter(e),
          n = this._searchBefore(e),
          o = this._initial;
        if (null === n) o = this._initial;
        else if (n.type === t.TimelineSignal.Type.Target) {
          var r,
            s = this._events.getBefore(n.time);
          (r = null === s ? this._initial : s.value),
            (o = this._exponentialApproach(n.time, r, n.value, n.constant, e));
        } else
          o =
            n.type === t.TimelineSignal.Type.Curve
              ? this._curveInterpolate(n.time, n.value, n.duration, e)
              : null === i
              ? n.value
              : i.type === t.TimelineSignal.Type.Linear
              ? this._linearInterpolate(n.time, n.value, i.time, i.value, e)
              : i.type === t.TimelineSignal.Type.Exponential
              ? this._exponentialInterpolate(
                  n.time,
                  n.value,
                  i.time,
                  i.value,
                  e
                )
              : n.value;
        return o;
      }),
      (t.TimelineSignal.prototype.connect = t.SignalBase.prototype.connect),
      (t.TimelineSignal.prototype._exponentialApproach = function(
        t,
        e,
        i,
        n,
        o
      ) {
        return i + (e - i) * Math.exp(-(o - t) / n);
      }),
      (t.TimelineSignal.prototype._linearInterpolate = function(t, e, i, n, o) {
        return e + (n - e) * ((o - t) / (i - t));
      }),
      (t.TimelineSignal.prototype._exponentialInterpolate = function(
        t,
        e,
        i,
        n,
        o
      ) {
        return (
          (e = Math.max(this._minOutput, e)),
          e * Math.pow(n / e, (o - t) / (i - t))
        );
      }),
      (t.TimelineSignal.prototype._curveInterpolate = function(t, e, i, n) {
        var o = e.length;
        if (n >= t + i) return e[o - 1];
        if (t >= n) return e[0];
        var r = (n - t) / i,
          s = Math.floor((o - 1) * r),
          a = Math.ceil((o - 1) * r),
          u = e[s],
          c = e[a];
        return a === s ? u : this._linearInterpolate(s, u, a, c, r * (o - 1));
      }),
      (t.TimelineSignal.prototype.dispose = function() {
        t.Signal.prototype.dispose.call(this),
          t.Param.prototype.dispose.call(this),
          this._events.dispose(),
          (this._events = null);
      }),
      t.TimelineSignal
    );
  })(h, S);
  var M;
  M = (function() {
    var e = o,
      i = w,
      n = A,
      r = P,
      s = q,
      a = h;
    a.setContext(e.audiocontext),
      (t.Envelope = function(t, i, n, o, r, a) {
        (this.aTime = t || 0.1),
          (this.aLevel = i || 1),
          (this.dTime = n || 0.5),
          (this.dLevel = o || 0),
          (this.rTime = r || 0),
          (this.rLevel = a || 0),
          (this._rampHighPercentage = 0.98),
          (this._rampLowPercentage = 0.02),
          (this.output = e.audiocontext.createGain()),
          (this.control = new s()),
          this._init(),
          this.control.connect(this.output),
          (this.connection = null),
          (this.mathOps = [this.control]),
          (this.isExponential = !1),
          (this.sourceToClear = null),
          (this.wasTriggered = !1),
          e.soundArray.push(this);
      }),
      (t.Envelope.prototype._init = function() {
        var t = e.audiocontext.currentTime,
          i = t;
        this.control.setTargetAtTime(1e-5, i, 0.001),
          this._setRampAD(this.aTime, this.dTime);
      }),
      (t.Envelope.prototype.set = function(t, e, i, n, o, r) {
        (this.aTime = t),
          (this.aLevel = e),
          (this.dTime = i || 0),
          (this.dLevel = n || 0),
          (this.rTime = o || 0),
          (this.rLevel = r || 0),
          this._setRampAD(t, i);
      }),
      (t.Envelope.prototype.setADSR = function(t, e, i, n) {
        (this.aTime = t),
          (this.dTime = e || 0),
          (this.sPercent = i || 0),
          (this.dLevel =
            'undefined' != typeof i
              ? i * (this.aLevel - this.rLevel) + this.rLevel
              : 0),
          (this.rTime = n || 0),
          this._setRampAD(t, e);
      }),
      (t.Envelope.prototype.setRange = function(t, e) {
        (this.aLevel = t || 1), (this.rLevel = e || 0);
      }),
      (t.Envelope.prototype._setRampAD = function(t, e) {
        (this._rampAttackTime = this.checkExpInput(t)),
          (this._rampDecayTime = this.checkExpInput(e));
        var i = 1;
        (i = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage))),
          (this._rampAttackTC = t / this.checkExpInput(i)),
          (i = Math.log(1 / this._rampLowPercentage)),
          (this._rampDecayTC = e / this.checkExpInput(i));
      }),
      (t.Envelope.prototype.setRampPercentages = function(t, e) {
        (this._rampHighPercentage = this.checkExpInput(t)),
          (this._rampLowPercentage = this.checkExpInput(e));
        var i = 1;
        (i = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage))),
          (this._rampAttackTC = this._rampAttackTime / this.checkExpInput(i)),
          (i = Math.log(1 / this._rampLowPercentage)),
          (this._rampDecayTC = this._rampDecayTime / this.checkExpInput(i));
      }),
      (t.Envelope.prototype.setInput = function() {
        for (var t = 0; t < arguments.length; t++) this.connect(arguments[t]);
      }),
      (t.Envelope.prototype.setExp = function(t) {
        this.isExponential = t;
      }),
      (t.Envelope.prototype.checkExpInput = function(t) {
        return 0 >= t && (t = 1e-8), t;
      }),
      (t.Envelope.prototype.play = function(t, e, i) {
        var n = e || 0,
          i = i || 0;
        t && this.connection !== t && this.connect(t),
          this.triggerAttack(t, n),
          this.triggerRelease(t, n + this.aTime + this.dTime + i);
      }),
      (t.Envelope.prototype.triggerAttack = function(t, i) {
        var n = e.audiocontext.currentTime,
          o = i || 0,
          r = n + o;
        (this.lastAttack = r),
          (this.wasTriggered = !0),
          t && this.connection !== t && this.connect(t);
        var s = this.control.getValueAtTime(r);
        this.isExponential === !0
          ? this.control.exponentialRampToValueAtTime(this.checkExpInput(s), r)
          : this.control.linearRampToValueAtTime(s, r),
          (r += this.aTime),
          this.isExponential === !0
            ? (this.control.exponentialRampToValueAtTime(
                this.checkExpInput(this.aLevel),
                r
              ),
              (s = this.checkExpInput(this.control.getValueAtTime(r))),
              this.control.cancelScheduledValues(r),
              this.control.exponentialRampToValueAtTime(s, r))
            : (this.control.linearRampToValueAtTime(this.aLevel, r),
              (s = this.control.getValueAtTime(r)),
              this.control.cancelScheduledValues(r),
              this.control.linearRampToValueAtTime(s, r)),
          (r += this.dTime),
          this.isExponential === !0
            ? (this.control.exponentialRampToValueAtTime(
                this.checkExpInput(this.dLevel),
                r
              ),
              (s = this.checkExpInput(this.control.getValueAtTime(r))),
              this.control.cancelScheduledValues(r),
              this.control.exponentialRampToValueAtTime(s, r))
            : (this.control.linearRampToValueAtTime(this.dLevel, r),
              (s = this.control.getValueAtTime(r)),
              this.control.cancelScheduledValues(r),
              this.control.linearRampToValueAtTime(s, r));
      }),
      (t.Envelope.prototype.triggerRelease = function(t, i) {
        if (this.wasTriggered) {
          var n = e.audiocontext.currentTime,
            o = i || 0,
            r = n + o;
          t && this.connection !== t && this.connect(t);
          var s = this.control.getValueAtTime(r);
          this.isExponential === !0
            ? this.control.exponentialRampToValueAtTime(
                this.checkExpInput(s),
                r
              )
            : this.control.linearRampToValueAtTime(s, r),
            (r += this.rTime),
            this.isExponential === !0
              ? (this.control.exponentialRampToValueAtTime(
                  this.checkExpInput(this.rLevel),
                  r
                ),
                (s = this.checkExpInput(this.control.getValueAtTime(r))),
                this.control.cancelScheduledValues(r),
                this.control.exponentialRampToValueAtTime(s, r))
              : (this.control.linearRampToValueAtTime(this.rLevel, r),
                (s = this.control.getValueAtTime(r)),
                this.control.cancelScheduledValues(r),
                this.control.linearRampToValueAtTime(s, r)),
            (this.wasTriggered = !1);
        }
      }),
      (t.Envelope.prototype.ramp = function(t, i, n, o) {
        var r = e.audiocontext.currentTime,
          s = i || 0,
          a = r + s,
          u = this.checkExpInput(n),
          c = 'undefined' != typeof o ? this.checkExpInput(o) : void 0;
        t && this.connection !== t && this.connect(t);
        var p = this.checkExpInput(this.control.getValueAtTime(a));
        u > p
          ? (this.control.setTargetAtTime(u, a, this._rampAttackTC),
            (a += this._rampAttackTime))
          : p > u &&
            (this.control.setTargetAtTime(u, a, this._rampDecayTC),
            (a += this._rampDecayTime)),
          void 0 !== c &&
            (c > u
              ? this.control.setTargetAtTime(c, a, this._rampAttackTC)
              : u > c && this.control.setTargetAtTime(c, a, this._rampDecayTC));
      }),
      (t.Envelope.prototype.connect = function(i) {
        (this.connection = i),
          (i instanceof t.Oscillator ||
            i instanceof t.SoundFile ||
            i instanceof t.AudioIn ||
            i instanceof t.Reverb ||
            i instanceof t.Noise ||
            i instanceof t.Filter ||
            i instanceof t.Delay) &&
            (i = i.output.gain),
          i instanceof AudioParam &&
            i.setValueAtTime(0, e.audiocontext.currentTime),
          i instanceof t.Signal && i.setValue(0),
          this.output.connect(i);
      }),
      (t.Envelope.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.Envelope.prototype.add = function(e) {
        var n = new i(e),
          o = this.mathOps.length,
          r = this.output;
        return t.prototype._mathChain(this, n, o, r, i);
      }),
      (t.Envelope.prototype.mult = function(e) {
        var i = new n(e),
          o = this.mathOps.length,
          r = this.output;
        return t.prototype._mathChain(this, i, o, r, n);
      }),
      (t.Envelope.prototype.scale = function(e, i, n, o) {
        var s = new r(e, i, n, o),
          a = this.mathOps.length,
          u = this.output;
        return t.prototype._mathChain(this, s, a, u, r);
      }),
      (t.Envelope.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.disconnect(),
          this.control && (this.control.dispose(), (this.control = null));
        for (var i = 1; i < this.mathOps.length; i++) this.mathOps[i].dispose();
      }),
      (t.Env = function(e, i, n, o, r, s) {
        console.warn(
          'WARNING: p5.Env is now deprecated and may be removed in future versions. Please use the new p5.Envelope instead.'
        ),
          t.Envelope.call(this, e, i, n, o, r, s);
      }),
      (t.Env.prototype = Object.create(t.Envelope.prototype));
  })(o, w, A, P, q, h);
  var V;
  V = (function() {
    function e() {
      for (
        var t = i.audiocontext,
          e = t.createBuffer(1, 2048, t.sampleRate),
          n = e.getChannelData(0),
          o = 0;
        2048 > o;
        o++
      )
        n[o] = 1;
      var r = t.createBufferSource();
      return (r.buffer = e), (r.loop = !0), r;
    }
    var i = o;
    (t.Pulse = function(n, o) {
      t.Oscillator.call(this, n, 'sawtooth'),
        (this.w = o || 0),
        (this.osc2 = new t.SawOsc(n)),
        (this.dNode = i.audiocontext.createDelay()),
        (this.dcOffset = e()),
        (this.dcGain = i.audiocontext.createGain()),
        this.dcOffset.connect(this.dcGain),
        this.dcGain.connect(this.output),
        (this.f = n || 440);
      var r = this.w / this.oscillator.frequency.value;
      (this.dNode.delayTime.value = r),
        (this.dcGain.gain.value = 1.7 * (0.5 - this.w)),
        this.osc2.disconnect(),
        this.osc2.panner.disconnect(),
        this.osc2.amp(-1),
        this.osc2.output.connect(this.dNode),
        this.dNode.connect(this.output),
        (this.output.gain.value = 1),
        this.output.connect(this.panner);
    }),
      (t.Pulse.prototype = Object.create(t.Oscillator.prototype)),
      (t.Pulse.prototype.width = function(e) {
        if ('number' == typeof e) {
          if (1 >= e && e >= 0) {
            this.w = e;
            var i = this.w / this.oscillator.frequency.value;
            this.dNode.delayTime.value = i;
          }
          this.dcGain.gain.value = 1.7 * (0.5 - this.w);
        } else {
          e.connect(this.dNode.delayTime);
          var n = new t.SignalAdd(-0.5);
          n.setInput(e),
            (n = n.mult(-1)),
            (n = n.mult(1.7)),
            n.connect(this.dcGain.gain);
        }
      }),
      (t.Pulse.prototype.start = function(t, n) {
        var o = i.audiocontext.currentTime,
          r = n || 0;
        if (!this.started) {
          var s = t || this.f,
            a = this.oscillator.type;
          (this.oscillator = i.audiocontext.createOscillator()),
            this.oscillator.frequency.setValueAtTime(s, o),
            (this.oscillator.type = a),
            this.oscillator.connect(this.output),
            this.oscillator.start(r + o),
            (this.osc2.oscillator = i.audiocontext.createOscillator()),
            this.osc2.oscillator.frequency.setValueAtTime(s, r + o),
            (this.osc2.oscillator.type = a),
            this.osc2.oscillator.connect(this.osc2.output),
            this.osc2.start(r + o),
            (this.freqNode = [
              this.oscillator.frequency,
              this.osc2.oscillator.frequency
            ]),
            (this.dcOffset = e()),
            this.dcOffset.connect(this.dcGain),
            this.dcOffset.start(r + o),
            void 0 !== this.mods &&
              void 0 !== this.mods.frequency &&
              (this.mods.frequency.connect(this.freqNode[0]),
              this.mods.frequency.connect(this.freqNode[1])),
            (this.started = !0),
            (this.osc2.started = !0);
        }
      }),
      (t.Pulse.prototype.stop = function(t) {
        if (this.started) {
          var e = t || 0,
            n = i.audiocontext.currentTime;
          this.oscillator.stop(e + n),
            this.osc2.oscillator && this.osc2.oscillator.stop(e + n),
            this.dcOffset.stop(e + n),
            (this.started = !1),
            (this.osc2.started = !1);
        }
      }),
      (t.Pulse.prototype.freq = function(t, e, n) {
        if ('number' == typeof t) {
          this.f = t;
          var o = i.audiocontext.currentTime,
            e = e || 0,
            n = n || 0,
            r = this.oscillator.frequency.value;
          this.oscillator.frequency.cancelScheduledValues(o),
            this.oscillator.frequency.setValueAtTime(r, o + n),
            this.oscillator.frequency.exponentialRampToValueAtTime(
              t,
              n + e + o
            ),
            this.osc2.oscillator.frequency.cancelScheduledValues(o),
            this.osc2.oscillator.frequency.setValueAtTime(r, o + n),
            this.osc2.oscillator.frequency.exponentialRampToValueAtTime(
              t,
              n + e + o
            ),
            this.freqMod &&
              (this.freqMod.output.disconnect(), (this.freqMod = null));
        } else
          t.output &&
            (t.output.disconnect(),
            t.output.connect(this.oscillator.frequency),
            t.output.connect(this.osc2.oscillator.frequency),
            (this.freqMod = t));
      });
  })(o, O);
  var E;
  E = (function() {
    var e = o;
    (t.Noise = function(e) {
      var o;
      t.Oscillator.call(this),
        delete this.f,
        delete this.freq,
        delete this.oscillator,
        (o = 'brown' === e ? r : 'pink' === e ? n : i),
        (this.buffer = o);
    }),
      (t.Noise.prototype = Object.create(t.Oscillator.prototype));
    var i = (function() {
        for (
          var t = 2 * e.audiocontext.sampleRate,
            i = e.audiocontext.createBuffer(1, t, e.audiocontext.sampleRate),
            n = i.getChannelData(0),
            o = 0;
          t > o;
          o++
        )
          n[o] = 2 * Math.random() - 1;
        return (i.type = 'white'), i;
      })(),
      n = (function() {
        var t,
          i,
          n,
          o,
          r,
          s,
          a,
          u = 2 * e.audiocontext.sampleRate,
          c = e.audiocontext.createBuffer(1, u, e.audiocontext.sampleRate),
          p = c.getChannelData(0);
        t = i = n = o = r = s = a = 0;
        for (var h = 0; u > h; h++) {
          var l = 2 * Math.random() - 1;
          (t = 0.99886 * t + 0.0555179 * l),
            (i = 0.99332 * i + 0.0750759 * l),
            (n = 0.969 * n + 0.153852 * l),
            (o = 0.8665 * o + 0.3104856 * l),
            (r = 0.55 * r + 0.5329522 * l),
            (s = -0.7616 * s - 0.016898 * l),
            (p[h] = t + i + n + o + r + s + a + 0.5362 * l),
            (p[h] *= 0.11),
            (a = 0.115926 * l);
        }
        return (c.type = 'pink'), c;
      })(),
      r = (function() {
        for (
          var t = 2 * e.audiocontext.sampleRate,
            i = e.audiocontext.createBuffer(1, t, e.audiocontext.sampleRate),
            n = i.getChannelData(0),
            o = 0,
            r = 0;
          t > r;
          r++
        ) {
          var s = 2 * Math.random() - 1;
          (n[r] = (o + 0.02 * s) / 1.02), (o = n[r]), (n[r] *= 3.5);
        }
        return (i.type = 'brown'), i;
      })();
    (t.Noise.prototype.setType = function(t) {
      switch (t) {
        case 'white':
          this.buffer = i;
          break;
        case 'pink':
          this.buffer = n;
          break;
        case 'brown':
          this.buffer = r;
          break;
        default:
          this.buffer = i;
      }
      if (this.started) {
        var o = e.audiocontext.currentTime;
        this.stop(o), this.start(o + 0.01);
      }
    }),
      (t.Noise.prototype.getType = function() {
        return this.buffer.type;
      }),
      (t.Noise.prototype.start = function() {
        this.started && this.stop(),
          (this.noise = e.audiocontext.createBufferSource()),
          (this.noise.buffer = this.buffer),
          (this.noise.loop = !0),
          this.noise.connect(this.output);
        var t = e.audiocontext.currentTime;
        this.noise.start(t), (this.started = !0);
      }),
      (t.Noise.prototype.stop = function() {
        var t = e.audiocontext.currentTime;
        this.noise && (this.noise.stop(t), (this.started = !1));
      }),
      (t.Noise.prototype.dispose = function() {
        var t = e.audiocontext.currentTime,
          i = e.soundArray.indexOf(this);
        e.soundArray.splice(i, 1),
          this.noise && (this.noise.disconnect(), this.stop(t)),
          this.output && this.output.disconnect(),
          this.panner && this.panner.disconnect(),
          (this.output = null),
          (this.panner = null),
          (this.buffer = null),
          (this.noise = null);
      });
  })(o);
  var C;
  C = (function() {
    var e = o;
    (e.inputSources = []),
      (t.AudioIn = function(i) {
        (this.input = e.audiocontext.createGain()),
          (this.output = e.audiocontext.createGain()),
          (this.stream = null),
          (this.mediaStream = null),
          (this.currentSource = null),
          (this.enabled = !1),
          (this.amplitude = new t.Amplitude()),
          this.output.connect(this.amplitude.input),
          (window.MediaStreamTrack &&
            window.navigator.mediaDevices &&
            window.navigator.mediaDevices.getUserMedia) ||
            (i
              ? i()
              : window.alert(
                  'This browser does not support MediaStreamTrack and mediaDevices'
                )),
          e.soundArray.push(this);
      }),
      (t.AudioIn.prototype.start = function(t, i) {
        var n = this;
        this.stream && this.stop();
        var o = e.inputSources[n.currentSource],
          r = {
            audio: {
              sampleRate: e.audiocontext.sampleRate,
              echoCancellation: !1
            }
          };
        e.inputSources[this.currentSource] && (r.audio.deviceId = o.deviceId),
          window.navigator.mediaDevices
            .getUserMedia(r)
            .then(function(i) {
              (n.stream = i),
                (n.enabled = !0),
                (n.mediaStream = e.audiocontext.createMediaStreamSource(i)),
                n.mediaStream.connect(n.output),
                n.amplitude.setInput(n.output),
                t && t();
            })
            ['catch'](function(t) {
              i ? i(t) : console.error(t);
            });
      }),
      (t.AudioIn.prototype.stop = function() {
        this.stream &&
          (this.stream.getTracks().forEach(function(t) {
            t.stop();
          }),
          this.mediaStream.disconnect(),
          delete this.mediaStream,
          delete this.stream);
      }),
      (t.AudioIn.prototype.connect = function(t) {
        t
          ? t.hasOwnProperty('input')
            ? this.output.connect(t.input)
            : t.hasOwnProperty('analyser')
            ? this.output.connect(t.analyser)
            : this.output.connect(t)
          : this.output.connect(e.input);
      }),
      (t.AudioIn.prototype.disconnect = function() {
        this.output &&
          (this.output.disconnect(), this.output.connect(this.amplitude.input));
      }),
      (t.AudioIn.prototype.getLevel = function(t) {
        return t && (this.amplitude.smoothing = t), this.amplitude.getLevel();
      }),
      (t.AudioIn.prototype.amp = function(t, i) {
        if (i) {
          var n = i || 0,
            o = this.output.gain.value;
          this.output.gain.cancelScheduledValues(e.audiocontext.currentTime),
            this.output.gain.setValueAtTime(o, e.audiocontext.currentTime),
            this.output.gain.linearRampToValueAtTime(
              t,
              n + e.audiocontext.currentTime
            );
        } else
          this.output.gain.cancelScheduledValues(e.audiocontext.currentTime),
            this.output.gain.setValueAtTime(t, e.audiocontext.currentTime);
      }),
      (t.AudioIn.prototype.getSources = function(t, i) {
        return new Promise(function(n, o) {
          window.navigator.mediaDevices
            .enumerateDevices()
            .then(function(i) {
              (e.inputSources = i.filter(function(t) {
                return 'audioinput' === t.kind;
              })),
                n(e.inputSources),
                t && t(e.inputSources);
            })
            ['catch'](function(t) {
              o(t),
                i
                  ? i(t)
                  : console.error(
                      'This browser does not support MediaStreamTrack.getSources()'
                    );
            });
        });
      }),
      (t.AudioIn.prototype.setSource = function(t) {
        e.inputSources.length > 0 && t < e.inputSources.length
          ? ((this.currentSource = t),
            console.log('set source to ', e.inputSources[this.currentSource]))
          : console.log('unable to set input source'),
          this.stream && this.stream.active && this.start();
      }),
      (t.AudioIn.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.stop(),
          this.output && this.output.disconnect(),
          this.amplitude && this.amplitude.disconnect(),
          delete this.amplitude,
          delete this.output;
      });
  })(o);
  var R;
  R = (function(t) {
    'use strict';
    return (
      (t.Negate = function() {
        this._multiply = this.input = this.output = new t.Multiply(-1);
      }),
      t.extend(t.Negate, t.SignalBase),
      (t.Negate.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._multiply.dispose(),
          (this._multiply = null),
          this
        );
      }),
      t.Negate
    );
  })(h, A);
  var D;
  D = (function(t) {
    'use strict';
    return (
      (t.Subtract = function(e) {
        this.createInsOuts(2, 0),
          (this._sum = this.input[0] = this.output = new t.Gain()),
          (this._neg = new t.Negate()),
          (this._param = this.input[1] = new t.Signal(e)),
          this._param.chain(this._neg, this._sum);
      }),
      t.extend(t.Subtract, t.Signal),
      (t.Subtract.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._neg.dispose(),
          (this._neg = null),
          this._sum.disconnect(),
          (this._sum = null),
          this._param.dispose(),
          (this._param = null),
          this
        );
      }),
      t.Subtract
    );
  })(h, w, R, S);
  var N;
  N = (function(t) {
    'use strict';
    return (
      (t.GreaterThanZero = function() {
        (this._thresh = this.output = new t.WaveShaper(function(t) {
          return 0 >= t ? 0 : 1;
        }, 127)),
          (this._scale = this.input = new t.Multiply(1e4)),
          this._scale.connect(this._thresh);
      }),
      t.extend(t.GreaterThanZero, t.SignalBase),
      (t.GreaterThanZero.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._scale.dispose(),
          (this._scale = null),
          this._thresh.dispose(),
          (this._thresh = null),
          this
        );
      }),
      t.GreaterThanZero
    );
  })(h, S, A);
  var B;
  B = (function(t) {
    'use strict';
    return (
      (t.GreaterThan = function(e) {
        this.createInsOuts(2, 0),
          (this._param = this.input[0] = new t.Subtract(e)),
          (this.input[1] = this._param.input[1]),
          (this._gtz = this.output = new t.GreaterThanZero()),
          this._param.connect(this._gtz);
      }),
      t.extend(t.GreaterThan, t.Signal),
      (t.GreaterThan.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._param.dispose(),
          (this._param = null),
          this._gtz.dispose(),
          (this._gtz = null),
          this
        );
      }),
      t.GreaterThan
    );
  })(h, N, D);
  var U;
  U = (function(t) {
    'use strict';
    return (
      (t.Abs = function() {
        this._abs = this.input = this.output = new t.WaveShaper(function(t) {
          return 0 === t ? 0 : Math.abs(t);
        }, 127);
      }),
      t.extend(t.Abs, t.SignalBase),
      (t.Abs.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._abs.dispose(),
          (this._abs = null),
          this
        );
      }),
      t.Abs
    );
  })(h, f);
  var I;
  I = (function(t) {
    'use strict';
    return (
      (t.Modulo = function(e) {
        this.createInsOuts(1, 0),
          (this._shaper = new t.WaveShaper(Math.pow(2, 16))),
          (this._multiply = new t.Multiply()),
          (this._subtract = this.output = new t.Subtract()),
          (this._modSignal = new t.Signal(e)),
          this.input.fan(this._shaper, this._subtract),
          this._modSignal.connect(
            this._multiply,
            0,
            0
          ),
          this._shaper.connect(
            this._multiply,
            0,
            1
          ),
          this._multiply.connect(
            this._subtract,
            0,
            1
          ),
          this._setWaveShaper(e);
      }),
      t.extend(t.Modulo, t.SignalBase),
      (t.Modulo.prototype._setWaveShaper = function(t) {
        this._shaper.setMap(function(e) {
          var i = Math.floor((e + 1e-4) / t);
          return i;
        });
      }),
      Object.defineProperty(t.Modulo.prototype, 'value', {
        get: function() {
          return this._modSignal.value;
        },
        set: function(t) {
          (this._modSignal.value = t), this._setWaveShaper(t);
        }
      }),
      (t.Modulo.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._shaper.dispose(),
          (this._shaper = null),
          this._multiply.dispose(),
          (this._multiply = null),
          this._subtract.dispose(),
          (this._subtract = null),
          this._modSignal.dispose(),
          (this._modSignal = null),
          this
        );
      }),
      t.Modulo
    );
  })(h, f, A);
  var G;
  G = (function(t) {
    'use strict';
    return (
      (t.Pow = function(e) {
        (this._exp = this.defaultArg(e, 1)),
          (this._expScaler = this.input = this.output = new t.WaveShaper(
            this._expFunc(this._exp),
            8192
          ));
      }),
      t.extend(t.Pow, t.SignalBase),
      Object.defineProperty(t.Pow.prototype, 'value', {
        get: function() {
          return this._exp;
        },
        set: function(t) {
          (this._exp = t), this._expScaler.setMap(this._expFunc(this._exp));
        }
      }),
      (t.Pow.prototype._expFunc = function(t) {
        return function(e) {
          return Math.pow(Math.abs(e), t);
        };
      }),
      (t.Pow.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._expScaler.dispose(),
          (this._expScaler = null),
          this
        );
      }),
      t.Pow
    );
  })(h);
  var L;
  L = (function(t) {
    'use strict';
    return (
      (t.AudioToGain = function() {
        this._norm = this.input = this.output = new t.WaveShaper(function(t) {
          return (t + 1) / 2;
        });
      }),
      t.extend(t.AudioToGain, t.SignalBase),
      (t.AudioToGain.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._norm.dispose(),
          (this._norm = null),
          this
        );
      }),
      t.AudioToGain
    );
  })(h, f);
  var j;
  j = (function(t) {
    'use strict';
    function e(t, e, i) {
      var n = new t();
      return (
        i._eval(e[0]).connect(
          n,
          0,
          0
        ),
        i._eval(e[1]).connect(
          n,
          0,
          1
        ),
        n
      );
    }
    function i(t, e, i) {
      var n = new t();
      return (
        i._eval(e[0]).connect(
          n,
          0,
          0
        ),
        n
      );
    }
    function n(t) {
      return t ? parseFloat(t) : void 0;
    }
    function o(t) {
      return t && t.args ? parseFloat(t.args) : void 0;
    }
    return (
      (t.Expr = function() {
        var t = this._replacements(Array.prototype.slice.call(arguments)),
          e = this._parseInputs(t);
        (this._nodes = []), (this.input = new Array(e));
        for (var i = 0; e > i; i++) this.input[i] = this.context.createGain();
        var n,
          o = this._parseTree(t);
        try {
          n = this._eval(o);
        } catch (r) {
          throw (this._disposeNodes(),
          new Error('Tone.Expr: Could evaluate expression: ' + t));
        }
        this.output = n;
      }),
      t.extend(t.Expr, t.SignalBase),
      (t.Expr._Expressions = {
        value: {
          signal: {
            regexp: /^\d+\.\d+|^\d+/,
            method: function(e) {
              var i = new t.Signal(n(e));
              return i;
            }
          },
          input: {
            regexp: /^\$\d/,
            method: function(t, e) {
              return e.input[n(t.substr(1))];
            }
          }
        },
        glue: {
          '(': { regexp: /^\(/ },
          ')': { regexp: /^\)/ },
          ',': { regexp: /^,/ }
        },
        func: {
          abs: { regexp: /^abs/, method: i.bind(this, t.Abs) },
          mod: {
            regexp: /^mod/,
            method: function(e, i) {
              var n = o(e[1]),
                r = new t.Modulo(n);
              return i._eval(e[0]).connect(r), r;
            }
          },
          pow: {
            regexp: /^pow/,
            method: function(e, i) {
              var n = o(e[1]),
                r = new t.Pow(n);
              return i._eval(e[0]).connect(r), r;
            }
          },
          a2g: {
            regexp: /^a2g/,
            method: function(e, i) {
              var n = new t.AudioToGain();
              return i._eval(e[0]).connect(n), n;
            }
          }
        },
        binary: {
          '+': { regexp: /^\+/, precedence: 1, method: e.bind(this, t.Add) },
          '-': {
            regexp: /^\-/,
            precedence: 1,
            method: function(n, o) {
              return 1 === n.length ? i(t.Negate, n, o) : e(t.Subtract, n, o);
            }
          },
          '*': {
            regexp: /^\*/,
            precedence: 0,
            method: e.bind(this, t.Multiply)
          }
        },
        unary: {
          '-': { regexp: /^\-/, method: i.bind(this, t.Negate) },
          '!': { regexp: /^\!/, method: i.bind(this, t.NOT) }
        }
      }),
      (t.Expr.prototype._parseInputs = function(t) {
        var e = t.match(/\$\d/g),
          i = 0;
        if (null !== e)
          for (var n = 0; n < e.length; n++) {
            var o = parseInt(e[n].substr(1)) + 1;
            i = Math.max(i, o);
          }
        return i;
      }),
      (t.Expr.prototype._replacements = function(t) {
        for (var e = t.shift(), i = 0; i < t.length; i++)
          e = e.replace(/\%/i, t[i]);
        return e;
      }),
      (t.Expr.prototype._tokenize = function(e) {
        function i(e) {
          for (var i in t.Expr._Expressions) {
            var n = t.Expr._Expressions[i];
            for (var o in n) {
              var r = n[o],
                s = r.regexp,
                a = e.match(s);
              if (null !== a) return { type: i, value: a[0], method: r.method };
            }
          }
          throw new SyntaxError('Tone.Expr: Unexpected token ' + e);
        }
        for (var n = -1, o = []; e.length > 0; ) {
          e = e.trim();
          var r = i(e);
          o.push(r), (e = e.substr(r.value.length));
        }
        return {
          next: function() {
            return o[++n];
          },
          peek: function() {
            return o[n + 1];
          }
        };
      }),
      (t.Expr.prototype._parseTree = function(e) {
        function i(t, e) {
          return !p(t) && 'glue' === t.type && t.value === e;
        }
        function n(e, i, n) {
          var o = !1,
            r = t.Expr._Expressions[i];
          if (!p(e))
            for (var s in r) {
              var a = r[s];
              if (a.regexp.test(e.value)) {
                if (p(n)) return !0;
                if (a.precedence === n) return !0;
              }
            }
          return o;
        }
        function o(t) {
          p(t) && (t = 5);
          var e;
          e = 0 > t ? r() : o(t - 1);
          for (var i = c.peek(); n(i, 'binary', t); )
            (i = c.next()),
              (e = {
                operator: i.value,
                method: i.method,
                args: [e, o(t - 1)]
              }),
              (i = c.peek());
          return e;
        }
        function r() {
          var t, e;
          return (
            (t = c.peek()),
            n(t, 'unary')
              ? ((t = c.next()),
                (e = r()),
                { operator: t.value, method: t.method, args: [e] })
              : s()
          );
        }
        function s() {
          var t, e;
          if (((t = c.peek()), p(t)))
            throw new SyntaxError(
              'Tone.Expr: Unexpected termination of expression'
            );
          if ('func' === t.type) return (t = c.next()), a(t);
          if ('value' === t.type)
            return (t = c.next()), { method: t.method, args: t.value };
          if (i(t, '(')) {
            if ((c.next(), (e = o()), (t = c.next()), !i(t, ')')))
              throw new SyntaxError('Expected )');
            return e;
          }
          throw new SyntaxError(
            'Tone.Expr: Parse error, cannot process token ' + t.value
          );
        }
        function a(t) {
          var e,
            n = [];
          if (((e = c.next()), !i(e, '(')))
            throw new SyntaxError(
              'Tone.Expr: Expected ( in a function call "' + t.value + '"'
            );
          if (
            ((e = c.peek()), i(e, ')') || (n = u()), (e = c.next()), !i(e, ')'))
          )
            throw new SyntaxError(
              'Tone.Expr: Expected ) in a function call "' + t.value + '"'
            );
          return { method: t.method, args: n, name: name };
        }
        function u() {
          for (var t, e, n = []; ; ) {
            if (((e = o()), p(e))) break;
            if ((n.push(e), (t = c.peek()), !i(t, ','))) break;
            c.next();
          }
          return n;
        }
        var c = this._tokenize(e),
          p = this.isUndef.bind(this);
        return o();
      }),
      (t.Expr.prototype._eval = function(t) {
        if (!this.isUndef(t)) {
          var e = t.method(t.args, this);
          return this._nodes.push(e), e;
        }
      }),
      (t.Expr.prototype._disposeNodes = function() {
        for (var t = 0; t < this._nodes.length; t++) {
          var e = this._nodes[t];
          this.isFunction(e.dispose)
            ? e.dispose()
            : this.isFunction(e.disconnect) && e.disconnect(),
            (e = null),
            (this._nodes[t] = null);
        }
        this._nodes = null;
      }),
      (t.Expr.prototype.dispose = function() {
        t.prototype.dispose.call(this), this._disposeNodes();
      }),
      t.Expr
    );
  })(h, w, D, A, B, N, U, R, I, G);
  var Z;
  Z = (function(t) {
    'use strict';
    return (
      (t.EqualPowerGain = function() {
        this._eqPower = this.input = this.output = new t.WaveShaper(
          function(t) {
            return Math.abs(t) < 0.001 ? 0 : this.equalPowerScale(t);
          }.bind(this),
          4096
        );
      }),
      t.extend(t.EqualPowerGain, t.SignalBase),
      (t.EqualPowerGain.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._eqPower.dispose(),
          (this._eqPower = null),
          this
        );
      }),
      t.EqualPowerGain
    );
  })(h);
  var X;
  X = (function(t) {
    'use strict';
    return (
      (t.CrossFade = function(e) {
        this.createInsOuts(2, 1),
          (this.a = this.input[0] = new t.Gain()),
          (this.b = this.input[1] = new t.Gain()),
          (this.fade = new t.Signal(
            this.defaultArg(e, 0.5),
            t.Type.NormalRange
          )),
          (this._equalPowerA = new t.EqualPowerGain()),
          (this._equalPowerB = new t.EqualPowerGain()),
          (this._invert = new t.Expr('1 - $0')),
          this.a.connect(this.output),
          this.b.connect(this.output),
          this.fade.chain(this._equalPowerB, this.b.gain),
          this.fade.chain(this._invert, this._equalPowerA, this.a.gain),
          this._readOnly('fade');
      }),
      t.extend(t.CrossFade),
      (t.CrossFade.prototype.dispose = function() {
        return (
          t.prototype.dispose.call(this),
          this._writable('fade'),
          this._equalPowerA.dispose(),
          (this._equalPowerA = null),
          this._equalPowerB.dispose(),
          (this._equalPowerB = null),
          this.fade.dispose(),
          (this.fade = null),
          this._invert.dispose(),
          (this._invert = null),
          this.a.dispose(),
          (this.a = null),
          this.b.dispose(),
          (this.b = null),
          this
        );
      }),
      t.CrossFade
    );
  })(h, S, j, Z);
  var Y;
  Y = (function() {
    var e = o,
      i = X;
    return (
      (t.Effect = function() {
        (this.ac = e.audiocontext),
          (this.input = this.ac.createGain()),
          (this.output = this.ac.createGain()),
          (this._drywet = new i(1)),
          (this.wet = this.ac.createGain()),
          this.input.connect(this._drywet.a),
          this.wet.connect(this._drywet.b),
          this._drywet.connect(this.output),
          this.connect(),
          e.soundArray.push(this);
      }),
      (t.Effect.prototype.amp = function(t, i, n) {
        var i = i || 0,
          n = n || 0,
          o = e.audiocontext.currentTime,
          r = this.output.gain.value;
        this.output.gain.cancelScheduledValues(o),
          this.output.gain.linearRampToValueAtTime(r, o + n + 0.001),
          this.output.gain.linearRampToValueAtTime(t, o + n + i + 0.001);
      }),
      (t.Effect.prototype.chain = function() {
        if (arguments.length > 0) {
          this.connect(arguments[0]);
          for (var t = 1; t < arguments.length; t += 1)
            arguments[t - 1].connect(arguments[t]);
        }
        return this;
      }),
      (t.Effect.prototype.drywet = function(t) {
        return (
          'undefined' != typeof t && (this._drywet.fade.value = t),
          this._drywet.fade.value
        );
      }),
      (t.Effect.prototype.connect = function(e) {
        var i = e || t.soundOut.input;
        this.output.connect(i.input ? i.input : i);
      }),
      (t.Effect.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.Effect.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.input && (this.input.disconnect(), delete this.input),
          this.output && (this.output.disconnect(), delete this.output),
          this._drywet && (this._drywet.disconnect(), delete this._drywet),
          this.wet && (this.wet.disconnect(), delete this.wet),
          (this.ac = void 0);
      }),
      t.Effect
    );
  })(o, X);
  var z;
  z = (function() {
    var e = Y;
    return (
      (t.Filter = function(t) {
        e.call(this),
          (this.biquad = this.ac.createBiquadFilter()),
          this.input.connect(this.biquad),
          this.biquad.connect(this.wet),
          t && this.setType(t),
          (this._on = !0),
          (this._untoggledType = this.biquad.type);
      }),
      (t.Filter.prototype = Object.create(e.prototype)),
      (t.Filter.prototype.process = function(t, e, i, n) {
        t.connect(this.input), this.set(e, i, n);
      }),
      (t.Filter.prototype.set = function(t, e, i) {
        t && this.freq(t, i), e && this.res(e, i);
      }),
      (t.Filter.prototype.freq = function(t, e) {
        var i = e || 0;
        return (
          0 >= t && (t = 1),
          'number' == typeof t
            ? (this.biquad.frequency.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.biquad.frequency.exponentialRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.biquad.frequency),
          this.biquad.frequency.value
        );
      }),
      (t.Filter.prototype.res = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.biquad.Q.value = t),
              this.biquad.Q.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.biquad.Q.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.biquad.Q),
          this.biquad.Q.value
        );
      }),
      (t.Filter.prototype.gain = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.biquad.gain.value = t),
              this.biquad.gain.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.biquad.gain.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.biquad.gain),
          this.biquad.gain.value
        );
      }),
      (t.Filter.prototype.toggle = function() {
        return (
          (this._on = !this._on),
          this._on === !0
            ? (this.biquad.type = this._untoggledType)
            : this._on === !1 && (this.biquad.type = 'allpass'),
          this._on
        );
      }),
      (t.Filter.prototype.setType = function(t) {
        (this.biquad.type = t), (this._untoggledType = this.biquad.type);
      }),
      (t.Filter.prototype.dispose = function() {
        e.prototype.dispose.apply(this),
          this.biquad && (this.biquad.disconnect(), delete this.biquad);
      }),
      (t.LowPass = function() {
        t.Filter.call(this, 'lowpass');
      }),
      (t.LowPass.prototype = Object.create(t.Filter.prototype)),
      (t.HighPass = function() {
        t.Filter.call(this, 'highpass');
      }),
      (t.HighPass.prototype = Object.create(t.Filter.prototype)),
      (t.BandPass = function() {
        t.Filter.call(this, 'bandpass');
      }),
      (t.BandPass.prototype = Object.create(t.Filter.prototype)),
      t.Filter
    );
  })(o, Y);
  var W;
  W = (function() {
    var e = z,
      i = o,
      n = function(t, i) {
        e.call(this, 'peaking'),
          this.disconnect(),
          this.set(t, i),
          (this.biquad.gain.value = 0),
          delete this.input,
          delete this.output,
          delete this._drywet,
          delete this.wet;
      };
    return (
      (n.prototype = Object.create(e.prototype)),
      (n.prototype.amp = function() {
        console.warn('`amp()` is not available for p5.EQ bands. Use `.gain()`');
      }),
      (n.prototype.drywet = function() {
        console.warn('`drywet()` is not available for p5.EQ bands.');
      }),
      (n.prototype.connect = function(e) {
        var i = e || t.soundOut.input;
        this.biquad
          ? this.biquad.connect(i.input ? i.input : i)
          : this.output.connect(i.input ? i.input : i);
      }),
      (n.prototype.disconnect = function() {
        this.biquad && this.biquad.disconnect();
      }),
      (n.prototype.dispose = function() {
        var t = i.soundArray.indexOf(this);
        i.soundArray.splice(t, 1), this.disconnect(), delete this.biquad;
      }),
      n
    );
  })(z, o);
  var Q;
  Q = (function() {
    var e = Y,
      i = W;
    return (
      (t.EQ = function(t) {
        e.call(this), (t = 3 === t || 8 === t ? t : 3);
        var i;
        (i = 3 === t ? Math.pow(2, 3) : 2), (this.bands = []);
        for (var n, o, r = 0; t > r; r++)
          r === t - 1
            ? ((n = 21e3), (o = 0.01))
            : 0 === r
            ? ((n = 100), (o = 0.1))
            : 1 === r
            ? ((n = 3 === t ? 360 * i : 360), (o = 1))
            : ((n = this.bands[r - 1].freq() * i), (o = 1)),
            (this.bands[r] = this._newBand(n, o)),
            r > 0
              ? this.bands[r - 1].connect(this.bands[r].biquad)
              : this.input.connect(this.bands[r].biquad);
        this.bands[t - 1].connect(this.output);
      }),
      (t.EQ.prototype = Object.create(e.prototype)),
      (t.EQ.prototype.process = function(t) {
        t.connect(this.input);
      }),
      (t.EQ.prototype.set = function() {
        if (arguments.length === 2 * this.bands.length)
          for (var t = 0; t < arguments.length; t += 2)
            this.bands[t / 2].freq(arguments[t]),
              this.bands[t / 2].gain(arguments[t + 1]);
        else
          console.error(
            'Argument mismatch. .set() should be called with ' +
              2 * this.bands.length +
              ' arguments. (one frequency and gain value pair for each band of the eq)'
          );
      }),
      (t.EQ.prototype._newBand = function(t, e) {
        return new i(t, e);
      }),
      (t.EQ.prototype.dispose = function() {
        if ((e.prototype.dispose.apply(this), this.bands)) {
          for (; this.bands.length > 0; ) delete this.bands.pop().dispose();
          delete this.bands;
        }
      }),
      t.EQ
    );
  })(Y, W);
  var H;
  H = (function() {
    var e = Y;
    return (
      (t.Panner3D = function() {
        e.call(this),
          (this.panner = this.ac.createPanner()),
          (this.panner.panningModel = 'HRTF'),
          (this.panner.distanceModel = 'linear'),
          this.panner.connect(this.output),
          this.input.connect(this.panner);
      }),
      (t.Panner3D.prototype = Object.create(e.prototype)),
      (t.Panner3D.prototype.process = function(t) {
        t.connect(this.input);
      }),
      (t.Panner3D.prototype.set = function(t, e, i, n) {
        return (
          this.positionX(t, n),
          this.positionY(e, n),
          this.positionZ(i, n),
          [
            this.panner.positionX.value,
            this.panner.positionY.value,
            this.panner.positionZ.value
          ]
        );
      }),
      (t.Panner3D.prototype.positionX = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.positionX.value = t),
              this.panner.positionX.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.positionX.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.positionX),
          this.panner.positionX.value
        );
      }),
      (t.Panner3D.prototype.positionY = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.positionY.value = t),
              this.panner.positionY.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.positionY.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.positionY),
          this.panner.positionY.value
        );
      }),
      (t.Panner3D.prototype.positionZ = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.positionZ.value = t),
              this.panner.positionZ.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.positionZ.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.positionZ),
          this.panner.positionZ.value
        );
      }),
      (t.Panner3D.prototype.orient = function(t, e, i, n) {
        return (
          this.orientX(t, n),
          this.orientY(e, n),
          this.orientZ(i, n),
          [
            this.panner.orientationX.value,
            this.panner.orientationY.value,
            this.panner.orientationZ.value
          ]
        );
      }),
      (t.Panner3D.prototype.orientX = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.orientationX.value = t),
              this.panner.orientationX.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.orientationX.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.orientationX),
          this.panner.orientationX.value
        );
      }),
      (t.Panner3D.prototype.orientY = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.orientationY.value = t),
              this.panner.orientationY.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.orientationY.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.orientationY),
          this.panner.orientationY.value
        );
      }),
      (t.Panner3D.prototype.orientZ = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.panner.orientationZ.value = t),
              this.panner.orientationZ.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.panner.orientationZ.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.panner.orientationZ),
          this.panner.orientationZ.value
        );
      }),
      (t.Panner3D.prototype.setFalloff = function(t, e) {
        this.maxDist(t), this.rolloff(e);
      }),
      (t.Panner3D.prototype.maxDist = function(t) {
        return (
          'number' == typeof t && (this.panner.maxDistance = t),
          this.panner.maxDistance
        );
      }),
      (t.Panner3D.prototype.rolloff = function(t) {
        return (
          'number' == typeof t && (this.panner.rolloffFactor = t),
          this.panner.rolloffFactor
        );
      }),
      (t.Panner3D.dispose = function() {
        e.prototype.dispose.apply(this),
          this.panner && (this.panner.disconnect(), delete this.panner);
      }),
      t.Panner3D
    );
  })(o, Y);
  var $;
  $ = (function() {
    var e = o;
    return (
      (t.Listener3D = function(t) {
        (this.ac = e.audiocontext), (this.listener = this.ac.listener);
      }),
      (t.Listener3D.prototype.process = function(t) {
        t.connect(this.input);
      }),
      (t.Listener3D.prototype.position = function(t, e, i, n) {
        return (
          this.positionX(t, n),
          this.positionY(e, n),
          this.positionZ(i, n),
          [
            this.listener.positionX.value,
            this.listener.positionY.value,
            this.listener.positionZ.value
          ]
        );
      }),
      (t.Listener3D.prototype.positionX = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.positionX.value = t),
              this.listener.positionX.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.positionX.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.positionX),
          this.listener.positionX.value
        );
      }),
      (t.Listener3D.prototype.positionY = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.positionY.value = t),
              this.listener.positionY.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.positionY.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.positionY),
          this.listener.positionY.value
        );
      }),
      (t.Listener3D.prototype.positionZ = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.positionZ.value = t),
              this.listener.positionZ.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.positionZ.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.positionZ),
          this.listener.positionZ.value
        );
      }),
      (t.Listener3D.prototype.orient = function(t, e, i, n, o, r, s) {
        return (
          3 === arguments.length || 4 === arguments.length
            ? ((s = arguments[3]), this.orientForward(t, e, i, s))
            : (6 === arguments.length || 7 === arguments) &&
              (this.orientForward(t, e, i), this.orientUp(n, o, r, s)),
          [
            this.listener.forwardX.value,
            this.listener.forwardY.value,
            this.listener.forwardZ.value,
            this.listener.upX.value,
            this.listener.upY.value,
            this.listener.upZ.value
          ]
        );
      }),
      (t.Listener3D.prototype.orientForward = function(t, e, i, n) {
        return (
          this.forwardX(t, n),
          this.forwardY(e, n),
          this.forwardZ(i, n),
          [
            this.listener.forwardX,
            this.listener.forwardY,
            this.listener.forwardZ
          ]
        );
      }),
      (t.Listener3D.prototype.orientUp = function(t, e, i, n) {
        return (
          this.upX(t, n),
          this.upY(e, n),
          this.upZ(i, n),
          [this.listener.upX, this.listener.upY, this.listener.upZ]
        );
      }),
      (t.Listener3D.prototype.forwardX = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.forwardX.value = t),
              this.listener.forwardX.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.forwardX.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.forwardX),
          this.listener.forwardX.value
        );
      }),
      (t.Listener3D.prototype.forwardY = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.forwardY.value = t),
              this.listener.forwardY.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.forwardY.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.forwardY),
          this.listener.forwardY.value
        );
      }),
      (t.Listener3D.prototype.forwardZ = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.forwardZ.value = t),
              this.listener.forwardZ.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.forwardZ.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.forwardZ),
          this.listener.forwardZ.value
        );
      }),
      (t.Listener3D.prototype.upX = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.upX.value = t),
              this.listener.upX.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.upX.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.upX),
          this.listener.upX.value
        );
      }),
      (t.Listener3D.prototype.upY = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.upY.value = t),
              this.listener.upY.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.upY.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.upY),
          this.listener.upY.value
        );
      }),
      (t.Listener3D.prototype.upZ = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.listener.upZ.value = t),
              this.listener.upZ.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.listener.upZ.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : t && t.connect(this.listener.upZ),
          this.listener.upZ.value
        );
      }),
      t.Listener3D
    );
  })(o, Y);
  var J;
  J = (function() {
    var e = z,
      i = Y;
    (t.Delay = function() {
      i.call(this),
        (this._split = this.ac.createChannelSplitter(2)),
        (this._merge = this.ac.createChannelMerger(2)),
        (this._leftGain = this.ac.createGain()),
        (this._rightGain = this.ac.createGain()),
        (this.leftDelay = this.ac.createDelay()),
        (this.rightDelay = this.ac.createDelay()),
        (this._leftFilter = new e()),
        (this._rightFilter = new e()),
        this._leftFilter.disconnect(),
        this._rightFilter.disconnect(),
        this._leftFilter.biquad.frequency.setValueAtTime(
          1200,
          this.ac.currentTime
        ),
        this._rightFilter.biquad.frequency.setValueAtTime(
          1200,
          this.ac.currentTime
        ),
        this._leftFilter.biquad.Q.setValueAtTime(0.3, this.ac.currentTime),
        this._rightFilter.biquad.Q.setValueAtTime(0.3, this.ac.currentTime),
        this.input.connect(this._split),
        this.leftDelay.connect(this._leftGain),
        this.rightDelay.connect(this._rightGain),
        this._leftGain.connect(this._leftFilter.input),
        this._rightGain.connect(this._rightFilter.input),
        this._merge.connect(this.wet),
        this._leftFilter.biquad.gain.setValueAtTime(1, this.ac.currentTime),
        this._rightFilter.biquad.gain.setValueAtTime(1, this.ac.currentTime),
        this.setType(0),
        (this._maxDelay = this.leftDelay.delayTime.maxValue),
        this.feedback(0.5);
    }),
      (t.Delay.prototype = Object.create(i.prototype)),
      (t.Delay.prototype.process = function(t, e, i, n) {
        var o = i || 0,
          r = e || 0;
        if (o >= 1)
          throw new Error(
            'Feedback value will force a positive feedback loop.'
          );
        if (r >= this._maxDelay)
          throw new Error(
            'Delay Time exceeds maximum delay time of ' +
              this._maxDelay +
              ' second.'
          );
        t.connect(this.input),
          this.leftDelay.delayTime.setValueAtTime(r, this.ac.currentTime),
          this.rightDelay.delayTime.setValueAtTime(r, this.ac.currentTime),
          (this._leftGain.gain.value = o),
          (this._rightGain.gain.value = o),
          n && (this._leftFilter.freq(n), this._rightFilter.freq(n));
      }),
      (t.Delay.prototype.delayTime = function(t) {
        'number' != typeof t
          ? (t.connect(this.leftDelay.delayTime),
            t.connect(this.rightDelay.delayTime))
          : (this.leftDelay.delayTime.cancelScheduledValues(
              this.ac.currentTime
            ),
            this.rightDelay.delayTime.cancelScheduledValues(
              this.ac.currentTime
            ),
            this.leftDelay.delayTime.linearRampToValueAtTime(
              t,
              this.ac.currentTime
            ),
            this.rightDelay.delayTime.linearRampToValueAtTime(
              t,
              this.ac.currentTime
            ));
      }),
      (t.Delay.prototype.feedback = function(t) {
        if (t && 'number' != typeof t)
          t.connect(this._leftGain.gain), t.connect(this._rightGain.gain);
        else {
          if (t >= 1)
            throw new Error(
              'Feedback value will force a positive feedback loop.'
            );
          'number' == typeof t &&
            ((this._leftGain.gain.value = t), (this._rightGain.gain.value = t));
        }
        return this._leftGain.gain.value;
      }),
      (t.Delay.prototype.filter = function(t, e) {
        this._leftFilter.set(t, e), this._rightFilter.set(t, e);
      }),
      (t.Delay.prototype.setType = function(t) {
        switch (
          (1 === t && (t = 'pingPong'),
          this._split.disconnect(),
          this._leftFilter.disconnect(),
          this._rightFilter.disconnect(),
          this._split.connect(
            this.leftDelay,
            0
          ),
          this._split.connect(
            this.rightDelay,
            1
          ),
          t)
        ) {
          case 'pingPong':
            this._rightFilter.setType(this._leftFilter.biquad.type),
              this._leftFilter.output.connect(
                this._merge,
                0,
                0
              ),
              this._rightFilter.output.connect(
                this._merge,
                0,
                1
              ),
              this._leftFilter.output.connect(this.rightDelay),
              this._rightFilter.output.connect(this.leftDelay);
            break;
          default:
            this._leftFilter.output.connect(
              this._merge,
              0,
              0
            ),
              this._rightFilter.output.connect(
                this._merge,
                0,
                1
              ),
              this._leftFilter.output.connect(this.leftDelay),
              this._rightFilter.output.connect(this.rightDelay);
        }
      }),
      (t.Delay.prototype.dispose = function() {
        i.prototype.dispose.apply(this),
          this._split.disconnect(),
          this._leftFilter.dispose(),
          this._rightFilter.dispose(),
          this._merge.disconnect(),
          this._leftGain.disconnect(),
          this._rightGain.disconnect(),
          this.leftDelay.disconnect(),
          this.rightDelay.disconnect(),
          (this._split = void 0),
          (this._leftFilter = void 0),
          (this._rightFilter = void 0),
          (this._merge = void 0),
          (this._leftGain = void 0),
          (this._rightGain = void 0),
          (this.leftDelay = void 0),
          (this.rightDelay = void 0);
      });
  })(z, Y);
  var K;
  K = (function() {
    var e = s,
      i = Y;
    (t.Reverb = function() {
      i.call(this),
        this._initConvolverNode(),
        (this.input.gain.value = 0.5),
        (this._seconds = 3),
        (this._decay = 2),
        (this._reverse = !1),
        this._buildImpulse();
    }),
      (t.Reverb.prototype = Object.create(i.prototype)),
      (t.Reverb.prototype._initConvolverNode = function() {
        (this.convolverNode = this.ac.createConvolver()),
          this.input.connect(this.convolverNode),
          this.convolverNode.connect(this.wet);
      }),
      (t.Reverb.prototype._teardownConvolverNode = function() {
        this.convolverNode &&
          (this.convolverNode.disconnect(), delete this.convolverNode);
      }),
      (t.Reverb.prototype._setBuffer = function(t) {
        this._teardownConvolverNode(),
          this._initConvolverNode(),
          (this.convolverNode.buffer = t);
      }),
      (t.Reverb.prototype.process = function(t, e, i, n) {
        t.connect(this.input);
        var o = !1;
        e && ((this._seconds = e), (o = !0)),
          i && (this._decay = i),
          n && (this._reverse = n),
          o && this._buildImpulse();
      }),
      (t.Reverb.prototype.set = function(t, e, i) {
        var n = !1;
        t && ((this._seconds = t), (n = !0)),
          e && (this._decay = e),
          i && (this._reverse = i),
          n && this._buildImpulse();
      }),
      (t.Reverb.prototype._buildImpulse = function() {
        var t,
          e,
          i = this.ac.sampleRate,
          n = i * this._seconds,
          o = this._decay,
          r = this.ac.createBuffer(2, n, i),
          s = r.getChannelData(0),
          a = r.getChannelData(1);
        for (e = 0; n > e; e++)
          (t = this._reverse ? n - e : e),
            (s[e] = (2 * Math.random() - 1) * Math.pow(1 - t / n, o)),
            (a[e] = (2 * Math.random() - 1) * Math.pow(1 - t / n, o));
        this._setBuffer(r);
      }),
      (t.Reverb.prototype.dispose = function() {
        i.prototype.dispose.apply(this), this._teardownConvolverNode();
      }),
      (t.Convolver = function(e, i, n) {
        t.Reverb.call(this),
          this._initConvolverNode(),
          (this.input.gain.value = 0.5),
          e
            ? ((this.impulses = []), this._loadBuffer(e, i, n))
            : ((this._seconds = 3),
              (this._decay = 2),
              (this._reverse = !1),
              this._buildImpulse());
      }),
      (t.Convolver.prototype = Object.create(t.Reverb.prototype)),
      t.prototype.registerPreloadMethod('createConvolver', t.prototype),
      (t.prototype.createConvolver = function(e, i, n) {
        window.location.origin.indexOf('file://') > -1 &&
          'undefined' === window.cordova &&
          alert(
            'This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS'
          );
        var o = this,
          r = new t.Convolver(
            e,
            function(t) {
              'function' == typeof i && i(t),
                'function' == typeof o._decrementPreload &&
                  o._decrementPreload();
            },
            n
          );
        return (r.impulses = []), r;
      }),
      (t.Convolver.prototype._loadBuffer = function(i, n, o) {
        var i = t.prototype._checkFileFormats(i),
          r = this,
          s = new Error().stack,
          a = t.prototype.getAudioContext(),
          u = new XMLHttpRequest();
        u.open('GET', i, !0),
          (u.responseType = 'arraybuffer'),
          (u.onload = function() {
            if (200 === u.status)
              a.decodeAudioData(
                u.response,
                function(t) {
                  var e = {},
                    o = i.split('/');
                  (e.name = o[o.length - 1]),
                    (e.audioBuffer = t),
                    r.impulses.push(e),
                    r._setBuffer(e.audioBuffer),
                    n && n(e);
                },
                function() {
                  var t = new e('decodeAudioData', s, r.url),
                    i = 'AudioContext error at decodeAudioData for ' + r.url;
                  o
                    ? ((t.msg = i), o(t))
                    : console.error(
                        i + '\n The error stack trace includes: \n' + t.stack
                      );
                }
              );
            else {
              var t = new e('loadConvolver', s, r.url),
                c =
                  'Unable to load ' +
                  r.url +
                  '. The request status was: ' +
                  u.status +
                  ' (' +
                  u.statusText +
                  ')';
              o
                ? ((t.message = c), o(t))
                : console.error(
                    c + '\n The error stack trace includes: \n' + t.stack
                  );
            }
          }),
          (u.onerror = function() {
            var t = new e('loadConvolver', s, r.url),
              i =
                'There was no response from the server at ' +
                r.url +
                '. Check the url and internet connectivity.';
            o
              ? ((t.message = i), o(t))
              : console.error(
                  i + '\n The error stack trace includes: \n' + t.stack
                );
          }),
          u.send();
      }),
      (t.Convolver.prototype.set = null),
      (t.Convolver.prototype.process = function(t) {
        t.connect(this.input);
      }),
      (t.Convolver.prototype.impulses = []),
      (t.Convolver.prototype.addImpulse = function(t, e, i) {
        window.location.origin.indexOf('file://') > -1 &&
          'undefined' === window.cordova &&
          alert(
            'This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS'
          ),
          this._loadBuffer(t, e, i);
      }),
      (t.Convolver.prototype.resetImpulse = function(t, e, i) {
        window.location.origin.indexOf('file://') > -1 &&
          'undefined' === window.cordova &&
          alert(
            'This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS'
          ),
          (this.impulses = []),
          this._loadBuffer(t, e, i);
      }),
      (t.Convolver.prototype.toggleImpulse = function(t) {
        if (
          ('number' == typeof t &&
            t < this.impulses.length &&
            this._setBuffer(this.impulses[t].audioBuffer),
          'string' == typeof t)
        )
          for (var e = 0; e < this.impulses.length; e++)
            if (this.impulses[e].name === t) {
              this._setBuffer(this.impulses[e].audioBuffer);
              break;
            }
      }),
      (t.Convolver.prototype.dispose = function() {
        t.Reverb.prototype.dispose.apply(this);
        for (var e in this.impulses)
          this.impulses[e] && (this.impulses[e] = null);
      });
  })(s, Y);
  var tt;
  tt = (function(t) {
    'use strict';
    return (
      (t.TimelineState = function(e) {
        t.Timeline.call(this), (this._initial = e);
      }),
      t.extend(t.TimelineState, t.Timeline),
      (t.TimelineState.prototype.getValueAtTime = function(t) {
        var e = this.get(t);
        return null !== e ? e.state : this._initial;
      }),
      (t.TimelineState.prototype.setStateAtTime = function(t, e) {
        this.add({ state: t, time: e });
      }),
      t.TimelineState
    );
  })(h, F);
  var et;
  et = (function(t) {
    'use strict';
    return (
      (t.Clock = function() {
        t.Emitter.call(this);
        var e = this.optionsObject(
          arguments,
          ['callback', 'frequency'],
          t.Clock.defaults
        );
        (this.callback = e.callback),
          (this._nextTick = 0),
          (this._lastState = t.State.Stopped),
          (this.frequency = new t.TimelineSignal(
            e.frequency,
            t.Type.Frequency
          )),
          this._readOnly('frequency'),
          (this.ticks = 0),
          (this._state = new t.TimelineState(t.State.Stopped)),
          (this._boundLoop = this._loop.bind(this)),
          this.context.on('tick', this._boundLoop);
      }),
      t.extend(t.Clock, t.Emitter),
      (t.Clock.defaults = {
        callback: t.noOp,
        frequency: 1,
        lookAhead: 'auto'
      }),
      Object.defineProperty(t.Clock.prototype, 'state', {
        get: function() {
          return this._state.getValueAtTime(this.now());
        }
      }),
      (t.Clock.prototype.start = function(e, i) {
        return (
          (e = this.toSeconds(e)),
          this._state.getValueAtTime(e) !== t.State.Started &&
            this._state.add({ state: t.State.Started, time: e, offset: i }),
          this
        );
      }),
      (t.Clock.prototype.stop = function(e) {
        return (
          (e = this.toSeconds(e)),
          this._state.cancel(e),
          this._state.setStateAtTime(t.State.Stopped, e),
          this
        );
      }),
      (t.Clock.prototype.pause = function(e) {
        return (
          (e = this.toSeconds(e)),
          this._state.getValueAtTime(e) === t.State.Started &&
            this._state.setStateAtTime(t.State.Paused, e),
          this
        );
      }),
      (t.Clock.prototype._loop = function() {
        for (
          var e = this.now(),
            i = this.context.lookAhead,
            n = this.context.updateInterval,
            o = 2 * this.context.lag,
            r = e + i + n + o;
          r > this._nextTick && this._state;

        ) {
          var s = this._state.getValueAtTime(this._nextTick);
          if (s !== this._lastState) {
            this._lastState = s;
            var a = this._state.get(this._nextTick);
            s === t.State.Started
              ? ((this._nextTick = a.time),
                this.isUndef(a.offset) || (this.ticks = a.offset),
                this.emit('start', a.time, this.ticks))
              : s === t.State.Stopped
              ? ((this.ticks = 0), this.emit('stop', a.time))
              : s === t.State.Paused && this.emit('pause', a.time);
          }
          var u = this._nextTick;
          this.frequency &&
            ((this._nextTick +=
              1 / this.frequency.getValueAtTime(this._nextTick)),
            s === t.State.Started && (this.callback(u), this.ticks++));
        }
      }),
      (t.Clock.prototype.getStateAtTime = function(t) {
        return (t = this.toSeconds(t)), this._state.getValueAtTime(t);
      }),
      (t.Clock.prototype.dispose = function() {
        t.Emitter.prototype.dispose.call(this),
          this.context.off('tick', this._boundLoop),
          this._writable('frequency'),
          this.frequency.dispose(),
          (this.frequency = null),
          (this._boundLoop = null),
          (this._nextTick = 1 / 0),
          (this.callback = null),
          this._state.dispose(),
          (this._state = null);
      }),
      t.Clock
    );
  })(h, q, tt, g);
  var it;
  it = (function() {
    var e = o,
      i = et;
    (t.Metro = function() {
      (this.clock = new i({ callback: this.ontick.bind(this) })),
        (this.syncedParts = []),
        (this.bpm = 120),
        this._init(),
        (this.prevTick = 0),
        (this.tatumTime = 0),
        (this.tickCallback = function() {});
    }),
      (t.Metro.prototype.ontick = function(t) {
        var i = t - this.prevTick,
          n = t - e.audiocontext.currentTime;
        if (!(i - this.tatumTime <= -0.02)) {
          this.prevTick = t;
          var o = this;
          this.syncedParts.forEach(function(t) {
            t.isPlaying &&
              (t.incrementStep(n),
              t.phrases.forEach(function(t) {
                var e = t.sequence,
                  i = o.metroTicks % e.length;
                0 !== e[i] &&
                  (o.metroTicks < e.length || !t.looping) &&
                  t.callback(n, e[i]);
              }));
          }),
            (this.metroTicks += 1),
            this.tickCallback(n);
        }
      }),
      (t.Metro.prototype.setBPM = function(t, i) {
        var n = 60 / (t * this.tatums),
          o = e.audiocontext.currentTime;
        this.tatumTime = n;
        var i = i || 0;
        this.clock.frequency.setValueAtTime(this.clock.frequency.value, o),
          this.clock.frequency.linearRampToValueAtTime(t, o + i),
          (this.bpm = t);
      }),
      (t.Metro.prototype.getBPM = function() {
        return (this.clock.getRate() / this.tatums) * 60;
      }),
      (t.Metro.prototype._init = function() {
        this.metroTicks = 0;
      }),
      (t.Metro.prototype.resetSync = function(t) {
        this.syncedParts = [t];
      }),
      (t.Metro.prototype.pushSync = function(t) {
        this.syncedParts.push(t);
      }),
      (t.Metro.prototype.start = function(t) {
        var i = t || 0,
          n = e.audiocontext.currentTime;
        this.clock.start(n + i), this.setBPM(this.bpm);
      }),
      (t.Metro.prototype.stop = function(t) {
        var i = t || 0,
          n = e.audiocontext.currentTime;
        this.clock.stop(n + i);
      }),
      (t.Metro.prototype.beatLength = function(t) {
        this.tatums = 1 / t / 4;
      });
  })(o, et);
  var nt;
  nt = (function() {
    function e(t) {
      t.currentPart++,
        t.currentPart >= t.parts.length
          ? ((t.scoreStep = 0), t.onended())
          : ((t.scoreStep = 0),
            t.parts[t.currentPart - 1].stop(),
            t.parts[t.currentPart].start());
    }
    var i = o,
      n = 120;
    (t.prototype.setBPM = function(t, e) {
      n = t;
      for (var o in i.parts) i.parts[o] && i.parts[o].setBPM(t, e);
    }),
      (t.Phrase = function(t, e, i) {
        (this.phraseStep = 0),
          (this.name = t),
          (this.callback = e),
          (this.sequence = i);
      }),
      (t.Part = function(e, o) {
        (this.length = e || 0),
          (this.partStep = 0),
          (this.phrases = []),
          (this.isPlaying = !1),
          this.noLoop(),
          (this.tatums = o || 0.0625),
          (this.metro = new t.Metro()),
          this.metro._init(),
          this.metro.beatLength(this.tatums),
          this.metro.setBPM(n),
          i.parts.push(this),
          (this.callback = function() {});
      }),
      (t.Part.prototype.setBPM = function(t, e) {
        this.metro.setBPM(t, e);
      }),
      (t.Part.prototype.getBPM = function() {
        return this.metro.getBPM();
      }),
      (t.Part.prototype.start = function(t) {
        if (!this.isPlaying) {
          (this.isPlaying = !0), this.metro.resetSync(this);
          var e = t || 0;
          this.metro.start(e);
        }
      }),
      (t.Part.prototype.loop = function(t) {
        (this.looping = !0),
          (this.onended = function() {
            this.partStep = 0;
          });
        var e = t || 0;
        this.start(e);
      }),
      (t.Part.prototype.noLoop = function() {
        (this.looping = !1),
          (this.onended = function() {
            this.stop();
          });
      }),
      (t.Part.prototype.stop = function(t) {
        (this.partStep = 0), this.pause(t);
      }),
      (t.Part.prototype.pause = function(t) {
        this.isPlaying = !1;
        var e = t || 0;
        this.metro.stop(e);
      }),
      (t.Part.prototype.addPhrase = function(e, i, n) {
        var o;
        if (3 === arguments.length) o = new t.Phrase(e, i, n);
        else {
          if (!(arguments[0] instanceof t.Phrase))
            throw 'invalid input. addPhrase accepts name, callback, array or a p5.Phrase';
          o = arguments[0];
        }
        this.phrases.push(o),
          o.sequence.length > this.length && (this.length = o.sequence.length);
      }),
      (t.Part.prototype.removePhrase = function(t) {
        for (var e in this.phrases)
          this.phrases[e].name === t && this.phrases.splice(e, 1);
      }),
      (t.Part.prototype.getPhrase = function(t) {
        for (var e in this.phrases)
          if (this.phrases[e].name === t) return this.phrases[e];
      }),
      (t.Part.prototype.replaceSequence = function(t, e) {
        for (var i in this.phrases)
          this.phrases[i].name === t && (this.phrases[i].sequence = e);
      }),
      (t.Part.prototype.incrementStep = function(t) {
        this.partStep < this.length - 1
          ? (this.callback(t), (this.partStep += 1))
          : this.looping ||
            this.partStep !== this.length - 1 ||
            (console.log('done'), this.onended());
      }),
      (t.Part.prototype.onStep = function(t) {
        this.callback = t;
      }),
      (t.Score = function() {
        (this.parts = []), (this.currentPart = 0);
        var t = this;
        for (var i in arguments)
          arguments[i] &&
            this.parts[i] &&
            ((this.parts[i] = arguments[i]),
            (this.parts[i].nextPart = this.parts[i + 1]),
            (this.parts[i].onended = function() {
              t.resetPart(i), e(t);
            }));
        this.looping = !1;
      }),
      (t.Score.prototype.onended = function() {
        this.looping
          ? this.parts[0].start()
          : (this.parts[this.parts.length - 1].onended = function() {
              this.stop(), this.resetParts();
            }),
          (this.currentPart = 0);
      }),
      (t.Score.prototype.start = function() {
        this.parts[this.currentPart].start(), (this.scoreStep = 0);
      }),
      (t.Score.prototype.stop = function() {
        this.parts[this.currentPart].stop(),
          (this.currentPart = 0),
          (this.scoreStep = 0);
      }),
      (t.Score.prototype.pause = function() {
        this.parts[this.currentPart].stop();
      }),
      (t.Score.prototype.loop = function() {
        (this.looping = !0), this.start();
      }),
      (t.Score.prototype.noLoop = function() {
        this.looping = !1;
      }),
      (t.Score.prototype.resetParts = function() {
        var t = this;
        this.parts.forEach(function(e) {
          t.resetParts[e];
        });
      }),
      (t.Score.prototype.resetPart = function(t) {
        this.parts[t].stop(), (this.parts[t].partStep = 0);
        for (var e in this.parts[t].phrases)
          this.parts[t] && (this.parts[t].phrases[e].phraseStep = 0);
      }),
      (t.Score.prototype.setBPM = function(t, e) {
        for (var i in this.parts) this.parts[i] && this.parts[i].setBPM(t, e);
      });
  })(o);
  var ot;
  ot = (function() {
    var e = o,
      i = et;
    return (
      (t.SoundLoop = function(t, n) {
        (this.callback = t),
          (this.musicalTimeMode = 'number' == typeof this._interval ? !1 : !0),
          (this._interval = n || 1),
          (this._timeSignature = 4),
          (this._bpm = 60),
          (this.isPlaying = !1),
          (this.maxIterations = 1 / 0);
        var o = this;
        this.clock = new i({
          callback: function(t) {
            var i = t - e.audiocontext.currentTime;
            i > 0 && o.iterations <= o.maxIterations && o.callback(i);
          },
          frequency: this._calcFreq()
        });
      }),
      (t.SoundLoop.prototype.start = function(t) {
        var i = t || 0,
          n = e.audiocontext.currentTime;
        this.isPlaying || (this.clock.start(n + i), (this.isPlaying = !0));
      }),
      (t.SoundLoop.prototype.stop = function(t) {
        var i = t || 0,
          n = e.audiocontext.currentTime;
        this.isPlaying && (this.clock.stop(n + i), (this.isPlaying = !1));
      }),
      (t.SoundLoop.prototype.pause = function(t) {
        var i = t || 0,
          n = e.audiocontext.currentTime;
        this.isPlaying && (this.clock.pause(n + i), (this.isPlaying = !1));
      }),
      (t.SoundLoop.prototype.syncedStart = function(t, i) {
        var n = i || 0,
          o = e.audiocontext.currentTime;
        if (t.isPlaying) {
          if (t.isPlaying) {
            var r = t.clock._nextTick - e.audiocontext.currentTime;
            this.clock.start(o + r), (this.isPlaying = !0);
          }
        } else
          t.clock.start(o + n),
            (t.isPlaying = !0),
            this.clock.start(o + n),
            (this.isPlaying = !0);
      }),
      (t.SoundLoop.prototype._update = function() {
        this.clock.frequency.value = this._calcFreq();
      }),
      (t.SoundLoop.prototype._calcFreq = function() {
        return 'number' == typeof this._interval
          ? ((this.musicalTimeMode = !1), 1 / this._interval)
          : 'string' == typeof this._interval
          ? ((this.musicalTimeMode = !0),
            (this._bpm / 60 / this._convertNotation(this._interval)) *
              (this._timeSignature / 4))
          : void 0;
      }),
      (t.SoundLoop.prototype._convertNotation = function(t) {
        var e = t.slice(-1);
        switch (((t = Number(t.slice(0, -1))), e)) {
          case 'm':
            return this._measure(t);
          case 'n':
            return this._note(t);
          default:
            console.warn(
              'Specified interval is not formatted correctly. See Tone.js timing reference for more info: https://github.com/Tonejs/Tone.js/wiki/Time'
            );
        }
      }),
      (t.SoundLoop.prototype._measure = function(t) {
        return t * this._timeSignature;
      }),
      (t.SoundLoop.prototype._note = function(t) {
        return this._timeSignature / t;
      }),
      Object.defineProperty(t.SoundLoop.prototype, 'bpm', {
        get: function() {
          return this._bpm;
        },
        set: function(t) {
          this.musicalTimeMode ||
            console.warn(
              'Changing the BPM in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)'
            ),
            (this._bpm = t),
            this._update();
        }
      }),
      Object.defineProperty(t.SoundLoop.prototype, 'timeSignature', {
        get: function() {
          return this._timeSignature;
        },
        set: function(t) {
          this.musicalTimeMode ||
            console.warn(
              'Changing the timeSignature in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)'
            ),
            (this._timeSignature = t),
            this._update();
        }
      }),
      Object.defineProperty(t.SoundLoop.prototype, 'interval', {
        get: function() {
          return this._interval;
        },
        set: function(t) {
          (this.musicalTimeMode = 'Number' == typeof t ? !1 : !0),
            (this._interval = t),
            this._update();
        }
      }),
      Object.defineProperty(t.SoundLoop.prototype, 'iterations', {
        get: function() {
          return this.clock.ticks;
        }
      }),
      t.SoundLoop
    );
  })(o, et);
  var rt;
  rt = (function() {
    'use strict';
    var e = Y;
    return (
      (t.Compressor = function() {
        e.call(this),
          (this.compressor = this.ac.createDynamicsCompressor()),
          this.input.connect(this.compressor),
          this.compressor.connect(this.wet);
      }),
      (t.Compressor.prototype = Object.create(e.prototype)),
      (t.Compressor.prototype.process = function(t, e, i, n, o, r) {
        t.connect(this.input), this.set(e, i, n, o, r);
      }),
      (t.Compressor.prototype.set = function(t, e, i, n, o) {
        'undefined' != typeof t && this.attack(t),
          'undefined' != typeof e && this.knee(e),
          'undefined' != typeof i && this.ratio(i),
          'undefined' != typeof n && this.threshold(n),
          'undefined' != typeof o && this.release(o);
      }),
      (t.Compressor.prototype.attack = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.compressor.attack.value = t),
              this.compressor.attack.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.compressor.attack.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : 'undefined' != typeof t && t.connect(this.compressor.attack),
          this.compressor.attack.value
        );
      }),
      (t.Compressor.prototype.knee = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.compressor.knee.value = t),
              this.compressor.knee.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.compressor.knee.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : 'undefined' != typeof t && t.connect(this.compressor.knee),
          this.compressor.knee.value
        );
      }),
      (t.Compressor.prototype.ratio = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.compressor.ratio.value = t),
              this.compressor.ratio.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.compressor.ratio.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : 'undefined' != typeof t && t.connect(this.compressor.ratio),
          this.compressor.ratio.value
        );
      }),
      (t.Compressor.prototype.threshold = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.compressor.threshold.value = t),
              this.compressor.threshold.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.compressor.threshold.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : 'undefined' != typeof t && t.connect(this.compressor.threshold),
          this.compressor.threshold.value
        );
      }),
      (t.Compressor.prototype.release = function(t, e) {
        var i = e || 0;
        return (
          'number' == typeof t
            ? ((this.compressor.release.value = t),
              this.compressor.release.cancelScheduledValues(
                this.ac.currentTime + 0.01 + i
              ),
              this.compressor.release.linearRampToValueAtTime(
                t,
                this.ac.currentTime + 0.02 + i
              ))
            : 'undefined' != typeof number &&
              t.connect(this.compressor.release),
          this.compressor.release.value
        );
      }),
      (t.Compressor.prototype.reduction = function() {
        return this.compressor.reduction.value;
      }),
      (t.Compressor.prototype.dispose = function() {
        e.prototype.dispose.apply(this),
          this.compressor &&
            (this.compressor.disconnect(), delete this.compressor);
      }),
      t.Compressor
    );
  })(o, Y, s);
  var st;
  st = (function() {
    var e = o,
      i = r.convertToWav,
      n = e.audiocontext;
    (t.SoundRecorder = function() {
      (this.input = n.createGain()),
        (this.output = n.createGain()),
        (this.recording = !1),
        (this.bufferSize = 1024),
        (this._channels = 2),
        this._clear(),
        (this._jsNode = n.createScriptProcessor(
          this.bufferSize,
          this._channels,
          2
        )),
        (this._jsNode.onaudioprocess = this._audioprocess.bind(this)),
        (this._callback = function() {}),
        this._jsNode.connect(t.soundOut._silentNode),
        this.setInput(),
        e.soundArray.push(this);
    }),
      (t.SoundRecorder.prototype.setInput = function(e) {
        this.input.disconnect(),
          (this.input = null),
          (this.input = n.createGain()),
          this.input.connect(this._jsNode),
          this.input.connect(this.output),
          e ? e.connect(this.input) : t.soundOut.output.connect(this.input);
      }),
      (t.SoundRecorder.prototype.record = function(t, e, i) {
        (this.recording = !0),
          e && (this.sampleLimit = Math.round(e * n.sampleRate)),
          t && i
            ? (this._callback = function() {
                (this.buffer = this._getBuffer()),
                  t.setBuffer(this.buffer),
                  i();
              })
            : t &&
              (this._callback = function() {
                (this.buffer = this._getBuffer()), t.setBuffer(this.buffer);
              });
      }),
      (t.SoundRecorder.prototype.stop = function() {
        (this.recording = !1), this._callback(), this._clear();
      }),
      (t.SoundRecorder.prototype._clear = function() {
        (this._leftBuffers = []),
          (this._rightBuffers = []),
          (this.recordedSamples = 0),
          (this.sampleLimit = null);
      }),
      (t.SoundRecorder.prototype._audioprocess = function(t) {
        if (this.recording !== !1 && this.recording === !0)
          if (this.sampleLimit && this.recordedSamples >= this.sampleLimit)
            this.stop();
          else {
            var e = t.inputBuffer.getChannelData(0),
              i = t.inputBuffer.getChannelData(1);
            this._leftBuffers.push(new Float32Array(e)),
              this._rightBuffers.push(new Float32Array(i)),
              (this.recordedSamples += this.bufferSize);
          }
      }),
      (t.SoundRecorder.prototype._getBuffer = function() {
        var t = [];
        return (
          t.push(this._mergeBuffers(this._leftBuffers)),
          t.push(this._mergeBuffers(this._rightBuffers)),
          t
        );
      }),
      (t.SoundRecorder.prototype._mergeBuffers = function(t) {
        for (
          var e = new Float32Array(this.recordedSamples),
            i = 0,
            n = t.length,
            o = 0;
          n > o;
          o++
        ) {
          var r = t[o];
          e.set(r, i), (i += r.length);
        }
        return e;
      }),
      (t.SoundRecorder.prototype.dispose = function() {
        this._clear();
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          (this._callback = function() {}),
          this.input && this.input.disconnect(),
          (this.input = null),
          (this._jsNode = null);
      }),
      (t.prototype.saveSound = function(e, n) {
        const o = i(e.buffer);
        t.prototype.writeFile([o], n, 'wav');
      });
  })(o, r);
  var at;
  at = (function() {
    (t.PeakDetect = function(t, e, i, n) {
      (this.framesPerPeak = n || 20),
        (this.framesSinceLastPeak = 0),
        (this.decayRate = 0.95),
        (this.threshold = i || 0.35),
        (this.cutoff = 0),
        (this.cutoffMult = 1.5),
        (this.energy = 0),
        (this.penergy = 0),
        (this.currentValue = 0),
        (this.isDetected = !1),
        (this.f1 = t || 40),
        (this.f2 = e || 2e4),
        (this._onPeak = function() {});
    }),
      (t.PeakDetect.prototype.update = function(t) {
        var e = (this.energy = t.getEnergy(this.f1, this.f2) / 255);
        e > this.cutoff && e > this.threshold && e - this.penergy > 0
          ? (this._onPeak(),
            (this.isDetected = !0),
            (this.cutoff = e * this.cutoffMult),
            (this.framesSinceLastPeak = 0))
          : ((this.isDetected = !1),
            this.framesSinceLastPeak <= this.framesPerPeak
              ? this.framesSinceLastPeak++
              : ((this.cutoff *= this.decayRate),
                (this.cutoff = Math.max(this.cutoff, this.threshold)))),
          (this.currentValue = e),
          (this.penergy = e);
      }),
      (t.PeakDetect.prototype.onPeak = function(t, e) {
        var i = this;
        i._onPeak = function() {
          t(i.energy, e);
        };
      });
  })();
  var ut;
  ut = (function() {
    var e = o;
    (t.Gain = function() {
      (this.ac = e.audiocontext),
        (this.input = this.ac.createGain()),
        (this.output = this.ac.createGain()),
        (this.input.gain.value = 0.5),
        this.input.connect(this.output),
        e.soundArray.push(this);
    }),
      (t.Gain.prototype.setInput = function(t) {
        t.connect(this.input);
      }),
      (t.Gain.prototype.connect = function(e) {
        var i = e || t.soundOut.input;
        this.output.connect(i.input ? i.input : i);
      }),
      (t.Gain.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.Gain.prototype.amp = function(t, i, n) {
        var i = i || 0,
          n = n || 0,
          o = e.audiocontext.currentTime,
          r = this.output.gain.value;
        this.output.gain.cancelScheduledValues(o),
          this.output.gain.linearRampToValueAtTime(r, o + n),
          this.output.gain.linearRampToValueAtTime(t, o + n + i);
      }),
      (t.Gain.prototype.dispose = function() {
        var t = e.soundArray.indexOf(this);
        e.soundArray.splice(t, 1),
          this.output && (this.output.disconnect(), delete this.output),
          this.input && (this.input.disconnect(), delete this.input);
      });
  })(o);
  var ct;
  ct = (function() {
    var e = o;
    return (
      (t.AudioVoice = function() {
        (this.ac = e.audiocontext),
          (this.output = this.ac.createGain()),
          this.connect(),
          e.soundArray.push(this);
      }),
      (t.AudioVoice.prototype.play = function(t, e, i, n) {}),
      (t.AudioVoice.prototype.triggerAttack = function(t, e, i) {}),
      (t.AudioVoice.prototype.triggerRelease = function(t) {}),
      (t.AudioVoice.prototype.amp = function(t, e) {}),
      (t.AudioVoice.prototype.connect = function(t) {
        var i = t || e.input;
        this.output.connect(i.input ? i.input : i);
      }),
      (t.AudioVoice.prototype.disconnect = function() {
        this.output.disconnect();
      }),
      (t.AudioVoice.prototype.dispose = function() {
        this.output && (this.output.disconnect(), delete this.output);
      }),
      t.AudioVoice
    );
  })(o);
  var pt;
  pt = (function() {
    var e = o,
      i = ct,
      n = r.noteToFreq,
      s = 0.15;
    (t.MonoSynth = function() {
      i.call(this),
        (this.oscillator = new t.Oscillator()),
        (this.env = new t.Envelope()),
        this.env.setRange(1, 0),
        this.env.setExp(!0),
        this.setADSR(0.02, 0.25, 0.05, 0.35),
        this.oscillator.disconnect(),
        this.oscillator.connect(this.output),
        this.env.disconnect(),
        this.env.setInput(this.output.gain),
        (this.oscillator.output.gain.value = 1),
        this.oscillator.start(),
        this.connect(),
        e.soundArray.push(this);
    }),
      (t.MonoSynth.prototype = Object.create(t.AudioVoice.prototype)),
      (t.MonoSynth.prototype.play = function(t, e, i, n) {
        this.triggerAttack(t, e, ~~i), this.triggerRelease(~~i + (n || s));
      }),
      (t.MonoSynth.prototype.triggerAttack = function(t, e, i) {
        var i = ~~i,
          o = n(t),
          r = e || 0.1;
        this.oscillator.freq(o, 0, i), this.env.ramp(this.output.gain, i, r);
      }),
      (t.MonoSynth.prototype.triggerRelease = function(t) {
        var t = t || 0;
        this.env.ramp(this.output.gain, t, 0);
      }),
      (t.MonoSynth.prototype.setADSR = function(t, e, i, n) {
        this.env.setADSR(t, e, i, n);
      }),
      Object.defineProperties(t.MonoSynth.prototype, {
        attack: {
          get: function() {
            return this.env.aTime;
          },
          set: function(t) {
            this.env.setADSR(
              t,
              this.env.dTime,
              this.env.sPercent,
              this.env.rTime
            );
          }
        },
        decay: {
          get: function() {
            return this.env.dTime;
          },
          set: function(t) {
            this.env.setADSR(
              this.env.aTime,
              t,
              this.env.sPercent,
              this.env.rTime
            );
          }
        },
        sustain: {
          get: function() {
            return this.env.sPercent;
          },
          set: function(t) {
            this.env.setADSR(this.env.aTime, this.env.dTime, t, this.env.rTime);
          }
        },
        release: {
          get: function() {
            return this.env.rTime;
          },
          set: function(t) {
            this.env.setADSR(
              this.env.aTime,
              this.env.dTime,
              this.env.sPercent,
              t
            );
          }
        }
      }),
      (t.MonoSynth.prototype.amp = function(t, e) {
        var i = e || 0;
        return (
          'undefined' != typeof t && this.oscillator.amp(t, i),
          this.oscillator.amp().value
        );
      }),
      (t.MonoSynth.prototype.connect = function(t) {
        var i = t || e.input;
        this.output.connect(i.input ? i.input : i);
      }),
      (t.MonoSynth.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.MonoSynth.prototype.dispose = function() {
        i.prototype.dispose.apply(this),
          this.env && this.env.dispose(),
          this.oscillator && this.oscillator.dispose();
      });
  })(o, ct, r);
  var ht;
  ht = (function() {
    var e = o,
      i = q,
      n = r.noteToFreq;
    (t.PolySynth = function(n, o) {
      (this.audiovoices = []),
        (this.notes = {}),
        (this._newest = 0),
        (this._oldest = 0),
        (this.maxVoices = o || 8),
        (this.AudioVoice = void 0 === n ? t.MonoSynth : n),
        (this._voicesInUse = new i(0)),
        (this.output = e.audiocontext.createGain()),
        this.connect(),
        this._allocateVoices(),
        e.soundArray.push(this);
    }),
      (t.PolySynth.prototype._allocateVoices = function() {
        for (var t = 0; t < this.maxVoices; t++)
          this.audiovoices.push(new this.AudioVoice()),
            this.audiovoices[t].disconnect(),
            this.audiovoices[t].connect(this.output);
      }),
      (t.PolySynth.prototype.play = function(t, e, i, n) {
        var n = n || 1;
        this.noteAttack(t, e, i), this.noteRelease(t, i + n);
      }),
      (t.PolySynth.prototype.noteADSR = function(t, i, n, o, r, s) {
        var a = e.audiocontext.currentTime,
          s = s || 0,
          u = a + s;
        this.audiovoices[this.notes[t].getValueAtTime(u)].setADSR(i, n, o, r);
      }),
      (t.PolySynth.prototype.setADSR = function(t, e, i, n) {
        this.audiovoices.forEach(function(o) {
          o.setADSR(t, e, i, n);
        });
      }),
      (t.PolySynth.prototype.noteAttack = function(o, r, s) {
        var a,
          s = ~~s,
          u = e.audiocontext.currentTime + s,
          c = n(o),
          p = r || 0.1;
        if (
          (this.notes[c] &&
            null !== this.notes[c].getValueAtTime(u) &&
            this.noteRelease(c, 0),
          this._voicesInUse.getValueAtTime(u) < this.maxVoices)
        )
          a = Math.max(~~this._voicesInUse.getValueAtTime(u), 0);
        else {
          a = this._oldest;
          var h = t.prototype.freqToMidi(
            this.audiovoices[this._oldest].oscillator.freq().value
          );
          this.noteRelease(h),
            (this._oldest = (this._oldest + 1) % (this.maxVoices - 1));
        }
        (this.notes[c] = new i()), this.notes[c].setValueAtTime(a, u);
        var l =
          null === this._voicesInUse._searchBefore(u)
            ? 0
            : this._voicesInUse._searchBefore(u).value;
        if (
          (this._voicesInUse.setValueAtTime(l + 1, u),
          this._updateAfter(u, 1),
          (this._newest = a),
          'number' == typeof p)
        ) {
          var f = (1 / this._voicesInUse.getValueAtTime(u)) * 2;
          p = p > f ? f : p;
        }
        this.audiovoices[a].triggerAttack(c, p, s);
      }),
      (t.PolySynth.prototype._updateAfter = function(t, e) {
        if (null !== this._voicesInUse._searchAfter(t)) {
          this._voicesInUse._searchAfter(t).value += e;
          var i = this._voicesInUse._searchAfter(t).time;
          this._updateAfter(i, e);
        }
      }),
      (t.PolySynth.prototype.noteRelease = function(t, i) {
        var o = e.audiocontext.currentTime,
          r = i || 0,
          s = o + r;
        if (t) {
          var a = n(t);
          if (this.notes[a] && null !== this.notes[a].getValueAtTime(s)) {
            var u = Math.max(~~this._voicesInUse.getValueAtTime(s).value, 1);
            this._voicesInUse.setValueAtTime(u - 1, s),
              u > 0 && this._updateAfter(s, -1),
              this.audiovoices[this.notes[a].getValueAtTime(s)].triggerRelease(
                r
              ),
              this.notes[a].dispose(),
              delete this.notes[a],
              (this._newest =
                0 === this._newest
                  ? 0
                  : (this._newest - 1) % (this.maxVoices - 1));
          } else
            console.warn('Cannot release a note that is not already playing');
        } else {
          this.audiovoices.forEach(function(t) {
            t.triggerRelease(r);
          }),
            this._voicesInUse.setValueAtTime(0, s);
          for (var c in this.notes)
            this.notes[c].dispose(), delete this.notes[c];
        }
      }),
      (t.PolySynth.prototype.connect = function(t) {
        var i = t || e.input;
        this.output.connect(i.input ? i.input : i);
      }),
      (t.PolySynth.prototype.disconnect = function() {
        this.output && this.output.disconnect();
      }),
      (t.PolySynth.prototype.dispose = function() {
        this.audiovoices.forEach(function(t) {
          t.dispose();
        }),
          this.output && (this.output.disconnect(), delete this.output);
      });
  })(o, q, r);
  var lt;
  lt = (function() {
    function e(t) {
      for (
        var e,
          i = 'number' == typeof t ? t : 50,
          n = 44100,
          o = new Float32Array(n),
          r = Math.PI / 180,
          s = 0;
        n > s;
        ++s
      )
        (e = (2 * s) / n - 1),
          (o[s] = ((3 + i) * e * 20 * r) / (Math.PI + i * Math.abs(e)));
      return o;
    }
    var i = Y;
    (t.Distortion = function(n, o) {
      if (
        (i.call(this),
        'undefined' == typeof n && (n = 0.25),
        'number' != typeof n)
      )
        throw new Error('amount must be a number');
      if (('undefined' == typeof o && (o = '2x'), 'string' != typeof o))
        throw new Error('oversample must be a String');
      var r = t.prototype.map(n, 0, 1, 0, 2e3);
      (this.waveShaperNode = this.ac.createWaveShaper()),
        (this.amount = r),
        (this.waveShaperNode.curve = e(r)),
        (this.waveShaperNode.oversample = o),
        this.input.connect(this.waveShaperNode),
        this.waveShaperNode.connect(this.wet);
    }),
      (t.Distortion.prototype = Object.create(i.prototype)),
      (t.Distortion.prototype.process = function(t, e, i) {
        t.connect(this.input), this.set(e, i);
      }),
      (t.Distortion.prototype.set = function(i, n) {
        if (i) {
          var o = t.prototype.map(i, 0, 1, 0, 2e3);
          (this.amount = o), (this.waveShaperNode.curve = e(o));
        }
        n && (this.waveShaperNode.oversample = n);
      }),
      (t.Distortion.prototype.getAmount = function() {
        return this.amount;
      }),
      (t.Distortion.prototype.getOversample = function() {
        return this.waveShaperNode.oversample;
      }),
      (t.Distortion.prototype.dispose = function() {
        i.prototype.dispose.apply(this),
          this.waveShaperNode &&
            (this.waveShaperNode.disconnect(), (this.waveShaperNode = null));
      });
  })(Y);
  var ft;
  ft = (function() {
    var t = o;
    return t;
  })(
    e,
    n,
    o,
    r,
    s,
    a,
    u,
    c,
    p,
    k,
    O,
    M,
    V,
    E,
    C,
    z,
    Q,
    H,
    $,
    J,
    K,
    it,
    nt,
    ot,
    rt,
    st,
    at,
    ut,
    pt,
    ht,
    lt,
    ct,
    pt,
    ht
  );
});
