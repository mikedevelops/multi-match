parcelRequire = (function(e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function(r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    aj4z: [
      function(require, module, exports) {
        var global = arguments[3];
        var define;
        var t,
          n = arguments[3];
        !(function(n) {
          var e = n.Promise,
            o =
              e &&
              "resolve" in e &&
              "reject" in e &&
              "all" in e &&
              "race" in e &&
              (function() {
                var t;
                return (
                  new e(function(n) {
                    t = n;
                  }),
                  "function" == typeof t
                );
              })();
          "undefined" != typeof exports && exports
            ? ((exports.Promise = o ? e : b), (exports.Polyfill = b))
            : "function" == typeof t && t.amd
            ? t(function() {
                return o ? e : b;
              })
            : o || (n.Promise = b);
          var r = "pending",
            i = "sealed",
            c = "fulfilled",
            f = "rejected",
            u = function() {};
          function a(t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          }
          var s,
            h = "undefined" != typeof setImmediate ? setImmediate : setTimeout,
            l = [];
          function p() {
            for (var t = 0; t < l.length; t++) l[t][0](l[t][1]);
            (l = []), (s = !1);
          }
          function d(t, n) {
            l.push([t, n]), s || ((s = !0), h(p, 0));
          }
          function y(t) {
            var n = t.owner,
              e = n.state_,
              o = n.data_,
              r = t[e],
              i = t.then;
            if ("function" == typeof r) {
              e = c;
              try {
                o = r(o);
              } catch (u) {
                _(i, u);
              }
            }
            w(i, o) || (e === c && m(i, o), e === f && _(i, o));
          }
          function w(t, n) {
            var e;
            try {
              if (t === n)
                throw new TypeError(
                  "A promises callback cannot return that same promise."
                );
              if (n && ("function" == typeof n || "object" == typeof n)) {
                var o = n.then;
                if ("function" == typeof o)
                  return (
                    o.call(
                      n,
                      function(o) {
                        e || ((e = !0), n !== o ? m(t, o) : v(t, o));
                      },
                      function(n) {
                        e || ((e = !0), _(t, n));
                      }
                    ),
                    !0
                  );
              }
            } catch (r) {
              return e || _(t, r), !0;
            }
            return !1;
          }
          function m(t, n) {
            (t !== n && w(t, n)) || v(t, n);
          }
          function v(t, n) {
            t.state_ === r && ((t.state_ = i), (t.data_ = n), d(P, t));
          }
          function _(t, n) {
            t.state_ === r && ((t.state_ = i), (t.data_ = n), d(g, t));
          }
          function j(t) {
            var n = t.then_;
            t.then_ = void 0;
            for (var e = 0; e < n.length; e++) y(n[e]);
          }
          function P(t) {
            (t.state_ = c), j(t);
          }
          function g(t) {
            (t.state_ = f), j(t);
          }
          function b(t) {
            if ("function" != typeof t)
              throw new TypeError(
                "Promise constructor takes a function argument"
              );
            if (this instanceof b == !1)
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              );
            (this.then_ = []),
              (function(t, n) {
                function e(t) {
                  _(n, t);
                }
                try {
                  t(function(t) {
                    m(n, t);
                  }, e);
                } catch (o) {
                  e(o);
                }
              })(t, this);
          }
          (b.prototype = {
            constructor: b,
            state_: r,
            then_: null,
            data_: void 0,
            then: function(t, n) {
              var e = {
                owner: this,
                then: new this.constructor(u),
                fulfilled: t,
                rejected: n
              };
              return (
                this.state_ === c || this.state_ === f
                  ? d(y, e)
                  : this.then_.push(e),
                e.then
              );
            },
            catch: function(t) {
              return this.then(null, t);
            }
          }),
            (b.all = function(t) {
              if (!a(t))
                throw new TypeError("You must pass an array to Promise.all().");
              return new this(function(n, e) {
                var o = [],
                  r = 0;
                function i(t) {
                  return (
                    r++,
                    function(e) {
                      (o[t] = e), --r || n(o);
                    }
                  );
                }
                for (var c, f = 0; f < t.length; f++)
                  (c = t[f]) && "function" == typeof c.then
                    ? c.then(i(f), e)
                    : (o[f] = c);
                r || n(o);
              });
            }),
            (b.race = function(t) {
              if (!a(t))
                throw new TypeError(
                  "You must pass an array to Promise.race()."
                );
              return new this(function(n, e) {
                for (var o, r = 0; r < t.length; r++)
                  (o = t[r]) && "function" == typeof o.then
                    ? o.then(n, e)
                    : n(o);
              });
            }),
            (b.resolve = function(t) {
              return t && "object" == typeof t && t.constructor === this
                ? t
                : new this(function(n) {
                    n(t);
                  });
            }),
            (b.reject = function(t) {
              return new this(function(n, e) {
                e(t);
              });
            });
        })(
          "undefined" != typeof window
            ? window
            : void 0 !== n
            ? n
            : "undefined" != typeof self
            ? self
            : this
        );
      },
      {}
    ],
    J4Nk: [
      function(require, module, exports) {
        "use strict";
        var r = Object.getOwnPropertySymbols,
          t = Object.prototype.hasOwnProperty,
          e = Object.prototype.propertyIsEnumerable;
        function n(r) {
          if (null == r)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          return Object(r);
        }
        function o() {
          try {
            if (!Object.assign) return !1;
            var r = new String("abc");
            if (((r[5] = "de"), "5" === Object.getOwnPropertyNames(r)[0]))
              return !1;
            for (var t = {}, e = 0; e < 10; e++)
              t["_" + String.fromCharCode(e)] = e;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function(r) {
                  return t[r];
                })
                .join("")
            )
              return !1;
            var n = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function(r) {
                n[r] = r;
              }),
              "abcdefghijklmnopqrst" ===
                Object.keys(Object.assign({}, n)).join("")
            );
          } catch (o) {
            return !1;
          }
        }
        module.exports = o()
          ? Object.assign
          : function(o, c) {
              for (var a, i, s = n(o), f = 1; f < arguments.length; f++) {
                for (var u in (a = Object(arguments[f])))
                  t.call(a, u) && (s[u] = a[u]);
                if (r) {
                  i = r(a);
                  for (var b = 0; b < i.length; b++)
                    e.call(a, i[b]) && (s[i[b]] = a[i[b]]);
                }
              }
              return s;
            };
      },
      {}
    ],
    y4AA: [
      function(require, module, exports) {
        var global = arguments[3];
        var n = arguments[3],
          e = require("es6-promise-polyfill"),
          r = i(require("object-assign"));
        function i(n) {
          return n && n.__esModule ? n : { default: n };
        }
        window.Promise || (window.Promise = e.Polyfill),
          Object.assign || (Object.assign = r.default);
        var o =
            "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof window
              ? window
              : void 0 !== n
              ? n
              : "undefined" != typeof self
              ? self
              : {},
          a = 16;
        if (
          ((Date.now && Date.prototype.getTime) ||
            (Date.now = function() {
              return new Date().getTime();
            }),
          !o.performance || !o.performance.now)
        ) {
          var t = Date.now();
          o.performance || (o.performance = {}),
            (o.performance.now = function() {
              return Date.now() - t;
            });
        }
        for (
          var w = Date.now(), m = ["ms", "moz", "webkit", "o"], u = 0;
          u < m.length && !o.requestAnimationFrame;
          ++u
        ) {
          var f = m[u];
          (o.requestAnimationFrame = o[f + "RequestAnimationFrame"]),
            (o.cancelAnimationFrame =
              o[f + "CancelAnimationFrame"] ||
              o[f + "CancelRequestAnimationFrame"]);
        }
        o.requestAnimationFrame ||
          (o.requestAnimationFrame = function(n) {
            if ("function" != typeof n)
              throw new TypeError(n + "is not a function");
            var e = Date.now(),
              r = a + w - e;
            return (
              r < 0 && (r = 0),
              (w = e),
              setTimeout(function() {
                (w = Date.now()), n(performance.now());
              }, r)
            );
          }),
          o.cancelAnimationFrame ||
            (o.cancelAnimationFrame = function(n) {
              return clearTimeout(n);
            }),
          Math.sign ||
            (Math.sign = function(n) {
              return 0 === (n = Number(n)) || isNaN(n) ? n : n > 0 ? 1 : -1;
            }),
          Number.isInteger ||
            (Number.isInteger = function(n) {
              return "number" == typeof n && isFinite(n) && Math.floor(n) === n;
            }),
          window.ArrayBuffer || (window.ArrayBuffer = Array),
          window.Float32Array || (window.Float32Array = Array),
          window.Uint32Array || (window.Uint32Array = Array),
          window.Uint16Array || (window.Uint16Array = Array),
          window.Uint8Array || (window.Uint8Array = Array),
          window.Int32Array || (window.Int32Array = Array);
      },
      { "es6-promise-polyfill": "aj4z", "object-assign": "J4Nk" }
    ],
    nSZq: [
      function(require, module, exports) {
        var define;
        var e;
        !(function(i) {
          var o = /iPhone/i,
            d = /iPod/i,
            n = /iPad/i,
            t = /\bAndroid(?:.+)Mobile\b/i,
            r = /Android/i,
            a = /\bAndroid(?:.+)SD4930UR\b/i,
            p = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
            b = /Windows Phone/i,
            l = /\bWindows(?:.+)ARM\b/i,
            s = /BlackBerry/i,
            u = /BB10/i,
            f = /Opera Mini/i,
            c = /\b(CriOS|Chrome)(?:.+)Mobile/i,
            v = /Mobile(?:.+)Firefox\b/i;
          function h(e, i) {
            return e.test(i);
          }
          function w(e) {
            var i =
                e ||
                ("undefined" != typeof navigator ? navigator.userAgent : ""),
              w = i.split("[FBAN");
            void 0 !== w[1] && (i = w[0]),
              void 0 !== (w = i.split("Twitter"))[1] && (i = w[0]);
            var m = {
              apple: {
                phone: h(o, i) && !h(b, i),
                ipod: h(d, i),
                tablet: !h(o, i) && h(n, i) && !h(b, i),
                device: (h(o, i) || h(d, i) || h(n, i)) && !h(b, i)
              },
              amazon: {
                phone: h(a, i),
                tablet: !h(a, i) && h(p, i),
                device: h(a, i) || h(p, i)
              },
              android: {
                phone: (!h(b, i) && h(a, i)) || (!h(b, i) && h(t, i)),
                tablet:
                  !h(b, i) && !h(a, i) && !h(t, i) && (h(p, i) || h(r, i)),
                device:
                  (!h(b, i) && (h(a, i) || h(p, i) || h(t, i) || h(r, i))) ||
                  h(/\bokhttp\b/i, i)
              },
              windows: {
                phone: h(b, i),
                tablet: h(l, i),
                device: h(b, i) || h(l, i)
              },
              other: {
                blackberry: h(s, i),
                blackberry10: h(u, i),
                opera: h(f, i),
                firefox: h(v, i),
                chrome: h(c, i),
                device: h(s, i) || h(u, i) || h(f, i) || h(v, i) || h(c, i)
              }
            };
            return (
              (m.any =
                m.apple.device ||
                m.android.device ||
                m.windows.device ||
                m.other.device),
              (m.phone = m.apple.phone || m.android.phone || m.windows.phone),
              (m.tablet =
                m.apple.tablet || m.android.tablet || m.windows.tablet),
              m
            );
          }
          "undefined" != typeof module &&
          module.exports &&
          "undefined" == typeof window
            ? (module.exports = w)
            : "undefined" != typeof module &&
              module.exports &&
              "undefined" != typeof window
            ? ((module.exports = w()), (module.exports.isMobile = w))
            : "function" == typeof e && e.amd
            ? e([], (i.isMobile = w()))
            : (i.isMobile = w());
        })(this);
      },
      {}
    ],
    t4Uo: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          Object.defineProperty(exports, "isMobile", {
            enumerable: !0,
            get: function() {
              return e.default;
            }
          }),
          (exports.settings = void 0);
        var e = t(require("ismobilejs"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function r(t) {
          var r = !0;
          if (e.default.tablet || e.default.phone) {
            if (((r = !1), e.default.apple.device)) {
              var a = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
              if (a) parseInt(a[1], 10) >= 11 && (r = !0);
            }
            if (e.default.android.device) {
              var i = navigator.userAgent.match(/Android\s([0-9.]*)/);
              if (i) parseInt(i[1], 10) >= 7 && (r = !0);
            }
          }
          return r ? t : 4;
        }
        function a() {
          return !e.default.apple.device;
        }
        var i = {
          MIPMAP_TEXTURES: 1,
          ANISOTROPIC_LEVEL: 0,
          RESOLUTION: 1,
          FILTER_RESOLUTION: 1,
          SPRITE_MAX_TEXTURES: r(32),
          SPRITE_BATCH_SIZE: 4096,
          RENDER_OPTIONS: {
            view: null,
            antialias: !1,
            forceFXAA: !1,
            autoDensity: !1,
            transparent: !1,
            backgroundColor: 0,
            clearBeforeRender: !0,
            preserveDrawingBuffer: !1,
            width: 800,
            height: 600,
            legacy: !1
          },
          GC_MODE: 0,
          GC_MAX_IDLE: 3600,
          GC_MAX_CHECK_COUNT: 600,
          WRAP_MODE: 33071,
          SCALE_MODE: 1,
          PRECISION_VERTEX: "highp",
          PRECISION_FRAGMENT: e.default.apple.device ? "highp" : "mediump",
          CAN_UPLOAD_SAME_BUFFER: a(),
          CREATE_IMAGE_BITMAP: !1,
          ROUND_PIXELS: !1
        };
        exports.settings = i;
      },
      { ismobilejs: "nSZq" }
    ],
    JJlS: [
      function(require, module, exports) {
        "use strict";
        var e = Object.prototype.hasOwnProperty,
          t = "~";
        function n() {}
        function r(e, t, n) {
          (this.fn = e), (this.context = t), (this.once = n || !1);
        }
        function o(e, n, o, s, i) {
          if ("function" != typeof o)
            throw new TypeError("The listener must be a function");
          var c = new r(o, s || e, i),
            f = t ? t + n : n;
          return (
            e._events[f]
              ? e._events[f].fn
                ? (e._events[f] = [e._events[f], c])
                : e._events[f].push(c)
              : ((e._events[f] = c), e._eventsCount++),
            e
          );
        }
        function s(e, t) {
          0 == --e._eventsCount ? (e._events = new n()) : delete e._events[t];
        }
        function i() {
          (this._events = new n()), (this._eventsCount = 0);
        }
        Object.create &&
          ((n.prototype = Object.create(null)), new n().__proto__ || (t = !1)),
          (i.prototype.eventNames = function() {
            var n,
              r,
              o = [];
            if (0 === this._eventsCount) return o;
            for (r in (n = this._events))
              e.call(n, r) && o.push(t ? r.slice(1) : r);
            return Object.getOwnPropertySymbols
              ? o.concat(Object.getOwnPropertySymbols(n))
              : o;
          }),
          (i.prototype.listeners = function(e) {
            var n = t ? t + e : e,
              r = this._events[n];
            if (!r) return [];
            if (r.fn) return [r.fn];
            for (var o = 0, s = r.length, i = new Array(s); o < s; o++)
              i[o] = r[o].fn;
            return i;
          }),
          (i.prototype.listenerCount = function(e) {
            var n = t ? t + e : e,
              r = this._events[n];
            return r ? (r.fn ? 1 : r.length) : 0;
          }),
          (i.prototype.emit = function(e, n, r, o, s, i) {
            var c = t ? t + e : e;
            if (!this._events[c]) return !1;
            var f,
              u,
              a = this._events[c],
              l = arguments.length;
            if (a.fn) {
              switch ((a.once && this.removeListener(e, a.fn, void 0, !0), l)) {
                case 1:
                  return a.fn.call(a.context), !0;
                case 2:
                  return a.fn.call(a.context, n), !0;
                case 3:
                  return a.fn.call(a.context, n, r), !0;
                case 4:
                  return a.fn.call(a.context, n, r, o), !0;
                case 5:
                  return a.fn.call(a.context, n, r, o, s), !0;
                case 6:
                  return a.fn.call(a.context, n, r, o, s, i), !0;
              }
              for (u = 1, f = new Array(l - 1); u < l; u++)
                f[u - 1] = arguments[u];
              a.fn.apply(a.context, f);
            } else {
              var v,
                h = a.length;
              for (u = 0; u < h; u++)
                switch (
                  (a[u].once && this.removeListener(e, a[u].fn, void 0, !0), l)
                ) {
                  case 1:
                    a[u].fn.call(a[u].context);
                    break;
                  case 2:
                    a[u].fn.call(a[u].context, n);
                    break;
                  case 3:
                    a[u].fn.call(a[u].context, n, r);
                    break;
                  case 4:
                    a[u].fn.call(a[u].context, n, r, o);
                    break;
                  default:
                    if (!f)
                      for (v = 1, f = new Array(l - 1); v < l; v++)
                        f[v - 1] = arguments[v];
                    a[u].fn.apply(a[u].context, f);
                }
            }
            return !0;
          }),
          (i.prototype.on = function(e, t, n) {
            return o(this, e, t, n, !1);
          }),
          (i.prototype.once = function(e, t, n) {
            return o(this, e, t, n, !0);
          }),
          (i.prototype.removeListener = function(e, n, r, o) {
            var i = t ? t + e : e;
            if (!this._events[i]) return this;
            if (!n) return s(this, i), this;
            var c = this._events[i];
            if (c.fn)
              c.fn !== n ||
                (o && !c.once) ||
                (r && c.context !== r) ||
                s(this, i);
            else {
              for (var f = 0, u = [], a = c.length; f < a; f++)
                (c[f].fn !== n ||
                  (o && !c[f].once) ||
                  (r && c[f].context !== r)) &&
                  u.push(c[f]);
              u.length
                ? (this._events[i] = 1 === u.length ? u[0] : u)
                : s(this, i);
            }
            return this;
          }),
          (i.prototype.removeAllListeners = function(e) {
            var r;
            return (
              e
                ? ((r = t ? t + e : e), this._events[r] && s(this, r))
                : ((this._events = new n()), (this._eventsCount = 0)),
              this
            );
          }),
          (i.prototype.off = i.prototype.removeListener),
          (i.prototype.addListener = i.prototype.on),
          (i.prefixed = t),
          (i.EventEmitter = i),
          "undefined" != typeof module && (module.exports = i);
      },
      {}
    ],
    vwhv: [
      function(require, module, exports) {
        "use strict";
        function e(e, t, x) {
          x = x || 2;
          var i,
            u,
            v,
            y,
            o,
            p,
            a,
            l = t && t.length,
            h = l ? t[0] * x : e.length,
            s = n(e, 0, h, x, !0),
            c = [];
          if (!s || s.next === s.prev) return c;
          if ((l && (s = f(e, t, s, x)), e.length > 80 * x)) {
            (i = v = e[0]), (u = y = e[1]);
            for (var Z = x; Z < h; Z += x)
              (o = e[Z]) < i && (i = o),
                (p = e[Z + 1]) < u && (u = p),
                o > v && (v = o),
                p > y && (y = p);
            a = 0 !== (a = Math.max(v - i, y - u)) ? 1 / a : 0;
          }
          return r(s, c, x, i, u, a), c;
        }
        function n(e, n, t, r, x) {
          var i, u;
          if (x === D(e, n, t, r) > 0)
            for (i = n; i < t; i += r) u = A(i, e[i], e[i + 1], u);
          else for (i = t - r; i >= n; i -= r) u = A(i, e[i], e[i + 1], u);
          return u && w(u, u.next) && (B(u), (u = u.next)), u;
        }
        function t(e, n) {
          if (!e) return e;
          n || (n = e);
          var t,
            r = e;
          do {
            if (
              ((t = !1),
              r.steiner || (!w(r, r.next) && 0 !== g(r.prev, r, r.next)))
            )
              r = r.next;
            else {
              if ((B(r), (r = n = r.prev) === r.next)) break;
              t = !0;
            }
          } while (t || r !== n);
          return n;
        }
        function r(e, n, f, y, o, p, a) {
          if (e) {
            !a && p && l(e, y, o, p);
            for (var h, s, c = e; e.prev !== e.next; )
              if (((h = e.prev), (s = e.next), p ? i(e, y, o, p) : x(e)))
                n.push(h.i / f),
                  n.push(e.i / f),
                  n.push(s.i / f),
                  B(e),
                  (e = s.next),
                  (c = s.next);
              else if ((e = s) === c) {
                a
                  ? 1 === a
                    ? r((e = u(t(e), n, f)), n, f, y, o, p, 2)
                    : 2 === a && v(e, n, f, y, o, p)
                  : r(t(e), n, f, y, o, p, 1);
                break;
              }
          }
        }
        function x(e) {
          var n = e.prev,
            t = e,
            r = e.next;
          if (g(n, t, r) >= 0) return !1;
          for (var x = e.next.next; x !== e.prev; ) {
            if (
              Z(n.x, n.y, t.x, t.y, r.x, r.y, x.x, x.y) &&
              g(x.prev, x, x.next) >= 0
            )
              return !1;
            x = x.next;
          }
          return !0;
        }
        function i(e, n, t, r) {
          var x = e.prev,
            i = e,
            u = e.next;
          if (g(x, i, u) >= 0) return !1;
          for (
            var v = x.x < i.x ? (x.x < u.x ? x.x : u.x) : i.x < u.x ? i.x : u.x,
              f = x.y < i.y ? (x.y < u.y ? x.y : u.y) : i.y < u.y ? i.y : u.y,
              y = x.x > i.x ? (x.x > u.x ? x.x : u.x) : i.x > u.x ? i.x : u.x,
              o = x.y > i.y ? (x.y > u.y ? x.y : u.y) : i.y > u.y ? i.y : u.y,
              p = s(v, f, n, t, r),
              a = s(y, o, n, t, r),
              l = e.prevZ,
              h = e.nextZ;
            l && l.z >= p && h && h.z <= a;

          ) {
            if (
              l !== e.prev &&
              l !== e.next &&
              Z(x.x, x.y, i.x, i.y, u.x, u.y, l.x, l.y) &&
              g(l.prev, l, l.next) >= 0
            )
              return !1;
            if (
              ((l = l.prevZ),
              h !== e.prev &&
                h !== e.next &&
                Z(x.x, x.y, i.x, i.y, u.x, u.y, h.x, h.y) &&
                g(h.prev, h, h.next) >= 0)
            )
              return !1;
            h = h.nextZ;
          }
          for (; l && l.z >= p; ) {
            if (
              l !== e.prev &&
              l !== e.next &&
              Z(x.x, x.y, i.x, i.y, u.x, u.y, l.x, l.y) &&
              g(l.prev, l, l.next) >= 0
            )
              return !1;
            l = l.prevZ;
          }
          for (; h && h.z <= a; ) {
            if (
              h !== e.prev &&
              h !== e.next &&
              Z(x.x, x.y, i.x, i.y, u.x, u.y, h.x, h.y) &&
              g(h.prev, h, h.next) >= 0
            )
              return !1;
            h = h.nextZ;
          }
          return !0;
        }
        function u(e, n, r) {
          var x = e;
          do {
            var i = x.prev,
              u = x.next.next;
            !w(i, u) &&
              M(i, x, x.next, u) &&
              k(i, u) &&
              k(u, i) &&
              (n.push(i.i / r),
              n.push(x.i / r),
              n.push(u.i / r),
              B(x),
              B(x.next),
              (x = e = u)),
              (x = x.next);
          } while (x !== e);
          return t(x);
        }
        function v(e, n, x, i, u, v) {
          var f = e;
          do {
            for (var y = f.next.next; y !== f.prev; ) {
              if (f.i !== y.i && d(f, y)) {
                var o = q(f, y);
                return (
                  (f = t(f, f.next)),
                  (o = t(o, o.next)),
                  r(f, n, x, i, u, v),
                  void r(o, n, x, i, u, v)
                );
              }
              y = y.next;
            }
            f = f.next;
          } while (f !== e);
        }
        function f(e, r, x, i) {
          var u,
            v,
            f,
            p = [];
          for (u = 0, v = r.length; u < v; u++)
            (f = n(e, r[u] * i, u < v - 1 ? r[u + 1] * i : e.length, i, !1)) ===
              f.next && (f.steiner = !0),
              p.push(c(f));
          for (p.sort(y), u = 0; u < p.length; u++)
            o(p[u], x), (x = t(x, x.next));
          return x;
        }
        function y(e, n) {
          return e.x - n.x;
        }
        function o(e, n) {
          if ((n = p(e, n))) {
            var r = q(n, e);
            t(r, r.next);
          }
        }
        function p(e, n) {
          var t,
            r = n,
            x = e.x,
            i = e.y,
            u = -1 / 0;
          do {
            if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
              var v = r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y);
              if (v <= x && v > u) {
                if (((u = v), v === x)) {
                  if (i === r.y) return r;
                  if (i === r.next.y) return r.next;
                }
                t = r.x < r.next.x ? r : r.next;
              }
            }
            r = r.next;
          } while (r !== n);
          if (!t) return null;
          if (x === u) return t;
          var f,
            y = t,
            o = t.x,
            p = t.y,
            l = 1 / 0;
          r = t;
          do {
            x >= r.x &&
              r.x >= o &&
              x !== r.x &&
              Z(i < p ? x : u, i, o, p, i < p ? u : x, i, r.x, r.y) &&
              ((f = Math.abs(i - r.y) / (x - r.x)),
              k(r, e) &&
                (f < l ||
                  (f === l && (r.x > t.x || (r.x === t.x && a(t, r))))) &&
                ((t = r), (l = f))),
              (r = r.next);
          } while (r !== y);
          return t;
        }
        function a(e, n) {
          return g(e.prev, e, n.prev) < 0 && g(n.next, e, e.next) < 0;
        }
        function l(e, n, t, r) {
          var x = e;
          do {
            null === x.z && (x.z = s(x.x, x.y, n, t, r)),
              (x.prevZ = x.prev),
              (x.nextZ = x.next),
              (x = x.next);
          } while (x !== e);
          (x.prevZ.nextZ = null), (x.prevZ = null), h(x);
        }
        function h(e) {
          var n,
            t,
            r,
            x,
            i,
            u,
            v,
            f,
            y = 1;
          do {
            for (t = e, e = null, i = null, u = 0; t; ) {
              for (
                u++, r = t, v = 0, n = 0;
                n < y && (v++, (r = r.nextZ));
                n++
              );
              for (f = y; v > 0 || (f > 0 && r); )
                0 !== v && (0 === f || !r || t.z <= r.z)
                  ? ((x = t), (t = t.nextZ), v--)
                  : ((x = r), (r = r.nextZ), f--),
                  i ? (i.nextZ = x) : (e = x),
                  (x.prevZ = i),
                  (i = x);
              t = r;
            }
            (i.nextZ = null), (y *= 2);
          } while (u > 1);
          return e;
        }
        function s(e, n, t, r, x) {
          return (
            (e =
              1431655765 &
              ((e =
                858993459 &
                ((e =
                  252645135 &
                  ((e = 16711935 & ((e = 32767 * (e - t) * x) | (e << 8))) |
                    (e << 4))) |
                  (e << 2))) |
                (e << 1))) |
            ((n =
              1431655765 &
              ((n =
                858993459 &
                ((n =
                  252645135 &
                  ((n = 16711935 & ((n = 32767 * (n - r) * x) | (n << 8))) |
                    (n << 4))) |
                  (n << 2))) |
                (n << 1))) <<
              1)
          );
        }
        function c(e) {
          var n = e,
            t = e;
          do {
            (n.x < t.x || (n.x === t.x && n.y < t.y)) && (t = n), (n = n.next);
          } while (n !== e);
          return t;
        }
        function Z(e, n, t, r, x, i, u, v) {
          return (
            (x - u) * (n - v) - (e - u) * (i - v) >= 0 &&
            (e - u) * (r - v) - (t - u) * (n - v) >= 0 &&
            (t - u) * (i - v) - (x - u) * (r - v) >= 0
          );
        }
        function d(e, n) {
          return (
            e.next.i !== n.i &&
            e.prev.i !== n.i &&
            !b(e, n) &&
            ((k(e, n) &&
              k(n, e) &&
              j(e, n) &&
              (g(e.prev, e, n.prev) || g(e, n.prev, n))) ||
              (w(e, n) && g(e.prev, e, e.next) > 0 && g(n.prev, n, n.next) > 0))
          );
        }
        function g(e, n, t) {
          return (n.y - e.y) * (t.x - n.x) - (n.x - e.x) * (t.y - n.y);
        }
        function w(e, n) {
          return e.x === n.x && e.y === n.y;
        }
        function M(e, n, t, r) {
          var x = m(g(e, n, t)),
            i = m(g(e, n, r)),
            u = m(g(t, r, e)),
            v = m(g(t, r, n));
          return (
            (x !== i && u !== v) ||
            !(0 !== x || !z(e, t, n)) ||
              !(0 !== i || !z(e, r, n)) ||
                !(0 !== u || !z(t, e, r)) || !(0 !== v || !z(t, n, r))
          );
        }
        function z(e, n, t) {
          return (
            n.x <= Math.max(e.x, t.x) &&
            n.x >= Math.min(e.x, t.x) &&
            n.y <= Math.max(e.y, t.y) &&
            n.y >= Math.min(e.y, t.y)
          );
        }
        function m(e) {
          return e > 0 ? 1 : e < 0 ? -1 : 0;
        }
        function b(e, n) {
          var t = e;
          do {
            if (
              t.i !== e.i &&
              t.next.i !== e.i &&
              t.i !== n.i &&
              t.next.i !== n.i &&
              M(t, t.next, e, n)
            )
              return !0;
            t = t.next;
          } while (t !== e);
          return !1;
        }
        function k(e, n) {
          return g(e.prev, e, e.next) < 0
            ? g(e, n, e.next) >= 0 && g(e, e.prev, n) >= 0
            : g(e, n, e.prev) < 0 || g(e, e.next, n) < 0;
        }
        function j(e, n) {
          var t = e,
            r = !1,
            x = (e.x + n.x) / 2,
            i = (e.y + n.y) / 2;
          do {
            t.y > i != t.next.y > i &&
              t.next.y !== t.y &&
              x < ((t.next.x - t.x) * (i - t.y)) / (t.next.y - t.y) + t.x &&
              (r = !r),
              (t = t.next);
          } while (t !== e);
          return r;
        }
        function q(e, n) {
          var t = new C(e.i, e.x, e.y),
            r = new C(n.i, n.x, n.y),
            x = e.next,
            i = n.prev;
          return (
            (e.next = n),
            (n.prev = e),
            (t.next = x),
            (x.prev = t),
            (r.next = t),
            (t.prev = r),
            (i.next = r),
            (r.prev = i),
            r
          );
        }
        function A(e, n, t, r) {
          var x = new C(e, n, t);
          return (
            r
              ? ((x.next = r.next),
                (x.prev = r),
                (r.next.prev = x),
                (r.next = x))
              : ((x.prev = x), (x.next = x)),
            x
          );
        }
        function B(e) {
          (e.next.prev = e.prev),
            (e.prev.next = e.next),
            e.prevZ && (e.prevZ.nextZ = e.nextZ),
            e.nextZ && (e.nextZ.prevZ = e.prevZ);
        }
        function C(e, n, t) {
          (this.i = e),
            (this.x = n),
            (this.y = t),
            (this.prev = null),
            (this.next = null),
            (this.z = null),
            (this.prevZ = null),
            (this.nextZ = null),
            (this.steiner = !1);
        }
        function D(e, n, t, r) {
          for (var x = 0, i = n, u = t - r; i < t; i += r)
            (x += (e[u] - e[i]) * (e[i + 1] + e[u + 1])), (u = i);
          return x;
        }
        (module.exports = e),
          (module.exports.default = e),
          (e.deviation = function(e, n, t, r) {
            var x = n && n.length,
              i = x ? n[0] * t : e.length,
              u = Math.abs(D(e, 0, i, t));
            if (x)
              for (var v = 0, f = n.length; v < f; v++) {
                var y = n[v] * t,
                  o = v < f - 1 ? n[v + 1] * t : e.length;
                u -= Math.abs(D(e, y, o, t));
              }
            var p = 0;
            for (v = 0; v < r.length; v += 3) {
              var a = r[v] * t,
                l = r[v + 1] * t,
                h = r[v + 2] * t;
              p += Math.abs(
                (e[a] - e[h]) * (e[l + 1] - e[a + 1]) -
                  (e[a] - e[l]) * (e[h + 1] - e[a + 1])
              );
            }
            return 0 === u && 0 === p ? 0 : Math.abs((p - u) / u);
          }),
          (e.flatten = function(e) {
            for (
              var n = e[0][0].length,
                t = { vertices: [], holes: [], dimensions: n },
                r = 0,
                x = 0;
              x < e.length;
              x++
            ) {
              for (var i = 0; i < e[x].length; i++)
                for (var u = 0; u < n; u++) t.vertices.push(e[x][i][u]);
              x > 0 && ((r += e[x - 1].length), t.holes.push(r));
            }
            return t;
          });
      },
      {}
    ],
    oWqx: [
      function(require, module, exports) {
        var global = arguments[3];
        var define;
        var o,
          e = arguments[3];
        !(function(n) {
          var r =
              "object" == typeof exports &&
              exports &&
              !exports.nodeType &&
              exports,
            t =
              "object" == typeof module && module && !module.nodeType && module,
            u = "object" == typeof e && e;
          (u.global !== u && u.window !== u && u.self !== u) || (n = u);
          var i,
            f,
            c = 2147483647,
            l = 36,
            s = 1,
            p = 26,
            a = 38,
            d = 700,
            h = 72,
            v = 128,
            g = "-",
            w = /^xn--/,
            x = /[^\x20-\x7E]/,
            y = /[\x2E\u3002\uFF0E\uFF61]/g,
            m = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            },
            C = l - s,
            b = Math.floor,
            j = String.fromCharCode;
          function A(o) {
            throw new RangeError(m[o]);
          }
          function I(o, e) {
            for (var n = o.length, r = []; n--; ) r[n] = e(o[n]);
            return r;
          }
          function E(o, e) {
            var n = o.split("@"),
              r = "";
            return (
              n.length > 1 && ((r = n[0] + "@"), (o = n[1])),
              r + I((o = o.replace(y, ".")).split("."), e).join(".")
            );
          }
          function F(o) {
            for (var e, n, r = [], t = 0, u = o.length; t < u; )
              (e = o.charCodeAt(t++)) >= 55296 && e <= 56319 && t < u
                ? 56320 == (64512 & (n = o.charCodeAt(t++)))
                  ? r.push(((1023 & e) << 10) + (1023 & n) + 65536)
                  : (r.push(e), t--)
                : r.push(e);
            return r;
          }
          function O(o) {
            return I(o, function(o) {
              var e = "";
              return (
                o > 65535 &&
                  ((e += j((((o -= 65536) >>> 10) & 1023) | 55296)),
                  (o = 56320 | (1023 & o))),
                (e += j(o))
              );
            }).join("");
          }
          function S(o, e) {
            return o + 22 + 75 * (o < 26) - ((0 != e) << 5);
          }
          function T(o, e, n) {
            var r = 0;
            for (
              o = n ? b(o / d) : o >> 1, o += b(o / e);
              o > (C * p) >> 1;
              r += l
            )
              o = b(o / C);
            return b(r + ((C + 1) * o) / (o + a));
          }
          function L(o) {
            var e,
              n,
              r,
              t,
              u,
              i,
              f,
              a,
              d,
              w,
              x,
              y = [],
              m = o.length,
              C = 0,
              j = v,
              I = h;
            for ((n = o.lastIndexOf(g)) < 0 && (n = 0), r = 0; r < n; ++r)
              o.charCodeAt(r) >= 128 && A("not-basic"), y.push(o.charCodeAt(r));
            for (t = n > 0 ? n + 1 : 0; t < m; ) {
              for (
                u = C, i = 1, f = l;
                t >= m && A("invalid-input"),
                  ((a =
                    (x = o.charCodeAt(t++)) - 48 < 10
                      ? x - 22
                      : x - 65 < 26
                      ? x - 65
                      : x - 97 < 26
                      ? x - 97
                      : l) >= l ||
                    a > b((c - C) / i)) &&
                    A("overflow"),
                  (C += a * i),
                  !(a < (d = f <= I ? s : f >= I + p ? p : f - I));
                f += l
              )
                i > b(c / (w = l - d)) && A("overflow"), (i *= w);
              (I = T(C - u, (e = y.length + 1), 0 == u)),
                b(C / e) > c - j && A("overflow"),
                (j += b(C / e)),
                (C %= e),
                y.splice(C++, 0, j);
            }
            return O(y);
          }
          function M(o) {
            var e,
              n,
              r,
              t,
              u,
              i,
              f,
              a,
              d,
              w,
              x,
              y,
              m,
              C,
              I,
              E = [];
            for (y = (o = F(o)).length, e = v, n = 0, u = h, i = 0; i < y; ++i)
              (x = o[i]) < 128 && E.push(j(x));
            for (r = t = E.length, t && E.push(g); r < y; ) {
              for (f = c, i = 0; i < y; ++i)
                (x = o[i]) >= e && x < f && (f = x);
              for (
                f - e > b((c - n) / (m = r + 1)) && A("overflow"),
                  n += (f - e) * m,
                  e = f,
                  i = 0;
                i < y;
                ++i
              )
                if (((x = o[i]) < e && ++n > c && A("overflow"), x == e)) {
                  for (
                    a = n, d = l;
                    !(a < (w = d <= u ? s : d >= u + p ? p : d - u));
                    d += l
                  )
                    (I = a - w),
                      (C = l - w),
                      E.push(j(S(w + (I % C), 0))),
                      (a = b(I / C));
                  E.push(j(S(a, 0))), (u = T(n, m, r == t)), (n = 0), ++r;
                }
              ++n, ++e;
            }
            return E.join("");
          }
          if (
            ((i = {
              version: "1.4.1",
              ucs2: { decode: F, encode: O },
              decode: L,
              encode: M,
              toASCII: function(o) {
                return E(o, function(o) {
                  return x.test(o) ? "xn--" + M(o) : o;
                });
              },
              toUnicode: function(o) {
                return E(o, function(o) {
                  return w.test(o) ? L(o.slice(4).toLowerCase()) : o;
                });
              }
            }),
            "function" == typeof o && "object" == typeof o.amd && o.amd)
          )
            o("punycode", function() {
              return i;
            });
          else if (r && t)
            if (module.exports == r) t.exports = i;
            else for (f in i) i.hasOwnProperty(f) && (r[f] = i[f]);
          else n.punycode = i;
        })(this);
      },
      {}
    ],
    YsIc: [
      function(require, module, exports) {
        "use strict";
        module.exports = {
          isString: function(n) {
            return "string" == typeof n;
          },
          isObject: function(n) {
            return "object" == typeof n && null !== n;
          },
          isNull: function(n) {
            return null === n;
          },
          isNullOrUndefined: function(n) {
            return null == n;
          }
        };
      },
      {}
    ],
    J6GP: [
      function(require, module, exports) {
        "use strict";
        function r(r, e) {
          return Object.prototype.hasOwnProperty.call(r, e);
        }
        module.exports = function(t, n, o, a) {
          (n = n || "&"), (o = o || "=");
          var s = {};
          if ("string" != typeof t || 0 === t.length) return s;
          var p = /\+/g;
          t = t.split(n);
          var u = 1e3;
          a && "number" == typeof a.maxKeys && (u = a.maxKeys);
          var c = t.length;
          u > 0 && c > u && (c = u);
          for (var i = 0; i < c; ++i) {
            var y,
              l,
              f,
              v,
              b = t[i].replace(p, "%20"),
              d = b.indexOf(o);
            d >= 0
              ? ((y = b.substr(0, d)), (l = b.substr(d + 1)))
              : ((y = b), (l = "")),
              (f = decodeURIComponent(y)),
              (v = decodeURIComponent(l)),
              r(s, f)
                ? e(s[f])
                  ? s[f].push(v)
                  : (s[f] = [s[f], v])
                : (s[f] = v);
          }
          return s;
        };
        var e =
          Array.isArray ||
          function(r) {
            return "[object Array]" === Object.prototype.toString.call(r);
          };
      },
      {}
    ],
    bvhO: [
      function(require, module, exports) {
        "use strict";
        var n = function(n) {
          switch (typeof n) {
            case "string":
              return n;
            case "boolean":
              return n ? "true" : "false";
            case "number":
              return isFinite(n) ? n : "";
            default:
              return "";
          }
        };
        module.exports = function(o, u, c, a) {
          return (
            (u = u || "&"),
            (c = c || "="),
            null === o && (o = void 0),
            "object" == typeof o
              ? r(t(o), function(t) {
                  var a = encodeURIComponent(n(t)) + c;
                  return e(o[t])
                    ? r(o[t], function(e) {
                        return a + encodeURIComponent(n(e));
                      }).join(u)
                    : a + encodeURIComponent(n(o[t]));
                }).join(u)
              : a
              ? encodeURIComponent(n(a)) + c + encodeURIComponent(n(o))
              : ""
          );
        };
        var e =
          Array.isArray ||
          function(n) {
            return "[object Array]" === Object.prototype.toString.call(n);
          };
        function r(n, e) {
          if (n.map) return n.map(e);
          for (var r = [], t = 0; t < n.length; t++) r.push(e(n[t], t));
          return r;
        }
        var t =
          Object.keys ||
          function(n) {
            var e = [];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && e.push(r);
            return e;
          };
      },
      {}
    ],
    fk5h: [
      function(require, module, exports) {
        "use strict";
        (exports.decode = exports.parse = require("./decode")),
          (exports.encode = exports.stringify = require("./encode"));
      },
      { "./decode": "J6GP", "./encode": "bvhO" }
    ],
    Mej7: [
      function(require, module, exports) {
        "use strict";
        var t = require("punycode"),
          s = require("./util");
        function h() {
          (this.protocol = null),
            (this.slashes = null),
            (this.auth = null),
            (this.host = null),
            (this.port = null),
            (this.hostname = null),
            (this.hash = null),
            (this.search = null),
            (this.query = null),
            (this.pathname = null),
            (this.path = null),
            (this.href = null);
        }
        (exports.parse = b),
          (exports.resolve = O),
          (exports.resolveObject = d),
          (exports.format = q),
          (exports.Url = h);
        var e = /^([a-z0-9.+-]+:)/i,
          a = /:[0-9]*$/,
          r = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          o = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
          n = ["{", "}", "|", "\\", "^", "`"].concat(o),
          i = ["'"].concat(n),
          l = ["%", "/", "?", ";", "#"].concat(i),
          p = ["/", "?", "#"],
          c = 255,
          u = /^[+a-z0-9A-Z_-]{0,63}$/,
          f = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          m = { javascript: !0, "javascript:": !0 },
          v = { javascript: !0, "javascript:": !0 },
          g = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
          },
          y = require("querystring");
        function b(t, e, a) {
          if (t && s.isObject(t) && t instanceof h) return t;
          var r = new h();
          return r.parse(t, e, a), r;
        }
        function q(t) {
          return (
            s.isString(t) && (t = b(t)),
            t instanceof h ? t.format() : h.prototype.format.call(t)
          );
        }
        function O(t, s) {
          return b(t, !1, !0).resolve(s);
        }
        function d(t, s) {
          return t ? b(t, !1, !0).resolveObject(s) : s;
        }
        (h.prototype.parse = function(h, a, o) {
          if (!s.isString(h))
            throw new TypeError(
              "Parameter 'url' must be a string, not " + typeof h
            );
          var n = h.indexOf("?"),
            b = -1 !== n && n < h.indexOf("#") ? "?" : "#",
            q = h.split(b);
          q[0] = q[0].replace(/\\/g, "/");
          var O = (h = q.join(b));
          if (((O = O.trim()), !o && 1 === h.split("#").length)) {
            var d = r.exec(O);
            if (d)
              return (
                (this.path = O),
                (this.href = O),
                (this.pathname = d[1]),
                d[2]
                  ? ((this.search = d[2]),
                    (this.query = a
                      ? y.parse(this.search.substr(1))
                      : this.search.substr(1)))
                  : a && ((this.search = ""), (this.query = {})),
                this
              );
          }
          var j = e.exec(O);
          if (j) {
            var x = (j = j[0]).toLowerCase();
            (this.protocol = x), (O = O.substr(j.length));
          }
          if (o || j || O.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var A = "//" === O.substr(0, 2);
            !A || (j && v[j]) || ((O = O.substr(2)), (this.slashes = !0));
          }
          if (!v[j] && (A || (j && !g[j]))) {
            for (var C, I, w = -1, U = 0; U < p.length; U++) {
              -1 !== (k = O.indexOf(p[U])) && (-1 === w || k < w) && (w = k);
            }
            -1 !==
              (I = -1 === w ? O.lastIndexOf("@") : O.lastIndexOf("@", w)) &&
              ((C = O.slice(0, I)),
              (O = O.slice(I + 1)),
              (this.auth = decodeURIComponent(C))),
              (w = -1);
            for (U = 0; U < l.length; U++) {
              var k;
              -1 !== (k = O.indexOf(l[U])) && (-1 === w || k < w) && (w = k);
            }
            -1 === w && (w = O.length),
              (this.host = O.slice(0, w)),
              (O = O.slice(w)),
              this.parseHost(),
              (this.hostname = this.hostname || "");
            var N =
              "[" === this.hostname[0] &&
              "]" === this.hostname[this.hostname.length - 1];
            if (!N)
              for (
                var R = this.hostname.split(/\./), S = ((U = 0), R.length);
                U < S;
                U++
              ) {
                var $ = R[U];
                if ($ && !$.match(u)) {
                  for (var z = "", H = 0, L = $.length; H < L; H++)
                    $.charCodeAt(H) > 127 ? (z += "x") : (z += $[H]);
                  if (!z.match(u)) {
                    var Z = R.slice(0, U),
                      _ = R.slice(U + 1),
                      E = $.match(f);
                    E && (Z.push(E[1]), _.unshift(E[2])),
                      _.length && (O = "/" + _.join(".") + O),
                      (this.hostname = Z.join("."));
                    break;
                  }
                }
              }
            this.hostname.length > c
              ? (this.hostname = "")
              : (this.hostname = this.hostname.toLowerCase()),
              N || (this.hostname = t.toASCII(this.hostname));
            var P = this.port ? ":" + this.port : "",
              T = this.hostname || "";
            (this.host = T + P),
              (this.href += this.host),
              N &&
                ((this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )),
                "/" !== O[0] && (O = "/" + O));
          }
          if (!m[x])
            for (U = 0, S = i.length; U < S; U++) {
              var B = i[U];
              if (-1 !== O.indexOf(B)) {
                var D = encodeURIComponent(B);
                D === B && (D = escape(B)), (O = O.split(B).join(D));
              }
            }
          var F = O.indexOf("#");
          -1 !== F && ((this.hash = O.substr(F)), (O = O.slice(0, F)));
          var G = O.indexOf("?");
          if (
            (-1 !== G
              ? ((this.search = O.substr(G)),
                (this.query = O.substr(G + 1)),
                a && (this.query = y.parse(this.query)),
                (O = O.slice(0, G)))
              : a && ((this.search = ""), (this.query = {})),
            O && (this.pathname = O),
            g[x] && this.hostname && !this.pathname && (this.pathname = "/"),
            this.pathname || this.search)
          ) {
            P = this.pathname || "";
            var J = this.search || "";
            this.path = P + J;
          }
          return (this.href = this.format()), this;
        }),
          (h.prototype.format = function() {
            var t = this.auth || "";
            t &&
              ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ":")),
              (t += "@"));
            var h = this.protocol || "",
              e = this.pathname || "",
              a = this.hash || "",
              r = !1,
              o = "";
            this.host
              ? (r = t + this.host)
              : this.hostname &&
                ((r =
                  t +
                  (-1 === this.hostname.indexOf(":")
                    ? this.hostname
                    : "[" + this.hostname + "]")),
                this.port && (r += ":" + this.port)),
              this.query &&
                s.isObject(this.query) &&
                Object.keys(this.query).length &&
                (o = y.stringify(this.query));
            var n = this.search || (o && "?" + o) || "";
            return (
              h && ":" !== h.substr(-1) && (h += ":"),
              this.slashes || ((!h || g[h]) && !1 !== r)
                ? ((r = "//" + (r || "")),
                  e && "/" !== e.charAt(0) && (e = "/" + e))
                : r || (r = ""),
              a && "#" !== a.charAt(0) && (a = "#" + a),
              n && "?" !== n.charAt(0) && (n = "?" + n),
              h +
                r +
                (e = e.replace(/[?#]/g, function(t) {
                  return encodeURIComponent(t);
                })) +
                (n = n.replace("#", "%23")) +
                a
            );
          }),
          (h.prototype.resolve = function(t) {
            return this.resolveObject(b(t, !1, !0)).format();
          }),
          (h.prototype.resolveObject = function(t) {
            if (s.isString(t)) {
              var e = new h();
              e.parse(t, !1, !0), (t = e);
            }
            for (
              var a = new h(), r = Object.keys(this), o = 0;
              o < r.length;
              o++
            ) {
              var n = r[o];
              a[n] = this[n];
            }
            if (((a.hash = t.hash), "" === t.href))
              return (a.href = a.format()), a;
            if (t.slashes && !t.protocol) {
              for (var i = Object.keys(t), l = 0; l < i.length; l++) {
                var p = i[l];
                "protocol" !== p && (a[p] = t[p]);
              }
              return (
                g[a.protocol] &&
                  a.hostname &&
                  !a.pathname &&
                  (a.path = a.pathname = "/"),
                (a.href = a.format()),
                a
              );
            }
            if (t.protocol && t.protocol !== a.protocol) {
              if (!g[t.protocol]) {
                for (var c = Object.keys(t), u = 0; u < c.length; u++) {
                  var f = c[u];
                  a[f] = t[f];
                }
                return (a.href = a.format()), a;
              }
              if (((a.protocol = t.protocol), t.host || v[t.protocol]))
                a.pathname = t.pathname;
              else {
                for (
                  var m = (t.pathname || "").split("/");
                  m.length && !(t.host = m.shift());

                );
                t.host || (t.host = ""),
                  t.hostname || (t.hostname = ""),
                  "" !== m[0] && m.unshift(""),
                  m.length < 2 && m.unshift(""),
                  (a.pathname = m.join("/"));
              }
              if (
                ((a.search = t.search),
                (a.query = t.query),
                (a.host = t.host || ""),
                (a.auth = t.auth),
                (a.hostname = t.hostname || t.host),
                (a.port = t.port),
                a.pathname || a.search)
              ) {
                var y = a.pathname || "",
                  b = a.search || "";
                a.path = y + b;
              }
              return (
                (a.slashes = a.slashes || t.slashes), (a.href = a.format()), a
              );
            }
            var q = a.pathname && "/" === a.pathname.charAt(0),
              O = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
              d = O || q || (a.host && t.pathname),
              j = d,
              x = (a.pathname && a.pathname.split("/")) || [],
              A =
                ((m = (t.pathname && t.pathname.split("/")) || []),
                a.protocol && !g[a.protocol]);
            if (
              (A &&
                ((a.hostname = ""),
                (a.port = null),
                a.host && ("" === x[0] ? (x[0] = a.host) : x.unshift(a.host)),
                (a.host = ""),
                t.protocol &&
                  ((t.hostname = null),
                  (t.port = null),
                  t.host && ("" === m[0] ? (m[0] = t.host) : m.unshift(t.host)),
                  (t.host = null)),
                (d = d && ("" === m[0] || "" === x[0]))),
              O)
            )
              (a.host = t.host || "" === t.host ? t.host : a.host),
                (a.hostname =
                  t.hostname || "" === t.hostname ? t.hostname : a.hostname),
                (a.search = t.search),
                (a.query = t.query),
                (x = m);
            else if (m.length)
              x || (x = []),
                x.pop(),
                (x = x.concat(m)),
                (a.search = t.search),
                (a.query = t.query);
            else if (!s.isNullOrUndefined(t.search)) {
              if (A)
                (a.hostname = a.host = x.shift()),
                  (k =
                    !!(a.host && a.host.indexOf("@") > 0) &&
                    a.host.split("@")) &&
                    ((a.auth = k.shift()), (a.host = a.hostname = k.shift()));
              return (
                (a.search = t.search),
                (a.query = t.query),
                (s.isNull(a.pathname) && s.isNull(a.search)) ||
                  (a.path =
                    (a.pathname ? a.pathname : "") +
                    (a.search ? a.search : "")),
                (a.href = a.format()),
                a
              );
            }
            if (!x.length)
              return (
                (a.pathname = null),
                a.search ? (a.path = "/" + a.search) : (a.path = null),
                (a.href = a.format()),
                a
              );
            for (
              var C = x.slice(-1)[0],
                I =
                  ((a.host || t.host || x.length > 1) &&
                    ("." === C || ".." === C)) ||
                  "" === C,
                w = 0,
                U = x.length;
              U >= 0;
              U--
            )
              "." === (C = x[U])
                ? x.splice(U, 1)
                : ".." === C
                ? (x.splice(U, 1), w++)
                : w && (x.splice(U, 1), w--);
            if (!d && !j) for (; w--; w) x.unshift("..");
            !d ||
              "" === x[0] ||
              (x[0] && "/" === x[0].charAt(0)) ||
              x.unshift(""),
              I && "/" !== x.join("/").substr(-1) && x.push("");
            var k,
              N = "" === x[0] || (x[0] && "/" === x[0].charAt(0));
            A &&
              ((a.hostname = a.host = N ? "" : x.length ? x.shift() : ""),
              (k =
                !!(a.host && a.host.indexOf("@") > 0) && a.host.split("@")) &&
                ((a.auth = k.shift()), (a.host = a.hostname = k.shift())));
            return (
              (d = d || (a.host && x.length)) && !N && x.unshift(""),
              x.length
                ? (a.pathname = x.join("/"))
                : ((a.pathname = null), (a.path = null)),
              (s.isNull(a.pathname) && s.isNull(a.search)) ||
                (a.path =
                  (a.pathname ? a.pathname : "") + (a.search ? a.search : "")),
              (a.auth = t.auth || a.auth),
              (a.slashes = a.slashes || t.slashes),
              (a.href = a.format()),
              a
            );
          }),
          (h.prototype.parseHost = function() {
            var t = this.host,
              s = a.exec(t);
            s &&
              (":" !== (s = s[0]) && (this.port = s.substr(1)),
              (t = t.substr(0, t.length - s.length))),
              t && (this.hostname = t);
          });
      },
      { punycode: "oWqx", "./util": "YsIc", querystring: "fk5h" }
    ],
    LQBK: [
      function(require, module, exports) {
        "use strict";
        var E, _, T, A, R, N, S, O, P, I, L, M, D, U;
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.WRAP_MODES = exports.TYPES = exports.TARGETS = exports.SCALE_MODES = exports.RENDERER_TYPE = exports.PRECISION = exports.MIPMAP_MODES = exports.MASK_TYPES = exports.GC_MODES = exports.FORMATS = exports.ENV = exports.DRAW_MODES = exports.BLEND_MODES = exports.ALPHA_MODES = void 0),
          (exports.ENV = E),
          (function(E) {
            (E[(E.WEBGL_LEGACY = 0)] = "WEBGL_LEGACY"),
              (E[(E.WEBGL = 1)] = "WEBGL"),
              (E[(E.WEBGL2 = 2)] = "WEBGL2");
          })(E || (exports.ENV = E = {})),
          (exports.RENDERER_TYPE = _),
          (function(E) {
            (E[(E.UNKNOWN = 0)] = "UNKNOWN"),
              (E[(E.WEBGL = 1)] = "WEBGL"),
              (E[(E.CANVAS = 2)] = "CANVAS");
          })(_ || (exports.RENDERER_TYPE = _ = {})),
          (exports.BLEND_MODES = T),
          (function(E) {
            (E[(E.NORMAL = 0)] = "NORMAL"),
              (E[(E.ADD = 1)] = "ADD"),
              (E[(E.MULTIPLY = 2)] = "MULTIPLY"),
              (E[(E.SCREEN = 3)] = "SCREEN"),
              (E[(E.OVERLAY = 4)] = "OVERLAY"),
              (E[(E.DARKEN = 5)] = "DARKEN"),
              (E[(E.LIGHTEN = 6)] = "LIGHTEN"),
              (E[(E.COLOR_DODGE = 7)] = "COLOR_DODGE"),
              (E[(E.COLOR_BURN = 8)] = "COLOR_BURN"),
              (E[(E.HARD_LIGHT = 9)] = "HARD_LIGHT"),
              (E[(E.SOFT_LIGHT = 10)] = "SOFT_LIGHT"),
              (E[(E.DIFFERENCE = 11)] = "DIFFERENCE"),
              (E[(E.EXCLUSION = 12)] = "EXCLUSION"),
              (E[(E.HUE = 13)] = "HUE"),
              (E[(E.SATURATION = 14)] = "SATURATION"),
              (E[(E.COLOR = 15)] = "COLOR"),
              (E[(E.LUMINOSITY = 16)] = "LUMINOSITY"),
              (E[(E.NORMAL_NPM = 17)] = "NORMAL_NPM"),
              (E[(E.ADD_NPM = 18)] = "ADD_NPM"),
              (E[(E.SCREEN_NPM = 19)] = "SCREEN_NPM"),
              (E[(E.NONE = 20)] = "NONE"),
              (E[(E.SRC_OVER = 0)] = "SRC_OVER"),
              (E[(E.SRC_IN = 21)] = "SRC_IN"),
              (E[(E.SRC_OUT = 22)] = "SRC_OUT"),
              (E[(E.SRC_ATOP = 23)] = "SRC_ATOP"),
              (E[(E.DST_OVER = 24)] = "DST_OVER"),
              (E[(E.DST_IN = 25)] = "DST_IN"),
              (E[(E.DST_OUT = 26)] = "DST_OUT"),
              (E[(E.DST_ATOP = 27)] = "DST_ATOP"),
              (E[(E.ERASE = 26)] = "ERASE"),
              (E[(E.SUBTRACT = 28)] = "SUBTRACT"),
              (E[(E.XOR = 29)] = "XOR");
          })(T || (exports.BLEND_MODES = T = {})),
          (exports.DRAW_MODES = A),
          (function(E) {
            (E[(E.POINTS = 0)] = "POINTS"),
              (E[(E.LINES = 1)] = "LINES"),
              (E[(E.LINE_LOOP = 2)] = "LINE_LOOP"),
              (E[(E.LINE_STRIP = 3)] = "LINE_STRIP"),
              (E[(E.TRIANGLES = 4)] = "TRIANGLES"),
              (E[(E.TRIANGLE_STRIP = 5)] = "TRIANGLE_STRIP"),
              (E[(E.TRIANGLE_FAN = 6)] = "TRIANGLE_FAN");
          })(A || (exports.DRAW_MODES = A = {})),
          (exports.FORMATS = R),
          (function(E) {
            (E[(E.RGBA = 6408)] = "RGBA"),
              (E[(E.RGB = 6407)] = "RGB"),
              (E[(E.ALPHA = 6406)] = "ALPHA"),
              (E[(E.LUMINANCE = 6409)] = "LUMINANCE"),
              (E[(E.LUMINANCE_ALPHA = 6410)] = "LUMINANCE_ALPHA"),
              (E[(E.DEPTH_COMPONENT = 6402)] = "DEPTH_COMPONENT"),
              (E[(E.DEPTH_STENCIL = 34041)] = "DEPTH_STENCIL");
          })(R || (exports.FORMATS = R = {})),
          (exports.TARGETS = N),
          (function(E) {
            (E[(E.TEXTURE_2D = 3553)] = "TEXTURE_2D"),
              (E[(E.TEXTURE_CUBE_MAP = 34067)] = "TEXTURE_CUBE_MAP"),
              (E[(E.TEXTURE_2D_ARRAY = 35866)] = "TEXTURE_2D_ARRAY"),
              (E[(E.TEXTURE_CUBE_MAP_POSITIVE_X = 34069)] =
                "TEXTURE_CUBE_MAP_POSITIVE_X"),
              (E[(E.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070)] =
                "TEXTURE_CUBE_MAP_NEGATIVE_X"),
              (E[(E.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071)] =
                "TEXTURE_CUBE_MAP_POSITIVE_Y"),
              (E[(E.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072)] =
                "TEXTURE_CUBE_MAP_NEGATIVE_Y"),
              (E[(E.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073)] =
                "TEXTURE_CUBE_MAP_POSITIVE_Z"),
              (E[(E.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074)] =
                "TEXTURE_CUBE_MAP_NEGATIVE_Z");
          })(N || (exports.TARGETS = N = {})),
          (exports.TYPES = S),
          (function(E) {
            (E[(E.UNSIGNED_BYTE = 5121)] = "UNSIGNED_BYTE"),
              (E[(E.UNSIGNED_SHORT = 5123)] = "UNSIGNED_SHORT"),
              (E[(E.UNSIGNED_SHORT_5_6_5 = 33635)] = "UNSIGNED_SHORT_5_6_5"),
              (E[(E.UNSIGNED_SHORT_4_4_4_4 = 32819)] =
                "UNSIGNED_SHORT_4_4_4_4"),
              (E[(E.UNSIGNED_SHORT_5_5_5_1 = 32820)] =
                "UNSIGNED_SHORT_5_5_5_1"),
              (E[(E.FLOAT = 5126)] = "FLOAT"),
              (E[(E.HALF_FLOAT = 36193)] = "HALF_FLOAT");
          })(S || (exports.TYPES = S = {})),
          (exports.SCALE_MODES = O),
          (function(E) {
            (E[(E.NEAREST = 0)] = "NEAREST"), (E[(E.LINEAR = 1)] = "LINEAR");
          })(O || (exports.SCALE_MODES = O = {})),
          (exports.WRAP_MODES = P),
          (function(E) {
            (E[(E.CLAMP = 33071)] = "CLAMP"),
              (E[(E.REPEAT = 10497)] = "REPEAT"),
              (E[(E.MIRRORED_REPEAT = 33648)] = "MIRRORED_REPEAT");
          })(P || (exports.WRAP_MODES = P = {})),
          (exports.MIPMAP_MODES = I),
          (function(E) {
            (E[(E.OFF = 0)] = "OFF"),
              (E[(E.POW2 = 1)] = "POW2"),
              (E[(E.ON = 2)] = "ON");
          })(I || (exports.MIPMAP_MODES = I = {})),
          (exports.ALPHA_MODES = L),
          (function(E) {
            (E[(E.NPM = 0)] = "NPM"),
              (E[(E.UNPACK = 1)] = "UNPACK"),
              (E[(E.PMA = 2)] = "PMA"),
              (E[(E.NO_PREMULTIPLIED_ALPHA = 0)] = "NO_PREMULTIPLIED_ALPHA"),
              (E[(E.PREMULTIPLY_ON_UPLOAD = 1)] = "PREMULTIPLY_ON_UPLOAD"),
              (E[(E.PREMULTIPLY_ALPHA = 2)] = "PREMULTIPLY_ALPHA");
          })(L || (exports.ALPHA_MODES = L = {})),
          (exports.GC_MODES = M),
          (function(E) {
            (E[(E.AUTO = 0)] = "AUTO"), (E[(E.MANUAL = 1)] = "MANUAL");
          })(M || (exports.GC_MODES = M = {})),
          (exports.PRECISION = D),
          (function(E) {
            (E.LOW = "lowp"), (E.MEDIUM = "mediump"), (E.HIGH = "highp");
          })(D || (exports.PRECISION = D = {})),
          (exports.MASK_TYPES = U),
          (function(E) {
            (E[(E.NONE = 0)] = "NONE"),
              (E[(E.SCISSOR = 1)] = "SCISSOR"),
              (E[(E.STENCIL = 2)] = "STENCIL"),
              (E[(E.SPRITE = 3)] = "SPRITE");
          })(U || (exports.MASK_TYPES = U = {}));
      },
      {}
    ],
    G5Tu: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.clearTextureCache = T),
          (exports.correctBlendMode = E),
          (exports.createIndicesForQuads = D),
          (exports.decomposeDataUri = J),
          (exports.deprecation = G),
          (exports.destroyTextureCache = S),
          (exports.determineCrossOrigin = U),
          (exports.getResolutionOfUrl = W),
          (exports.hex2rgb = f),
          (exports.hex2string = d),
          (exports.isPow2 = A),
          (exports.isWebGLSupported = p),
          (exports.log2 = y),
          (exports.nextPow2 = N),
          (exports.premultiplyRgba = w),
          (exports.premultiplyTint = b),
          (exports.premultiplyTintToRgba = m),
          (exports.removeItems = _),
          (exports.rgb2hex = x),
          (exports.sayHello = l),
          (exports.sign = M),
          (exports.skipHello = u),
          (exports.string2hex = g),
          (exports.trimCanvas = B),
          (exports.uid = O),
          Object.defineProperty(exports, "isMobile", {
            enumerable: !0,
            get: function() {
              return e.isMobile;
            }
          }),
          Object.defineProperty(exports, "EventEmitter", {
            enumerable: !0,
            get: function() {
              return t.default;
            }
          }),
          Object.defineProperty(exports, "earcut", {
            enumerable: !0,
            get: function() {
              return r.default;
            }
          }),
          Object.defineProperty(exports, "url", {
            enumerable: !0,
            get: function() {
              return n.default;
            }
          }),
          (exports.premultiplyBlendMode = exports.TextureCache = exports.ProgramCache = exports.DATA_URI = exports.CanvasRenderTarget = exports.BaseTextureCache = void 0);
        var e = require("@pixi/settings"),
          t = i(require("eventemitter3")),
          r = i(require("earcut")),
          n = i(require("url")),
          o = require("@pixi/constants");
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (e.settings.RETINA_PREFIX = /@([0-9\.]+)x/),
          (e.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !0);
        var a,
          s = !1,
          c = "5.2.0";
        function u() {
          s = !0;
        }
        function l(e) {
          if (!s) {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
              var t = [
                "\n %c %c %c PixiJS " +
                  c +
                  " - ✰ " +
                  e +
                  " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n",
                "background: #ff66a5; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "color: #ff66a5; background: #030307; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "background: #ffc3dc; padding:5px 0;",
                "background: #ff66a5; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;",
                "color: #ff2424; background: #fff; padding:5px 0;"
              ];
              window.console.log.apply(console, t);
            } else
              window.console &&
                window.console.log(
                  "PixiJS " + c + " - " + e + " - http://www.pixijs.com/"
                );
            s = !0;
          }
        }
        function p() {
          return (
            void 0 === a &&
              (a = (function() {
                var t = {
                  stencil: !0,
                  failIfMajorPerformanceCaveat:
                    e.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
                };
                try {
                  if (!window.WebGLRenderingContext) return !1;
                  var r = document.createElement("canvas"),
                    n =
                      r.getContext("webgl", t) ||
                      r.getContext("experimental-webgl", t),
                    o = !(!n || !n.getContextAttributes().stencil);
                  if (n) {
                    var i = n.getExtension("WEBGL_lose_context");
                    i && i.loseContext();
                  }
                  return (n = null), o;
                } catch (a) {
                  return !1;
                }
              })()),
            a
          );
        }
        function f(e, t) {
          return (
            ((t = t || [])[0] = ((e >> 16) & 255) / 255),
            (t[1] = ((e >> 8) & 255) / 255),
            (t[2] = (255 & e) / 255),
            t
          );
        }
        function d(e) {
          return (
            (e = e.toString(16)),
            "#" + (e = "000000".substr(0, 6 - e.length) + e)
          );
        }
        function g(e) {
          return (
            "string" == typeof e && "#" === e[0] && (e = e.substr(1)),
            parseInt(e, 16)
          );
        }
        function x(e) {
          return (
            ((255 * e[0]) << 16) + ((255 * e[1]) << 8) + ((255 * e[2]) | 0)
          );
        }
        function h() {
          for (var e = [], t = [], r = 0; r < 32; r++) (e[r] = r), (t[r] = r);
          (e[o.BLEND_MODES.NORMAL_NPM] = o.BLEND_MODES.NORMAL),
            (e[o.BLEND_MODES.ADD_NPM] = o.BLEND_MODES.ADD),
            (e[o.BLEND_MODES.SCREEN_NPM] = o.BLEND_MODES.SCREEN),
            (t[o.BLEND_MODES.NORMAL] = o.BLEND_MODES.NORMAL_NPM),
            (t[o.BLEND_MODES.ADD] = o.BLEND_MODES.ADD_NPM),
            (t[o.BLEND_MODES.SCREEN] = o.BLEND_MODES.SCREEN_NPM);
          var n = [];
          return n.push(t), n.push(e), n;
        }
        var v = h();
        function E(e, t) {
          return v[t ? 1 : 0][e];
        }
        function w(e, t, r, n) {
          return (
            (r = r || new Float32Array(4)),
            n || void 0 === n
              ? ((r[0] = e[0] * t), (r[1] = e[1] * t), (r[2] = e[2] * t))
              : ((r[0] = e[0]), (r[1] = e[1]), (r[2] = e[2])),
            (r[3] = t),
            r
          );
        }
        function b(e, t) {
          if (1 === t) return ((255 * t) << 24) + e;
          if (0 === t) return 0;
          var r = (e >> 16) & 255,
            n = (e >> 8) & 255,
            o = 255 & e;
          return (
            ((255 * t) << 24) +
            ((r = (r * t + 0.5) | 0) << 16) +
            ((n = (n * t + 0.5) | 0) << 8) +
            (o = (o * t + 0.5) | 0)
          );
        }
        function m(e, t, r, n) {
          return (
            ((r = r || new Float32Array(4))[0] = ((e >> 16) & 255) / 255),
            (r[1] = ((e >> 8) & 255) / 255),
            (r[2] = (255 & e) / 255),
            (n || void 0 === n) && ((r[0] *= t), (r[1] *= t), (r[2] *= t)),
            (r[3] = t),
            r
          );
        }
        function D(e, t) {
          void 0 === t && (t = null);
          var r = 6 * e;
          if ((t = t || new Uint16Array(r)).length !== r)
            throw new Error(
              "Out buffer length is incorrect, got " +
                t.length +
                " and expected " +
                r
            );
          for (var n = 0, o = 0; n < r; n += 6, o += 4)
            (t[n + 0] = o + 0),
              (t[n + 1] = o + 1),
              (t[n + 2] = o + 2),
              (t[n + 3] = o + 0),
              (t[n + 4] = o + 2),
              (t[n + 5] = o + 3);
          return t;
        }
        function _(e, t, r) {
          var n,
            o = e.length;
          if (!(t >= o || 0 === r)) {
            var i = o - (r = t + r > o ? o - t : r);
            for (n = t; n < i; ++n) e[n] = e[n + r];
            e.length = i;
          }
        }
        exports.premultiplyBlendMode = v;
        var C = 0;
        function O() {
          return ++C;
        }
        function M(e) {
          return 0 === e ? 0 : e < 0 ? -1 : 1;
        }
        function N(e) {
          return (
            (e += 0 === e),
            --e,
            (e |= e >>> 1),
            (e |= e >>> 2),
            (e |= e >>> 4),
            (e |= e >>> 8),
            (e |= e >>> 16) + 1
          );
        }
        function A(e) {
          return !(e & (e - 1) || !e);
        }
        function y(e) {
          var t = (e > 65535) << 4,
            r = ((e >>>= t) > 255) << 3;
          return (
            (t |= r),
            (t |= r = ((e >>>= r) > 15) << 2),
            (t |= r = ((e >>>= r) > 3) << 1) | ((e >>>= r) >> 1)
          );
        }
        var R = {};
        exports.ProgramCache = R;
        var L = Object.create(null);
        exports.TextureCache = L;
        var P = Object.create(null);
        function S() {
          var e;
          for (e in L) L[e].destroy();
          for (e in P) P[e].destroy();
        }
        function T() {
          var e;
          for (e in L) delete L[e];
          for (e in P) delete P[e];
        }
        function B(e) {
          var t,
            r,
            n,
            o = e.width,
            i = e.height,
            a = e.getContext("2d"),
            s = a.getImageData(0, 0, o, i).data,
            c = s.length,
            u = { top: null, left: null, right: null, bottom: null },
            l = null;
          for (t = 0; t < c; t += 4)
            0 !== s[t + 3] &&
              ((r = (t / 4) % o),
              (n = ~~(t / 4 / o)),
              null === u.top && (u.top = n),
              null === u.left ? (u.left = r) : r < u.left && (u.left = r),
              null === u.right
                ? (u.right = r + 1)
                : u.right < r && (u.right = r + 1),
              null === u.bottom
                ? (u.bottom = n)
                : u.bottom < n && (u.bottom = n));
          return (
            null !== u.top &&
              ((o = u.right - u.left),
              (i = u.bottom - u.top + 1),
              (l = a.getImageData(u.left, u.top, o, i))),
            { height: i, width: o, data: l }
          );
        }
        exports.BaseTextureCache = P;
        var I = function(t, r, n) {
          (this.canvas = document.createElement("canvas")),
            (this.context = this.canvas.getContext("2d")),
            (this.resolution = n || e.settings.RESOLUTION),
            this.resize(t, r);
        };
        exports.CanvasRenderTarget = I;
        var k = { width: { configurable: !0 }, height: { configurable: !0 } };
        (I.prototype.clear = function() {
          this.context.setTransform(1, 0, 0, 1, 0, 0),
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }),
          (I.prototype.resize = function(e, t) {
            (this.canvas.width = e * this.resolution),
              (this.canvas.height = t * this.resolution);
          }),
          (I.prototype.destroy = function() {
            (this.context = null), (this.canvas = null);
          }),
          (k.width.get = function() {
            return this.canvas.width;
          }),
          (k.width.set = function(e) {
            this.canvas.width = e;
          }),
          (k.height.get = function() {
            return this.canvas.height;
          }),
          (k.height.set = function(e) {
            this.canvas.height = e;
          }),
          Object.defineProperties(I.prototype, k);
        var j,
          F = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
        function J(e) {
          var t = F.exec(e);
          if (t)
            return {
              mediaType: t[1] ? t[1].toLowerCase() : void 0,
              subType: t[2] ? t[2].toLowerCase() : void 0,
              charset: t[3] ? t[3].toLowerCase() : void 0,
              encoding: t[4] ? t[4].toLowerCase() : void 0,
              data: t[5]
            };
        }
        function U(e, t) {
          if ((void 0 === t && (t = window.location), 0 === e.indexOf("data:")))
            return "";
          (t = t || window.location),
            j || (j = document.createElement("a")),
            (j.href = e);
          var r =
            (!(e = n.default.parse(j.href)).port && "" === t.port) ||
            e.port === t.port;
          return e.hostname === t.hostname && r && e.protocol === t.protocol
            ? ""
            : "anonymous";
        }
        function W(t, r) {
          var n = e.settings.RETINA_PREFIX.exec(t);
          return n ? parseFloat(n[1]) : void 0 !== r ? r : 1;
        }
        exports.DATA_URI = F;
        var q = {};
        function G(e, t, r) {
          if ((void 0 === r && (r = 3), !q[t])) {
            var n = new Error().stack;
            void 0 === n
              ? console.warn(
                  "PixiJS Deprecation Warning: ",
                  t + "\nDeprecated since v" + e
                )
              : ((n = n
                  .split("\n")
                  .splice(r)
                  .join("\n")),
                console.groupCollapsed
                  ? (console.groupCollapsed(
                      "%cPixiJS Deprecation Warning: %c%s",
                      "color:#614108;background:#fffbe6",
                      "font-weight:normal;color:#614108;background:#fffbe6",
                      t + "\nDeprecated since v" + e
                    ),
                    console.warn(n),
                    console.groupEnd())
                  : (console.warn(
                      "PixiJS Deprecation Warning: ",
                      t + "\nDeprecated since v" + e
                    ),
                    console.warn(n))),
              (q[t] = !0);
          }
        }
      },
      {
        "@pixi/settings": "t4Uo",
        eventemitter3: "JJlS",
        earcut: "vwhv",
        url: "Mej7",
        "@pixi/constants": "LQBK"
      }
    ],
    oNQC: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.groupD8 = exports.Transform = exports.SHAPES = exports.RoundedRectangle = exports.Rectangle = exports.RAD_TO_DEG = exports.Polygon = exports.Point = exports.PI_2 = exports.ObservablePoint = exports.Matrix = exports.Ellipse = exports.DEG_TO_RAD = exports.Circle = void 0);
        var t = (function() {
          function t(t, i) {
            void 0 === t && (t = 0),
              void 0 === i && (i = 0),
              (this.x = t),
              (this.y = i);
          }
          return (
            (t.prototype.clone = function() {
              return new t(this.x, this.y);
            }),
            (t.prototype.copyFrom = function(t) {
              return this.set(t.x, t.y), this;
            }),
            (t.prototype.copyTo = function(t) {
              return t.set(this.x, this.y), t;
            }),
            (t.prototype.equals = function(t) {
              return t.x === this.x && t.y === this.y;
            }),
            (t.prototype.set = function(t, i) {
              void 0 === t && (t = 0),
                void 0 === i && (i = t),
                (this.x = t),
                (this.y = i);
            }),
            t
          );
        })();
        exports.Point = t;
        var i = (function() {
          function t(t, i, s, h) {
            void 0 === s && (s = 0),
              void 0 === h && (h = 0),
              (this._x = s),
              (this._y = h),
              (this.cb = t),
              (this.scope = i);
          }
          return (
            (t.prototype.clone = function(i, s) {
              return (
                void 0 === i && (i = this.cb),
                void 0 === s && (s = this.scope),
                new t(i, s, this._x, this._y)
              );
            }),
            (t.prototype.set = function(t, i) {
              void 0 === t && (t = 0),
                void 0 === i && (i = t),
                (this._x === t && this._y === i) ||
                  ((this._x = t), (this._y = i), this.cb.call(this.scope));
            }),
            (t.prototype.copyFrom = function(t) {
              return (
                (this._x === t.x && this._y === t.y) ||
                  ((this._x = t.x), (this._y = t.y), this.cb.call(this.scope)),
                this
              );
            }),
            (t.prototype.copyTo = function(t) {
              return t.set(this._x, this._y), t;
            }),
            (t.prototype.equals = function(t) {
              return t.x === this._x && t.y === this._y;
            }),
            Object.defineProperty(t.prototype, "x", {
              get: function() {
                return this._x;
              },
              set: function(t) {
                this._x !== t && ((this._x = t), this.cb.call(this.scope));
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "y", {
              get: function() {
                return this._y;
              },
              set: function(t) {
                this._y !== t && ((this._y = t), this.cb.call(this.scope));
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })();
        exports.ObservablePoint = i;
        var s = 2 * Math.PI;
        exports.PI_2 = s;
        var h = 180 / Math.PI;
        exports.RAD_TO_DEG = h;
        var o,
          r = Math.PI / 180;
        (exports.DEG_TO_RAD = r),
          (exports.SHAPES = o),
          (function(t) {
            (t[(t.POLY = 0)] = "POLY"),
              (t[(t.RECT = 1)] = "RECT"),
              (t[(t.CIRC = 2)] = "CIRC"),
              (t[(t.ELIP = 3)] = "ELIP"),
              (t[(t.RREC = 4)] = "RREC");
          })(o || (exports.SHAPES = o = {}));
        var e = (function() {
          function i(t, i, s, h, o, r) {
            void 0 === t && (t = 1),
              void 0 === i && (i = 0),
              void 0 === s && (s = 0),
              void 0 === h && (h = 1),
              void 0 === o && (o = 0),
              void 0 === r && (r = 0),
              (this.array = null),
              (this.a = t),
              (this.b = i),
              (this.c = s),
              (this.d = h),
              (this.tx = o),
              (this.ty = r);
          }
          return (
            (i.prototype.fromArray = function(t) {
              (this.a = t[0]),
                (this.b = t[1]),
                (this.c = t[3]),
                (this.d = t[4]),
                (this.tx = t[2]),
                (this.ty = t[5]);
            }),
            (i.prototype.set = function(t, i, s, h, o, r) {
              return (
                (this.a = t),
                (this.b = i),
                (this.c = s),
                (this.d = h),
                (this.tx = o),
                (this.ty = r),
                this
              );
            }),
            (i.prototype.toArray = function(t, i) {
              this.array || (this.array = new Float32Array(9));
              var s = i || this.array;
              return (
                t
                  ? ((s[0] = this.a),
                    (s[1] = this.b),
                    (s[2] = 0),
                    (s[3] = this.c),
                    (s[4] = this.d),
                    (s[5] = 0),
                    (s[6] = this.tx),
                    (s[7] = this.ty),
                    (s[8] = 1))
                  : ((s[0] = this.a),
                    (s[1] = this.c),
                    (s[2] = this.tx),
                    (s[3] = this.b),
                    (s[4] = this.d),
                    (s[5] = this.ty),
                    (s[6] = 0),
                    (s[7] = 0),
                    (s[8] = 1)),
                s
              );
            }),
            (i.prototype.apply = function(i, s) {
              s = s || new t();
              var h = i.x,
                o = i.y;
              return (
                (s.x = this.a * h + this.c * o + this.tx),
                (s.y = this.b * h + this.d * o + this.ty),
                s
              );
            }),
            (i.prototype.applyInverse = function(i, s) {
              s = s || new t();
              var h = 1 / (this.a * this.d + this.c * -this.b),
                o = i.x,
                r = i.y;
              return (
                (s.x =
                  this.d * h * o +
                  -this.c * h * r +
                  (this.ty * this.c - this.tx * this.d) * h),
                (s.y =
                  this.a * h * r +
                  -this.b * h * o +
                  (-this.ty * this.a + this.tx * this.b) * h),
                s
              );
            }),
            (i.prototype.translate = function(t, i) {
              return (this.tx += t), (this.ty += i), this;
            }),
            (i.prototype.scale = function(t, i) {
              return (
                (this.a *= t),
                (this.d *= i),
                (this.c *= t),
                (this.b *= i),
                (this.tx *= t),
                (this.ty *= i),
                this
              );
            }),
            (i.prototype.rotate = function(t) {
              var i = Math.cos(t),
                s = Math.sin(t),
                h = this.a,
                o = this.c,
                r = this.tx;
              return (
                (this.a = h * i - this.b * s),
                (this.b = h * s + this.b * i),
                (this.c = o * i - this.d * s),
                (this.d = o * s + this.d * i),
                (this.tx = r * i - this.ty * s),
                (this.ty = r * s + this.ty * i),
                this
              );
            }),
            (i.prototype.append = function(t) {
              var i = this.a,
                s = this.b,
                h = this.c,
                o = this.d;
              return (
                (this.a = t.a * i + t.b * h),
                (this.b = t.a * s + t.b * o),
                (this.c = t.c * i + t.d * h),
                (this.d = t.c * s + t.d * o),
                (this.tx = t.tx * i + t.ty * h + this.tx),
                (this.ty = t.tx * s + t.ty * o + this.ty),
                this
              );
            }),
            (i.prototype.setTransform = function(t, i, s, h, o, r, e, n, a) {
              return (
                (this.a = Math.cos(e + a) * o),
                (this.b = Math.sin(e + a) * o),
                (this.c = -Math.sin(e - n) * r),
                (this.d = Math.cos(e - n) * r),
                (this.tx = t - (s * this.a + h * this.c)),
                (this.ty = i - (s * this.b + h * this.d)),
                this
              );
            }),
            (i.prototype.prepend = function(t) {
              var i = this.tx;
              if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                var s = this.a,
                  h = this.c;
                (this.a = s * t.a + this.b * t.c),
                  (this.b = s * t.b + this.b * t.d),
                  (this.c = h * t.a + this.d * t.c),
                  (this.d = h * t.b + this.d * t.d);
              }
              return (
                (this.tx = i * t.a + this.ty * t.c + t.tx),
                (this.ty = i * t.b + this.ty * t.d + t.ty),
                this
              );
            }),
            (i.prototype.decompose = function(t) {
              var i = this.a,
                h = this.b,
                o = this.c,
                r = this.d,
                e = -Math.atan2(-o, r),
                n = Math.atan2(h, i),
                a = Math.abs(e + n);
              return (
                a < 1e-5 || Math.abs(s - a) < 1e-5
                  ? ((t.rotation = n), (t.skew.x = t.skew.y = 0))
                  : ((t.rotation = 0), (t.skew.x = e), (t.skew.y = n)),
                (t.scale.x = Math.sqrt(i * i + h * h)),
                (t.scale.y = Math.sqrt(o * o + r * r)),
                (t.position.x = this.tx),
                (t.position.y = this.ty),
                t
              );
            }),
            (i.prototype.invert = function() {
              var t = this.a,
                i = this.b,
                s = this.c,
                h = this.d,
                o = this.tx,
                r = t * h - i * s;
              return (
                (this.a = h / r),
                (this.b = -i / r),
                (this.c = -s / r),
                (this.d = t / r),
                (this.tx = (s * this.ty - h * o) / r),
                (this.ty = -(t * this.ty - i * o) / r),
                this
              );
            }),
            (i.prototype.identity = function() {
              return (
                (this.a = 1),
                (this.b = 0),
                (this.c = 0),
                (this.d = 1),
                (this.tx = 0),
                (this.ty = 0),
                this
              );
            }),
            (i.prototype.clone = function() {
              var t = new i();
              return (
                (t.a = this.a),
                (t.b = this.b),
                (t.c = this.c),
                (t.d = this.d),
                (t.tx = this.tx),
                (t.ty = this.ty),
                t
              );
            }),
            (i.prototype.copyTo = function(t) {
              return (
                (t.a = this.a),
                (t.b = this.b),
                (t.c = this.c),
                (t.d = this.d),
                (t.tx = this.tx),
                (t.ty = this.ty),
                t
              );
            }),
            (i.prototype.copyFrom = function(t) {
              return (
                (this.a = t.a),
                (this.b = t.b),
                (this.c = t.c),
                (this.d = t.d),
                (this.tx = t.tx),
                (this.ty = t.ty),
                this
              );
            }),
            Object.defineProperty(i, "IDENTITY", {
              get: function() {
                return new i();
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(i, "TEMP_MATRIX", {
              get: function() {
                return new i();
              },
              enumerable: !0,
              configurable: !0
            }),
            i
          );
        })();
        exports.Matrix = e;
        var n = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
          a = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
          c = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
          u = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
          p = [],
          y = [],
          d = Math.sign;
        function x() {
          for (var t = 0; t < 16; t++) {
            var i = [];
            p.push(i);
            for (var s = 0; s < 16; s++)
              for (
                var h = d(n[t] * n[s] + c[t] * a[s]),
                  o = d(a[t] * n[s] + u[t] * a[s]),
                  r = d(n[t] * c[s] + c[t] * u[s]),
                  x = d(a[t] * c[s] + u[t] * u[s]),
                  f = 0;
                f < 16;
                f++
              )
                if (n[f] === h && a[f] === o && c[f] === r && u[f] === x) {
                  i.push(f);
                  break;
                }
          }
          for (t = 0; t < 16; t++) {
            var l = new e();
            l.set(n[t], a[t], c[t], u[t], 0, 0), y.push(l);
          }
        }
        x();
        var f = {
          E: 0,
          SE: 1,
          S: 2,
          SW: 3,
          W: 4,
          NW: 5,
          N: 6,
          NE: 7,
          MIRROR_VERTICAL: 8,
          MAIN_DIAGONAL: 10,
          MIRROR_HORIZONTAL: 12,
          REVERSE_DIAGONAL: 14,
          uX: function(t) {
            return n[t];
          },
          uY: function(t) {
            return a[t];
          },
          vX: function(t) {
            return c[t];
          },
          vY: function(t) {
            return u[t];
          },
          inv: function(t) {
            return 8 & t ? 15 & t : 7 & -t;
          },
          add: function(t, i) {
            return p[t][i];
          },
          sub: function(t, i) {
            return p[t][f.inv(i)];
          },
          rotate180: function(t) {
            return 4 ^ t;
          },
          isVertical: function(t) {
            return 2 == (3 & t);
          },
          byDirection: function(t, i) {
            return 2 * Math.abs(t) <= Math.abs(i)
              ? i >= 0
                ? f.S
                : f.N
              : 2 * Math.abs(i) <= Math.abs(t)
              ? t > 0
                ? f.E
                : f.W
              : i > 0
              ? t > 0
                ? f.SE
                : f.SW
              : t > 0
              ? f.NE
              : f.NW;
          },
          matrixAppendRotationInv: function(t, i, s, h) {
            void 0 === s && (s = 0), void 0 === h && (h = 0);
            var o = y[f.inv(i)];
            (o.tx = s), (o.ty = h), t.append(o);
          }
        };
        exports.groupD8 = f;
        var l = (function() {
          function t() {
            (this.worldTransform = new e()),
              (this.localTransform = new e()),
              (this.position = new i(this.onChange, this, 0, 0)),
              (this.scale = new i(this.onChange, this, 1, 1)),
              (this.pivot = new i(this.onChange, this, 0, 0)),
              (this.skew = new i(this.updateSkew, this, 0, 0)),
              (this._rotation = 0),
              (this._cx = 1),
              (this._sx = 0),
              (this._cy = 0),
              (this._sy = 1),
              (this._localID = 0),
              (this._currentLocalID = 0),
              (this._worldID = 0),
              (this._parentID = 0);
          }
          return (
            (t.prototype.onChange = function() {
              this._localID++;
            }),
            (t.prototype.updateSkew = function() {
              (this._cx = Math.cos(this._rotation + this.skew.y)),
                (this._sx = Math.sin(this._rotation + this.skew.y)),
                (this._cy = -Math.sin(this._rotation - this.skew.x)),
                (this._sy = Math.cos(this._rotation - this.skew.x)),
                this._localID++;
            }),
            (t.prototype.updateLocalTransform = function() {
              var t = this.localTransform;
              this._localID !== this._currentLocalID &&
                ((t.a = this._cx * this.scale.x),
                (t.b = this._sx * this.scale.x),
                (t.c = this._cy * this.scale.y),
                (t.d = this._sy * this.scale.y),
                (t.tx =
                  this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c)),
                (t.ty =
                  this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d)),
                (this._currentLocalID = this._localID),
                (this._parentID = -1));
            }),
            (t.prototype.updateTransform = function(t) {
              var i = this.localTransform;
              if (
                (this._localID !== this._currentLocalID &&
                  ((i.a = this._cx * this.scale.x),
                  (i.b = this._sx * this.scale.x),
                  (i.c = this._cy * this.scale.y),
                  (i.d = this._sy * this.scale.y),
                  (i.tx =
                    this.position.x -
                    (this.pivot.x * i.a + this.pivot.y * i.c)),
                  (i.ty =
                    this.position.y -
                    (this.pivot.x * i.b + this.pivot.y * i.d)),
                  (this._currentLocalID = this._localID),
                  (this._parentID = -1)),
                this._parentID !== t._worldID)
              ) {
                var s = t.worldTransform,
                  h = this.worldTransform;
                (h.a = i.a * s.a + i.b * s.c),
                  (h.b = i.a * s.b + i.b * s.d),
                  (h.c = i.c * s.a + i.d * s.c),
                  (h.d = i.c * s.b + i.d * s.d),
                  (h.tx = i.tx * s.a + i.ty * s.c + s.tx),
                  (h.ty = i.tx * s.b + i.ty * s.d + s.ty),
                  (this._parentID = t._worldID),
                  this._worldID++;
              }
            }),
            (t.prototype.setFromMatrix = function(t) {
              t.decompose(this), this._localID++;
            }),
            Object.defineProperty(t.prototype, "rotation", {
              get: function() {
                return this._rotation;
              },
              set: function(t) {
                this._rotation !== t &&
                  ((this._rotation = t), this.updateSkew());
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.IDENTITY = new t()),
            t
          );
        })();
        exports.Transform = l;
        var v = (function() {
          function t(t, i, s, h) {
            void 0 === t && (t = 0),
              void 0 === i && (i = 0),
              void 0 === s && (s = 0),
              void 0 === h && (h = 0),
              (this.x = Number(t)),
              (this.y = Number(i)),
              (this.width = Number(s)),
              (this.height = Number(h)),
              (this.type = o.RECT);
          }
          return (
            Object.defineProperty(t.prototype, "left", {
              get: function() {
                return this.x;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "right", {
              get: function() {
                return this.x + this.width;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "top", {
              get: function() {
                return this.y;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "bottom", {
              get: function() {
                return this.y + this.height;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t, "EMPTY", {
              get: function() {
                return new t(0, 0, 0, 0);
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.clone = function() {
              return new t(this.x, this.y, this.width, this.height);
            }),
            (t.prototype.copyFrom = function(t) {
              return (
                (this.x = t.x),
                (this.y = t.y),
                (this.width = t.width),
                (this.height = t.height),
                this
              );
            }),
            (t.prototype.copyTo = function(t) {
              return (
                (t.x = this.x),
                (t.y = this.y),
                (t.width = this.width),
                (t.height = this.height),
                t
              );
            }),
            (t.prototype.contains = function(t, i) {
              return (
                !(this.width <= 0 || this.height <= 0) &&
                t >= this.x &&
                  t < this.x + this.width &&
                  i >= this.y &&
                  i < this.y + this.height
              );
            }),
            (t.prototype.pad = function(t, i) {
              return (
                void 0 === t && (t = 0),
                void 0 === i && (i = t),
                (this.x -= t),
                (this.y -= i),
                (this.width += 2 * t),
                (this.height += 2 * i),
                this
              );
            }),
            (t.prototype.fit = function(t) {
              var i = Math.max(this.x, t.x),
                s = Math.min(this.x + this.width, t.x + t.width),
                h = Math.max(this.y, t.y),
                o = Math.min(this.y + this.height, t.y + t.height);
              return (
                (this.x = i),
                (this.width = Math.max(s - i, 0)),
                (this.y = h),
                (this.height = Math.max(o - h, 0)),
                this
              );
            }),
            (t.prototype.ceil = function(t, i) {
              void 0 === t && (t = 1), void 0 === i && (i = 0.001);
              var s = Math.ceil((this.x + this.width - i) * t) / t,
                h = Math.ceil((this.y + this.height - i) * t) / t;
              return (
                (this.x = Math.floor((this.x + i) * t) / t),
                (this.y = Math.floor((this.y + i) * t) / t),
                (this.width = s - this.x),
                (this.height = h - this.y),
                this
              );
            }),
            (t.prototype.enlarge = function(t) {
              var i = Math.min(this.x, t.x),
                s = Math.max(this.x + this.width, t.x + t.width),
                h = Math.min(this.y, t.y),
                o = Math.max(this.y + this.height, t.y + t.height);
              return (
                (this.x = i),
                (this.width = s - i),
                (this.y = h),
                (this.height = o - h),
                this
              );
            }),
            t
          );
        })();
        exports.Rectangle = v;
        var b = (function() {
          function t(t, i, s) {
            void 0 === t && (t = 0),
              void 0 === i && (i = 0),
              void 0 === s && (s = 0),
              (this.x = t),
              (this.y = i),
              (this.radius = s),
              (this.type = o.CIRC);
          }
          return (
            (t.prototype.clone = function() {
              return new t(this.x, this.y, this.radius);
            }),
            (t.prototype.contains = function(t, i) {
              if (this.radius <= 0) return !1;
              var s = this.radius * this.radius,
                h = this.x - t,
                o = this.y - i;
              return (h *= h) + (o *= o) <= s;
            }),
            (t.prototype.getBounds = function() {
              return new v(
                this.x - this.radius,
                this.y - this.radius,
                2 * this.radius,
                2 * this.radius
              );
            }),
            t
          );
        })();
        exports.Circle = b;
        var _ = (function() {
          function t(t, i, s, h) {
            void 0 === t && (t = 0),
              void 0 === i && (i = 0),
              void 0 === s && (s = 0),
              void 0 === h && (h = 0),
              (this.x = t),
              (this.y = i),
              (this.width = s),
              (this.height = h),
              (this.type = o.ELIP);
          }
          return (
            (t.prototype.clone = function() {
              return new t(this.x, this.y, this.width, this.height);
            }),
            (t.prototype.contains = function(t, i) {
              if (this.width <= 0 || this.height <= 0) return !1;
              var s = (t - this.x) / this.width,
                h = (i - this.y) / this.height;
              return (s *= s) + (h *= h) <= 1;
            }),
            (t.prototype.getBounds = function() {
              return new v(
                this.x - this.width,
                this.y - this.height,
                this.width,
                this.height
              );
            }),
            t
          );
        })();
        exports.Ellipse = _;
        var w = (function() {
          function i() {
            for (var i = arguments, s = [], h = 0; h < arguments.length; h++)
              s[h] = i[h];
            if ((Array.isArray(s[0]) && (s = s[0]), s[0] instanceof t)) {
              for (var r = [], e = 0, n = (s = s).length; e < n; e++)
                r.push(s[e].x, s[e].y);
              s = r;
            }
            (this.points = s), (this.type = o.POLY), (this.closeStroke = !0);
          }
          return (
            (i.prototype.clone = function() {
              var t = new i(this.points.slice());
              return (t.closeStroke = this.closeStroke), t;
            }),
            (i.prototype.contains = function(t, i) {
              for (
                var s = !1, h = this.points.length / 2, o = 0, r = h - 1;
                o < h;
                r = o++
              ) {
                var e = this.points[2 * o],
                  n = this.points[2 * o + 1],
                  a = this.points[2 * r],
                  c = this.points[2 * r + 1];
                n > i != c > i &&
                  t < ((i - n) / (c - n)) * (a - e) + e &&
                  (s = !s);
              }
              return s;
            }),
            i
          );
        })();
        exports.Polygon = w;
        var g = (function() {
          function t(t, i, s, h, r) {
            void 0 === t && (t = 0),
              void 0 === i && (i = 0),
              void 0 === s && (s = 0),
              void 0 === h && (h = 0),
              void 0 === r && (r = 20),
              (this.x = t),
              (this.y = i),
              (this.width = s),
              (this.height = h),
              (this.radius = r),
              (this.type = o.RREC);
          }
          return (
            (t.prototype.clone = function() {
              return new t(
                this.x,
                this.y,
                this.width,
                this.height,
                this.radius
              );
            }),
            (t.prototype.contains = function(t, i) {
              if (this.width <= 0 || this.height <= 0) return !1;
              if (
                t >= this.x &&
                t <= this.x + this.width &&
                i >= this.y &&
                i <= this.y + this.height
              ) {
                if (
                  (i >= this.y + this.radius &&
                    i <= this.y + this.height - this.radius) ||
                  (t >= this.x + this.radius &&
                    t <= this.x + this.width - this.radius)
                )
                  return !0;
                var s = t - (this.x + this.radius),
                  h = i - (this.y + this.radius),
                  o = this.radius * this.radius;
                if (s * s + h * h <= o) return !0;
                if (
                  (s = t - (this.x + this.width - this.radius)) * s + h * h <=
                  o
                )
                  return !0;
                if (
                  s * s + (h = i - (this.y + this.height - this.radius)) * h <=
                  o
                )
                  return !0;
                if ((s = t - (this.x + this.radius)) * s + h * h <= o)
                  return !0;
              }
              return !1;
            }),
            t
          );
        })();
        exports.RoundedRectangle = g;
      },
      {}
    ],
    nL3p: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.DisplayObject = exports.Container = exports.Bounds = void 0);
        var t = require("@pixi/settings"),
          i = require("@pixi/math"),
          e = require("@pixi/utils");
        t.settings.SORTABLE_CHILDREN = !1;
        var s = function() {
          (this.minX = 1 / 0),
            (this.minY = 1 / 0),
            (this.maxX = -1 / 0),
            (this.maxY = -1 / 0),
            (this.rect = null);
        };
        (exports.Bounds = s),
          (s.prototype.isEmpty = function() {
            return this.minX > this.maxX || this.minY > this.maxY;
          }),
          (s.prototype.clear = function() {
            this.updateID++,
              (this.minX = 1 / 0),
              (this.minY = 1 / 0),
              (this.maxX = -1 / 0),
              (this.maxY = -1 / 0);
          }),
          (s.prototype.getRectangle = function(t) {
            return this.minX > this.maxX || this.minY > this.maxY
              ? i.Rectangle.EMPTY
              : (((t = t || new i.Rectangle(0, 0, 1, 1)).x = this.minX),
                (t.y = this.minY),
                (t.width = this.maxX - this.minX),
                (t.height = this.maxY - this.minY),
                t);
          }),
          (s.prototype.addPoint = function(t) {
            (this.minX = Math.min(this.minX, t.x)),
              (this.maxX = Math.max(this.maxX, t.x)),
              (this.minY = Math.min(this.minY, t.y)),
              (this.maxY = Math.max(this.maxY, t.y));
          }),
          (s.prototype.addQuad = function(t) {
            var i = this.minX,
              e = this.minY,
              s = this.maxX,
              n = this.maxY,
              r = t[0],
              o = t[1];
            (i = r < i ? r : i),
              (e = o < e ? o : e),
              (s = r > s ? r : s),
              (n = o > n ? o : n),
              (i = (r = t[2]) < i ? r : i),
              (e = (o = t[3]) < e ? o : e),
              (s = r > s ? r : s),
              (n = o > n ? o : n),
              (i = (r = t[4]) < i ? r : i),
              (e = (o = t[5]) < e ? o : e),
              (s = r > s ? r : s),
              (n = o > n ? o : n),
              (i = (r = t[6]) < i ? r : i),
              (e = (o = t[7]) < e ? o : e),
              (s = r > s ? r : s),
              (n = o > n ? o : n),
              (this.minX = i),
              (this.minY = e),
              (this.maxX = s),
              (this.maxY = n);
          }),
          (s.prototype.addFrame = function(t, i, e, s, n) {
            this.addFrameMatrix(t.worldTransform, i, e, s, n);
          }),
          (s.prototype.addFrameMatrix = function(t, i, e, s, n) {
            var r = t.a,
              o = t.b,
              h = t.c,
              a = t.d,
              l = t.tx,
              d = t.ty,
              m = this.minX,
              p = this.minY,
              u = this.maxX,
              c = this.maxY,
              f = r * i + h * e + l,
              x = o * i + a * e + d;
            (m = f < m ? f : m),
              (p = x < p ? x : p),
              (u = f > u ? f : u),
              (c = x > c ? x : c),
              (m = (f = r * s + h * e + l) < m ? f : m),
              (p = (x = o * s + a * e + d) < p ? x : p),
              (u = f > u ? f : u),
              (c = x > c ? x : c),
              (m = (f = r * i + h * n + l) < m ? f : m),
              (p = (x = o * i + a * n + d) < p ? x : p),
              (u = f > u ? f : u),
              (c = x > c ? x : c),
              (m = (f = r * s + h * n + l) < m ? f : m),
              (p = (x = o * s + a * n + d) < p ? x : p),
              (u = f > u ? f : u),
              (c = x > c ? x : c),
              (this.minX = m),
              (this.minY = p),
              (this.maxX = u),
              (this.maxY = c);
          }),
          (s.prototype.addVertexData = function(t, i, e) {
            for (
              var s = this.minX,
                n = this.minY,
                r = this.maxX,
                o = this.maxY,
                h = i;
              h < e;
              h += 2
            ) {
              var a = t[h],
                l = t[h + 1];
              (s = a < s ? a : s),
                (n = l < n ? l : n),
                (r = a > r ? a : r),
                (o = l > o ? l : o);
            }
            (this.minX = s), (this.minY = n), (this.maxX = r), (this.maxY = o);
          }),
          (s.prototype.addVertices = function(t, i, e, s) {
            this.addVerticesMatrix(t.worldTransform, i, e, s);
          }),
          (s.prototype.addVerticesMatrix = function(t, i, e, s, n, r) {
            var o = t.a,
              h = t.b,
              a = t.c,
              l = t.d,
              d = t.tx,
              m = t.ty;
            (n = n || 0), (r = r || 0);
            for (
              var p = this.minX,
                u = this.minY,
                c = this.maxX,
                f = this.maxY,
                x = e;
              x < s;
              x += 2
            ) {
              var y = i[x],
                _ = i[x + 1],
                b = o * y + a * _ + d,
                g = l * _ + h * y + m;
              (p = Math.min(p, b - n)),
                (c = Math.max(c, b + n)),
                (u = Math.min(u, g - r)),
                (f = Math.max(f, g + r));
            }
            (this.minX = p), (this.minY = u), (this.maxX = c), (this.maxY = f);
          }),
          (s.prototype.addBounds = function(t) {
            var i = this.minX,
              e = this.minY,
              s = this.maxX,
              n = this.maxY;
            (this.minX = t.minX < i ? t.minX : i),
              (this.minY = t.minY < e ? t.minY : e),
              (this.maxX = t.maxX > s ? t.maxX : s),
              (this.maxY = t.maxY > n ? t.maxY : n);
          }),
          (s.prototype.addBoundsMask = function(t, i) {
            var e = t.minX > i.minX ? t.minX : i.minX,
              s = t.minY > i.minY ? t.minY : i.minY,
              n = t.maxX < i.maxX ? t.maxX : i.maxX,
              r = t.maxY < i.maxY ? t.maxY : i.maxY;
            if (e <= n && s <= r) {
              var o = this.minX,
                h = this.minY,
                a = this.maxX,
                l = this.maxY;
              (this.minX = e < o ? e : o),
                (this.minY = s < h ? s : h),
                (this.maxX = n > a ? n : a),
                (this.maxY = r > l ? r : l);
            }
          }),
          (s.prototype.addBoundsMatrix = function(t, i) {
            this.addFrameMatrix(i, t.minX, t.minY, t.maxX, t.maxY);
          }),
          (s.prototype.addBoundsArea = function(t, i) {
            var e = t.minX > i.x ? t.minX : i.x,
              s = t.minY > i.y ? t.minY : i.y,
              n = t.maxX < i.x + i.width ? t.maxX : i.x + i.width,
              r = t.maxY < i.y + i.height ? t.maxY : i.y + i.height;
            if (e <= n && s <= r) {
              var o = this.minX,
                h = this.minY,
                a = this.maxX,
                l = this.maxY;
              (this.minX = e < o ? e : o),
                (this.minY = s < h ? s : h),
                (this.maxX = n > a ? n : a),
                (this.maxY = r > l ? r : l);
            }
          }),
          (s.prototype.pad = function(t, i) {
            (t = t || 0),
              (i = i || (0 !== i ? t : 0)),
              this.isEmpty() ||
                ((this.minX -= t),
                (this.maxX += t),
                (this.minY -= i),
                (this.maxY += i));
          }),
          (s.prototype.addFramePad = function(t, i, e, s, n, r) {
            (t -= n),
              (i -= r),
              (e += n),
              (s += r),
              (this.minX = this.minX < t ? this.minX : t),
              (this.maxX = this.maxX > e ? this.maxX : e),
              (this.minY = this.minY < i ? this.minY : i),
              (this.maxY = this.maxY > s ? this.maxY : s);
          });
        var n = (function(t) {
          function e() {
            t.call(this),
              (this.tempDisplayObjectParent = null),
              (this.transform = new i.Transform()),
              (this.alpha = 1),
              (this.visible = !0),
              (this.renderable = !0),
              (this.parent = null),
              (this.worldAlpha = 1),
              (this._lastSortedIndex = 0),
              (this._zIndex = 0),
              (this.filterArea = null),
              (this.filters = null),
              (this._enabledFilters = null),
              (this._bounds = new s()),
              (this._boundsID = 0),
              (this._lastBoundsID = -1),
              (this._boundsRect = null),
              (this._localBoundsRect = null),
              (this._mask = null),
              (this._destroyed = !1),
              (this.isSprite = !1),
              (this.isMask = !1);
          }
          t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e);
          var n = {
            _tempDisplayObjectParent: { configurable: !0 },
            x: { configurable: !0 },
            y: { configurable: !0 },
            worldTransform: { configurable: !0 },
            localTransform: { configurable: !0 },
            position: { configurable: !0 },
            scale: { configurable: !0 },
            pivot: { configurable: !0 },
            skew: { configurable: !0 },
            rotation: { configurable: !0 },
            angle: { configurable: !0 },
            zIndex: { configurable: !0 },
            worldVisible: { configurable: !0 },
            mask: { configurable: !0 }
          };
          return (
            (e.mixin = function(t) {
              for (var i = Object.keys(t), s = 0; s < i.length; ++s) {
                var n = i[s];
                Object.defineProperty(
                  e.prototype,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              }
            }),
            (n._tempDisplayObjectParent.get = function() {
              return (
                null === this.tempDisplayObjectParent &&
                  (this.tempDisplayObjectParent = new e()),
                this.tempDisplayObjectParent
              );
            }),
            (e.prototype.updateTransform = function() {
              this.transform.updateTransform(this.parent.transform),
                (this.worldAlpha = this.alpha * this.parent.worldAlpha),
                this._bounds.updateID++;
            }),
            (e.prototype._recursivePostUpdateTransform = function() {
              this.parent
                ? (this.parent._recursivePostUpdateTransform(),
                  this.transform.updateTransform(this.parent.transform))
                : this.transform.updateTransform(
                    this._tempDisplayObjectParent.transform
                  );
            }),
            (e.prototype.getBounds = function(t, e) {
              return (
                t ||
                  (this.parent
                    ? (this._recursivePostUpdateTransform(),
                      this.updateTransform())
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.updateTransform(),
                      (this.parent = null))),
                this._boundsID !== this._lastBoundsID &&
                  (this.calculateBounds(),
                  (this._lastBoundsID = this._boundsID)),
                e ||
                  (this._boundsRect || (this._boundsRect = new i.Rectangle()),
                  (e = this._boundsRect)),
                this._bounds.getRectangle(e)
              );
            }),
            (e.prototype.getLocalBounds = function(t) {
              var e = this.transform,
                s = this.parent;
              (this.parent = null),
                (this.transform = this._tempDisplayObjectParent.transform),
                t ||
                  (this._localBoundsRect ||
                    (this._localBoundsRect = new i.Rectangle()),
                  (t = this._localBoundsRect));
              var n = this.getBounds(!1, t);
              return (this.parent = s), (this.transform = e), n;
            }),
            (e.prototype.toGlobal = function(t, i, e) {
              return (
                void 0 === e && (e = !1),
                e ||
                  (this._recursivePostUpdateTransform(),
                  this.parent
                    ? this.displayObjectUpdateTransform()
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.displayObjectUpdateTransform(),
                      (this.parent = null))),
                this.worldTransform.apply(t, i)
              );
            }),
            (e.prototype.toLocal = function(t, i, e, s) {
              return (
                i && (t = i.toGlobal(t, e, s)),
                s ||
                  (this._recursivePostUpdateTransform(),
                  this.parent
                    ? this.displayObjectUpdateTransform()
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.displayObjectUpdateTransform(),
                      (this.parent = null))),
                this.worldTransform.applyInverse(t, e)
              );
            }),
            (e.prototype.render = function(t) {}),
            (e.prototype.setParent = function(t) {
              if (!t || !t.addChild)
                throw new Error("setParent: Argument must be a Container");
              return t.addChild(this), t;
            }),
            (e.prototype.setTransform = function(t, i, e, s, n, r, o, h, a) {
              return (
                void 0 === t && (t = 0),
                void 0 === i && (i = 0),
                void 0 === e && (e = 1),
                void 0 === s && (s = 1),
                void 0 === n && (n = 0),
                void 0 === r && (r = 0),
                void 0 === o && (o = 0),
                void 0 === h && (h = 0),
                void 0 === a && (a = 0),
                (this.position.x = t),
                (this.position.y = i),
                (this.scale.x = e || 1),
                (this.scale.y = s || 1),
                (this.rotation = n),
                (this.skew.x = r),
                (this.skew.y = o),
                (this.pivot.x = h),
                (this.pivot.y = a),
                this
              );
            }),
            (e.prototype.destroy = function() {
              this.removeAllListeners(),
                this.parent && this.parent.removeChild(this),
                (this.transform = null),
                (this.parent = null),
                (this._bounds = null),
                (this._currentBounds = null),
                (this._mask = null),
                (this.filters = null),
                (this.filterArea = null),
                (this.hitArea = null),
                (this.interactive = !1),
                (this.interactiveChildren = !1),
                (this._destroyed = !0);
            }),
            (n.x.get = function() {
              return this.position.x;
            }),
            (n.x.set = function(t) {
              this.transform.position.x = t;
            }),
            (n.y.get = function() {
              return this.position.y;
            }),
            (n.y.set = function(t) {
              this.transform.position.y = t;
            }),
            (n.worldTransform.get = function() {
              return this.transform.worldTransform;
            }),
            (n.localTransform.get = function() {
              return this.transform.localTransform;
            }),
            (n.position.get = function() {
              return this.transform.position;
            }),
            (n.position.set = function(t) {
              this.transform.position.copyFrom(t);
            }),
            (n.scale.get = function() {
              return this.transform.scale;
            }),
            (n.scale.set = function(t) {
              this.transform.scale.copyFrom(t);
            }),
            (n.pivot.get = function() {
              return this.transform.pivot;
            }),
            (n.pivot.set = function(t) {
              this.transform.pivot.copyFrom(t);
            }),
            (n.skew.get = function() {
              return this.transform.skew;
            }),
            (n.skew.set = function(t) {
              this.transform.skew.copyFrom(t);
            }),
            (n.rotation.get = function() {
              return this.transform.rotation;
            }),
            (n.rotation.set = function(t) {
              this.transform.rotation = t;
            }),
            (n.angle.get = function() {
              return this.transform.rotation * i.RAD_TO_DEG;
            }),
            (n.angle.set = function(t) {
              this.transform.rotation = t * i.DEG_TO_RAD;
            }),
            (n.zIndex.get = function() {
              return this._zIndex;
            }),
            (n.zIndex.set = function(t) {
              (this._zIndex = t), this.parent && (this.parent.sortDirty = !0);
            }),
            (n.worldVisible.get = function() {
              var t = this;
              do {
                if (!t.visible) return !1;
                t = t.parent;
              } while (t);
              return !0;
            }),
            (n.mask.get = function() {
              return this._mask;
            }),
            (n.mask.set = function(t) {
              if (this._mask) {
                var i = this._mask.maskObject || this._mask;
                (i.renderable = !0), (i.isMask = !1);
              }
              if (((this._mask = t), this._mask)) {
                var e = this._mask.maskObject || this._mask;
                (e.renderable = !1), (e.isMask = !0);
              }
            }),
            Object.defineProperties(e.prototype, n),
            e
          );
        })(e.EventEmitter);
        function r(t, i) {
          return t.zIndex === i.zIndex
            ? t._lastSortedIndex - i._lastSortedIndex
            : t.zIndex - i.zIndex;
        }
        (exports.DisplayObject = n),
          (n.prototype.displayObjectUpdateTransform =
            n.prototype.updateTransform);
        var o = (function(i) {
          function s() {
            i.call(this),
              (this.children = []),
              (this.sortableChildren = t.settings.SORTABLE_CHILDREN),
              (this.sortDirty = !1);
          }
          i && (s.__proto__ = i),
            (s.prototype = Object.create(i && i.prototype)),
            (s.prototype.constructor = s);
          var n = { width: { configurable: !0 }, height: { configurable: !0 } };
          return (
            (s.prototype.onChildrenChange = function() {}),
            (s.prototype.addChild = function(t) {
              var i = arguments,
                e = arguments.length;
              if (e > 1) for (var s = 0; s < e; s++) this.addChild(i[s]);
              else
                t.parent && t.parent.removeChild(t),
                  (t.parent = this),
                  (this.sortDirty = !0),
                  (t.transform._parentID = -1),
                  this.children.push(t),
                  this._boundsID++,
                  this.onChildrenChange(this.children.length - 1),
                  this.emit("childAdded", t, this, this.children.length - 1),
                  t.emit("added", this);
              return t;
            }),
            (s.prototype.addChildAt = function(t, i) {
              if (i < 0 || i > this.children.length)
                throw new Error(
                  t +
                    "addChildAt: The index " +
                    i +
                    " supplied is out of bounds " +
                    this.children.length
                );
              return (
                t.parent && t.parent.removeChild(t),
                (t.parent = this),
                (this.sortDirty = !0),
                (t.transform._parentID = -1),
                this.children.splice(i, 0, t),
                this._boundsID++,
                this.onChildrenChange(i),
                t.emit("added", this),
                this.emit("childAdded", t, this, i),
                t
              );
            }),
            (s.prototype.swapChildren = function(t, i) {
              if (t !== i) {
                var e = this.getChildIndex(t),
                  s = this.getChildIndex(i);
                (this.children[e] = i),
                  (this.children[s] = t),
                  this.onChildrenChange(e < s ? e : s);
              }
            }),
            (s.prototype.getChildIndex = function(t) {
              var i = this.children.indexOf(t);
              if (-1 === i)
                throw new Error(
                  "The supplied DisplayObject must be a child of the caller"
                );
              return i;
            }),
            (s.prototype.setChildIndex = function(t, i) {
              if (i < 0 || i >= this.children.length)
                throw new Error(
                  "The index " +
                    i +
                    " supplied is out of bounds " +
                    this.children.length
                );
              var s = this.getChildIndex(t);
              (0, e.removeItems)(this.children, s, 1),
                this.children.splice(i, 0, t),
                this.onChildrenChange(i);
            }),
            (s.prototype.getChildAt = function(t) {
              if (t < 0 || t >= this.children.length)
                throw new Error(
                  "getChildAt: Index (" + t + ") does not exist."
                );
              return this.children[t];
            }),
            (s.prototype.removeChild = function(t) {
              var i = arguments,
                s = arguments.length;
              if (s > 1) for (var n = 0; n < s; n++) this.removeChild(i[n]);
              else {
                var r = this.children.indexOf(t);
                if (-1 === r) return null;
                (t.parent = null),
                  (t.transform._parentID = -1),
                  (0, e.removeItems)(this.children, r, 1),
                  this._boundsID++,
                  this.onChildrenChange(r),
                  t.emit("removed", this),
                  this.emit("childRemoved", t, this, r);
              }
              return t;
            }),
            (s.prototype.removeChildAt = function(t) {
              var i = this.getChildAt(t);
              return (
                (i.parent = null),
                (i.transform._parentID = -1),
                (0, e.removeItems)(this.children, t, 1),
                this._boundsID++,
                this.onChildrenChange(t),
                i.emit("removed", this),
                this.emit("childRemoved", i, this, t),
                i
              );
            }),
            (s.prototype.removeChildren = function(t, i) {
              void 0 === t && (t = 0);
              var e,
                s = t,
                n = "number" == typeof i ? i : this.children.length,
                r = n - s;
              if (r > 0 && r <= n) {
                e = this.children.splice(s, r);
                for (var o = 0; o < e.length; ++o)
                  (e[o].parent = null),
                    e[o].transform && (e[o].transform._parentID = -1);
                this._boundsID++, this.onChildrenChange(t);
                for (var h = 0; h < e.length; ++h)
                  e[h].emit("removed", this),
                    this.emit("childRemoved", e[h], this, h);
                return e;
              }
              if (0 === r && 0 === this.children.length) return [];
              throw new RangeError(
                "removeChildren: numeric values are outside the acceptable range."
              );
            }),
            (s.prototype.sortChildren = function() {
              for (var t = !1, i = 0, e = this.children.length; i < e; ++i) {
                var s = this.children[i];
                (s._lastSortedIndex = i), t || 0 === s.zIndex || (t = !0);
              }
              t && this.children.length > 1 && this.children.sort(r),
                (this.sortDirty = !1);
            }),
            (s.prototype.updateTransform = function() {
              this.sortableChildren && this.sortDirty && this.sortChildren(),
                this._boundsID++,
                this.transform.updateTransform(this.parent.transform),
                (this.worldAlpha = this.alpha * this.parent.worldAlpha);
              for (var t = 0, i = this.children.length; t < i; ++t) {
                var e = this.children[t];
                e.visible && e.updateTransform();
              }
            }),
            (s.prototype.calculateBounds = function() {
              this._bounds.clear(), this._calculateBounds();
              for (var t = 0; t < this.children.length; t++) {
                var i = this.children[t];
                if (i.visible && i.renderable)
                  if ((i.calculateBounds(), i._mask)) {
                    var e = i._mask.maskObject || i._mask;
                    e.calculateBounds(),
                      this._bounds.addBoundsMask(i._bounds, e._bounds);
                  } else
                    i.filterArea
                      ? this._bounds.addBoundsArea(i._bounds, i.filterArea)
                      : this._bounds.addBounds(i._bounds);
              }
              this._lastBoundsID = this._boundsID;
            }),
            (s.prototype._calculateBounds = function() {}),
            (s.prototype.render = function(t) {
              if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                if (this._mask || (this.filters && this.filters.length))
                  this.renderAdvanced(t);
                else {
                  this._render(t);
                  for (var i = 0, e = this.children.length; i < e; ++i)
                    this.children[i].render(t);
                }
            }),
            (s.prototype.renderAdvanced = function(t) {
              t.batch.flush();
              var i = this.filters,
                e = this._mask;
              if (i) {
                this._enabledFilters || (this._enabledFilters = []),
                  (this._enabledFilters.length = 0);
                for (var s = 0; s < i.length; s++)
                  i[s].enabled && this._enabledFilters.push(i[s]);
                this._enabledFilters.length &&
                  t.filter.push(this, this._enabledFilters);
              }
              e && t.mask.push(this, this._mask), this._render(t);
              for (var n = 0, r = this.children.length; n < r; n++)
                this.children[n].render(t);
              t.batch.flush(),
                e && t.mask.pop(this, this._mask),
                i &&
                  this._enabledFilters &&
                  this._enabledFilters.length &&
                  t.filter.pop();
            }),
            (s.prototype._render = function(t) {}),
            (s.prototype.destroy = function(t) {
              i.prototype.destroy.call(this), (this.sortDirty = !1);
              var e = "boolean" == typeof t ? t : t && t.children,
                s = this.removeChildren(0, this.children.length);
              if (e) for (var n = 0; n < s.length; ++n) s[n].destroy(t);
            }),
            (n.width.get = function() {
              return this.scale.x * this.getLocalBounds().width;
            }),
            (n.width.set = function(t) {
              var i = this.getLocalBounds().width;
              (this.scale.x = 0 !== i ? t / i : 1), (this._width = t);
            }),
            (n.height.get = function() {
              return this.scale.y * this.getLocalBounds().height;
            }),
            (n.height.set = function(t) {
              var i = this.getLocalBounds().height;
              (this.scale.y = 0 !== i ? t / i : 1), (this._height = t);
            }),
            Object.defineProperties(s.prototype, n),
            s
          );
        })(n);
        (exports.Container = o),
          (o.prototype.containerUpdateTransform = o.prototype.updateTransform);
      },
      { "@pixi/settings": "t4Uo", "@pixi/math": "oNQC", "@pixi/utils": "G5Tu" }
    ],
    jM0u: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.accessibleTarget = exports.AccessibilityManager = void 0);
        var e = require("@pixi/utils"),
          t = require("@pixi/display"),
          i = {
            accessible: !1,
            accessibleTitle: null,
            accessibleHint: null,
            tabIndex: 0,
            _accessibleActive: !1,
            _accessibleDiv: !1,
            accessibleType: "button",
            accessiblePointerEvents: "auto",
            accessibleChildren: !0
          };
        (exports.accessibleTarget = i), t.DisplayObject.mixin(i);
        var s = 9,
          n = 100,
          o = 0,
          r = 0,
          l = 2,
          a = 1,
          c = -1e3,
          d = -1e3,
          h = 2,
          p = function(t) {
            (this._hookDiv = null),
              (e.isMobile.tablet || e.isMobile.phone) && this.createTouchHook();
            var i = document.createElement("div");
            (i.style.width = n + "px"),
              (i.style.height = n + "px"),
              (i.style.position = "absolute"),
              (i.style.top = o + "px"),
              (i.style.left = r + "px"),
              (i.style.zIndex = l),
              (this.div = i),
              (this.pool = []),
              (this.renderId = 0),
              (this.debug = !1),
              (this.renderer = t),
              (this.children = []),
              (this._onKeyDown = this._onKeyDown.bind(this)),
              (this._onMouseMove = this._onMouseMove.bind(this)),
              (this.isActive = !1),
              (this.isMobileAccessibility = !1),
              window.addEventListener("keydown", this._onKeyDown, !1);
          };
        (exports.AccessibilityManager = p),
          (p.prototype.createTouchHook = function() {
            var e = this,
              t = document.createElement("button");
            (t.style.width = a + "px"),
              (t.style.height = a + "px"),
              (t.style.position = "absolute"),
              (t.style.top = c + "px"),
              (t.style.left = d + "px"),
              (t.style.zIndex = h),
              (t.style.backgroundColor = "#FF0000"),
              (t.title = "HOOK DIV"),
              t.addEventListener("focus", function() {
                (e.isMobileAccessibility = !0),
                  e.activate(),
                  e.destroyTouchHook();
              }),
              document.body.appendChild(t),
              (this._hookDiv = t);
          }),
          (p.prototype.destroyTouchHook = function() {
            this._hookDiv &&
              (document.body.removeChild(this._hookDiv),
              (this._hookDiv = null));
          }),
          (p.prototype.activate = function() {
            this.isActive ||
              ((this.isActive = !0),
              window.document.addEventListener(
                "mousemove",
                this._onMouseMove,
                !0
              ),
              window.removeEventListener("keydown", this._onKeyDown, !1),
              this.renderer.on("postrender", this.update, this),
              this.renderer.view.parentNode &&
                this.renderer.view.parentNode.appendChild(this.div));
          }),
          (p.prototype.deactivate = function() {
            this.isActive &&
              !this.isMobileAccessibility &&
              ((this.isActive = !1),
              window.document.removeEventListener(
                "mousemove",
                this._onMouseMove,
                !0
              ),
              window.addEventListener("keydown", this._onKeyDown, !1),
              this.renderer.off("postrender", this.update),
              this.div.parentNode && this.div.parentNode.removeChild(this.div));
          }),
          (p.prototype.updateAccessibleObjects = function(e) {
            if (e.visible && e.accessibleChildren) {
              e.accessible &&
                e.interactive &&
                (e._accessibleActive || this.addChild(e),
                (e.renderId = this.renderId));
              for (var t = e.children, i = 0; i < t.length; i++)
                this.updateAccessibleObjects(t[i]);
            }
          }),
          (p.prototype.update = function() {
            if (this.renderer.renderingToScreen) {
              this.updateAccessibleObjects(this.renderer._lastObjectRendered);
              var t = this.renderer.view.getBoundingClientRect(),
                i = t.width / this.renderer.width,
                s = t.height / this.renderer.height,
                n = this.div;
              (n.style.left = t.left + "px"),
                (n.style.top = t.top + "px"),
                (n.style.width = this.renderer.width + "px"),
                (n.style.height = this.renderer.height + "px");
              for (var o = 0; o < this.children.length; o++) {
                var r = this.children[o];
                if (r.renderId !== this.renderId)
                  (r._accessibleActive = !1),
                    (0, e.removeItems)(this.children, o, 1),
                    this.div.removeChild(r._accessibleDiv),
                    this.pool.push(r._accessibleDiv),
                    (r._accessibleDiv = null),
                    o--,
                    0 === this.children.length && this.deactivate();
                else {
                  n = r._accessibleDiv;
                  var l = r.hitArea,
                    a = r.worldTransform;
                  r.hitArea
                    ? ((n.style.left = (a.tx + l.x * a.a) * i + "px"),
                      (n.style.top = (a.ty + l.y * a.d) * s + "px"),
                      (n.style.width = l.width * a.a * i + "px"),
                      (n.style.height = l.height * a.d * s + "px"))
                    : ((l = r.getBounds()),
                      this.capHitArea(l),
                      (n.style.left = l.x * i + "px"),
                      (n.style.top = l.y * s + "px"),
                      (n.style.width = l.width * i + "px"),
                      (n.style.height = l.height * s + "px"),
                      n.title !== r.accessibleTitle &&
                        null !== r.accessibleTitle &&
                        (n.title = r.accessibleTitle),
                      n.getAttribute("aria-label") !== r.accessibleHint &&
                        null !== r.accessibleHint &&
                        n.setAttribute("aria-label", r.accessibleHint)),
                    (r.accessibleTitle === n.title &&
                      r.tabIndex === n.tabIndex) ||
                      ((n.title = r.accessibleTitle),
                      (n.tabIndex = r.tabIndex),
                      this.debug && this.updateDebugHTML(n));
                }
              }
              this.renderId++;
            }
          }),
          (p.prototype.updateDebugHTML = function(e) {
            e.innerHTML =
              "type: " +
              e.type +
              "</br> title : " +
              e.title +
              "</br> tabIndex: " +
              e.tabIndex;
          }),
          (p.prototype.capHitArea = function(e) {
            e.x < 0 && ((e.width += e.x), (e.x = 0)),
              e.y < 0 && ((e.height += e.y), (e.y = 0)),
              e.x + e.width > this.renderer.width &&
                (e.width = this.renderer.width - e.x),
              e.y + e.height > this.renderer.height &&
                (e.height = this.renderer.height - e.y);
          }),
          (p.prototype.addChild = function(e) {
            var t = this.pool.pop();
            t ||
              (((t = document.createElement("button")).style.width = n + "px"),
              (t.style.height = n + "px"),
              (t.style.backgroundColor = this.debug
                ? "rgba(255,255,255,0.5)"
                : "transparent"),
              (t.style.position = "absolute"),
              (t.style.zIndex = l),
              (t.style.borderStyle = "none"),
              navigator.userAgent.toLowerCase().indexOf("chrome") > -1
                ? t.setAttribute("aria-live", "off")
                : t.setAttribute("aria-live", "polite"),
              navigator.userAgent.match(/rv:.*Gecko\//)
                ? t.setAttribute("aria-relevant", "additions")
                : t.setAttribute("aria-relevant", "text"),
              t.addEventListener("click", this._onClick.bind(this)),
              t.addEventListener("focus", this._onFocus.bind(this)),
              t.addEventListener("focusout", this._onFocusOut.bind(this))),
              (t.style.pointerEvents = e.accessiblePointerEvents),
              (t.type = e.accessibleType),
              e.accessibleTitle && null !== e.accessibleTitle
                ? (t.title = e.accessibleTitle)
                : (e.accessibleHint && null !== e.accessibleHint) ||
                  (t.title = "displayObject " + e.tabIndex),
              e.accessibleHint &&
                null !== e.accessibleHint &&
                t.setAttribute("aria-label", e.accessibleHint),
              this.debug && this.updateDebugHTML(t),
              (e._accessibleActive = !0),
              (e._accessibleDiv = t),
              (t.displayObject = e),
              this.children.push(e),
              this.div.appendChild(e._accessibleDiv),
              (e._accessibleDiv.tabIndex = e.tabIndex);
          }),
          (p.prototype._onClick = function(e) {
            var t = this.renderer.plugins.interaction;
            t.dispatchEvent(e.target.displayObject, "click", t.eventData),
              t.dispatchEvent(
                e.target.displayObject,
                "pointertap",
                t.eventData
              ),
              t.dispatchEvent(e.target.displayObject, "tap", t.eventData);
          }),
          (p.prototype._onFocus = function(e) {
            e.target.getAttribute("aria-live", "off") ||
              e.target.setAttribute("aria-live", "assertive");
            var t = this.renderer.plugins.interaction;
            t.dispatchEvent(e.target.displayObject, "mouseover", t.eventData);
          }),
          (p.prototype._onFocusOut = function(e) {
            e.target.getAttribute("aria-live", "off") ||
              e.target.setAttribute("aria-live", "polite");
            var t = this.renderer.plugins.interaction;
            t.dispatchEvent(e.target.displayObject, "mouseout", t.eventData);
          }),
          (p.prototype._onKeyDown = function(e) {
            e.keyCode === s && this.activate();
          }),
          (p.prototype._onMouseMove = function(e) {
            (0 === e.movementX && 0 === e.movementY) || this.deactivate();
          }),
          (p.prototype.destroy = function() {
            this.destroyTouchHook(), (this.div = null);
            for (var e = 0; e < this.children.length; e++)
              this.children[e].div = null;
            window.document.removeEventListener(
              "mousemove",
              this._onMouseMove,
              !0
            ),
              window.removeEventListener("keydown", this._onKeyDown),
              (this.pool = null),
              (this.children = null),
              (this.renderer = null);
          });
      },
      { "@pixi/utils": "G5Tu", "@pixi/display": "nL3p" }
    ],
    QNVA: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Runner = void 0);
        var t = (function() {
          function t(t) {
            (this.items = []), (this._name = t), (this._aliasCount = 0);
          }
          return (
            (t.prototype.emit = function(t, e, i, s, n, r, o, u) {
              if (arguments.length > 8)
                throw new Error("max arguments reached");
              var h = this.name,
                a = this.items;
              this._aliasCount++;
              for (var m = 0, p = a.length; m < p; m++)
                a[m][h](t, e, i, s, n, r, o, u);
              return a === this.items && this._aliasCount--, this;
            }),
            (t.prototype.ensureNonAliasedItems = function() {
              this._aliasCount > 0 &&
                this.items.length > 1 &&
                ((this._aliasCount = 0), (this.items = this.items.slice(0)));
            }),
            (t.prototype.add = function(t) {
              return (
                t[this._name] &&
                  (this.ensureNonAliasedItems(),
                  this.remove(t),
                  this.items.push(t)),
                this
              );
            }),
            (t.prototype.remove = function(t) {
              var e = this.items.indexOf(t);
              return (
                -1 !== e &&
                  (this.ensureNonAliasedItems(), this.items.splice(e, 1)),
                this
              );
            }),
            (t.prototype.contains = function(t) {
              return -1 !== this.items.indexOf(t);
            }),
            (t.prototype.removeAll = function() {
              return (
                this.ensureNonAliasedItems(), (this.items.length = 0), this
              );
            }),
            (t.prototype.destroy = function() {
              this.removeAll(), (this.items = null), (this._name = null);
            }),
            Object.defineProperty(t.prototype, "empty", {
              get: function() {
                return 0 === this.items.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "name", {
              get: function() {
                return this._name;
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })();
        (exports.Runner = t),
          Object.defineProperties(t.prototype, {
            dispatch: { value: t.prototype.emit },
            run: { value: t.prototype.emit }
          });
      },
      {}
    ],
    F3Q6: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.UPDATE_PRIORITY = exports.TickerPlugin = exports.Ticker = void 0);
        var t,
          e = require("@pixi/settings");
        (e.settings.TARGET_FPMS = 0.06),
          (exports.UPDATE_PRIORITY = t),
          (function(t) {
            (t[(t.INTERACTION = 50)] = "INTERACTION"),
              (t[(t.HIGH = 25)] = "HIGH"),
              (t[(t.NORMAL = 0)] = "NORMAL"),
              (t[(t.LOW = -25)] = "LOW"),
              (t[(t.UTILITY = -50)] = "UTILITY");
          })(t || (exports.UPDATE_PRIORITY = t = {}));
        var i = (function() {
            function t(t, e, i, s) {
              void 0 === e && (e = null),
                void 0 === i && (i = 0),
                void 0 === s && (s = !1),
                (this.fn = t),
                (this.context = e),
                (this.priority = i),
                (this.once = s),
                (this.next = null),
                (this.previous = null),
                (this._destroyed = !1);
            }
            return (
              (t.prototype.match = function(t, e) {
                return (
                  void 0 === e && (e = null),
                  this.fn === t && this.context === e
                );
              }),
              (t.prototype.emit = function(t) {
                this.fn &&
                  (this.context ? this.fn.call(this.context, t) : this.fn(t));
                var e = this.next;
                return (
                  this.once && this.destroy(!0),
                  this._destroyed && (this.next = null),
                  e
                );
              }),
              (t.prototype.connect = function(t) {
                (this.previous = t),
                  t.next && (t.next.previous = this),
                  (this.next = t.next),
                  (t.next = this);
              }),
              (t.prototype.destroy = function(t) {
                void 0 === t && (t = !1),
                  (this._destroyed = !0),
                  (this.fn = null),
                  (this.context = null),
                  this.previous && (this.previous.next = this.next),
                  this.next && (this.next.previous = this.previous);
                var e = this.next;
                return (this.next = t ? null : e), (this.previous = null), e;
              }),
              t
            );
          })(),
          s = (function() {
            function s() {
              var t = this;
              (this._head = new i(null, null, 1 / 0)),
                (this._requestId = null),
                (this._maxElapsedMS = 100),
                (this._minElapsedMS = 0),
                (this.autoStart = !1),
                (this.deltaTime = 1),
                (this.deltaMS = 1 / e.settings.TARGET_FPMS),
                (this.elapsedMS = 1 / e.settings.TARGET_FPMS),
                (this.lastTime = -1),
                (this.speed = 1),
                (this.started = !1),
                (this._protected = !1),
                (this._lastFrame = -1),
                (this._tick = function(e) {
                  (t._requestId = null),
                    t.started &&
                      (t.update(e),
                      t.started &&
                        null === t._requestId &&
                        t._head.next &&
                        (t._requestId = requestAnimationFrame(t._tick)));
                });
            }
            return (
              (s.prototype._requestIfNeeded = function() {
                null === this._requestId &&
                  this._head.next &&
                  ((this.lastTime = performance.now()),
                  (this._lastFrame = this.lastTime),
                  (this._requestId = requestAnimationFrame(this._tick)));
              }),
              (s.prototype._cancelIfNeeded = function() {
                null !== this._requestId &&
                  (cancelAnimationFrame(this._requestId),
                  (this._requestId = null));
              }),
              (s.prototype._startIfPossible = function() {
                this.started
                  ? this._requestIfNeeded()
                  : this.autoStart && this.start();
              }),
              (s.prototype.add = function(e, s, n) {
                return (
                  void 0 === n && (n = t.NORMAL),
                  this._addListener(new i(e, s, n))
                );
              }),
              (s.prototype.addOnce = function(e, s, n) {
                return (
                  void 0 === n && (n = t.NORMAL),
                  this._addListener(new i(e, s, n, !0))
                );
              }),
              (s.prototype._addListener = function(t) {
                var e = this._head.next,
                  i = this._head;
                if (e) {
                  for (; e; ) {
                    if (t.priority > e.priority) {
                      t.connect(i);
                      break;
                    }
                    (i = e), (e = e.next);
                  }
                  t.previous || t.connect(i);
                } else t.connect(i);
                return this._startIfPossible(), this;
              }),
              (s.prototype.remove = function(t, e) {
                for (var i = this._head.next; i; )
                  i = i.match(t, e) ? i.destroy() : i.next;
                return this._head.next || this._cancelIfNeeded(), this;
              }),
              (s.prototype.start = function() {
                this.started || ((this.started = !0), this._requestIfNeeded());
              }),
              (s.prototype.stop = function() {
                this.started && ((this.started = !1), this._cancelIfNeeded());
              }),
              (s.prototype.destroy = function() {
                if (!this._protected) {
                  this.stop();
                  for (var t = this._head.next; t; ) t = t.destroy(!0);
                  this._head.destroy(), (this._head = null);
                }
              }),
              (s.prototype.update = function(t) {
                var i;
                if (
                  (void 0 === t && (t = performance.now()), t > this.lastTime)
                ) {
                  if (
                    ((i = this.elapsedMS = t - this.lastTime) >
                      this._maxElapsedMS && (i = this._maxElapsedMS),
                    (i *= this.speed),
                    this._minElapsedMS)
                  ) {
                    var s = (t - this._lastFrame) | 0;
                    if (s < this._minElapsedMS) return;
                    this._lastFrame = t - (s % this._minElapsedMS);
                  }
                  (this.deltaMS = i),
                    (this.deltaTime = this.deltaMS * e.settings.TARGET_FPMS);
                  for (var n = this._head, r = n.next; r; )
                    r = r.emit(this.deltaTime);
                  n.next || this._cancelIfNeeded();
                } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
                this.lastTime = t;
              }),
              Object.defineProperty(s.prototype, "FPS", {
                get: function() {
                  return 1e3 / this.elapsedMS;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(s.prototype, "minFPS", {
                get: function() {
                  return 1e3 / this._maxElapsedMS;
                },
                set: function(t) {
                  var i = Math.min(this.maxFPS, t),
                    s = Math.min(Math.max(0, i) / 1e3, e.settings.TARGET_FPMS);
                  this._maxElapsedMS = 1 / s;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(s.prototype, "maxFPS", {
                get: function() {
                  return this._minElapsedMS
                    ? Math.round(1e3 / this._minElapsedMS)
                    : 0;
                },
                set: function(t) {
                  if (0 === t) this._minElapsedMS = 0;
                  else {
                    var e = Math.max(this.minFPS, t);
                    this._minElapsedMS = 1 / (e / 1e3);
                  }
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(s, "shared", {
                get: function() {
                  if (!s._shared) {
                    var t = (s._shared = new s());
                    (t.autoStart = !0), (t._protected = !0);
                  }
                  return s._shared;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(s, "system", {
                get: function() {
                  if (!s._system) {
                    var t = (s._system = new s());
                    (t.autoStart = !0), (t._protected = !0);
                  }
                  return s._system;
                },
                enumerable: !0,
                configurable: !0
              }),
              s
            );
          })();
        exports.Ticker = s;
        var n = (function() {
          function e() {}
          return (
            (e.init = function(e) {
              var i = this;
              (e = Object.assign({ autoStart: !0, sharedTicker: !1 }, e)),
                Object.defineProperty(this, "ticker", {
                  set: function(e) {
                    this._ticker && this._ticker.remove(this.render, this),
                      (this._ticker = e),
                      e && e.add(this.render, this, t.LOW);
                  },
                  get: function() {
                    return this._ticker;
                  }
                }),
                (this.stop = function() {
                  i._ticker.stop();
                }),
                (this.start = function() {
                  i._ticker.start();
                }),
                (this._ticker = null),
                (this.ticker = e.sharedTicker ? s.shared : new s()),
                e.autoStart && this.start();
            }),
            (e.destroy = function() {
              if (this._ticker) {
                var t = this._ticker;
                (this.ticker = null), t.destroy();
              }
            }),
            e
          );
        })();
        exports.TickerPlugin = n;
      },
      { "@pixi/settings": "t4Uo" }
    ],
    p2j5: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.autoDetectRenderer = be),
          (exports.checkMaxIfStatementsInShader = At),
          (exports.systems = exports.resources = exports.defaultVertex = exports.defaultFilterVertex = exports.ViewableBuffer = exports.UniformGroup = exports.TextureUvs = exports.TextureMatrix = exports.Texture = exports.System = exports.State = exports.SpriteMaskFilter = exports.Shader = exports.Renderer = exports.RenderTexturePool = exports.RenderTexture = exports.QuadUv = exports.Quad = exports.Program = exports.ObjectRenderer = exports.MaskData = exports.Geometry = exports.GLTexture = exports.GLProgram = exports.Framebuffer = exports.Filter = exports.CubeTexture = exports.Buffer = exports.BatchTextureArray = exports.BatchShaderGenerator = exports.BatchRenderer = exports.BatchPluginFactory = exports.BatchGeometry = exports.BatchDrawCall = exports.BaseTexture = exports.BaseRenderTexture = exports.Attribute = exports.AbstractRenderer = exports.AbstractBatchRenderer = void 0);
        var t = require("@pixi/runner"),
          e = require("@pixi/utils"),
          r = require("@pixi/constants"),
          i = require("@pixi/settings"),
          n = require("@pixi/ticker"),
          o = require("@pixi/math"),
          s = require("@pixi/display"),
          a = function(e, r) {
            void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              (this._width = e),
              (this._height = r),
              (this.destroyed = !1),
              (this.internal = !1),
              (this.onResize = new t.Runner("setRealSize", 2)),
              (this.onUpdate = new t.Runner("update")),
              (this.onError = new t.Runner("onError", 1));
          },
          h = {
            valid: { configurable: !0 },
            width: { configurable: !0 },
            height: { configurable: !0 }
          };
        (a.prototype.bind = function(t) {
          this.onResize.add(t),
            this.onUpdate.add(t),
            this.onError.add(t),
            (this._width || this._height) &&
              this.onResize.run(this._width, this._height);
        }),
          (a.prototype.unbind = function(t) {
            this.onResize.remove(t),
              this.onUpdate.remove(t),
              this.onError.remove(t);
          }),
          (a.prototype.resize = function(t, e) {
            (t === this._width && e === this._height) ||
              ((this._width = t), (this._height = e), this.onResize.run(t, e));
          }),
          (h.valid.get = function() {
            return !!this._width && !!this._height;
          }),
          (a.prototype.update = function() {
            this.destroyed || this.onUpdate.run();
          }),
          (a.prototype.load = function() {
            return Promise.resolve();
          }),
          (h.width.get = function() {
            return this._width;
          }),
          (h.height.get = function() {
            return this._height;
          }),
          (a.prototype.upload = function(t, e, r) {
            return !1;
          }),
          (a.prototype.style = function(t, e, r) {
            return !1;
          }),
          (a.prototype.dispose = function() {}),
          (a.prototype.destroy = function() {
            this.destroyed ||
              ((this.destroyed = !0),
              this.dispose(),
              this.onError.removeAll(),
              (this.onError = null),
              this.onResize.removeAll(),
              (this.onResize = null),
              this.onUpdate.removeAll(),
              (this.onUpdate = null));
          }),
          Object.defineProperties(a.prototype, h);
        var u = (function(t) {
            function i(e) {
              var r = e.naturalWidth || e.videoWidth || e.width,
                i = e.naturalHeight || e.videoHeight || e.height;
              t.call(this, r, i), (this.source = e), (this.noSubImage = !1);
            }
            return (
              t && (i.__proto__ = t),
              (i.prototype = Object.create(t && t.prototype)),
              (i.prototype.constructor = i),
              (i.crossOrigin = function(t, r, i) {
                void 0 === i && 0 !== r.indexOf("data:")
                  ? (t.crossOrigin = (0, e.determineCrossOrigin)(r))
                  : !1 !== i &&
                    (t.crossOrigin = "string" == typeof i ? i : "anonymous");
              }),
              (i.prototype.upload = function(t, e, i, n) {
                var o = t.gl,
                  s = e.realWidth,
                  a = e.realHeight;
                return (
                  (n = n || this.source),
                  o.pixelStorei(
                    o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    e.alphaMode === r.ALPHA_MODES.UNPACK
                  ),
                  this.noSubImage ||
                  e.target !== o.TEXTURE_2D ||
                  i.width !== s ||
                  i.height !== a
                    ? ((i.width = s),
                      (i.height = a),
                      o.texImage2D(e.target, 0, e.format, e.format, e.type, n))
                    : o.texSubImage2D(
                        o.TEXTURE_2D,
                        0,
                        0,
                        0,
                        e.format,
                        e.type,
                        n
                      ),
                  !0
                );
              }),
              (i.prototype.update = function() {
                if (!this.destroyed) {
                  var e =
                      this.source.naturalWidth ||
                      this.source.videoWidth ||
                      this.source.width,
                    r =
                      this.source.naturalHeight ||
                      this.source.videoHeight ||
                      this.source.height;
                  this.resize(e, r), t.prototype.update.call(this);
                }
              }),
              (i.prototype.dispose = function() {
                this.source = null;
              }),
              i
            );
          })(a),
          l = (function(t) {
            function e(e, r) {
              if (((r = r || {}), !(e instanceof HTMLImageElement))) {
                var n = new Image();
                t.crossOrigin(n, e, r.crossorigin), (n.src = e), (e = n);
              }
              t.call(this, e),
                !e.complete &&
                  this._width &&
                  this._height &&
                  ((this._width = 0), (this._height = 0)),
                (this.url = e.src),
                (this._process = null),
                (this.preserveBitmap = !1),
                (this.createBitmap =
                  (void 0 !== r.createBitmap
                    ? r.createBitmap
                    : i.settings.CREATE_IMAGE_BITMAP) &&
                  !!window.createImageBitmap),
                (this.alphaMode =
                  "number" == typeof r.alphaMode ? r.alphaMode : null),
                void 0 !== r.premultiplyAlpha &&
                  (this.premultiplyAlpha = r.premultiplyAlpha),
                (this.bitmap = null),
                (this._load = null),
                !1 !== r.autoLoad && this.load();
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.load = function(t) {
                var e = this;
                return (
                  void 0 !== t && (this.createBitmap = t),
                  this._load
                    ? this._load
                    : ((this._load = new Promise(function(t) {
                        e.url = e.source.src;
                        var r = e.source,
                          i = function() {
                            e.destroyed ||
                              ((r.onload = null),
                              (r.onerror = null),
                              e.resize(r.width, r.height),
                              (e._load = null),
                              e.createBitmap ? t(e.process()) : t(e));
                          };
                        r.complete && r.src
                          ? i()
                          : ((r.onload = i),
                            (r.onerror = function(t) {
                              return e.onError.run(t);
                            }));
                      })),
                      this._load)
                );
              }),
              (e.prototype.process = function() {
                var t = this;
                return null !== this._process
                  ? this._process
                  : null === this.bitmap && window.createImageBitmap
                  ? ((this._process = window
                      .createImageBitmap(
                        this.source,
                        0,
                        0,
                        this.source.width,
                        this.source.height,
                        {
                          premultiplyAlpha:
                            this.premultiplyAlpha === r.ALPHA_MODES.UNPACK
                              ? "premultiply"
                              : "none"
                        }
                      )
                      .then(function(e) {
                        return t.destroyed
                          ? Promise.reject()
                          : ((t.bitmap = e),
                            t.update(),
                            (t._process = null),
                            Promise.resolve(t));
                      })),
                    this._process)
                  : Promise.resolve(this);
              }),
              (e.prototype.upload = function(e, r, i) {
                if (
                  ("number" == typeof this.alphaMode &&
                    (r.alphaMode = this.alphaMode),
                  !this.createBitmap)
                )
                  return t.prototype.upload.call(this, e, r, i);
                if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
                if (
                  (t.prototype.upload.call(this, e, r, i, this.bitmap),
                  !this.preserveBitmap)
                ) {
                  var n = !0;
                  for (var o in r._glTextures) {
                    var s = r._glTextures[o];
                    if (s !== i && s.dirtyId !== r.dirtyId) {
                      n = !1;
                      break;
                    }
                  }
                  n &&
                    (this.bitmap.close && this.bitmap.close(),
                    (this.bitmap = null));
                }
                return !0;
              }),
              (e.prototype.dispose = function() {
                (this.source.onload = null),
                  (this.source.onerror = null),
                  t.prototype.dispose.call(this),
                  this.bitmap && (this.bitmap.close(), (this.bitmap = null)),
                  (this._process = null),
                  (this._load = null);
              }),
              e
            );
          })(u),
          c = [];
        function d(t, e) {
          if (!t) return null;
          var r = "";
          if ("string" == typeof t) {
            var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
            i && (r = i[1].toLowerCase());
          }
          for (var n = c.length - 1; n >= 0; --n) {
            var o = c[n];
            if (o.test && o.test(t, r)) return new o(t, e);
          }
          return new l(t, e);
        }
        var p = (function(t) {
            function e(e, r) {
              var i = r || {},
                n = i.width,
                o = i.height;
              if (!n || !o)
                throw new Error("BufferResource width or height invalid");
              t.call(this, n, o), (this.data = e);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.upload = function(t, e, i) {
                var n = t.gl;
                return (
                  n.pixelStorei(
                    n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    e.alphaMode === r.ALPHA_MODES.UNPACK
                  ),
                  i.width === e.width && i.height === e.height
                    ? n.texSubImage2D(
                        e.target,
                        0,
                        0,
                        0,
                        e.width,
                        e.height,
                        e.format,
                        e.type,
                        this.data
                      )
                    : ((i.width = e.width),
                      (i.height = e.height),
                      n.texImage2D(
                        e.target,
                        0,
                        i.internalFormat,
                        e.width,
                        e.height,
                        0,
                        e.format,
                        i.type,
                        this.data
                      )),
                  !0
                );
              }),
              (e.prototype.dispose = function() {
                this.data = null;
              }),
              (e.test = function(t) {
                return (
                  t instanceof Float32Array ||
                  t instanceof Uint8Array ||
                  t instanceof Uint32Array
                );
              }),
              e
            );
          })(a),
          f = {
            scaleMode: r.SCALE_MODES.NEAREST,
            format: r.FORMATS.RGBA,
            alphaMode: r.ALPHA_MODES.NPM
          },
          v = (function(t) {
            function n(n, o) {
              void 0 === n && (n = null),
                void 0 === o && (o = null),
                t.call(this);
              var s = (o = o || {}).alphaMode,
                h = o.mipmap,
                u = o.anisotropicLevel,
                l = o.scaleMode,
                c = o.width,
                p = o.height,
                f = o.wrapMode,
                v = o.format,
                _ = o.type,
                g = o.target,
                y = o.resolution,
                m = o.resourceOptions;
              !n || n instanceof a || ((n = d(n, m)).internal = !0),
                (this.width = c || 0),
                (this.height = p || 0),
                (this.resolution = y || i.settings.RESOLUTION),
                (this.mipmap = void 0 !== h ? h : i.settings.MIPMAP_TEXTURES),
                (this.anisotropicLevel =
                  void 0 !== u ? u : i.settings.ANISOTROPIC_LEVEL),
                (this.wrapMode = f || i.settings.WRAP_MODE),
                (this.scaleMode = void 0 !== l ? l : i.settings.SCALE_MODE),
                (this.format = v || r.FORMATS.RGBA),
                (this.type = _ || r.TYPES.UNSIGNED_BYTE),
                (this.target = g || r.TARGETS.TEXTURE_2D),
                (this.alphaMode = void 0 !== s ? s : r.ALPHA_MODES.UNPACK),
                void 0 !== o.premultiplyAlpha &&
                  (this.premultiplyAlpha = o.premultiplyAlpha),
                (this.uid = (0, e.uid)()),
                (this.touched = 0),
                (this.isPowerOfTwo = !1),
                this._refreshPOT(),
                (this._glTextures = {}),
                (this.dirtyId = 0),
                (this.dirtyStyleId = 0),
                (this.cacheId = null),
                (this.valid = c > 0 && p > 0),
                (this.textureCacheIds = []),
                (this.destroyed = !1),
                (this.resource = null),
                (this._batchEnabled = 0),
                (this._batchLocation = 0),
                this.setResource(n);
            }
            t && (n.__proto__ = t),
              (n.prototype = Object.create(t && t.prototype)),
              (n.prototype.constructor = n);
            var o = {
              realWidth: { configurable: !0 },
              realHeight: { configurable: !0 }
            };
            return (
              (o.realWidth.get = function() {
                return Math.ceil(this.width * this.resolution - 1e-4);
              }),
              (o.realHeight.get = function() {
                return Math.ceil(this.height * this.resolution - 1e-4);
              }),
              (n.prototype.setStyle = function(t, e) {
                var r;
                return (
                  void 0 !== t &&
                    t !== this.scaleMode &&
                    ((this.scaleMode = t), (r = !0)),
                  void 0 !== e &&
                    e !== this.mipmap &&
                    ((this.mipmap = e), (r = !0)),
                  r && this.dirtyStyleId++,
                  this
                );
              }),
              (n.prototype.setSize = function(t, e, r) {
                return (
                  (this.resolution = r || this.resolution),
                  (this.width = t),
                  (this.height = e),
                  this._refreshPOT(),
                  this.update(),
                  this
                );
              }),
              (n.prototype.setRealSize = function(t, e, r) {
                return (
                  (this.resolution = r || this.resolution),
                  (this.width = t / this.resolution),
                  (this.height = e / this.resolution),
                  this._refreshPOT(),
                  this.update(),
                  this
                );
              }),
              (n.prototype._refreshPOT = function() {
                this.isPowerOfTwo =
                  (0, e.isPow2)(this.realWidth) &&
                  (0, e.isPow2)(this.realHeight);
              }),
              (n.prototype.setResolution = function(t) {
                var e = this.resolution;
                return e === t
                  ? this
                  : ((this.resolution = t),
                    this.valid &&
                      ((this.width = (this.width * e) / t),
                      (this.height = (this.height * e) / t),
                      this.emit("update", this)),
                    this._refreshPOT(),
                    this);
              }),
              (n.prototype.setResource = function(t) {
                if (this.resource === t) return this;
                if (this.resource)
                  throw new Error("Resource can be set only once");
                return t.bind(this), (this.resource = t), this;
              }),
              (n.prototype.update = function() {
                this.valid
                  ? (this.dirtyId++,
                    this.dirtyStyleId++,
                    this.emit("update", this))
                  : this.width > 0 &&
                    this.height > 0 &&
                    ((this.valid = !0),
                    this.emit("loaded", this),
                    this.emit("update", this));
              }),
              (n.prototype.onError = function(t) {
                this.emit("error", this, t);
              }),
              (n.prototype.destroy = function() {
                this.resource &&
                  (this.resource.unbind(this),
                  this.resource.internal && this.resource.destroy(),
                  (this.resource = null)),
                  this.cacheId &&
                    (delete e.BaseTextureCache[this.cacheId],
                    delete e.TextureCache[this.cacheId],
                    (this.cacheId = null)),
                  this.dispose(),
                  n.removeFromCache(this),
                  (this.textureCacheIds = null),
                  (this.destroyed = !0);
              }),
              (n.prototype.dispose = function() {
                this.emit("dispose", this);
              }),
              (n.from = function(t, r, o) {
                void 0 === o && (o = i.settings.STRICT_TEXTURE_CACHE);
                var s = "string" == typeof t,
                  a = null;
                s
                  ? (a = t)
                  : (t._pixiId || (t._pixiId = "pixiid_" + (0, e.uid)()),
                    (a = t._pixiId));
                var h = e.BaseTextureCache[a];
                if (s && o && !h)
                  throw new Error(
                    'The cacheId "' +
                      a +
                      '" does not exist in BaseTextureCache.'
                  );
                return (
                  h || (((h = new n(t, r)).cacheId = a), n.addToCache(h, a)), h
                );
              }),
              (n.fromBuffer = function(t, e, i, o) {
                t = t || new Float32Array(e * i * 4);
                var s = new p(t, { width: e, height: i }),
                  a =
                    t instanceof Float32Array
                      ? r.TYPES.FLOAT
                      : r.TYPES.UNSIGNED_BYTE;
                return new n(
                  s,
                  Object.assign(f, o || { width: e, height: i, type: a })
                );
              }),
              (n.addToCache = function(t, r) {
                r &&
                  (-1 === t.textureCacheIds.indexOf(r) &&
                    t.textureCacheIds.push(r),
                  e.BaseTextureCache[r] &&
                    console.warn(
                      "BaseTexture added to the cache with an id [" +
                        r +
                        "] that already had an entry"
                    ),
                  (e.BaseTextureCache[r] = t));
              }),
              (n.removeFromCache = function(t) {
                if ("string" == typeof t) {
                  var r = e.BaseTextureCache[t];
                  if (r) {
                    var i = r.textureCacheIds.indexOf(t);
                    return (
                      i > -1 && r.textureCacheIds.splice(i, 1),
                      delete e.BaseTextureCache[t],
                      r
                    );
                  }
                } else if (t && t.textureCacheIds) {
                  for (var n = 0; n < t.textureCacheIds.length; ++n)
                    delete e.BaseTextureCache[t.textureCacheIds[n]];
                  return (t.textureCacheIds.length = 0), t;
                }
                return null;
              }),
              Object.defineProperties(n.prototype, o),
              n
            );
          })(e.EventEmitter);
        (exports.BaseTexture = v), (v._globalBatch = 0);
        var _ = (function(t) {
            function e(e, r) {
              var i;
              r = r || {};
              var n = e;
              Array.isArray(e) && ((i = e), (n = e.length)),
                t.call(this, r.width, r.height),
                (this.items = []),
                (this.itemDirtyIds = []);
              for (var o = 0; o < n; o++) {
                var s = new v();
                this.items.push(s), this.itemDirtyIds.push(-1);
              }
              if (((this.length = n), (this._load = null), i))
                for (var a = 0; a < n; a++) this.addResourceAt(d(i[a], r), a);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.dispose = function() {
                for (var t = 0, e = this.length; t < e; t++)
                  this.items[t].destroy();
                (this.items = null),
                  (this.itemDirtyIds = null),
                  (this._load = null);
              }),
              (e.prototype.addResourceAt = function(t, e) {
                if (!this.items[e])
                  throw new Error("Index " + e + " is out of bounds");
                return (
                  t.valid && !this.valid && this.resize(t.width, t.height),
                  this.items[e].setResource(t),
                  this
                );
              }),
              (e.prototype.bind = function(e) {
                t.prototype.bind.call(this, e),
                  (e.target = r.TARGETS.TEXTURE_2D_ARRAY);
                for (var i = 0; i < this.length; i++)
                  this.items[i].on("update", e.update, e);
              }),
              (e.prototype.unbind = function(e) {
                t.prototype.unbind.call(this, e);
                for (var r = 0; r < this.length; r++)
                  this.items[r].off("update", e.update, e);
              }),
              (e.prototype.load = function() {
                var t = this;
                if (this._load) return this._load;
                var e = this.items.map(function(t) {
                    return t.resource;
                  }),
                  r = e.map(function(t) {
                    return t.load();
                  });
                return (
                  (this._load = Promise.all(r).then(function() {
                    var r = e[0],
                      i = r.width,
                      n = r.height;
                    return t.resize(i, n), Promise.resolve(t);
                  })),
                  this._load
                );
              }),
              (e.prototype.upload = function(t, e, r) {
                var i = this.length,
                  n = this.itemDirtyIds,
                  o = this.items,
                  s = t.gl;
                r.dirtyId < 0 &&
                  s.texImage3D(
                    s.TEXTURE_2D_ARRAY,
                    0,
                    e.format,
                    this._width,
                    this._height,
                    i,
                    0,
                    e.format,
                    e.type,
                    null
                  );
                for (var a = 0; a < i; a++) {
                  var h = o[a];
                  n[a] < h.dirtyId &&
                    ((n[a] = h.dirtyId),
                    h.valid &&
                      s.texSubImage3D(
                        s.TEXTURE_2D_ARRAY,
                        0,
                        0,
                        0,
                        a,
                        h.resource.width,
                        h.resource.height,
                        1,
                        e.format,
                        e.type,
                        h.resource.source
                      ));
                }
                return !0;
              }),
              e
            );
          })(a),
          g = (function(t) {
            function e() {
              t.apply(this, arguments);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.test = function(t) {
                var e = window.OffscreenCanvas;
                return (
                  !!(e && t instanceof e) || t instanceof HTMLCanvasElement
                );
              }),
              e
            );
          })(u),
          y = (function(t) {
            function e(i, n) {
              if (((n = n || {}), t.call(this, i, n), this.length !== e.SIDES))
                throw new Error(
                  "Invalid length. Got " + this.length + ", expected 6"
                );
              for (var o = 0; o < e.SIDES; o++)
                this.items[o].target =
                  r.TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + o;
              !1 !== n.autoLoad && this.load();
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.bind = function(e) {
                t.prototype.bind.call(this, e),
                  (e.target = r.TARGETS.TEXTURE_CUBE_MAP);
              }),
              (e.prototype.upload = function(t, r, i) {
                for (var n = this.itemDirtyIds, o = 0; o < e.SIDES; o++) {
                  var s = this.items[o];
                  n[o] < s.dirtyId &&
                    ((n[o] = s.dirtyId), s.valid && s.resource.upload(t, s, i));
                }
                return !0;
              }),
              e
            );
          })(_);
        y.SIDES = 6;
        var m = (function(t) {
          function r(e, r) {
            (r = r || {}),
              t.call(this, document.createElement("canvas")),
              (this._width = 0),
              (this._height = 0),
              (this.svg = e),
              (this.scale = r.scale || 1),
              (this._overrideWidth = r.width),
              (this._overrideHeight = r.height),
              (this._resolve = null),
              (this._crossorigin = r.crossorigin),
              (this._load = null),
              !1 !== r.autoLoad && this.load();
          }
          return (
            t && (r.__proto__ = t),
            (r.prototype = Object.create(t && t.prototype)),
            (r.prototype.constructor = r),
            (r.prototype.load = function() {
              var t = this;
              return this._load
                ? this._load
                : ((this._load = new Promise(function(e) {
                    if (
                      ((t._resolve = function() {
                        t.resize(t.source.width, t.source.height), e(t);
                      }),
                      /^\<svg/.test(t.svg.trim()))
                    ) {
                      if (!btoa)
                        throw new Error(
                          "Your browser doesn't support base64 conversions."
                        );
                      t.svg =
                        "data:image/svg+xml;base64," +
                        btoa(unescape(encodeURIComponent(t.svg)));
                    }
                    t._loadSvg();
                  })),
                  this._load);
            }),
            (r.prototype._loadSvg = function() {
              var r = this,
                i = new Image();
              t.crossOrigin(i, this.svg, this._crossorigin),
                (i.src = this.svg),
                (i.onerror = function(t) {
                  (i.onerror = null), r.onError.run(t);
                }),
                (i.onload = function() {
                  var t = i.width,
                    n = i.height;
                  if (!t || !n)
                    throw new Error(
                      "The SVG image must have width and height defined (in pixels), canvas API needs them."
                    );
                  var o = t * r.scale,
                    s = n * r.scale;
                  (r._overrideWidth || r._overrideHeight) &&
                    ((o = r._overrideWidth || (r._overrideHeight / n) * t),
                    (s = r._overrideHeight || (r._overrideWidth / t) * n)),
                    (o = Math.round(o)),
                    (s = Math.round(s));
                  var a = r.source;
                  (a.width = o),
                    (a.height = s),
                    (a._pixiId = "canvas_" + (0, e.uid)()),
                    a.getContext("2d").drawImage(i, 0, 0, t, n, 0, 0, o, s),
                    r._resolve(),
                    (r._resolve = null);
                });
            }),
            (r.getSize = function(t) {
              var e = r.SVG_SIZE.exec(t),
                i = {};
              return (
                e &&
                  ((i[e[1]] = Math.round(parseFloat(e[3]))),
                  (i[e[5]] = Math.round(parseFloat(e[7])))),
                i
              );
            }),
            (r.prototype.dispose = function() {
              t.prototype.dispose.call(this),
                (this._resolve = null),
                (this._crossorigin = null);
            }),
            (r.test = function(t, e) {
              return (
                "svg" === e ||
                ("string" == typeof t &&
                  0 === t.indexOf("data:image/svg+xml;base64")) ||
                ("string" == typeof t && 0 === t.indexOf("<svg"))
              );
            }),
            r
          );
        })(u);
        m.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
        var x = (function(t) {
          function e(e, r) {
            if (((r = r || {}), !(e instanceof HTMLVideoElement))) {
              var i = document.createElement("video");
              i.setAttribute("preload", "auto"),
                i.setAttribute("webkit-playsinline", ""),
                i.setAttribute("playsinline", ""),
                "string" == typeof e && (e = [e]),
                t.crossOrigin(i, e[0].src || e[0], r.crossorigin);
              for (var n = 0; n < e.length; ++n) {
                var o = document.createElement("source"),
                  s = e[n],
                  a = s.src,
                  h = s.mime,
                  u = (a = a || e[n])
                    .split("?")
                    .shift()
                    .toLowerCase(),
                  l = u.substr(u.lastIndexOf(".") + 1);
                (h = h || "video/" + l),
                  (o.src = a),
                  (o.type = h),
                  i.appendChild(o);
              }
              e = i;
            }
            t.call(this, e),
              (this.noSubImage = !0),
              (this._autoUpdate = !0),
              (this._isAutoUpdating = !1),
              (this._updateFPS = r.updateFPS || 0),
              (this._msToNextUpdate = 0),
              (this.autoPlay = !1 !== r.autoPlay),
              (this._load = null),
              (this._resolve = null),
              (this._onCanPlay = this._onCanPlay.bind(this)),
              (this._onError = this._onError.bind(this)),
              !1 !== r.autoLoad && this.load();
          }
          t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e);
          var r = {
            autoUpdate: { configurable: !0 },
            updateFPS: { configurable: !0 }
          };
          return (
            (e.prototype.update = function(e) {
              if ((void 0 === e && (e = 0), !this.destroyed)) {
                var r = n.Ticker.shared.elapsedMS * this.source.playbackRate;
                (this._msToNextUpdate = Math.floor(this._msToNextUpdate - r)),
                  (!this._updateFPS || this._msToNextUpdate <= 0) &&
                    (t.prototype.update.call(this, e),
                    (this._msToNextUpdate = this._updateFPS
                      ? Math.floor(1e3 / this._updateFPS)
                      : 0));
              }
            }),
            (e.prototype.load = function() {
              var t = this;
              if (this._load) return this._load;
              var e = this.source;
              return (
                (e.readyState === e.HAVE_ENOUGH_DATA ||
                  e.readyState === e.HAVE_FUTURE_DATA) &&
                  e.width &&
                  e.height &&
                  (e.complete = !0),
                e.addEventListener("play", this._onPlayStart.bind(this)),
                e.addEventListener("pause", this._onPlayStop.bind(this)),
                this._isSourceReady()
                  ? this._onCanPlay()
                  : (e.addEventListener("canplay", this._onCanPlay),
                    e.addEventListener("canplaythrough", this._onCanPlay),
                    e.addEventListener("error", this._onError, !0)),
                (this._load = new Promise(function(r) {
                  t.valid ? r(t) : ((t._resolve = r), e.load());
                })),
                this._load
              );
            }),
            (e.prototype._onError = function() {
              this.source.removeEventListener("error", this._onError, !0),
                this.onError.run(event);
            }),
            (e.prototype._isSourcePlaying = function() {
              var t = this.source;
              return (
                t.currentTime > 0 &&
                !1 === t.paused &&
                !1 === t.ended &&
                t.readyState > 2
              );
            }),
            (e.prototype._isSourceReady = function() {
              return (
                3 === this.source.readyState || 4 === this.source.readyState
              );
            }),
            (e.prototype._onPlayStart = function() {
              this.valid || this._onCanPlay(),
                !this._isAutoUpdating &&
                  this.autoUpdate &&
                  (n.Ticker.shared.add(this.update, this),
                  (this._isAutoUpdating = !0));
            }),
            (e.prototype._onPlayStop = function() {
              this._isAutoUpdating &&
                (n.Ticker.shared.remove(this.update, this),
                (this._isAutoUpdating = !1));
            }),
            (e.prototype._onCanPlay = function() {
              var t = this.source;
              t.removeEventListener("canplay", this._onCanPlay),
                t.removeEventListener("canplaythrough", this._onCanPlay);
              var e = this.valid;
              this.resize(t.videoWidth, t.videoHeight),
                !e &&
                  this._resolve &&
                  (this._resolve(this), (this._resolve = null)),
                this._isSourcePlaying()
                  ? this._onPlayStart()
                  : this.autoPlay && t.play();
            }),
            (e.prototype.dispose = function() {
              this._isAutoUpdating && n.Ticker.shared.remove(this.update, this),
                this.source &&
                  (this.source.removeEventListener("error", this._onError, !0),
                  this.source.pause(),
                  (this.source.src = ""),
                  this.source.load()),
                t.prototype.dispose.call(this);
            }),
            (r.autoUpdate.get = function() {
              return this._autoUpdate;
            }),
            (r.autoUpdate.set = function(t) {
              t !== this._autoUpdate &&
                ((this._autoUpdate = t),
                !this._autoUpdate && this._isAutoUpdating
                  ? (n.Ticker.shared.remove(this.update, this),
                    (this._isAutoUpdating = !1))
                  : this._autoUpdate &&
                    !this._isAutoUpdating &&
                    (n.Ticker.shared.add(this.update, this),
                    (this._isAutoUpdating = !0)));
            }),
            (r.updateFPS.get = function() {
              return this._updateFPS;
            }),
            (r.updateFPS.set = function(t) {
              t !== this._updateFPS && (this._updateFPS = t);
            }),
            (e.test = function(t, r) {
              return t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1;
            }),
            Object.defineProperties(e.prototype, r),
            e
          );
        })(u);
        x.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"];
        var E = (function(t) {
          function e() {
            t.apply(this, arguments);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.test = function(t) {
              return !!window.createImageBitmap && t instanceof ImageBitmap;
            }),
            e
          );
        })(u);
        c.push(l, E, g, x, m, p, y, _);
        var T = {
          INSTALLED: c,
          autoDetectResource: d,
          ArrayResource: _,
          BufferResource: p,
          CanvasResource: g,
          CubeResource: y,
          ImageResource: l,
          ImageBitmapResource: E,
          SVGResource: m,
          VideoResource: x,
          Resource: a,
          BaseImageResource: u
        };
        exports.resources = T;
        var b = function(t) {
          this.renderer = t;
        };
        (exports.System = b),
          (b.prototype.destroy = function() {
            this.renderer = null;
          });
        var S = (function(t) {
            function e() {
              t.apply(this, arguments);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.upload = function(t, e, i) {
                var n = t.gl;
                return (
                  n.pixelStorei(
                    n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    e.alphaMode === r.ALPHA_MODES.UNPACK
                  ),
                  i.width === e.width && i.height === e.height
                    ? n.texSubImage2D(
                        e.target,
                        0,
                        0,
                        0,
                        e.width,
                        e.height,
                        e.format,
                        e.type,
                        this.data
                      )
                    : ((i.width = e.width),
                      (i.height = e.height),
                      n.texImage2D(
                        e.target,
                        0,
                        n.DEPTH_COMPONENT16,
                        e.width,
                        e.height,
                        0,
                        e.format,
                        e.type,
                        this.data
                      )),
                  !0
                );
              }),
              e
            );
          })(p),
          w = function(e, r) {
            (this.width = Math.ceil(e || 100)),
              (this.height = Math.ceil(r || 100)),
              (this.stencil = !1),
              (this.depth = !1),
              (this.dirtyId = 0),
              (this.dirtyFormat = 0),
              (this.dirtySize = 0),
              (this.depthTexture = null),
              (this.colorTextures = []),
              (this.glFramebuffers = {}),
              (this.disposeRunner = new t.Runner("disposeFramebuffer", 2));
          };
        exports.Framebuffer = w;
        var A = { colorTexture: { configurable: !0 } };
        (A.colorTexture.get = function() {
          return this.colorTextures[0];
        }),
          (w.prototype.addColorTexture = function(t, e) {
            return (
              void 0 === t && (t = 0),
              (this.colorTextures[t] =
                e ||
                new v(null, {
                  scaleMode: 0,
                  resolution: 1,
                  mipmap: !1,
                  width: this.width,
                  height: this.height
                })),
              this.dirtyId++,
              this.dirtyFormat++,
              this
            );
          }),
          (w.prototype.addDepthTexture = function(t) {
            return (
              (this.depthTexture =
                t ||
                new v(new S(null, { width: this.width, height: this.height }), {
                  scaleMode: 0,
                  resolution: 1,
                  width: this.width,
                  height: this.height,
                  mipmap: !1,
                  format: r.FORMATS.DEPTH_COMPONENT,
                  type: r.TYPES.UNSIGNED_SHORT
                })),
              this.dirtyId++,
              this.dirtyFormat++,
              this
            );
          }),
          (w.prototype.enableDepth = function() {
            return (this.depth = !0), this.dirtyId++, this.dirtyFormat++, this;
          }),
          (w.prototype.enableStencil = function() {
            return (
              (this.stencil = !0), this.dirtyId++, this.dirtyFormat++, this
            );
          }),
          (w.prototype.resize = function(t, e) {
            if (
              ((t = Math.ceil(t)),
              (e = Math.ceil(e)),
              t !== this.width || e !== this.height)
            ) {
              (this.width = t),
                (this.height = e),
                this.dirtyId++,
                this.dirtySize++;
              for (var r = 0; r < this.colorTextures.length; r++) {
                var i = this.colorTextures[r],
                  n = i.resolution;
                i.setSize(t / n, e / n);
              }
              if (this.depthTexture) {
                var o = this.depthTexture.resolution;
                this.depthTexture.setSize(t / o, e / o);
              }
            }
          }),
          (w.prototype.dispose = function() {
            this.disposeRunner.run(this, !1);
          }),
          Object.defineProperties(w.prototype, A);
        var C = (function(t) {
          function e(e) {
            "number" == typeof e &&
              (e = {
                width: arguments[0],
                height: arguments[1],
                scaleMode: arguments[2],
                resolution: arguments[3]
              });
            t.call(this, null, e);
            var r = e || {},
              i = r.width,
              n = r.height;
            (this.mipmap = !1),
              (this.width = Math.ceil(i) || 100),
              (this.height = Math.ceil(n) || 100),
              (this.valid = !0),
              (this._canvasRenderTarget = null),
              (this.clearColor = [0, 0, 0, 0]),
              (this.framebuffer = new w(
                this.width * this.resolution,
                this.height * this.resolution
              ).addColorTexture(0, this)),
              (this.maskStack = []),
              (this.filterStack = [{}]);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.resize = function(t, e) {
              (t = Math.ceil(t)),
                (e = Math.ceil(e)),
                this.framebuffer.resize(
                  t * this.resolution,
                  e * this.resolution
                );
            }),
            (e.prototype.dispose = function() {
              this.framebuffer.dispose(), t.prototype.dispose.call(this);
            }),
            (e.prototype.destroy = function() {
              t.prototype.destroy.call(this, !0), (this.framebuffer = null);
            }),
            e
          );
        })(v);
        exports.BaseRenderTexture = C;
        var R = function() {
          (this.x0 = 0),
            (this.y0 = 0),
            (this.x1 = 1),
            (this.y1 = 0),
            (this.x2 = 1),
            (this.y2 = 1),
            (this.x3 = 0),
            (this.y3 = 1),
            (this.uvsFloat32 = new Float32Array(8));
        };
        (exports.TextureUvs = R),
          (R.prototype.set = function(t, e, r) {
            var i = e.width,
              n = e.height;
            if (r) {
              var s = t.width / 2 / i,
                a = t.height / 2 / n,
                h = t.x / i + s,
                u = t.y / n + a;
              (r = o.groupD8.add(r, o.groupD8.NW)),
                (this.x0 = h + s * o.groupD8.uX(r)),
                (this.y0 = u + a * o.groupD8.uY(r)),
                (r = o.groupD8.add(r, 2)),
                (this.x1 = h + s * o.groupD8.uX(r)),
                (this.y1 = u + a * o.groupD8.uY(r)),
                (r = o.groupD8.add(r, 2)),
                (this.x2 = h + s * o.groupD8.uX(r)),
                (this.y2 = u + a * o.groupD8.uY(r)),
                (r = o.groupD8.add(r, 2)),
                (this.x3 = h + s * o.groupD8.uX(r)),
                (this.y3 = u + a * o.groupD8.uY(r));
            } else
              (this.x0 = t.x / i),
                (this.y0 = t.y / n),
                (this.x1 = (t.x + t.width) / i),
                (this.y1 = t.y / n),
                (this.x2 = (t.x + t.width) / i),
                (this.y2 = (t.y + t.height) / n),
                (this.x3 = t.x / i),
                (this.y3 = (t.y + t.height) / n);
            (this.uvsFloat32[0] = this.x0),
              (this.uvsFloat32[1] = this.y0),
              (this.uvsFloat32[2] = this.x1),
              (this.uvsFloat32[3] = this.y1),
              (this.uvsFloat32[4] = this.x2),
              (this.uvsFloat32[5] = this.y2),
              (this.uvsFloat32[6] = this.x3),
              (this.uvsFloat32[7] = this.y3);
          });
        var I = new R(),
          O = (function(t) {
            function r(e, i, n, s, a, h) {
              if (
                (t.call(this),
                (this.noFrame = !1),
                i || ((this.noFrame = !0), (i = new o.Rectangle(0, 0, 1, 1))),
                e instanceof r && (e = e.baseTexture),
                (this.baseTexture = e),
                (this._frame = i),
                (this.trim = s),
                (this.valid = !1),
                (this.requiresUpdate = !1),
                (this._uvs = I),
                (this.uvMatrix = null),
                (this.orig = n || i),
                (this._rotate = Number(a || 0)),
                !0 === a)
              )
                this._rotate = 2;
              else if (this._rotate % 2 != 0)
                throw new Error(
                  "attempt to use diamond-shaped UVs. If you are sure, set rotation manually"
                );
              (this.defaultAnchor = h
                ? new o.Point(h.x, h.y)
                : new o.Point(0, 0)),
                (this._updateID = 0),
                (this.textureCacheIds = []),
                e.valid
                  ? this.noFrame
                    ? e.valid && this.onBaseTextureUpdated(e)
                    : (this.frame = i)
                  : e.once("loaded", this.onBaseTextureUpdated, this),
                this.noFrame && e.on("update", this.onBaseTextureUpdated, this);
            }
            t && (r.__proto__ = t),
              (r.prototype = Object.create(t && t.prototype)),
              (r.prototype.constructor = r);
            var n = {
              resolution: { configurable: !0 },
              frame: { configurable: !0 },
              rotate: { configurable: !0 },
              width: { configurable: !0 },
              height: { configurable: !0 }
            };
            return (
              (r.prototype.update = function() {
                this.baseTexture.resource && this.baseTexture.resource.update();
              }),
              (r.prototype.onBaseTextureUpdated = function(t) {
                if (this.noFrame) {
                  if (!this.baseTexture.valid) return;
                  (this._frame.width = t.width),
                    (this._frame.height = t.height),
                    (this.valid = !0),
                    this.updateUvs();
                } else this.frame = this._frame;
                this.emit("update", this);
              }),
              (r.prototype.destroy = function(t) {
                if (this.baseTexture) {
                  if (t) {
                    var i = this.baseTexture.resource;
                    i && e.TextureCache[i.url] && r.removeFromCache(i.url),
                      this.baseTexture.destroy();
                  }
                  this.baseTexture.off(
                    "update",
                    this.onBaseTextureUpdated,
                    this
                  ),
                    (this.baseTexture = null);
                }
                (this._frame = null),
                  (this._uvs = null),
                  (this.trim = null),
                  (this.orig = null),
                  (this.valid = !1),
                  r.removeFromCache(this),
                  (this.textureCacheIds = null);
              }),
              (r.prototype.clone = function() {
                return new r(
                  this.baseTexture,
                  this.frame,
                  this.orig,
                  this.trim,
                  this.rotate,
                  this.defaultAnchor
                );
              }),
              (r.prototype.updateUvs = function() {
                this._uvs === I && (this._uvs = new R()),
                  this._uvs.set(this._frame, this.baseTexture, this.rotate),
                  this._updateID++;
              }),
              (r.from = function(t, n, o) {
                void 0 === n && (n = {}),
                  void 0 === o && (o = i.settings.STRICT_TEXTURE_CACHE);
                var s = "string" == typeof t,
                  a = null;
                s
                  ? (a = t)
                  : (t._pixiId || (t._pixiId = "pixiid_" + (0, e.uid)()),
                    (a = t._pixiId));
                var h = e.TextureCache[a];
                if (s && o && !h)
                  throw new Error(
                    'The cacheId "' + a + '" does not exist in TextureCache.'
                  );
                return (
                  h ||
                    (n.resolution ||
                      (n.resolution = (0, e.getResolutionOfUrl)(t)),
                    ((h = new r(new v(t, n))).baseTexture.cacheId = a),
                    v.addToCache(h.baseTexture, a),
                    r.addToCache(h, a)),
                  h
                );
              }),
              (r.fromBuffer = function(t, e, i, n) {
                return new r(v.fromBuffer(t, e, i, n));
              }),
              (r.fromLoader = function(t, n, o) {
                var s = new l(t);
                s.url = n;
                var a = new r(
                  new v(s, {
                    scaleMode: i.settings.SCALE_MODE,
                    resolution: (0, e.getResolutionOfUrl)(n)
                  })
                );
                return (
                  o || (o = n),
                  v.addToCache(a.baseTexture, o),
                  r.addToCache(a, o),
                  o !== n &&
                    (v.addToCache(a.baseTexture, n), r.addToCache(a, n)),
                  a
                );
              }),
              (r.addToCache = function(t, r) {
                r &&
                  (-1 === t.textureCacheIds.indexOf(r) &&
                    t.textureCacheIds.push(r),
                  e.TextureCache[r] &&
                    console.warn(
                      "Texture added to the cache with an id [" +
                        r +
                        "] that already had an entry"
                    ),
                  (e.TextureCache[r] = t));
              }),
              (r.removeFromCache = function(t) {
                if ("string" == typeof t) {
                  var r = e.TextureCache[t];
                  if (r) {
                    var i = r.textureCacheIds.indexOf(t);
                    return (
                      i > -1 && r.textureCacheIds.splice(i, 1),
                      delete e.TextureCache[t],
                      r
                    );
                  }
                } else if (t && t.textureCacheIds) {
                  for (var n = 0; n < t.textureCacheIds.length; ++n)
                    e.TextureCache[t.textureCacheIds[n]] === t &&
                      delete e.TextureCache[t.textureCacheIds[n]];
                  return (t.textureCacheIds.length = 0), t;
                }
                return null;
              }),
              (n.resolution.get = function() {
                return this.baseTexture.resolution;
              }),
              (n.frame.get = function() {
                return this._frame;
              }),
              (n.frame.set = function(t) {
                (this._frame = t), (this.noFrame = !1);
                var e = t.x,
                  r = t.y,
                  i = t.width,
                  n = t.height,
                  o = e + i > this.baseTexture.width,
                  s = r + n > this.baseTexture.height;
                if (o || s) {
                  var a = o && s ? "and" : "or",
                    h =
                      "X: " +
                      e +
                      " + " +
                      i +
                      " = " +
                      (e + i) +
                      " > " +
                      this.baseTexture.width,
                    u =
                      "Y: " +
                      r +
                      " + " +
                      n +
                      " = " +
                      (r + n) +
                      " > " +
                      this.baseTexture.height;
                  throw new Error(
                    "Texture Error: frame does not fit inside the base Texture dimensions: " +
                      h +
                      " " +
                      a +
                      " " +
                      u
                  );
                }
                (this.valid = i && n && this.baseTexture.valid),
                  this.trim || this.rotate || (this.orig = t),
                  this.valid && this.updateUvs();
              }),
              (n.rotate.get = function() {
                return this._rotate;
              }),
              (n.rotate.set = function(t) {
                (this._rotate = t), this.valid && this.updateUvs();
              }),
              (n.width.get = function() {
                return this.orig.width;
              }),
              (n.height.get = function() {
                return this.orig.height;
              }),
              Object.defineProperties(r.prototype, n),
              r
            );
          })(e.EventEmitter);
        function P() {
          var t = document.createElement("canvas");
          (t.width = 16), (t.height = 16);
          var e = t.getContext("2d");
          return (
            (e.fillStyle = "white"),
            e.fillRect(0, 0, 16, 16),
            new O(new v(new g(t)))
          );
        }
        function M(t) {
          (t.destroy = function() {}),
            (t.on = function() {}),
            (t.once = function() {}),
            (t.emit = function() {});
        }
        (exports.Texture = O),
          (O.EMPTY = new O(new v())),
          M(O.EMPTY),
          M(O.EMPTY.baseTexture),
          (O.WHITE = P()),
          M(O.WHITE),
          M(O.WHITE.baseTexture);
        var D = (function(t) {
          function e(e, r) {
            var i = null;
            if (!(e instanceof C)) {
              var n = arguments[1],
                o = arguments[2],
                s = arguments[3],
                a = arguments[4];
              console.warn(
                "Please use RenderTexture.create(" +
                  n +
                  ", " +
                  o +
                  ") instead of the ctor directly."
              ),
                (i = arguments[0]),
                (r = null),
                (e = new C({
                  width: n,
                  height: o,
                  scaleMode: s,
                  resolution: a
                }));
            }
            t.call(this, e, r),
              (this.legacyRenderer = i),
              (this.valid = !0),
              (this.filterFrame = null),
              (this.filterPoolKey = null),
              this.updateUvs();
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.resize = function(t, e, r) {
              void 0 === r && (r = !0),
                (t = Math.ceil(t)),
                (e = Math.ceil(e)),
                (this.valid = t > 0 && e > 0),
                (this._frame.width = this.orig.width = t),
                (this._frame.height = this.orig.height = e),
                r && this.baseTexture.resize(t, e),
                this.updateUvs();
            }),
            (e.prototype.setResolution = function(t) {
              var e = this.baseTexture;
              e.resolution !== t &&
                (e.setResolution(t), this.resize(e.width, e.height, !1));
            }),
            (e.create = function(t) {
              return (
                "number" == typeof t &&
                  (t = {
                    width: t,
                    height: arguments[1],
                    scaleMode: arguments[2],
                    resolution: arguments[3]
                  }),
                new e(new C(t))
              );
            }),
            e
          );
        })(O);
        exports.RenderTexture = D;
        var F = function(t) {
          (this.texturePool = {}),
            (this.textureOptions = t || {}),
            (this.enableFullScreen = !1),
            (this._pixelsWidth = 0),
            (this._pixelsHeight = 0);
        };
        (exports.RenderTexturePool = F),
          (F.prototype.createTexture = function(t, e) {
            var r = new C(
              Object.assign(
                { width: t, height: e, resolution: 1 },
                this.textureOptions
              )
            );
            return new D(r);
          }),
          (F.prototype.getOptimalTexture = function(t, r, i) {
            void 0 === i && (i = 1);
            var n = F.SCREEN_KEY;
            (t *= i),
              (r *= i),
              (this.enableFullScreen &&
                t === this._pixelsWidth &&
                r === this._pixelsHeight) ||
                (n =
                  ((65535 & (t = (0, e.nextPow2)(t))) << 16) |
                  (65535 & (r = (0, e.nextPow2)(r)))),
              this.texturePool[n] || (this.texturePool[n] = []);
            var o = this.texturePool[n].pop();
            return (
              o || (o = this.createTexture(t, r)),
              (o.filterPoolKey = n),
              o.setResolution(i),
              o
            );
          }),
          (F.prototype.getFilterTexture = function(t, e) {
            var r = this.getOptimalTexture(
              t.width,
              t.height,
              e || t.resolution
            );
            return (r.filterFrame = t.filterFrame), r;
          }),
          (F.prototype.returnTexture = function(t) {
            var e = t.filterPoolKey;
            (t.filterFrame = null), this.texturePool[e].push(t);
          }),
          (F.prototype.returnFilterTexture = function(t) {
            this.returnTexture(t);
          }),
          (F.prototype.clear = function(t) {
            if ((t = !1 !== t))
              for (var e in this.texturePool) {
                var r = this.texturePool[e];
                if (r) for (var i = 0; i < r.length; i++) r[i].destroy(!0);
              }
            this.texturePool = {};
          }),
          (F.prototype.setScreenSize = function(t) {
            if (
              t.width !== this._pixelsWidth ||
              t.height !== this._pixelsHeight
            ) {
              var e = F.SCREEN_KEY,
                r = this.texturePool[e];
              if (((this.enableFullScreen = t.width > 0 && t.height > 0), r))
                for (var i = 0; i < r.length; i++) r[i].destroy(!0);
              (this.texturePool[e] = []),
                (this._pixelsWidth = t.width),
                (this._pixelsHeight = t.height);
            }
          }),
          (F.SCREEN_KEY = "screen");
        var N = function(t, e, r, i, n, o, s) {
          void 0 === r && (r = !1),
            void 0 === i && (i = 5126),
            (this.buffer = t),
            (this.size = e),
            (this.normalized = r),
            (this.type = i),
            (this.stride = n),
            (this.start = o),
            (this.instance = s);
        };
        (exports.Attribute = N),
          (N.prototype.destroy = function() {
            this.buffer = null;
          }),
          (N.from = function(t, e, r, i, n) {
            return new N(t, e, r, i, n);
          });
        var U = 0,
          B = function(e, r, i) {
            void 0 === r && (r = !0),
              void 0 === i && (i = !1),
              (this.data = e || new Float32Array(1)),
              (this._glBuffers = {}),
              (this._updateID = 0),
              (this.index = i),
              (this.static = r),
              (this.id = U++),
              (this.disposeRunner = new t.Runner("disposeBuffer", 2));
          };
        function L(t) {
          if (4 === t.BYTES_PER_ELEMENT)
            return t instanceof Float32Array
              ? "Float32Array"
              : t instanceof Uint32Array
              ? "Uint32Array"
              : "Int32Array";
          if (2 === t.BYTES_PER_ELEMENT) {
            if (t instanceof Uint16Array) return "Uint16Array";
          } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array)
            return "Uint8Array";
          return null;
        }
        (exports.Buffer = B),
          (B.prototype.update = function(t) {
            (this.data = t || this.data), this._updateID++;
          }),
          (B.prototype.dispose = function() {
            this.disposeRunner.run(this, !1);
          }),
          (B.prototype.destroy = function() {
            this.dispose(), (this.data = null);
          }),
          (B.from = function(t) {
            return t instanceof Array && (t = new Float32Array(t)), new B(t);
          });
        var k = {
          Float32Array: Float32Array,
          Uint32Array: Uint32Array,
          Int32Array: Int32Array,
          Uint8Array: Uint8Array
        };
        function G(t, e) {
          for (var r = 0, i = 0, n = {}, o = 0; o < t.length; o++)
            (i += e[o]), (r += t[o].length);
          for (
            var s = new ArrayBuffer(4 * r), a = null, h = 0, u = 0;
            u < t.length;
            u++
          ) {
            var l = e[u],
              c = t[u],
              d = L(c);
            n[d] || (n[d] = new k[d](s)), (a = n[d]);
            for (var p = 0; p < c.length; p++) {
              a[((p / l) | 0) * i + h + (p % l)] = c[p];
            }
            h += l;
          }
          return new Float32Array(s);
        }
        var V = { 5126: 4, 5123: 2, 5121: 1 },
          X = 0,
          j = {
            Float32Array: Float32Array,
            Uint32Array: Uint32Array,
            Int32Array: Int32Array,
            Uint8Array: Uint8Array,
            Uint16Array: Uint16Array
          },
          H = function(e, r) {
            void 0 === e && (e = []),
              void 0 === r && (r = {}),
              (this.buffers = e),
              (this.indexBuffer = null),
              (this.attributes = r),
              (this.glVertexArrayObjects = {}),
              (this.id = X++),
              (this.instanced = !1),
              (this.instanceCount = 1),
              (this.disposeRunner = new t.Runner("disposeGeometry", 2)),
              (this.refCount = 0);
          };
        (exports.Geometry = H),
          (H.prototype.addAttribute = function(t, e, r, i, n, o, s, a) {
            if ((void 0 === i && (i = !1), void 0 === a && (a = !1), !e))
              throw new Error(
                "You must pass a buffer when creating an attribute"
              );
            e.data ||
              (e instanceof Array && (e = new Float32Array(e)), (e = new B(e)));
            var h = t.split("|");
            if (h.length > 1) {
              for (var u = 0; u < h.length; u++)
                this.addAttribute(h[u], e, r, i, n);
              return this;
            }
            var l = this.buffers.indexOf(e);
            return (
              -1 === l && (this.buffers.push(e), (l = this.buffers.length - 1)),
              (this.attributes[t] = new N(l, r, i, n, o, s, a)),
              (this.instanced = this.instanced || a),
              this
            );
          }),
          (H.prototype.getAttribute = function(t) {
            return this.attributes[t];
          }),
          (H.prototype.getBuffer = function(t) {
            return this.buffers[this.getAttribute(t).buffer];
          }),
          (H.prototype.addIndex = function(t) {
            return (
              t.data ||
                (t instanceof Array && (t = new Uint16Array(t)),
                (t = new B(t))),
              (t.index = !0),
              (this.indexBuffer = t),
              -1 === this.buffers.indexOf(t) && this.buffers.push(t),
              this
            );
          }),
          (H.prototype.getIndex = function() {
            return this.indexBuffer;
          }),
          (H.prototype.interleave = function() {
            if (
              1 === this.buffers.length ||
              (2 === this.buffers.length && this.indexBuffer)
            )
              return this;
            var t,
              e = [],
              r = [],
              i = new B();
            for (t in this.attributes) {
              var n = this.attributes[t],
                o = this.buffers[n.buffer];
              e.push(o.data), r.push((n.size * V[n.type]) / 4), (n.buffer = 0);
            }
            for (i.data = G(e, r), t = 0; t < this.buffers.length; t++)
              this.buffers[t] !== this.indexBuffer && this.buffers[t].destroy();
            return (
              (this.buffers = [i]),
              this.indexBuffer && this.buffers.push(this.indexBuffer),
              this
            );
          }),
          (H.prototype.getSize = function() {
            for (var t in this.attributes) {
              var e = this.attributes[t];
              return (
                this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
              );
            }
            return 0;
          }),
          (H.prototype.dispose = function() {
            this.disposeRunner.run(this, !1);
          }),
          (H.prototype.destroy = function() {
            this.dispose(),
              (this.buffers = null),
              (this.indexBuffer = null),
              (this.attributes = null);
          }),
          (H.prototype.clone = function() {
            for (var t = new H(), e = 0; e < this.buffers.length; e++)
              t.buffers[e] = new B(this.buffers[e].data.slice());
            for (var r in this.attributes) {
              var i = this.attributes[r];
              t.attributes[r] = new N(
                i.buffer,
                i.size,
                i.normalized,
                i.type,
                i.stride,
                i.start,
                i.instance
              );
            }
            return (
              this.indexBuffer &&
                ((t.indexBuffer =
                  t.buffers[this.buffers.indexOf(this.indexBuffer)]),
                (t.indexBuffer.index = !0)),
              t
            );
          }),
          (H.merge = function(t) {
            for (
              var e, r = new H(), i = [], n = [], o = [], s = 0;
              s < t.length;
              s++
            ) {
              e = t[s];
              for (var a = 0; a < e.buffers.length; a++)
                (n[a] = n[a] || 0),
                  (n[a] += e.buffers[a].data.length),
                  (o[a] = 0);
            }
            for (var h = 0; h < e.buffers.length; h++)
              (i[h] = new j[L(e.buffers[h].data)](n[h])),
                (r.buffers[h] = new B(i[h]));
            for (var u = 0; u < t.length; u++) {
              e = t[u];
              for (var l = 0; l < e.buffers.length; l++)
                i[l].set(e.buffers[l].data, o[l]),
                  (o[l] += e.buffers[l].data.length);
            }
            if (((r.attributes = e.attributes), e.indexBuffer)) {
              (r.indexBuffer = r.buffers[e.buffers.indexOf(e.indexBuffer)]),
                (r.indexBuffer.index = !0);
              for (
                var c = 0, d = 0, p = 0, f = 0, v = 0;
                v < e.buffers.length;
                v++
              )
                if (e.buffers[v] !== e.indexBuffer) {
                  f = v;
                  break;
                }
              for (var _ in e.attributes) {
                var g = e.attributes[_];
                (0 | g.buffer) === f && (d += (g.size * V[g.type]) / 4);
              }
              for (var y = 0; y < t.length; y++) {
                for (var m = t[y].indexBuffer.data, x = 0; x < m.length; x++)
                  r.indexBuffer.data[x + p] += c;
                (c += e.buffers[f].data.length / d), (p += m.length);
              }
            }
            return r;
          });
        var z = (function(t) {
          function e() {
            t.call(this),
              this.addAttribute("aVertexPosition", [
                0,
                0,
                1,
                0,
                1,
                1,
                0,
                1
              ]).addIndex([0, 1, 3, 2]);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            e
          );
        })(H);
        exports.Quad = z;
        var W = (function(t) {
          function e() {
            t.call(this),
              (this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])),
              (this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])),
              (this.vertexBuffer = new B(this.vertices)),
              (this.uvBuffer = new B(this.uvs)),
              this.addAttribute("aVertexPosition", this.vertexBuffer)
                .addAttribute("aTextureCoord", this.uvBuffer)
                .addIndex([0, 1, 2, 0, 2, 3]);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.map = function(t, e) {
              var r = 0,
                i = 0;
              return (
                (this.uvs[0] = r),
                (this.uvs[1] = i),
                (this.uvs[2] = r + e.width / t.width),
                (this.uvs[3] = i),
                (this.uvs[4] = r + e.width / t.width),
                (this.uvs[5] = i + e.height / t.height),
                (this.uvs[6] = r),
                (this.uvs[7] = i + e.height / t.height),
                (r = e.x),
                (i = e.y),
                (this.vertices[0] = r),
                (this.vertices[1] = i),
                (this.vertices[2] = r + e.width),
                (this.vertices[3] = i),
                (this.vertices[4] = r + e.width),
                (this.vertices[5] = i + e.height),
                (this.vertices[6] = r),
                (this.vertices[7] = i + e.height),
                this.invalidate(),
                this
              );
            }),
            (e.prototype.invalidate = function() {
              return (
                this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
              );
            }),
            e
          );
        })(H);
        exports.QuadUv = W;
        var Y = 0,
          K = function(t, e) {
            (this.uniforms = t),
              (this.group = !0),
              (this.syncUniforms = {}),
              (this.dirtyId = 0),
              (this.id = Y++),
              (this.static = !!e);
          };
        (exports.UniformGroup = K),
          (K.prototype.update = function() {
            this.dirtyId++;
          }),
          (K.prototype.add = function(t, e, r) {
            this.uniforms[t] = new K(e, r);
          }),
          (K.from = function(t, e) {
            return new K(t, e);
          });
        var q = function() {
          (this.renderTexture = null),
            (this.target = null),
            (this.legacy = !1),
            (this.resolution = 1),
            (this.sourceFrame = new o.Rectangle()),
            (this.destinationFrame = new o.Rectangle()),
            (this.filters = []);
        };
        q.prototype.clear = function() {
          (this.target = null),
            (this.filters = null),
            (this.renderTexture = null);
        };
        var Z = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.defaultFilterStack = [{}]),
                (this.texturePool = new F()),
                this.texturePool.setScreenSize(e.view),
                (this.statePool = []),
                (this.quad = new z()),
                (this.quadUv = new W()),
                (this.tempRect = new o.Rectangle()),
                (this.activeState = {}),
                (this.globalUniforms = new K(
                  {
                    outputFrame: this.tempRect,
                    inputSize: new Float32Array(4),
                    inputPixel: new Float32Array(4),
                    inputClamp: new Float32Array(4),
                    resolution: 1,
                    filterArea: new Float32Array(4),
                    filterClamp: new Float32Array(4)
                  },
                  !0
                )),
                (this._pixelsWidth = e.view.width),
                (this._pixelsHeight = e.view.height);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.push = function(t, e) {
                for (
                  var r = this.renderer,
                    i = this.defaultFilterStack,
                    n = this.statePool.pop() || new q(),
                    o = e[0].resolution,
                    s = e[0].padding,
                    a = e[0].autoFit,
                    h = e[0].legacy,
                    u = 1;
                  u < e.length;
                  u++
                ) {
                  var l = e[u];
                  (o = Math.min(o, l.resolution)),
                    (s = Math.max(s, l.padding)),
                    (a = a || l.autoFit),
                    (h = h || l.legacy);
                }
                1 === i.length &&
                  (this.defaultFilterStack[0].renderTexture =
                    r.renderTexture.current),
                  i.push(n),
                  (n.resolution = o),
                  (n.legacy = h),
                  (n.target = t),
                  n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)),
                  n.sourceFrame.pad(s),
                  a &&
                    n.sourceFrame.fit(this.renderer.renderTexture.sourceFrame),
                  n.sourceFrame.ceil(o),
                  (n.renderTexture = this.getOptimalFilterTexture(
                    n.sourceFrame.width,
                    n.sourceFrame.height,
                    o
                  )),
                  (n.filters = e),
                  (n.destinationFrame.width = n.renderTexture.width),
                  (n.destinationFrame.height = n.renderTexture.height),
                  (n.renderTexture.filterFrame = n.sourceFrame),
                  r.renderTexture.bind(n.renderTexture, n.sourceFrame),
                  r.renderTexture.clear();
              }),
              (e.prototype.pop = function() {
                var t = this.defaultFilterStack,
                  e = t.pop(),
                  r = e.filters;
                this.activeState = e;
                var i = this.globalUniforms.uniforms;
                (i.outputFrame = e.sourceFrame), (i.resolution = e.resolution);
                var n = i.inputSize,
                  o = i.inputPixel,
                  s = i.inputClamp;
                if (
                  ((n[0] = e.destinationFrame.width),
                  (n[1] = e.destinationFrame.height),
                  (n[2] = 1 / n[0]),
                  (n[3] = 1 / n[1]),
                  (o[0] = n[0] * e.resolution),
                  (o[1] = n[1] * e.resolution),
                  (o[2] = 1 / o[0]),
                  (o[3] = 1 / o[1]),
                  (s[0] = 0.5 * o[2]),
                  (s[1] = 0.5 * o[3]),
                  (s[2] = e.sourceFrame.width * n[2] - 0.5 * o[2]),
                  (s[3] = e.sourceFrame.height * n[3] - 0.5 * o[3]),
                  e.legacy)
                ) {
                  var a = i.filterArea;
                  (a[0] = e.destinationFrame.width),
                    (a[1] = e.destinationFrame.height),
                    (a[2] = e.sourceFrame.x),
                    (a[3] = e.sourceFrame.y),
                    (i.filterClamp = i.inputClamp);
                }
                this.globalUniforms.update();
                var h = t[t.length - 1];
                if (1 === r.length)
                  r[0].apply(this, e.renderTexture, h.renderTexture, !1, e),
                    this.returnFilterTexture(e.renderTexture);
                else {
                  var u = e.renderTexture,
                    l = this.getOptimalFilterTexture(
                      u.width,
                      u.height,
                      e.resolution
                    );
                  l.filterFrame = u.filterFrame;
                  var c = 0;
                  for (c = 0; c < r.length - 1; ++c) {
                    r[c].apply(this, u, l, !0, e);
                    var d = u;
                    (u = l), (l = d);
                  }
                  r[c].apply(this, u, h.renderTexture, !1, e),
                    this.returnFilterTexture(u),
                    this.returnFilterTexture(l);
                }
                e.clear(), this.statePool.push(e);
              }),
              (e.prototype.applyFilter = function(t, e, i, n) {
                var o = this.renderer;
                o.renderTexture.bind(i, i ? i.filterFrame : null),
                  n && o.renderTexture.clear(),
                  (t.uniforms.uSampler = e),
                  (t.uniforms.filterGlobals = this.globalUniforms),
                  o.state.set(t.state),
                  o.shader.bind(t),
                  t.legacy
                    ? (this.quadUv.map(e._frame, e.filterFrame),
                      o.geometry.bind(this.quadUv),
                      o.geometry.draw(r.DRAW_MODES.TRIANGLES))
                    : (o.geometry.bind(this.quad),
                      o.geometry.draw(r.DRAW_MODES.TRIANGLE_STRIP));
              }),
              (e.prototype.calculateSpriteMatrix = function(t, e) {
                var r = this.activeState,
                  i = r.sourceFrame,
                  n = r.destinationFrame,
                  s = e._texture.orig,
                  a = t.set(n.width, 0, 0, n.height, i.x, i.y),
                  h = e.worldTransform.copyTo(o.Matrix.TEMP_MATRIX);
                return (
                  h.invert(),
                  a.prepend(h),
                  a.scale(1 / s.width, 1 / s.height),
                  a.translate(e.anchor.x, e.anchor.y),
                  a
                );
              }),
              (e.prototype.destroy = function() {
                this.texturePool.clear(!1);
              }),
              (e.prototype.getOptimalFilterTexture = function(t, e, r) {
                return (
                  void 0 === r && (r = 1),
                  this.texturePool.getOptimalTexture(t, e, r)
                );
              }),
              (e.prototype.getFilterTexture = function(t, e) {
                if ("number" == typeof t) {
                  var r = t;
                  (t = e), (e = r);
                }
                t = t || this.activeState.renderTexture;
                var i = this.texturePool.getOptimalTexture(
                  t.width,
                  t.height,
                  e || t.resolution
                );
                return (i.filterFrame = t.filterFrame), i;
              }),
              (e.prototype.returnFilterTexture = function(t) {
                this.texturePool.returnTexture(t);
              }),
              (e.prototype.emptyPool = function() {
                this.texturePool.clear(!0);
              }),
              (e.prototype.resize = function() {
                this.texturePool.setScreenSize(this.renderer.view);
              }),
              e
            );
          })(b),
          Q = function(t) {
            this.renderer = t;
          };
        (exports.ObjectRenderer = Q),
          (Q.prototype.flush = function() {}),
          (Q.prototype.destroy = function() {
            this.renderer = null;
          }),
          (Q.prototype.start = function() {}),
          (Q.prototype.stop = function() {
            this.flush();
          }),
          (Q.prototype.render = function(t) {});
        var $ = (function(t) {
          function e(e) {
            t.call(this, e),
              (this.emptyRenderer = new Q(e)),
              (this.currentRenderer = this.emptyRenderer);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.setObjectRenderer = function(t) {
              this.currentRenderer !== t &&
                (this.currentRenderer.stop(),
                (this.currentRenderer = t),
                this.currentRenderer.start());
            }),
            (e.prototype.flush = function() {
              this.setObjectRenderer(this.emptyRenderer);
            }),
            (e.prototype.reset = function() {
              this.setObjectRenderer(this.emptyRenderer);
            }),
            (e.prototype.copyBoundTextures = function(t, e) {
              for (
                var r = this.renderer.texture.boundTextures, i = e - 1;
                i >= 0;
                --i
              )
                (t[i] = r[i] || null), t[i] && (t[i]._batchLocation = i);
            }),
            (e.prototype.boundArray = function(t, e, r, i) {
              for (
                var n = t.elements, o = t.ids, s = t.count, a = 0, h = 0;
                h < s;
                h++
              ) {
                var u = n[h],
                  l = u._batchLocation;
                if (l >= 0 && l < i && e[l] === u) o[h] = l;
                else
                  for (; a < i; ) {
                    var c = e[a];
                    if (!c || c._batchEnabled !== r || c._batchLocation !== a) {
                      (o[h] = a), (u._batchLocation = a), (e[a] = u);
                      break;
                    }
                    a++;
                  }
              }
            }),
            e
          );
        })(b);
        (i.settings.PREFER_ENV = e.isMobile.any ? r.ENV.WEBGL : r.ENV.WEBGL2),
          (i.settings.STRICT_TEXTURE_CACHE = !1);
        var J = 0,
          tt = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.webGLVersion = 1),
                (this.extensions = {}),
                (this.handleContextLost = this.handleContextLost.bind(this)),
                (this.handleContextRestored = this.handleContextRestored.bind(
                  this
                )),
                e.view.addEventListener(
                  "webglcontextlost",
                  this.handleContextLost,
                  !1
                ),
                e.view.addEventListener(
                  "webglcontextrestored",
                  this.handleContextRestored,
                  !1
                );
            }
            t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e);
            var n = { isLost: { configurable: !0 } };
            return (
              (n.isLost.get = function() {
                return !this.gl || this.gl.isContextLost();
              }),
              (e.prototype.contextChange = function(t) {
                (this.gl = t),
                  (this.renderer.gl = t),
                  (this.renderer.CONTEXT_UID = J++),
                  t.isContextLost() &&
                    t.getExtension("WEBGL_lose_context") &&
                    t.getExtension("WEBGL_lose_context").restoreContext();
              }),
              (e.prototype.initFromContext = function(t) {
                (this.gl = t),
                  this.validateContext(t),
                  (this.renderer.gl = t),
                  (this.renderer.CONTEXT_UID = J++),
                  this.renderer.runners.contextChange.run(t);
              }),
              (e.prototype.initFromOptions = function(t) {
                var e = this.createContext(this.renderer.view, t);
                this.initFromContext(e);
              }),
              (e.prototype.createContext = function(t, e) {
                var n;
                if (
                  (i.settings.PREFER_ENV >= r.ENV.WEBGL2 &&
                    (n = t.getContext("webgl2", e)),
                  n)
                )
                  this.webGLVersion = 2;
                else if (
                  ((this.webGLVersion = 1),
                  !(n =
                    t.getContext("webgl", e) ||
                    t.getContext("experimental-webgl", e)))
                )
                  throw new Error(
                    "This browser does not support WebGL. Try using the canvas renderer"
                  );
                return (this.gl = n), this.getExtensions(), n;
              }),
              (e.prototype.getExtensions = function() {
                var t = this.gl;
                1 === this.webGLVersion
                  ? Object.assign(this.extensions, {
                      drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                      depthTexture: t.getExtension(
                        "WEBKIT_WEBGL_depth_texture"
                      ),
                      loseContext: t.getExtension("WEBGL_lose_context"),
                      vertexArrayObject:
                        t.getExtension("OES_vertex_array_object") ||
                        t.getExtension("MOZ_OES_vertex_array_object") ||
                        t.getExtension("WEBKIT_OES_vertex_array_object"),
                      anisotropicFiltering: t.getExtension(
                        "EXT_texture_filter_anisotropic"
                      ),
                      uint32ElementIndex: t.getExtension(
                        "OES_element_index_uint"
                      ),
                      floatTexture: t.getExtension("OES_texture_float"),
                      floatTextureLinear: t.getExtension(
                        "OES_texture_float_linear"
                      ),
                      textureHalfFloat: t.getExtension(
                        "OES_texture_half_float"
                      ),
                      textureHalfFloatLinear: t.getExtension(
                        "OES_texture_half_float_linear"
                      )
                    })
                  : 2 === this.webGLVersion &&
                    Object.assign(this.extensions, {
                      anisotropicFiltering: t.getExtension(
                        "EXT_texture_filter_anisotropic"
                      ),
                      colorBufferFloat: t.getExtension(
                        "EXT_color_buffer_float"
                      ),
                      floatTextureLinear: t.getExtension(
                        "OES_texture_float_linear"
                      )
                    });
              }),
              (e.prototype.handleContextLost = function(t) {
                t.preventDefault();
              }),
              (e.prototype.handleContextRestored = function() {
                this.renderer.runners.contextChange.run(this.gl);
              }),
              (e.prototype.destroy = function() {
                var t = this.renderer.view;
                t.removeEventListener(
                  "webglcontextlost",
                  this.handleContextLost
                ),
                  t.removeEventListener(
                    "webglcontextrestored",
                    this.handleContextRestored
                  ),
                  this.gl.useProgram(null),
                  this.extensions.loseContext &&
                    this.extensions.loseContext.loseContext();
              }),
              (e.prototype.postrender = function() {
                this.renderer.renderingToScreen && this.gl.flush();
              }),
              (e.prototype.validateContext = function(t) {
                t.getContextAttributes().stencil ||
                  console.warn(
                    "Provided WebGL context does not have a stencil buffer, masks may not render correctly"
                  );
              }),
              Object.defineProperties(e.prototype, n),
              e
            );
          })(b),
          et = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.managedFramebuffers = []),
                (this.unknownFramebuffer = new w(10, 10));
            }
            t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e);
            var n = { size: { configurable: !0 } };
            return (
              (e.prototype.contextChange = function() {
                var t = (this.gl = this.renderer.gl);
                if (
                  ((this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                  (this.current = this.unknownFramebuffer),
                  (this.viewport = new o.Rectangle()),
                  (this.hasMRT = !0),
                  (this.writeDepthTexture = !0),
                  this.disposeAll(!0),
                  1 === this.renderer.context.webGLVersion)
                ) {
                  var e = this.renderer.context.extensions.drawBuffers,
                    n = this.renderer.context.extensions.depthTexture;
                  i.settings.PREFER_ENV === r.ENV.WEBGL_LEGACY &&
                    ((e = null), (n = null)),
                    e
                      ? (t.drawBuffers = function(t) {
                          return e.drawBuffersWEBGL(t);
                        })
                      : ((this.hasMRT = !1), (t.drawBuffers = function() {})),
                    n || (this.writeDepthTexture = !1);
                }
              }),
              (e.prototype.bind = function(t, e) {
                var r = this.gl;
                if (t) {
                  var i =
                    t.glFramebuffers[this.CONTEXT_UID] ||
                    this.initFramebuffer(t);
                  this.current !== t &&
                    ((this.current = t),
                    r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer)),
                    i.dirtyId !== t.dirtyId &&
                      ((i.dirtyId = t.dirtyId),
                      i.dirtyFormat !== t.dirtyFormat
                        ? ((i.dirtyFormat = t.dirtyFormat),
                          this.updateFramebuffer(t))
                        : i.dirtySize !== t.dirtySize &&
                          ((i.dirtySize = t.dirtySize),
                          this.resizeFramebuffer(t)));
                  for (var n = 0; n < t.colorTextures.length; n++)
                    t.colorTextures[n].texturePart
                      ? this.renderer.texture.unbind(t.colorTextures[n].texture)
                      : this.renderer.texture.unbind(t.colorTextures[n]);
                  t.depthTexture &&
                    this.renderer.texture.unbind(t.depthTexture),
                    e
                      ? this.setViewport(e.x, e.y, e.width, e.height)
                      : this.setViewport(0, 0, t.width, t.height);
                } else
                  this.current &&
                    ((this.current = null),
                    r.bindFramebuffer(r.FRAMEBUFFER, null)),
                    e
                      ? this.setViewport(e.x, e.y, e.width, e.height)
                      : this.setViewport(
                          0,
                          0,
                          this.renderer.width,
                          this.renderer.height
                        );
              }),
              (e.prototype.setViewport = function(t, e, r, i) {
                var n = this.viewport;
                (n.width === r && n.height === i && n.x === t && n.y === e) ||
                  ((n.x = t),
                  (n.y = e),
                  (n.width = r),
                  (n.height = i),
                  this.gl.viewport(t, e, r, i));
              }),
              (n.size.get = function() {
                return this.current
                  ? {
                      x: 0,
                      y: 0,
                      width: this.current.width,
                      height: this.current.height
                    }
                  : {
                      x: 0,
                      y: 0,
                      width: this.renderer.width,
                      height: this.renderer.height
                    };
              }),
              (e.prototype.clear = function(t, e, r, i) {
                var n = this.gl;
                n.clearColor(t, e, r, i),
                  n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT);
              }),
              (e.prototype.initFramebuffer = function(t) {
                var e = {
                  framebuffer: this.gl.createFramebuffer(),
                  stencil: null,
                  dirtyId: 0,
                  dirtyFormat: 0,
                  dirtySize: 0
                };
                return (
                  (t.glFramebuffers[this.CONTEXT_UID] = e),
                  this.managedFramebuffers.push(t),
                  t.disposeRunner.add(this),
                  e
                );
              }),
              (e.prototype.resizeFramebuffer = function(t) {
                var e = this.gl,
                  r = t.glFramebuffers[this.CONTEXT_UID];
                r.stencil &&
                  (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
                  e.renderbufferStorage(
                    e.RENDERBUFFER,
                    e.DEPTH_STENCIL,
                    t.width,
                    t.height
                  ));
                for (var i = t.colorTextures, n = 0; n < i.length; n++)
                  this.renderer.texture.bind(i[n], 0);
                t.depthTexture && this.renderer.texture.bind(t.depthTexture, 0);
              }),
              (e.prototype.updateFramebuffer = function(t) {
                var e = this.gl,
                  r = t.glFramebuffers[this.CONTEXT_UID],
                  i = t.colorTextures.length;
                e.drawBuffers || (i = Math.min(i, 1));
                for (var n = [], o = 0; o < i; o++) {
                  var s = t.colorTextures[o];
                  s.texturePart
                    ? (this.renderer.texture.bind(s.texture, 0),
                      e.framebufferTexture2D(
                        e.FRAMEBUFFER,
                        e.COLOR_ATTACHMENT0 + o,
                        e.TEXTURE_CUBE_MAP_NEGATIVE_X + s.side,
                        s.texture._glTextures[this.CONTEXT_UID].texture,
                        0
                      ))
                    : (this.renderer.texture.bind(s, 0),
                      e.framebufferTexture2D(
                        e.FRAMEBUFFER,
                        e.COLOR_ATTACHMENT0 + o,
                        e.TEXTURE_2D,
                        s._glTextures[this.CONTEXT_UID].texture,
                        0
                      )),
                    n.push(e.COLOR_ATTACHMENT0 + o);
                }
                if (
                  (n.length > 1 && e.drawBuffers(n), t.depthTexture) &&
                  this.writeDepthTexture
                ) {
                  var a = t.depthTexture;
                  this.renderer.texture.bind(a, 0),
                    e.framebufferTexture2D(
                      e.FRAMEBUFFER,
                      e.DEPTH_ATTACHMENT,
                      e.TEXTURE_2D,
                      a._glTextures[this.CONTEXT_UID].texture,
                      0
                    );
                }
                r.stencil ||
                  (!t.stencil && !t.depth) ||
                  ((r.stencil = e.createRenderbuffer()),
                  e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
                  e.renderbufferStorage(
                    e.RENDERBUFFER,
                    e.DEPTH_STENCIL,
                    t.width,
                    t.height
                  ),
                  t.depthTexture ||
                    e.framebufferRenderbuffer(
                      e.FRAMEBUFFER,
                      e.DEPTH_STENCIL_ATTACHMENT,
                      e.RENDERBUFFER,
                      r.stencil
                    ));
              }),
              (e.prototype.disposeFramebuffer = function(t, e) {
                var r = t.glFramebuffers[this.CONTEXT_UID],
                  i = this.gl;
                if (r) {
                  delete t.glFramebuffers[this.CONTEXT_UID];
                  var n = this.managedFramebuffers.indexOf(t);
                  n >= 0 && this.managedFramebuffers.splice(n, 1),
                    t.disposeRunner.remove(this),
                    e ||
                      (i.deleteFramebuffer(r.framebuffer),
                      r.stencil && i.deleteRenderbuffer(r.stencil));
                }
              }),
              (e.prototype.disposeAll = function(t) {
                var e = this.managedFramebuffers;
                this.managedFramebuffers = [];
                for (var r = 0; r < e.length; r++)
                  this.disposeFramebuffer(e[r], t);
              }),
              (e.prototype.forceStencil = function() {
                var t = this.current;
                if (t) {
                  var e = t.glFramebuffers[this.CONTEXT_UID];
                  if (e && !e.stencil) {
                    t.enableStencil();
                    var r = t.width,
                      i = t.height,
                      n = this.gl,
                      o = n.createRenderbuffer();
                    n.bindRenderbuffer(n.RENDERBUFFER, o),
                      n.renderbufferStorage(
                        n.RENDERBUFFER,
                        n.DEPTH_STENCIL,
                        r,
                        i
                      ),
                      (e.stencil = o),
                      n.framebufferRenderbuffer(
                        n.FRAMEBUFFER,
                        n.DEPTH_STENCIL_ATTACHMENT,
                        n.RENDERBUFFER,
                        o
                      );
                  }
                }
              }),
              (e.prototype.reset = function() {
                (this.current = this.unknownFramebuffer),
                  (this.viewport = new o.Rectangle());
              }),
              Object.defineProperties(e.prototype, n),
              e
            );
          })(b),
          rt = function(t) {
            (this.buffer = t),
              (this.updateID = -1),
              (this.byteLength = -1),
              (this.refCount = 0);
          },
          it = { 5126: 4, 5123: 2, 5121: 1 },
          nt = (function(t) {
            function e(e) {
              t.call(this, e),
                (this._activeGeometry = null),
                (this._activeVao = null),
                (this.hasVao = !0),
                (this.hasInstance = !0),
                (this.canUseUInt32ElementIndex = !1),
                (this.boundBuffers = {}),
                (this.managedGeometries = {}),
                (this.managedBuffers = {});
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.contextChange = function() {
                this.disposeAll(!0);
                var t = (this.gl = this.renderer.gl),
                  e = this.renderer.context;
                if (
                  ((this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                  !t.createVertexArray)
                ) {
                  var n = this.renderer.context.extensions.vertexArrayObject;
                  i.settings.PREFER_ENV === r.ENV.WEBGL_LEGACY && (n = null),
                    n
                      ? ((t.createVertexArray = function() {
                          return n.createVertexArrayOES();
                        }),
                        (t.bindVertexArray = function(t) {
                          return n.bindVertexArrayOES(t);
                        }),
                        (t.deleteVertexArray = function(t) {
                          return n.deleteVertexArrayOES(t);
                        }))
                      : ((this.hasVao = !1),
                        (t.createVertexArray = function() {}),
                        (t.bindVertexArray = function() {}),
                        (t.deleteVertexArray = function() {}));
                }
                if (!t.vertexAttribDivisor) {
                  var o = t.getExtension("ANGLE_instanced_arrays");
                  o
                    ? ((t.vertexAttribDivisor = function(t, e) {
                        return o.vertexAttribDivisorANGLE(t, e);
                      }),
                      (t.drawElementsInstanced = function(t, e, r, i, n) {
                        return o.drawElementsInstancedANGLE(t, e, r, i, n);
                      }),
                      (t.drawArraysInstanced = function(t, e, r, i) {
                        return o.drawArraysInstancedANGLE(t, e, r, i);
                      }))
                    : (this.hasInstance = !1);
                }
                this.canUseUInt32ElementIndex =
                  2 === e.webGLVersion || !!e.extensions.uint32ElementIndex;
              }),
              (e.prototype.bind = function(t, e) {
                e = e || this.renderer.shader.shader;
                var r = this.gl,
                  i = t.glVertexArrayObjects[this.CONTEXT_UID];
                i ||
                  ((this.managedGeometries[t.id] = t),
                  t.disposeRunner.add(this),
                  (t.glVertexArrayObjects[this.CONTEXT_UID] = i = {}));
                var n = i[e.program.id] || this.initGeometryVao(t, e.program);
                (this._activeGeometry = t),
                  this._activeVao !== n &&
                    ((this._activeVao = n),
                    this.hasVao
                      ? r.bindVertexArray(n)
                      : this.activateVao(t, e.program)),
                  this.updateBuffers();
              }),
              (e.prototype.reset = function() {
                this.unbind();
              }),
              (e.prototype.updateBuffers = function() {
                for (
                  var t = this._activeGeometry, e = this.gl, r = 0;
                  r < t.buffers.length;
                  r++
                ) {
                  var i = t.buffers[r],
                    n = i._glBuffers[this.CONTEXT_UID];
                  if (i._updateID !== n.updateID) {
                    n.updateID = i._updateID;
                    var o = i.index ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
                    if (
                      (e.bindBuffer(o, n.buffer),
                      (this._boundBuffer = n),
                      n.byteLength >= i.data.byteLength)
                    )
                      e.bufferSubData(o, 0, i.data);
                    else {
                      var s = i.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                      (n.byteLength = i.data.byteLength),
                        e.bufferData(o, i.data, s);
                    }
                  }
                }
              }),
              (e.prototype.checkCompatibility = function(t, e) {
                var r = t.attributes,
                  i = e.attributeData;
                for (var n in i)
                  if (!r[n])
                    throw new Error(
                      'shader and geometry incompatible, geometry missing the "' +
                        n +
                        '" attribute'
                    );
              }),
              (e.prototype.getSignature = function(t, e) {
                var r = t.attributes,
                  i = e.attributeData,
                  n = ["g", t.id];
                for (var o in r) i[o] && n.push(o);
                return n.join("-");
              }),
              (e.prototype.initGeometryVao = function(t, e) {
                this.checkCompatibility(t, e);
                var r = this.gl,
                  i = this.CONTEXT_UID,
                  n = this.getSignature(t, e),
                  o = t.glVertexArrayObjects[this.CONTEXT_UID],
                  s = o[n];
                if (s) return (o[e.id] = s), s;
                var a = t.buffers,
                  h = t.attributes,
                  u = {},
                  l = {};
                for (var c in a) (u[c] = 0), (l[c] = 0);
                for (var d in h)
                  !h[d].size && e.attributeData[d]
                    ? (h[d].size = e.attributeData[d].size)
                    : h[d].size ||
                      console.warn(
                        "PIXI Geometry attribute '" +
                          d +
                          "' size cannot be determined (likely the bound shader does not have the attribute)"
                      ),
                    (u[h[d].buffer] += h[d].size * it[h[d].type]);
                for (var p in h) {
                  var f = h[p],
                    v = f.size;
                  void 0 === f.stride &&
                    (u[f.buffer] === v * it[f.type]
                      ? (f.stride = 0)
                      : (f.stride = u[f.buffer])),
                    void 0 === f.start &&
                      ((f.start = l[f.buffer]),
                      (l[f.buffer] += v * it[f.type]));
                }
                (s = r.createVertexArray()), r.bindVertexArray(s);
                for (var _ = 0; _ < a.length; _++) {
                  var g = a[_];
                  g._glBuffers[i] ||
                    ((g._glBuffers[i] = new rt(r.createBuffer())),
                    (this.managedBuffers[g.id] = g),
                    g.disposeRunner.add(this)),
                    g._glBuffers[i].refCount++;
                }
                return (
                  this.activateVao(t, e),
                  (this._activeVao = s),
                  (o[e.id] = s),
                  (o[n] = s),
                  s
                );
              }),
              (e.prototype.disposeBuffer = function(t, e) {
                if (this.managedBuffers[t.id]) {
                  delete this.managedBuffers[t.id];
                  var r = t._glBuffers[this.CONTEXT_UID],
                    i = this.gl;
                  t.disposeRunner.remove(this),
                    r &&
                      (e || i.deleteBuffer(r.buffer),
                      delete t._glBuffers[this.CONTEXT_UID]);
                }
              }),
              (e.prototype.disposeGeometry = function(t, e) {
                if (this.managedGeometries[t.id]) {
                  delete this.managedGeometries[t.id];
                  var r = t.glVertexArrayObjects[this.CONTEXT_UID],
                    i = this.gl,
                    n = t.buffers;
                  if ((t.disposeRunner.remove(this), r)) {
                    for (var o = 0; o < n.length; o++) {
                      var s = n[o]._glBuffers[this.CONTEXT_UID];
                      s.refCount--,
                        0 !== s.refCount || e || this.disposeBuffer(n[o], e);
                    }
                    if (!e)
                      for (var a in r)
                        if ("g" === a[0]) {
                          var h = r[a];
                          this._activeVao === h && this.unbind(),
                            i.deleteVertexArray(h);
                        }
                    delete t.glVertexArrayObjects[this.CONTEXT_UID];
                  }
                }
              }),
              (e.prototype.disposeAll = function(t) {
                for (
                  var e = Object.keys(this.managedGeometries), r = 0;
                  r < e.length;
                  r++
                )
                  this.disposeGeometry(this.managedGeometries[e[r]], t);
                e = Object.keys(this.managedBuffers);
                for (var i = 0; i < e.length; i++)
                  this.disposeBuffer(this.managedBuffers[e[i]], t);
              }),
              (e.prototype.activateVao = function(t, e) {
                var r = this.gl,
                  i = this.CONTEXT_UID,
                  n = t.buffers,
                  o = t.attributes;
                t.indexBuffer &&
                  r.bindBuffer(
                    r.ELEMENT_ARRAY_BUFFER,
                    t.indexBuffer._glBuffers[i].buffer
                  );
                var s = null;
                for (var a in o) {
                  var h = o[a],
                    u = n[h.buffer]._glBuffers[i];
                  if (e.attributeData[a]) {
                    s !== u &&
                      (r.bindBuffer(r.ARRAY_BUFFER, u.buffer), (s = u));
                    var l = e.attributeData[a].location;
                    if (
                      (r.enableVertexAttribArray(l),
                      r.vertexAttribPointer(
                        l,
                        h.size,
                        h.type || r.FLOAT,
                        h.normalized,
                        h.stride,
                        h.start
                      ),
                      h.instance)
                    ) {
                      if (!this.hasInstance)
                        throw new Error(
                          "geometry error, GPU Instancing is not supported on this device"
                        );
                      r.vertexAttribDivisor(l, 1);
                    }
                  }
                }
              }),
              (e.prototype.draw = function(t, e, r, i) {
                var n = this.gl,
                  o = this._activeGeometry;
                if (o.indexBuffer) {
                  var s = o.indexBuffer.data.BYTES_PER_ELEMENT,
                    a = 2 === s ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
                  2 === s || (4 === s && this.canUseUInt32ElementIndex)
                    ? o.instanced
                      ? n.drawElementsInstanced(
                          t,
                          e || o.indexBuffer.data.length,
                          a,
                          (r || 0) * s,
                          i || 1
                        )
                      : n.drawElements(
                          t,
                          e || o.indexBuffer.data.length,
                          a,
                          (r || 0) * s
                        )
                    : console.warn("unsupported index buffer type: uint32");
                } else
                  o.instanced
                    ? n.drawArraysInstanced(t, r, e || o.getSize(), i || 1)
                    : n.drawArrays(t, r, e || o.getSize());
                return this;
              }),
              (e.prototype.unbind = function() {
                this.gl.bindVertexArray(null),
                  (this._activeVao = null),
                  (this._activeGeometry = null);
              }),
              e
            );
          })(b),
          ot = function(t) {
            (this.type = r.MASK_TYPES.NONE),
              (this.autoDetect = !0),
              (this.maskObject = t || null),
              (this.pooled = !1),
              (this.isMaskData = !0),
              (this._stencilCounter = 0),
              (this._scissorCounter = 0),
              (this._scissorRect = null),
              (this._target = null);
          };
        function st(t, e, r, i) {
          var n = at(t, t.VERTEX_SHADER, e),
            o = at(t, t.FRAGMENT_SHADER, r),
            s = t.createProgram();
          if ((t.attachShader(s, n), t.attachShader(s, o), i))
            for (var a in i) t.bindAttribLocation(s, i[a], a);
          return (
            t.linkProgram(s),
            t.getProgramParameter(s, t.LINK_STATUS) ||
              (console.error("Pixi.js Error: Could not initialize shader."),
              console.error(
                "gl.VALIDATE_STATUS",
                t.getProgramParameter(s, t.VALIDATE_STATUS)
              ),
              console.error("gl.getError()", t.getError()),
              "" !== t.getProgramInfoLog(s) &&
                console.warn(
                  "Pixi.js Warning: gl.getProgramInfoLog()",
                  t.getProgramInfoLog(s)
                ),
              t.deleteProgram(s),
              (s = null)),
            t.deleteShader(n),
            t.deleteShader(o),
            s
          );
        }
        function at(t, e, r) {
          var i = t.createShader(e);
          return (
            t.shaderSource(i, r),
            t.compileShader(i),
            t.getShaderParameter(i, t.COMPILE_STATUS)
              ? i
              : (console.warn(r), console.error(t.getShaderInfoLog(i)), null)
          );
        }
        function ht(t, e) {
          switch (t) {
            case "float":
              return 0;
            case "vec2":
              return new Float32Array(2 * e);
            case "vec3":
              return new Float32Array(3 * e);
            case "vec4":
              return new Float32Array(4 * e);
            case "int":
            case "sampler2D":
            case "sampler2DArray":
              return 0;
            case "ivec2":
              return new Int32Array(2 * e);
            case "ivec3":
              return new Int32Array(3 * e);
            case "ivec4":
              return new Int32Array(4 * e);
            case "bool":
              return !1;
            case "bvec2":
              return ut(2 * e);
            case "bvec3":
              return ut(3 * e);
            case "bvec4":
              return ut(4 * e);
            case "mat2":
              return new Float32Array([1, 0, 0, 1]);
            case "mat3":
              return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            case "mat4":
              return new Float32Array([
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1
              ]);
          }
          return null;
        }
        function ut(t) {
          for (var e = new Array(t), r = 0; r < e.length; r++) e[r] = !1;
          return e;
        }
        (exports.MaskData = ot),
          (ot.prototype.reset = function() {
            this.pooled &&
              ((this.maskObject = null),
              (this.type = r.MASK_TYPES.NONE),
              (this.autoDetect = !0)),
              (this._target = null);
          }),
          (ot.prototype.copyCountersOrReset = function(t) {
            t
              ? ((this._stencilCounter = t._stencilCounter),
                (this._scissorCounter = t._scissorCounter),
                (this._scissorRect = t._scissorRect))
              : ((this._stencilCounter = 0),
                (this._scissorCounter = 0),
                (this._scissorRect = null));
          });
        var lt,
          ct = {},
          dt = ct;
        function pt() {
          if (dt === ct || (dt && dt.isContextLost())) {
            var t,
              e = document.createElement("canvas");
            i.settings.PREFER_ENV >= r.ENV.WEBGL2 &&
              (t = e.getContext("webgl2", {})),
              t ||
                ((t =
                  e.getContext("webgl", {}) ||
                  e.getContext("experimental-webgl", {}))
                  ? t.getExtension("WEBGL_draw_buffers")
                  : (t = null)),
              (dt = t);
          }
          return dt;
        }
        function ft() {
          if (!lt) {
            lt = r.PRECISION.MEDIUM;
            var t = pt();
            if (t && t.getShaderPrecisionFormat) {
              var e = t.getShaderPrecisionFormat(
                t.FRAGMENT_SHADER,
                t.HIGH_FLOAT
              );
              lt = e.precision ? r.PRECISION.HIGH : r.PRECISION.MEDIUM;
            }
          }
          return lt;
        }
        function vt(t, e, i) {
          if ("precision" !== t.substring(0, 9)) {
            var n = e;
            return (
              e === r.PRECISION.HIGH &&
                i !== r.PRECISION.HIGH &&
                (n = r.PRECISION.MEDIUM),
              "precision " + n + " float;\n" + t
            );
          }
          return i !== r.PRECISION.HIGH &&
            "precision highp" === t.substring(0, 15)
            ? t.replace("precision highp", "precision mediump")
            : t;
        }
        var _t = {
          float: 1,
          vec2: 2,
          vec3: 3,
          vec4: 4,
          int: 1,
          ivec2: 2,
          ivec3: 3,
          ivec4: 4,
          bool: 1,
          bvec2: 2,
          bvec3: 3,
          bvec4: 4,
          mat2: 4,
          mat3: 9,
          mat4: 16,
          sampler2D: 1
        };
        function gt(t) {
          return _t[t];
        }
        var yt = null,
          mt = {
            FLOAT: "float",
            FLOAT_VEC2: "vec2",
            FLOAT_VEC3: "vec3",
            FLOAT_VEC4: "vec4",
            INT: "int",
            INT_VEC2: "ivec2",
            INT_VEC3: "ivec3",
            INT_VEC4: "ivec4",
            BOOL: "bool",
            BOOL_VEC2: "bvec2",
            BOOL_VEC3: "bvec3",
            BOOL_VEC4: "bvec4",
            FLOAT_MAT2: "mat2",
            FLOAT_MAT3: "mat3",
            FLOAT_MAT4: "mat4",
            SAMPLER_2D: "sampler2D",
            SAMPLER_CUBE: "samplerCube",
            SAMPLER_2D_ARRAY: "sampler2DArray"
          };
        function xt(t, e) {
          if (!yt) {
            var r = Object.keys(mt);
            yt = {};
            for (var i = 0; i < r.length; ++i) {
              var n = r[i];
              yt[t[n]] = mt[n];
            }
          }
          return yt[e];
        }
        var Et = {
            float:
              "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
            vec2:
              "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
            vec3:
              "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
            vec4: "gl.uniform4f(location, v[0], v[1], v[2], v[3])",
            int: "gl.uniform1i(location, v)",
            ivec2: "gl.uniform2i(location, v[0], v[1])",
            ivec3: "gl.uniform3i(location, v[0], v[1], v[2])",
            ivec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
            bool: "gl.uniform1i(location, v)",
            bvec2: "gl.uniform2i(location, v[0], v[1])",
            bvec3: "gl.uniform3i(location, v[0], v[1], v[2])",
            bvec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
            mat2: "gl.uniformMatrix2fv(location, false, v)",
            mat3: "gl.uniformMatrix3fv(location, false, v)",
            mat4: "gl.uniformMatrix4fv(location, false, v)",
            sampler2D: "gl.uniform1i(location, v)",
            samplerCube: "gl.uniform1i(location, v)",
            sampler2DArray: "gl.uniform1i(location, v)"
          },
          Tt = {
            float: "gl.uniform1fv(location, v)",
            vec2: "gl.uniform2fv(location, v)",
            vec3: "gl.uniform3fv(location, v)",
            vec4: "gl.uniform4fv(location, v)",
            mat4: "gl.uniformMatrix4fv(location, false, v)",
            mat3: "gl.uniformMatrix3fv(location, false, v)",
            mat2: "gl.uniformMatrix2fv(location, false, v)",
            int: "gl.uniform1iv(location, v)",
            ivec2: "gl.uniform2iv(location, v)",
            ivec3: "gl.uniform3iv(location, v)",
            ivec4: "gl.uniform4iv(location, v)",
            bool: "gl.uniform1iv(location, v)",
            bvec2: "gl.uniform2iv(location, v)",
            bvec3: "gl.uniform3iv(location, v)",
            bvec4: "gl.uniform4iv(location, v)",
            sampler2D: "gl.uniform1iv(location, v)",
            samplerCube: "gl.uniform1iv(location, v)",
            sampler2DArray: "gl.uniform1iv(location, v)"
          };
        function bt(t, e) {
          var r = 0,
            i = "var v = null;\n    var cv = null\n    var gl = renderer.gl";
          for (var n in t.uniforms) {
            var o = e[n];
            if (o)
              if ("float" === o.type && 1 === o.size)
                i +=
                  "\n            if(uv." +
                  n +
                  " !== ud." +
                  n +
                  ".value)\n            {\n                ud." +
                  n +
                  ".value = uv." +
                  n +
                  "\n                gl.uniform1f(ud." +
                  n +
                  ".location, uv." +
                  n +
                  ")\n            }\n";
              else if (
                ("sampler2D" !== o.type &&
                  "samplerCube" !== o.type &&
                  "sampler2DArray" !== o.type) ||
                1 !== o.size ||
                o.isArray
              )
                if ("mat3" === o.type && 1 === o.size)
                  void 0 !== t.uniforms[n].a
                    ? (i +=
                        "\n                gl.uniformMatrix3fv(ud." +
                        n +
                        ".location, false, uv." +
                        n +
                        ".toArray(true));\n                \n")
                    : (i +=
                        "\n                gl.uniformMatrix3fv(ud." +
                        n +
                        ".location, false, uv." +
                        n +
                        ");\n                \n");
                else if ("vec2" === o.type && 1 === o.size)
                  void 0 !== t.uniforms[n].x
                    ? (i +=
                        "\n                cv = ud." +
                        n +
                        ".value;\n                v = uv." +
                        n +
                        ";\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud." +
                        n +
                        ".location, v.x, v.y);\n                }\n")
                    : (i +=
                        "\n                cv = ud." +
                        n +
                        ".value;\n                v = uv." +
                        n +
                        ";\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud." +
                        n +
                        ".location, v[0], v[1]);\n                }\n                \n");
                else if ("vec4" === o.type && 1 === o.size)
                  void 0 !== t.uniforms[n].width
                    ? (i +=
                        "\n                cv = ud." +
                        n +
                        ".value;\n                v = uv." +
                        n +
                        ";\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud." +
                        n +
                        ".location, v.x, v.y, v.width, v.height)\n                }\n")
                    : (i +=
                        "\n                cv = ud." +
                        n +
                        ".value;\n                v = uv." +
                        n +
                        ";\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud." +
                        n +
                        ".location, v[0], v[1], v[2], v[3])\n                }\n                \n");
                else {
                  i +=
                    "\n            cv = ud." +
                    n +
                    ".value;\n            v = uv." +
                    n +
                    ";\n            " +
                    (1 === o.size ? Et : Tt)[o.type].replace(
                      "location",
                      "ud." + n + ".location"
                    ) +
                    ";\n";
                }
              else
                (i +=
                  "\n            renderer.texture.bind(uv." +
                  n +
                  ", " +
                  r +
                  ");\n\n            if(ud." +
                  n +
                  ".value !== " +
                  r +
                  ")\n            {\n                ud." +
                  n +
                  ".value = " +
                  r +
                  ";\n                gl.uniform1i(ud." +
                  n +
                  ".location, " +
                  r +
                  ");\n; // eslint-disable-line max-len\n            }\n"),
                  r++;
            else
              t.uniforms[n].group &&
                (i +=
                  "\n                    renderer.shader.syncUniformGroup(uv." +
                  n +
                  ");\n                ");
          }
          return new Function("ud", "uv", "renderer", i);
        }
        var St,
          wt = [
            "precision mediump float;",
            "void main(void){",
            "float test = 0.1;",
            "%forloop%",
            "gl_FragColor = vec4(0.0);",
            "}"
          ].join("\n");
        function At(t, e) {
          if (0 === t)
            throw new Error(
              "Invalid value of `0` passed to `checkMaxIfStatementsInShader`"
            );
          for (var r = e.createShader(e.FRAGMENT_SHADER); ; ) {
            var i = wt.replace(/%forloop%/gi, Ct(t));
            if (
              (e.shaderSource(r, i),
              e.compileShader(r),
              e.getShaderParameter(r, e.COMPILE_STATUS))
            )
              break;
            t = (t / 2) | 0;
          }
          return t;
        }
        function Ct(t) {
          for (var e = "", r = 0; r < t; ++r)
            r > 0 && (e += "\nelse "),
              r < t - 1 && (e += "if(test == " + r + ".0){}");
          return e;
        }
        function Rt() {
          if ("boolean" == typeof St) return St;
          try {
            var t = new Function(
              "param1",
              "param2",
              "param3",
              "return param1[param2] === param3;"
            );
            St = !0 === t({ a: "b" }, "a", "b");
          } catch (e) {
            St = !1;
          }
          return St;
        }
        var It =
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}",
          Ot =
            "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n",
          Pt = 0,
          Mt = {},
          Dt = function t(e, n, o) {
            void 0 === o && (o = "pixi-shader"),
              (this.id = Pt++),
              (this.vertexSrc = e || t.defaultVertexSrc),
              (this.fragmentSrc = n || t.defaultFragmentSrc),
              (this.vertexSrc = this.vertexSrc.trim()),
              (this.fragmentSrc = this.fragmentSrc.trim()),
              "#version" !== this.vertexSrc.substring(0, 8) &&
                ((o = o.replace(/\s+/g, "-")),
                Mt[o] ? (Mt[o]++, (o += "-" + Mt[o])) : (Mt[o] = 1),
                (this.vertexSrc =
                  "#define SHADER_NAME " + o + "\n" + this.vertexSrc),
                (this.fragmentSrc =
                  "#define SHADER_NAME " + o + "\n" + this.fragmentSrc),
                (this.vertexSrc = vt(
                  this.vertexSrc,
                  i.settings.PRECISION_VERTEX,
                  r.PRECISION.HIGH
                )),
                (this.fragmentSrc = vt(
                  this.fragmentSrc,
                  i.settings.PRECISION_FRAGMENT,
                  ft()
                ))),
              this.extractData(this.vertexSrc, this.fragmentSrc),
              (this.glPrograms = {}),
              (this.syncUniforms = null);
          };
        exports.Program = Dt;
        var Ft = {
          defaultVertexSrc: { configurable: !0 },
          defaultFragmentSrc: { configurable: !0 }
        };
        (Dt.prototype.extractData = function(t, e) {
          var r = pt();
          if (r) {
            var i = st(r, t, e);
            (this.attributeData = this.getAttributeData(i, r)),
              (this.uniformData = this.getUniformData(i, r)),
              r.deleteProgram(i);
          } else (this.uniformData = {}), (this.attributeData = {});
        }),
          (Dt.prototype.getAttributeData = function(t, e) {
            for (
              var r = {},
                i = [],
                n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES),
                o = 0;
              o < n;
              o++
            ) {
              var s = e.getActiveAttrib(t, o),
                a = xt(e, s.type),
                h = { type: a, name: s.name, size: gt(a), location: 0 };
              (r[s.name] = h), i.push(h);
            }
            i.sort(function(t, e) {
              return t.name > e.name ? 1 : -1;
            });
            for (var u = 0; u < i.length; u++) i[u].location = u;
            return r;
          }),
          (Dt.prototype.getUniformData = function(t, e) {
            for (
              var r = {},
                i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS),
                n = 0;
              n < i;
              n++
            ) {
              var o = e.getActiveUniform(t, n),
                s = o.name.replace(/\[.*?\]/, ""),
                a = o.name.match(/\[.*?\]/, ""),
                h = xt(e, o.type);
              r[s] = {
                type: h,
                size: o.size,
                isArray: a,
                value: ht(h, o.size)
              };
            }
            return r;
          }),
          (Ft.defaultVertexSrc.get = function() {
            return Ot;
          }),
          (Ft.defaultFragmentSrc.get = function() {
            return It;
          }),
          (Dt.from = function(t, r, i) {
            var n = t + r,
              o = e.ProgramCache[n];
            return o || (e.ProgramCache[n] = o = new Dt(t, r, i)), o;
          }),
          Object.defineProperties(Dt, Ft);
        var Nt = function(t, e) {
          for (var r in ((this.program = t),
          (this.uniformGroup = e ? (e instanceof K ? e : new K(e)) : new K({})),
          t.uniformData))
            this.uniformGroup.uniforms[r] instanceof Array &&
              (this.uniformGroup.uniforms[r] = new Float32Array(
                this.uniformGroup.uniforms[r]
              ));
        };
        exports.Shader = Nt;
        var Ut = { uniforms: { configurable: !0 } };
        (Nt.prototype.checkUniformExists = function(t, e) {
          if (e.uniforms[t]) return !0;
          for (var r in e.uniforms) {
            var i = e.uniforms[r];
            if (i.group && this.checkUniformExists(t, i)) return !0;
          }
          return !1;
        }),
          (Nt.prototype.destroy = function() {
            this.uniformGroup = null;
          }),
          (Ut.uniforms.get = function() {
            return this.uniformGroup.uniforms;
          }),
          (Nt.from = function(t, e, r) {
            var i = Dt.from(t, e);
            return new Nt(i, r);
          }),
          Object.defineProperties(Nt.prototype, Ut);
        var Bt = 0,
          Lt = 1,
          kt = 2,
          Gt = 3,
          Vt = 4,
          Xt = function() {
            (this.data = 0),
              (this.blendMode = r.BLEND_MODES.NORMAL),
              (this.polygonOffset = 0),
              (this.blend = !0);
          };
        exports.State = Xt;
        var jt = {
          blend: { configurable: !0 },
          offsets: { configurable: !0 },
          culling: { configurable: !0 },
          depthTest: { configurable: !0 },
          clockwiseFrontFace: { configurable: !0 },
          blendMode: { configurable: !0 },
          polygonOffset: { configurable: !0 }
        };
        (jt.blend.get = function() {
          return !!(this.data & (1 << Bt));
        }),
          (jt.blend.set = function(t) {
            !!(this.data & (1 << Bt)) !== t && (this.data ^= 1 << Bt);
          }),
          (jt.offsets.get = function() {
            return !!(this.data & (1 << Lt));
          }),
          (jt.offsets.set = function(t) {
            !!(this.data & (1 << Lt)) !== t && (this.data ^= 1 << Lt);
          }),
          (jt.culling.get = function() {
            return !!(this.data & (1 << kt));
          }),
          (jt.culling.set = function(t) {
            !!(this.data & (1 << kt)) !== t && (this.data ^= 1 << kt);
          }),
          (jt.depthTest.get = function() {
            return !!(this.data & (1 << Gt));
          }),
          (jt.depthTest.set = function(t) {
            !!(this.data & (1 << Gt)) !== t && (this.data ^= 1 << Gt);
          }),
          (jt.clockwiseFrontFace.get = function() {
            return !!(this.data & (1 << Vt));
          }),
          (jt.clockwiseFrontFace.set = function(t) {
            !!(this.data & (1 << Vt)) !== t && (this.data ^= 1 << Vt);
          }),
          (jt.blendMode.get = function() {
            return this._blendMode;
          }),
          (jt.blendMode.set = function(t) {
            (this.blend = t !== r.BLEND_MODES.NONE), (this._blendMode = t);
          }),
          (jt.polygonOffset.get = function() {
            return this._polygonOffset;
          }),
          (jt.polygonOffset.set = function(t) {
            (this.offsets = !!t), (this._polygonOffset = t);
          }),
          (Xt.for2d = function() {
            var t = new Xt();
            return (t.depthTest = !1), (t.blend = !0), t;
          }),
          Object.defineProperties(Xt.prototype, jt);
        var Ht =
            "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n",
          zt =
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n",
          Wt = (function(t) {
            function e(r, n, o) {
              var s = Dt.from(
                r || e.defaultVertexSrc,
                n || e.defaultFragmentSrc
              );
              t.call(this, s, o),
                (this.padding = 0),
                (this.resolution = i.settings.FILTER_RESOLUTION),
                (this.enabled = !0),
                (this.autoFit = !0),
                (this.legacy = !!this.program.attributeData.aTextureCoord),
                (this.state = new Xt());
            }
            t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e);
            var r = { blendMode: { configurable: !0 } },
              n = {
                defaultVertexSrc: { configurable: !0 },
                defaultFragmentSrc: { configurable: !0 }
              };
            return (
              (e.prototype.apply = function(t, e, r, i, n) {
                t.applyFilter(this, e, r, i, n);
              }),
              (r.blendMode.get = function() {
                return this.state.blendMode;
              }),
              (r.blendMode.set = function(t) {
                this.state.blendMode = t;
              }),
              (n.defaultVertexSrc.get = function() {
                return Ht;
              }),
              (n.defaultFragmentSrc.get = function() {
                return zt;
              }),
              Object.defineProperties(e.prototype, r),
              Object.defineProperties(e, n),
              e
            );
          })(Nt);
        (exports.Filter = Wt), (Wt.SOURCE_KEY_MAP = {});
        var Yt =
            "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n",
          Kt =
            "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n",
          qt = new o.Matrix(),
          Zt = function(t, e) {
            (this._texture = t),
              (this.mapCoord = new o.Matrix()),
              (this.uClampFrame = new Float32Array(4)),
              (this.uClampOffset = new Float32Array(2)),
              (this._updateID = -1),
              (this.clampOffset = 0),
              (this.clampMargin = void 0 === e ? 0.5 : e),
              (this.isSimple = !1);
          };
        exports.TextureMatrix = Zt;
        var Qt = { texture: { configurable: !0 } };
        (Qt.texture.get = function() {
          return this._texture;
        }),
          (Qt.texture.set = function(t) {
            (this._texture = t), (this._updateID = -1);
          }),
          (Zt.prototype.multiplyUvs = function(t, e) {
            void 0 === e && (e = t);
            for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
              var n = t[i],
                o = t[i + 1];
              (e[i] = n * r.a + o * r.c + r.tx),
                (e[i + 1] = n * r.b + o * r.d + r.ty);
            }
            return e;
          }),
          (Zt.prototype.update = function(t) {
            var e = this._texture;
            if (!e || !e.valid) return !1;
            if (!t && this._updateID === e._updateID) return !1;
            this._updateID = e._updateID;
            var r = e._uvs;
            this.mapCoord.set(
              r.x1 - r.x0,
              r.y1 - r.y0,
              r.x3 - r.x0,
              r.y3 - r.y0,
              r.x0,
              r.y0
            );
            var i = e.orig,
              n = e.trim;
            n &&
              (qt.set(
                i.width / n.width,
                0,
                0,
                i.height / n.height,
                -n.x / n.width,
                -n.y / n.height
              ),
              this.mapCoord.append(qt));
            var o = e.baseTexture,
              s = this.uClampFrame,
              a = this.clampMargin / o.resolution,
              h = this.clampOffset;
            return (
              (s[0] = (e._frame.x + a + h) / o.width),
              (s[1] = (e._frame.y + a + h) / o.height),
              (s[2] = (e._frame.x + e._frame.width - a + h) / o.width),
              (s[3] = (e._frame.y + e._frame.height - a + h) / o.height),
              (this.uClampOffset[0] = h / o.realWidth),
              (this.uClampOffset[1] = h / o.realHeight),
              (this.isSimple =
                e._frame.width === o.width &&
                e._frame.height === o.height &&
                0 === e.rotate),
              !0
            );
          }),
          Object.defineProperties(Zt.prototype, Qt);
        var $t = (function(t) {
          function e(e) {
            var r = new o.Matrix();
            t.call(this, Yt, Kt),
              (e.renderable = !1),
              (this.maskSprite = e),
              (this.maskMatrix = r);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.apply = function(t, e, r, i) {
              var n = this.maskSprite,
                o = this.maskSprite.texture;
              o.valid &&
                (o.transform || (o.transform = new Zt(o, 0)),
                o.transform.update(),
                (this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1),
                (this.uniforms.mask = o),
                (this.uniforms.otherMatrix = t
                  .calculateSpriteMatrix(this.maskMatrix, n)
                  .prepend(o.transform.mapCoord)),
                (this.uniforms.alpha = n.worldAlpha),
                (this.uniforms.maskClamp = o.transform.uClampFrame),
                t.applyFilter(this, e, r, i));
            }),
            e
          );
        })(Wt);
        exports.SpriteMaskFilter = $t;
        var Jt = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.scissorRenderTarget = null),
                (this.enableScissor = !1),
                (this.alphaMaskPool = []),
                (this.maskDataPool = []),
                (this.maskStack = []),
                (this.alphaMaskIndex = 0);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.setMaskStack = function(t) {
                (this.maskStack = t),
                  this.renderer.scissor.setMaskStack(t),
                  this.renderer.stencil.setMaskStack(t);
              }),
              (e.prototype.push = function(t, e) {
                if (!e.isMaskData) {
                  var i = this.maskDataPool.pop() || new ot();
                  (i.pooled = !0), (i.maskObject = e), (e = i);
                }
                switch (
                  (e.autoDetect && this.detect(e),
                  e.copyCountersOrReset(
                    this.maskStack[this.maskStack.length - 1]
                  ),
                  (e._target = t),
                  e.type)
                ) {
                  case r.MASK_TYPES.SCISSOR:
                    this.maskStack.push(e), this.renderer.scissor.push(e);
                    break;
                  case r.MASK_TYPES.STENCIL:
                    this.maskStack.push(e), this.renderer.stencil.push(e);
                    break;
                  case r.MASK_TYPES.SPRITE:
                    e.copyCountersOrReset(null),
                      this.pushSpriteMask(e),
                      this.maskStack.push(e);
                }
              }),
              (e.prototype.pop = function(t) {
                var e = this.maskStack.pop();
                if (e && e._target === t) {
                  switch (e.type) {
                    case r.MASK_TYPES.SCISSOR:
                      this.renderer.scissor.pop();
                      break;
                    case r.MASK_TYPES.STENCIL:
                      this.renderer.stencil.pop(e.maskObject);
                      break;
                    case r.MASK_TYPES.SPRITE:
                      this.popSpriteMask();
                  }
                  e.reset(), e.pooled && this.maskDataPool.push(e);
                }
              }),
              (e.prototype.detect = function(t) {
                var e = t.maskObject;
                if (e.isSprite) t.type = r.MASK_TYPES.SPRITE;
                else if (
                  ((t.type = r.MASK_TYPES.STENCIL),
                  this.enableScissor && e.isFastRect && e.isFastRect())
                ) {
                  var i = e.worldTransform,
                    n = Math.atan2(i.b, i.a),
                    o = Math.atan2(i.d, i.c);
                  (n = Math.round(n * (180 / Math.PI) * 100)),
                    (o =
                      (((o = Math.round(o * (180 / Math.PI) * 100) - n) %
                        18e3) +
                        18e3) %
                      18e3),
                    0 === (n = ((n % 9e3) + 9e3) % 9e3) &&
                      9e3 === o &&
                      (t.type = r.MASK_TYPES.SCISSOR);
                }
              }),
              (e.prototype.pushSpriteMask = function(t) {
                var e = t.maskObject,
                  r = t._target,
                  i = this.alphaMaskPool[this.alphaMaskIndex];
                i ||
                  (i = this.alphaMaskPool[this.alphaMaskIndex] = [new $t(e)]),
                  (i[0].resolution = this.renderer.resolution),
                  (i[0].maskSprite = e);
                var n = r.filterArea;
                (r.filterArea = e.getBounds(!0)),
                  this.renderer.filter.push(r, i),
                  (r.filterArea = n),
                  this.alphaMaskIndex++;
              }),
              (e.prototype.popSpriteMask = function() {
                this.renderer.filter.pop(), this.alphaMaskIndex--;
              }),
              e
            );
          })(b),
          te = (function(t) {
            function e(e) {
              t.call(this, e), (this.maskStack = []), (this.glConst = 0);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.getStackLength = function() {
                return this.maskStack.length;
              }),
              (e.prototype.setMaskStack = function(t) {
                var e = this.renderer.gl,
                  r = this.getStackLength();
                this.maskStack = t;
                var i = this.getStackLength();
                i !== r &&
                  (0 === i
                    ? e.disable(this.glConst)
                    : (e.enable(this.glConst), this._useCurrent()));
              }),
              (e.prototype._useCurrent = function() {}),
              (e.prototype.destroy = function() {
                t.prototype.destroy.call(this, this), (this.maskStack = null);
              }),
              e
            );
          })(b),
          ee = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.glConst = WebGLRenderingContext.SCISSOR_TEST);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.getStackLength = function() {
                var t = this.maskStack[this.maskStack.length - 1];
                return t ? t._scissorCounter : 0;
              }),
              (e.prototype.push = function(t) {
                var e = t.maskObject;
                e.renderable = !0;
                var r = t._scissorRect,
                  i = e.getBounds(!0),
                  n = this.renderer.gl;
                (e.renderable = !1),
                  r ? i.fit(r) : n.enable(n.SCISSOR_TEST),
                  t._scissorCounter++,
                  (t._scissorRect = i),
                  this._useCurrent();
              }),
              (e.prototype.pop = function() {
                var t = this.renderer.gl;
                this.getStackLength() > 0
                  ? this._useCurrent()
                  : t.disable(t.SCISSOR_TEST);
              }),
              (e.prototype._useCurrent = function() {
                var t = this.maskStack[this.maskStack.length - 1]._scissorRect,
                  e = this.renderer.renderTexture.current,
                  r = this.renderer.projection,
                  i = r.transform,
                  n = r.sourceFrame,
                  o = r.destinationFrame,
                  s = e ? e.resolution : this.renderer.resolution,
                  a = (t.x - n.x) * s + o.x,
                  h = (t.y - n.y) * s + o.y,
                  u = t.width * s,
                  l = t.height * s;
                i && ((a += i.tx * s), (h += i.ty * s)),
                  e || (h = this.renderer.height - l - h),
                  this.renderer.gl.scissor(a, h, u, l);
              }),
              e
            );
          })(te),
          re = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.glConst = WebGLRenderingContext.STENCIL_TEST);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.getStackLength = function() {
                var t = this.maskStack[this.maskStack.length - 1];
                return t ? t._stencilCounter : 0;
              }),
              (e.prototype.push = function(t) {
                var e = t.maskObject,
                  r = this.renderer.gl,
                  i = t._stencilCounter;
                0 === i &&
                  (this.renderer.framebuffer.forceStencil(),
                  r.enable(r.STENCIL_TEST)),
                  t._stencilCounter++,
                  r.colorMask(!1, !1, !1, !1),
                  r.stencilFunc(r.EQUAL, i, this._getBitwiseMask()),
                  r.stencilOp(r.KEEP, r.KEEP, r.INCR),
                  (e.renderable = !0),
                  e.render(this.renderer),
                  this.renderer.batch.flush(),
                  (e.renderable = !1),
                  this._useCurrent();
              }),
              (e.prototype.pop = function(t) {
                var e = this.renderer.gl;
                0 === this.getStackLength()
                  ? (e.disable(e.STENCIL_TEST),
                    e.clear(e.STENCIL_BUFFER_BIT),
                    e.clearStencil(0))
                  : (e.colorMask(!1, !1, !1, !1),
                    e.stencilOp(e.KEEP, e.KEEP, e.DECR),
                    (t.renderable = !0),
                    t.render(this.renderer),
                    this.renderer.batch.flush(),
                    (t.renderable = !1),
                    this._useCurrent());
              }),
              (e.prototype._useCurrent = function() {
                var t = this.renderer.gl;
                t.colorMask(!0, !0, !0, !0),
                  t.stencilFunc(
                    t.EQUAL,
                    this.getStackLength(),
                    this._getBitwiseMask()
                  ),
                  t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
              }),
              (e.prototype._getBitwiseMask = function() {
                return (1 << this.getStackLength()) - 1;
              }),
              e
            );
          })(te),
          ie = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.destinationFrame = null),
                (this.sourceFrame = null),
                (this.defaultFrame = null),
                (this.projectionMatrix = new o.Matrix()),
                (this.transform = null);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.update = function(t, e, r, i) {
                (this.destinationFrame =
                  t || this.destinationFrame || this.defaultFrame),
                  (this.sourceFrame = e || this.sourceFrame || t),
                  this.calculateProjection(
                    this.destinationFrame,
                    this.sourceFrame,
                    r,
                    i
                  ),
                  this.transform &&
                    this.projectionMatrix.append(this.transform);
                var n = this.renderer;
                (n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix),
                  n.globalUniforms.update(),
                  n.shader.shader &&
                    n.shader.syncUniformGroup(n.shader.shader.uniforms.globals);
              }),
              (e.prototype.calculateProjection = function(t, e, r, i) {
                var n = this.projectionMatrix;
                i
                  ? ((n.a = (1 / t.width) * 2 * r),
                    (n.d = (-1 / t.height) * 2 * r),
                    (n.tx = -1 - e.x * n.a),
                    (n.ty = 1 - e.y * n.d))
                  : ((n.a = (1 / t.width) * 2 * r),
                    (n.d = (1 / t.height) * 2 * r),
                    (n.tx = -1 - e.x * n.a),
                    (n.ty = -1 - e.y * n.d));
              }),
              (e.prototype.setTransform = function() {}),
              e
            );
          })(b),
          ne = new o.Rectangle(),
          oe = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.clearColor = e._backgroundColorRgba),
                (this.defaultMaskStack = []),
                (this.current = null),
                (this.sourceFrame = new o.Rectangle()),
                (this.destinationFrame = new o.Rectangle());
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.bind = function(t, e, r) {
                void 0 === t && (t = null), (this.current = t);
                var i,
                  n = this.renderer;
                if (t) {
                  var o = t.baseTexture;
                  (i = o.resolution),
                    r ||
                      ((ne.width = o.realWidth),
                      (ne.height = o.realHeight),
                      (r = ne)),
                    e || (e = r),
                    this.renderer.framebuffer.bind(o.framebuffer, r),
                    this.renderer.projection.update(r, e, i, !1),
                    this.renderer.mask.setMaskStack(o.maskStack);
                } else
                  (i = this.renderer.resolution),
                    r ||
                      ((ne.width = n.width), (ne.height = n.height), (r = ne)),
                    e || (e = r),
                    n.framebuffer.bind(null, r),
                    this.renderer.projection.update(r, e, i, !0),
                    this.renderer.mask.setMaskStack(this.defaultMaskStack);
                this.sourceFrame.copyFrom(e),
                  (this.destinationFrame.x = r.x / i),
                  (this.destinationFrame.y = r.y / i),
                  (this.destinationFrame.width = r.width / i),
                  (this.destinationFrame.height = r.height / i),
                  e === r && this.sourceFrame.copyFrom(this.destinationFrame);
              }),
              (e.prototype.clear = function(t) {
                (t = this.current
                  ? t || this.current.baseTexture.clearColor
                  : t || this.clearColor),
                  this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3]);
              }),
              (e.prototype.resize = function() {
                this.bind(null);
              }),
              (e.prototype.reset = function() {
                this.bind(null);
              }),
              e
            );
          })(b),
          se = function(t, e) {
            (this.program = t),
              (this.uniformData = e),
              (this.uniformGroups = {});
          };
        (exports.GLProgram = se),
          (se.prototype.destroy = function() {
            (this.uniformData = null),
              (this.uniformGroups = null),
              (this.program = null);
          });
        var ae = 0,
          he = (function(t) {
            function e(e) {
              t.call(this, e),
                this.systemCheck(),
                (this.gl = null),
                (this.shader = null),
                (this.program = null),
                (this.cache = {}),
                (this.id = ae++);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.systemCheck = function() {
                if (!Rt())
                  throw new Error(
                    "Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support."
                  );
              }),
              (e.prototype.contextChange = function(t) {
                (this.gl = t), this.reset();
              }),
              (e.prototype.bind = function(t, e) {
                t.uniforms.globals = this.renderer.globalUniforms;
                var r = t.program,
                  i =
                    r.glPrograms[this.renderer.CONTEXT_UID] ||
                    this.generateShader(t);
                return (
                  (this.shader = t),
                  this.program !== r &&
                    ((this.program = r), this.gl.useProgram(i.program)),
                  e || this.syncUniformGroup(t.uniformGroup),
                  i
                );
              }),
              (e.prototype.setUniforms = function(t) {
                var e = this.shader.program,
                  r = e.glPrograms[this.renderer.CONTEXT_UID];
                e.syncUniforms(r.uniformData, t, this.renderer);
              }),
              (e.prototype.syncUniformGroup = function(t) {
                var e = this.getglProgram();
                (t.static && t.dirtyId === e.uniformGroups[t.id]) ||
                  ((e.uniformGroups[t.id] = t.dirtyId),
                  this.syncUniforms(t, e));
              }),
              (e.prototype.syncUniforms = function(t, e) {
                (
                  t.syncUniforms[this.shader.program.id] ||
                  this.createSyncGroups(t)
                )(e.uniformData, t.uniforms, this.renderer);
              }),
              (e.prototype.createSyncGroups = function(t) {
                var e = this.getSignature(t, this.shader.program.uniformData);
                return (
                  this.cache[e] ||
                    (this.cache[e] = bt(t, this.shader.program.uniformData)),
                  (t.syncUniforms[this.shader.program.id] = this.cache[e]),
                  t.syncUniforms[this.shader.program.id]
                );
              }),
              (e.prototype.getSignature = function(t, e) {
                var r = t.uniforms,
                  i = [];
                for (var n in r) i.push(n), e[n] && i.push(e[n].type);
                return i.join("-");
              }),
              (e.prototype.getglProgram = function() {
                return this.shader
                  ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID]
                  : null;
              }),
              (e.prototype.generateShader = function(t) {
                var e = this.gl,
                  r = t.program,
                  i = {};
                for (var n in r.attributeData)
                  i[n] = r.attributeData[n].location;
                var o = st(e, r.vertexSrc, r.fragmentSrc, i),
                  s = {};
                for (var a in r.uniformData) {
                  var h = r.uniformData[a];
                  s[a] = {
                    location: e.getUniformLocation(o, a),
                    value: ht(h.type, h.size)
                  };
                }
                var u = new se(o, s);
                return (r.glPrograms[this.renderer.CONTEXT_UID] = u), u;
              }),
              (e.prototype.reset = function() {
                (this.program = null), (this.shader = null);
              }),
              (e.prototype.destroy = function() {
                this.destroyed = !0;
              }),
              e
            );
          })(b);
        function ue(t, e) {
          return (
            void 0 === e && (e = []),
            (e[r.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.ADD] = [t.ONE, t.ONE]),
            (e[r.BLEND_MODES.MULTIPLY] = [
              t.DST_COLOR,
              t.ONE_MINUS_SRC_ALPHA,
              t.ONE,
              t.ONE_MINUS_SRC_ALPHA
            ]),
            (e[r.BLEND_MODES.SCREEN] = [
              t.ONE,
              t.ONE_MINUS_SRC_COLOR,
              t.ONE,
              t.ONE_MINUS_SRC_ALPHA
            ]),
            (e[r.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.NONE] = [0, 0]),
            (e[r.BLEND_MODES.NORMAL_NPM] = [
              t.SRC_ALPHA,
              t.ONE_MINUS_SRC_ALPHA,
              t.ONE,
              t.ONE_MINUS_SRC_ALPHA
            ]),
            (e[r.BLEND_MODES.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE]),
            (e[r.BLEND_MODES.SCREEN_NPM] = [
              t.SRC_ALPHA,
              t.ONE_MINUS_SRC_COLOR,
              t.ONE,
              t.ONE_MINUS_SRC_ALPHA
            ]),
            (e[r.BLEND_MODES.SRC_IN] = [t.DST_ALPHA, t.ZERO]),
            (e[r.BLEND_MODES.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO]),
            (e[r.BLEND_MODES.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE]),
            (e[r.BLEND_MODES.DST_IN] = [t.ZERO, t.SRC_ALPHA]),
            (e[r.BLEND_MODES.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA]),
            (e[r.BLEND_MODES.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA]),
            (e[r.BLEND_MODES.XOR] = [
              t.ONE_MINUS_DST_ALPHA,
              t.ONE_MINUS_SRC_ALPHA
            ]),
            (e[r.BLEND_MODES.SUBTRACT] = [
              t.ONE,
              t.ONE,
              t.ONE,
              t.ONE,
              t.FUNC_REVERSE_SUBTRACT,
              t.FUNC_ADD
            ]),
            e
          );
        }
        var le = 0,
          ce = 1,
          de = 2,
          pe = 3,
          fe = 4,
          ve = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.gl = null),
                (this.stateId = 0),
                (this.polygonOffset = 0),
                (this.blendMode = r.BLEND_MODES.NONE),
                (this._blendEq = !1),
                (this.map = []),
                (this.map[le] = this.setBlend),
                (this.map[ce] = this.setOffset),
                (this.map[de] = this.setCullFace),
                (this.map[pe] = this.setDepthTest),
                (this.map[fe] = this.setFrontFace),
                (this.checks = []),
                (this.defaultState = new Xt()),
                (this.defaultState.blend = !0),
                (this.defaultState.depth = !0);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.contextChange = function(t) {
                (this.gl = t),
                  (this.blendModes = ue(t)),
                  this.set(this.defaultState),
                  this.reset();
              }),
              (e.prototype.set = function(t) {
                if (((t = t || this.defaultState), this.stateId !== t.data)) {
                  for (var e = this.stateId ^ t.data, r = 0; e; )
                    1 & e && this.map[r].call(this, !!(t.data & (1 << r))),
                      (e >>= 1),
                      r++;
                  this.stateId = t.data;
                }
                for (var i = 0; i < this.checks.length; i++)
                  this.checks[i](this, t);
              }),
              (e.prototype.forceState = function(t) {
                t = t || this.defaultState;
                for (var e = 0; e < this.map.length; e++)
                  this.map[e].call(this, !!(t.data & (1 << e)));
                for (var r = 0; r < this.checks.length; r++)
                  this.checks[r](this, t);
                this.stateId = t.data;
              }),
              (e.prototype.setBlend = function(t) {
                this.updateCheck(e.checkBlendMode, t),
                  this.gl[t ? "enable" : "disable"](this.gl.BLEND);
              }),
              (e.prototype.setOffset = function(t) {
                this.updateCheck(e.checkPolygonOffset, t),
                  this.gl[t ? "enable" : "disable"](
                    this.gl.POLYGON_OFFSET_FILL
                  );
              }),
              (e.prototype.setDepthTest = function(t) {
                this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
              }),
              (e.prototype.setCullFace = function(t) {
                this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
              }),
              (e.prototype.setFrontFace = function(t) {
                this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
              }),
              (e.prototype.setBlendMode = function(t) {
                if (t !== this.blendMode) {
                  this.blendMode = t;
                  var e = this.blendModes[t],
                    r = this.gl;
                  2 === e.length
                    ? r.blendFunc(e[0], e[1])
                    : r.blendFuncSeparate(e[0], e[1], e[2], e[3]),
                    6 === e.length
                      ? ((this._blendEq = !0),
                        r.blendEquationSeparate(e[4], e[5]))
                      : this._blendEq &&
                        ((this._blendEq = !1),
                        r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
                }
              }),
              (e.prototype.setPolygonOffset = function(t, e) {
                this.gl.polygonOffset(t, e);
              }),
              (e.prototype.reset = function() {
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
                  this.forceState(0),
                  (this._blendEq = !0),
                  (this.blendMode = -1),
                  this.setBlendMode(0);
              }),
              (e.prototype.updateCheck = function(t, e) {
                var r = this.checks.indexOf(t);
                e && -1 === r
                  ? this.checks.push(t)
                  : e || -1 === r || this.checks.splice(r, 1);
              }),
              (e.checkBlendMode = function(t, e) {
                t.setBlendMode(e.blendMode);
              }),
              (e.checkPolygonOffset = function(t, e) {
                t.setPolygonOffset(e.polygonOffset, 0);
              }),
              e
            );
          })(b),
          _e = (function(t) {
            function e(e) {
              t.call(this, e),
                (this.count = 0),
                (this.checkCount = 0),
                (this.maxIdle = i.settings.GC_MAX_IDLE),
                (this.checkCountMax = i.settings.GC_MAX_CHECK_COUNT),
                (this.mode = i.settings.GC_MODE);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.postrender = function() {
                this.renderer.renderingToScreen &&
                  (this.count++,
                  this.mode !== r.GC_MODES.MANUAL &&
                    (this.checkCount++,
                    this.checkCount > this.checkCountMax &&
                      ((this.checkCount = 0), this.run())));
              }),
              (e.prototype.run = function() {
                for (
                  var t = this.renderer.texture,
                    e = t.managedTextures,
                    r = !1,
                    i = 0;
                  i < e.length;
                  i++
                ) {
                  var n = e[i];
                  !n.framebuffer &&
                    this.count - n.touched > this.maxIdle &&
                    (t.destroyTexture(n, !0), (e[i] = null), (r = !0));
                }
                if (r) {
                  for (var o = 0, s = 0; s < e.length; s++)
                    null !== e[s] && (e[o++] = e[s]);
                  e.length = o;
                }
              }),
              (e.prototype.unload = function(t) {
                var e = this.renderer.textureSystem;
                t._texture &&
                  t._texture._glRenderTargets &&
                  e.destroyTexture(t._texture);
                for (var r = t.children.length - 1; r >= 0; r--)
                  this.unload(t.children[r]);
              }),
              e
            );
          })(b),
          ge = function(t) {
            (this.texture = t),
              (this.width = -1),
              (this.height = -1),
              (this.dirtyId = -1),
              (this.dirtyStyleId = -1),
              (this.mipmap = !1),
              (this.wrapMode = 33071),
              (this.type = 6408),
              (this.internalFormat = 5121);
          };
        exports.GLTexture = ge;
        var ye = (function(t) {
            function i(e) {
              t.call(this, e),
                (this.boundTextures = []),
                (this.currentLocation = -1),
                (this.managedTextures = []),
                (this._unknownBoundTextures = !1),
                (this.unknownTexture = new v());
            }
            return (
              t && (i.__proto__ = t),
              (i.prototype = Object.create(t && t.prototype)),
              (i.prototype.constructor = i),
              (i.prototype.contextChange = function() {
                var t = (this.gl = this.renderer.gl);
                (this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                  (this.webGLVersion = this.renderer.context.webGLVersion);
                var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                this.boundTextures.length = e;
                for (var r = 0; r < e; r++) this.boundTextures[r] = null;
                this.emptyTextures = {};
                var i = new ge(t.createTexture());
                t.bindTexture(t.TEXTURE_2D, i.texture),
                  t.texImage2D(
                    t.TEXTURE_2D,
                    0,
                    t.RGBA,
                    1,
                    1,
                    0,
                    t.RGBA,
                    t.UNSIGNED_BYTE,
                    new Uint8Array(4)
                  ),
                  (this.emptyTextures[t.TEXTURE_2D] = i),
                  (this.emptyTextures[t.TEXTURE_CUBE_MAP] = new ge(
                    t.createTexture()
                  )),
                  t.bindTexture(
                    t.TEXTURE_CUBE_MAP,
                    this.emptyTextures[t.TEXTURE_CUBE_MAP].texture
                  );
                for (var n = 0; n < 6; n++)
                  t.texImage2D(
                    t.TEXTURE_CUBE_MAP_POSITIVE_X + n,
                    0,
                    t.RGBA,
                    1,
                    1,
                    0,
                    t.RGBA,
                    t.UNSIGNED_BYTE,
                    null
                  );
                t.texParameteri(
                  t.TEXTURE_CUBE_MAP,
                  t.TEXTURE_MAG_FILTER,
                  t.LINEAR
                ),
                  t.texParameteri(
                    t.TEXTURE_CUBE_MAP,
                    t.TEXTURE_MIN_FILTER,
                    t.LINEAR
                  );
                for (var o = 0; o < this.boundTextures.length; o++)
                  this.bind(null, o);
              }),
              (i.prototype.bind = function(t, e) {
                void 0 === e && (e = 0);
                var r = this.gl;
                if (t) {
                  if ((t = t.baseTexture || t).valid) {
                    t.touched = this.renderer.textureGC.count;
                    var i =
                      t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                    this.boundTextures[e] !== t &&
                      (this.currentLocation !== e &&
                        ((this.currentLocation = e),
                        r.activeTexture(r.TEXTURE0 + e)),
                      r.bindTexture(t.target, i.texture)),
                      i.dirtyId !== t.dirtyId &&
                        (this.currentLocation !== e &&
                          ((this.currentLocation = e),
                          r.activeTexture(r.TEXTURE0 + e)),
                        this.updateTexture(t)),
                      (this.boundTextures[e] = t);
                  }
                } else
                  this.currentLocation !== e &&
                    ((this.currentLocation = e),
                    r.activeTexture(r.TEXTURE0 + e)),
                    r.bindTexture(
                      r.TEXTURE_2D,
                      this.emptyTextures[r.TEXTURE_2D].texture
                    ),
                    (this.boundTextures[e] = null);
              }),
              (i.prototype.reset = function() {
                (this._unknownBoundTextures = !0), (this.currentLocation = -1);
                for (var t = 0; t < this.boundTextures.length; t++)
                  this.boundTextures[t] = this.unknownTexture;
              }),
              (i.prototype.unbind = function(t) {
                var e = this.gl,
                  r = this.boundTextures;
                if (this._unknownBoundTextures) {
                  this._unknownBoundTextures = !1;
                  for (var i = 0; i < r.length; i++)
                    r[i] === this.unknownTexture && this.bind(null, i);
                }
                for (var n = 0; n < r.length; n++)
                  r[n] === t &&
                    (this.currentLocation !== n &&
                      (e.activeTexture(e.TEXTURE0 + n),
                      (this.currentLocation = n)),
                    e.bindTexture(
                      e.TEXTURE_2D,
                      this.emptyTextures[t.target].texture
                    ),
                    (r[n] = null));
              }),
              (i.prototype.initTexture = function(t) {
                var e = new ge(this.gl.createTexture());
                return (
                  (e.dirtyId = -1),
                  (t._glTextures[this.CONTEXT_UID] = e),
                  this.managedTextures.push(t),
                  t.on("dispose", this.destroyTexture, this),
                  e
                );
              }),
              (i.prototype.initTextureType = function(t, e) {
                if (
                  ((e.internalFormat = t.format),
                  (e.type = t.type),
                  2 === this.webGLVersion)
                ) {
                  var i = this.renderer.gl;
                  t.type === i.FLOAT &&
                    t.format === i.RGBA &&
                    (e.internalFormat = i.RGBA32F),
                    t.type === r.TYPES.HALF_FLOAT && (e.type = i.HALF_FLOAT),
                    e.type === i.HALF_FLOAT &&
                      t.format === i.RGBA &&
                      (e.internalFormat = i.RGBA16F);
                }
              }),
              (i.prototype.updateTexture = function(t) {
                var e = t._glTextures[this.CONTEXT_UID];
                if (e) {
                  var r = this.renderer;
                  if (
                    (this.initTextureType(t, e),
                    t.resource && t.resource.upload(r, t, e))
                  );
                  else {
                    var i = t.realWidth,
                      n = t.realHeight,
                      o = r.gl;
                    (e.width !== i || e.height !== n || e.dirtyId < 0) &&
                      ((e.width = i),
                      (e.height = n),
                      o.texImage2D(
                        t.target,
                        0,
                        e.internalFormat,
                        i,
                        n,
                        0,
                        t.format,
                        e.type,
                        null
                      ));
                  }
                  t.dirtyStyleId !== e.dirtyStyleId &&
                    this.updateTextureStyle(t),
                    (e.dirtyId = t.dirtyId);
                }
              }),
              (i.prototype.destroyTexture = function(t, r) {
                var i = this.gl;
                if (
                  (t = t.baseTexture || t)._glTextures[this.CONTEXT_UID] &&
                  (this.unbind(t),
                  i.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),
                  t.off("dispose", this.destroyTexture, this),
                  delete t._glTextures[this.CONTEXT_UID],
                  !r)
                ) {
                  var n = this.managedTextures.indexOf(t);
                  -1 !== n && (0, e.removeItems)(this.managedTextures, n, 1);
                }
              }),
              (i.prototype.updateTextureStyle = function(t) {
                var e = t._glTextures[this.CONTEXT_UID];
                e &&
                  ((t.mipmap !== r.MIPMAP_MODES.POW2 &&
                    2 === this.webGLVersion) ||
                  t.isPowerOfTwo
                    ? (e.mipmap = t.mipmap >= 1)
                    : (e.mipmap = 0),
                  2 === this.webGLVersion || t.isPowerOfTwo
                    ? (e.wrapMode = t.wrapMode)
                    : (e.wrapMode = r.WRAP_MODES.CLAMP),
                  (t.resource && t.resource.style(this.renderer, t, e)) ||
                    this.setStyle(t, e),
                  (e.dirtyStyleId = t.dirtyStyleId));
              }),
              (i.prototype.setStyle = function(t, e) {
                var i = this.gl;
                if (
                  (e.mipmap && i.generateMipmap(t.target),
                  i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode),
                  i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode),
                  e.mipmap)
                ) {
                  i.texParameteri(
                    t.target,
                    i.TEXTURE_MIN_FILTER,
                    t.scaleMode
                      ? i.LINEAR_MIPMAP_LINEAR
                      : i.NEAREST_MIPMAP_NEAREST
                  );
                  var n = this.renderer.context.extensions.anisotropicFiltering;
                  if (
                    n &&
                    t.anisotropicLevel > 0 &&
                    t.scaleMode === r.SCALE_MODES.LINEAR
                  ) {
                    var o = Math.min(
                      t.anisotropicLevel,
                      i.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                    );
                    i.texParameterf(t.target, n.TEXTURE_MAX_ANISOTROPY_EXT, o);
                  }
                } else
                  i.texParameteri(
                    t.target,
                    i.TEXTURE_MIN_FILTER,
                    t.scaleMode ? i.LINEAR : i.NEAREST
                  );
                i.texParameteri(
                  t.target,
                  i.TEXTURE_MAG_FILTER,
                  t.scaleMode ? i.LINEAR : i.NEAREST
                );
              }),
              i
            );
          })(b),
          me = {
            FilterSystem: Z,
            BatchSystem: $,
            ContextSystem: tt,
            FramebufferSystem: et,
            GeometrySystem: nt,
            MaskSystem: Jt,
            ScissorSystem: ee,
            StencilSystem: re,
            ProjectionSystem: ie,
            RenderTextureSystem: oe,
            ShaderSystem: he,
            StateSystem: ve,
            TextureGCSystem: _e,
            TextureSystem: ye
          };
        exports.systems = me;
        var xe = new o.Matrix(),
          Ee = (function(t) {
            function n(n, a) {
              t.call(this),
                (a = Object.assign({}, i.settings.RENDER_OPTIONS, a))
                  .roundPixels &&
                  ((i.settings.ROUND_PIXELS = a.roundPixels),
                  (0, e.deprecation)(
                    "5.0.0",
                    "Renderer roundPixels option is deprecated, please use PIXI.settings.ROUND_PIXELS",
                    2
                  )),
                (this.options = a),
                (this.type = r.RENDERER_TYPE.UNKNOWN),
                (this.screen = new o.Rectangle(0, 0, a.width, a.height)),
                (this.view = a.view || document.createElement("canvas")),
                (this.resolution = a.resolution || i.settings.RESOLUTION),
                (this.transparent = a.transparent),
                (this.autoDensity = a.autoDensity || a.autoResize || !1),
                (this.preserveDrawingBuffer = a.preserveDrawingBuffer),
                (this.clearBeforeRender = a.clearBeforeRender),
                (this._backgroundColor = 0),
                (this._backgroundColorRgba = [0, 0, 0, 0]),
                (this._backgroundColorString = "#000000"),
                (this.backgroundColor =
                  a.backgroundColor || this._backgroundColor),
                (this._tempDisplayObjectParent = new s.Container()),
                (this._lastObjectRendered = this._tempDisplayObjectParent),
                (this.plugins = {});
            }
            t && (n.__proto__ = t),
              (n.prototype = Object.create(t && t.prototype)),
              (n.prototype.constructor = n);
            var a = {
              width: { configurable: !0 },
              height: { configurable: !0 },
              backgroundColor: { configurable: !0 }
            };
            return (
              (n.prototype.initPlugins = function(t) {
                for (var e in t) this.plugins[e] = new t[e](this);
              }),
              (a.width.get = function() {
                return this.view.width;
              }),
              (a.height.get = function() {
                return this.view.height;
              }),
              (n.prototype.resize = function(t, e) {
                (this.screen.width = t),
                  (this.screen.height = e),
                  (this.view.width = t * this.resolution),
                  (this.view.height = e * this.resolution),
                  this.autoDensity &&
                    ((this.view.style.width = t + "px"),
                    (this.view.style.height = e + "px"));
              }),
              (n.prototype.generateTexture = function(t, e, r, i) {
                0 === (i = i || t.getLocalBounds()).width && (i.width = 1),
                  0 === i.height && (i.height = 1);
                var n = D.create(0 | i.width, 0 | i.height, e, r);
                return (
                  (xe.tx = -i.x),
                  (xe.ty = -i.y),
                  this.render(t, n, !1, xe, !!t.parent),
                  n
                );
              }),
              (n.prototype.destroy = function(t) {
                for (var e in this.plugins)
                  this.plugins[e].destroy(), (this.plugins[e] = null);
                t &&
                  this.view.parentNode &&
                  this.view.parentNode.removeChild(this.view),
                  (this.plugins = null),
                  (this.type = r.RENDERER_TYPE.UNKNOWN),
                  (this.view = null),
                  (this.screen = null),
                  (this.resolution = 0),
                  (this.transparent = !1),
                  (this.autoDensity = !1),
                  (this.blendModes = null),
                  (this.options = null),
                  (this.preserveDrawingBuffer = !1),
                  (this.clearBeforeRender = !1),
                  (this._backgroundColor = 0),
                  (this._backgroundColorRgba = null),
                  (this._backgroundColorString = null),
                  (this._tempDisplayObjectParent = null),
                  (this._lastObjectRendered = null);
              }),
              (a.backgroundColor.get = function() {
                return this._backgroundColor;
              }),
              (a.backgroundColor.set = function(t) {
                (this._backgroundColor = t),
                  (this._backgroundColorString = (0, e.hex2string)(t)),
                  (0, e.hex2rgb)(t, this._backgroundColorRgba);
              }),
              Object.defineProperties(n.prototype, a),
              n
            );
          })(e.EventEmitter);
        exports.AbstractRenderer = Ee;
        var Te = (function(i) {
          function n(s) {
            void 0 === s && (s = {}),
              i.call(this, "WebGL", s),
              (s = this.options),
              (this.type = r.RENDERER_TYPE.WEBGL),
              (this.gl = null),
              (this.CONTEXT_UID = 0),
              (this.runners = {
                destroy: new t.Runner("destroy"),
                contextChange: new t.Runner("contextChange", 1),
                reset: new t.Runner("reset"),
                update: new t.Runner("update"),
                postrender: new t.Runner("postrender"),
                prerender: new t.Runner("prerender"),
                resize: new t.Runner("resize", 2)
              }),
              (this.globalUniforms = new K(
                { projectionMatrix: new o.Matrix() },
                !0
              )),
              this.addSystem(Jt, "mask")
                .addSystem(tt, "context")
                .addSystem(ve, "state")
                .addSystem(he, "shader")
                .addSystem(ye, "texture")
                .addSystem(nt, "geometry")
                .addSystem(et, "framebuffer")
                .addSystem(ee, "scissor")
                .addSystem(re, "stencil")
                .addSystem(ie, "projection")
                .addSystem(_e, "textureGC")
                .addSystem(Z, "filter")
                .addSystem(oe, "renderTexture")
                .addSystem($, "batch"),
              this.initPlugins(n.__plugins),
              s.context
                ? this.context.initFromContext(s.context)
                : this.context.initFromOptions({
                    alpha: this.transparent,
                    antialias: s.antialias,
                    premultipliedAlpha:
                      this.transparent && "notMultiplied" !== this.transparent,
                    stencil: !0,
                    preserveDrawingBuffer: s.preserveDrawingBuffer,
                    powerPreference: this.options.powerPreference
                  }),
              (this.renderingToScreen = !0),
              (0, e.sayHello)(
                2 === this.context.webGLVersion ? "WebGL 2" : "WebGL 1"
              ),
              this.resize(this.options.width, this.options.height);
          }
          return (
            i && (n.__proto__ = i),
            (n.prototype = Object.create(i && i.prototype)),
            (n.prototype.constructor = n),
            (n.create = function(t) {
              if ((0, e.isWebGLSupported)()) return new n(t);
              throw new Error(
                'WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.'
              );
            }),
            (n.prototype.addSystem = function(t, e) {
              e || (e = t.name);
              var r = new t(this);
              if (this[e])
                throw new Error(
                  'Whoops! The name "' + e + '" is already in use'
                );
              for (var i in ((this[e] = r), this.runners))
                this.runners[i].add(r);
              return this;
            }),
            (n.prototype.render = function(t, e, r, i, n) {
              if (
                ((this.renderingToScreen = !e),
                this.runners.prerender.run(),
                this.emit("prerender"),
                (this.projection.transform = i),
                !this.context.isLost)
              ) {
                if ((e || (this._lastObjectRendered = t), !n)) {
                  var o = t.parent;
                  (t.parent = this._tempDisplayObjectParent),
                    t.updateTransform(),
                    (t.parent = o);
                }
                this.renderTexture.bind(e),
                  this.batch.currentRenderer.start(),
                  (void 0 !== r ? r : this.clearBeforeRender) &&
                    this.renderTexture.clear(),
                  t.render(this),
                  this.batch.currentRenderer.flush(),
                  e && e.baseTexture.update(),
                  this.runners.postrender.run(),
                  (this.projection.transform = null),
                  this.emit("postrender");
              }
            }),
            (n.prototype.resize = function(t, e) {
              i.prototype.resize.call(this, t, e),
                this.runners.resize.run(t, e);
            }),
            (n.prototype.reset = function() {
              return this.runners.reset.run(), this;
            }),
            (n.prototype.clear = function() {
              this.framebuffer.bind(), this.framebuffer.clear();
            }),
            (n.prototype.destroy = function(t) {
              for (var e in (this.runners.destroy.run(), this.runners))
                this.runners[e].destroy();
              i.prototype.destroy.call(this, t), (this.gl = null);
            }),
            (n.registerPlugin = function(t, e) {
              (n.__plugins = n.__plugins || {}), (n.__plugins[t] = e);
            }),
            n
          );
        })(Ee);
        function be(t) {
          return Te.create(t);
        }
        exports.Renderer = Te;
        var Se =
          "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
        exports.defaultVertex = Se;
        var we =
          "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";
        exports.defaultFilterVertex = we;
        var Ae = (function(t) {
          function e() {
            t.apply(this, arguments);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.from = function(t, r) {
              return new e(new y(t, r));
            }),
            e
          );
        })(v);
        exports.CubeTexture = Ae;
        var Ce = function() {
          (this.texArray = null),
            (this.blend = 0),
            (this.type = r.DRAW_MODES.TRIANGLES),
            (this.start = 0),
            (this.size = 0),
            (this.data = null);
        };
        exports.BatchDrawCall = Ce;
        var Re = function() {
          (this.elements = []), (this.ids = []), (this.count = 0);
        };
        (exports.BatchTextureArray = Re),
          (Re.prototype.clear = function() {
            for (var t = 0; t < this.count; t++) this.elements[t] = null;
            this.count = 0;
          });
        var Ie = function(t) {
          (this.rawBinaryData = new ArrayBuffer(t)),
            (this.uint32View = new Uint32Array(this.rawBinaryData)),
            (this.float32View = new Float32Array(this.rawBinaryData));
        };
        exports.ViewableBuffer = Ie;
        var Oe = {
          int8View: { configurable: !0 },
          uint8View: { configurable: !0 },
          int16View: { configurable: !0 },
          uint16View: { configurable: !0 },
          int32View: { configurable: !0 }
        };
        (Oe.int8View.get = function() {
          return (
            this._int8View ||
              (this._int8View = new Int8Array(this.rawBinaryData)),
            this._int8View
          );
        }),
          (Oe.uint8View.get = function() {
            return (
              this._uint8View ||
                (this._uint8View = new Uint8Array(this.rawBinaryData)),
              this._uint8View
            );
          }),
          (Oe.int16View.get = function() {
            return (
              this._int16View ||
                (this._int16View = new Int16Array(this.rawBinaryData)),
              this._int16View
            );
          }),
          (Oe.uint16View.get = function() {
            return (
              this._uint16View ||
                (this._uint16View = new Uint16Array(this.rawBinaryData)),
              this._uint16View
            );
          }),
          (Oe.int32View.get = function() {
            return (
              this._int32View ||
                (this._int32View = new Int32Array(this.rawBinaryData)),
              this._int32View
            );
          }),
          (Ie.prototype.view = function(t) {
            return this[t + "View"];
          }),
          (Ie.prototype.destroy = function() {
            (this.rawBinaryData = null),
              (this._int8View = null),
              (this._uint8View = null),
              (this._int16View = null),
              (this._uint16View = null),
              (this._int32View = null),
              (this.uint32View = null),
              (this.float32View = null);
          }),
          (Ie.sizeOf = function(t) {
            switch (t) {
              case "int8":
              case "uint8":
                return 1;
              case "int16":
              case "uint16":
                return 2;
              case "int32":
              case "uint32":
              case "float32":
                return 4;
              default:
                throw new Error(t + " isn't a valid view type");
            }
          }),
          Object.defineProperties(Ie.prototype, Oe);
        var Pe = (function(t) {
          function n(e) {
            t.call(this, e),
              (this.shaderGenerator = null),
              (this.geometryClass = null),
              (this.vertexSize = null),
              (this.state = Xt.for2d()),
              (this.size = 4 * i.settings.SPRITE_BATCH_SIZE),
              (this._vertexCount = 0),
              (this._indexCount = 0),
              (this._bufferedElements = []),
              (this._bufferedTextures = []),
              (this._bufferSize = 0),
              (this._shader = null),
              (this._packedGeometries = []),
              (this._packedGeometryPoolSize = 2),
              (this._flushId = 0),
              (this._aBuffers = {}),
              (this._iBuffers = {}),
              (this.MAX_TEXTURES = 1),
              this.renderer.on("prerender", this.onPrerender, this),
              e.runners.contextChange.add(this),
              (this._dcIndex = 0),
              (this._aIndex = 0),
              (this._iIndex = 0),
              (this._attributeBuffer = null),
              (this._indexBuffer = null),
              (this._tempBoundTextures = []);
          }
          return (
            t && (n.__proto__ = t),
            (n.prototype = Object.create(t && t.prototype)),
            (n.prototype.constructor = n),
            (n.prototype.contextChange = function() {
              var t = this.renderer.gl;
              i.settings.PREFER_ENV === r.ENV.WEBGL_LEGACY
                ? (this.MAX_TEXTURES = 1)
                : ((this.MAX_TEXTURES = Math.min(
                    t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
                    i.settings.SPRITE_MAX_TEXTURES
                  )),
                  (this.MAX_TEXTURES = At(this.MAX_TEXTURES, t))),
                (this._shader = this.shaderGenerator.generateShader(
                  this.MAX_TEXTURES
                ));
              for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] = new this.geometryClass();
              this.initFlushBuffers();
            }),
            (n.prototype.initFlushBuffers = function() {
              for (
                var t = n._drawCallPool,
                  e = n._textureArrayPool,
                  r = this.size / 4,
                  i = Math.floor(r / this.MAX_TEXTURES) + 1;
                t.length < r;

              )
                t.push(new Ce());
              for (; e.length < i; ) e.push(new Re());
              for (var o = 0; o < this.MAX_TEXTURES; o++)
                this._tempBoundTextures[o] = null;
            }),
            (n.prototype.onPrerender = function() {
              this._flushId = 0;
            }),
            (n.prototype.render = function(t) {
              t._texture.valid &&
                (this._vertexCount + t.vertexData.length / 2 > this.size &&
                  this.flush(),
                (this._vertexCount += t.vertexData.length / 2),
                (this._indexCount += t.indices.length),
                (this._bufferedTextures[this._bufferSize] =
                  t._texture.baseTexture),
                (this._bufferedElements[this._bufferSize++] = t));
            }),
            (n.prototype.buildTexturesAndDrawCalls = function() {
              var t = this._bufferedTextures,
                e = this.MAX_TEXTURES,
                r = n._textureArrayPool,
                i = this.renderer.batch,
                o = this._tempBoundTextures,
                s = this.renderer.textureGC.count,
                a = ++v._globalBatch,
                h = 0,
                u = r[0],
                l = 0;
              i.copyBoundTextures(o, e);
              for (var c = 0; c < this._bufferSize; ++c) {
                var d = t[c];
                (t[c] = null),
                  d._batchEnabled !== a &&
                    (u.count >= e &&
                      (i.boundArray(u, o, a, e),
                      this.buildDrawCalls(u, l, c),
                      (l = c),
                      (u = r[++h]),
                      ++a),
                    (d._batchEnabled = a),
                    (d.touched = s),
                    (u.elements[u.count++] = d));
              }
              u.count > 0 &&
                (i.boundArray(u, o, a, e),
                this.buildDrawCalls(u, l, this._bufferSize),
                ++h,
                ++a);
              for (var p = 0; p < o.length; p++) o[p] = null;
              v._globalBatch = a;
            }),
            (n.prototype.buildDrawCalls = function(t, r, i) {
              var o = this._bufferedElements,
                s = this._attributeBuffer,
                a = this._indexBuffer,
                h = this.vertexSize,
                u = n._drawCallPool,
                l = this._dcIndex,
                c = this._aIndex,
                d = this._iIndex,
                p = u[l];
              (p.start = this._iIndex), (p.texArray = t);
              for (var f = r; f < i; ++f) {
                var v = o[f],
                  _ = v._texture.baseTexture,
                  g = e.premultiplyBlendMode[_.alphaMode ? 1 : 0][v.blendMode];
                (o[f] = null),
                  r < f &&
                    p.blend !== g &&
                    ((p.size = d - p.start),
                    (r = f),
                    ((p = u[++l]).texArray = t),
                    (p.start = d)),
                  this.packInterleavedGeometry(v, s, a, c, d),
                  (c += (v.vertexData.length / 2) * h),
                  (d += v.indices.length),
                  (p.blend = g);
              }
              r < i && ((p.size = d - p.start), ++l),
                (this._dcIndex = l),
                (this._aIndex = c),
                (this._iIndex = d);
            }),
            (n.prototype.bindAndClearTexArray = function(t) {
              for (var e = this.renderer.texture, r = 0; r < t.count; r++)
                e.bind(t.elements[r], t.ids[r]), (t.elements[r] = null);
              t.count = 0;
            }),
            (n.prototype.updateGeometry = function() {
              var t = this._packedGeometries,
                e = this._attributeBuffer,
                r = this._indexBuffer;
              i.settings.CAN_UPLOAD_SAME_BUFFER
                ? (t[this._flushId]._buffer.update(e.rawBinaryData),
                  t[this._flushId]._indexBuffer.update(r),
                  this.renderer.geometry.updateBuffers())
                : (this._packedGeometryPoolSize <= this._flushId &&
                    (this._packedGeometryPoolSize++,
                    (t[this._flushId] = new this.geometryClass())),
                  t[this._flushId]._buffer.update(e.rawBinaryData),
                  t[this._flushId]._indexBuffer.update(r),
                  this.renderer.geometry.bind(t[this._flushId]),
                  this.renderer.geometry.updateBuffers(),
                  this._flushId++);
            }),
            (n.prototype.drawBatches = function() {
              for (
                var t = this._dcIndex,
                  e = this.renderer,
                  r = e.gl,
                  i = e.state,
                  o = n._drawCallPool,
                  s = null,
                  a = 0;
                a < t;
                a++
              ) {
                var h = o[a],
                  u = h.texArray,
                  l = h.type,
                  c = h.size,
                  d = h.start,
                  p = h.blend;
                s !== u && ((s = u), this.bindAndClearTexArray(u)),
                  i.setBlendMode(p),
                  r.drawElements(l, c, r.UNSIGNED_SHORT, 2 * d);
              }
            }),
            (n.prototype.flush = function() {
              0 !== this._vertexCount &&
                ((this._attributeBuffer = this.getAttributeBuffer(
                  this._vertexCount
                )),
                (this._indexBuffer = this.getIndexBuffer(this._indexCount)),
                (this._aIndex = 0),
                (this._iIndex = 0),
                (this._dcIndex = 0),
                this.buildTexturesAndDrawCalls(),
                this.updateGeometry(),
                this.drawBatches(),
                (this._bufferSize = 0),
                (this._vertexCount = 0),
                (this._indexCount = 0));
            }),
            (n.prototype.start = function() {
              this.renderer.state.set(this.state),
                this.renderer.shader.bind(this._shader),
                i.settings.CAN_UPLOAD_SAME_BUFFER &&
                  this.renderer.geometry.bind(
                    this._packedGeometries[this._flushId]
                  );
            }),
            (n.prototype.stop = function() {
              this.flush();
            }),
            (n.prototype.destroy = function() {
              for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] &&
                  this._packedGeometries[e].destroy();
              this.renderer.off("prerender", this.onPrerender, this),
                (this._aBuffers = null),
                (this._iBuffers = null),
                (this._packedGeometries = null),
                (this._attributeBuffer = null),
                (this._indexBuffer = null),
                this._shader && (this._shader.destroy(), (this._shader = null)),
                t.prototype.destroy.call(this);
            }),
            (n.prototype.getAttributeBuffer = function(t) {
              var r = (0, e.nextPow2)(Math.ceil(t / 8)),
                i = (0, e.log2)(r),
                n = 8 * r;
              this._aBuffers.length <= i && (this._iBuffers.length = i + 1);
              var o = this._aBuffers[n];
              return (
                o || (this._aBuffers[n] = o = new Ie(n * this.vertexSize * 4)),
                o
              );
            }),
            (n.prototype.getIndexBuffer = function(t) {
              var r = (0, e.nextPow2)(Math.ceil(t / 12)),
                i = (0, e.log2)(r),
                n = 12 * r;
              this._iBuffers.length <= i && (this._iBuffers.length = i + 1);
              var o = this._iBuffers[i];
              return o || (this._iBuffers[i] = o = new Uint16Array(n)), o;
            }),
            (n.prototype.packInterleavedGeometry = function(t, r, i, n, o) {
              for (
                var s = r.uint32View,
                  a = r.float32View,
                  h = n / this.vertexSize,
                  u = t.uvs,
                  l = t.indices,
                  c = t.vertexData,
                  d = t._texture.baseTexture._batchLocation,
                  p = Math.min(t.worldAlpha, 1),
                  f =
                    p < 1 && t._texture.baseTexture.alphaMode
                      ? (0, e.premultiplyTint)(t._tintRGB, p)
                      : t._tintRGB + ((255 * p) << 24),
                  v = 0;
                v < c.length;
                v += 2
              )
                (a[n++] = c[v]),
                  (a[n++] = c[v + 1]),
                  (a[n++] = u[v]),
                  (a[n++] = u[v + 1]),
                  (s[n++] = f),
                  (a[n++] = d);
              for (var _ = 0; _ < l.length; _++) i[o++] = h + l[_];
            }),
            n
          );
        })(Q);
        (exports.AbstractBatchRenderer = Pe),
          (Pe._drawCallPool = []),
          (Pe._textureArrayPool = []);
        var Me = function(t, e) {
          if (
            ((this.vertexSrc = t),
            (this.fragTemplate = e),
            (this.programCache = {}),
            (this.defaultGroupCache = {}),
            e.indexOf("%count%") < 0)
          )
            throw new Error('Fragment template must contain "%count%".');
          if (e.indexOf("%forloop%") < 0)
            throw new Error('Fragment template must contain "%forloop%".');
        };
        (exports.BatchShaderGenerator = Me),
          (Me.prototype.generateShader = function(t) {
            if (!this.programCache[t]) {
              for (var e = new Int32Array(t), r = 0; r < t; r++) e[r] = r;
              this.defaultGroupCache[t] = K.from({ uSamplers: e }, !0);
              var i = this.fragTemplate;
              (i = (i = i.replace(/%count%/gi, "" + t)).replace(
                /%forloop%/gi,
                this.generateSampleSrc(t)
              )),
                (this.programCache[t] = new Dt(this.vertexSrc, i));
            }
            var n = {
              tint: new Float32Array([1, 1, 1, 1]),
              translationMatrix: new o.Matrix(),
              default: this.defaultGroupCache[t]
            };
            return new Nt(this.programCache[t], n);
          }),
          (Me.prototype.generateSampleSrc = function(t) {
            var e = "";
            (e += "\n"), (e += "\n");
            for (var r = 0; r < t; r++)
              r > 0 && (e += "\nelse "),
                r < t - 1 && (e += "if(vTextureId < " + r + ".5)"),
                (e += "\n{"),
                (e +=
                  "\n\tcolor = texture2D(uSamplers[" +
                  r +
                  "], vTextureCoord);"),
                (e += "\n}");
            return (e += "\n"), (e += "\n");
          });
        var De = (function(t) {
          function e(e) {
            void 0 === e && (e = !1),
              t.call(this),
              (this._buffer = new B(null, e, !1)),
              (this._indexBuffer = new B(null, e, !0)),
              this.addAttribute(
                "aVertexPosition",
                this._buffer,
                2,
                !1,
                r.TYPES.FLOAT
              )
                .addAttribute(
                  "aTextureCoord",
                  this._buffer,
                  2,
                  !1,
                  r.TYPES.FLOAT
                )
                .addAttribute(
                  "aColor",
                  this._buffer,
                  4,
                  !0,
                  r.TYPES.UNSIGNED_BYTE
                )
                .addAttribute("aTextureId", this._buffer, 1, !0, r.TYPES.FLOAT)
                .addIndex(this._indexBuffer);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            e
          );
        })(H);
        exports.BatchGeometry = De;
        var Fe =
            "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n",
          Ne =
            "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n",
          Ue = function() {};
        exports.BatchPluginFactory = Ue;
        var Be = {
          defaultVertexSrc: { configurable: !0 },
          defaultFragmentTemplate: { configurable: !0 }
        };
        (Ue.create = function(t) {
          var e = Object.assign(
              { vertex: Fe, fragment: Ne, geometryClass: De, vertexSize: 6 },
              t
            ),
            r = e.vertex,
            i = e.fragment,
            n = e.vertexSize,
            o = e.geometryClass;
          return (function(t) {
            function e(e) {
              t.call(this, e),
                (this.shaderGenerator = new Me(r, i)),
                (this.geometryClass = o),
                (this.vertexSize = n);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              e
            );
          })(Pe);
        }),
          (Be.defaultVertexSrc.get = function() {
            return Fe;
          }),
          (Be.defaultFragmentTemplate.get = function() {
            return Ne;
          }),
          Object.defineProperties(Ue, Be);
        var Le = Ue.create();
        exports.BatchRenderer = Le;
      },
      {
        "@pixi/runner": "QNVA",
        "@pixi/utils": "G5Tu",
        "@pixi/constants": "LQBK",
        "@pixi/settings": "t4Uo",
        "@pixi/ticker": "F3Q6",
        "@pixi/math": "oNQC",
        "@pixi/display": "nL3p"
      }
    ],
    rWhx: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Extract = void 0);
        var e = require("@pixi/core"),
          r = require("@pixi/utils"),
          t = require("@pixi/math"),
          n = new t.Rectangle(),
          a = 4,
          i = function(e) {
            (this.renderer = e), (e.extract = this);
          };
        (exports.Extract = i),
          (i.prototype.image = function(e, r, t) {
            var n = new Image();
            return (n.src = this.base64(e, r, t)), n;
          }),
          (i.prototype.base64 = function(e, r, t) {
            return this.canvas(e).toDataURL(r, t);
          }),
          (i.prototype.canvas = function(t) {
            var o,
              s,
              d,
              h = this.renderer,
              u = !1,
              x = !1;
            t &&
              (t instanceof e.RenderTexture
                ? (d = t)
                : ((d = this.renderer.generateTexture(t)), (x = !0))),
              d
                ? ((o = d.baseTexture.resolution),
                  (s = d.frame),
                  (u = !1),
                  h.renderTexture.bind(d))
                : ((o = this.renderer.resolution),
                  (u = !0),
                  ((s = n).width = this.renderer.width),
                  (s.height = this.renderer.height),
                  h.renderTexture.bind(null));
            var c = Math.floor(s.width * o + 1e-4),
              l = Math.floor(s.height * o + 1e-4),
              g = new r.CanvasRenderTarget(c, l, 1),
              p = new Uint8Array(a * c * l),
              v = h.gl;
            v.readPixels(s.x * o, s.y * o, c, l, v.RGBA, v.UNSIGNED_BYTE, p);
            var y = g.context.getImageData(0, 0, c, l);
            return (
              i.arrayPostDivide(p, y.data),
              g.context.putImageData(y, 0, 0),
              u &&
                (g.context.scale(1, -1), g.context.drawImage(g.canvas, 0, -l)),
              x && d.destroy(!0),
              g.canvas
            );
          }),
          (i.prototype.pixels = function(r) {
            var t,
              o,
              s,
              d = this.renderer,
              h = !1;
            r &&
              (r instanceof e.RenderTexture
                ? (s = r)
                : ((s = this.renderer.generateTexture(r)), (h = !0))),
              s
                ? ((t = s.baseTexture.resolution),
                  (o = s.frame),
                  d.renderTexture.bind(s))
                : ((t = d.resolution),
                  ((o = n).width = d.width),
                  (o.height = d.height),
                  d.renderTexture.bind(null));
            var u = o.width * t,
              x = o.height * t,
              c = new Uint8Array(a * u * x),
              l = d.gl;
            return (
              l.readPixels(o.x * t, o.y * t, u, x, l.RGBA, l.UNSIGNED_BYTE, c),
              h && s.destroy(!0),
              i.arrayPostDivide(c, c),
              c
            );
          }),
          (i.prototype.destroy = function() {
            (this.renderer.extract = null), (this.renderer = null);
          }),
          (i.arrayPostDivide = function(e, r) {
            for (var t = 0; t < e.length; t += 4) {
              var n = (r[t + 3] = e[t + 3]);
              0 !== n
                ? ((r[t] = Math.round(Math.min((255 * e[t]) / n, 255))),
                  (r[t + 1] = Math.round(Math.min((255 * e[t + 1]) / n, 255))),
                  (r[t + 2] = Math.round(Math.min((255 * e[t + 2]) / n, 255))))
                : ((r[t] = e[t]), (r[t + 1] = e[t + 1]), (r[t + 2] = e[t + 2]));
            }
          });
      },
      { "@pixi/core": "p2j5", "@pixi/utils": "G5Tu", "@pixi/math": "oNQC" }
    ],
    Jbe7: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.interactiveTarget = exports.InteractionTrackingData = exports.InteractionManager = exports.InteractionEvent = exports.InteractionData = void 0);
        var t = require("@pixi/math"),
          e = require("@pixi/ticker"),
          i = require("@pixi/display"),
          n = require("@pixi/utils"),
          o = function() {
            (this.global = new t.Point()),
              (this.target = null),
              (this.originalEvent = null),
              (this.identifier = null),
              (this.isPrimary = !1),
              (this.button = 0),
              (this.buttons = 0),
              (this.width = 0),
              (this.height = 0),
              (this.tiltX = 0),
              (this.tiltY = 0),
              (this.pointerType = null),
              (this.pressure = 0),
              (this.rotationAngle = 0),
              (this.twist = 0),
              (this.tangentialPressure = 0);
          };
        exports.InteractionData = o;
        var r = { pointerId: { configurable: !0 } };
        (r.pointerId.get = function() {
          return this.identifier;
        }),
          (o.prototype.getLocalPosition = function(t, e, i) {
            return t.worldTransform.applyInverse(i || this.global, e);
          }),
          (o.prototype.copyEvent = function(t) {
            t.isPrimary && (this.isPrimary = !0),
              (this.button = t.button),
              (this.buttons = Number.isInteger(t.buttons)
                ? t.buttons
                : t.which),
              (this.width = t.width),
              (this.height = t.height),
              (this.tiltX = t.tiltX),
              (this.tiltY = t.tiltY),
              (this.pointerType = t.pointerType),
              (this.pressure = t.pressure),
              (this.rotationAngle = t.rotationAngle),
              (this.twist = t.twist || 0),
              (this.tangentialPressure = t.tangentialPressure || 0);
          }),
          (o.prototype.reset = function() {
            this.isPrimary = !1;
          }),
          Object.defineProperties(o.prototype, r);
        var s = function() {
          (this.stopped = !1),
            (this.stopsPropagatingAt = null),
            (this.stopPropagationHint = !1),
            (this.target = null),
            (this.currentTarget = null),
            (this.type = null),
            (this.data = null);
        };
        (exports.InteractionEvent = s),
          (s.prototype.stopPropagation = function() {
            (this.stopped = !0),
              (this.stopPropagationHint = !0),
              (this.stopsPropagatingAt = this.currentTarget);
          }),
          (s.prototype.reset = function() {
            (this.stopped = !1),
              (this.stopsPropagatingAt = null),
              (this.stopPropagationHint = !1),
              (this.currentTarget = null),
              (this.target = null);
          });
        var a = function t(e) {
          (this._pointerId = e), (this._flags = t.FLAGS.NONE);
        };
        exports.InteractionTrackingData = a;
        var h = {
          pointerId: { configurable: !0 },
          flags: { configurable: !0 },
          none: { configurable: !0 },
          over: { configurable: !0 },
          rightDown: { configurable: !0 },
          leftDown: { configurable: !0 }
        };
        (a.prototype._doSet = function(t, e) {
          this._flags = e ? this._flags | t : this._flags & ~t;
        }),
          (h.pointerId.get = function() {
            return this._pointerId;
          }),
          (h.flags.get = function() {
            return this._flags;
          }),
          (h.flags.set = function(t) {
            this._flags = t;
          }),
          (h.none.get = function() {
            return this._flags === this.constructor.FLAGS.NONE;
          }),
          (h.over.get = function() {
            return 0 != (this._flags & this.constructor.FLAGS.OVER);
          }),
          (h.over.set = function(t) {
            this._doSet(this.constructor.FLAGS.OVER, t);
          }),
          (h.rightDown.get = function() {
            return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN);
          }),
          (h.rightDown.set = function(t) {
            this._doSet(this.constructor.FLAGS.RIGHT_DOWN, t);
          }),
          (h.leftDown.get = function() {
            return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN);
          }),
          (h.leftDown.set = function(t) {
            this._doSet(this.constructor.FLAGS.LEFT_DOWN, t);
          }),
          Object.defineProperties(a.prototype, h),
          (a.FLAGS = Object.freeze({
            NONE: 0,
            OVER: 1,
            LEFT_DOWN: 2,
            RIGHT_DOWN: 4
          }));
        var c = function() {
          this._tempPoint = new t.Point();
        };
        (c.prototype.recursiveFindHit = function(t, e, i, n, o) {
          if (!e || !e.visible) return !1;
          var r = t.data.global,
            s = !1,
            a = (o = e.interactive || o),
            h = !0;
          if (
            (e.hitArea
              ? (n &&
                  (e.worldTransform.applyInverse(r, this._tempPoint),
                  e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)
                    ? (s = !0)
                    : ((n = !1), (h = !1))),
                (a = !1))
              : e._mask &&
                n &&
                ((e._mask.containsPoint && e._mask.containsPoint(r)) ||
                  (n = !1)),
            h && e.interactiveChildren && e.children)
          )
            for (var c = e.children, p = c.length - 1; p >= 0; p--) {
              var u = c[p],
                l = this.recursiveFindHit(t, u, i, n, a);
              if (l) {
                if (!u.parent) continue;
                (a = !1), l && (t.target && (n = !1), (s = !0));
              }
            }
          return (
            o &&
              (n &&
                !t.target &&
                !e.hitArea &&
                e.containsPoint &&
                e.containsPoint(r) &&
                (s = !0),
              e.interactive &&
                (s && !t.target && (t.target = e), i && i(t, e, !!s))),
            s
          );
        }),
          (c.prototype.findHit = function(t, e, i, n) {
            this.recursiveFindHit(t, e, i, n, !1);
          });
        var p = {
          interactive: !1,
          interactiveChildren: !0,
          hitArea: null,
          get buttonMode() {
            return "pointer" === this.cursor;
          },
          set buttonMode(t) {
            t
              ? (this.cursor = "pointer")
              : "pointer" === this.cursor && (this.cursor = null);
          },
          cursor: null,
          get trackedPointers() {
            return (
              void 0 === this._trackedPointers && (this._trackedPointers = {}),
              this._trackedPointers
            );
          },
          _trackedPointers: void 0
        };
        (exports.interactiveTarget = p), i.DisplayObject.mixin(p);
        var u = 1,
          l = { target: null, data: { global: null } },
          v = (function(t) {
            function i(e, i) {
              t.call(this),
                (i = i || {}),
                (this.renderer = e),
                (this.autoPreventDefault =
                  void 0 === i.autoPreventDefault || i.autoPreventDefault),
                (this.interactionFrequency = i.interactionFrequency || 10),
                (this.mouse = new o()),
                (this.mouse.identifier = u),
                this.mouse.global.set(-999999),
                (this.activeInteractionData = {}),
                (this.activeInteractionData[u] = this.mouse),
                (this.interactionDataPool = []),
                (this.eventData = new s()),
                (this.interactionDOMElement = null),
                (this.moveWhenInside = !1),
                (this.eventsAdded = !1),
                (this.mouseOverRenderer = !1),
                (this.supportsTouchEvents = "ontouchstart" in window),
                (this.supportsPointerEvents = !!window.PointerEvent),
                (this.onPointerUp = this.onPointerUp.bind(this)),
                (this.processPointerUp = this.processPointerUp.bind(this)),
                (this.onPointerCancel = this.onPointerCancel.bind(this)),
                (this.processPointerCancel = this.processPointerCancel.bind(
                  this
                )),
                (this.onPointerDown = this.onPointerDown.bind(this)),
                (this.processPointerDown = this.processPointerDown.bind(this)),
                (this.onPointerMove = this.onPointerMove.bind(this)),
                (this.processPointerMove = this.processPointerMove.bind(this)),
                (this.onPointerOut = this.onPointerOut.bind(this)),
                (this.processPointerOverOut = this.processPointerOverOut.bind(
                  this
                )),
                (this.onPointerOver = this.onPointerOver.bind(this)),
                (this.cursorStyles = {
                  default: "inherit",
                  pointer: "pointer"
                }),
                (this.currentCursorMode = null),
                (this.cursor = null),
                (this.resolution = 1),
                (this.delayedEvents = []),
                (this.search = new c()),
                this.setTargetElement(
                  this.renderer.view,
                  this.renderer.resolution
                );
            }
            return (
              t && (i.__proto__ = t),
              (i.prototype = Object.create(t && t.prototype)),
              (i.prototype.constructor = i),
              (i.prototype.hitTest = function(t, e) {
                return (
                  (l.target = null),
                  (l.data.global = t),
                  e || (e = this.renderer._lastObjectRendered),
                  this.processInteractive(l, e, null, !0),
                  l.target
                );
              }),
              (i.prototype.setTargetElement = function(t, e) {
                void 0 === e && (e = 1),
                  this.removeEvents(),
                  (this.interactionDOMElement = t),
                  (this.resolution = e),
                  this.addEvents();
              }),
              (i.prototype.addEvents = function() {
                this.interactionDOMElement &&
                  (e.Ticker.system.add(
                    this.update,
                    this,
                    e.UPDATE_PRIORITY.INTERACTION
                  ),
                  window.navigator.msPointerEnabled
                    ? ((this.interactionDOMElement.style[
                        "-ms-content-zooming"
                      ] = "none"),
                      (this.interactionDOMElement.style["-ms-touch-action"] =
                        "none"))
                    : this.supportsPointerEvents &&
                      (this.interactionDOMElement.style["touch-action"] =
                        "none"),
                  this.supportsPointerEvents
                    ? (window.document.addEventListener(
                        "pointermove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerdown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerleave",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerover",
                        this.onPointerOver,
                        !0
                      ),
                      window.addEventListener(
                        "pointercancel",
                        this.onPointerCancel,
                        !0
                      ),
                      window.addEventListener(
                        "pointerup",
                        this.onPointerUp,
                        !0
                      ))
                    : (window.document.addEventListener(
                        "mousemove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mousedown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mouseout",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mouseover",
                        this.onPointerOver,
                        !0
                      ),
                      window.addEventListener("mouseup", this.onPointerUp, !0)),
                  this.supportsTouchEvents &&
                    (this.interactionDOMElement.addEventListener(
                      "touchstart",
                      this.onPointerDown,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchcancel",
                      this.onPointerCancel,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchend",
                      this.onPointerUp,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchmove",
                      this.onPointerMove,
                      !0
                    )),
                  (this.eventsAdded = !0));
              }),
              (i.prototype.removeEvents = function() {
                this.interactionDOMElement &&
                  (e.Ticker.system.remove(this.update, this),
                  window.navigator.msPointerEnabled
                    ? ((this.interactionDOMElement.style[
                        "-ms-content-zooming"
                      ] = ""),
                      (this.interactionDOMElement.style["-ms-touch-action"] =
                        ""))
                    : this.supportsPointerEvents &&
                      (this.interactionDOMElement.style["touch-action"] = ""),
                  this.supportsPointerEvents
                    ? (window.document.removeEventListener(
                        "pointermove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerdown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerleave",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerover",
                        this.onPointerOver,
                        !0
                      ),
                      window.removeEventListener(
                        "pointercancel",
                        this.onPointerCancel,
                        !0
                      ),
                      window.removeEventListener(
                        "pointerup",
                        this.onPointerUp,
                        !0
                      ))
                    : (window.document.removeEventListener(
                        "mousemove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mousedown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mouseout",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mouseover",
                        this.onPointerOver,
                        !0
                      ),
                      window.removeEventListener(
                        "mouseup",
                        this.onPointerUp,
                        !0
                      )),
                  this.supportsTouchEvents &&
                    (this.interactionDOMElement.removeEventListener(
                      "touchstart",
                      this.onPointerDown,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchcancel",
                      this.onPointerCancel,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchend",
                      this.onPointerUp,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchmove",
                      this.onPointerMove,
                      !0
                    )),
                  (this.interactionDOMElement = null),
                  (this.eventsAdded = !1));
              }),
              (i.prototype.update = function(t) {
                if (
                  ((this._deltaTime += t),
                  !(this._deltaTime < this.interactionFrequency) &&
                    ((this._deltaTime = 0), this.interactionDOMElement))
                )
                  if (this.didMove) this.didMove = !1;
                  else {
                    for (var e in ((this.cursor = null),
                    this.activeInteractionData))
                      if (this.activeInteractionData.hasOwnProperty(e)) {
                        var i = this.activeInteractionData[e];
                        if (i.originalEvent && "touch" !== i.pointerType) {
                          var n = this.configureInteractionEventForDOMEvent(
                            this.eventData,
                            i.originalEvent,
                            i
                          );
                          this.processInteractive(
                            n,
                            this.renderer._lastObjectRendered,
                            this.processPointerOverOut,
                            !0
                          );
                        }
                      }
                    this.setCursorMode(this.cursor);
                  }
              }),
              (i.prototype.setCursorMode = function(t) {
                if (((t = t || "default"), this.currentCursorMode !== t)) {
                  this.currentCursorMode = t;
                  var e = this.cursorStyles[t];
                  if (e)
                    switch (typeof e) {
                      case "string":
                        this.interactionDOMElement.style.cursor = e;
                        break;
                      case "function":
                        e(t);
                        break;
                      case "object":
                        Object.assign(this.interactionDOMElement.style, e);
                    }
                  else
                    "string" != typeof t ||
                      Object.prototype.hasOwnProperty.call(
                        this.cursorStyles,
                        t
                      ) ||
                      (this.interactionDOMElement.style.cursor = t);
                }
              }),
              (i.prototype.dispatchEvent = function(t, e, i) {
                (i.stopPropagationHint && t !== i.stopsPropagatingAt) ||
                  ((i.currentTarget = t),
                  (i.type = e),
                  t.emit(e, i),
                  t[e] && t[e](i));
              }),
              (i.prototype.delayDispatchEvent = function(t, e, i) {
                this.delayedEvents.push({
                  displayObject: t,
                  eventString: e,
                  eventData: i
                });
              }),
              (i.prototype.mapPositionToPoint = function(t, e, i) {
                var n;
                n = this.interactionDOMElement.parentElement
                  ? this.interactionDOMElement.getBoundingClientRect()
                  : { x: 0, y: 0, width: 0, height: 0 };
                var o = 1 / this.resolution;
                (t.x =
                  (e - n.left) *
                  (this.interactionDOMElement.width / n.width) *
                  o),
                  (t.y =
                    (i - n.top) *
                    (this.interactionDOMElement.height / n.height) *
                    o);
              }),
              (i.prototype.processInteractive = function(t, e, i, n) {
                var o = this.search.findHit(t, e, i, n),
                  r = this.delayedEvents;
                if (!r.length) return o;
                t.stopPropagationHint = !1;
                var s = r.length;
                this.delayedEvents = [];
                for (var a = 0; a < s; a++) {
                  var h = r[a],
                    c = h.displayObject,
                    p = h.eventString,
                    u = h.eventData;
                  u.stopsPropagatingAt === c && (u.stopPropagationHint = !0),
                    this.dispatchEvent(c, p, u);
                }
                return o;
              }),
              (i.prototype.onPointerDown = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                  var e = this.normalizeToPointerData(t);
                  if (this.autoPreventDefault && e[0].isNormalized)
                    (t.cancelable || !("cancelable" in t)) &&
                      t.preventDefault();
                  for (var i = e.length, n = 0; n < i; n++) {
                    var o = e[n],
                      r = this.getInteractionDataForPointerId(o),
                      s = this.configureInteractionEventForDOMEvent(
                        this.eventData,
                        o,
                        r
                      );
                    if (
                      ((s.data.originalEvent = t),
                      this.processInteractive(
                        s,
                        this.renderer._lastObjectRendered,
                        this.processPointerDown,
                        !0
                      ),
                      this.emit("pointerdown", s),
                      "touch" === o.pointerType)
                    )
                      this.emit("touchstart", s);
                    else if (
                      "mouse" === o.pointerType ||
                      "pen" === o.pointerType
                    ) {
                      var a = 2 === o.button;
                      this.emit(a ? "rightdown" : "mousedown", this.eventData);
                    }
                  }
                }
              }),
              (i.prototype.processPointerDown = function(t, e, i) {
                var n = t.data,
                  o = t.data.identifier;
                if (i)
                  if (
                    (e.trackedPointers[o] || (e.trackedPointers[o] = new a(o)),
                    this.dispatchEvent(e, "pointerdown", t),
                    "touch" === n.pointerType)
                  )
                    this.dispatchEvent(e, "touchstart", t);
                  else if (
                    "mouse" === n.pointerType ||
                    "pen" === n.pointerType
                  ) {
                    var r = 2 === n.button;
                    r
                      ? (e.trackedPointers[o].rightDown = !0)
                      : (e.trackedPointers[o].leftDown = !0),
                      this.dispatchEvent(e, r ? "rightdown" : "mousedown", t);
                  }
              }),
              (i.prototype.onPointerComplete = function(t, e, i) {
                for (
                  var n = this.normalizeToPointerData(t),
                    o = n.length,
                    r =
                      t.target !== this.interactionDOMElement ? "outside" : "",
                    s = 0;
                  s < o;
                  s++
                ) {
                  var a = n[s],
                    h = this.getInteractionDataForPointerId(a),
                    c = this.configureInteractionEventForDOMEvent(
                      this.eventData,
                      a,
                      h
                    );
                  if (
                    ((c.data.originalEvent = t),
                    this.processInteractive(
                      c,
                      this.renderer._lastObjectRendered,
                      i,
                      e || !r
                    ),
                    this.emit(e ? "pointercancel" : "pointerup" + r, c),
                    "mouse" === a.pointerType || "pen" === a.pointerType)
                  ) {
                    var p = 2 === a.button;
                    this.emit(p ? "rightup" + r : "mouseup" + r, c);
                  } else
                    "touch" === a.pointerType &&
                      (this.emit(e ? "touchcancel" : "touchend" + r, c),
                      this.releaseInteractionDataForPointerId(a.pointerId, h));
                }
              }),
              (i.prototype.onPointerCancel = function(t) {
                (this.supportsTouchEvents && "touch" === t.pointerType) ||
                  this.onPointerComplete(t, !0, this.processPointerCancel);
              }),
              (i.prototype.processPointerCancel = function(t, e) {
                var i = t.data,
                  n = t.data.identifier;
                void 0 !== e.trackedPointers[n] &&
                  (delete e.trackedPointers[n],
                  this.dispatchEvent(e, "pointercancel", t),
                  "touch" === i.pointerType &&
                    this.dispatchEvent(e, "touchcancel", t));
              }),
              (i.prototype.onPointerUp = function(t) {
                (this.supportsTouchEvents && "touch" === t.pointerType) ||
                  this.onPointerComplete(t, !1, this.processPointerUp);
              }),
              (i.prototype.processPointerUp = function(t, e, i) {
                var n = t.data,
                  o = t.data.identifier,
                  r = e.trackedPointers[o],
                  s = "touch" === n.pointerType,
                  h = "mouse" === n.pointerType || "pen" === n.pointerType,
                  c = !1;
                if (h) {
                  var p = 2 === n.button,
                    u = a.FLAGS,
                    l = p ? u.RIGHT_DOWN : u.LEFT_DOWN,
                    v = void 0 !== r && r.flags & l;
                  i
                    ? (this.dispatchEvent(e, p ? "rightup" : "mouseup", t),
                      v &&
                        (this.dispatchEvent(e, p ? "rightclick" : "click", t),
                        (c = !0)))
                    : v &&
                      this.dispatchEvent(
                        e,
                        p ? "rightupoutside" : "mouseupoutside",
                        t
                      ),
                    r && (p ? (r.rightDown = !1) : (r.leftDown = !1));
                }
                i
                  ? (this.dispatchEvent(e, "pointerup", t),
                    s && this.dispatchEvent(e, "touchend", t),
                    r &&
                      ((h && !c) || this.dispatchEvent(e, "pointertap", t),
                      s && (this.dispatchEvent(e, "tap", t), (r.over = !1))))
                  : r &&
                    (this.dispatchEvent(e, "pointerupoutside", t),
                    s && this.dispatchEvent(e, "touchendoutside", t)),
                  r && r.none && delete e.trackedPointers[o];
              }),
              (i.prototype.onPointerMove = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                  var e = this.normalizeToPointerData(t);
                  ("mouse" !== e[0].pointerType &&
                    "pen" !== e[0].pointerType) ||
                    ((this.didMove = !0), (this.cursor = null));
                  for (var i = e.length, n = 0; n < i; n++) {
                    var o = e[n],
                      r = this.getInteractionDataForPointerId(o),
                      s = this.configureInteractionEventForDOMEvent(
                        this.eventData,
                        o,
                        r
                      );
                    (s.data.originalEvent = t),
                      this.processInteractive(
                        s,
                        this.renderer._lastObjectRendered,
                        this.processPointerMove,
                        !0
                      ),
                      this.emit("pointermove", s),
                      "touch" === o.pointerType && this.emit("touchmove", s),
                      ("mouse" !== o.pointerType && "pen" !== o.pointerType) ||
                        this.emit("mousemove", s);
                  }
                  "mouse" === e[0].pointerType &&
                    this.setCursorMode(this.cursor);
                }
              }),
              (i.prototype.processPointerMove = function(t, e, i) {
                var n = t.data,
                  o = "touch" === n.pointerType,
                  r = "mouse" === n.pointerType || "pen" === n.pointerType;
                r && this.processPointerOverOut(t, e, i),
                  (this.moveWhenInside && !i) ||
                    (this.dispatchEvent(e, "pointermove", t),
                    o && this.dispatchEvent(e, "touchmove", t),
                    r && this.dispatchEvent(e, "mousemove", t));
              }),
              (i.prototype.onPointerOut = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                  var e = this.normalizeToPointerData(t)[0];
                  "mouse" === e.pointerType &&
                    ((this.mouseOverRenderer = !1), this.setCursorMode(null));
                  var i = this.getInteractionDataForPointerId(e),
                    n = this.configureInteractionEventForDOMEvent(
                      this.eventData,
                      e,
                      i
                    );
                  (n.data.originalEvent = e),
                    this.processInteractive(
                      n,
                      this.renderer._lastObjectRendered,
                      this.processPointerOverOut,
                      !1
                    ),
                    this.emit("pointerout", n),
                    "mouse" === e.pointerType || "pen" === e.pointerType
                      ? this.emit("mouseout", n)
                      : this.releaseInteractionDataForPointerId(i.identifier);
                }
              }),
              (i.prototype.processPointerOverOut = function(t, e, i) {
                var n = t.data,
                  o = t.data.identifier,
                  r = "mouse" === n.pointerType || "pen" === n.pointerType,
                  s = e.trackedPointers[o];
                i && !s && (s = e.trackedPointers[o] = new a(o)),
                  void 0 !== s &&
                    (i && this.mouseOverRenderer
                      ? (s.over ||
                          ((s.over = !0),
                          this.delayDispatchEvent(e, "pointerover", t),
                          r && this.delayDispatchEvent(e, "mouseover", t)),
                        r && null === this.cursor && (this.cursor = e.cursor))
                      : s.over &&
                        ((s.over = !1),
                        this.dispatchEvent(e, "pointerout", this.eventData),
                        r && this.dispatchEvent(e, "mouseout", t),
                        s.none && delete e.trackedPointers[o]));
              }),
              (i.prototype.onPointerOver = function(t) {
                var e = this.normalizeToPointerData(t)[0],
                  i = this.getInteractionDataForPointerId(e),
                  n = this.configureInteractionEventForDOMEvent(
                    this.eventData,
                    e,
                    i
                  );
                (n.data.originalEvent = e),
                  "mouse" === e.pointerType && (this.mouseOverRenderer = !0),
                  this.emit("pointerover", n),
                  ("mouse" !== e.pointerType && "pen" !== e.pointerType) ||
                    this.emit("mouseover", n);
              }),
              (i.prototype.getInteractionDataForPointerId = function(t) {
                var e,
                  i = t.pointerId;
                return (
                  i === u || "mouse" === t.pointerType
                    ? (e = this.mouse)
                    : this.activeInteractionData[i]
                    ? (e = this.activeInteractionData[i])
                    : (((e =
                        this.interactionDataPool.pop() ||
                        new o()).identifier = i),
                      (this.activeInteractionData[i] = e)),
                  e.copyEvent(t),
                  e
                );
              }),
              (i.prototype.releaseInteractionDataForPointerId = function(t) {
                var e = this.activeInteractionData[t];
                e &&
                  (delete this.activeInteractionData[t],
                  e.reset(),
                  this.interactionDataPool.push(e));
              }),
              (i.prototype.configureInteractionEventForDOMEvent = function(
                t,
                e,
                i
              ) {
                return (
                  (t.data = i),
                  this.mapPositionToPoint(i.global, e.clientX, e.clientY),
                  "touch" === e.pointerType &&
                    ((e.globalX = i.global.x), (e.globalY = i.global.y)),
                  (i.originalEvent = e),
                  t.reset(),
                  t
                );
              }),
              (i.prototype.normalizeToPointerData = function(t) {
                var e = [];
                if (this.supportsTouchEvents && t instanceof TouchEvent)
                  for (var i = 0, n = t.changedTouches.length; i < n; i++) {
                    var o = t.changedTouches[i];
                    void 0 === o.button &&
                      (o.button = t.touches.length ? 1 : 0),
                      void 0 === o.buttons &&
                        (o.buttons = t.touches.length ? 1 : 0),
                      void 0 === o.isPrimary &&
                        (o.isPrimary =
                          1 === t.touches.length && "touchstart" === t.type),
                      void 0 === o.width && (o.width = o.radiusX || 1),
                      void 0 === o.height && (o.height = o.radiusY || 1),
                      void 0 === o.tiltX && (o.tiltX = 0),
                      void 0 === o.tiltY && (o.tiltY = 0),
                      void 0 === o.pointerType && (o.pointerType = "touch"),
                      void 0 === o.pointerId &&
                        (o.pointerId = o.identifier || 0),
                      void 0 === o.pressure && (o.pressure = o.force || 0.5),
                      void 0 === o.twist && (o.twist = 0),
                      void 0 === o.tangentialPressure &&
                        (o.tangentialPressure = 0),
                      void 0 === o.layerX && (o.layerX = o.offsetX = o.clientX),
                      void 0 === o.layerY && (o.layerY = o.offsetY = o.clientY),
                      (o.isNormalized = !0),
                      e.push(o);
                  }
                else
                  !(t instanceof MouseEvent) ||
                  (this.supportsPointerEvents &&
                    t instanceof window.PointerEvent)
                    ? e.push(t)
                    : (void 0 === t.isPrimary && (t.isPrimary = !0),
                      void 0 === t.width && (t.width = 1),
                      void 0 === t.height && (t.height = 1),
                      void 0 === t.tiltX && (t.tiltX = 0),
                      void 0 === t.tiltY && (t.tiltY = 0),
                      void 0 === t.pointerType && (t.pointerType = "mouse"),
                      void 0 === t.pointerId && (t.pointerId = u),
                      void 0 === t.pressure && (t.pressure = 0.5),
                      void 0 === t.twist && (t.twist = 0),
                      void 0 === t.tangentialPressure &&
                        (t.tangentialPressure = 0),
                      (t.isNormalized = !0),
                      e.push(t));
                return e;
              }),
              (i.prototype.destroy = function() {
                this.removeEvents(),
                  this.removeAllListeners(),
                  (this.renderer = null),
                  (this.mouse = null),
                  (this.eventData = null),
                  (this.interactionDOMElement = null),
                  (this.onPointerDown = null),
                  (this.processPointerDown = null),
                  (this.onPointerUp = null),
                  (this.processPointerUp = null),
                  (this.onPointerCancel = null),
                  (this.processPointerCancel = null),
                  (this.onPointerMove = null),
                  (this.processPointerMove = null),
                  (this.onPointerOut = null),
                  (this.processPointerOverOut = null),
                  (this.onPointerOver = null),
                  (this.search = null);
              }),
              i
            );
          })(n.EventEmitter);
        exports.InteractionManager = v;
      },
      {
        "@pixi/math": "oNQC",
        "@pixi/ticker": "F3Q6",
        "@pixi/display": "nL3p",
        "@pixi/utils": "G5Tu"
      }
    ],
    KxlN: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.graphicsUtils = exports.LineStyle = exports.GraphicsGeometry = exports.GraphicsData = exports.Graphics = exports.GRAPHICS_CURVES = exports.FillStyle = void 0);
        var t = require("@pixi/core"),
          e = require("@pixi/math"),
          i = require("@pixi/utils"),
          r = require("@pixi/constants"),
          s = require("@pixi/display"),
          n = {
            adaptive: !0,
            maxLength: 10,
            minSegments: 8,
            maxSegments: 2048,
            _segmentsCount: function(t, e) {
              if ((void 0 === e && (e = 20), !this.adaptive)) return e;
              var i = Math.ceil(t / this.maxLength);
              return (
                i < this.minSegments
                  ? (i = this.minSegments)
                  : i > this.maxSegments && (i = this.maxSegments),
                i
              );
            }
          };
        exports.GRAPHICS_CURVES = n;
        var h = function() {
          this.reset();
        };
        (exports.FillStyle = h),
          (h.prototype.clone = function() {
            var t = new h();
            return (
              (t.color = this.color),
              (t.alpha = this.alpha),
              (t.texture = this.texture),
              (t.matrix = this.matrix),
              (t.visible = this.visible),
              t
            );
          }),
          (h.prototype.reset = function() {
            (this.color = 16777215),
              (this.alpha = 1),
              (this.texture = t.Texture.WHITE),
              (this.matrix = null),
              (this.visible = !1);
          }),
          (h.prototype.destroy = function() {
            (this.texture = null), (this.matrix = null);
          });
        var a = {
            build: function(t) {
              t.points = t.shape.points.slice();
            },
            triangulate: function(t, e) {
              var r = t.points,
                s = t.holes,
                n = e.points,
                h = e.indices;
              if (r.length >= 6) {
                for (var a = [], o = 0; o < s.length; o++) {
                  var l = s[o];
                  a.push(r.length / 2), (r = r.concat(l.points));
                }
                var u = (0, i.earcut)(r, a, 2);
                if (!u) return;
                for (var p = n.length / 2, c = 0; c < u.length; c += 3)
                  h.push(u[c] + p), h.push(u[c + 1] + p), h.push(u[c + 2] + p);
                for (var d = 0; d < r.length; d++) n.push(r[d]);
              }
            }
          },
          o = {
            build: function(t) {
              var i,
                r,
                s = t.shape,
                n = t.points,
                h = s.x,
                a = s.y;
              if (
                ((n.length = 0),
                t.type === e.SHAPES.CIRC
                  ? ((i = s.radius), (r = s.radius))
                  : ((i = s.width), (r = s.height)),
                0 !== i && 0 !== r)
              ) {
                var o =
                  Math.floor(30 * Math.sqrt(s.radius)) ||
                  Math.floor(15 * Math.sqrt(s.width + s.height));
                o /= 2.3;
                for (var l = (2 * Math.PI) / o, u = 0; u < o; u++)
                  n.push(h + Math.sin(-l * u) * i, a + Math.cos(-l * u) * r);
                n.push(n[0], n[1]);
              }
            },
            triangulate: function(t, e) {
              var i = t.points,
                r = e.points,
                s = e.indices,
                n = r.length / 2,
                h = n;
              r.push(t.shape.x, t.shape.y);
              for (var a = 0; a < i.length; a += 2)
                r.push(i[a], i[a + 1]), s.push(n++, h, n);
            }
          },
          l = {
            build: function(t) {
              var e = t.shape,
                i = e.x,
                r = e.y,
                s = e.width,
                n = e.height,
                h = t.points;
              (h.length = 0), h.push(i, r, i + s, r, i + s, r + n, i, r + n);
            },
            triangulate: function(t, e) {
              var i = t.points,
                r = e.points,
                s = r.length / 2;
              r.push(i[0], i[1], i[2], i[3], i[6], i[7], i[4], i[5]),
                e.indices.push(s, s + 1, s + 2, s + 1, s + 2, s + 3);
            }
          },
          u = {
            build: function(t) {
              var e = t.shape,
                i = t.points,
                r = e.x,
                s = e.y,
                n = e.width,
                h = e.height,
                a = e.radius;
              (i.length = 0),
                c(r, s + a, r, s, r + a, s, i),
                c(r + n - a, s, r + n, s, r + n, s + a, i),
                c(r + n, s + h - a, r + n, s + h, r + n - a, s + h, i),
                c(r + a, s + h, r, s + h, r, s + h - a, i);
            },
            triangulate: function(t, e) {
              for (
                var r = t.points,
                  s = e.points,
                  n = e.indices,
                  h = s.length / 2,
                  a = (0, i.earcut)(r, null, 2),
                  o = 0,
                  l = a.length;
                o < l;
                o += 3
              )
                n.push(a[o] + h), n.push(a[o + 1] + h), n.push(a[o + 2] + h);
              for (var u = 0, p = r.length; u < p; u++) s.push(r[u], r[++u]);
            }
          };
        function p(t, e, i) {
          return t + (e - t) * i;
        }
        function c(t, e, i, r, s, n, h) {
          void 0 === h && (h = []);
          for (
            var a = h, o = 0, l = 0, u = 0, c = 0, d = 0, f = 0, y = 0, g = 0;
            y <= 20;
            ++y
          )
            (o = p(t, i, (g = y / 20))),
              (l = p(e, r, g)),
              (u = p(i, s, g)),
              (c = p(r, n, g)),
              (d = p(o, u, g)),
              (f = p(l, c, g)),
              a.push(d, f);
          return a;
        }
        function d(t, e) {
          t.lineStyle.native ? y(t, e) : f(t, e);
        }
        function f(t, i) {
          var r = t.shape,
            s = t.points || r.points.slice(),
            n = i.closePointEps;
          if (0 !== s.length) {
            var h = t.lineStyle,
              a = new e.Point(s[0], s[1]),
              o = new e.Point(s[s.length - 2], s[s.length - 1]),
              l = r.type !== e.SHAPES.POLY || r.closeStroke,
              u = Math.abs(a.x - o.x) < n && Math.abs(a.y - o.y) < n;
            if (l) {
              (s = s.slice()),
                u &&
                  (s.pop(), s.pop(), o.set(s[s.length - 2], s[s.length - 1]));
              var p = o.x + 0.5 * (a.x - o.x),
                c = o.y + 0.5 * (a.y - o.y);
              s.unshift(p, c), s.push(p, c);
            }
            var d = i.points,
              f = s.length / 2,
              y = s.length,
              g = d.length / 2,
              v = h.width / 2,
              b = s[0],
              x = s[1],
              m = s[2],
              S = s[3],
              _ = 0,
              w = 0,
              P = -(x - S),
              M = b - m,
              D = 0,
              T = 0,
              A = 0,
              C = 0,
              E = Math.sqrt(P * P + M * M);
            (P /= E), (M /= E), (P *= v), (M *= v);
            var I = h.alignment,
              B = 2 * (1 - I),
              R = 2 * I;
            d.push(b - P * B, x - M * B), d.push(b + P * R, x + M * R);
            for (var L = 1; L < f - 1; ++L) {
              (b = s[2 * (L - 1)]),
                (x = s[2 * (L - 1) + 1]),
                (m = s[2 * L]),
                (S = s[2 * L + 1]),
                (_ = s[2 * (L + 1)]),
                (w = s[2 * (L + 1) + 1]),
                (P = -(x - S)),
                (M = b - m),
                (P /= E = Math.sqrt(P * P + M * M)),
                (M /= E),
                (P *= v),
                (M *= v),
                (D = -(S - w)),
                (T = m - _),
                (D /= E = Math.sqrt(D * D + T * T)),
                (T /= E);
              var O = -M + x - (-M + S),
                H = -P + m - (-P + b),
                F = (-P + b) * (-M + S) - (-P + m) * (-M + x),
                z = -(T *= v) + w - (-T + S),
                G = -(D *= v) + m - (-D + _),
                U = (-D + _) * (-T + S) - (-D + m) * (-T + w),
                q = O * G - z * H;
              if (Math.abs(q) < 0.1)
                (q += 10.1),
                  d.push(m - P * B, S - M * B),
                  d.push(m + P * R, S + M * R);
              else {
                var j = (H * U - G * F) / q,
                  k = (z * F - O * U) / q;
                (j - m) * (j - m) + (k - S) * (k - S) > 196 * v * v
                  ? ((A = P - D),
                    (C = M - T),
                    (A /= E = Math.sqrt(A * A + C * C)),
                    (C /= E),
                    (A *= v),
                    (C *= v),
                    d.push(m - A * B, S - C * B),
                    d.push(m + A * R, S + C * R),
                    d.push(m - A * R * B, S - C * B),
                    y++)
                  : (d.push(m + (j - m) * B, S + (k - S) * B),
                    d.push(m - (j - m) * R, S - (k - S) * R));
              }
            }
            (b = s[2 * (f - 2)]),
              (x = s[2 * (f - 2) + 1]),
              (m = s[2 * (f - 1)]),
              (P = -(x - (S = s[2 * (f - 1) + 1]))),
              (M = b - m),
              (P /= E = Math.sqrt(P * P + M * M)),
              (M /= E),
              (P *= v),
              (M *= v),
              d.push(m - P * B, S - M * B),
              d.push(m + P * R, S + M * R);
            for (var N = i.indices, W = 0; W < y - 2; ++W)
              N.push(g, g + 1, g + 2), g++;
          }
        }
        function y(t, i) {
          var r = 0,
            s = t.shape,
            n = t.points || s.points,
            h = s.type !== e.SHAPES.POLY || s.closeStroke;
          if (0 !== n.length) {
            var a = i.points,
              o = i.indices,
              l = n.length / 2,
              u = a.length / 2,
              p = u;
            for (a.push(n[0], n[1]), r = 1; r < l; r++)
              a.push(n[2 * r], n[2 * r + 1]), o.push(p, p + 1), p++;
            h && o.push(p, u);
          }
        }
        function g(t, e) {
          var r = t.points.slice();
          if (!(r.length < 6)) {
            var s = e.indices;
            (e.points = r),
              (e.alpha = t.fillAlpha),
              (e.color = (0, i.hex2rgb)(t.fillColor));
            for (
              var n = 1 / 0,
                h = -1 / 0,
                a = 1 / 0,
                o = -1 / 0,
                l = 0,
                u = 0,
                p = 0;
              p < r.length;
              p += 2
            )
              (n = (l = r[p]) < n ? l : n),
                (h = l > h ? l : h),
                (a = (u = r[p + 1]) < a ? u : a),
                (o = u > o ? u : o);
            r.push(n, a, h, a, h, o, n, o);
            for (var c = r.length / 2, d = 0; d < c; d++) s.push(d);
          }
        }
        function v(t, e, i, r, s, n, h, a, o, l) {
          void 0 === l && (l = []);
          var u = 0,
            p = 0,
            c = 0,
            d = 0,
            f = 0;
          l.push(t, e);
          for (var y = 1, g = 0; y <= o; ++y)
            (c = (p = (u = 1 - (g = y / o)) * u) * u),
              (f = (d = g * g) * g),
              l.push(
                c * t + 3 * p * g * i + 3 * u * d * s + f * h,
                c * e + 3 * p * g * r + 3 * u * d * n + f * a
              );
          return l;
        }
        var b = (function(t) {
            function i(i, r, s, n, h, a) {
              h = h || n / 2;
              for (
                var o = (-1 * Math.PI) / 2 + a,
                  l = 2 * s,
                  u = e.PI_2 / l,
                  p = [],
                  c = 0;
                c < l;
                c++
              ) {
                var d = c % 2 ? h : n,
                  f = c * u + o;
                p.push(i + d * Math.cos(f), r + d * Math.sin(f));
              }
              t.call(this, p);
            }
            return (
              t && (i.__proto__ = t),
              (i.prototype = Object.create(t && t.prototype)),
              (i.prototype.constructor = i),
              i
            );
          })(e.Polygon),
          x = function() {};
        (x.curveTo = function(t, e, i, r, s, n) {
          var h = n[n.length - 2],
            a = n[n.length - 1] - e,
            o = h - t,
            l = r - e,
            u = i - t,
            p = Math.abs(a * u - o * l);
          if (p < 1e-8 || 0 === s)
            return (
              (n[n.length - 2] === t && n[n.length - 1] === e) || n.push(t, e),
              null
            );
          var c = a * a + o * o,
            d = l * l + u * u,
            f = a * l + o * u,
            y = (s * Math.sqrt(c)) / p,
            g = (s * Math.sqrt(d)) / p,
            v = (y * f) / c,
            b = (g * f) / d,
            x = y * u + g * o,
            m = y * l + g * a,
            S = o * (g + v),
            _ = a * (g + v),
            w = u * (y + b),
            P = l * (y + b);
          return {
            cx: x + t,
            cy: m + e,
            radius: s,
            startAngle: Math.atan2(_ - m, S - x),
            endAngle: Math.atan2(P - m, w - x),
            anticlockwise: o * l > u * a
          };
        }),
          (x.arc = function(t, i, r, s, h, a, o, l, u) {
            for (
              var p = o - a,
                c = n._segmentsCount(
                  Math.abs(p) * h,
                  40 * Math.ceil(Math.abs(p) / e.PI_2)
                ),
                d = p / (2 * c),
                f = 2 * d,
                y = Math.cos(d),
                g = Math.sin(d),
                v = c - 1,
                b = (v % 1) / v,
                x = 0;
              x <= v;
              ++x
            ) {
              var m = d + a + f * (x + b * x),
                S = Math.cos(m),
                _ = -Math.sin(m);
              u.push((y * S + g * _) * h + r, (y * -_ + g * S) * h + s);
            }
          });
        var m = function() {};
        (m.curveLength = function(t, e, i, r, s, n, h, a) {
          for (
            var o = 0,
              l = 0,
              u = 0,
              p = 0,
              c = 0,
              d = 0,
              f = 0,
              y = 0,
              g = 0,
              v = 0,
              b = 0,
              x = t,
              m = e,
              S = 1;
            S <= 10;
            ++S
          )
            (v =
              x -
              (y =
                (f = (d = (c = 1 - (l = S / 10)) * c) * c) * t +
                3 * d * l * i +
                3 * c * (u = l * l) * s +
                (p = u * l) * h)),
              (b = m - (g = f * e + 3 * d * l * r + 3 * c * u * n + p * a)),
              (x = y),
              (m = g),
              (o += Math.sqrt(v * v + b * b));
          return o;
        }),
          (m.curveTo = function(t, e, i, r, s, h, a) {
            var o = a[a.length - 2],
              l = a[a.length - 1];
            a.length -= 2;
            var u = n._segmentsCount(m.curveLength(o, l, t, e, i, r, s, h)),
              p = 0,
              c = 0,
              d = 0,
              f = 0,
              y = 0;
            a.push(o, l);
            for (var g = 1, v = 0; g <= u; ++g)
              (d = (c = (p = 1 - (v = g / u)) * p) * p),
                (y = (f = v * v) * v),
                a.push(
                  d * o + 3 * c * v * t + 3 * p * f * i + y * s,
                  d * l + 3 * c * v * e + 3 * p * f * r + y * h
                );
          });
        var S = function() {};
        (S.curveLength = function(t, e, i, r, s, n) {
          var h = t - 2 * i + s,
            a = e - 2 * r + n,
            o = 2 * i - 2 * t,
            l = 2 * r - 2 * e,
            u = 4 * (h * h + a * a),
            p = 4 * (h * o + a * l),
            c = o * o + l * l,
            d = 2 * Math.sqrt(u + p + c),
            f = Math.sqrt(u),
            y = 2 * u * f,
            g = 2 * Math.sqrt(c),
            v = p / f;
          return (
            (y * d +
              f * p * (d - g) +
              (4 * c * u - p * p) * Math.log((2 * f + v + d) / (v + g))) /
            (4 * y)
          );
        }),
          (S.curveTo = function(t, e, i, r, s) {
            for (
              var h = s[s.length - 2],
                a = s[s.length - 1],
                o = n._segmentsCount(S.curveLength(h, a, t, e, i, r)),
                l = 0,
                u = 0,
                p = 1;
              p <= o;
              ++p
            ) {
              var c = p / o;
              (l = h + (t - h) * c),
                (u = a + (e - a) * c),
                s.push(
                  l + (t + (i - t) * c - l) * c,
                  u + (e + (r - e) * c - u) * c
                );
            }
          });
        var _ = function() {
          this.reset();
        };
        (_.prototype.begin = function(t, e, i) {
          this.reset(),
            (this.style = t),
            (this.start = e),
            (this.attribStart = i);
        }),
          (_.prototype.end = function(t, e) {
            (this.attribSize = e - this.attribStart),
              (this.size = t - this.start);
          }),
          (_.prototype.reset = function() {
            (this.style = null),
              (this.size = 0),
              (this.start = 0),
              (this.attribStart = 0),
              (this.attribSize = 0);
          });
        var w = {};
        (w[e.SHAPES.POLY] = a),
          (w[e.SHAPES.CIRC] = o),
          (w[e.SHAPES.ELIP] = o),
          (w[e.SHAPES.RECT] = l),
          (w[e.SHAPES.RREC] = u);
        var P = [],
          M = [],
          D = {
            buildPoly: a,
            buildCircle: o,
            buildRectangle: l,
            buildRoundedRectangle: u,
            FILL_COMMANDS: w,
            BATCH_POOL: P,
            DRAW_CALL_POOL: M,
            buildLine: d,
            buildComplexPoly: g,
            bezierCurveTo: v,
            Star: b,
            ArcUtils: x,
            BezierUtils: m,
            QuadraticUtils: S,
            BatchPart: _
          };
        exports.graphicsUtils = D;
        var T = function(t, e, i, r) {
          void 0 === e && (e = null),
            void 0 === i && (i = null),
            void 0 === r && (r = null),
            (this.shape = t),
            (this.lineStyle = i),
            (this.fillStyle = e),
            (this.matrix = r),
            (this.type = t.type),
            (this.points = []),
            (this.holes = []);
        };
        (exports.GraphicsData = T),
          (T.prototype.clone = function() {
            return new T(
              this.shape,
              this.fillStyle,
              this.lineStyle,
              this.matrix
            );
          }),
          (T.prototype.destroy = function() {
            (this.shape = null),
              (this.holes.length = 0),
              (this.holes = null),
              (this.points.length = 0),
              (this.points = null),
              (this.lineStyle = null),
              (this.fillStyle = null);
          });
        var A = new e.Point(),
          C = new s.Bounds(),
          E = (function(n) {
            function h() {
              n.call(this),
                (this.points = []),
                (this.colors = []),
                (this.uvs = []),
                (this.indices = []),
                (this.textureIds = []),
                (this.graphicsData = []),
                (this.dirty = 0),
                (this.batchDirty = -1),
                (this.cacheDirty = -1),
                (this.clearDirty = 0),
                (this.drawCalls = []),
                (this.batches = []),
                (this.shapeIndex = 0),
                (this._bounds = new s.Bounds()),
                (this.boundsDirty = -1),
                (this.boundsPadding = 0),
                (this.batchable = !1),
                (this.indicesUint16 = null),
                (this.uvsFloat32 = null),
                (this.closePointEps = 1e-4);
            }
            n && (h.__proto__ = n),
              (h.prototype = Object.create(n && n.prototype)),
              (h.prototype.constructor = h);
            var o = { bounds: { configurable: !0 } };
            return (
              (o.bounds.get = function() {
                return (
                  this.boundsDirty !== this.dirty &&
                    ((this.boundsDirty = this.dirty), this.calculateBounds()),
                  this._bounds
                );
              }),
              (h.prototype.invalidate = function() {
                (this.boundsDirty = -1),
                  this.dirty++,
                  this.batchDirty++,
                  (this.shapeIndex = 0),
                  (this.points.length = 0),
                  (this.colors.length = 0),
                  (this.uvs.length = 0),
                  (this.indices.length = 0),
                  (this.textureIds.length = 0);
                for (var t = 0; t < this.drawCalls.length; t++)
                  (this.drawCalls[t].textures.length = 0),
                    M.push(this.drawCalls[t]);
                this.drawCalls.length = 0;
                for (var e = 0; e < this.batches.length; e++) {
                  var i = this.batches[e];
                  (i.start = 0),
                    (i.attribStart = 0),
                    (i.style = null),
                    P.push(i);
                }
                this.batches.length = 0;
              }),
              (h.prototype.clear = function() {
                return (
                  this.graphicsData.length > 0 &&
                    (this.invalidate(),
                    this.clearDirty++,
                    (this.graphicsData.length = 0)),
                  this
                );
              }),
              (h.prototype.drawShape = function(t, e, i, r) {
                var s = new T(t, e, i, r);
                return this.graphicsData.push(s), this.dirty++, this;
              }),
              (h.prototype.drawHole = function(t, e) {
                if (!this.graphicsData.length) return null;
                var i = new T(t, null, null, e),
                  r = this.graphicsData[this.graphicsData.length - 1];
                return (
                  (i.lineStyle = r.lineStyle),
                  r.holes.push(i),
                  this.dirty++,
                  this
                );
              }),
              (h.prototype.destroy = function(t) {
                n.prototype.destroy.call(this, t);
                for (var e = 0; e < this.graphicsData.length; ++e)
                  this.graphicsData[e].destroy();
                (this.points.length = 0),
                  (this.points = null),
                  (this.colors.length = 0),
                  (this.colors = null),
                  (this.uvs.length = 0),
                  (this.uvs = null),
                  (this.indices.length = 0),
                  (this.indices = null),
                  this.indexBuffer.destroy(),
                  (this.indexBuffer = null),
                  (this.graphicsData.length = 0),
                  (this.graphicsData = null),
                  (this.drawCalls.length = 0),
                  (this.drawCalls = null),
                  (this.batches.length = 0),
                  (this.batches = null),
                  (this._bounds = null);
              }),
              (h.prototype.containsPoint = function(t) {
                for (var e = this.graphicsData, i = 0; i < e.length; ++i) {
                  var r = e[i];
                  if (
                    r.fillStyle.visible &&
                    r.shape &&
                      (r.matrix ? r.matrix.applyInverse(t, A) : A.copyFrom(t),
                      r.shape.contains(A.x, A.y))
                  ) {
                    var s = !1;
                    if (r.holes)
                      for (var n = 0; n < r.holes.length; n++) {
                        if (r.holes[n].shape.contains(A.x, A.y)) {
                          s = !0;
                          break;
                        }
                      }
                    if (!s) return !0;
                  }
                }
                return !1;
              }),
              (h.prototype.updateBatches = function() {
                if (this.graphicsData.length) {
                  if (this.validateBatching()) {
                    this.cacheDirty = this.dirty;
                    var t = this.uvs,
                      e = this.graphicsData,
                      i = null,
                      s = null;
                    this.batches.length > 0 &&
                      (s = (i = this.batches[this.batches.length - 1]).style);
                    for (var n = this.shapeIndex; n < e.length; n++) {
                      this.shapeIndex++;
                      var h = e[n],
                        a = h.fillStyle,
                        o = h.lineStyle;
                      w[h.type].build(h),
                        h.matrix && this.transformPoints(h.points, h.matrix);
                      for (var l = 0; l < 2; l++) {
                        var u = 0 === l ? a : o;
                        if (u.visible) {
                          var p = u.texture.baseTexture,
                            c = this.indices.length,
                            d = this.points.length / 2;
                          (p.wrapMode = r.WRAP_MODES.REPEAT),
                            i &&
                              !this._compareStyles(s, u) &&
                              (i.end(c, d), i.size > 0 && (i = null)),
                            i ||
                              ((i = P.pop() || new _()).begin(u, c, d),
                              this.batches.push(i),
                              (s = u));
                          var f = this.points.length / 2;
                          0 === l ? this.processFill(h) : this.processLine(h);
                          var y = this.points.length / 2 - f;
                          this.addUvs(
                            this.points,
                            t,
                            u.texture,
                            f,
                            y,
                            u.matrix
                          );
                        }
                      }
                    }
                    if (i) {
                      var g = this.indices.length,
                        v = this.points.length / 2;
                      i.end(g, v),
                        (this.indicesUint16 = new Uint16Array(this.indices)),
                        (this.batchable = this.isBatchable()),
                        this.batchable
                          ? this.packBatches()
                          : this.buildDrawCalls();
                    } else this.batchable = !0;
                  }
                } else this.batchable = !0;
              }),
              (h.prototype._compareStyles = function(t, e) {
                return (
                  !(!t || !e) &&
                  t.texture.baseTexture === e.texture.baseTexture &&
                    t.color + t.alpha === e.color + e.alpha &&
                      !!t.native == !!e.native
                );
              }),
              (h.prototype.validateBatching = function() {
                if (this.dirty === this.cacheDirty || !this.graphicsData.length)
                  return !1;
                for (var t = 0, e = this.graphicsData.length; t < e; t++) {
                  var i = this.graphicsData[t],
                    r = i.fillStyle,
                    s = i.lineStyle;
                  if (r && !r.texture.baseTexture.valid) return !1;
                  if (s && !s.texture.baseTexture.valid) return !1;
                }
                return !0;
              }),
              (h.prototype.packBatches = function() {
                this.batchDirty++,
                  (this.uvsFloat32 = new Float32Array(this.uvs));
                for (var t = this.batches, e = 0, i = t.length; e < i; e++)
                  for (var r = t[e], s = 0; s < r.size; s++) {
                    var n = r.start + s;
                    this.indicesUint16[n] =
                      this.indicesUint16[n] - r.attribStart;
                  }
              }),
              (h.prototype.isBatchable = function() {
                for (var t = this.batches, e = 0; e < t.length; e++)
                  if (t[e].style.native) return !1;
                return this.points.length < 2 * h.BATCHABLE_SIZE;
              }),
              (h.prototype.buildDrawCalls = function() {
                for (
                  var e = ++t.BaseTexture._globalBatch, i = 0;
                  i < this.drawCalls.length;
                  i++
                )
                  (this.drawCalls[i].textures.length = 0),
                    M.push(this.drawCalls[i]);
                this.drawCalls.length = 0;
                var s = this.colors,
                  n = this.textureIds,
                  h = M.pop();
                h ||
                  ((h = new t.BatchDrawCall()).textures = new t.BatchTextureArray()),
                  (h.textures.count = 0),
                  (h.start = 0),
                  (h.size = 0),
                  (h.type = r.DRAW_MODES.TRIANGLES);
                var a = 0,
                  o = null,
                  l = 0,
                  u = !1,
                  p = r.DRAW_MODES.TRIANGLES,
                  c = 0;
                this.drawCalls.push(h);
                for (var d = 0; d < this.batches.length; d++) {
                  var f = this.batches[d],
                    y = f.style,
                    g = y.texture.baseTexture;
                  u !== !!y.native &&
                    ((p = (u = !!y.native)
                      ? r.DRAW_MODES.LINES
                      : r.DRAW_MODES.TRIANGLES),
                    (o = null),
                    (a = 8),
                    e++),
                    o !== g &&
                      ((o = g),
                      g._batchEnabled !== e &&
                        (8 === a &&
                          (e++,
                          (a = 0),
                          h.size > 0 &&
                            ((h = M.pop()) ||
                              ((h = new t.BatchDrawCall()).textures = new t.BatchTextureArray()),
                            this.drawCalls.push(h)),
                          (h.start = c),
                          (h.size = 0),
                          (h.textures.count = 0),
                          (h.type = p)),
                        (g.touched = 1),
                        (g._batchEnabled = e),
                        (g._batchLocation = a),
                        (g.wrapMode = 10497),
                        (h.textures.elements[h.textures.count++] = g),
                        a++)),
                    (h.size += f.size),
                    (c += f.size),
                    (l = g._batchLocation),
                    this.addColors(s, y.color, y.alpha, f.attribSize),
                    this.addTextureIds(n, l, f.attribSize);
                }
                (t.BaseTexture._globalBatch = e), this.packAttributes();
              }),
              (h.prototype.packAttributes = function() {
                for (
                  var t = this.points,
                    e = this.uvs,
                    i = this.colors,
                    r = this.textureIds,
                    s = new ArrayBuffer(3 * t.length * 4),
                    n = new Float32Array(s),
                    h = new Uint32Array(s),
                    a = 0,
                    o = 0;
                  o < t.length / 2;
                  o++
                )
                  (n[a++] = t[2 * o]),
                    (n[a++] = t[2 * o + 1]),
                    (n[a++] = e[2 * o]),
                    (n[a++] = e[2 * o + 1]),
                    (h[a++] = i[o]),
                    (n[a++] = r[o]);
                this._buffer.update(s),
                  this._indexBuffer.update(this.indicesUint16);
              }),
              (h.prototype.processFill = function(t) {
                t.holes.length
                  ? (this.processHoles(t.holes), a.triangulate(t, this))
                  : w[t.type].triangulate(t, this);
              }),
              (h.prototype.processLine = function(t) {
                d(t, this);
                for (var e = 0; e < t.holes.length; e++) d(t.holes[e], this);
              }),
              (h.prototype.processHoles = function(t) {
                for (var e = 0; e < t.length; e++) {
                  var i = t[e];
                  w[i.type].build(i),
                    i.matrix && this.transformPoints(i.points, i.matrix);
                }
              }),
              (h.prototype.calculateBounds = function() {
                var t = this._bounds,
                  i = C,
                  r = e.Matrix.IDENTITY;
                this._bounds.clear(), i.clear();
                for (var s = 0; s < this.graphicsData.length; s++) {
                  var n = this.graphicsData[s],
                    h = n.shape,
                    a = n.type,
                    o = n.lineStyle,
                    l = n.matrix || e.Matrix.IDENTITY,
                    u = 0;
                  if (o && o.visible) {
                    var p = o.alignment;
                    (u = o.width),
                      a === e.SHAPES.POLY
                        ? (u *= 0.5 + Math.abs(0.5 - p))
                        : (u *= Math.max(0, p));
                  }
                  r !== l &&
                    (i.isEmpty() || (t.addBoundsMatrix(i, r), i.clear()),
                    (r = l)),
                    a === e.SHAPES.RECT || a === e.SHAPES.RREC
                      ? i.addFramePad(
                          h.x,
                          h.y,
                          h.x + h.width,
                          h.y + h.height,
                          u,
                          u
                        )
                      : a === e.SHAPES.CIRC
                      ? i.addFramePad(
                          h.x,
                          h.y,
                          h.x,
                          h.y,
                          h.radius + u,
                          h.radius + u
                        )
                      : a === e.SHAPES.ELIP
                      ? i.addFramePad(
                          h.x,
                          h.y,
                          h.x,
                          h.y,
                          h.width + u,
                          h.height + u
                        )
                      : t.addVerticesMatrix(
                          r,
                          h.points,
                          0,
                          h.points.length,
                          u,
                          u
                        );
                }
                i.isEmpty() || t.addBoundsMatrix(i, r),
                  t.pad(this.boundsPadding, this.boundsPadding);
              }),
              (h.prototype.transformPoints = function(t, e) {
                for (var i = 0; i < t.length / 2; i++) {
                  var r = t[2 * i],
                    s = t[2 * i + 1];
                  (t[2 * i] = e.a * r + e.c * s + e.tx),
                    (t[2 * i + 1] = e.b * r + e.d * s + e.ty);
                }
              }),
              (h.prototype.addColors = function(t, e, r, s) {
                for (
                  var n = (e >> 16) + (65280 & e) + ((255 & e) << 16),
                    h = (0, i.premultiplyTint)(n, r);
                  s-- > 0;

                )
                  t.push(h);
              }),
              (h.prototype.addTextureIds = function(t, e, i) {
                for (; i-- > 0; ) t.push(e);
              }),
              (h.prototype.addUvs = function(t, e, i, r, s, n) {
                for (var h = 0, a = e.length, o = i.frame; h < s; ) {
                  var l = t[2 * (r + h)],
                    u = t[2 * (r + h) + 1];
                  if (n) {
                    var p = n.a * l + n.c * u + n.tx;
                    (u = n.b * l + n.d * u + n.ty), (l = p);
                  }
                  h++, e.push(l / o.width, u / o.height);
                }
                var c = i.baseTexture;
                (o.width < c.width || o.height < c.height) &&
                  this.adjustUvs(e, i, a, s);
              }),
              (h.prototype.adjustUvs = function(t, e, i, r) {
                for (
                  var s = e.baseTexture,
                    n = i + 2 * r,
                    h = e.frame,
                    a = h.width / s.width,
                    o = h.height / s.height,
                    l = h.x / h.width,
                    u = h.y / h.height,
                    p = Math.floor(t[i] + 1e-6),
                    c = Math.floor(t[i + 1] + 1e-6),
                    d = i + 2;
                  d < n;
                  d += 2
                )
                  (p = Math.min(p, Math.floor(t[d] + 1e-6))),
                    (c = Math.min(c, Math.floor(t[d + 1] + 1e-6)));
                (l -= p), (u -= c);
                for (var f = i; f < n; f += 2)
                  (t[f] = (t[f] + l) * a), (t[f + 1] = (t[f + 1] + u) * o);
              }),
              Object.defineProperties(h.prototype, o),
              h
            );
          })(t.BatchGeometry);
        (exports.GraphicsGeometry = E), (E.BATCHABLE_SIZE = 100);
        var I = (function(t) {
          function e() {
            t.apply(this, arguments);
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.clone = function() {
              var t = new e();
              return (
                (t.color = this.color),
                (t.alpha = this.alpha),
                (t.texture = this.texture),
                (t.matrix = this.matrix),
                (t.visible = this.visible),
                (t.width = this.width),
                (t.alignment = this.alignment),
                (t.native = this.native),
                t
              );
            }),
            (e.prototype.reset = function() {
              t.prototype.reset.call(this),
                (this.color = 0),
                (this.width = 0),
                (this.alignment = 0.5),
                (this.native = !1);
            }),
            e
          );
        })(h);
        exports.LineStyle = I;
        var B = new Float32Array(3),
          R = {},
          L = (function(s) {
            function n(e) {
              void 0 === e && (e = null),
                s.call(this),
                (this.geometry = e || new E()),
                this.geometry.refCount++,
                (this.shader = null),
                (this.state = t.State.for2d()),
                (this._fillStyle = new h()),
                (this._lineStyle = new I()),
                (this._matrix = null),
                (this._holeMode = !1),
                (this.currentPath = null),
                (this.batches = []),
                (this.batchTint = -1),
                (this.vertexData = null),
                (this._transformID = -1),
                (this.batchDirty = -1),
                (this.pluginName = "batch"),
                (this.tint = 16777215),
                (this.blendMode = r.BLEND_MODES.NORMAL);
            }
            s && (n.__proto__ = s),
              (n.prototype = Object.create(s && s.prototype)),
              (n.prototype.constructor = n);
            var a = {
              blendMode: { configurable: !0 },
              tint: { configurable: !0 },
              fill: { configurable: !0 },
              line: { configurable: !0 }
            };
            return (
              (n.prototype.clone = function() {
                return this.finishPoly(), new n(this.geometry);
              }),
              (a.blendMode.set = function(t) {
                this.state.blendMode = t;
              }),
              (a.blendMode.get = function() {
                return this.state.blendMode;
              }),
              (a.tint.get = function() {
                return this._tint;
              }),
              (a.tint.set = function(t) {
                this._tint = t;
              }),
              (a.fill.get = function() {
                return this._fillStyle;
              }),
              (a.line.get = function() {
                return this._lineStyle;
              }),
              (n.prototype.lineStyle = function(t) {
                if ("number" == typeof t) {
                  var e = arguments;
                  t = {
                    width: e[0] || 0,
                    color: e[1] || 0,
                    alpha: void 0 !== e[2] ? e[2] : 1,
                    alignment: void 0 !== e[3] ? e[3] : 0.5,
                    native: !!e[4]
                  };
                }
                return this.lineTextureStyle(t);
              }),
              (n.prototype.lineTextureStyle = function(e) {
                if ("number" == typeof e) {
                  (0, i.deprecation)(
                    "v5.2.0",
                    "Please use object-based options for Graphics#lineTextureStyle"
                  );
                  var r = arguments[0],
                    s = arguments[1],
                    n = arguments[2],
                    h = arguments[3],
                    a = arguments[4],
                    o = arguments[5],
                    l = arguments[6];
                  (e = {
                    width: r,
                    texture: s,
                    color: n,
                    alpha: h,
                    matrix: a,
                    alignment: o,
                    native: l
                  }),
                    Object.keys(e).forEach(function(t) {
                      return void 0 === e[t] && delete e[t];
                    });
                }
                (e = Object.assign(
                  {
                    width: 0,
                    texture: t.Texture.WHITE,
                    color: e && e.texture ? 16777215 : 0,
                    alpha: 1,
                    matrix: null,
                    alignment: 0.5,
                    native: !1
                  },
                  e
                )),
                  this.currentPath && this.startPoly();
                var u = e.width > 0 && e.alpha > 0;
                return (
                  u
                    ? (e.matrix &&
                        ((e.matrix = e.matrix.clone()), e.matrix.invert()),
                      Object.assign(this._lineStyle, { visible: u }, e))
                    : this._lineStyle.reset(),
                  this
                );
              }),
              (n.prototype.startPoly = function() {
                if (this.currentPath) {
                  var t = this.currentPath.points,
                    i = this.currentPath.points.length;
                  i > 2 &&
                    (this.drawShape(this.currentPath),
                    (this.currentPath = new e.Polygon()),
                    (this.currentPath.closeStroke = !1),
                    this.currentPath.points.push(t[i - 2], t[i - 1]));
                } else
                  (this.currentPath = new e.Polygon()),
                    (this.currentPath.closeStroke = !1);
              }),
              (n.prototype.finishPoly = function() {
                this.currentPath &&
                  (this.currentPath.points.length > 2
                    ? (this.drawShape(this.currentPath),
                      (this.currentPath = null))
                    : (this.currentPath.points.length = 0));
              }),
              (n.prototype.moveTo = function(t, e) {
                return (
                  this.startPoly(),
                  (this.currentPath.points[0] = t),
                  (this.currentPath.points[1] = e),
                  this
                );
              }),
              (n.prototype.lineTo = function(t, e) {
                this.currentPath || this.moveTo(0, 0);
                var i = this.currentPath.points,
                  r = i[i.length - 2],
                  s = i[i.length - 1];
                return (r === t && s === e) || i.push(t, e), this;
              }),
              (n.prototype._initCurve = function(t, e) {
                void 0 === t && (t = 0),
                  void 0 === e && (e = 0),
                  this.currentPath
                    ? 0 === this.currentPath.points.length &&
                      (this.currentPath.points = [t, e])
                    : this.moveTo(t, e);
              }),
              (n.prototype.quadraticCurveTo = function(t, e, i, r) {
                this._initCurve();
                var s = this.currentPath.points;
                return (
                  0 === s.length && this.moveTo(0, 0),
                  S.curveTo(t, e, i, r, s),
                  this
                );
              }),
              (n.prototype.bezierCurveTo = function(t, e, i, r, s, n) {
                return (
                  this._initCurve(),
                  m.curveTo(t, e, i, r, s, n, this.currentPath.points),
                  this
                );
              }),
              (n.prototype.arcTo = function(t, e, i, r, s) {
                this._initCurve(t, e);
                var n = this.currentPath.points,
                  h = x.curveTo(t, e, i, r, s, n);
                if (h) {
                  var a = h.cx,
                    o = h.cy,
                    l = h.radius,
                    u = h.startAngle,
                    p = h.endAngle,
                    c = h.anticlockwise;
                  this.arc(a, o, l, u, p, c);
                }
                return this;
              }),
              (n.prototype.arc = function(t, i, r, s, n, h) {
                if ((void 0 === h && (h = !1), s === n)) return this;
                if (
                  (!h && n <= s ? (n += e.PI_2) : h && s <= n && (s += e.PI_2),
                  0 === n - s)
                )
                  return this;
                var a = t + Math.cos(s) * r,
                  o = i + Math.sin(s) * r,
                  l = this.geometry.closePointEps,
                  u = this.currentPath ? this.currentPath.points : null;
                if (u) {
                  var p = Math.abs(u[u.length - 2] - a),
                    c = Math.abs(u[u.length - 1] - o);
                  (p < l && c < l) || u.push(a, o);
                } else this.moveTo(a, o), (u = this.currentPath.points);
                return x.arc(a, o, t, i, r, s, n, h, u), this;
              }),
              (n.prototype.beginFill = function(e, i) {
                return (
                  void 0 === e && (e = 0),
                  void 0 === i && (i = 1),
                  this.beginTextureFill({
                    texture: t.Texture.WHITE,
                    color: e,
                    alpha: i
                  })
                );
              }),
              (n.prototype.beginTextureFill = function(e) {
                if (e instanceof t.Texture) {
                  (0, i.deprecation)(
                    "v5.2.0",
                    "Please use object-based options for Graphics#beginTextureFill"
                  );
                  var r = arguments[0],
                    s = arguments[1],
                    n = arguments[2],
                    h = arguments[3];
                  (e = { texture: r, color: s, alpha: n, matrix: h }),
                    Object.keys(e).forEach(function(t) {
                      return void 0 === e[t] && delete e[t];
                    });
                }
                (e = Object.assign(
                  {
                    texture: t.Texture.WHITE,
                    color: 16777215,
                    alpha: 1,
                    matrix: null
                  },
                  e
                )),
                  this.currentPath && this.startPoly();
                var a = e.alpha > 0;
                return (
                  a
                    ? (e.matrix &&
                        ((e.matrix = e.matrix.clone()), e.matrix.invert()),
                      Object.assign(this._fillStyle, { visible: a }, e))
                    : this._fillStyle.reset(),
                  this
                );
              }),
              (n.prototype.endFill = function() {
                return this.finishPoly(), this._fillStyle.reset(), this;
              }),
              (n.prototype.drawRect = function(t, i, r, s) {
                return this.drawShape(new e.Rectangle(t, i, r, s));
              }),
              (n.prototype.drawRoundedRect = function(t, i, r, s, n) {
                return this.drawShape(new e.RoundedRectangle(t, i, r, s, n));
              }),
              (n.prototype.drawCircle = function(t, i, r) {
                return this.drawShape(new e.Circle(t, i, r));
              }),
              (n.prototype.drawEllipse = function(t, i, r, s) {
                return this.drawShape(new e.Ellipse(t, i, r, s));
              }),
              (n.prototype.drawPolygon = function(t) {
                var i = arguments,
                  r = t,
                  s = !0;
                if (
                  (r.points && ((s = r.closeStroke), (r = r.points)),
                  !Array.isArray(r))
                ) {
                  r = new Array(arguments.length);
                  for (var n = 0; n < r.length; ++n) r[n] = i[n];
                }
                var h = new e.Polygon(r);
                return (h.closeStroke = s), this.drawShape(h), this;
              }),
              (n.prototype.drawShape = function(t) {
                return (
                  this._holeMode
                    ? this.geometry.drawHole(t, this._matrix)
                    : this.geometry.drawShape(
                        t,
                        this._fillStyle.clone(),
                        this._lineStyle.clone(),
                        this._matrix
                      ),
                  this
                );
              }),
              (n.prototype.drawStar = function(t, e, i, r, s, n) {
                return (
                  void 0 === n && (n = 0),
                  this.drawPolygon(new b(t, e, i, r, s, n))
                );
              }),
              (n.prototype.clear = function() {
                return (
                  this.geometry.clear(),
                  this._lineStyle.reset(),
                  this._fillStyle.reset(),
                  (this._matrix = null),
                  (this._holeMode = !1),
                  (this.currentPath = null),
                  this
                );
              }),
              (n.prototype.isFastRect = function() {
                return (
                  1 === this.geometry.graphicsData.length &&
                  this.geometry.graphicsData[0].shape.type === e.SHAPES.RECT &&
                  !this.geometry.graphicsData[0].lineWidth
                );
              }),
              (n.prototype._render = function(t) {
                this.finishPoly();
                var e = this.geometry;
                e.updateBatches(),
                  e.batchable
                    ? (this.batchDirty !== e.batchDirty &&
                        this._populateBatches(),
                      this._renderBatched(t))
                    : (t.batch.flush(), this._renderDirect(t));
              }),
              (n.prototype._populateBatches = function() {
                var t = this.geometry,
                  e = this.blendMode;
                (this.batches = []),
                  (this.batchTint = -1),
                  (this._transformID = -1),
                  (this.batchDirty = t.batchDirty),
                  (this.vertexData = new Float32Array(t.points));
                for (var r = 0, s = t.batches.length; r < s; r++) {
                  var n = t.batches[r],
                    h = n.style.color,
                    a = new Float32Array(
                      this.vertexData.buffer,
                      4 * n.attribStart * 2,
                      2 * n.attribSize
                    ),
                    o = new Float32Array(
                      t.uvsFloat32.buffer,
                      4 * n.attribStart * 2,
                      2 * n.attribSize
                    ),
                    l = {
                      vertexData: a,
                      blendMode: e,
                      indices: new Uint16Array(
                        t.indicesUint16.buffer,
                        2 * n.start,
                        n.size
                      ),
                      uvs: o,
                      _batchRGB: (0, i.hex2rgb)(h),
                      _tintRGB: h,
                      _texture: n.style.texture,
                      alpha: n.style.alpha,
                      worldAlpha: 1
                    };
                  this.batches[r] = l;
                }
              }),
              (n.prototype._renderBatched = function(t) {
                if (this.batches.length) {
                  t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                    this.calculateVertices(),
                    this.calculateTints();
                  for (var e = 0, i = this.batches.length; e < i; e++) {
                    var r = this.batches[e];
                    (r.worldAlpha = this.worldAlpha * r.alpha),
                      t.plugins[this.pluginName].render(r);
                  }
                }
              }),
              (n.prototype._renderDirect = function(t) {
                var e = this._resolveDirectShader(t),
                  i = this.geometry,
                  r = this.tint,
                  s = this.worldAlpha,
                  n = e.uniforms,
                  h = i.drawCalls;
                (n.translationMatrix = this.transform.worldTransform),
                  (n.tint[0] = (((r >> 16) & 255) / 255) * s),
                  (n.tint[1] = (((r >> 8) & 255) / 255) * s),
                  (n.tint[2] = ((255 & r) / 255) * s),
                  (n.tint[3] = s),
                  t.shader.bind(e),
                  t.geometry.bind(i, e),
                  t.state.set(this.state);
                for (var a = 0, o = h.length; a < o; a++)
                  this._renderDrawCallDirect(t, i.drawCalls[a]);
              }),
              (n.prototype._renderDrawCallDirect = function(t, e) {
                for (
                  var i = e.textures,
                    r = e.type,
                    s = e.size,
                    n = e.start,
                    h = i.count,
                    a = 0;
                  a < h;
                  a++
                )
                  t.texture.bind(i.elements[a], a);
                t.geometry.draw(r, s, n);
              }),
              (n.prototype._resolveDirectShader = function(i) {
                var r = this.shader,
                  s = this.pluginName;
                if (!r) {
                  if (!R[s]) {
                    for (var n = new Int32Array(16), h = 0; h < 16; h++)
                      n[h] = h;
                    var a = {
                        tint: new Float32Array([1, 1, 1, 1]),
                        translationMatrix: new e.Matrix(),
                        default: t.UniformGroup.from({ uSamplers: n }, !0)
                      },
                      o = i.plugins[s]._shader.program;
                    R[s] = new t.Shader(o, a);
                  }
                  r = R[s];
                }
                return r;
              }),
              (n.prototype._calculateBounds = function() {
                this.finishPoly();
                var t = this.geometry;
                if (t.graphicsData.length) {
                  var e = t.bounds,
                    i = e.minX,
                    r = e.minY,
                    s = e.maxX,
                    n = e.maxY;
                  this._bounds.addFrame(this.transform, i, r, s, n);
                }
              }),
              (n.prototype.containsPoint = function(t) {
                return (
                  this.worldTransform.applyInverse(t, n._TEMP_POINT),
                  this.geometry.containsPoint(n._TEMP_POINT)
                );
              }),
              (n.prototype.calculateTints = function() {
                if (this.batchTint !== this.tint) {
                  this.batchTint = this.tint;
                  for (
                    var t = (0, i.hex2rgb)(this.tint, B), e = 0;
                    e < this.batches.length;
                    e++
                  ) {
                    var r = this.batches[e],
                      s = r._batchRGB,
                      n =
                        ((t[0] * s[0] * 255) << 16) +
                        ((t[1] * s[1] * 255) << 8) +
                        (0 | (t[2] * s[2] * 255));
                    r._tintRGB = (n >> 16) + (65280 & n) + ((255 & n) << 16);
                  }
                }
              }),
              (n.prototype.calculateVertices = function() {
                if (this._transformID !== this.transform._worldID) {
                  this._transformID = this.transform._worldID;
                  for (
                    var t = this.transform.worldTransform,
                      e = t.a,
                      i = t.b,
                      r = t.c,
                      s = t.d,
                      n = t.tx,
                      h = t.ty,
                      a = this.geometry.points,
                      o = this.vertexData,
                      l = 0,
                      u = 0;
                    u < a.length;
                    u += 2
                  ) {
                    var p = a[u],
                      c = a[u + 1];
                    (o[l++] = e * p + r * c + n), (o[l++] = s * c + i * p + h);
                  }
                }
              }),
              (n.prototype.closePath = function() {
                var t = this.currentPath;
                return t && (t.closeStroke = !0), this;
              }),
              (n.prototype.setMatrix = function(t) {
                return (this._matrix = t), this;
              }),
              (n.prototype.beginHole = function() {
                return this.finishPoly(), (this._holeMode = !0), this;
              }),
              (n.prototype.endHole = function() {
                return this.finishPoly(), (this._holeMode = !1), this;
              }),
              (n.prototype.destroy = function(t) {
                s.prototype.destroy.call(this, t),
                  this.geometry.refCount--,
                  0 === this.geometry.refCount && this.geometry.dispose(),
                  (this._matrix = null),
                  (this.currentPath = null),
                  this._lineStyle.destroy(),
                  (this._lineStyle = null),
                  this._fillStyle.destroy(),
                  (this._fillStyle = null),
                  (this.geometry = null),
                  (this.shader = null),
                  (this.vertexData = null),
                  (this.batches.length = 0),
                  (this.batches = null),
                  s.prototype.destroy.call(this, t);
              }),
              Object.defineProperties(n.prototype, a),
              n
            );
          })(s.Container);
        (exports.Graphics = L), (L._TEMP_POINT = new e.Point());
      },
      {
        "@pixi/core": "p2j5",
        "@pixi/math": "oNQC",
        "@pixi/utils": "G5Tu",
        "@pixi/constants": "LQBK",
        "@pixi/display": "nL3p"
      }
    ],
    ueA8: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Sprite = void 0);
        var t = require("@pixi/math"),
          e = require("@pixi/utils"),
          i = require("@pixi/core"),
          r = require("@pixi/constants"),
          s = require("@pixi/display"),
          h = require("@pixi/settings"),
          n = new t.Point(),
          o = new Uint16Array([0, 1, 2, 0, 2, 3]),
          u = (function(s) {
            function u(e) {
              s.call(this),
                (this._anchor = new t.ObservablePoint(
                  this._onAnchorUpdate,
                  this,
                  e ? e.defaultAnchor.x : 0,
                  e ? e.defaultAnchor.y : 0
                )),
                (this._texture = null),
                (this._width = 0),
                (this._height = 0),
                (this._tint = null),
                (this._tintRGB = null),
                (this.tint = 16777215),
                (this.blendMode = r.BLEND_MODES.NORMAL),
                (this.shader = null),
                (this._cachedTint = 16777215),
                (this.uvs = null),
                (this.texture = e || i.Texture.EMPTY),
                (this.vertexData = new Float32Array(8)),
                (this.vertexTrimmedData = null),
                (this._transformID = -1),
                (this._textureID = -1),
                (this._transformTrimmedID = -1),
                (this._textureTrimmedID = -1),
                (this.indices = o),
                (this.size = 4),
                (this.start = 0),
                (this.pluginName = "batch"),
                (this.isSprite = !0),
                (this._roundPixels = h.settings.ROUND_PIXELS);
            }
            s && (u.__proto__ = s),
              (u.prototype = Object.create(s && s.prototype)),
              (u.prototype.constructor = u);
            var a = {
              roundPixels: { configurable: !0 },
              width: { configurable: !0 },
              height: { configurable: !0 },
              anchor: { configurable: !0 },
              tint: { configurable: !0 },
              texture: { configurable: !0 }
            };
            return (
              (u.prototype._onTextureUpdate = function() {
                (this._textureID = -1),
                  (this._textureTrimmedID = -1),
                  (this._cachedTint = 16777215),
                  this._width &&
                    (this.scale.x =
                      ((0, e.sign)(this.scale.x) * this._width) /
                      this._texture.orig.width),
                  this._height &&
                    (this.scale.y =
                      ((0, e.sign)(this.scale.y) * this._height) /
                      this._texture.orig.height);
              }),
              (u.prototype._onAnchorUpdate = function() {
                (this._transformID = -1), (this._transformTrimmedID = -1);
              }),
              (u.prototype.calculateVertices = function() {
                var t = this._texture;
                if (
                  this._transformID !== this.transform._worldID ||
                  this._textureID !== t._updateID
                ) {
                  this._textureID !== t._updateID &&
                    (this.uvs = this._texture._uvs.uvsFloat32),
                    (this._transformID = this.transform._worldID),
                    (this._textureID = t._updateID);
                  var e = this.transform.worldTransform,
                    i = e.a,
                    r = e.b,
                    s = e.c,
                    h = e.d,
                    n = e.tx,
                    o = e.ty,
                    u = this.vertexData,
                    a = t.trim,
                    _ = t.orig,
                    c = this._anchor,
                    d = 0,
                    l = 0,
                    x = 0,
                    p = 0;
                  if (
                    (a
                      ? ((d = (l = a.x - c._x * _.width) + a.width),
                        (x = (p = a.y - c._y * _.height) + a.height))
                      : ((d = (l = -c._x * _.width) + _.width),
                        (x = (p = -c._y * _.height) + _.height)),
                    (u[0] = i * l + s * p + n),
                    (u[1] = h * p + r * l + o),
                    (u[2] = i * d + s * p + n),
                    (u[3] = h * p + r * d + o),
                    (u[4] = i * d + s * x + n),
                    (u[5] = h * x + r * d + o),
                    (u[6] = i * l + s * x + n),
                    (u[7] = h * x + r * l + o),
                    this._roundPixels)
                  )
                    for (var f = 0; f < 8; f++) u[f] = Math.round(u[f]);
                }
              }),
              (u.prototype.calculateTrimmedVertices = function() {
                if (this.vertexTrimmedData) {
                  if (
                    this._transformTrimmedID === this.transform._worldID &&
                    this._textureTrimmedID === this._texture._updateID
                  )
                    return;
                } else this.vertexTrimmedData = new Float32Array(8);
                (this._transformTrimmedID = this.transform._worldID),
                  (this._textureTrimmedID = this._texture._updateID);
                var t = this._texture,
                  e = this.vertexTrimmedData,
                  i = t.orig,
                  r = this._anchor,
                  s = this.transform.worldTransform,
                  h = s.a,
                  n = s.b,
                  o = s.c,
                  u = s.d,
                  a = s.tx,
                  _ = s.ty,
                  c = -r._x * i.width,
                  d = c + i.width,
                  l = -r._y * i.height,
                  x = l + i.height;
                (e[0] = h * c + o * l + a),
                  (e[1] = u * l + n * c + _),
                  (e[2] = h * d + o * l + a),
                  (e[3] = u * l + n * d + _),
                  (e[4] = h * d + o * x + a),
                  (e[5] = u * x + n * d + _),
                  (e[6] = h * c + o * x + a),
                  (e[7] = u * x + n * c + _);
              }),
              (u.prototype._render = function(t) {
                this.calculateVertices(),
                  t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                  t.plugins[this.pluginName].render(this);
              }),
              (u.prototype._calculateBounds = function() {
                var t = this._texture.trim,
                  e = this._texture.orig;
                !t || (t.width === e.width && t.height === e.height)
                  ? (this.calculateVertices(),
                    this._bounds.addQuad(this.vertexData))
                  : (this.calculateTrimmedVertices(),
                    this._bounds.addQuad(this.vertexTrimmedData));
              }),
              (u.prototype.getLocalBounds = function(e) {
                return 0 === this.children.length
                  ? ((this._bounds.minX =
                      this._texture.orig.width * -this._anchor._x),
                    (this._bounds.minY =
                      this._texture.orig.height * -this._anchor._y),
                    (this._bounds.maxX =
                      this._texture.orig.width * (1 - this._anchor._x)),
                    (this._bounds.maxY =
                      this._texture.orig.height * (1 - this._anchor._y)),
                    e ||
                      (this._localBoundsRect ||
                        (this._localBoundsRect = new t.Rectangle()),
                      (e = this._localBoundsRect)),
                    this._bounds.getRectangle(e))
                  : s.prototype.getLocalBounds.call(this, e);
              }),
              (u.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, n);
                var e = this._texture.orig.width,
                  i = this._texture.orig.height,
                  r = -e * this.anchor.x,
                  s = 0;
                return (
                  n.x >= r &&
                  n.x < r + e &&
                  ((s = -i * this.anchor.y), n.y >= s && n.y < s + i)
                );
              }),
              (u.prototype.destroy = function(t) {
                if (
                  (s.prototype.destroy.call(this, t),
                  this._texture.off("update", this._onTextureUpdate, this),
                  (this._anchor = null),
                  "boolean" == typeof t ? t : t && t.texture)
                ) {
                  var e = "boolean" == typeof t ? t : t && t.baseTexture;
                  this._texture.destroy(!!e);
                }
                (this._texture = null), (this.shader = null);
              }),
              (u.from = function(t, e) {
                return new u(t instanceof i.Texture ? t : i.Texture.from(t, e));
              }),
              (a.roundPixels.set = function(t) {
                this._roundPixels !== t && (this._transformID = -1),
                  (this._roundPixels = t);
              }),
              (a.roundPixels.get = function() {
                return this._roundPixels;
              }),
              (a.width.get = function() {
                return Math.abs(this.scale.x) * this._texture.orig.width;
              }),
              (a.width.set = function(t) {
                var i = (0, e.sign)(this.scale.x) || 1;
                (this.scale.x = (i * t) / this._texture.orig.width),
                  (this._width = t);
              }),
              (a.height.get = function() {
                return Math.abs(this.scale.y) * this._texture.orig.height;
              }),
              (a.height.set = function(t) {
                var i = (0, e.sign)(this.scale.y) || 1;
                (this.scale.y = (i * t) / this._texture.orig.height),
                  (this._height = t);
              }),
              (a.anchor.get = function() {
                return this._anchor;
              }),
              (a.anchor.set = function(t) {
                this._anchor.copyFrom(t);
              }),
              (a.tint.get = function() {
                return this._tint;
              }),
              (a.tint.set = function(t) {
                (this._tint = t),
                  (this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16));
              }),
              (a.texture.get = function() {
                return this._texture;
              }),
              (a.texture.set = function(t) {
                this._texture !== t &&
                  (this._texture &&
                    this._texture.off("update", this._onTextureUpdate, this),
                  (this._texture = t || i.Texture.EMPTY),
                  (this._cachedTint = 16777215),
                  (this._textureID = -1),
                  (this._textureTrimmedID = -1),
                  t &&
                    (t.baseTexture.valid
                      ? this._onTextureUpdate()
                      : t.once("update", this._onTextureUpdate, this)));
              }),
              Object.defineProperties(u.prototype, a),
              u
            );
          })(s.Container);
        exports.Sprite = u;
      },
      {
        "@pixi/math": "oNQC",
        "@pixi/utils": "G5Tu",
        "@pixi/core": "p2j5",
        "@pixi/constants": "LQBK",
        "@pixi/display": "nL3p",
        "@pixi/settings": "t4Uo"
      }
    ],
    T62s: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TextStyle = exports.TextMetrics = exports.Text = exports.TEXT_GRADIENT = void 0);
        var t = require("@pixi/sprite"),
          e = require("@pixi/core"),
          i = require("@pixi/settings"),
          n = require("@pixi/math"),
          r = require("@pixi/utils"),
          o = { LINEAR_VERTICAL: 0, LINEAR_HORIZONTAL: 1 };
        exports.TEXT_GRADIENT = o;
        var s = {
            align: "left",
            breakWords: !1,
            dropShadow: !1,
            dropShadowAlpha: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 0,
            dropShadowColor: "black",
            dropShadowDistance: 5,
            fill: "black",
            fillGradientType: o.LINEAR_VERTICAL,
            fillGradientStops: [],
            fontFamily: "Arial",
            fontSize: 26,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "normal",
            letterSpacing: 0,
            lineHeight: 0,
            lineJoin: "miter",
            miterLimit: 10,
            padding: 0,
            stroke: "black",
            strokeThickness: 0,
            textBaseline: "alphabetic",
            trim: !1,
            whiteSpace: "pre",
            wordWrap: !1,
            wordWrapWidth: 100,
            leading: 0
          },
          a = [
            "serif",
            "sans-serif",
            "monospace",
            "cursive",
            "fantasy",
            "system-ui"
          ],
          h = function(t) {
            (this.styleID = 0), this.reset(), u(this, t, t);
          };
        exports.TextStyle = h;
        var l = {
          align: { configurable: !0 },
          breakWords: { configurable: !0 },
          dropShadow: { configurable: !0 },
          dropShadowAlpha: { configurable: !0 },
          dropShadowAngle: { configurable: !0 },
          dropShadowBlur: { configurable: !0 },
          dropShadowColor: { configurable: !0 },
          dropShadowDistance: { configurable: !0 },
          fill: { configurable: !0 },
          fillGradientType: { configurable: !0 },
          fillGradientStops: { configurable: !0 },
          fontFamily: { configurable: !0 },
          fontSize: { configurable: !0 },
          fontStyle: { configurable: !0 },
          fontVariant: { configurable: !0 },
          fontWeight: { configurable: !0 },
          letterSpacing: { configurable: !0 },
          lineHeight: { configurable: !0 },
          leading: { configurable: !0 },
          lineJoin: { configurable: !0 },
          miterLimit: { configurable: !0 },
          padding: { configurable: !0 },
          stroke: { configurable: !0 },
          strokeThickness: { configurable: !0 },
          textBaseline: { configurable: !0 },
          trim: { configurable: !0 },
          whiteSpace: { configurable: !0 },
          wordWrap: { configurable: !0 },
          wordWrapWidth: { configurable: !0 }
        };
        function f(t) {
          return "number" == typeof t
            ? (0, r.hex2string)(t)
            : ("string" == typeof t &&
                0 === t.indexOf("0x") &&
                (t = t.replace("0x", "#")),
              t);
        }
        function d(t) {
          if (Array.isArray(t)) {
            for (var e = 0; e < t.length; ++e) t[e] = f(t[e]);
            return t;
          }
          return f(t);
        }
        function c(t, e) {
          if (!Array.isArray(t) || !Array.isArray(e)) return !1;
          if (t.length !== e.length) return !1;
          for (var i = 0; i < t.length; ++i) if (t[i] !== e[i]) return !1;
          return !0;
        }
        function u(t, e, i) {
          for (var n in i)
            Array.isArray(e[n]) ? (t[n] = e[n].slice()) : (t[n] = e[n]);
        }
        (h.prototype.clone = function() {
          var t = {};
          return u(t, this, s), new h(t);
        }),
          (h.prototype.reset = function() {
            u(this, s, s);
          }),
          (l.align.get = function() {
            return this._align;
          }),
          (l.align.set = function(t) {
            this._align !== t && ((this._align = t), this.styleID++);
          }),
          (l.breakWords.get = function() {
            return this._breakWords;
          }),
          (l.breakWords.set = function(t) {
            this._breakWords !== t && ((this._breakWords = t), this.styleID++);
          }),
          (l.dropShadow.get = function() {
            return this._dropShadow;
          }),
          (l.dropShadow.set = function(t) {
            this._dropShadow !== t && ((this._dropShadow = t), this.styleID++);
          }),
          (l.dropShadowAlpha.get = function() {
            return this._dropShadowAlpha;
          }),
          (l.dropShadowAlpha.set = function(t) {
            this._dropShadowAlpha !== t &&
              ((this._dropShadowAlpha = t), this.styleID++);
          }),
          (l.dropShadowAngle.get = function() {
            return this._dropShadowAngle;
          }),
          (l.dropShadowAngle.set = function(t) {
            this._dropShadowAngle !== t &&
              ((this._dropShadowAngle = t), this.styleID++);
          }),
          (l.dropShadowBlur.get = function() {
            return this._dropShadowBlur;
          }),
          (l.dropShadowBlur.set = function(t) {
            this._dropShadowBlur !== t &&
              ((this._dropShadowBlur = t), this.styleID++);
          }),
          (l.dropShadowColor.get = function() {
            return this._dropShadowColor;
          }),
          (l.dropShadowColor.set = function(t) {
            var e = d(t);
            this._dropShadowColor !== e &&
              ((this._dropShadowColor = e), this.styleID++);
          }),
          (l.dropShadowDistance.get = function() {
            return this._dropShadowDistance;
          }),
          (l.dropShadowDistance.set = function(t) {
            this._dropShadowDistance !== t &&
              ((this._dropShadowDistance = t), this.styleID++);
          }),
          (l.fill.get = function() {
            return this._fill;
          }),
          (l.fill.set = function(t) {
            var e = d(t);
            this._fill !== e && ((this._fill = e), this.styleID++);
          }),
          (l.fillGradientType.get = function() {
            return this._fillGradientType;
          }),
          (l.fillGradientType.set = function(t) {
            this._fillGradientType !== t &&
              ((this._fillGradientType = t), this.styleID++);
          }),
          (l.fillGradientStops.get = function() {
            return this._fillGradientStops;
          }),
          (l.fillGradientStops.set = function(t) {
            c(this._fillGradientStops, t) ||
              ((this._fillGradientStops = t), this.styleID++);
          }),
          (l.fontFamily.get = function() {
            return this._fontFamily;
          }),
          (l.fontFamily.set = function(t) {
            this.fontFamily !== t && ((this._fontFamily = t), this.styleID++);
          }),
          (l.fontSize.get = function() {
            return this._fontSize;
          }),
          (l.fontSize.set = function(t) {
            this._fontSize !== t && ((this._fontSize = t), this.styleID++);
          }),
          (l.fontStyle.get = function() {
            return this._fontStyle;
          }),
          (l.fontStyle.set = function(t) {
            this._fontStyle !== t && ((this._fontStyle = t), this.styleID++);
          }),
          (l.fontVariant.get = function() {
            return this._fontVariant;
          }),
          (l.fontVariant.set = function(t) {
            this._fontVariant !== t &&
              ((this._fontVariant = t), this.styleID++);
          }),
          (l.fontWeight.get = function() {
            return this._fontWeight;
          }),
          (l.fontWeight.set = function(t) {
            this._fontWeight !== t && ((this._fontWeight = t), this.styleID++);
          }),
          (l.letterSpacing.get = function() {
            return this._letterSpacing;
          }),
          (l.letterSpacing.set = function(t) {
            this._letterSpacing !== t &&
              ((this._letterSpacing = t), this.styleID++);
          }),
          (l.lineHeight.get = function() {
            return this._lineHeight;
          }),
          (l.lineHeight.set = function(t) {
            this._lineHeight !== t && ((this._lineHeight = t), this.styleID++);
          }),
          (l.leading.get = function() {
            return this._leading;
          }),
          (l.leading.set = function(t) {
            this._leading !== t && ((this._leading = t), this.styleID++);
          }),
          (l.lineJoin.get = function() {
            return this._lineJoin;
          }),
          (l.lineJoin.set = function(t) {
            this._lineJoin !== t && ((this._lineJoin = t), this.styleID++);
          }),
          (l.miterLimit.get = function() {
            return this._miterLimit;
          }),
          (l.miterLimit.set = function(t) {
            this._miterLimit !== t && ((this._miterLimit = t), this.styleID++);
          }),
          (l.padding.get = function() {
            return this._padding;
          }),
          (l.padding.set = function(t) {
            this._padding !== t && ((this._padding = t), this.styleID++);
          }),
          (l.stroke.get = function() {
            return this._stroke;
          }),
          (l.stroke.set = function(t) {
            var e = d(t);
            this._stroke !== e && ((this._stroke = e), this.styleID++);
          }),
          (l.strokeThickness.get = function() {
            return this._strokeThickness;
          }),
          (l.strokeThickness.set = function(t) {
            this._strokeThickness !== t &&
              ((this._strokeThickness = t), this.styleID++);
          }),
          (l.textBaseline.get = function() {
            return this._textBaseline;
          }),
          (l.textBaseline.set = function(t) {
            this._textBaseline !== t &&
              ((this._textBaseline = t), this.styleID++);
          }),
          (l.trim.get = function() {
            return this._trim;
          }),
          (l.trim.set = function(t) {
            this._trim !== t && ((this._trim = t), this.styleID++);
          }),
          (l.whiteSpace.get = function() {
            return this._whiteSpace;
          }),
          (l.whiteSpace.set = function(t) {
            this._whiteSpace !== t && ((this._whiteSpace = t), this.styleID++);
          }),
          (l.wordWrap.get = function() {
            return this._wordWrap;
          }),
          (l.wordWrap.set = function(t) {
            this._wordWrap !== t && ((this._wordWrap = t), this.styleID++);
          }),
          (l.wordWrapWidth.get = function() {
            return this._wordWrapWidth;
          }),
          (l.wordWrapWidth.set = function(t) {
            this._wordWrapWidth !== t &&
              ((this._wordWrapWidth = t), this.styleID++);
          }),
          (h.prototype.toFontString = function() {
            var t =
                "number" == typeof this.fontSize
                  ? this.fontSize + "px"
                  : this.fontSize,
              e = this.fontFamily;
            Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
            for (var i = e.length - 1; i >= 0; i--) {
              var n = e[i].trim();
              !/([\"\'])[^\'\"]+\1/.test(n) &&
                a.indexOf(n) < 0 &&
                (n = '"' + n + '"'),
                (e[i] = n);
            }
            return (
              this.fontStyle +
              " " +
              this.fontVariant +
              " " +
              this.fontWeight +
              " " +
              t +
              " " +
              e.join(",")
            );
          }),
          Object.defineProperties(h.prototype, l);
        var g = function(t, e, i, n, r, o, s, a, h) {
          (this.text = t),
            (this.style = e),
            (this.width = i),
            (this.height = n),
            (this.lines = r),
            (this.lineWidths = o),
            (this.lineHeight = s),
            (this.maxLineWidth = a),
            (this.fontProperties = h);
        };
        (exports.TextMetrics = g),
          (g.measureText = function(t, e, i, n) {
            void 0 === n && (n = g._canvas), (i = null == i ? e.wordWrap : i);
            var r = e.toFontString(),
              o = g.measureFont(r);
            0 === o.fontSize &&
              ((o.fontSize = e.fontSize), (o.ascent = e.fontSize));
            var s = n.getContext("2d");
            s.font = r;
            for (
              var a = (i ? g.wordWrap(t, e, n) : t).split(/(?:\r\n|\r|\n)/),
                h = new Array(a.length),
                l = 0,
                f = 0;
              f < a.length;
              f++
            ) {
              var d =
                s.measureText(a[f]).width + (a[f].length - 1) * e.letterSpacing;
              (h[f] = d), (l = Math.max(l, d));
            }
            var c = l + e.strokeThickness;
            e.dropShadow && (c += e.dropShadowDistance);
            var u = e.lineHeight || o.fontSize + e.strokeThickness,
              p =
                Math.max(u, o.fontSize + e.strokeThickness) +
                (a.length - 1) * (u + e.leading);
            return (
              e.dropShadow && (p += e.dropShadowDistance),
              new g(t, e, c, p, a, h, u + e.leading, l, o)
            );
          }),
          (g.wordWrap = function(t, e, i) {
            void 0 === i && (i = g._canvas);
            for (
              var n = i.getContext("2d"),
                r = 0,
                o = "",
                s = "",
                a = {},
                h = e.letterSpacing,
                l = e.whiteSpace,
                f = g.collapseSpaces(l),
                d = g.collapseNewlines(l),
                c = !f,
                u = e.wordWrapWidth + h,
                p = g.tokenize(t),
                _ = 0;
              _ < p.length;
              _++
            ) {
              var S = p[_];
              if (g.isNewline(S)) {
                if (!d) {
                  (s += g.addLine(o)), (c = !f), (o = ""), (r = 0);
                  continue;
                }
                S = " ";
              }
              if (f) {
                var y = g.isBreakingSpace(S),
                  w = g.isBreakingSpace(o[o.length - 1]);
                if (y && w) continue;
              }
              var x = g.getFromCache(S, h, a, n);
              if (x > u)
                if (
                  ("" !== o && ((s += g.addLine(o)), (o = ""), (r = 0)),
                  g.canBreakWords(S, e.breakWords))
                )
                  for (var v = S.split(""), m = 0; m < v.length; m++) {
                    for (var b = v[m], k = 1; v[m + k]; ) {
                      var T = v[m + k],
                        I = b[b.length - 1];
                      if (g.canBreakChars(I, T, S, m, e.breakWords)) break;
                      (b += T), k++;
                    }
                    m += b.length - 1;
                    var D = g.getFromCache(b, h, a, n);
                    D + r > u &&
                      ((s += g.addLine(o)), (c = !1), (o = ""), (r = 0)),
                      (o += b),
                      (r += D);
                  }
                else {
                  o.length > 0 && ((s += g.addLine(o)), (o = ""), (r = 0));
                  var W = _ === p.length - 1;
                  (s += g.addLine(S, !W)), (c = !1), (o = ""), (r = 0);
                }
              else
                x + r > u && ((c = !1), (s += g.addLine(o)), (o = ""), (r = 0)),
                  (o.length > 0 || !g.isBreakingSpace(S) || c) &&
                    ((o += S), (r += x));
            }
            return (s += g.addLine(o, !1));
          }),
          (g.addLine = function(t, e) {
            return (
              void 0 === e && (e = !0),
              (t = g.trimRight(t)),
              (t = e ? t + "\n" : t)
            );
          }),
          (g.getFromCache = function(t, e, i, n) {
            var r = i[t];
            if (void 0 === r) {
              var o = t.length * e;
              (r = n.measureText(t).width + o), (i[t] = r);
            }
            return r;
          }),
          (g.collapseSpaces = function(t) {
            return "normal" === t || "pre-line" === t;
          }),
          (g.collapseNewlines = function(t) {
            return "normal" === t;
          }),
          (g.trimRight = function(t) {
            if ("string" != typeof t) return "";
            for (var e = t.length - 1; e >= 0; e--) {
              var i = t[e];
              if (!g.isBreakingSpace(i)) break;
              t = t.slice(0, -1);
            }
            return t;
          }),
          (g.isNewline = function(t) {
            return (
              "string" == typeof t && g._newlines.indexOf(t.charCodeAt(0)) >= 0
            );
          }),
          (g.isBreakingSpace = function(t) {
            return (
              "string" == typeof t &&
              g._breakingSpaces.indexOf(t.charCodeAt(0)) >= 0
            );
          }),
          (g.tokenize = function(t) {
            var e = [],
              i = "";
            if ("string" != typeof t) return e;
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              g.isBreakingSpace(r) || g.isNewline(r)
                ? ("" !== i && (e.push(i), (i = "")), e.push(r))
                : (i += r);
            }
            return "" !== i && e.push(i), e;
          }),
          (g.canBreakWords = function(t, e) {
            return e;
          }),
          (g.canBreakChars = function(t, e, i, n, r) {
            return !0;
          }),
          (g.measureFont = function(t) {
            if (g._fonts[t]) return g._fonts[t];
            var e = {},
              i = g._canvas,
              n = g._context;
            n.font = t;
            var r = g.METRICS_STRING + g.BASELINE_SYMBOL,
              o = Math.ceil(n.measureText(r).width),
              s = Math.ceil(n.measureText(g.BASELINE_SYMBOL).width),
              a = 2 * s;
            (s = (s * g.BASELINE_MULTIPLIER) | 0),
              (i.width = o),
              (i.height = a),
              (n.fillStyle = "#f00"),
              n.fillRect(0, 0, o, a),
              (n.font = t),
              (n.textBaseline = "alphabetic"),
              (n.fillStyle = "#000"),
              n.fillText(r, 0, s);
            var h = n.getImageData(0, 0, o, a).data,
              l = h.length,
              f = 4 * o,
              d = 0,
              c = 0,
              u = !1;
            for (d = 0; d < s; ++d) {
              for (var p = 0; p < f; p += 4)
                if (255 !== h[c + p]) {
                  u = !0;
                  break;
                }
              if (u) break;
              c += f;
            }
            for (e.ascent = s - d, c = l - f, u = !1, d = a; d > s; --d) {
              for (var _ = 0; _ < f; _ += 4)
                if (255 !== h[c + _]) {
                  u = !0;
                  break;
                }
              if (u) break;
              c -= f;
            }
            return (
              (e.descent = d - s),
              (e.fontSize = e.ascent + e.descent),
              (g._fonts[t] = e),
              e
            );
          }),
          (g.clearMetrics = function(t) {
            void 0 === t && (t = ""), t ? delete g._fonts[t] : (g._fonts = {});
          });
        var p = (function() {
          try {
            var t = new OffscreenCanvas(0, 0);
            return t.getContext("2d") ? t : document.createElement("canvas");
          } catch (e) {
            return document.createElement("canvas");
          }
        })();
        (p.width = p.height = 10),
          (g._canvas = p),
          (g._context = p.getContext("2d")),
          (g._fonts = {}),
          (g.METRICS_STRING = "|ÉqÅ"),
          (g.BASELINE_SYMBOL = "M"),
          (g.BASELINE_MULTIPLIER = 1.4),
          (g._newlines = [10, 13]),
          (g._breakingSpaces = [
            9,
            32,
            8192,
            8193,
            8194,
            8195,
            8196,
            8197,
            8198,
            8200,
            8201,
            8202,
            8287,
            12288
          ]);
        var _ = { texture: !0, children: !1, baseTexture: !0 },
          S = (function(t) {
            function s(r, o, s) {
              ((s = s || document.createElement("canvas")).width = 3),
                (s.height = 3);
              var a = e.Texture.from(s);
              (a.orig = new n.Rectangle()),
                (a.trim = new n.Rectangle()),
                t.call(this, a),
                (this.canvas = s),
                (this.context = this.canvas.getContext("2d")),
                (this._resolution = i.settings.RESOLUTION),
                (this._autoResolution = !0),
                (this._text = null),
                (this._style = null),
                (this._styleListener = null),
                (this._font = ""),
                (this.text = r),
                (this.style = o),
                (this.localStyleID = -1);
            }
            t && (s.__proto__ = t),
              (s.prototype = Object.create(t && t.prototype)),
              (s.prototype.constructor = s);
            var a = {
              width: { configurable: !0 },
              height: { configurable: !0 },
              style: { configurable: !0 },
              text: { configurable: !0 },
              resolution: { configurable: !0 }
            };
            return (
              (s.prototype.updateText = function(t) {
                var e = this._style;
                if (
                  (this.localStyleID !== e.styleID &&
                    ((this.dirty = !0), (this.localStyleID = e.styleID)),
                  this.dirty || !t)
                ) {
                  this._font = this._style.toFontString();
                  var i,
                    n,
                    o = this.context,
                    s = g.measureText(
                      this._text || " ",
                      this._style,
                      this._style.wordWrap,
                      this.canvas
                    ),
                    a = s.width,
                    h = s.height,
                    l = s.lines,
                    f = s.lineHeight,
                    d = s.lineWidths,
                    c = s.maxLineWidth,
                    u = s.fontProperties;
                  (this.canvas.width = Math.ceil(
                    (Math.max(1, a) + 2 * e.padding) * this._resolution
                  )),
                    (this.canvas.height = Math.ceil(
                      (Math.max(1, h) + 2 * e.padding) * this._resolution
                    )),
                    o.scale(this._resolution, this._resolution),
                    o.clearRect(0, 0, this.canvas.width, this.canvas.height),
                    (o.font = this._font),
                    (o.lineWidth = e.strokeThickness),
                    (o.textBaseline = e.textBaseline),
                    (o.lineJoin = e.lineJoin),
                    (o.miterLimit = e.miterLimit);
                  for (var p = e.dropShadow ? 2 : 1, _ = 0; _ < p; ++_) {
                    var S = e.dropShadow && 0 === _,
                      y = S ? 2 * h : 0,
                      w = y * this.resolution;
                    if (S) {
                      (o.fillStyle = "black"), (o.strokeStyle = "black");
                      var x = e.dropShadowColor,
                        v = (0, r.hex2rgb)(
                          "number" == typeof x ? x : (0, r.string2hex)(x)
                        );
                      (o.shadowColor =
                        "rgba(" +
                        255 * v[0] +
                        "," +
                        255 * v[1] +
                        "," +
                        255 * v[2] +
                        "," +
                        e.dropShadowAlpha +
                        ")"),
                        (o.shadowBlur = e.dropShadowBlur),
                        (o.shadowOffsetX =
                          Math.cos(e.dropShadowAngle) * e.dropShadowDistance),
                        (o.shadowOffsetY =
                          Math.sin(e.dropShadowAngle) * e.dropShadowDistance +
                          w);
                    } else
                      (o.fillStyle = this._generateFillStyle(e, l)),
                        (o.strokeStyle = e.stroke),
                        (o.shadowColor = 0),
                        (o.shadowBlur = 0),
                        (o.shadowOffsetX = 0),
                        (o.shadowOffsetY = 0);
                    for (var m = 0; m < l.length; m++)
                      (i = e.strokeThickness / 2),
                        (n = e.strokeThickness / 2 + m * f + u.ascent),
                        "right" === e.align
                          ? (i += c - d[m])
                          : "center" === e.align && (i += (c - d[m]) / 2),
                        e.stroke &&
                          e.strokeThickness &&
                          this.drawLetterSpacing(
                            l[m],
                            i + e.padding,
                            n + e.padding - y,
                            !0
                          ),
                        e.fill &&
                          this.drawLetterSpacing(
                            l[m],
                            i + e.padding,
                            n + e.padding - y
                          );
                  }
                  this.updateTexture();
                }
              }),
              (s.prototype.drawLetterSpacing = function(t, e, i, n) {
                void 0 === n && (n = !1);
                var r = this._style.letterSpacing;
                if (0 !== r)
                  for (
                    var o = e,
                      s = Array.from ? Array.from(t) : t.split(""),
                      a = this.context.measureText(t).width,
                      h = 0,
                      l = 0;
                    l < s.length;
                    ++l
                  ) {
                    var f = s[l];
                    n
                      ? this.context.strokeText(f, o, i)
                      : this.context.fillText(f, o, i),
                      (o +=
                        a -
                        (h = this.context.measureText(t.substring(l + 1))
                          .width) +
                        r),
                      (a = h);
                  }
                else
                  n
                    ? this.context.strokeText(t, e, i)
                    : this.context.fillText(t, e, i);
              }),
              (s.prototype.updateTexture = function() {
                var t = this.canvas;
                if (this._style.trim) {
                  var e = (0, r.trimCanvas)(t);
                  e.data &&
                    ((t.width = e.width),
                    (t.height = e.height),
                    this.context.putImageData(e.data, 0, 0));
                }
                var i = this._texture,
                  n = this._style,
                  o = n.trim ? 0 : n.padding,
                  s = i.baseTexture;
                (i.trim.width = i._frame.width = Math.ceil(
                  t.width / this._resolution
                )),
                  (i.trim.height = i._frame.height = Math.ceil(
                    t.height / this._resolution
                  )),
                  (i.trim.x = -o),
                  (i.trim.y = -o),
                  (i.orig.width = i._frame.width - 2 * o),
                  (i.orig.height = i._frame.height - 2 * o),
                  this._onTextureUpdate(),
                  s.setRealSize(t.width, t.height, this._resolution),
                  (this.dirty = !1);
              }),
              (s.prototype._render = function(e) {
                this._autoResolution &&
                  this._resolution !== e.resolution &&
                  ((this._resolution = e.resolution), (this.dirty = !0)),
                  this.updateText(!0),
                  t.prototype._render.call(this, e);
              }),
              (s.prototype.getLocalBounds = function(e) {
                return (
                  this.updateText(!0), t.prototype.getLocalBounds.call(this, e)
                );
              }),
              (s.prototype._calculateBounds = function() {
                this.updateText(!0),
                  this.calculateVertices(),
                  this._bounds.addQuad(this.vertexData);
              }),
              (s.prototype._onStyleChange = function() {
                this.dirty = !0;
              }),
              (s.prototype._generateFillStyle = function(t, e) {
                if (!Array.isArray(t.fill)) return t.fill;
                if (1 === t.fill.length) return t.fill[0];
                var i,
                  n,
                  r,
                  s,
                  a = Math.ceil(this.canvas.width / this._resolution),
                  h = Math.ceil(this.canvas.height / this._resolution),
                  l = t.fill.slice(),
                  f = t.fillGradientStops.slice();
                if (!f.length)
                  for (var d = l.length + 1, c = 1; c < d; ++c) f.push(c / d);
                if (
                  (l.unshift(t.fill[0]),
                  f.unshift(0),
                  l.push(t.fill[t.fill.length - 1]),
                  f.push(1),
                  t.fillGradientType === o.LINEAR_VERTICAL)
                ) {
                  (i = this.context.createLinearGradient(a / 2, 0, a / 2, h)),
                    (n = (l.length + 1) * e.length),
                    (r = 0);
                  for (var u = 0; u < e.length; u++) {
                    r += 1;
                    for (var g = 0; g < l.length; g++)
                      (s =
                        "number" == typeof f[g]
                          ? f[g] / e.length + u / e.length
                          : r / n),
                        i.addColorStop(s, l[g]),
                        r++;
                  }
                } else {
                  (i = this.context.createLinearGradient(0, h / 2, a, h / 2)),
                    (n = l.length + 1),
                    (r = 1);
                  for (var p = 0; p < l.length; p++)
                    (s = "number" == typeof f[p] ? f[p] : r / n),
                      i.addColorStop(s, l[p]),
                      r++;
                }
                return i;
              }),
              (s.prototype.destroy = function(e) {
                "boolean" == typeof e && (e = { children: e }),
                  (e = Object.assign({}, _, e)),
                  t.prototype.destroy.call(this, e),
                  (this.context = null),
                  (this.canvas = null),
                  (this._style = null);
              }),
              (a.width.get = function() {
                return (
                  this.updateText(!0),
                  Math.abs(this.scale.x) * this._texture.orig.width
                );
              }),
              (a.width.set = function(t) {
                this.updateText(!0);
                var e = (0, r.sign)(this.scale.x) || 1;
                (this.scale.x = (e * t) / this._texture.orig.width),
                  (this._width = t);
              }),
              (a.height.get = function() {
                return (
                  this.updateText(!0),
                  Math.abs(this.scale.y) * this._texture.orig.height
                );
              }),
              (a.height.set = function(t) {
                this.updateText(!0);
                var e = (0, r.sign)(this.scale.y) || 1;
                (this.scale.y = (e * t) / this._texture.orig.height),
                  (this._height = t);
              }),
              (a.style.get = function() {
                return this._style;
              }),
              (a.style.set = function(t) {
                (t = t || {}),
                  (this._style = t instanceof h ? t : new h(t)),
                  (this.localStyleID = -1),
                  (this.dirty = !0);
              }),
              (a.text.get = function() {
                return this._text;
              }),
              (a.text.set = function(t) {
                (t = String(null == t ? "" : t)),
                  this._text !== t && ((this._text = t), (this.dirty = !0));
              }),
              (a.resolution.get = function() {
                return this._resolution;
              }),
              (a.resolution.set = function(t) {
                (this._autoResolution = !1),
                  this._resolution !== t &&
                    ((this._resolution = t), (this.dirty = !0));
              }),
              Object.defineProperties(s.prototype, a),
              s
            );
          })(t.Sprite);
        exports.Text = S;
      },
      {
        "@pixi/sprite": "ueA8",
        "@pixi/core": "p2j5",
        "@pixi/settings": "t4Uo",
        "@pixi/math": "oNQC",
        "@pixi/utils": "G5Tu"
      }
    ],
    EBFb: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TimeLimiter = exports.Prepare = exports.CountLimiter = exports.BasePrepare = void 0);
        var e = require("@pixi/settings"),
          t = require("@pixi/core"),
          i = require("@pixi/graphics"),
          r = require("@pixi/ticker"),
          s = require("@pixi/display"),
          o = require("@pixi/text");
        e.settings.UPLOADS_PER_FRAME = 4;
        var n = function(e) {
          (this.maxItemsPerFrame = e), (this.itemsLeft = 0);
        };
        (exports.CountLimiter = n),
          (n.prototype.beginFrame = function() {
            this.itemsLeft = this.maxItemsPerFrame;
          }),
          (n.prototype.allowedToUpload = function() {
            return this.itemsLeft-- > 0;
          });
        var u = function(t) {
          var i = this;
          (this.limiter = new n(e.settings.UPLOADS_PER_FRAME)),
            (this.renderer = t),
            (this.uploadHookHelper = null),
            (this.queue = []),
            (this.addHooks = []),
            (this.uploadHooks = []),
            (this.completes = []),
            (this.ticking = !1),
            (this.delayedTick = function() {
              i.queue && i.prepareItems();
            }),
            this.registerFindHook(d),
            this.registerFindHook(f),
            this.registerFindHook(a),
            this.registerFindHook(h),
            this.registerFindHook(p),
            this.registerUploadHook(l),
            this.registerUploadHook(c);
        };
        function a(e, i) {
          var r = !1;
          if (e && e._textures && e._textures.length)
            for (var s = 0; s < e._textures.length; s++)
              if (e._textures[s] instanceof t.Texture) {
                var o = e._textures[s].baseTexture;
                -1 === i.indexOf(o) && (i.push(o), (r = !0));
              }
          return r;
        }
        function h(e, i) {
          if (e.baseTexture instanceof t.BaseTexture) {
            var r = e.baseTexture;
            return -1 === i.indexOf(r) && i.push(r), !0;
          }
          return !1;
        }
        function p(e, i) {
          if (e._texture && e._texture instanceof t.Texture) {
            var r = e._texture.baseTexture;
            return -1 === i.indexOf(r) && i.push(r), !0;
          }
          return !1;
        }
        function l(e, t) {
          return t instanceof o.Text && (t.updateText(!0), !0);
        }
        function c(e, t) {
          if (t instanceof o.TextStyle) {
            var i = t.toFontString();
            return o.TextMetrics.measureFont(i), !0;
          }
          return !1;
        }
        function d(e, t) {
          if (e instanceof o.Text) {
            -1 === t.indexOf(e.style) && t.push(e.style),
              -1 === t.indexOf(e) && t.push(e);
            var i = e._texture.baseTexture;
            return -1 === t.indexOf(i) && t.push(i), !0;
          }
          return !1;
        }
        function f(e, t) {
          return (
            e instanceof o.TextStyle && (-1 === t.indexOf(e) && t.push(e), !0)
          );
        }
        (exports.BasePrepare = u),
          (u.prototype.upload = function(e, t) {
            "function" == typeof e && ((t = e), (e = null)),
              e && this.add(e),
              this.queue.length
                ? (t && this.completes.push(t),
                  this.ticking ||
                    ((this.ticking = !0),
                    r.Ticker.system.addOnce(
                      this.tick,
                      this,
                      r.UPDATE_PRIORITY.UTILITY
                    )))
                : t && t();
          }),
          (u.prototype.tick = function() {
            setTimeout(this.delayedTick, 0);
          }),
          (u.prototype.prepareItems = function() {
            for (
              this.limiter.beginFrame();
              this.queue.length && this.limiter.allowedToUpload();

            ) {
              var e = this.queue[0],
                t = !1;
              if (e && !e._destroyed)
                for (var i = 0, s = this.uploadHooks.length; i < s; i++)
                  if (this.uploadHooks[i](this.uploadHookHelper, e)) {
                    this.queue.shift(), (t = !0);
                    break;
                  }
              t || this.queue.shift();
            }
            if (this.queue.length)
              r.Ticker.system.addOnce(
                this.tick,
                this,
                r.UPDATE_PRIORITY.UTILITY
              );
            else {
              this.ticking = !1;
              var o = this.completes.slice(0);
              this.completes.length = 0;
              for (var n = 0, u = o.length; n < u; n++) o[n]();
            }
          }),
          (u.prototype.registerFindHook = function(e) {
            return e && this.addHooks.push(e), this;
          }),
          (u.prototype.registerUploadHook = function(e) {
            return e && this.uploadHooks.push(e), this;
          }),
          (u.prototype.add = function(e) {
            for (
              var t = 0, i = this.addHooks.length;
              t < i && !this.addHooks[t](e, this.queue);
              t++
            );
            if (e instanceof s.Container)
              for (var r = e.children.length - 1; r >= 0; r--)
                this.add(e.children[r]);
            return this;
          }),
          (u.prototype.destroy = function() {
            this.ticking && r.Ticker.system.remove(this.tick, this),
              (this.ticking = !1),
              (this.addHooks = null),
              (this.uploadHooks = null),
              (this.renderer = null),
              (this.completes = null),
              (this.queue = null),
              (this.limiter = null),
              (this.uploadHookHelper = null);
          });
        var x = (function(e) {
          function t(t) {
            e.call(this, t),
              (this.uploadHookHelper = this.renderer),
              this.registerFindHook(g),
              this.registerUploadHook(k),
              this.registerUploadHook(m);
          }
          return (
            e && (t.__proto__ = e),
            (t.prototype = Object.create(e && e.prototype)),
            (t.prototype.constructor = t),
            t
          );
        })(u);
        function k(e, i) {
          return (
            i instanceof t.BaseTexture &&
            (i._glTextures[e.CONTEXT_UID] || e.texture.bind(i), !0)
          );
        }
        function m(e, t) {
          if (!(t instanceof i.Graphics)) return !1;
          var r = t.geometry;
          t.finishPoly(), r.updateBatches();
          for (var s = r.batches, o = 0; o < s.length; o++) {
            var n = s[o].style.texture;
            n && k(e, n.baseTexture);
          }
          return (
            r.batchable || e.geometry.bind(r, t._resolveDirectShader()), !0
          );
        }
        function g(e, t) {
          return e instanceof i.Graphics && (t.push(e), !0);
        }
        exports.Prepare = x;
        var T = function(e) {
          (this.maxMilliseconds = e), (this.frameStart = 0);
        };
        (exports.TimeLimiter = T),
          (T.prototype.beginFrame = function() {
            this.frameStart = Date.now();
          }),
          (T.prototype.allowedToUpload = function() {
            return Date.now() - this.frameStart < this.maxMilliseconds;
          });
      },
      {
        "@pixi/settings": "t4Uo",
        "@pixi/core": "p2j5",
        "@pixi/graphics": "KxlN",
        "@pixi/ticker": "F3Q6",
        "@pixi/display": "nL3p",
        "@pixi/text": "T62s"
      }
    ],
    aWkH: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Application = void 0);
        var e = require("@pixi/display"),
          i = require("@pixi/core"),
          r = function r(t) {
            var n = this;
            (t = Object.assign({ forceCanvas: !1 }, t)),
              (this.renderer = (0, i.autoDetectRenderer)(t)),
              (this.stage = new e.Container()),
              r._plugins.forEach(function(e) {
                e.init.call(n, t);
              });
          };
        exports.Application = r;
        var t = { view: { configurable: !0 }, screen: { configurable: !0 } };
        (r.registerPlugin = function(e) {
          r._plugins.push(e);
        }),
          (r.prototype.render = function() {
            this.renderer.render(this.stage);
          }),
          (t.view.get = function() {
            return this.renderer.view;
          }),
          (t.screen.get = function() {
            return this.renderer.screen;
          }),
          (r.prototype.destroy = function(e, i) {
            var t = this,
              n = r._plugins.slice(0);
            n.reverse(),
              n.forEach(function(e) {
                e.destroy.call(t);
              }),
              this.stage.destroy(i),
              (this.stage = null),
              this.renderer.destroy(e),
              (this.renderer = null),
              (this._options = null);
          }),
          Object.defineProperties(r.prototype, t),
          (r._plugins = []);
        var n = function() {};
        (n.init = function(e) {
          var i = this;
          Object.defineProperty(this, "resizeTo", {
            set: function(e) {
              window.removeEventListener("resize", this.resize),
                (this._resizeTo = e),
                e &&
                  (window.addEventListener("resize", this.resize),
                  this.resize());
            },
            get: function() {
              return this._resizeTo;
            }
          }),
            (this.resize = function() {
              i._resizeTo &&
                (i._resizeTo === window
                  ? i.renderer.resize(window.innerWidth, window.innerHeight)
                  : i.renderer.resize(
                      i._resizeTo.clientWidth,
                      i._resizeTo.clientHeight
                    ));
            }),
            (this._resizeTo = null),
            (this.resizeTo = e.resizeTo || null);
        }),
          (n.destroy = function() {
            (this.resizeTo = null), (this.resize = null);
          }),
          r.registerPlugin(n);
      },
      { "@pixi/display": "nL3p", "@pixi/core": "p2j5" }
    ],
    sX7F: [
      function(require, module, exports) {
        "use strict";
        module.exports = function(e, r) {
          r = r || {};
          for (
            var o = {
                key: [
                  "source",
                  "protocol",
                  "authority",
                  "userInfo",
                  "user",
                  "password",
                  "host",
                  "port",
                  "relative",
                  "path",
                  "directory",
                  "file",
                  "query",
                  "anchor"
                ],
                q: { name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g },
                parser: {
                  strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                  loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
              },
              t = o.parser[r.strictMode ? "strict" : "loose"].exec(e),
              s = {},
              a = 14;
            a--;

          )
            s[o.key[a]] = t[a] || "";
          return (
            (s[o.q.name] = {}),
            s[o.key[12]].replace(o.q.parser, function(e, r, t) {
              r && (s[o.q.name][r] = t);
            }),
            s
          );
        };
      },
      {}
    ],
    vKdq: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var n = (function() {
          function n(n, t) {
            for (var e = 0; e < t.length; e++) {
              var i = t[e];
              (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(n, i.key, i);
            }
          }
          return function(t, e, i) {
            return e && n(t.prototype, e), i && n(t, i), t;
          };
        })();
        function t(n, t) {
          if (!(n instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var e = (function() {
          function e(n, i, r) {
            void 0 === i && (i = !1),
              t(this, e),
              (this._fn = n),
              (this._once = i),
              (this._thisArg = r),
              (this._next = this._prev = this._owner = null);
          }
          return (
            n(e, [
              {
                key: "detach",
                value: function() {
                  return null !== this._owner && (this._owner.detach(this), !0);
                }
              }
            ]),
            e
          );
        })();
        function i(n, t) {
          return (
            n._head
              ? ((n._tail._next = t), (t._prev = n._tail), (n._tail = t))
              : ((n._head = t), (n._tail = t)),
            (t._owner = n),
            t
          );
        }
        var r = (function() {
          function r() {
            t(this, r), (this._head = this._tail = void 0);
          }
          return (
            n(r, [
              {
                key: "handlers",
                value: function() {
                  var n =
                      !(arguments.length <= 0 || void 0 === arguments[0]) &&
                      arguments[0],
                    t = this._head;
                  if (n) return !!t;
                  for (var e = []; t; ) e.push(t), (t = t._next);
                  return e;
                }
              },
              {
                key: "has",
                value: function(n) {
                  if (!(n instanceof e))
                    throw new Error(
                      "MiniSignal#has(): First arg must be a MiniSignalBinding object."
                    );
                  return n._owner === this;
                }
              },
              {
                key: "dispatch",
                value: function() {
                  var n = this._head;
                  if (!n) return !1;
                  for (; n; )
                    n._once && this.detach(n),
                      n._fn.apply(n._thisArg, arguments),
                      (n = n._next);
                  return !0;
                }
              },
              {
                key: "add",
                value: function(n) {
                  var t =
                    arguments.length <= 1 || void 0 === arguments[1]
                      ? null
                      : arguments[1];
                  if ("function" != typeof n)
                    throw new Error(
                      "MiniSignal#add(): First arg must be a Function."
                    );
                  return i(this, new e(n, !1, t));
                }
              },
              {
                key: "once",
                value: function(n) {
                  var t =
                    arguments.length <= 1 || void 0 === arguments[1]
                      ? null
                      : arguments[1];
                  if ("function" != typeof n)
                    throw new Error(
                      "MiniSignal#once(): First arg must be a Function."
                    );
                  return i(this, new e(n, !0, t));
                }
              },
              {
                key: "detach",
                value: function(n) {
                  if (!(n instanceof e))
                    throw new Error(
                      "MiniSignal#detach(): First arg must be a MiniSignalBinding object."
                    );
                  return n._owner !== this
                    ? this
                    : (n._prev && (n._prev._next = n._next),
                      n._next && (n._next._prev = n._prev),
                      n === this._head
                        ? ((this._head = n._next),
                          null === n._next && (this._tail = null))
                        : n === this._tail &&
                          ((this._tail = n._prev), (this._tail._next = null)),
                      (n._owner = null),
                      this);
                }
              },
              {
                key: "detachAll",
                value: function() {
                  var n = this._head;
                  if (!n) return this;
                  for (this._head = this._tail = null; n; )
                    (n._owner = null), (n = n._next);
                  return this;
                }
              }
            ]),
            r
          );
        })();
        (r.MiniSignalBinding = e),
          (exports.default = r),
          (module.exports = exports.default);
      },
      {}
    ],
    OCxJ: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.encodeBinary = b),
          (exports.middleware = exports.async = exports.Resource = exports.Loader = void 0);
        var t = r(require("parse-uri")),
          e = r(require("mini-signals"));
        function r(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function i() {}
        function s(t, e, r, i) {
          var s = 0,
            n = t.length;
          !(function o(a) {
            a || s === n
              ? r && r(a)
              : i
              ? setTimeout(function() {
                  e(t[s++], o);
                }, 1)
              : e(t[s++], o);
          })();
        }
        function n(t) {
          return function() {
            if (null === t) throw new Error("Callback was already called.");
            var e = t;
            (t = null), e.apply(this, arguments);
          };
        }
        function o(t, e) {
          if (null == e) e = 1;
          else if (0 === e) throw new Error("Concurrency must not be zero");
          var r = 0,
            s = {
              _tasks: [],
              concurrency: e,
              saturated: i,
              unsaturated: i,
              buffer: e / 4,
              empty: i,
              drain: i,
              error: i,
              started: !1,
              paused: !1,
              push: function(t, e) {
                o(t, !1, e);
              },
              kill: function() {
                (r = 0), (s.drain = i), (s.started = !1), (s._tasks = []);
              },
              unshift: function(t, e) {
                o(t, !0, e);
              },
              process: function() {
                for (; !s.paused && r < s.concurrency && s._tasks.length; ) {
                  var e = s._tasks.shift();
                  0 === s._tasks.length && s.empty(),
                    (r += 1) === s.concurrency && s.saturated(),
                    t(e.data, n(a(e)));
                }
              },
              length: function() {
                return s._tasks.length;
              },
              running: function() {
                return r;
              },
              idle: function() {
                return s._tasks.length + r === 0;
              },
              pause: function() {
                !0 !== s.paused && (s.paused = !0);
              },
              resume: function() {
                if (!1 !== s.paused) {
                  s.paused = !1;
                  for (var t = 1; t <= s.concurrency; t++) s.process();
                }
              }
            };
          function o(t, e, r) {
            if (null != r && "function" != typeof r)
              throw new Error("task callback must be a function");
            if (((s.started = !0), null == t && s.idle()))
              setTimeout(function() {
                return s.drain();
              }, 1);
            else {
              var n = { data: t, callback: "function" == typeof r ? r : i };
              e ? s._tasks.unshift(n) : s._tasks.push(n),
                setTimeout(function() {
                  return s.process();
                }, 1);
            }
          }
          function a(t) {
            return function() {
              (r -= 1),
                t.callback.apply(t, arguments),
                null != arguments[0] && s.error(arguments[0], t.data),
                r <= s.concurrency - s.buffer && s.unsaturated(),
                s.idle() && s.drain(),
                s.process();
            };
          }
          return s;
        }
        var a = { eachSeries: s, queue: o };
        exports.async = a;
        var h = {};
        function u(t, e) {
          var r = this;
          h[t.url]
            ? ((t.data = h[t.url]), t.complete())
            : t.onComplete.once(function() {
                return (h[r.url] = r.data);
              }),
            e();
        }
        function d(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        function l(t, e, r) {
          return e && d(t.prototype, e), r && d(t, r), t;
        }
        var c = !(
            !window.XDomainRequest || "withCredentials" in new XMLHttpRequest()
          ),
          _ = null,
          E = 0,
          f = 200,
          p = 204,
          T = 1223,
          O = 2;
        function g() {}
        var m = (function() {
          function r(t, i, s) {
            if ("string" != typeof t || "string" != typeof i)
              throw new Error(
                "Both name and url are required for constructing a resource."
              );
            (s = s || {}),
              (this._flags = 0),
              this._setFlag(r.STATUS_FLAGS.DATA_URL, 0 === i.indexOf("data:")),
              (this.name = t),
              (this.url = i),
              (this.extension = this._getExtension()),
              (this.data = null),
              (this.crossOrigin =
                !0 === s.crossOrigin ? "anonymous" : s.crossOrigin),
              (this.timeout = s.timeout || 0),
              (this.loadType = s.loadType || this._determineLoadType()),
              (this.xhrType = s.xhrType),
              (this.metadata = s.metadata || {}),
              (this.error = null),
              (this.xhr = null),
              (this.children = []),
              (this.type = r.TYPE.UNKNOWN),
              (this.progressChunk = 0),
              (this._dequeue = g),
              (this._onLoadBinding = null),
              (this._elementTimer = 0),
              (this._boundComplete = this.complete.bind(this)),
              (this._boundOnError = this._onError.bind(this)),
              (this._boundOnProgress = this._onProgress.bind(this)),
              (this._boundOnTimeout = this._onTimeout.bind(this)),
              (this._boundXhrOnError = this._xhrOnError.bind(this)),
              (this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this)),
              (this._boundXhrOnAbort = this._xhrOnAbort.bind(this)),
              (this._boundXhrOnLoad = this._xhrOnLoad.bind(this)),
              (this.onStart = new e.default()),
              (this.onProgress = new e.default()),
              (this.onComplete = new e.default()),
              (this.onAfterMiddleware = new e.default());
          }
          (r.setExtensionLoadType = function(t, e) {
            P(r._loadTypeMap, t, e);
          }),
            (r.setExtensionXhrType = function(t, e) {
              P(r._xhrTypeMap, t, e);
            });
          var i = r.prototype;
          return (
            (i.complete = function() {
              this._clearEvents(), this._finish();
            }),
            (i.abort = function(t) {
              if (!this.error) {
                if (
                  ((this.error = new Error(t)), this._clearEvents(), this.xhr)
                )
                  this.xhr.abort();
                else if (this.xdr) this.xdr.abort();
                else if (this.data)
                  if (this.data.src) this.data.src = r.EMPTY_GIF;
                  else
                    for (; this.data.firstChild; )
                      this.data.removeChild(this.data.firstChild);
                this._finish();
              }
            }),
            (i.load = function(t) {
              var e = this;
              if (!this.isLoading)
                if (this.isComplete)
                  t &&
                    setTimeout(function() {
                      return t(e);
                    }, 1);
                else
                  switch (
                    (t && this.onComplete.once(t),
                    this._setFlag(r.STATUS_FLAGS.LOADING, !0),
                    this.onStart.dispatch(this),
                    (!1 !== this.crossOrigin &&
                      "string" == typeof this.crossOrigin) ||
                      (this.crossOrigin = this._determineCrossOrigin(this.url)),
                    this.loadType)
                  ) {
                    case r.LOAD_TYPE.IMAGE:
                      (this.type = r.TYPE.IMAGE), this._loadElement("image");
                      break;
                    case r.LOAD_TYPE.AUDIO:
                      (this.type = r.TYPE.AUDIO),
                        this._loadSourceElement("audio");
                      break;
                    case r.LOAD_TYPE.VIDEO:
                      (this.type = r.TYPE.VIDEO),
                        this._loadSourceElement("video");
                      break;
                    case r.LOAD_TYPE.XHR:
                    default:
                      c && this.crossOrigin ? this._loadXdr() : this._loadXhr();
                  }
            }),
            (i._hasFlag = function(t) {
              return 0 != (this._flags & t);
            }),
            (i._setFlag = function(t, e) {
              this._flags = e ? this._flags | t : this._flags & ~t;
            }),
            (i._clearEvents = function() {
              clearTimeout(this._elementTimer),
                this.data &&
                  this.data.removeEventListener &&
                  (this.data.removeEventListener(
                    "error",
                    this._boundOnError,
                    !1
                  ),
                  this.data.removeEventListener(
                    "load",
                    this._boundComplete,
                    !1
                  ),
                  this.data.removeEventListener(
                    "progress",
                    this._boundOnProgress,
                    !1
                  ),
                  this.data.removeEventListener(
                    "canplaythrough",
                    this._boundComplete,
                    !1
                  )),
                this.xhr &&
                  (this.xhr.removeEventListener
                    ? (this.xhr.removeEventListener(
                        "error",
                        this._boundXhrOnError,
                        !1
                      ),
                      this.xhr.removeEventListener(
                        "timeout",
                        this._boundXhrOnTimeout,
                        !1
                      ),
                      this.xhr.removeEventListener(
                        "abort",
                        this._boundXhrOnAbort,
                        !1
                      ),
                      this.xhr.removeEventListener(
                        "progress",
                        this._boundOnProgress,
                        !1
                      ),
                      this.xhr.removeEventListener(
                        "load",
                        this._boundXhrOnLoad,
                        !1
                      ))
                    : ((this.xhr.onerror = null),
                      (this.xhr.ontimeout = null),
                      (this.xhr.onprogress = null),
                      (this.xhr.onload = null)));
            }),
            (i._finish = function() {
              if (this.isComplete)
                throw new Error(
                  "Complete called again for an already completed resource."
                );
              this._setFlag(r.STATUS_FLAGS.COMPLETE, !0),
                this._setFlag(r.STATUS_FLAGS.LOADING, !1),
                this.onComplete.dispatch(this);
            }),
            (i._loadElement = function(t) {
              this.metadata.loadElement
                ? (this.data = this.metadata.loadElement)
                : "image" === t && void 0 !== window.Image
                ? (this.data = new Image())
                : (this.data = document.createElement(t)),
                this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
                this.metadata.skipSource || (this.data.src = this.url),
                this.data.addEventListener("error", this._boundOnError, !1),
                this.data.addEventListener("load", this._boundComplete, !1),
                this.data.addEventListener(
                  "progress",
                  this._boundOnProgress,
                  !1
                ),
                this.timeout &&
                  (this._elementTimer = setTimeout(
                    this._boundOnTimeout,
                    this.timeout
                  ));
            }),
            (i._loadSourceElement = function(t) {
              if (
                (this.metadata.loadElement
                  ? (this.data = this.metadata.loadElement)
                  : "audio" === t && void 0 !== window.Audio
                  ? (this.data = new Audio())
                  : (this.data = document.createElement(t)),
                null !== this.data)
              ) {
                if (
                  (this.crossOrigin &&
                    (this.data.crossOrigin = this.crossOrigin),
                  !this.metadata.skipSource)
                )
                  if (navigator.isCocoonJS)
                    this.data.src = Array.isArray(this.url)
                      ? this.url[0]
                      : this.url;
                  else if (Array.isArray(this.url))
                    for (
                      var e = this.metadata.mimeType, r = 0;
                      r < this.url.length;
                      ++r
                    )
                      this.data.appendChild(
                        this._createSource(
                          t,
                          this.url[r],
                          Array.isArray(e) ? e[r] : e
                        )
                      );
                  else {
                    var i = this.metadata.mimeType;
                    this.data.appendChild(
                      this._createSource(
                        t,
                        this.url,
                        Array.isArray(i) ? i[0] : i
                      )
                    );
                  }
                this.data.addEventListener("error", this._boundOnError, !1),
                  this.data.addEventListener("load", this._boundComplete, !1),
                  this.data.addEventListener(
                    "progress",
                    this._boundOnProgress,
                    !1
                  ),
                  this.data.addEventListener(
                    "canplaythrough",
                    this._boundComplete,
                    !1
                  ),
                  this.data.load(),
                  this.timeout &&
                    (this._elementTimer = setTimeout(
                      this._boundOnTimeout,
                      this.timeout
                    ));
              } else this.abort("Unsupported element: " + t);
            }),
            (i._loadXhr = function() {
              "string" != typeof this.xhrType &&
                (this.xhrType = this._determineXhrType());
              var t = (this.xhr = new XMLHttpRequest());
              t.open("GET", this.url, !0),
                (t.timeout = this.timeout),
                this.xhrType === r.XHR_RESPONSE_TYPE.JSON ||
                this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT
                  ? (t.responseType = r.XHR_RESPONSE_TYPE.TEXT)
                  : (t.responseType = this.xhrType),
                t.addEventListener("error", this._boundXhrOnError, !1),
                t.addEventListener("timeout", this._boundXhrOnTimeout, !1),
                t.addEventListener("abort", this._boundXhrOnAbort, !1),
                t.addEventListener("progress", this._boundOnProgress, !1),
                t.addEventListener("load", this._boundXhrOnLoad, !1),
                t.send();
            }),
            (i._loadXdr = function() {
              "string" != typeof this.xhrType &&
                (this.xhrType = this._determineXhrType());
              var t = (this.xhr = new XDomainRequest());
              (t.timeout = this.timeout || 5e3),
                (t.onerror = this._boundXhrOnError),
                (t.ontimeout = this._boundXhrOnTimeout),
                (t.onprogress = this._boundOnProgress),
                (t.onload = this._boundXhrOnLoad),
                t.open("GET", this.url, !0),
                setTimeout(function() {
                  return t.send();
                }, 1);
            }),
            (i._createSource = function(t, e, r) {
              r || (r = t + "/" + this._getExtension(e));
              var i = document.createElement("source");
              return (i.src = e), (i.type = r), i;
            }),
            (i._onError = function(t) {
              this.abort("Failed to load element using: " + t.target.nodeName);
            }),
            (i._onProgress = function(t) {
              t &&
                t.lengthComputable &&
                this.onProgress.dispatch(this, t.loaded / t.total);
            }),
            (i._onTimeout = function() {
              this.abort("Load timed out.");
            }),
            (i._xhrOnError = function() {
              var t = this.xhr;
              this.abort(
                S(t) +
                  " Request failed. Status: " +
                  t.status +
                  ', text: "' +
                  t.statusText +
                  '"'
              );
            }),
            (i._xhrOnTimeout = function() {
              var t = this.xhr;
              this.abort(S(t) + " Request timed out.");
            }),
            (i._xhrOnAbort = function() {
              var t = this.xhr;
              this.abort(S(t) + " Request was aborted by the user.");
            }),
            (i._xhrOnLoad = function() {
              var t = this.xhr,
                e = "",
                i = void 0 === t.status ? f : t.status;
              if (
                (("" !== t.responseType &&
                  "text" !== t.responseType &&
                  void 0 !== t.responseType) ||
                  (e = t.responseText),
                i === E &&
                (e.length > 0 || t.responseType === r.XHR_RESPONSE_TYPE.BUFFER)
                  ? (i = f)
                  : i === T && (i = p),
                ((i / 100) | 0) === O)
              ) {
                if (this.xhrType === r.XHR_RESPONSE_TYPE.TEXT)
                  (this.data = e), (this.type = r.TYPE.TEXT);
                else if (this.xhrType === r.XHR_RESPONSE_TYPE.JSON)
                  try {
                    (this.data = JSON.parse(e)), (this.type = r.TYPE.JSON);
                  } catch (o) {
                    return void this.abort(
                      "Error trying to parse loaded json: " + o
                    );
                  }
                else if (this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT)
                  try {
                    if (window.DOMParser) {
                      var s = new DOMParser();
                      this.data = s.parseFromString(e, "text/xml");
                    } else {
                      var n = document.createElement("div");
                      (n.innerHTML = e), (this.data = n);
                    }
                    this.type = r.TYPE.XML;
                  } catch (o) {
                    return void this.abort(
                      "Error trying to parse loaded xml: " + o
                    );
                  }
                else this.data = t.response || e;
                this.complete();
              } else
                this.abort(
                  "[" + t.status + "] " + t.statusText + ": " + t.responseURL
                );
            }),
            (i._determineCrossOrigin = function(e, r) {
              if (0 === e.indexOf("data:")) return "";
              if (window.origin !== window.location.origin) return "anonymous";
              (r = r || window.location),
                _ || (_ = document.createElement("a")),
                (_.href = e);
              var i =
                  (!(e = (0, t.default)(_.href, { strictMode: !0 })).port &&
                    "" === r.port) ||
                  e.port === r.port,
                s = e.protocol ? e.protocol + ":" : "";
              return e.host === r.hostname && i && s === r.protocol
                ? ""
                : "anonymous";
            }),
            (i._determineXhrType = function() {
              return r._xhrTypeMap[this.extension] || r.XHR_RESPONSE_TYPE.TEXT;
            }),
            (i._determineLoadType = function() {
              return r._loadTypeMap[this.extension] || r.LOAD_TYPE.XHR;
            }),
            (i._getExtension = function() {
              var t = this.url,
                e = "";
              if (this.isDataUrl) {
                var r = t.indexOf("/");
                e = t.substring(r + 1, t.indexOf(";", r));
              } else {
                var i = t.indexOf("?"),
                  s = t.indexOf("#"),
                  n = Math.min(i > -1 ? i : t.length, s > -1 ? s : t.length);
                e = (t = t.substring(0, n)).substring(t.lastIndexOf(".") + 1);
              }
              return e.toLowerCase();
            }),
            (i._getMimeFromXhrType = function(t) {
              switch (t) {
                case r.XHR_RESPONSE_TYPE.BUFFER:
                  return "application/octet-binary";
                case r.XHR_RESPONSE_TYPE.BLOB:
                  return "application/blob";
                case r.XHR_RESPONSE_TYPE.DOCUMENT:
                  return "application/xml";
                case r.XHR_RESPONSE_TYPE.JSON:
                  return "application/json";
                case r.XHR_RESPONSE_TYPE.DEFAULT:
                case r.XHR_RESPONSE_TYPE.TEXT:
                default:
                  return "text/plain";
              }
            }),
            l(r, [
              {
                key: "isDataUrl",
                get: function() {
                  return this._hasFlag(r.STATUS_FLAGS.DATA_URL);
                }
              },
              {
                key: "isComplete",
                get: function() {
                  return this._hasFlag(r.STATUS_FLAGS.COMPLETE);
                }
              },
              {
                key: "isLoading",
                get: function() {
                  return this._hasFlag(r.STATUS_FLAGS.LOADING);
                }
              }
            ]),
            r
          );
        })();
        function P(t, e, r) {
          e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r);
        }
        function S(t) {
          return t.toString().replace("object ", "");
        }
        (exports.Resource = m),
          (m.STATUS_FLAGS = { NONE: 0, DATA_URL: 1, COMPLETE: 2, LOADING: 4 }),
          (m.TYPE = {
            UNKNOWN: 0,
            JSON: 1,
            XML: 2,
            IMAGE: 3,
            AUDIO: 4,
            VIDEO: 5,
            TEXT: 6
          }),
          (m.LOAD_TYPE = { XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4 }),
          (m.XHR_RESPONSE_TYPE = {
            DEFAULT: "text",
            BUFFER: "arraybuffer",
            BLOB: "blob",
            DOCUMENT: "document",
            JSON: "json",
            TEXT: "text"
          }),
          (m._loadTypeMap = {
            gif: m.LOAD_TYPE.IMAGE,
            png: m.LOAD_TYPE.IMAGE,
            bmp: m.LOAD_TYPE.IMAGE,
            jpg: m.LOAD_TYPE.IMAGE,
            jpeg: m.LOAD_TYPE.IMAGE,
            tif: m.LOAD_TYPE.IMAGE,
            tiff: m.LOAD_TYPE.IMAGE,
            webp: m.LOAD_TYPE.IMAGE,
            tga: m.LOAD_TYPE.IMAGE,
            svg: m.LOAD_TYPE.IMAGE,
            "svg+xml": m.LOAD_TYPE.IMAGE,
            mp3: m.LOAD_TYPE.AUDIO,
            ogg: m.LOAD_TYPE.AUDIO,
            wav: m.LOAD_TYPE.AUDIO,
            mp4: m.LOAD_TYPE.VIDEO,
            webm: m.LOAD_TYPE.VIDEO
          }),
          (m._xhrTypeMap = {
            xhtml: m.XHR_RESPONSE_TYPE.DOCUMENT,
            html: m.XHR_RESPONSE_TYPE.DOCUMENT,
            htm: m.XHR_RESPONSE_TYPE.DOCUMENT,
            xml: m.XHR_RESPONSE_TYPE.DOCUMENT,
            tmx: m.XHR_RESPONSE_TYPE.DOCUMENT,
            svg: m.XHR_RESPONSE_TYPE.DOCUMENT,
            tsx: m.XHR_RESPONSE_TYPE.DOCUMENT,
            gif: m.XHR_RESPONSE_TYPE.BLOB,
            png: m.XHR_RESPONSE_TYPE.BLOB,
            bmp: m.XHR_RESPONSE_TYPE.BLOB,
            jpg: m.XHR_RESPONSE_TYPE.BLOB,
            jpeg: m.XHR_RESPONSE_TYPE.BLOB,
            tif: m.XHR_RESPONSE_TYPE.BLOB,
            tiff: m.XHR_RESPONSE_TYPE.BLOB,
            webp: m.XHR_RESPONSE_TYPE.BLOB,
            tga: m.XHR_RESPONSE_TYPE.BLOB,
            json: m.XHR_RESPONSE_TYPE.JSON,
            text: m.XHR_RESPONSE_TYPE.TEXT,
            txt: m.XHR_RESPONSE_TYPE.TEXT,
            ttf: m.XHR_RESPONSE_TYPE.BUFFER,
            otf: m.XHR_RESPONSE_TYPE.BUFFER
          }),
          (m.EMPTY_GIF =
            "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
        var A =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        function b(t) {
          for (var e = "", r = 0; r < t.length; ) {
            for (var i = [0, 0, 0], s = [0, 0, 0, 0], n = 0; n < i.length; ++n)
              r < t.length ? (i[n] = 255 & t.charCodeAt(r++)) : (i[n] = 0);
            switch (
              ((s[0] = i[0] >> 2),
              (s[1] = ((3 & i[0]) << 4) | (i[1] >> 4)),
              (s[2] = ((15 & i[1]) << 2) | (i[2] >> 6)),
              (s[3] = 63 & i[2]),
              r - (t.length - 1))
            ) {
              case 2:
                (s[3] = 64), (s[2] = 64);
                break;
              case 1:
                s[3] = 64;
            }
            for (var o = 0; o < s.length; ++o) e += A.charAt(s[o]);
          }
          return e;
        }
        var y = window.URL || window.webkitURL;
        function L(t, e) {
          if (t.data) {
            if (t.xhr && t.xhrType === m.XHR_RESPONSE_TYPE.BLOB)
              if (window.Blob && "string" != typeof t.data) {
                if (0 === t.data.type.indexOf("image")) {
                  var r = y.createObjectURL(t.data);
                  return (
                    (t.blob = t.data),
                    (t.data = new Image()),
                    (t.data.src = r),
                    (t.type = m.TYPE.IMAGE),
                    void (t.data.onload = function() {
                      y.revokeObjectURL(r), (t.data.onload = null), e();
                    })
                  );
                }
              } else {
                var i = t.xhr.getResponseHeader("content-type");
                if (i && 0 === i.indexOf("image"))
                  return (
                    (t.data = new Image()),
                    (t.data.src =
                      "data:" + i + ";base64," + b(t.xhr.responseText)),
                    (t.type = m.TYPE.IMAGE),
                    void (t.data.onload = function() {
                      (t.data.onload = null), e();
                    })
                  );
              }
            e();
          } else e();
        }
        var v = { caching: u, parsing: L };
        exports.middleware = v;
        var R = 100,
          x = /(#[\w-]+)?$/,
          w = (function() {
            function r(t, i) {
              var s = this;
              void 0 === t && (t = ""),
                void 0 === i && (i = 10),
                (this.baseUrl = t),
                (this.progress = 0),
                (this.loading = !1),
                (this.defaultQueryString = ""),
                (this._beforeMiddleware = []),
                (this._afterMiddleware = []),
                (this._resourcesParsing = []),
                (this._boundLoadResource = function(t, e) {
                  return s._loadResource(t, e);
                }),
                (this._queue = o(this._boundLoadResource, i)),
                this._queue.pause(),
                (this.resources = {}),
                (this.onProgress = new e.default()),
                (this.onError = new e.default()),
                (this.onLoad = new e.default()),
                (this.onStart = new e.default()),
                (this.onComplete = new e.default());
              for (var n = 0; n < r._defaultBeforeMiddleware.length; ++n)
                this.pre(r._defaultBeforeMiddleware[n]);
              for (var a = 0; a < r._defaultAfterMiddleware.length; ++a)
                this.use(r._defaultAfterMiddleware[a]);
            }
            var i = r.prototype;
            return (
              (i.add = function(t, e, r, i) {
                if (Array.isArray(t)) {
                  for (var s = 0; s < t.length; ++s) this.add(t[s]);
                  return this;
                }
                if (
                  ("object" == typeof t &&
                    ((i = e || t.callback || t.onComplete),
                    (r = t),
                    (e = t.url),
                    (t = t.name || t.key || t.url)),
                  "string" != typeof e && ((i = r), (r = e), (e = t)),
                  "string" != typeof e)
                )
                  throw new Error("No url passed to add resource to loader.");
                if (
                  ("function" == typeof r && ((i = r), (r = null)),
                  this.loading && (!r || !r.parentResource))
                )
                  throw new Error(
                    "Cannot add resources while the loader is running."
                  );
                if (this.resources[t])
                  throw new Error('Resource named "' + t + '" already exists.');
                if (
                  ((e = this._prepareUrl(e)),
                  (this.resources[t] = new m(t, e, r)),
                  "function" == typeof i &&
                    this.resources[t].onAfterMiddleware.once(i),
                  this.loading)
                ) {
                  for (
                    var n = r.parentResource, o = [], a = 0;
                    a < n.children.length;
                    ++a
                  )
                    n.children[a].isComplete || o.push(n.children[a]);
                  var h = (n.progressChunk * (o.length + 1)) / (o.length + 2);
                  n.children.push(this.resources[t]), (n.progressChunk = h);
                  for (var u = 0; u < o.length; ++u) o[u].progressChunk = h;
                  this.resources[t].progressChunk = h;
                }
                return this._queue.push(this.resources[t]), this;
              }),
              (i.pre = function(t) {
                return this._beforeMiddleware.push(t), this;
              }),
              (i.use = function(t) {
                return this._afterMiddleware.push(t), this;
              }),
              (i.reset = function() {
                for (var t in ((this.progress = 0),
                (this.loading = !1),
                this._queue.kill(),
                this._queue.pause(),
                this.resources)) {
                  var e = this.resources[t];
                  e._onLoadBinding && e._onLoadBinding.detach(),
                    e.isLoading && e.abort();
                }
                return (this.resources = {}), this;
              }),
              (i.load = function(t) {
                if (
                  ("function" == typeof t && this.onComplete.once(t),
                  this.loading)
                )
                  return this;
                if (this._queue.idle()) this._onStart(), this._onComplete();
                else {
                  for (
                    var e = this._queue._tasks.length, r = R / e, i = 0;
                    i < this._queue._tasks.length;
                    ++i
                  )
                    this._queue._tasks[i].data.progressChunk = r;
                  this._onStart(), this._queue.resume();
                }
                return this;
              }),
              (i._prepareUrl = function(e) {
                var r,
                  i = (0, t.default)(e, { strictMode: !0 });
                if (
                  ((r =
                    i.protocol || !i.path || 0 === e.indexOf("//")
                      ? e
                      : this.baseUrl.length &&
                        this.baseUrl.lastIndexOf("/") !==
                          this.baseUrl.length - 1 &&
                        "/" !== e.charAt(0)
                      ? this.baseUrl + "/" + e
                      : this.baseUrl + e),
                  this.defaultQueryString)
                ) {
                  var s = x.exec(r)[0];
                  -1 !== (r = r.substr(0, r.length - s.length)).indexOf("?")
                    ? (r += "&" + this.defaultQueryString)
                    : (r += "?" + this.defaultQueryString),
                    (r += s);
                }
                return r;
              }),
              (i._loadResource = function(t, e) {
                var r = this;
                (t._dequeue = e),
                  s(
                    this._beforeMiddleware,
                    function(e, i) {
                      e.call(r, t, function() {
                        i(t.isComplete ? {} : null);
                      });
                    },
                    function() {
                      t.isComplete
                        ? r._onLoad(t)
                        : ((t._onLoadBinding = t.onComplete.once(r._onLoad, r)),
                          t.load());
                    },
                    !0
                  );
              }),
              (i._onStart = function() {
                (this.progress = 0),
                  (this.loading = !0),
                  this.onStart.dispatch(this);
              }),
              (i._onComplete = function() {
                (this.progress = R),
                  (this.loading = !1),
                  this.onComplete.dispatch(this, this.resources);
              }),
              (i._onLoad = function(t) {
                var e = this;
                (t._onLoadBinding = null),
                  this._resourcesParsing.push(t),
                  t._dequeue(),
                  s(
                    this._afterMiddleware,
                    function(r, i) {
                      r.call(e, t, i);
                    },
                    function() {
                      t.onAfterMiddleware.dispatch(t),
                        (e.progress = Math.min(
                          R,
                          e.progress + t.progressChunk
                        )),
                        e.onProgress.dispatch(e, t),
                        t.error
                          ? e.onError.dispatch(t.error, e, t)
                          : e.onLoad.dispatch(e, t),
                        e._resourcesParsing.splice(
                          e._resourcesParsing.indexOf(t),
                          1
                        ),
                        e._queue.idle() &&
                          0 === e._resourcesParsing.length &&
                          e._onComplete();
                    },
                    !0
                  );
              }),
              l(r, [
                {
                  key: "concurrency",
                  get: function() {
                    return this._queue.concurrency;
                  },
                  set: function(t) {
                    this._queue.concurrency = t;
                  }
                }
              ]),
              r
            );
          })();
        (exports.Loader = w),
          (w._defaultBeforeMiddleware = []),
          (w._defaultAfterMiddleware = []),
          (w.pre = function(t) {
            return w._defaultBeforeMiddleware.push(t), w;
          }),
          (w.use = function(t) {
            return w._defaultAfterMiddleware.push(t), w;
          });
      },
      { "parse-uri": "sX7F", "mini-signals": "vKdq" }
    ],
    hQvf: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TextureLoader = exports.LoaderResource = exports.Loader = exports.AppLoaderPlugin = void 0);
        var e = require("resource-loader"),
          r = require("@pixi/utils"),
          t = require("@pixi/core"),
          o = function() {};
        (exports.TextureLoader = o),
          (o.use = function(r, o) {
            r.data &&
              r.type === e.Resource.TYPE.IMAGE &&
              (r.texture = t.Texture.fromLoader(r.data, r.url, r.name)),
              o();
          });
        var i = (function(e) {
          function t(o, i) {
            var s = this;
            e.call(this, o, i), r.EventEmitter.call(this);
            for (var n = 0; n < t._plugins.length; ++n) {
              var a = t._plugins[n],
                u = a.pre,
                d = a.use;
              u && this.pre(u), d && this.use(d);
            }
            this.onStart.add(function(e) {
              return s.emit("start", e);
            }),
              this.onProgress.add(function(e, r) {
                return s.emit("progress", e, r);
              }),
              this.onError.add(function(e, r, t) {
                return s.emit("error", e, r, t);
              }),
              this.onLoad.add(function(e, r) {
                return s.emit("load", e, r);
              }),
              this.onComplete.add(function(e, r) {
                return s.emit("complete", e, r);
              }),
              (this._protected = !1);
          }
          e && (t.__proto__ = e),
            (t.prototype = Object.create(e && e.prototype)),
            (t.prototype.constructor = t);
          var o = { shared: { configurable: !0 } };
          return (
            (t.prototype.destroy = function() {
              this._protected || (this.removeAllListeners(), this.reset());
            }),
            (o.shared.get = function() {
              var e = t._shared;
              return e || (((e = new t())._protected = !0), (t._shared = e)), e;
            }),
            Object.defineProperties(t, o),
            t
          );
        })(e.Loader);
        (exports.Loader = i),
          Object.assign(i.prototype, r.EventEmitter.prototype),
          (i._plugins = []),
          (i.registerPlugin = function(e) {
            return i._plugins.push(e), e.add && e.add(), i;
          }),
          i.registerPlugin({ use: e.middleware.parsing }),
          i.registerPlugin(o);
        var s = function() {};
        (exports.AppLoaderPlugin = s),
          (s.init = function(e) {
            (e = Object.assign({ sharedLoader: !1 }, e)),
              (this.loader = e.sharedLoader ? i.shared : new i());
          }),
          (s.destroy = function() {
            this.loader && (this.loader.destroy(), (this.loader = null));
          });
        var n = e.Resource;
        exports.LoaderResource = n;
      },
      { "resource-loader": "OCxJ", "@pixi/utils": "G5Tu", "@pixi/core": "p2j5" }
    ],
    j0p2: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ParticleRenderer = exports.ParticleContainer = void 0);
        var t = require("@pixi/constants"),
          e = require("@pixi/utils"),
          i = require("@pixi/display"),
          r = require("@pixi/core"),
          o = require("@pixi/math"),
          s = (function(i) {
            function r(e, r, o, s) {
              void 0 === e && (e = 1500),
                void 0 === o && (o = 16384),
                void 0 === s && (s = !1),
                i.call(this);
              o > 16384 && (o = 16384),
                (this._properties = [!1, !0, !1, !1, !1]),
                (this._maxSize = e),
                (this._batchSize = o),
                (this._buffers = null),
                (this._bufferUpdateIDs = []),
                (this._updateID = 0),
                (this.interactiveChildren = !1),
                (this.blendMode = t.BLEND_MODES.NORMAL),
                (this.autoResize = s),
                (this.roundPixels = !0),
                (this.baseTexture = null),
                this.setProperties(r),
                (this._tint = 0),
                (this.tintRgb = new Float32Array(4)),
                (this.tint = 16777215);
            }
            i && (r.__proto__ = i),
              (r.prototype = Object.create(i && i.prototype)),
              (r.prototype.constructor = r);
            var o = { tint: { configurable: !0 } };
            return (
              (r.prototype.setProperties = function(t) {
                t &&
                  ((this._properties[0] =
                    "vertices" in t || "scale" in t
                      ? !!t.vertices || !!t.scale
                      : this._properties[0]),
                  (this._properties[1] =
                    "position" in t ? !!t.position : this._properties[1]),
                  (this._properties[2] =
                    "rotation" in t ? !!t.rotation : this._properties[2]),
                  (this._properties[3] =
                    "uvs" in t ? !!t.uvs : this._properties[3]),
                  (this._properties[4] =
                    "tint" in t || "alpha" in t
                      ? !!t.tint || !!t.alpha
                      : this._properties[4]));
              }),
              (r.prototype.updateTransform = function() {
                this.displayObjectUpdateTransform();
              }),
              (o.tint.get = function() {
                return this._tint;
              }),
              (o.tint.set = function(t) {
                (this._tint = t), (0, e.hex2rgb)(t, this.tintRgb);
              }),
              (r.prototype.render = function(t) {
                var e = this;
                this.visible &&
                  !(this.worldAlpha <= 0) &&
                  this.children.length &&
                  this.renderable &&
                  (this.baseTexture ||
                    ((this.baseTexture = this.children[0]._texture.baseTexture),
                    this.baseTexture.valid ||
                      this.baseTexture.once("update", function() {
                        return e.onChildrenChange(0);
                      })),
                  t.batch.setObjectRenderer(t.plugins.particle),
                  t.plugins.particle.render(this));
              }),
              (r.prototype.onChildrenChange = function(t) {
                for (
                  var e = Math.floor(t / this._batchSize);
                  this._bufferUpdateIDs.length < e;

                )
                  this._bufferUpdateIDs.push(0);
                this._bufferUpdateIDs[e] = ++this._updateID;
              }),
              (r.prototype.dispose = function() {
                if (this._buffers) {
                  for (var t = 0; t < this._buffers.length; ++t)
                    this._buffers[t].destroy();
                  this._buffers = null;
                }
              }),
              (r.prototype.destroy = function(t) {
                i.prototype.destroy.call(this, t),
                  this.dispose(),
                  (this._properties = null),
                  (this._buffers = null),
                  (this._bufferUpdateIDs = null);
              }),
              Object.defineProperties(r.prototype, o),
              r
            );
          })(i.Container);
        exports.ParticleContainer = s;
        var a = function(e, i, o) {
          (this.geometry = new r.Geometry()),
            (this.indexBuffer = null),
            (this.size = o),
            (this.dynamicProperties = []),
            (this.staticProperties = []);
          for (var s = 0; s < e.length; ++s) {
            var a = e[s];
            (a = {
              attributeName: a.attributeName,
              size: a.size,
              uploadFunction: a.uploadFunction,
              type: a.type || t.TYPES.FLOAT,
              offset: a.offset
            }),
              i[s]
                ? this.dynamicProperties.push(a)
                : this.staticProperties.push(a);
          }
          (this.staticStride = 0),
            (this.staticBuffer = null),
            (this.staticData = null),
            (this.staticDataUint32 = null),
            (this.dynamicStride = 0),
            (this.dynamicBuffer = null),
            (this.dynamicData = null),
            (this.dynamicDataUint32 = null),
            (this._updateID = 0),
            this.initBuffers();
        };
        (a.prototype.initBuffers = function() {
          var i = this.geometry,
            o = 0;
          (this.indexBuffer = new r.Buffer(
            (0, e.createIndicesForQuads)(this.size),
            !0,
            !0
          )),
            i.addIndex(this.indexBuffer),
            (this.dynamicStride = 0);
          for (var s = 0; s < this.dynamicProperties.length; ++s) {
            var a = this.dynamicProperties[s];
            (a.offset = o), (o += a.size), (this.dynamicStride += a.size);
          }
          var n = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
          (this.dynamicData = new Float32Array(n)),
            (this.dynamicDataUint32 = new Uint32Array(n)),
            (this.dynamicBuffer = new r.Buffer(this.dynamicData, !1, !1));
          var h = 0;
          this.staticStride = 0;
          for (var u = 0; u < this.staticProperties.length; ++u) {
            var p = this.staticProperties[u];
            (p.offset = h), (h += p.size), (this.staticStride += p.size);
          }
          var d = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
          (this.staticData = new Float32Array(d)),
            (this.staticDataUint32 = new Uint32Array(d)),
            (this.staticBuffer = new r.Buffer(this.staticData, !0, !1));
          for (var l = 0; l < this.dynamicProperties.length; ++l) {
            var c = this.dynamicProperties[l];
            i.addAttribute(
              c.attributeName,
              this.dynamicBuffer,
              0,
              c.type === t.TYPES.UNSIGNED_BYTE,
              c.type,
              4 * this.dynamicStride,
              4 * c.offset
            );
          }
          for (var f = 0; f < this.staticProperties.length; ++f) {
            var y = this.staticProperties[f];
            i.addAttribute(
              y.attributeName,
              this.staticBuffer,
              0,
              y.type === t.TYPES.UNSIGNED_BYTE,
              y.type,
              4 * this.staticStride,
              4 * y.offset
            );
          }
        }),
          (a.prototype.uploadDynamic = function(e, i, r) {
            for (var o = 0; o < this.dynamicProperties.length; o++) {
              var s = this.dynamicProperties[o];
              s.uploadFunction(
                e,
                i,
                r,
                s.type === t.TYPES.UNSIGNED_BYTE
                  ? this.dynamicDataUint32
                  : this.dynamicData,
                this.dynamicStride,
                s.offset
              );
            }
            this.dynamicBuffer._updateID++;
          }),
          (a.prototype.uploadStatic = function(e, i, r) {
            for (var o = 0; o < this.staticProperties.length; o++) {
              var s = this.staticProperties[o];
              s.uploadFunction(
                e,
                i,
                r,
                s.type === t.TYPES.UNSIGNED_BYTE
                  ? this.staticDataUint32
                  : this.staticData,
                this.staticStride,
                s.offset
              );
            }
            this.staticBuffer._updateID++;
          }),
          (a.prototype.destroy = function() {
            (this.indexBuffer = null),
              (this.dynamicProperties = null),
              (this.dynamicBuffer = null),
              (this.dynamicData = null),
              (this.dynamicDataUint32 = null),
              (this.staticProperties = null),
              (this.staticBuffer = null),
              (this.staticData = null),
              (this.staticDataUint32 = null),
              this.geometry.destroy();
          });
        var n =
            "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n",
          h =
            "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}",
          u = (function(i) {
            function s(e) {
              i.call(this, e),
                (this.shader = null),
                (this.properties = null),
                (this.tempMatrix = new o.Matrix()),
                (this.properties = [
                  {
                    attributeName: "aVertexPosition",
                    size: 2,
                    uploadFunction: this.uploadVertices,
                    offset: 0
                  },
                  {
                    attributeName: "aPositionCoord",
                    size: 2,
                    uploadFunction: this.uploadPosition,
                    offset: 0
                  },
                  {
                    attributeName: "aRotation",
                    size: 1,
                    uploadFunction: this.uploadRotation,
                    offset: 0
                  },
                  {
                    attributeName: "aTextureCoord",
                    size: 2,
                    uploadFunction: this.uploadUvs,
                    offset: 0
                  },
                  {
                    attributeName: "aColor",
                    size: 1,
                    type: t.TYPES.UNSIGNED_BYTE,
                    uploadFunction: this.uploadTint,
                    offset: 0
                  }
                ]),
                (this.shader = r.Shader.from(n, h, {}));
            }
            return (
              i && (s.__proto__ = i),
              (s.prototype = Object.create(i && i.prototype)),
              (s.prototype.constructor = s),
              (s.prototype.render = function(t) {
                var i = t.children,
                  r = t._maxSize,
                  o = t._batchSize,
                  s = this.renderer,
                  a = i.length;
                if (0 !== a) {
                  a > r && !t.autoResize && (a = r);
                  var n = t._buffers;
                  n || (n = t._buffers = this.generateBuffers(t));
                  var h = i[0]._texture.baseTexture;
                  this.renderer.state.setBlendMode(
                    (0, e.correctBlendMode)(t.blendMode, h.alphaMode)
                  );
                  var u = s.gl,
                    p = t.worldTransform.copyTo(this.tempMatrix);
                  p.prepend(s.globalUniforms.uniforms.projectionMatrix),
                    (this.shader.uniforms.translationMatrix = p.toArray(!0)),
                    (this.shader.uniforms.uColor = (0, e.premultiplyRgba)(
                      t.tintRgb,
                      t.worldAlpha,
                      this.shader.uniforms.uColor,
                      h.alphaMode
                    )),
                    (this.shader.uniforms.uSampler = h),
                    this.renderer.shader.bind(this.shader);
                  for (var d = !1, l = 0, c = 0; l < a; l += o, c += 1) {
                    var f = a - l;
                    f > o && (f = o),
                      c >= n.length && n.push(this._generateOneMoreBuffer(t));
                    var y = n[c];
                    y.uploadDynamic(i, l, f);
                    var v = t._bufferUpdateIDs[c] || 0;
                    (d = d || y._updateID < v) &&
                      ((y._updateID = t._updateID), y.uploadStatic(i, l, f)),
                      s.geometry.bind(y.geometry),
                      u.drawElements(u.TRIANGLES, 6 * f, u.UNSIGNED_SHORT, 0);
                  }
                }
              }),
              (s.prototype.generateBuffers = function(t) {
                for (
                  var e = [],
                    i = t._maxSize,
                    r = t._batchSize,
                    o = t._properties,
                    s = 0;
                  s < i;
                  s += r
                )
                  e.push(new a(this.properties, o, r));
                return e;
              }),
              (s.prototype._generateOneMoreBuffer = function(t) {
                var e = t._batchSize,
                  i = t._properties;
                return new a(this.properties, i, e);
              }),
              (s.prototype.uploadVertices = function(t, e, i, r, o, s) {
                for (var a = 0, n = 0, h = 0, u = 0, p = 0; p < i; ++p) {
                  var d = t[e + p],
                    l = d._texture,
                    c = d.scale.x,
                    f = d.scale.y,
                    y = l.trim,
                    v = l.orig;
                  y
                    ? ((a = (n = y.x - d.anchor.x * v.width) + y.width),
                      (h = (u = y.y - d.anchor.y * v.height) + y.height))
                    : ((a = v.width * (1 - d.anchor.x)),
                      (n = v.width * -d.anchor.x),
                      (h = v.height * (1 - d.anchor.y)),
                      (u = v.height * -d.anchor.y)),
                    (r[s] = n * c),
                    (r[s + 1] = u * f),
                    (r[s + o] = a * c),
                    (r[s + o + 1] = u * f),
                    (r[s + 2 * o] = a * c),
                    (r[s + 2 * o + 1] = h * f),
                    (r[s + 3 * o] = n * c),
                    (r[s + 3 * o + 1] = h * f),
                    (s += 4 * o);
                }
              }),
              (s.prototype.uploadPosition = function(t, e, i, r, o, s) {
                for (var a = 0; a < i; a++) {
                  var n = t[e + a].position;
                  (r[s] = n.x),
                    (r[s + 1] = n.y),
                    (r[s + o] = n.x),
                    (r[s + o + 1] = n.y),
                    (r[s + 2 * o] = n.x),
                    (r[s + 2 * o + 1] = n.y),
                    (r[s + 3 * o] = n.x),
                    (r[s + 3 * o + 1] = n.y),
                    (s += 4 * o);
                }
              }),
              (s.prototype.uploadRotation = function(t, e, i, r, o, s) {
                for (var a = 0; a < i; a++) {
                  var n = t[e + a].rotation;
                  (r[s] = n),
                    (r[s + o] = n),
                    (r[s + 2 * o] = n),
                    (r[s + 3 * o] = n),
                    (s += 4 * o);
                }
              }),
              (s.prototype.uploadUvs = function(t, e, i, r, o, s) {
                for (var a = 0; a < i; ++a) {
                  var n = t[e + a]._texture._uvs;
                  n
                    ? ((r[s] = n.x0),
                      (r[s + 1] = n.y0),
                      (r[s + o] = n.x1),
                      (r[s + o + 1] = n.y1),
                      (r[s + 2 * o] = n.x2),
                      (r[s + 2 * o + 1] = n.y2),
                      (r[s + 3 * o] = n.x3),
                      (r[s + 3 * o + 1] = n.y3),
                      (s += 4 * o))
                    : ((r[s] = 0),
                      (r[s + 1] = 0),
                      (r[s + o] = 0),
                      (r[s + o + 1] = 0),
                      (r[s + 2 * o] = 0),
                      (r[s + 2 * o + 1] = 0),
                      (r[s + 3 * o] = 0),
                      (r[s + 3 * o + 1] = 0),
                      (s += 4 * o));
                }
              }),
              (s.prototype.uploadTint = function(t, i, r, o, s, a) {
                for (var n = 0; n < r; ++n) {
                  var h = t[i + n],
                    u = h._texture.baseTexture.alphaMode > 0,
                    p = h.alpha,
                    d =
                      p < 1 && u
                        ? (0, e.premultiplyTint)(h._tintRGB, p)
                        : h._tintRGB + ((255 * p) << 24);
                  (o[a] = d),
                    (o[a + s] = d),
                    (o[a + 2 * s] = d),
                    (o[a + 3 * s] = d),
                    (a += 4 * s);
                }
              }),
              (s.prototype.destroy = function() {
                i.prototype.destroy.call(this),
                  this.shader && (this.shader.destroy(), (this.shader = null)),
                  (this.tempMatrix = null);
              }),
              s
            );
          })(r.ObjectRenderer);
        exports.ParticleRenderer = u;
      },
      {
        "@pixi/constants": "LQBK",
        "@pixi/utils": "G5Tu",
        "@pixi/display": "nL3p",
        "@pixi/core": "p2j5",
        "@pixi/math": "oNQC"
      }
    ],
    LQzI: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SpritesheetLoader = exports.Spritesheet = void 0);
        var e = require("@pixi/math"),
          t = require("@pixi/core"),
          s = require("@pixi/utils"),
          r = require("@pixi/loaders"),
          i = function(e, t, s) {
            void 0 === s && (s = null),
              (this.baseTexture = e),
              (this.textures = {}),
              (this.animations = {}),
              (this.data = t),
              (this.resolution = this._updateResolution(
                s ||
                  (this.baseTexture.resource
                    ? this.baseTexture.resource.url
                    : null)
              )),
              (this._frames = this.data.frames),
              (this._frameKeys = Object.keys(this._frames)),
              (this._batchIndex = 0),
              (this._callback = null);
          };
        exports.Spritesheet = i;
        var o = { BATCH_SIZE: { configurable: !0 } };
        (o.BATCH_SIZE.get = function() {
          return 1e3;
        }),
          (i.prototype._updateResolution = function(e) {
            var t = this.data.meta.scale,
              r = (0, s.getResolutionOfUrl)(e, null);
            return (
              null === r && (r = void 0 !== t ? parseFloat(t) : 1),
              1 !== r && this.baseTexture.setResolution(r),
              r
            );
          }),
          (i.prototype.parse = function(e) {
            (this._batchIndex = 0),
              (this._callback = e),
              this._frameKeys.length <= i.BATCH_SIZE
                ? (this._processFrames(0),
                  this._processAnimations(),
                  this._parseComplete())
                : this._nextBatch();
          }),
          (i.prototype._processFrames = function(s) {
            for (
              var r = s, o = i.BATCH_SIZE;
              r - s < o && r < this._frameKeys.length;

            ) {
              var a = this._frameKeys[r],
                n = this._frames[a],
                h = n.frame;
              if (h) {
                var u = null,
                  l = null,
                  c = !1 !== n.trimmed && n.sourceSize ? n.sourceSize : n.frame,
                  f = new e.Rectangle(
                    0,
                    0,
                    Math.floor(c.w) / this.resolution,
                    Math.floor(c.h) / this.resolution
                  );
                (u = n.rotated
                  ? new e.Rectangle(
                      Math.floor(h.x) / this.resolution,
                      Math.floor(h.y) / this.resolution,
                      Math.floor(h.h) / this.resolution,
                      Math.floor(h.w) / this.resolution
                    )
                  : new e.Rectangle(
                      Math.floor(h.x) / this.resolution,
                      Math.floor(h.y) / this.resolution,
                      Math.floor(h.w) / this.resolution,
                      Math.floor(h.h) / this.resolution
                    )),
                  !1 !== n.trimmed &&
                    n.spriteSourceSize &&
                    (l = new e.Rectangle(
                      Math.floor(n.spriteSourceSize.x) / this.resolution,
                      Math.floor(n.spriteSourceSize.y) / this.resolution,
                      Math.floor(h.w) / this.resolution,
                      Math.floor(h.h) / this.resolution
                    )),
                  (this.textures[a] = new t.Texture(
                    this.baseTexture,
                    u,
                    f,
                    l,
                    n.rotated ? 2 : 0,
                    n.anchor
                  )),
                  t.Texture.addToCache(this.textures[a], a);
              }
              r++;
            }
          }),
          (i.prototype._processAnimations = function() {
            var e = this.data.animations || {};
            for (var t in e) {
              this.animations[t] = [];
              for (var s = 0; s < e[t].length; s++) {
                var r = e[t][s];
                this.animations[t].push(this.textures[r]);
              }
            }
          }),
          (i.prototype._parseComplete = function() {
            var e = this._callback;
            (this._callback = null),
              (this._batchIndex = 0),
              e.call(this, this.textures);
          }),
          (i.prototype._nextBatch = function() {
            var e = this;
            this._processFrames(this._batchIndex * i.BATCH_SIZE),
              this._batchIndex++,
              setTimeout(function() {
                e._batchIndex * i.BATCH_SIZE < e._frameKeys.length
                  ? e._nextBatch()
                  : (e._processAnimations(), e._parseComplete());
              }, 0);
          }),
          (i.prototype.destroy = function(e) {
            for (var t in (void 0 === e && (e = !1), this.textures))
              this.textures[t].destroy();
            (this._frames = null),
              (this._frameKeys = null),
              (this.data = null),
              (this.textures = null),
              e && this.baseTexture.destroy(),
              (this.baseTexture = null);
          }),
          Object.defineProperties(i, o);
        var a = function() {};
        (exports.SpritesheetLoader = a),
          (a.use = function(e, t) {
            var s = e.name + "_image";
            if (
              e.data &&
              e.type === r.LoaderResource.TYPE.JSON &&
              e.data.frames &&
              !this.resources[s]
            ) {
              var o = {
                  crossOrigin: e.crossOrigin,
                  metadata: e.metadata.imageMetadata,
                  parentResource: e
                },
                n = a.getResourcePath(e, this.baseUrl);
              this.add(s, n, o, function(s) {
                if (s.error) t(s.error);
                else {
                  var r = new i(s.texture.baseTexture, e.data, e.url);
                  r.parse(function() {
                    (e.spritesheet = r), (e.textures = r.textures), t();
                  });
                }
              });
            } else t();
          }),
          (a.getResourcePath = function(e, t) {
            return e.isDataUrl
              ? e.data.meta.image
              : s.url.resolve(e.url.replace(t, ""), e.data.meta.image);
          });
      },
      {
        "@pixi/math": "oNQC",
        "@pixi/core": "p2j5",
        "@pixi/utils": "G5Tu",
        "@pixi/loaders": "hQvf"
      }
    ],
    kMpM: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TilingSpriteRenderer = exports.TilingSprite = void 0);
        var t = require("@pixi/core"),
          r = require("@pixi/math"),
          e = require("@pixi/utils"),
          i = require("@pixi/sprite"),
          o = require("@pixi/constants"),
          n = new r.Point(),
          a = (function(i) {
            function o(e, o, n) {
              void 0 === o && (o = 100),
                void 0 === n && (n = 100),
                i.call(this, e),
                (this.tileTransform = new r.Transform()),
                (this._width = o),
                (this._height = n),
                (this._canvasPattern = null),
                (this.uvMatrix = e.uvMatrix || new t.TextureMatrix(e)),
                (this.pluginName = "tilingSprite"),
                (this.uvRespectAnchor = !1);
            }
            i && (o.__proto__ = i),
              (o.prototype = Object.create(i && i.prototype)),
              (o.prototype.constructor = o);
            var a = {
              clampMargin: { configurable: !0 },
              tileScale: { configurable: !0 },
              tilePosition: { configurable: !0 },
              width: { configurable: !0 },
              height: { configurable: !0 }
            };
            return (
              (a.clampMargin.get = function() {
                return this.uvMatrix.clampMargin;
              }),
              (a.clampMargin.set = function(t) {
                (this.uvMatrix.clampMargin = t), this.uvMatrix.update(!0);
              }),
              (a.tileScale.get = function() {
                return this.tileTransform.scale;
              }),
              (a.tileScale.set = function(t) {
                this.tileTransform.scale.copyFrom(t);
              }),
              (a.tilePosition.get = function() {
                return this.tileTransform.position;
              }),
              (a.tilePosition.set = function(t) {
                this.tileTransform.position.copyFrom(t);
              }),
              (o.prototype._onTextureUpdate = function() {
                this.uvMatrix && (this.uvMatrix.texture = this._texture),
                  (this._cachedTint = 16777215);
              }),
              (o.prototype._render = function(t) {
                var r = this._texture;
                r &&
                  r.valid &&
                  (this.tileTransform.updateLocalTransform(),
                  this.uvMatrix.update(),
                  t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                  t.plugins[this.pluginName].render(this));
              }),
              (o.prototype._calculateBounds = function() {
                var t = this._width * -this._anchor._x,
                  r = this._height * -this._anchor._y,
                  e = this._width * (1 - this._anchor._x),
                  i = this._height * (1 - this._anchor._y);
                this._bounds.addFrame(this.transform, t, r, e, i);
              }),
              (o.prototype.getLocalBounds = function(t) {
                return 0 === this.children.length
                  ? ((this._bounds.minX = this._width * -this._anchor._x),
                    (this._bounds.minY = this._height * -this._anchor._y),
                    (this._bounds.maxX = this._width * (1 - this._anchor._x)),
                    (this._bounds.maxY = this._height * (1 - this._anchor._y)),
                    t ||
                      (this._localBoundsRect ||
                        (this._localBoundsRect = new r.Rectangle()),
                      (t = this._localBoundsRect)),
                    this._bounds.getRectangle(t))
                  : i.prototype.getLocalBounds.call(this, t);
              }),
              (o.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, n);
                var r = this._width,
                  e = this._height,
                  i = -r * this.anchor._x;
                if (n.x >= i && n.x < i + r) {
                  var o = -e * this.anchor._y;
                  if (n.y >= o && n.y < o + e) return !0;
                }
                return !1;
              }),
              (o.prototype.destroy = function(t) {
                i.prototype.destroy.call(this, t),
                  (this.tileTransform = null),
                  (this.uvMatrix = null);
              }),
              (o.from = function(r, e, i) {
                return new o(t.Texture.from(r), e, i);
              }),
              (o.fromFrame = function(t, r, i) {
                var n = e.TextureCache[t];
                if (!n)
                  throw new Error(
                    'The frameId "' +
                      t +
                      '" does not exist in the texture cache ' +
                      this
                  );
                return new o(n, r, i);
              }),
              (o.fromImage = function(r, e, i, n) {
                return (
                  n &&
                    "object" != typeof n &&
                    (n = {
                      scaleMode: arguments[4],
                      resourceOptions: { crossorigin: arguments[3] }
                    }),
                  new o(t.Texture.from(r, n), e, i)
                );
              }),
              (a.width.get = function() {
                return this._width;
              }),
              (a.width.set = function(t) {
                this._width = t;
              }),
              (a.height.get = function() {
                return this._height;
              }),
              (a.height.set = function(t) {
                this._height = t;
              }),
              Object.defineProperties(o.prototype, a),
              o
            );
          })(i.Sprite);
        exports.TilingSprite = a;
        var s =
            "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n",
          h =
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord - floor(vTextureCoord - uClampOffset);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture2D(uSampler, coord);\n    gl_FragColor = texSample * uColor;\n}\n",
          u =
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n",
          c = new r.Matrix(),
          l = (function(r) {
            function i(e) {
              r.call(this, e);
              var i = { globals: this.renderer.globalUniforms };
              (this.shader = t.Shader.from(s, h, i)),
                (this.simpleShader = t.Shader.from(s, u, i)),
                (this.quad = new t.QuadUv());
            }
            return (
              r && (i.__proto__ = r),
              (i.prototype = Object.create(r && r.prototype)),
              (i.prototype.constructor = i),
              (i.prototype.render = function(t) {
                var r = this.renderer,
                  i = this.quad,
                  n = i.vertices;
                (n[0] = n[6] = t._width * -t.anchor.x),
                  (n[1] = n[3] = t._height * -t.anchor.y),
                  (n[2] = n[4] = t._width * (1 - t.anchor.x)),
                  (n[5] = n[7] = t._height * (1 - t.anchor.y)),
                  t.uvRespectAnchor &&
                    (((n = i.uvs)[0] = n[6] = -t.anchor.x),
                    (n[1] = n[3] = -t.anchor.y),
                    (n[2] = n[4] = 1 - t.anchor.x),
                    (n[5] = n[7] = 1 - t.anchor.y)),
                  i.invalidate();
                var a = t._texture,
                  s = a.baseTexture,
                  h = t.tileTransform.localTransform,
                  u = t.uvMatrix,
                  l =
                    s.isPowerOfTwo &&
                    a.frame.width === s.width &&
                    a.frame.height === s.height;
                l &&
                  (s._glTextures[r.CONTEXT_UID]
                    ? (l = s.wrapMode !== o.WRAP_MODES.CLAMP)
                    : s.wrapMode === o.WRAP_MODES.CLAMP &&
                      (s.wrapMode = o.WRAP_MODES.REPEAT));
                var p = l ? this.simpleShader : this.shader,
                  d = a.width,
                  m = a.height,
                  f = t._width,
                  _ = t._height;
                c.set(
                  (h.a * d) / f,
                  (h.b * d) / _,
                  (h.c * m) / f,
                  (h.d * m) / _,
                  h.tx / f,
                  h.ty / _
                ),
                  c.invert(),
                  l
                    ? c.prepend(u.mapCoord)
                    : ((p.uniforms.uMapCoord = u.mapCoord.toArray(!0)),
                      (p.uniforms.uClampFrame = u.uClampFrame),
                      (p.uniforms.uClampOffset = u.uClampOffset)),
                  (p.uniforms.uTransform = c.toArray(!0)),
                  (p.uniforms.uColor = (0, e.premultiplyTintToRgba)(
                    t.tint,
                    t.worldAlpha,
                    p.uniforms.uColor,
                    s.alphaMode
                  )),
                  (p.uniforms.translationMatrix = t.transform.worldTransform.toArray(
                    !0
                  )),
                  (p.uniforms.uSampler = a),
                  r.shader.bind(p),
                  r.geometry.bind(i),
                  r.state.setBlendMode(
                    (0, e.correctBlendMode)(t.blendMode, s.alphaMode)
                  ),
                  r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
              }),
              i
            );
          })(t.ObjectRenderer);
        exports.TilingSpriteRenderer = l;
      },
      {
        "@pixi/core": "p2j5",
        "@pixi/math": "oNQC",
        "@pixi/utils": "G5Tu",
        "@pixi/sprite": "ueA8",
        "@pixi/constants": "LQBK"
      }
    ],
    LwOx: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.BitmapText = exports.BitmapFontLoader = void 0);
        var t = require("@pixi/core"),
          e = require("@pixi/display"),
          i = require("@pixi/math"),
          n = require("@pixi/settings"),
          r = require("@pixi/sprite"),
          a = require("@pixi/utils"),
          s = require("@pixi/loaders"),
          o = (function(e) {
            function s(t, r) {
              var a = this;
              void 0 === r && (r = {}),
                e.call(this),
                (this._textWidth = 0),
                (this._textHeight = 0),
                (this._glyphs = []),
                (this._font = {
                  tint: void 0 !== r.tint ? r.tint : 16777215,
                  align: r.align || "left",
                  name: null,
                  size: 0
                }),
                (this.font = r.font),
                (this._text = t),
                (this._maxWidth = 0),
                (this._maxLineHeight = 0),
                (this._letterSpacing = 0),
                (this._anchor = new i.ObservablePoint(
                  function() {
                    a.dirty = !0;
                  },
                  this,
                  0,
                  0
                )),
                (this.dirty = !1),
                (this.roundPixels = n.settings.ROUND_PIXELS),
                this.updateText();
            }
            e && (s.__proto__ = e),
              (s.prototype = Object.create(e && e.prototype)),
              (s.prototype.constructor = s);
            var o = {
              tint: { configurable: !0 },
              align: { configurable: !0 },
              anchor: { configurable: !0 },
              font: { configurable: !0 },
              text: { configurable: !0 },
              maxWidth: { configurable: !0 },
              maxLineHeight: { configurable: !0 },
              textWidth: { configurable: !0 },
              letterSpacing: { configurable: !0 },
              textHeight: { configurable: !0 }
            };
            return (
              (s.prototype.updateText = function() {
                for (
                  var t = s.fonts[this._font.name],
                    e = this._font.size / t.size,
                    n = new i.Point(),
                    o = [],
                    h = [],
                    g = this._text.replace(/(?:\r\n|\r)/g, "\n") || " ",
                    u = g.length,
                    l = (this._maxWidth * t.size) / this._font.size,
                    f = null,
                    c = 0,
                    p = 0,
                    x = 0,
                    d = -1,
                    m = 0,
                    _ = 0,
                    y = 0,
                    b = 0;
                  b < u;
                  b++
                ) {
                  var v = g.charCodeAt(b),
                    A = g.charAt(b);
                  if (
                    (/(?:\s)/.test(A) && ((d = b), (m = c)),
                    "\r" !== A && "\n" !== A)
                  ) {
                    var T = t.chars[v];
                    T &&
                      (f && T.kerning[f] && (n.x += T.kerning[f]),
                      o.push({
                        texture: T.texture,
                        line: x,
                        charCode: v,
                        position: new i.Point(
                          n.x + T.xOffset + this._letterSpacing / 2,
                          n.y + T.yOffset
                        )
                      }),
                      (n.x += T.xAdvance + this._letterSpacing),
                      (c = n.x),
                      (y = Math.max(y, T.yOffset + T.texture.height)),
                      (f = v),
                      -1 !== d &&
                        l > 0 &&
                        n.x > l &&
                        (++_,
                        (0, a.removeItems)(o, 1 + d - _, 1 + b - d),
                        (b = d),
                        (d = -1),
                        h.push(m),
                        (p = Math.max(p, m)),
                        x++,
                        (n.x = 0),
                        (n.y += t.lineHeight),
                        (f = null)));
                  } else
                    h.push(c),
                      (p = Math.max(p, c)),
                      ++x,
                      ++_,
                      (n.x = 0),
                      (n.y += t.lineHeight),
                      (f = null);
                }
                var O = g.charAt(g.length - 1);
                "\r" !== O &&
                  "\n" !== O &&
                  (/(?:\s)/.test(O) && (c = m),
                  h.push(c),
                  (p = Math.max(p, c)));
                for (var E = [], I = 0; I <= x; I++) {
                  var H = 0;
                  "right" === this._font.align
                    ? (H = p - h[I])
                    : "center" === this._font.align && (H = (p - h[I]) / 2),
                    E.push(H);
                }
                for (var L = o.length, B = this.tint, S = 0; S < L; S++) {
                  var W = this._glyphs[S];
                  W
                    ? (W.texture = o[S].texture)
                    : (((W = new r.Sprite(
                        o[S].texture
                      )).roundPixels = this.roundPixels),
                      this._glyphs.push(W)),
                    (W.position.x = (o[S].position.x + E[o[S].line]) * e),
                    (W.position.y = o[S].position.y * e),
                    (W.scale.x = W.scale.y = e),
                    (W.tint = B),
                    W.parent || this.addChild(W);
                }
                for (var z = L; z < this._glyphs.length; ++z)
                  this.removeChild(this._glyphs[z]);
                if (
                  ((this._textWidth = p * e),
                  (this._textHeight = (n.y + t.lineHeight) * e),
                  0 !== this.anchor.x || 0 !== this.anchor.y)
                )
                  for (var N = 0; N < L; N++)
                    (this._glyphs[N].x -= this._textWidth * this.anchor.x),
                      (this._glyphs[N].y -= this._textHeight * this.anchor.y);
                this._maxLineHeight = y * e;
              }),
              (s.prototype.updateTransform = function() {
                this.validate(), this.containerUpdateTransform();
              }),
              (s.prototype.getLocalBounds = function() {
                return this.validate(), e.prototype.getLocalBounds.call(this);
              }),
              (s.prototype.validate = function() {
                this.dirty && (this.updateText(), (this.dirty = !1));
              }),
              (o.tint.get = function() {
                return this._font.tint;
              }),
              (o.tint.set = function(t) {
                (this._font.tint =
                  "number" == typeof t && t >= 0 ? t : 16777215),
                  (this.dirty = !0);
              }),
              (o.align.get = function() {
                return this._font.align;
              }),
              (o.align.set = function(t) {
                (this._font.align = t || "left"), (this.dirty = !0);
              }),
              (o.anchor.get = function() {
                return this._anchor;
              }),
              (o.anchor.set = function(t) {
                "number" == typeof t
                  ? this._anchor.set(t)
                  : this._anchor.copyFrom(t);
              }),
              (o.font.get = function() {
                return this._font;
              }),
              (o.font.set = function(t) {
                t &&
                  ("string" == typeof t
                    ? ((t = t.split(" ")),
                      (this._font.name =
                        1 === t.length ? t[0] : t.slice(1).join(" ")),
                      (this._font.size =
                        t.length >= 2
                          ? parseInt(t[0], 10)
                          : s.fonts[this._font.name].size))
                    : ((this._font.name = t.name),
                      (this._font.size =
                        "number" == typeof t.size
                          ? t.size
                          : parseInt(t.size, 10))),
                  (this.dirty = !0));
              }),
              (o.text.get = function() {
                return this._text;
              }),
              (o.text.set = function(t) {
                (t = String(null == t ? "" : t)),
                  this._text !== t && ((this._text = t), (this.dirty = !0));
              }),
              (o.maxWidth.get = function() {
                return this._maxWidth;
              }),
              (o.maxWidth.set = function(t) {
                this._maxWidth !== t &&
                  ((this._maxWidth = t), (this.dirty = !0));
              }),
              (o.maxLineHeight.get = function() {
                return this.validate(), this._maxLineHeight;
              }),
              (o.textWidth.get = function() {
                return this.validate(), this._textWidth;
              }),
              (o.letterSpacing.get = function() {
                return this._letterSpacing;
              }),
              (o.letterSpacing.set = function(t) {
                this._letterSpacing !== t &&
                  ((this._letterSpacing = t), (this.dirty = !0));
              }),
              (o.textHeight.get = function() {
                return this.validate(), this._textHeight;
              }),
              (s.registerFont = function(e, r) {
                var o = {},
                  h = e.getElementsByTagName("info")[0],
                  g = e.getElementsByTagName("common")[0],
                  u = e.getElementsByTagName("page"),
                  l = (0, a.getResolutionOfUrl)(
                    u[0].getAttribute("file"),
                    n.settings.RESOLUTION
                  ),
                  f = {};
                (o.font = h.getAttribute("face")),
                  (o.size = parseInt(h.getAttribute("size"), 10)),
                  (o.lineHeight =
                    parseInt(g.getAttribute("lineHeight"), 10) / l),
                  (o.chars = {}),
                  r instanceof t.Texture && (r = [r]);
                for (var c = 0; c < u.length; c++) {
                  var p = u[c].getAttribute("id"),
                    x = u[c].getAttribute("file");
                  f[p] = r instanceof Array ? r[c] : r[x];
                }
                for (
                  var d = e.getElementsByTagName("char"), m = 0;
                  m < d.length;
                  m++
                ) {
                  var _ = d[m],
                    y = parseInt(_.getAttribute("id"), 10),
                    b = _.getAttribute("page") || 0,
                    v = new i.Rectangle(
                      parseInt(_.getAttribute("x"), 10) / l + f[b].frame.x / l,
                      parseInt(_.getAttribute("y"), 10) / l + f[b].frame.y / l,
                      parseInt(_.getAttribute("width"), 10) / l,
                      parseInt(_.getAttribute("height"), 10) / l
                    );
                  o.chars[y] = {
                    xOffset: parseInt(_.getAttribute("xoffset"), 10) / l,
                    yOffset: parseInt(_.getAttribute("yoffset"), 10) / l,
                    xAdvance: parseInt(_.getAttribute("xadvance"), 10) / l,
                    kerning: {},
                    texture: new t.Texture(f[b].baseTexture, v),
                    page: b
                  };
                }
                for (
                  var A = e.getElementsByTagName("kerning"), T = 0;
                  T < A.length;
                  T++
                ) {
                  var O = A[T],
                    E = parseInt(O.getAttribute("first"), 10) / l,
                    I = parseInt(O.getAttribute("second"), 10) / l,
                    H = parseInt(O.getAttribute("amount"), 10) / l;
                  o.chars[I] && (o.chars[I].kerning[E] = H);
                }
                return (s.fonts[o.font] = o), o;
              }),
              Object.defineProperties(s.prototype, o),
              s
            );
          })(e.Container);
        (exports.BitmapText = o), (o.fonts = {});
        var h = function() {};
        (exports.BitmapFontLoader = h),
          (h.parse = function(t, e) {
            t.bitmapFont = o.registerFont(t.data, e);
          }),
          (h.add = function() {
            s.LoaderResource.setExtensionXhrType(
              "fnt",
              s.LoaderResource.XHR_RESPONSE_TYPE.DOCUMENT
            );
          }),
          (h.dirname = function(t) {
            var e = t.replace(/\/$/, "").replace(/\/[^\/]*$/, "");
            return e === t ? "." : "" === e ? "/" : e;
          }),
          (h.use = function(t, e) {
            if (t.data && t.type === s.LoaderResource.TYPE.XML)
              if (
                0 !== t.data.getElementsByTagName("page").length &&
                0 !== t.data.getElementsByTagName("info").length &&
                null !==
                  t.data.getElementsByTagName("info")[0].getAttribute("face")
              ) {
                var i = t.isDataUrl ? "" : h.dirname(t.url);
                t.isDataUrl &&
                  ("." === i && (i = ""),
                  this.baseUrl &&
                    i &&
                    "/" === this.baseUrl.charAt(this.baseUrl.length - 1) &&
                    (i += "/")),
                  (i = i.replace(this.baseUrl, "")) &&
                    "/" !== i.charAt(i.length - 1) &&
                    (i += "/");
                for (
                  var n = t.data.getElementsByTagName("page"),
                    r = {},
                    a = function(i) {
                      (r[i.metadata.pageFile] = i.texture),
                        Object.keys(r).length === n.length &&
                          (h.parse(t, r), e());
                    },
                    o = 0;
                  o < n.length;
                  ++o
                ) {
                  var g = n[o].getAttribute("file"),
                    u = i + g,
                    l = !1;
                  for (var f in this.resources) {
                    var c = this.resources[f];
                    if (c.url === u) {
                      (c.metadata.pageFile = g),
                        c.texture ? a(c) : c.onAfterMiddleware.add(a),
                        (l = !0);
                      break;
                    }
                  }
                  if (!l) {
                    var p = {
                      crossOrigin: t.crossOrigin,
                      loadType: s.LoaderResource.LOAD_TYPE.IMAGE,
                      metadata: Object.assign(
                        { pageFile: g },
                        t.metadata.imageMetadata
                      ),
                      parentResource: t
                    };
                    this.add(u, p, a);
                  }
                }
              } else e();
            else e();
          });
      },
      {
        "@pixi/core": "p2j5",
        "@pixi/display": "nL3p",
        "@pixi/math": "oNQC",
        "@pixi/settings": "t4Uo",
        "@pixi/sprite": "ueA8",
        "@pixi/utils": "G5Tu",
        "@pixi/loaders": "hQvf"
      }
    ],
    h70E: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.AlphaFilter = void 0);
        var e = require("@pixi/core"),
          r =
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n",
          t = (function(t) {
            function o(o) {
              void 0 === o && (o = 1),
                t.call(this, e.defaultVertex, r, { uAlpha: 1 }),
                (this.alpha = o);
            }
            t && (o.__proto__ = t),
              (o.prototype = Object.create(t && t.prototype)),
              (o.prototype.constructor = o);
            var a = { alpha: { configurable: !0 } };
            return (
              (a.alpha.get = function() {
                return this.uniforms.uAlpha;
              }),
              (a.alpha.set = function(e) {
                this.uniforms.uAlpha = e;
              }),
              Object.defineProperties(o.prototype, a),
              o
            );
          })(e.Filter);
        exports.AlphaFilter = t;
      },
      { "@pixi/core": "p2j5" }
    ],
    XHCc: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.BlurFilterPass = exports.BlurFilter = void 0);
        var t = require("@pixi/core"),
          e = require("@pixi/settings"),
          r =
            "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }";
        function i(t, e) {
          var i,
            n = Math.ceil(t / 2),
            l = r,
            s = "";
          i = e
            ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);"
            : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
          for (var u = 0; u < t; u++) {
            var o = i.replace("%index%", u);
            (s += o = o.replace("%sampleIndex%", u - (n - 1) + ".0")),
              (s += "\n");
          }
          return (l = (l = l.replace("%blur%", s)).replace("%size%", t));
        }
        var n = {
            5: [0.153388, 0.221461, 0.250301],
            7: [0.071303, 0.131514, 0.189879, 0.214607],
            9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
            11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
            13: [
              0.002406,
              0.009255,
              0.027867,
              0.065666,
              0.121117,
              0.174868,
              0.197641
            ],
            15: [
              489e-6,
              0.002403,
              0.009246,
              0.02784,
              0.065602,
              0.120999,
              0.174697,
              0.197448
            ]
          },
          l = [
            "varying vec2 vBlurTexCoords[%size%];",
            "uniform sampler2D uSampler;",
            "void main(void)",
            "{",
            "    gl_FragColor = vec4(0.0);",
            "    %blur%",
            "}"
          ].join("\n");
        function s(t) {
          for (
            var e, r = n[t], i = r.length, s = l, u = "", o = 0;
            o < t;
            o++
          ) {
            var a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace(
              "%index%",
              o
            );
            (e = o),
              o >= i && (e = t - o - 1),
              (u += a = a.replace("%value%", r[e])),
              (u += "\n");
          }
          return (s = (s = s.replace("%blur%", u)).replace("%size%", t));
        }
        var u = (function(t) {
          function r(r, n, l, u, o) {
            var a = i((o = o || 5), r),
              h = s(o);
            t.call(this, a, h),
              (this.horizontal = r),
              (this.resolution = u || e.settings.RESOLUTION),
              (this._quality = 0),
              (this.quality = l || 4),
              (this.blur = n || 8);
          }
          t && (r.__proto__ = t),
            (r.prototype = Object.create(t && t.prototype)),
            (r.prototype.constructor = r);
          var n = { blur: { configurable: !0 }, quality: { configurable: !0 } };
          return (
            (r.prototype.apply = function(t, e, r, i) {
              if (
                (r
                  ? this.horizontal
                    ? (this.uniforms.strength =
                        (1 / r.width) * (r.width / e.width))
                    : (this.uniforms.strength =
                        (1 / r.height) * (r.height / e.height))
                  : this.horizontal
                  ? (this.uniforms.strength =
                      (1 / t.renderer.width) * (t.renderer.width / e.width))
                  : (this.uniforms.strength =
                      (1 / t.renderer.height) * (t.renderer.height / e.height)),
                (this.uniforms.strength *= this.strength),
                (this.uniforms.strength /= this.passes),
                1 === this.passes)
              )
                t.applyFilter(this, e, r, i);
              else {
                var n = t.getFilterTexture(),
                  l = t.renderer,
                  s = e,
                  u = n;
                (this.state.blend = !1), t.applyFilter(this, s, u, !1);
                for (var o = 1; o < this.passes - 1; o++) {
                  l.renderTexture.bind(s, s.filterFrame),
                    (this.uniforms.uSampler = u);
                  var a = u;
                  (u = s), (s = a), l.shader.bind(this), l.geometry.draw(5);
                }
                (this.state.blend = !0),
                  t.applyFilter(this, u, r, i),
                  t.returnFilterTexture(n);
              }
            }),
            (n.blur.get = function() {
              return this.strength;
            }),
            (n.blur.set = function(t) {
              (this.padding = 1 + 2 * Math.abs(t)), (this.strength = t);
            }),
            (n.quality.get = function() {
              return this._quality;
            }),
            (n.quality.set = function(t) {
              (this._quality = t), (this.passes = t);
            }),
            Object.defineProperties(r.prototype, n),
            r
          );
        })(t.Filter);
        exports.BlurFilterPass = u;
        var o = (function(t) {
          function r(r, i, n, l) {
            t.call(this),
              (this.blurXFilter = new u(!0, r, i, n, l)),
              (this.blurYFilter = new u(!1, r, i, n, l)),
              (this.resolution = n || e.settings.RESOLUTION),
              (this.quality = i || 4),
              (this.blur = r || 8),
              (this.repeatEdgePixels = !1);
          }
          t && (r.__proto__ = t),
            (r.prototype = Object.create(t && t.prototype)),
            (r.prototype.constructor = r);
          var i = {
            blur: { configurable: !0 },
            quality: { configurable: !0 },
            blurX: { configurable: !0 },
            blurY: { configurable: !0 },
            blendMode: { configurable: !0 },
            repeatEdgePixels: { configurable: !0 }
          };
          return (
            (r.prototype.apply = function(t, e, r, i) {
              var n = Math.abs(this.blurXFilter.strength),
                l = Math.abs(this.blurYFilter.strength);
              if (n && l) {
                var s = t.getFilterTexture();
                this.blurXFilter.apply(t, e, s, !0),
                  this.blurYFilter.apply(t, s, r, i),
                  t.returnFilterTexture(s);
              } else
                l
                  ? this.blurYFilter.apply(t, e, r, i)
                  : this.blurXFilter.apply(t, e, r, i);
            }),
            (r.prototype.updatePadding = function() {
              this._repeatEdgePixels
                ? (this.padding = 0)
                : (this.padding =
                    2 *
                    Math.max(
                      Math.abs(this.blurXFilter.strength),
                      Math.abs(this.blurYFilter.strength)
                    ));
            }),
            (i.blur.get = function() {
              return this.blurXFilter.blur;
            }),
            (i.blur.set = function(t) {
              (this.blurXFilter.blur = this.blurYFilter.blur = t),
                this.updatePadding();
            }),
            (i.quality.get = function() {
              return this.blurXFilter.quality;
            }),
            (i.quality.set = function(t) {
              this.blurXFilter.quality = this.blurYFilter.quality = t;
            }),
            (i.blurX.get = function() {
              return this.blurXFilter.blur;
            }),
            (i.blurX.set = function(t) {
              (this.blurXFilter.blur = t), this.updatePadding();
            }),
            (i.blurY.get = function() {
              return this.blurYFilter.blur;
            }),
            (i.blurY.set = function(t) {
              (this.blurYFilter.blur = t), this.updatePadding();
            }),
            (i.blendMode.get = function() {
              return this.blurYFilter.blendMode;
            }),
            (i.blendMode.set = function(t) {
              this.blurYFilter.blendMode = t;
            }),
            (i.repeatEdgePixels.get = function() {
              return this._repeatEdgePixels;
            }),
            (i.repeatEdgePixels.set = function(t) {
              (this._repeatEdgePixels = t), this.updatePadding();
            }),
            Object.defineProperties(r.prototype, i),
            r
          );
        })(t.Filter);
        exports.BlurFilter = o;
      },
      { "@pixi/core": "p2j5", "@pixi/settings": "t4Uo" }
    ],
    atfW: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ColorMatrixFilter = void 0);
        var t = require("@pixi/core"),
          r =
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n",
          o = (function(o) {
            function n() {
              var n = {
                m: new Float32Array([
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
                ]),
                uAlpha: 1
              };
              o.call(this, t.defaultFilterVertex, r, n), (this.alpha = 1);
            }
            o && (n.__proto__ = o),
              (n.prototype = Object.create(o && o.prototype)),
              (n.prototype.constructor = n);
            var e = {
              matrix: { configurable: !0 },
              alpha: { configurable: !0 }
            };
            return (
              (n.prototype._loadMatrix = function(t, r) {
                void 0 === r && (r = !1);
                var o = t;
                r &&
                  (this._multiply(o, this.uniforms.m, t),
                  (o = this._colorMatrix(o))),
                  (this.uniforms.m = o);
              }),
              (n.prototype._multiply = function(t, r, o) {
                return (
                  (t[0] =
                    r[0] * o[0] + r[1] * o[5] + r[2] * o[10] + r[3] * o[15]),
                  (t[1] =
                    r[0] * o[1] + r[1] * o[6] + r[2] * o[11] + r[3] * o[16]),
                  (t[2] =
                    r[0] * o[2] + r[1] * o[7] + r[2] * o[12] + r[3] * o[17]),
                  (t[3] =
                    r[0] * o[3] + r[1] * o[8] + r[2] * o[13] + r[3] * o[18]),
                  (t[4] =
                    r[0] * o[4] +
                    r[1] * o[9] +
                    r[2] * o[14] +
                    r[3] * o[19] +
                    r[4]),
                  (t[5] =
                    r[5] * o[0] + r[6] * o[5] + r[7] * o[10] + r[8] * o[15]),
                  (t[6] =
                    r[5] * o[1] + r[6] * o[6] + r[7] * o[11] + r[8] * o[16]),
                  (t[7] =
                    r[5] * o[2] + r[6] * o[7] + r[7] * o[12] + r[8] * o[17]),
                  (t[8] =
                    r[5] * o[3] + r[6] * o[8] + r[7] * o[13] + r[8] * o[18]),
                  (t[9] =
                    r[5] * o[4] +
                    r[6] * o[9] +
                    r[7] * o[14] +
                    r[8] * o[19] +
                    r[9]),
                  (t[10] =
                    r[10] * o[0] +
                    r[11] * o[5] +
                    r[12] * o[10] +
                    r[13] * o[15]),
                  (t[11] =
                    r[10] * o[1] +
                    r[11] * o[6] +
                    r[12] * o[11] +
                    r[13] * o[16]),
                  (t[12] =
                    r[10] * o[2] +
                    r[11] * o[7] +
                    r[12] * o[12] +
                    r[13] * o[17]),
                  (t[13] =
                    r[10] * o[3] +
                    r[11] * o[8] +
                    r[12] * o[13] +
                    r[13] * o[18]),
                  (t[14] =
                    r[10] * o[4] +
                    r[11] * o[9] +
                    r[12] * o[14] +
                    r[13] * o[19] +
                    r[14]),
                  (t[15] =
                    r[15] * o[0] +
                    r[16] * o[5] +
                    r[17] * o[10] +
                    r[18] * o[15]),
                  (t[16] =
                    r[15] * o[1] +
                    r[16] * o[6] +
                    r[17] * o[11] +
                    r[18] * o[16]),
                  (t[17] =
                    r[15] * o[2] +
                    r[16] * o[7] +
                    r[17] * o[12] +
                    r[18] * o[17]),
                  (t[18] =
                    r[15] * o[3] +
                    r[16] * o[8] +
                    r[17] * o[13] +
                    r[18] * o[18]),
                  (t[19] =
                    r[15] * o[4] +
                    r[16] * o[9] +
                    r[17] * o[14] +
                    r[18] * o[19] +
                    r[19]),
                  t
                );
              }),
              (n.prototype._colorMatrix = function(t) {
                var r = new Float32Array(t);
                return (
                  (r[4] /= 255),
                  (r[9] /= 255),
                  (r[14] /= 255),
                  (r[19] /= 255),
                  r
                );
              }),
              (n.prototype.brightness = function(t, r) {
                var o = [
                  t,
                  0,
                  0,
                  0,
                  0,
                  0,
                  t,
                  0,
                  0,
                  0,
                  0,
                  0,
                  t,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
                ];
                this._loadMatrix(o, r);
              }),
              (n.prototype.greyscale = function(t, r) {
                var o = [
                  t,
                  t,
                  t,
                  0,
                  0,
                  t,
                  t,
                  t,
                  0,
                  0,
                  t,
                  t,
                  t,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
                ];
                this._loadMatrix(o, r);
              }),
              (n.prototype.blackAndWhite = function(t) {
                this._loadMatrix(
                  [
                    0.3,
                    0.6,
                    0.1,
                    0,
                    0,
                    0.3,
                    0.6,
                    0.1,
                    0,
                    0,
                    0.3,
                    0.6,
                    0.1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.hue = function(t, r) {
                t = ((t || 0) / 180) * Math.PI;
                var o = Math.cos(t),
                  n = Math.sin(t),
                  e = 1 / 3,
                  a = (0, Math.sqrt)(e),
                  i = [
                    o + (1 - o) * e,
                    e * (1 - o) - a * n,
                    e * (1 - o) + a * n,
                    0,
                    0,
                    e * (1 - o) + a * n,
                    o + e * (1 - o),
                    e * (1 - o) - a * n,
                    0,
                    0,
                    e * (1 - o) - a * n,
                    e * (1 - o) + a * n,
                    o + e * (1 - o),
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ];
                this._loadMatrix(i, r);
              }),
              (n.prototype.contrast = function(t, r) {
                var o = (t || 0) + 1,
                  n = -0.5 * (o - 1),
                  e = [
                    o,
                    0,
                    0,
                    0,
                    n,
                    0,
                    o,
                    0,
                    0,
                    n,
                    0,
                    0,
                    o,
                    0,
                    n,
                    0,
                    0,
                    0,
                    1,
                    0
                  ];
                this._loadMatrix(e, r);
              }),
              (n.prototype.saturate = function(t, r) {
                void 0 === t && (t = 0);
                var o = (2 * t) / 3 + 1,
                  n = -0.5 * (o - 1),
                  e = [
                    o,
                    n,
                    n,
                    0,
                    0,
                    n,
                    o,
                    n,
                    0,
                    0,
                    n,
                    n,
                    o,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ];
                this._loadMatrix(e, r);
              }),
              (n.prototype.desaturate = function() {
                this.saturate(-1);
              }),
              (n.prototype.negative = function(t) {
                this._loadMatrix(
                  [
                    -1,
                    0,
                    0,
                    1,
                    0,
                    0,
                    -1,
                    0,
                    1,
                    0,
                    0,
                    0,
                    -1,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.sepia = function(t) {
                this._loadMatrix(
                  [
                    0.393,
                    0.7689999,
                    0.18899999,
                    0,
                    0,
                    0.349,
                    0.6859999,
                    0.16799999,
                    0,
                    0,
                    0.272,
                    0.5339999,
                    0.13099999,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.technicolor = function(t) {
                this._loadMatrix(
                  [
                    1.9125277891456083,
                    -0.8545344976951645,
                    -0.09155508482755585,
                    0,
                    11.793603434377337,
                    -0.3087833385928097,
                    1.7658908555458428,
                    -0.10601743074722245,
                    0,
                    -70.35205161461398,
                    -0.231103377548616,
                    -0.7501899197440212,
                    1.847597816108189,
                    0,
                    30.950940869491138,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.polaroid = function(t) {
                this._loadMatrix(
                  [
                    1.438,
                    -0.062,
                    -0.062,
                    0,
                    0,
                    -0.122,
                    1.378,
                    -0.122,
                    0,
                    0,
                    -0.016,
                    -0.016,
                    1.483,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.toBGR = function(t) {
                this._loadMatrix(
                  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                  t
                );
              }),
              (n.prototype.kodachrome = function(t) {
                this._loadMatrix(
                  [
                    1.1285582396593525,
                    -0.3967382283601348,
                    -0.03992559172921793,
                    0,
                    63.72958762196502,
                    -0.16404339962244616,
                    1.0835251566291304,
                    -0.05498805115633132,
                    0,
                    24.732407896706203,
                    -0.16786010706155763,
                    -0.5603416277695248,
                    1.6014850761964943,
                    0,
                    35.62982807460946,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.browni = function(t) {
                this._loadMatrix(
                  [
                    0.5997023498159715,
                    0.34553243048391263,
                    -0.2708298674538042,
                    0,
                    47.43192855600873,
                    -0.037703249837783157,
                    0.8609577587992641,
                    0.15059552388459913,
                    0,
                    -36.96841498319127,
                    0.24113635128153335,
                    -0.07441037908422492,
                    0.44972182064877153,
                    0,
                    -7.562075277591283,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.vintage = function(t) {
                this._loadMatrix(
                  [
                    0.6279345635605994,
                    0.3202183420819367,
                    -0.03965408211312453,
                    0,
                    9.651285835294123,
                    0.02578397704808868,
                    0.6441188644374771,
                    0.03259127616149294,
                    0,
                    7.462829176470591,
                    0.0466055556782719,
                    -0.0851232987247891,
                    0.5241648018700465,
                    0,
                    5.159190588235296,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.colorTone = function(t, r, o, n, e) {
                var a = (((o = o || 16770432) >> 16) & 255) / 255,
                  i = ((o >> 8) & 255) / 255,
                  l = (255 & o) / 255,
                  u = (((n = n || 3375104) >> 16) & 255) / 255,
                  p = ((n >> 8) & 255) / 255,
                  s = (255 & n) / 255,
                  c = [
                    0.3,
                    0.59,
                    0.11,
                    0,
                    0,
                    a,
                    i,
                    l,
                    (t = t || 0.2),
                    0,
                    u,
                    p,
                    s,
                    (r = r || 0.15),
                    0,
                    a - u,
                    i - p,
                    l - s,
                    0,
                    0
                  ];
                this._loadMatrix(c, e);
              }),
              (n.prototype.night = function(t, r) {
                var o = [
                  -2 * (t = t || 0.1),
                  -t,
                  0,
                  0,
                  0,
                  -t,
                  0,
                  t,
                  0,
                  0,
                  0,
                  t,
                  2 * t,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
                ];
                this._loadMatrix(o, r);
              }),
              (n.prototype.predator = function(t, r) {
                var o = [
                  11.224130630493164 * t,
                  -4.794486999511719 * t,
                  -2.8746118545532227 * t,
                  0 * t,
                  0.40342438220977783 * t,
                  -3.6330697536468506 * t,
                  9.193157196044922 * t,
                  -2.951810836791992 * t,
                  0 * t,
                  -1.316135048866272 * t,
                  -3.2184197902679443 * t,
                  -4.2375030517578125 * t,
                  7.476448059082031 * t,
                  0 * t,
                  0.8044459223747253 * t,
                  0,
                  0,
                  0,
                  1,
                  0
                ];
                this._loadMatrix(o, r);
              }),
              (n.prototype.lsd = function(t) {
                this._loadMatrix(
                  [
                    2,
                    -0.4,
                    0.5,
                    0,
                    0,
                    -0.5,
                    2,
                    -0.4,
                    0,
                    0,
                    -0.4,
                    -0.5,
                    3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                  ],
                  t
                );
              }),
              (n.prototype.reset = function() {
                this._loadMatrix(
                  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                  !1
                );
              }),
              (e.matrix.get = function() {
                return this.uniforms.m;
              }),
              (e.matrix.set = function(t) {
                this.uniforms.m = t;
              }),
              (e.alpha.get = function() {
                return this.uniforms.uAlpha;
              }),
              (e.alpha.set = function(t) {
                this.uniforms.uAlpha = t;
              }),
              Object.defineProperties(n.prototype, e),
              n
            );
          })(t.Filter);
        (exports.ColorMatrixFilter = o),
          (o.prototype.grayscale = o.prototype.greyscale);
      },
      { "@pixi/core": "p2j5" }
    ],
    rpU2: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.DisplacementFilter = void 0);
        var t = require("@pixi/core"),
          r = require("@pixi/math"),
          e =
            "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n",
          i =
            "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n",
          n = (function(t) {
            function n(n, o) {
              var a = new r.Matrix();
              (n.renderable = !1),
                t.call(this, e, i, {
                  mapSampler: n._texture,
                  filterMatrix: a,
                  scale: { x: 1, y: 1 },
                  rotation: new Float32Array([1, 0, 0, 1])
                }),
                (this.maskSprite = n),
                (this.maskMatrix = a),
                null == o && (o = 20),
                (this.scale = new r.Point(o, o));
            }
            t && (n.__proto__ = t),
              (n.prototype = Object.create(t && t.prototype)),
              (n.prototype.constructor = n);
            var o = { map: { configurable: !0 } };
            return (
              (n.prototype.apply = function(t, r, e, i) {
                (this.uniforms.filterMatrix = t.calculateSpriteMatrix(
                  this.maskMatrix,
                  this.maskSprite
                )),
                  (this.uniforms.scale.x = this.scale.x),
                  (this.uniforms.scale.y = this.scale.y);
                var n = this.maskSprite.transform.worldTransform,
                  o = Math.sqrt(n.a * n.a + n.b * n.b),
                  a = Math.sqrt(n.c * n.c + n.d * n.d);
                0 !== o &&
                  0 !== a &&
                  ((this.uniforms.rotation[0] = n.a / o),
                  (this.uniforms.rotation[1] = n.b / o),
                  (this.uniforms.rotation[2] = n.c / a),
                  (this.uniforms.rotation[3] = n.d / a)),
                  t.applyFilter(this, r, e, i);
              }),
              (o.map.get = function() {
                return this.uniforms.mapSampler;
              }),
              (o.map.set = function(t) {
                this.uniforms.mapSampler = t;
              }),
              Object.defineProperties(n.prototype, o),
              n
            );
          })(t.Filter);
        exports.DisplacementFilter = n;
      },
      { "@pixi/core": "p2j5", "@pixi/math": "oNQC" }
    ],
    zKIa: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FXAAFilter = void 0);
        var n = require("@pixi/core"),
          e =
            "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputPixel;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",
          r =
            'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputPixel;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n',
          o = (function(n) {
            function o() {
              n.call(this, e, r);
            }
            return (
              n && (o.__proto__ = n),
              (o.prototype = Object.create(n && n.prototype)),
              (o.prototype.constructor = o),
              o
            );
          })(n.Filter);
        exports.FXAAFilter = o;
      },
      { "@pixi/core": "p2j5" }
    ],
    nEkq: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.NoiseFilter = void 0);
        var e = require("@pixi/core"),
          o =
            "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n",
          r = (function(r) {
            function n(n, i) {
              void 0 === n && (n = 0.5),
                void 0 === i && (i = Math.random()),
                r.call(this, e.defaultFilterVertex, o, { uNoise: 0, uSeed: 0 }),
                (this.noise = n),
                (this.seed = i);
            }
            r && (n.__proto__ = r),
              (n.prototype = Object.create(r && r.prototype)),
              (n.prototype.constructor = n);
            var i = { noise: { configurable: !0 }, seed: { configurable: !0 } };
            return (
              (i.noise.get = function() {
                return this.uniforms.uNoise;
              }),
              (i.noise.set = function(e) {
                this.uniforms.uNoise = e;
              }),
              (i.seed.get = function() {
                return this.uniforms.uSeed;
              }),
              (i.seed.set = function(e) {
                this.uniforms.uSeed = e;
              }),
              Object.defineProperties(n.prototype, i),
              n
            );
          })(e.Filter);
        exports.NoiseFilter = r;
      },
      { "@pixi/core": "p2j5" }
    ],
    fh0A: [
      function(require, module, exports) {
        "use strict";
        var t = require("@pixi/core"),
          a = require("@pixi/sprite"),
          e = require("@pixi/display"),
          i = require("@pixi/math"),
          s = require("@pixi/utils"),
          r = require("@pixi/settings"),
          n = new i.Matrix();
        (e.DisplayObject.prototype._cacheAsBitmap = !1),
          (e.DisplayObject.prototype._cacheData = !1);
        var h = function() {
          (this.textureCacheId = null),
            (this.originalRender = null),
            (this.originalRenderCanvas = null),
            (this.originalCalculateBounds = null),
            (this.originalGetLocalBounds = null),
            (this.originalUpdateTransform = null),
            (this.originalHitTest = null),
            (this.originalDestroy = null),
            (this.originalMask = null),
            (this.originalFilterArea = null),
            (this.sprite = null);
        };
        Object.defineProperties(e.DisplayObject.prototype, {
          cacheAsBitmap: {
            get: function() {
              return this._cacheAsBitmap;
            },
            set: function(t) {
              var a;
              this._cacheAsBitmap !== t &&
                ((this._cacheAsBitmap = t),
                t
                  ? (this._cacheData || (this._cacheData = new h()),
                    ((a = this._cacheData).originalRender = this.render),
                    (a.originalRenderCanvas = this.renderCanvas),
                    (a.originalUpdateTransform = this.updateTransform),
                    (a.originalCalculateBounds = this.calculateBounds),
                    (a.originalGetLocalBounds = this.getLocalBounds),
                    (a.originalDestroy = this.destroy),
                    (a.originalContainsPoint = this.containsPoint),
                    (a.originalMask = this._mask),
                    (a.originalFilterArea = this.filterArea),
                    (this.render = this._renderCached),
                    (this.renderCanvas = this._renderCachedCanvas),
                    (this.destroy = this._cacheAsBitmapDestroy))
                  : ((a = this._cacheData).sprite &&
                      this._destroyCachedDisplayObject(),
                    (this.render = a.originalRender),
                    (this.renderCanvas = a.originalRenderCanvas),
                    (this.calculateBounds = a.originalCalculateBounds),
                    (this.getLocalBounds = a.originalGetLocalBounds),
                    (this.destroy = a.originalDestroy),
                    (this.updateTransform = a.originalUpdateTransform),
                    (this.containsPoint = a.originalContainsPoint),
                    (this._mask = a.originalMask),
                    (this.filterArea = a.originalFilterArea)));
            }
          }
        }),
          (e.DisplayObject.prototype._renderCached = function(t) {
            !this.visible ||
              this.worldAlpha <= 0 ||
              !this.renderable ||
              (this._initCachedDisplayObject(t),
              (this._cacheData.sprite.transform._worldID = this.transform._worldID),
              (this._cacheData.sprite.worldAlpha = this.worldAlpha),
              this._cacheData.sprite._render(t));
          }),
          (e.DisplayObject.prototype._initCachedDisplayObject = function(e) {
            if (!this._cacheData || !this._cacheData.sprite) {
              var i = this.alpha;
              (this.alpha = 1), e.batch.flush();
              var h = this.getLocalBounds().clone();
              if (this.filters) {
                var o = this.filters[0].padding;
                h.pad(o);
              }
              h.ceil(r.settings.RESOLUTION);
              var c = e.renderTexture.current,
                l = e.renderTexture.sourceFrame,
                d = e.projection.transform,
                p = t.RenderTexture.create(h.width, h.height),
                u = "cacheAsBitmap_" + (0, s.uid)();
              (this._cacheData.textureCacheId = u),
                t.BaseTexture.addToCache(p.baseTexture, u),
                t.Texture.addToCache(p, u);
              var _ = n;
              (_.tx = -h.x),
                (_.ty = -h.y),
                this.transform.worldTransform.identity(),
                (this.render = this._cacheData.originalRender),
                e.render(this, p, !0, _, !0),
                (e.projection.transform = d),
                e.renderTexture.bind(c, l),
                (this.render = this._renderCached),
                (this.updateTransform = this.displayObjectUpdateTransform),
                (this.calculateBounds = this._calculateCachedBounds),
                (this.getLocalBounds = this._getCachedLocalBounds),
                (this._mask = null),
                (this.filterArea = null);
              var D = new a.Sprite(p);
              (D.transform.worldTransform = this.transform.worldTransform),
                (D.anchor.x = -h.x / h.width),
                (D.anchor.y = -h.y / h.height),
                (D.alpha = i),
                (D._bounds = this._bounds),
                (this._cacheData.sprite = D),
                (this.transform._parentID = -1),
                this.parent
                  ? this.updateTransform()
                  : ((this.parent = e._tempDisplayObjectParent),
                    this.updateTransform(),
                    (this.parent = null)),
                (this.containsPoint = D.containsPoint.bind(D));
            }
          }),
          (e.DisplayObject.prototype._renderCachedCanvas = function(t) {
            !this.visible ||
              this.worldAlpha <= 0 ||
              !this.renderable ||
              (this._initCachedDisplayObjectCanvas(t),
              (this._cacheData.sprite.worldAlpha = this.worldAlpha),
              this._cacheData.sprite._renderCanvas(t));
          }),
          (e.DisplayObject.prototype._initCachedDisplayObjectCanvas = function(
            e
          ) {
            if (!this._cacheData || !this._cacheData.sprite) {
              var i = this.getLocalBounds(),
                h = this.alpha;
              this.alpha = 1;
              var o = e.context;
              i.ceil(r.settings.RESOLUTION);
              var c = t.RenderTexture.create(i.width, i.height),
                l = "cacheAsBitmap_" + (0, s.uid)();
              (this._cacheData.textureCacheId = l),
                t.BaseTexture.addToCache(c.baseTexture, l),
                t.Texture.addToCache(c, l);
              var d = n;
              this.transform.localTransform.copyTo(d),
                d.invert(),
                (d.tx -= i.x),
                (d.ty -= i.y),
                (this.renderCanvas = this._cacheData.originalRenderCanvas),
                e.render(this, c, !0, d, !1),
                (e.context = o),
                (this.renderCanvas = this._renderCachedCanvas),
                (this.updateTransform = this.displayObjectUpdateTransform),
                (this.calculateBounds = this._calculateCachedBounds),
                (this.getLocalBounds = this._getCachedLocalBounds),
                (this._mask = null),
                (this.filterArea = null);
              var p = new a.Sprite(c);
              (p.transform.worldTransform = this.transform.worldTransform),
                (p.anchor.x = -i.x / i.width),
                (p.anchor.y = -i.y / i.height),
                (p.alpha = h),
                (p._bounds = this._bounds),
                (this._cacheData.sprite = p),
                (this.transform._parentID = -1),
                this.parent
                  ? this.updateTransform()
                  : ((this.parent = e._tempDisplayObjectParent),
                    this.updateTransform(),
                    (this.parent = null)),
                (this.containsPoint = p.containsPoint.bind(p));
            }
          }),
          (e.DisplayObject.prototype._calculateCachedBounds = function() {
            this._bounds.clear(),
              (this._cacheData.sprite.transform._worldID = this.transform._worldID),
              this._cacheData.sprite._calculateBounds(),
              (this._lastBoundsID = this._boundsID);
          }),
          (e.DisplayObject.prototype._getCachedLocalBounds = function() {
            return this._cacheData.sprite.getLocalBounds();
          }),
          (e.DisplayObject.prototype._destroyCachedDisplayObject = function() {
            this._cacheData.sprite._texture.destroy(!0),
              (this._cacheData.sprite = null),
              t.BaseTexture.removeFromCache(this._cacheData.textureCacheId),
              t.Texture.removeFromCache(this._cacheData.textureCacheId),
              (this._cacheData.textureCacheId = null);
          }),
          (e.DisplayObject.prototype._cacheAsBitmapDestroy = function(t) {
            (this.cacheAsBitmap = !1), this.destroy(t);
          });
      },
      {
        "@pixi/core": "p2j5",
        "@pixi/sprite": "ueA8",
        "@pixi/display": "nL3p",
        "@pixi/math": "oNQC",
        "@pixi/utils": "G5Tu",
        "@pixi/settings": "t4Uo"
      }
    ],
    CSWr: [
      function(require, module, exports) {
        "use strict";
        var e = require("@pixi/display");
        (e.DisplayObject.prototype.name = null),
          (e.Container.prototype.getChildByName = function(e) {
            for (var i = 0; i < this.children.length; i++)
              if (this.children[i].name === e) return this.children[i];
            return null;
          });
      },
      { "@pixi/display": "nL3p" }
    ],
    bmhz: [
      function(require, module, exports) {
        "use strict";
        var i = require("@pixi/display"),
          t = require("@pixi/math");
        i.DisplayObject.prototype.getGlobalPosition = function(i, o) {
          return (
            void 0 === i && (i = new t.Point()),
            void 0 === o && (o = !1),
            this.parent
              ? this.parent.toGlobal(this.position, i, o)
              : ((i.x = this.position.x), (i.y = this.position.y)),
            i
          );
        };
      },
      { "@pixi/display": "nL3p", "@pixi/math": "oNQC" }
    ],
    Ihaq: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.MeshMaterial = exports.MeshGeometry = exports.MeshBatchUvs = exports.Mesh = void 0);
        var t = require("@pixi/core"),
          e = require("@pixi/math"),
          r = require("@pixi/constants"),
          i = require("@pixi/display"),
          a = require("@pixi/settings"),
          s = require("@pixi/utils"),
          n = function(t, e) {
            (this.uvBuffer = t),
              (this.uvMatrix = e),
              (this.data = null),
              (this._bufferUpdateId = -1),
              (this._textureUpdateId = -1),
              (this._updateID = 0);
          };
        (exports.MeshBatchUvs = n),
          (n.prototype.update = function(t) {
            if (
              t ||
              this._bufferUpdateId !== this.uvBuffer._updateID ||
              this._textureUpdateId !== this.uvMatrix._updateID
            ) {
              (this._bufferUpdateId = this.uvBuffer._updateID),
                (this._textureUpdateId = this.uvMatrix._updateID);
              var e = this.uvBuffer.data;
              (this.data && this.data.length === e.length) ||
                (this.data = new Float32Array(e.length)),
                this.uvMatrix.multiplyUvs(e, this.data),
                this._updateID++;
            }
          });
        var o = new e.Point(),
          u = new e.Polygon(),
          h = (function(e) {
            function i(i, s, n, o) {
              void 0 === o && (o = r.DRAW_MODES.TRIANGLES),
                e.call(this),
                (this.geometry = i),
                i.refCount++,
                (this.shader = s),
                (this.state = n || t.State.for2d()),
                (this.drawMode = o),
                (this.start = 0),
                (this.size = 0),
                (this.uvs = null),
                (this.indices = null),
                (this.vertexData = new Float32Array(1)),
                (this.vertexDirty = 0),
                (this._transformID = -1),
                (this.tint = 16777215),
                (this.blendMode = r.BLEND_MODES.NORMAL),
                (this._roundPixels = a.settings.ROUND_PIXELS),
                (this.batchUvs = null);
            }
            e && (i.__proto__ = e),
              (i.prototype = Object.create(e && e.prototype)),
              (i.prototype.constructor = i);
            var s = {
              uvBuffer: { configurable: !0 },
              verticesBuffer: { configurable: !0 },
              material: { configurable: !0 },
              blendMode: { configurable: !0 },
              roundPixels: { configurable: !0 },
              tint: { configurable: !0 },
              texture: { configurable: !0 }
            };
            return (
              (s.uvBuffer.get = function() {
                return this.geometry.buffers[1];
              }),
              (s.verticesBuffer.get = function() {
                return this.geometry.buffers[0];
              }),
              (s.material.set = function(t) {
                this.shader = t;
              }),
              (s.material.get = function() {
                return this.shader;
              }),
              (s.blendMode.set = function(t) {
                this.state.blendMode = t;
              }),
              (s.blendMode.get = function() {
                return this.state.blendMode;
              }),
              (s.roundPixels.set = function(t) {
                this._roundPixels !== t && (this._transformID = -1),
                  (this._roundPixels = t);
              }),
              (s.roundPixels.get = function() {
                return this._roundPixels;
              }),
              (s.tint.get = function() {
                return this.shader.tint;
              }),
              (s.tint.set = function(t) {
                this.shader.tint = t;
              }),
              (s.texture.get = function() {
                return this.shader.texture;
              }),
              (s.texture.set = function(t) {
                this.shader.texture = t;
              }),
              (i.prototype._render = function(t) {
                var e = this.geometry.buffers[0].data;
                this.shader.batchable &&
                this.drawMode === r.DRAW_MODES.TRIANGLES &&
                e.length < 2 * i.BATCHABLE_SIZE
                  ? this._renderToBatch(t)
                  : this._renderDefault(t);
              }),
              (i.prototype._renderDefault = function(t) {
                var e = this.shader;
                (e.alpha = this.worldAlpha),
                  e.update && e.update(),
                  t.batch.flush(),
                  e.program.uniformData.translationMatrix &&
                    (e.uniforms.translationMatrix = this.transform.worldTransform.toArray(
                      !0
                    )),
                  t.shader.bind(e),
                  t.state.set(this.state),
                  t.geometry.bind(this.geometry, e),
                  t.geometry.draw(
                    this.drawMode,
                    this.size,
                    this.start,
                    this.geometry.instanceCount
                  );
              }),
              (i.prototype._renderToBatch = function(t) {
                var e = this.geometry;
                this.shader.uvMatrix &&
                  (this.shader.uvMatrix.update(), this.calculateUvs()),
                  this.calculateVertices(),
                  (this.indices = e.indexBuffer.data),
                  (this._tintRGB = this.shader._tintRGB),
                  (this._texture = this.shader.texture);
                var r = this.material.pluginName;
                t.batch.setObjectRenderer(t.plugins[r]),
                  t.plugins[r].render(this);
              }),
              (i.prototype.calculateVertices = function() {
                var t = this.geometry,
                  e = t.buffers[0].data;
                if (
                  t.vertexDirtyId !== this.vertexDirty ||
                  this._transformID !== this.transform._worldID
                ) {
                  (this._transformID = this.transform._worldID),
                    this.vertexData.length !== e.length &&
                      (this.vertexData = new Float32Array(e.length));
                  for (
                    var r = this.transform.worldTransform,
                      i = r.a,
                      a = r.b,
                      s = r.c,
                      n = r.d,
                      o = r.tx,
                      u = r.ty,
                      h = this.vertexData,
                      d = 0;
                    d < h.length / 2;
                    d++
                  ) {
                    var l = e[2 * d],
                      f = e[2 * d + 1];
                    (h[2 * d] = i * l + s * f + o),
                      (h[2 * d + 1] = a * l + n * f + u);
                  }
                  if (this._roundPixels)
                    for (var p = 0; p < h.length; p++) h[p] = Math.round(h[p]);
                  this.vertexDirty = t.vertexDirtyId;
                }
              }),
              (i.prototype.calculateUvs = function() {
                var t = this.geometry.buffers[1];
                this.shader.uvMatrix.isSimple
                  ? (this.uvs = t.data)
                  : (this.batchUvs ||
                      (this.batchUvs = new n(t, this.shader.uvMatrix)),
                    this.batchUvs.update(),
                    (this.uvs = this.batchUvs.data));
              }),
              (i.prototype._calculateBounds = function() {
                this.calculateVertices(),
                  this._bounds.addVertexData(
                    this.vertexData,
                    0,
                    this.vertexData.length
                  );
              }),
              (i.prototype.containsPoint = function(t) {
                if (!this.getBounds().contains(t.x, t.y)) return !1;
                this.worldTransform.applyInverse(t, o);
                for (
                  var e = this.geometry.getBuffer("aVertexPosition").data,
                    r = u.points,
                    i = this.geometry.getIndex().data,
                    a = i.length,
                    s = 4 === this.drawMode ? 3 : 1,
                    n = 0;
                  n + 2 < a;
                  n += s
                ) {
                  var h = 2 * i[n],
                    d = 2 * i[n + 1],
                    l = 2 * i[n + 2];
                  if (
                    ((r[0] = e[h]),
                    (r[1] = e[h + 1]),
                    (r[2] = e[d]),
                    (r[3] = e[d + 1]),
                    (r[4] = e[l]),
                    (r[5] = e[l + 1]),
                    u.contains(o.x, o.y))
                  )
                    return !0;
                }
                return !1;
              }),
              (i.prototype.destroy = function(t) {
                e.prototype.destroy.call(this, t),
                  this.geometry.refCount--,
                  0 === this.geometry.refCount && this.geometry.dispose(),
                  (this.geometry = null),
                  (this.shader = null),
                  (this.state = null),
                  (this.uvs = null),
                  (this.indices = null),
                  (this.vertexData = null);
              }),
              Object.defineProperties(i.prototype, s),
              i
            );
          })(i.Container);
        (exports.Mesh = h), (h.BATCHABLE_SIZE = 100);
        var d =
            "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n",
          l =
            "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n",
          f = (function(r) {
            function i(i, a) {
              var s = {
                uSampler: i,
                alpha: 1,
                uTextureMatrix: e.Matrix.IDENTITY,
                uColor: new Float32Array([1, 1, 1, 1])
              };
              (a = Object.assign(
                { tint: 16777215, alpha: 1, pluginName: "batch" },
                a
              )).uniforms && Object.assign(s, a.uniforms),
                r.call(this, a.program || t.Program.from(d, l), s),
                (this._colorDirty = !1),
                (this.uvMatrix = new t.TextureMatrix(i)),
                (this.batchable = void 0 === a.program),
                (this.pluginName = a.pluginName),
                (this.tint = a.tint),
                (this.alpha = a.alpha);
            }
            r && (i.__proto__ = r),
              (i.prototype = Object.create(r && r.prototype)),
              (i.prototype.constructor = i);
            var a = {
              texture: { configurable: !0 },
              alpha: { configurable: !0 },
              tint: { configurable: !0 }
            };
            return (
              (a.texture.get = function() {
                return this.uniforms.uSampler;
              }),
              (a.texture.set = function(t) {
                this.uniforms.uSampler !== t &&
                  ((this.uniforms.uSampler = t), (this.uvMatrix.texture = t));
              }),
              (a.alpha.set = function(t) {
                t !== this._alpha &&
                  ((this._alpha = t), (this._colorDirty = !0));
              }),
              (a.alpha.get = function() {
                return this._alpha;
              }),
              (a.tint.set = function(t) {
                t !== this._tint &&
                  ((this._tint = t),
                  (this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)),
                  (this._colorDirty = !0));
              }),
              (a.tint.get = function() {
                return this._tint;
              }),
              (i.prototype.update = function() {
                if (this._colorDirty) {
                  this._colorDirty = !1;
                  var t = this.texture.baseTexture;
                  (0, s.premultiplyTintToRgba)(
                    this._tint,
                    this._alpha,
                    this.uniforms.uColor,
                    t.alphaMode
                  );
                }
                this.uvMatrix.update() &&
                  (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
              }),
              Object.defineProperties(i.prototype, a),
              i
            );
          })(t.Shader);
        exports.MeshMaterial = f;
        var p = (function(e) {
          function i(i, a, s) {
            e.call(this);
            var n = new t.Buffer(i),
              o = new t.Buffer(a, !0),
              u = new t.Buffer(s, !0, !0);
            this.addAttribute("aVertexPosition", n, 2, !1, r.TYPES.FLOAT)
              .addAttribute("aTextureCoord", o, 2, !1, r.TYPES.FLOAT)
              .addIndex(u),
              (this._updateId = -1);
          }
          e && (i.__proto__ = e),
            (i.prototype = Object.create(e && e.prototype)),
            (i.prototype.constructor = i);
          var a = { vertexDirtyId: { configurable: !0 } };
          return (
            (a.vertexDirtyId.get = function() {
              return this.buffers[0]._updateID;
            }),
            Object.defineProperties(i.prototype, a),
            i
          );
        })(t.Geometry);
        exports.MeshGeometry = p;
      },
      {
        "@pixi/core": "p2j5",
        "@pixi/math": "oNQC",
        "@pixi/constants": "LQBK",
        "@pixi/display": "nL3p",
        "@pixi/settings": "t4Uo",
        "@pixi/utils": "G5Tu"
      }
    ],
    kDGc: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SimpleRope = exports.SimplePlane = exports.SimpleMesh = exports.RopeGeometry = exports.PlaneGeometry = exports.NineSlicePlane = void 0);
        var t = require("@pixi/mesh"),
          e = require("@pixi/constants"),
          i = require("@pixi/core"),
          r = (function(t) {
            function e(e, i, r, h) {
              void 0 === e && (e = 100),
                void 0 === i && (i = 100),
                void 0 === r && (r = 10),
                void 0 === h && (h = 10),
                t.call(this),
                (this.segWidth = r),
                (this.segHeight = h),
                (this.width = e),
                (this.height = i),
                this.build();
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype.build = function() {
                for (
                  var t = this.segWidth * this.segHeight,
                    e = [],
                    i = [],
                    r = [],
                    h = this.segWidth - 1,
                    o = this.segHeight - 1,
                    s = this.width / h,
                    a = this.height / o,
                    n = 0;
                  n < t;
                  n++
                ) {
                  var u = n % this.segWidth,
                    p = (n / this.segWidth) | 0;
                  e.push(u * s, p * a), i.push(u / h, p / o);
                }
                for (var d = h * o, g = 0; g < d; g++) {
                  var f = g % h,
                    c = (g / h) | 0,
                    l = c * this.segWidth + f,
                    _ = c * this.segWidth + f + 1,
                    y = (c + 1) * this.segWidth + f,
                    x = (c + 1) * this.segWidth + f + 1;
                  r.push(l, _, y, _, x, y);
                }
                (this.buffers[0].data = new Float32Array(e)),
                  (this.buffers[1].data = new Float32Array(i)),
                  (this.indexBuffer.data = new Uint16Array(r)),
                  this.buffers[0].update(),
                  this.buffers[1].update(),
                  this.indexBuffer.update();
              }),
              e
            );
          })(t.MeshGeometry);
        exports.PlaneGeometry = r;
        var h = (function(t) {
          function e(e, i, r) {
            void 0 === e && (e = 200),
              void 0 === r && (r = 0),
              t.call(
                this,
                new Float32Array(4 * i.length),
                new Float32Array(4 * i.length),
                new Uint16Array(6 * (i.length - 1))
              ),
              (this.points = i),
              (this.width = e),
              (this.textureScale = r),
              this.build();
          }
          return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.build = function() {
              var t = this.points;
              if (t) {
                var e = this.getBuffer("aVertexPosition"),
                  i = this.getBuffer("aTextureCoord"),
                  r = this.getIndex();
                if (!(t.length < 1)) {
                  e.data.length / 4 !== t.length &&
                    ((e.data = new Float32Array(4 * t.length)),
                    (i.data = new Float32Array(4 * t.length)),
                    (r.data = new Uint16Array(6 * (t.length - 1))));
                  var h = i.data,
                    o = r.data;
                  (h[0] = 0), (h[1] = 0), (h[2] = 0), (h[3] = 1);
                  for (
                    var s = 0,
                      a = t[0],
                      n = this.width * this.textureScale,
                      u = t.length,
                      p = 0;
                    p < u;
                    p++
                  ) {
                    var d = 4 * p;
                    if (this.textureScale > 0) {
                      var g = a.x - t[p].x,
                        f = a.y - t[p].y,
                        c = Math.sqrt(g * g + f * f);
                      (a = t[p]), (s += c / n);
                    } else s = p / (u - 1);
                    (h[d] = s), (h[d + 1] = 0), (h[d + 2] = s), (h[d + 3] = 1);
                  }
                  for (var l = 0, _ = 0; _ < u - 1; _++) {
                    var y = 2 * _;
                    (o[l++] = y),
                      (o[l++] = y + 1),
                      (o[l++] = y + 2),
                      (o[l++] = y + 2),
                      (o[l++] = y + 1),
                      (o[l++] = y + 3);
                  }
                  i.update(), r.update(), this.updateVertices();
                }
              }
            }),
            (e.prototype.updateVertices = function() {
              var t = this.points;
              if (!(t.length < 1)) {
                for (
                  var e,
                    i = t[0],
                    r = 0,
                    h = 0,
                    o = this.buffers[0].data,
                    s = t.length,
                    a = 0;
                  a < s;
                  a++
                ) {
                  var n = t[a],
                    u = 4 * a;
                  (h = -((e = a < t.length - 1 ? t[a + 1] : n).x - i.x)),
                    (r = e.y - i.y);
                  var p = Math.sqrt(r * r + h * h),
                    d =
                      this.textureScale > 0
                        ? (this.textureScale * this.width) / 2
                        : this.width / 2;
                  (r /= p),
                    (h /= p),
                    (r *= d),
                    (h *= d),
                    (o[u] = n.x + r),
                    (o[u + 1] = n.y + h),
                    (o[u + 2] = n.x - r),
                    (o[u + 3] = n.y - h),
                    (i = n);
                }
                this.buffers[0].update();
              }
            }),
            (e.prototype.update = function() {
              this.textureScale > 0 ? this.build() : this.updateVertices();
            }),
            e
          );
        })(t.MeshGeometry);
        exports.RopeGeometry = h;
        var o = (function(i) {
          function r(r, o, s) {
            void 0 === s && (s = 0);
            var a = new h(r.height, o, s),
              n = new t.MeshMaterial(r);
            s > 0 && (r.baseTexture.wrapMode = e.WRAP_MODES.REPEAT),
              i.call(this, a, n),
              (this.autoUpdate = !0);
          }
          return (
            i && (r.__proto__ = i),
            (r.prototype = Object.create(i && i.prototype)),
            (r.prototype.constructor = r),
            (r.prototype._render = function(t) {
              (this.autoUpdate ||
                this.geometry.width !== this.shader.texture.height) &&
                ((this.geometry.width = this.shader.texture.height),
                this.geometry.update()),
                i.prototype._render.call(this, t);
            }),
            r
          );
        })(t.Mesh);
        exports.SimpleRope = o;
        var s = (function(e) {
          function h(h, o, s) {
            var a = new r(h.width, h.height, o, s),
              n = new t.MeshMaterial(i.Texture.WHITE);
            e.call(this, a, n), (this.texture = h);
          }
          e && (h.__proto__ = e),
            (h.prototype = Object.create(e && e.prototype)),
            (h.prototype.constructor = h);
          var o = { texture: { configurable: !0 } };
          return (
            (h.prototype.textureUpdated = function() {
              (this._textureID = this.shader.texture._updateID),
                (this.geometry.width = this.shader.texture.width),
                (this.geometry.height = this.shader.texture.height),
                this.geometry.build();
            }),
            (o.texture.set = function(t) {
              this.shader.texture !== t &&
                ((this.shader.texture = t),
                (this._textureID = -1),
                t.baseTexture.valid
                  ? this.textureUpdated()
                  : t.once("update", this.textureUpdated, this));
            }),
            (o.texture.get = function() {
              return this.shader.texture;
            }),
            (h.prototype._render = function(t) {
              this._textureID !== this.shader.texture._updateID &&
                this.textureUpdated(),
                e.prototype._render.call(this, t);
            }),
            Object.defineProperties(h.prototype, o),
            h
          );
        })(t.Mesh);
        exports.SimplePlane = s;
        var a = (function(e) {
          function r(r, h, o, s, a) {
            void 0 === r && (r = i.Texture.EMPTY);
            var n = new t.MeshGeometry(h, o, s);
            n.getBuffer("aVertexPosition").static = !1;
            var u = new t.MeshMaterial(r);
            e.call(this, n, u, null, a), (this.autoUpdate = !0);
          }
          e && (r.__proto__ = e),
            (r.prototype = Object.create(e && e.prototype)),
            (r.prototype.constructor = r);
          var h = { vertices: { configurable: !0 } };
          return (
            (h.vertices.get = function() {
              return this.geometry.getBuffer("aVertexPosition").data;
            }),
            (h.vertices.set = function(t) {
              this.geometry.getBuffer("aVertexPosition").data = t;
            }),
            (r.prototype._render = function(t) {
              this.autoUpdate &&
                this.geometry.getBuffer("aVertexPosition").update(),
                e.prototype._render.call(this, t);
            }),
            Object.defineProperties(r.prototype, h),
            r
          );
        })(t.Mesh);
        exports.SimpleMesh = a;
        var n = 10,
          u = (function(t) {
            function e(e, r, h, o, s) {
              t.call(this, i.Texture.WHITE, 4, 4),
                (this._origWidth = e.orig.width),
                (this._origHeight = e.orig.height),
                (this._width = this._origWidth),
                (this._height = this._origHeight),
                (this._leftWidth = void 0 !== r ? r : n),
                (this._rightWidth = void 0 !== o ? o : n),
                (this._topHeight = void 0 !== h ? h : n),
                (this._bottomHeight = void 0 !== s ? s : n),
                (this.texture = e);
            }
            t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e);
            var r = {
              vertices: { configurable: !0 },
              width: { configurable: !0 },
              height: { configurable: !0 },
              leftWidth: { configurable: !0 },
              rightWidth: { configurable: !0 },
              topHeight: { configurable: !0 },
              bottomHeight: { configurable: !0 }
            };
            return (
              (e.prototype.textureUpdated = function() {
                (this._textureID = this.shader.texture._updateID),
                  this._refresh();
              }),
              (r.vertices.get = function() {
                return this.geometry.getBuffer("aVertexPosition").data;
              }),
              (r.vertices.set = function(t) {
                this.geometry.getBuffer("aVertexPosition").data = t;
              }),
              (e.prototype.updateHorizontalVertices = function() {
                var t = this.vertices,
                  e = this._topHeight + this._bottomHeight,
                  i = this._height > e ? 1 : this._height / e;
                (t[9] = t[11] = t[13] = t[15] = this._topHeight * i),
                  (t[17] = t[19] = t[21] = t[23] =
                    this._height - this._bottomHeight * i),
                  (t[25] = t[27] = t[29] = t[31] = this._height);
              }),
              (e.prototype.updateVerticalVertices = function() {
                var t = this.vertices,
                  e = this._leftWidth + this._rightWidth,
                  i = this._width > e ? 1 : this._width / e;
                (t[2] = t[10] = t[18] = t[26] = this._leftWidth * i),
                  (t[4] = t[12] = t[20] = t[28] =
                    this._width - this._rightWidth * i),
                  (t[6] = t[14] = t[22] = t[30] = this._width);
              }),
              (r.width.get = function() {
                return this._width;
              }),
              (r.width.set = function(t) {
                (this._width = t), this._refresh();
              }),
              (r.height.get = function() {
                return this._height;
              }),
              (r.height.set = function(t) {
                (this._height = t), this._refresh();
              }),
              (r.leftWidth.get = function() {
                return this._leftWidth;
              }),
              (r.leftWidth.set = function(t) {
                (this._leftWidth = t), this._refresh();
              }),
              (r.rightWidth.get = function() {
                return this._rightWidth;
              }),
              (r.rightWidth.set = function(t) {
                (this._rightWidth = t), this._refresh();
              }),
              (r.topHeight.get = function() {
                return this._topHeight;
              }),
              (r.topHeight.set = function(t) {
                (this._topHeight = t), this._refresh();
              }),
              (r.bottomHeight.get = function() {
                return this._bottomHeight;
              }),
              (r.bottomHeight.set = function(t) {
                (this._bottomHeight = t), this._refresh();
              }),
              (e.prototype._refresh = function() {
                var t = this.texture,
                  e = this.geometry.buffers[1].data;
                (this._origWidth = t.orig.width),
                  (this._origHeight = t.orig.height);
                var i = 1 / this._origWidth,
                  r = 1 / this._origHeight;
                (e[0] = e[8] = e[16] = e[24] = 0),
                  (e[1] = e[3] = e[5] = e[7] = 0),
                  (e[6] = e[14] = e[22] = e[30] = 1),
                  (e[25] = e[27] = e[29] = e[31] = 1),
                  (e[2] = e[10] = e[18] = e[26] = i * this._leftWidth),
                  (e[4] = e[12] = e[20] = e[28] = 1 - i * this._rightWidth),
                  (e[9] = e[11] = e[13] = e[15] = r * this._topHeight),
                  (e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight),
                  this.updateHorizontalVertices(),
                  this.updateVerticalVertices(),
                  this.geometry.buffers[0].update(),
                  this.geometry.buffers[1].update();
              }),
              Object.defineProperties(e.prototype, r),
              e
            );
          })(s);
        exports.NineSlicePlane = u;
      },
      { "@pixi/mesh": "Ihaq", "@pixi/constants": "LQBK", "@pixi/core": "p2j5" }
    ],
    GC82: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.AnimatedSprite = void 0);
        var t = require("@pixi/core"),
          e = require("@pixi/sprite"),
          r = require("@pixi/ticker"),
          i = (function(e) {
            function i(r, i) {
              e.call(this, r[0] instanceof t.Texture ? r[0] : r[0].texture),
                (this._textures = null),
                (this._durations = null),
                (this.textures = r),
                (this._autoUpdate = !1 !== i),
                (this.animationSpeed = 1),
                (this.loop = !0),
                (this.updateAnchor = !1),
                (this.onComplete = null),
                (this.onFrameChange = null),
                (this.onLoop = null),
                (this._currentTime = 0),
                (this.playing = !1);
            }
            e && (i.__proto__ = e),
              (i.prototype = Object.create(e && e.prototype)),
              (i.prototype.constructor = i);
            var s = {
              totalFrames: { configurable: !0 },
              textures: { configurable: !0 },
              currentFrame: { configurable: !0 }
            };
            return (
              (i.prototype.stop = function() {
                this.playing &&
                  ((this.playing = !1),
                  this._autoUpdate &&
                    r.Ticker.shared.remove(this.update, this));
              }),
              (i.prototype.play = function() {
                this.playing ||
                  ((this.playing = !0),
                  this._autoUpdate &&
                    r.Ticker.shared.add(
                      this.update,
                      this,
                      r.UPDATE_PRIORITY.HIGH
                    ));
              }),
              (i.prototype.gotoAndStop = function(t) {
                this.stop();
                var e = this.currentFrame;
                (this._currentTime = t),
                  e !== this.currentFrame && this.updateTexture();
              }),
              (i.prototype.gotoAndPlay = function(t) {
                var e = this.currentFrame;
                (this._currentTime = t),
                  e !== this.currentFrame && this.updateTexture(),
                  this.play();
              }),
              (i.prototype.update = function(t) {
                var e = this.animationSpeed * t,
                  r = this.currentFrame;
                if (null !== this._durations) {
                  var i =
                    (this._currentTime % 1) *
                    this._durations[this.currentFrame];
                  for (i += (e / 60) * 1e3; i < 0; )
                    this._currentTime--,
                      (i += this._durations[this.currentFrame]);
                  var s = Math.sign(this.animationSpeed * t);
                  for (
                    this._currentTime = Math.floor(this._currentTime);
                    i >= this._durations[this.currentFrame];

                  )
                    (i -= this._durations[this.currentFrame] * s),
                      (this._currentTime += s);
                  this._currentTime += i / this._durations[this.currentFrame];
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop
                  ? (this.gotoAndStop(0), this.onComplete && this.onComplete())
                  : this._currentTime >= this._textures.length && !this.loop
                  ? (this.gotoAndStop(this._textures.length - 1),
                    this.onComplete && this.onComplete())
                  : r !== this.currentFrame &&
                    (this.loop &&
                      this.onLoop &&
                      (this.animationSpeed > 0 && this.currentFrame < r
                        ? this.onLoop()
                        : this.animationSpeed < 0 &&
                          this.currentFrame > r &&
                          this.onLoop()),
                    this.updateTexture());
              }),
              (i.prototype.updateTexture = function() {
                (this._texture = this._textures[this.currentFrame]),
                  (this._textureID = -1),
                  (this._textureTrimmedID = -1),
                  (this._cachedTint = 16777215),
                  (this.uvs = this._texture._uvs.uvsFloat32),
                  this.updateAnchor &&
                    this._anchor.copyFrom(this._texture.defaultAnchor),
                  this.onFrameChange && this.onFrameChange(this.currentFrame);
              }),
              (i.prototype.destroy = function(t) {
                this.stop(),
                  e.prototype.destroy.call(this, t),
                  (this.onComplete = null),
                  (this.onFrameChange = null),
                  (this.onLoop = null);
              }),
              (i.fromFrames = function(e) {
                for (var r = [], s = 0; s < e.length; ++s)
                  r.push(t.Texture.from(e[s]));
                return new i(r);
              }),
              (i.fromImages = function(e) {
                for (var r = [], s = 0; s < e.length; ++s)
                  r.push(t.Texture.from(e[s]));
                return new i(r);
              }),
              (s.totalFrames.get = function() {
                return this._textures.length;
              }),
              (s.textures.get = function() {
                return this._textures;
              }),
              (s.textures.set = function(e) {
                if (e[0] instanceof t.Texture)
                  (this._textures = e), (this._durations = null);
                else {
                  (this._textures = []), (this._durations = []);
                  for (var r = 0; r < e.length; r++)
                    this._textures.push(e[r].texture),
                      this._durations.push(e[r].time);
                }
                this.gotoAndStop(0), this.updateTexture();
              }),
              (s.currentFrame.get = function() {
                var t = Math.floor(this._currentTime) % this._textures.length;
                return t < 0 && (t += this._textures.length), t;
              }),
              Object.defineProperties(i.prototype, s),
              i
            );
          })(e.Sprite);
        exports.AnimatedSprite = i;
      },
      { "@pixi/core": "p2j5", "@pixi/sprite": "ueA8", "@pixi/ticker": "F3Q6" }
    ],
    wbEC: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = {
          VERSION: !0,
          filters: !0,
          useDeprecated: !0,
          accessibility: !0,
          extract: !0,
          interaction: !0,
          prepare: !0,
          utils: !0
        };
        (exports.useDeprecated = w),
          (exports.utils = exports.prepare = exports.interaction = exports.extract = exports.accessibility = exports.filters = exports.VERSION = void 0),
          require("@pixi/polyfill");
        var r = L(require("@pixi/accessibility"));
        exports.accessibility = r;
        var t = L(require("@pixi/extract"));
        exports.extract = t;
        var o = L(require("@pixi/interaction"));
        exports.interaction = o;
        var n = L(require("@pixi/prepare"));
        exports.prepare = n;
        var i = L(require("@pixi/utils"));
        exports.utils = i;
        var a = require("@pixi/app");
        Object.keys(a).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return a[r];
                }
              }));
        });
        var s = require("@pixi/core");
        Object.keys(s).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return s[r];
                }
              }));
        });
        var c = require("@pixi/loaders");
        Object.keys(c).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return c[r];
                }
              }));
        });
        var p = require("@pixi/particles");
        Object.keys(p).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return p[r];
                }
              }));
        });
        var u = require("@pixi/spritesheet");
        Object.keys(u).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return u[r];
                }
              }));
        });
        var d = require("@pixi/sprite-tiling");
        Object.keys(d).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return d[r];
                }
              }));
        });
        var l = require("@pixi/text-bitmap");
        Object.keys(l).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return l[r];
                }
              }));
        });
        var I = require("@pixi/ticker");
        Object.keys(I).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return I[r];
                }
              }));
        });
        var f = require("@pixi/filter-alpha"),
          h = require("@pixi/filter-blur"),
          P = require("@pixi/filter-color-matrix"),
          m = require("@pixi/filter-displacement"),
          y = require("@pixi/filter-fxaa"),
          b = require("@pixi/filter-noise");
        require("@pixi/mixin-cache-as-bitmap"),
          require("@pixi/mixin-get-child-by-name"),
          require("@pixi/mixin-get-global-position");
        var g = require("@pixi/constants");
        Object.keys(g).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return g[r];
                }
              }));
        });
        var x = require("@pixi/display");
        Object.keys(x).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return x[r];
                }
              }));
        });
        var X = require("@pixi/graphics");
        Object.keys(X).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return X[r];
                }
              }));
        });
        var v = require("@pixi/math");
        Object.keys(v).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return v[r];
                }
              }));
        });
        var O = require("@pixi/mesh");
        Object.keys(O).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return O[r];
                }
              }));
        });
        var S = require("@pixi/mesh-extras");
        Object.keys(S).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return S[r];
                }
              }));
        });
        var R = require("@pixi/runner");
        Object.keys(R).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return R[r];
                }
              }));
        });
        var M = require("@pixi/sprite");
        Object.keys(M).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return M[r];
                }
              }));
        });
        var j = require("@pixi/sprite-animated");
        Object.keys(j).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return j[r];
                }
              }));
        });
        var T = require("@pixi/text");
        Object.keys(T).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return T[r];
                }
              }));
        });
        var F = require("@pixi/settings");
        function _() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (_ = function() {
              return e;
            }),
            e
          );
        }
        function L(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var r = _();
          if (r && r.has(e)) return r.get(e);
          var t = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var n in e)
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              var i = o ? Object.getOwnPropertyDescriptor(e, n) : null;
              i && (i.get || i.set)
                ? Object.defineProperty(t, n, i)
                : (t[n] = e[n]);
            }
          return (t.default = e), r && r.set(e, t), t;
        }
        Object.keys(F).forEach(function(r) {
          "default" !== r &&
            "__esModule" !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return F[r];
                }
              }));
        });
        var B = "5.0.0";
        function w() {
          var e = this;
          Object.defineProperties(e, {
            SVG_SIZE: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.utils.SVG_SIZE property has moved to PIXI.resources.SVGResource.SVG_SIZE"
                  ),
                  e.SVGResource.SVG_SIZE
                );
              }
            },
            TransformStatic: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.TransformStatic class has been removed, use PIXI.Transform"
                  ),
                  e.Transform
                );
              }
            },
            TransformBase: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.TransformBase class has been removed, use PIXI.Transform"
                  ),
                  e.Transform
                );
              }
            },
            TRANSFORM_MODE: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.TRANSFORM_MODE property has been removed"
                  ),
                  { STATIC: 0, DYNAMIC: 1 }
                );
              }
            },
            WebGLRenderer: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.WebGLRenderer class has moved to PIXI.Renderer"
                  ),
                  e.Renderer
                );
              }
            },
            CanvasRenderTarget: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.CanvasRenderTarget class has moved to PIXI.utils.CanvasRenderTarget"
                  ),
                  e.utils.CanvasRenderTarget
                );
              }
            },
            loader: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.loader instance has moved to PIXI.Loader.shared"
                  ),
                  e.Loader.shared
                );
              }
            },
            FilterManager: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.FilterManager class has moved to PIXI.systems.FilterSystem"
                  ),
                  e.systems.FilterSystem
                );
              }
            },
            CanvasTinter: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    "5.2.0",
                    "PIXI.CanvasTinter namespace has moved to PIXI.canvasUtils"
                  ),
                  e.canvasUtils
                );
              }
            },
            GroupD8: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    "5.2.0",
                    "PIXI.GroupD8 namespace has moved to PIXI.groupD8"
                  ),
                  e.groupD8
                );
              }
            }
          }),
            (e.extras = {}),
            Object.defineProperties(e.extras, {
              TilingSprite: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.extras.TilingSprite class has moved to PIXI.TilingSprite"
                    ),
                    e.TilingSprite
                  );
                }
              },
              TilingSpriteRenderer: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.extras.TilingSpriteRenderer class has moved to PIXI.TilingSpriteRenderer"
                    ),
                    e.TilingSpriteRenderer
                  );
                }
              },
              AnimatedSprite: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.extras.AnimatedSprite class has moved to PIXI.AnimatedSprite"
                    ),
                    e.AnimatedSprite
                  );
                }
              },
              BitmapText: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.extras.BitmapText class has moved to PIXI.BitmapText"
                    ),
                    e.BitmapText
                  );
                }
              }
            }),
            Object.defineProperties(e.utils, {
              getSvgSize: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.utils.getSvgSize function has moved to PIXI.resources.SVGResource.getSize"
                    ),
                    e.SVGResource.getSize
                  );
                }
              }
            }),
            (e.mesh = {}),
            Object.defineProperties(e.mesh, {
              Mesh: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.Mesh class has moved to PIXI.SimpleMesh"
                    ),
                    e.SimpleMesh
                  );
                }
              },
              NineSlicePlane: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.NineSlicePlane class has moved to PIXI.NineSlicePlane"
                    ),
                    e.NineSlicePlane
                  );
                }
              },
              Plane: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.Plane class has moved to PIXI.SimplePlane"
                    ),
                    e.SimplePlane
                  );
                }
              },
              Rope: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.Rope class has moved to PIXI.SimpleRope"
                    ),
                    e.SimpleRope
                  );
                }
              },
              RawMesh: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.RawMesh class has moved to PIXI.Mesh"
                    ),
                    e.Mesh
                  );
                }
              },
              CanvasMeshRenderer: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.CanvasMeshRenderer class has moved to PIXI.CanvasMeshRenderer"
                    ),
                    e.CanvasMeshRenderer
                  );
                }
              },
              MeshRenderer: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.mesh.MeshRenderer class has moved to PIXI.MeshRenderer"
                    ),
                    e.MeshRenderer
                  );
                }
              }
            }),
            (e.particles = {}),
            Object.defineProperties(e.particles, {
              ParticleContainer: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.particles.ParticleContainer class has moved to PIXI.ParticleContainer"
                    ),
                    e.ParticleContainer
                  );
                }
              },
              ParticleRenderer: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.particles.ParticleRenderer class has moved to PIXI.ParticleRenderer"
                    ),
                    e.ParticleRenderer
                  );
                }
              }
            }),
            (e.ticker = {}),
            Object.defineProperties(e.ticker, {
              Ticker: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.ticker.Ticker class has moved to PIXI.Ticker"
                    ),
                    e.Ticker
                  );
                }
              },
              shared: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.ticker.shared instance has moved to PIXI.Ticker.shared"
                    ),
                    e.Ticker.shared
                  );
                }
              }
            }),
            (e.loaders = {}),
            Object.defineProperties(e.loaders, {
              Loader: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.Loader class has moved to PIXI.Loader"
                    ),
                    e.Loader
                  );
                }
              },
              Resource: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.Resource class has moved to PIXI.LoaderResource"
                    ),
                    e.LoaderResource
                  );
                }
              },
              bitmapFontParser: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.bitmapFontParser function has moved to PIXI.BitmapFontLoader.use"
                    ),
                    e.BitmapFontLoader.use
                  );
                }
              },
              parseBitmapFontData: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.parseBitmapFontData function has moved to PIXI.BitmapFontLoader.parse"
                    ),
                    e.BitmapFontLoader.parse
                  );
                }
              },
              spritesheetParser: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.spritesheetParser function has moved to PIXI.SpritesheetLoader.use"
                    ),
                    e.SpritesheetLoader.use
                  );
                }
              },
              getResourcePath: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.loaders.getResourcePath property has moved to PIXI.SpritesheetLoader.getResourcePath"
                    ),
                    e.SpritesheetLoader.getResourcePath
                  );
                }
              }
            }),
            (e.Loader.addPixiMiddleware = function(r) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.loaders.Loader.addPixiMiddleware function is deprecated, use PIXI.loaders.Loader.registerPlugin"
                ),
                e.loaders.Loader.registerPlugin({ use: r() })
              );
            }),
            Object.defineProperty(e.extract, "WebGLExtract", {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.extract.WebGLExtract method has moved to PIXI.extract.Extract"
                  ),
                  e.extract.Extract
                );
              }
            }),
            Object.defineProperty(e.prepare, "WebGLPrepare", {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.prepare.WebGLPrepare class has moved to PIXI.prepare.Prepare"
                  ),
                  e.prepare.Prepare
                );
              }
            }),
            (e.Container.prototype._renderWebGL = function(e) {
              (0, i.deprecation)(
                B,
                "PIXI.Container._renderWebGL method has moved to PIXI.Container._render"
              ),
                this._render(e);
            }),
            (e.Container.prototype.renderWebGL = function(e) {
              (0, i.deprecation)(
                B,
                "PIXI.Container.renderWebGL method has moved to PIXI.Container.render"
              ),
                this.render(e);
            }),
            (e.DisplayObject.prototype.renderWebGL = function(e) {
              (0, i.deprecation)(
                B,
                "PIXI.DisplayObject.renderWebGL method has moved to PIXI.DisplayObject.render"
              ),
                this.render(e);
            }),
            (e.Container.prototype.renderAdvancedWebGL = function(e) {
              (0, i.deprecation)(
                B,
                "PIXI.Container.renderAdvancedWebGL method has moved to PIXI.Container.renderAdvanced"
              ),
                this.renderAdvanced(e);
            }),
            Object.defineProperties(e.settings, {
              TRANSFORM_MODE: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.settings.TRANSFORM_MODE property has been removed"
                    ),
                    0
                  );
                },
                set: function() {
                  (0, i.deprecation)(
                    B,
                    "PIXI.settings.TRANSFORM_MODE property has been removed"
                  );
                }
              }
            });
          var r = e.BaseTexture;
          r.prototype.loadSource = function(r) {
            (0, i.deprecation)(
              B,
              "PIXI.BaseTexture.loadSource method has been deprecated"
            );
            var t = e.resources.autoDetectResource(r);
            (t.internal = !0), this.setResource(t), this.update();
          };
          var t = !1;
          Object.defineProperties(r.prototype, {
            hasLoaded: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.BaseTexture.hasLoaded property has been removed, use PIXI.BaseTexture.valid"
                  ),
                  this.valid
                );
              }
            },
            imageUrl: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.BaseTexture.imageUrl property has been removed, use PIXI.BaseTexture.resource.url"
                  ),
                  this.resource && this.resource.url
                );
              },
              set: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.BaseTexture.imageUrl property has been removed, use PIXI.BaseTexture.resource.url"
                ),
                  this.resource && (this.resource.url = e);
              }
            },
            source: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.BaseTexture.source property has been moved, use `PIXI.BaseTexture.resource.source`"
                  ),
                  this.resource && this.resource.source
                );
              },
              set: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.BaseTexture.source property has been moved, use `PIXI.BaseTexture.resource.source` if you want to set HTMLCanvasElement. Otherwise, create new BaseTexture."
                ),
                  this.resource && (this.resource.source = e);
              }
            },
            premultiplyAlpha: {
              get: function() {
                return (
                  (0, i.deprecation)(
                    "5.2.0",
                    "PIXI.BaseTexture.premultiplyAlpha property has been changed to `alphaMode`, see `PIXI.ALPHA_MODES`"
                  ),
                  0 !== this.alphaMode
                );
              },
              set: function(e) {
                (0, i.deprecation)(
                  "5.2.0",
                  "PIXI.BaseTexture.premultiplyAlpha property has been changed to `alphaMode`, see `PIXI.ALPHA_MODES`"
                ),
                  (this.alphaMode = Number(e));
              }
            },
            _id: {
              get: function() {
                return (
                  t ||
                    ((0, i.deprecation)(
                      "5.2.0",
                      "PIXI.BaseTexture._id batch local field has been changed to `_batchLocation`"
                    ),
                    (t = !0)),
                  this._batchLocation
                );
              },
              set: function(e) {
                this._batchLocation = e;
              }
            }
          }),
            (r.fromImage = function(e, t, o, n) {
              (0, i.deprecation)(
                B,
                "PIXI.BaseTexture.fromImage method has been replaced with PIXI.BaseTexture.from"
              );
              var a = { scale: n, crossorigin: t };
              return r.from(e, { scaleMode: o, resourceOptions: a });
            }),
            (r.fromCanvas = function(e, t) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.BaseTexture.fromCanvas method has been replaced with PIXI.BaseTexture.from"
                ),
                r.from(e, { scaleMode: t })
              );
            }),
            (r.fromSVG = function(e, t, o, n) {
              (0, i.deprecation)(
                B,
                "PIXI.BaseTexture.fromSVG method has been replaced with PIXI.BaseTexture.from"
              );
              var a = { scale: n, crossorigin: t };
              return r.from(e, { scaleMode: o, resourceOptions: a });
            }),
            Object.defineProperties(e.resources.ImageResource.prototype, {
              premultiplyAlpha: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      "5.2.0",
                      "PIXI.resources.ImageResource.premultiplyAlpha property has been changed to `alphaMode`, see `PIXI.ALPHA_MODES`"
                    ),
                    0 !== this.alphaMode
                  );
                },
                set: function(e) {
                  (0, i.deprecation)(
                    "5.2.0",
                    "PIXI.resources.ImageResource.premultiplyAlpha property has been changed to `alphaMode`, see `PIXI.ALPHA_MODES`"
                  ),
                    (this.alphaMode = Number(e));
                }
              }
            }),
            (e.Point.prototype.copy = function(e) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.Point.copy method has been replaced with PIXI.Point.copyFrom"
                ),
                this.copyFrom(e)
              );
            }),
            (e.ObservablePoint.prototype.copy = function(e) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.ObservablePoint.copy method has been replaced with PIXI.ObservablePoint.copyFrom"
                ),
                this.copyFrom(e)
              );
            }),
            (e.Rectangle.prototype.copy = function(e) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.Rectangle.copy method has been replaced with PIXI.Rectangle.copyFrom"
                ),
                this.copyFrom(e)
              );
            }),
            (e.Matrix.prototype.copy = function(e) {
              return (
                (0, i.deprecation)(
                  B,
                  "PIXI.Matrix.copy method has been replaced with PIXI.Matrix.copyTo"
                ),
                this.copyTo(e)
              );
            }),
            (e.systems.StateSystem.prototype.setState = function(e) {
              return (
                (0, i.deprecation)(
                  "v5.1.0",
                  "StateSystem.setState has been renamed to StateSystem.set"
                ),
                this.set(e)
              );
            }),
            Object.assign(e.systems.FilterSystem.prototype, {
              getRenderTarget: function(e, r) {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.FilterManager.getRenderTarget method has been replaced with PIXI.systems.FilterSystem#getFilterTexture"
                  ),
                  this.getFilterTexture(r)
                );
              },
              returnRenderTarget: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.FilterManager.returnRenderTarget method has been replaced with PIXI.systems.FilterSystem.returnFilterTexture"
                ),
                  this.returnFilterTexture(e);
              },
              calculateScreenSpaceMatrix: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.systems.FilterSystem.calculateScreenSpaceMatrix method is removed, use `(vTextureCoord * inputSize.xy) + outputFrame.xy` instead"
                );
                var r = e.identity(),
                  t = this.activeState,
                  o = t.sourceFrame,
                  n = t.destinationFrame;
                return (
                  r.translate(o.x / n.width, o.y / n.height),
                  r.scale(n.width, n.height),
                  r
                );
              },
              calculateNormalizedScreenSpaceMatrix: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.systems.FilterManager.calculateNormalizedScreenSpaceMatrix method is removed, use `((vTextureCoord * inputSize.xy) + outputFrame.xy) / outputFrame.zw` instead."
                );
                var r = this.activeState,
                  t = r.sourceFrame,
                  o = r.destinationFrame,
                  n = e.identity();
                n.translate(t.x / o.width, t.y / o.height);
                var a = o.width / t.width,
                  s = o.height / t.height;
                return n.scale(a, s), n;
              }
            }),
            Object.defineProperties(e.RenderTexture.prototype, {
              sourceFrame: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.RenderTexture.sourceFrame property has been removed"
                    ),
                    this.filterFrame
                  );
                }
              },
              size: {
                get: function() {
                  return (
                    (0, i.deprecation)(
                      B,
                      "PIXI.RenderTexture.size property has been removed"
                    ),
                    this._frame
                  );
                }
              }
            });
          var o = (function(e) {
              function r(r, t, o, n) {
                (0, i.deprecation)(
                  B,
                  "PIXI.filters.BlurXFilter class is deprecated, use PIXI.filters.BlurFilterPass"
                ),
                  e.call(this, !0, r, t, o, n);
              }
              return (
                e && (r.__proto__ = e),
                (r.prototype = Object.create(e && e.prototype)),
                (r.prototype.constructor = r),
                r
              );
            })(e.filters.BlurFilterPass),
            n = (function(e) {
              function r(r, t, o, n) {
                (0, i.deprecation)(
                  B,
                  "PIXI.filters.BlurYFilter class is deprecated, use PIXI.filters.BlurFilterPass"
                ),
                  e.call(this, !1, r, t, o, n);
              }
              return (
                e && (r.__proto__ = e),
                (r.prototype = Object.create(e && e.prototype)),
                (r.prototype.constructor = r),
                r
              );
            })(e.filters.BlurFilterPass);
          Object.assign(e.filters, { BlurXFilter: o, BlurYFilter: n });
          var a = e.Sprite,
            s = e.Texture,
            c = e.Graphics;
          function p(e, r, t, o) {
            return (
              (0, i.deprecation)(
                B,
                "PIXI.Sprite." +
                  e +
                  " method is deprecated, use PIXI.Sprite.from"
              ),
              a.from(r, { resourceOptions: { scale: o, crossorigin: t } })
            );
          }
          function u(e, r, t, o) {
            return (
              (0, i.deprecation)(
                B,
                "PIXI.Texture." +
                  e +
                  " method is deprecated, use PIXI.Texture.from"
              ),
              s.from(r, { resourceOptions: { scale: o, crossorigin: t } })
            );
          }
          c.prototype.generateCanvasTexture ||
            (c.prototype.generateCanvasTexture = function() {
              (0, i.deprecation)(
                B,
                'PIXI.Graphics.generateCanvasTexture method is only available in "pixi.js-legacy"'
              );
            }),
            Object.defineProperty(e.Graphics.prototype, "graphicsData", {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.Graphics.graphicsData property is deprecated, use PIXI.Graphics.geometry.graphicsData"
                  ),
                  this.geometry.graphicsData
                );
              }
            }),
            (a.fromImage = p.bind(null, "fromImage")),
            (a.fromSVG = p.bind(null, "fromSVG")),
            (a.fromCanvas = p.bind(null, "fromCanvas")),
            (a.fromVideo = p.bind(null, "fromVideo")),
            (a.fromFrame = p.bind(null, "fromFrame")),
            (s.fromImage = u.bind(null, "fromImage")),
            (s.fromSVG = u.bind(null, "fromSVG")),
            (s.fromCanvas = u.bind(null, "fromCanvas")),
            (s.fromVideo = u.bind(null, "fromVideo")),
            (s.fromFrame = u.bind(null, "fromFrame")),
            Object.defineProperty(e.AbstractRenderer.prototype, "autoResize", {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.AbstractRenderer.autoResize property is deprecated, use PIXI.AbstractRenderer.autoDensity"
                  ),
                  this.autoDensity
                );
              },
              set: function(e) {
                (0, i.deprecation)(
                  B,
                  "PIXI.AbstractRenderer.autoResize property is deprecated, use PIXI.AbstractRenderer.autoDensity"
                ),
                  (this.autoDensity = e);
              }
            }),
            Object.defineProperty(e.Renderer.prototype, "textureManager", {
              get: function() {
                return (
                  (0, i.deprecation)(
                    B,
                    "PIXI.Renderer.textureManager property is deprecated, use PIXI.Renderer.texture"
                  ),
                  this.texture
                );
              }
            }),
            (e.utils.mixins = {
              mixin: function() {
                (0, i.deprecation)(
                  B,
                  "PIXI.utils.mixins.mixin function is no longer available"
                );
              },
              delayMixin: function() {
                (0, i.deprecation)(
                  B,
                  "PIXI.utils.mixins.delayMixin function is no longer available"
                );
              },
              performMixins: function() {
                (0, i.deprecation)(
                  B,
                  "PIXI.utils.mixins.performMixins function is no longer available"
                );
              }
            });
        }
        s.Renderer.registerPlugin("accessibility", r.AccessibilityManager),
          s.Renderer.registerPlugin("extract", t.Extract),
          s.Renderer.registerPlugin("interaction", o.InteractionManager),
          s.Renderer.registerPlugin("particle", p.ParticleRenderer),
          s.Renderer.registerPlugin("prepare", n.Prepare),
          s.Renderer.registerPlugin("batch", s.BatchRenderer),
          s.Renderer.registerPlugin("tilingSprite", d.TilingSpriteRenderer),
          c.Loader.registerPlugin(l.BitmapFontLoader),
          c.Loader.registerPlugin(u.SpritesheetLoader),
          a.Application.registerPlugin(I.TickerPlugin),
          a.Application.registerPlugin(c.AppLoaderPlugin);
        var A = "5.2.0";
        exports.VERSION = A;
        var E = {
          AlphaFilter: f.AlphaFilter,
          BlurFilter: h.BlurFilter,
          BlurFilterPass: h.BlurFilterPass,
          ColorMatrixFilter: P.ColorMatrixFilter,
          DisplacementFilter: m.DisplacementFilter,
          FXAAFilter: y.FXAAFilter,
          NoiseFilter: b.NoiseFilter
        };
        exports.filters = E;
      },
      {
        "@pixi/polyfill": "y4AA",
        "@pixi/accessibility": "jM0u",
        "@pixi/extract": "rWhx",
        "@pixi/interaction": "Jbe7",
        "@pixi/prepare": "EBFb",
        "@pixi/utils": "G5Tu",
        "@pixi/app": "aWkH",
        "@pixi/core": "p2j5",
        "@pixi/loaders": "hQvf",
        "@pixi/particles": "j0p2",
        "@pixi/spritesheet": "LQzI",
        "@pixi/sprite-tiling": "kMpM",
        "@pixi/text-bitmap": "LwOx",
        "@pixi/ticker": "F3Q6",
        "@pixi/filter-alpha": "h70E",
        "@pixi/filter-blur": "XHCc",
        "@pixi/filter-color-matrix": "atfW",
        "@pixi/filter-displacement": "rpU2",
        "@pixi/filter-fxaa": "zKIa",
        "@pixi/filter-noise": "nEkq",
        "@pixi/mixin-cache-as-bitmap": "fh0A",
        "@pixi/mixin-get-child-by-name": "CSWr",
        "@pixi/mixin-get-global-position": "bmhz",
        "@pixi/constants": "LQBK",
        "@pixi/display": "nL3p",
        "@pixi/graphics": "KxlN",
        "@pixi/math": "oNQC",
        "@pixi/mesh": "Ihaq",
        "@pixi/mesh-extras": "kDGc",
        "@pixi/runner": "QNVA",
        "@pixi/sprite": "ueA8",
        "@pixi/sprite-animated": "GC82",
        "@pixi/text": "T62s",
        "@pixi/settings": "t4Uo"
      }
    ],
    Beos: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var n = require("../index");
        exports.DEFAULT_LERP_TOLERANCE = 0.05;
        var t = (function() {
          function t(n, t) {
            void 0 === n && (n = 0),
              void 0 === t && (t = 0),
              (this.x = n),
              (this.y = t);
          }
          return (
            (t.fromTo = function(n, r, e) {
              for (var u = n.x; u <= r.x; u++)
                for (var i = n.y; i <= r.y; i++) e(new t(u, i));
            }),
            (t.zero = function() {
              return new t(0, 0);
            }),
            (t.right = function() {
              return new t(1, 0);
            }),
            (t.left = function() {
              return new t(-1, 0);
            }),
            (t.prototype.toString = function() {
              return this.x + ":" + this.y;
            }),
            (t.add = function(n, r) {
              return new t(n.x + r.x, n.y + r.y);
            }),
            (t.subtract = function(n, r) {
              return new t(n.x - r.x, n.y - r.y);
            }),
            (t.multiply = function(n, r) {
              return new t(n.x * r.x, n.y * r.y);
            }),
            (t.multiplyInt = function(n, r) {
              return new t(n.x * r, n.y * r);
            }),
            (t.addInt = function(n, r) {
              return new t(n.x + r, n.y + r);
            }),
            (t.lerp = function(n, r, e) {
              var u = t.subtract(r, n),
                i = t.multiplyInt(u, e);
              return t.add(n, i);
            }),
            (t.distance = function(n, r) {
              var e = t.subtract(n, r);
              return Math.sqrt(e.x * e.x + e.y * e.y);
            }),
            (t.equals = function(n, t) {
              return n.x === t.x && n.y === t.y;
            }),
            (t.lerpUntil = function(r, e, u, i) {
              void 0 === u && (u = n.DEFAULT_LERP_SPEED),
                void 0 === i && (i = exports.DEFAULT_LERP_TOLERANCE);
              var o = t.lerp(r, e, u);
              return t.distance(r, o) < i ? r : o;
            }),
            (t.invert = function(n) {
              return new t(-1 * n.x, -1 * n.y);
            }),
            t
          );
        })();
        exports.Vector2 = t;
      },
      { "../index": "QCba" }
    ],
    bi2B: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../index"),
          r = require("../Vector/Vector2"),
          t = (function() {
            function t() {}
            return (
              (t.getUnit = function(r) {
                return r * e.BASE_UNIT;
              }),
              (t.getUnitFromVector = function(t) {
                return new r.Vector2(t.x * e.BASE_UNIT, t.y * e.BASE_UNIT);
              }),
              t
            );
          })();
        exports.AbstractRenderer = t;
      },
      { "../index": "QCba", "../Vector/Vector2": "Beos" }
    ],
    lazm: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../../Vector/Vector2"),
          t = require("../../Renderer/AbstractRenderer"),
          r = require("../../index"),
          i = require("./TileIdleState");
        exports.S_TILE_RESET_MOVE = "S_TILE_RESET_MOVE";
        var o = (function() {
          function o(e) {
            (this.tile = e),
              (this.targetPosition = t.AbstractRenderer.getUnitFromVector(
                e.getColumnPosition()
              ));
          }
          return (
            (o.prototype.getName = function() {
              return exports.S_TILE_RESET_MOVE;
            }),
            (o.prototype.update = function() {
              var t = this.tile.getSpritePosition(),
                o = e.Vector2.lerpUntil(
                  t,
                  this.targetPosition,
                  r.application.ticker.deltaTime * r.DEFAULT_LERP_SPEED
                );
              return e.Vector2.equals(t, o)
                ? new i.TileIdleState(this.tile)
                : (this.tile.setSpritePosition(o), null);
            }),
            o
          );
        })();
        exports.TileResetMoveState = o;
      },
      {
        "../../Vector/Vector2": "Beos",
        "../../Renderer/AbstractRenderer": "bi2B",
        "../../index": "QCba",
        "./TileIdleState": "Rksm"
      }
    ],
    sP4J: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("./TileResetMoveState");
        exports.S_TILE_MOVE_RESOLVE = "S_TILE_MOVE_RESOLVE";
        var t = (function() {
          function t(e) {
            (this.tile = e),
              (this.released = !1),
              (this.handleReleaseBound = this.handleRelease.bind(this));
          }
          return (
            (t.prototype.enter = function() {
              window.addEventListener("mouseup", this.handleReleaseBound);
            }),
            (t.prototype.leave = function() {
              window.removeEventListener("mouseup", this.handleReleaseBound);
            }),
            (t.prototype.handleRelease = function() {
              this.released = !0;
            }),
            (t.prototype.getName = function() {
              return exports.S_TILE_MOVE_RESOLVE;
            }),
            (t.prototype.update = function() {
              if (!this.released) return null;
              if (!this.isValidMove()) {
                var t = this.tile.getLinkedTile();
                return (
                  null !== t &&
                    t.getStateManager().setState(new e.TileResetMoveState(t)),
                  new e.TileResetMoveState(this.tile)
                );
              }
              return null;
            }),
            (t.prototype.isValidMove = function() {
              return !1;
            }),
            t
          );
        })();
        exports.TileMoveResolverState = t;
      },
      { "./TileResetMoveState": "lazm" }
    ],
    TcaI: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../../Vector/Vector2"),
          t = require("../../index"),
          r = require("../../Renderer/AbstractRenderer");
        exports.S_LINKED_TILE_MOVE_PREVIEW = "S_LINKED_TILE_PREVIEW";
        var i = (function() {
          function i(t, i) {
            (this.direction = t),
              (this.tile = i),
              (this.targetPosition = e.Vector2.add(
                r.AbstractRenderer.getUnitFromVector(i.getColumnPosition()),
                r.AbstractRenderer.getUnitFromVector(t)
              ));
          }
          return (
            (i.prototype.enter = function() {}),
            (i.prototype.getName = function() {
              return exports.S_LINKED_TILE_MOVE_PREVIEW;
            }),
            (i.prototype.update = function() {
              var r = this.tile.getSpritePosition(),
                i = e.Vector2.lerpUntil(
                  r,
                  this.targetPosition,
                  t.application.ticker.deltaTime * t.DEFAULT_LERP_SPEED
                );
              return this.tile.setSpritePosition(i), null;
            }),
            i
          );
        })();
        exports.LinkedTileMovePreviewState = i;
      },
      {
        "../../Vector/Vector2": "Beos",
        "../../index": "QCba",
        "../../Renderer/AbstractRenderer": "bi2B"
      }
    ],
    nztz: [
      function(require, module, exports) {
        "use strict";
        var t =
          (this && this.__extends) ||
          (function() {
            var t = function(r, o) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, r) {
                    t.__proto__ = r;
                  }) ||
                function(t, r) {
                  for (var o in r) r.hasOwnProperty(o) && (t[o] = r[o]);
                })(r, o);
            };
            return function(r, o) {
              function e() {
                this.constructor = r;
              }
              t(r, o),
                (r.prototype =
                  null === o
                    ? Object.create(o)
                    : ((e.prototype = o.prototype), new e()));
            };
          })();
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var r = (function(r) {
          function o() {
            var t = r.call(this, "Out of bounds") || this;
            return Object.setPrototypeOf(t, o.prototype), t;
          }
          return t(o, r), o;
        })(Error);
        exports.OutOfBoardBoundsError = r;
      },
      {}
    ],
    HhU7: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../../Vector/Vector2"),
          t = require("../../Renderer/AbstractRenderer"),
          i = require("../../index"),
          r = require("./TileMoveResolverState"),
          o = require("./LinkedTileMovePreviewState"),
          n = require("../../Exceptions/OutOfBoardBoundsError"),
          s = require("./TileResetMoveState");
        exports.S_ACTIVE_TILE_MOVE_PREVIEW = "S_ACTIVE_TILE_MOVE_PREVIEW";
        var a = (function() {
          function a(i, r) {
            (this.direction = i),
              (this.tile = r),
              (this.released = !1),
              (this.targetPosition = e.Vector2.add(
                t.AbstractRenderer.getUnitFromVector(r.getColumnPosition()),
                t.AbstractRenderer.getUnitFromVector(i)
              )),
              (this.handleReleaseBound = this.handleRelease.bind(this));
          }
          return (
            (a.prototype.handleRelease = function() {
              this.released = !0;
            }),
            (a.prototype.enter = function() {
              window.addEventListener("mouseup", this.handleReleaseBound);
              var t,
                i = this.tile.getBoard();
              try {
                t = i.getTileAt(
                  e.Vector2.add(this.tile.getBoardPosition(), this.direction)
                );
              } catch (r) {
                if (!(r instanceof n.OutOfBoardBoundsError)) throw r;
                return;
              }
              this.tile.setLinkedTile(t),
                t
                  .getStateManager()
                  .setState(
                    new o.LinkedTileMovePreviewState(
                      e.Vector2.invert(this.direction),
                      t
                    )
                  );
            }),
            (a.prototype.getName = function() {
              return exports.S_ACTIVE_TILE_MOVE_PREVIEW;
            }),
            (a.prototype.update = function() {
              if (this.released) {
                var t = this.tile.getLinkedTile();
                return (
                  null !== t &&
                    t.getStateManager().setState(new s.TileResetMoveState(t)),
                  new s.TileResetMoveState(this.tile)
                );
              }
              var o = this.tile.getSpritePosition(),
                n = e.Vector2.lerpUntil(
                  o,
                  this.targetPosition,
                  i.application.ticker.deltaTime * i.DEFAULT_LERP_SPEED
                );
              return e.Vector2.equals(o, n)
                ? new r.TileMoveResolverState(this.tile)
                : (this.tile.setSpritePosition(n), null);
            }),
            (a.prototype.leave = function() {
              window.removeEventListener("mouseup", this.handleReleaseBound);
            }),
            a
          );
        })();
        exports.ActiveTileMovePreviewState = a;
      },
      {
        "../../Vector/Vector2": "Beos",
        "../../Renderer/AbstractRenderer": "bi2B",
        "../../index": "QCba",
        "./TileMoveResolverState": "sP4J",
        "./LinkedTileMovePreviewState": "TcaI",
        "../../Exceptions/OutOfBoardBoundsError": "nztz",
        "./TileResetMoveState": "lazm"
      }
    ],
    jygI: [
      function(require, module, exports) {
        var global = arguments[3];
        var e = arguments[3];
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var t = require("./ActiveTileMovePreviewState"),
          i = require("../../Vector/Vector2"),
          o = require("./TileResetMoveState");
        exports.S_TILE_GRABBED_STATE = "S_TILE_GRABBED_STATE";
        var n = (function() {
          function e(e) {
            (this.tile = e),
              (this.grabbed = !0),
              (this.lastPointerPositionX = 0),
              (this.pointerDeltaSum = 0),
              (this.couldMove = !1),
              (this.cachedZIndex = 0),
              (this.handleReleaseBound = this.handleRelease.bind(this)),
              (this.handleMovePointerBound = this.handlePointerMove.bind(this));
          }
          return (
            (e.prototype.handleRelease = function() {
              this.grabbed = !1;
            }),
            (e.prototype.handlePointerMove = function(e) {
              var t = e.data.global,
                i = t.x - this.lastPointerPositionX;
              0 !== this.lastPointerPositionX
                ? ((this.pointerDeltaSum += i),
                  (this.tile.getSprite().x += i),
                  (this.lastPointerPositionX = t.x),
                  Math.abs(this.pointerDeltaSum) <
                    this.tile.getSprite().width / 3 || (this.couldMove = !0))
                : (this.lastPointerPositionX = t.x);
            }),
            (e.prototype.leave = function() {
              window.removeEventListener("mouseup", this.handleReleaseBound),
                this.tile
                  .getBoard()
                  .getSprite()
                  .removeListener("pointermove", this.handleMovePointerBound),
                (this.tile.getSprite().zIndex = this.cachedZIndex);
            }),
            (e.prototype.enter = function() {
              window.addEventListener("mouseup", this.handleReleaseBound),
                this.tile
                  .getBoard()
                  .getSprite()
                  .addListener("pointermove", this.handleMovePointerBound),
                (this.cachedZIndex = this.tile.getSprite().zIndex),
                (this.tile.getSprite().zIndex = 999);
            }),
            (e.prototype.getName = function() {
              return exports.S_TILE_GRABBED_STATE;
            }),
            (e.prototype.update = function() {
              return this.couldMove
                ? new t.ActiveTileMovePreviewState(
                    this.pointerDeltaSum > 0
                      ? i.Vector2.right()
                      : i.Vector2.left(),
                    this.tile
                  )
                : this.grabbed
                ? null
                : new o.TileResetMoveState(this.tile);
            }),
            e
          );
        })();
        exports.TileGrabbedState = n;
      },
      {
        "./ActiveTileMovePreviewState": "HhU7",
        "../../Vector/Vector2": "Beos",
        "./TileResetMoveState": "lazm"
      }
    ],
    Rksm: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("./TileGrabbedState");
        exports.S_TILE_IDLE = "S_TITLE_IDLE";
        var t = (function() {
          function t(e) {
            (this.tile = e), (this.grabbed = !1);
          }
          return (
            (t.prototype.getName = function() {
              return exports.S_TILE_IDLE;
            }),
            (t.prototype.update = function() {
              return this.grabbed ? new e.TileGrabbedState(this.tile) : null;
            }),
            (t.prototype.enter = function() {
              var e = this;
              this.tile.getSprite().addListener("pointerdown", function() {
                e.grabbed = !0;
              });
            }),
            t
          );
        })();
        exports.TileIdleState = t;
      },
      { "./TileGrabbedState": "jygI" }
    ],
    MhhK: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var t = require("../Vector/Vector2"),
          e = require("../State/Tile/TileIdleState"),
          i = (function() {
            function i(t, e) {
              (this.size = t), (this.order = e), (this.tiles = []);
            }
            return (
              (i.prototype.start = function() {
                this.tiles.forEach(function(t) {
                  t.getStateManager().setState(new e.TileIdleState(t));
                });
              }),
              (i.prototype.update = function() {
                this.tiles.forEach(function(t) {
                  return t.update();
                });
              }),
              (i.prototype.getSize = function() {
                return this.size;
              }),
              (i.prototype.getOrder = function() {
                return this.order;
              }),
              (i.prototype.isFull = function() {
                return this.tiles.length === this.size.y;
              }),
              (i.prototype.getTileAt = function(t) {
                var e = this.tiles[t];
                if (void 0 === e) throw new Error("No Tile in Column at " + t);
                return e;
              }),
              (i.prototype.getTiles = function() {
                return this.tiles.reverse();
              }),
              (i.prototype.addTile = function(e) {
                e.setPosition(
                  new t.Vector2(0, this.size.y - this.tiles.length - 1)
                ),
                  this.tiles.push(e);
              }),
              i
            );
          })();
        exports.Column = i;
      },
      { "../Vector/Vector2": "Beos", "../State/Tile/TileIdleState": "Rksm" }
    ],
    NE2N: [
      function(require, module, exports) {
        "use strict";
        var t =
          (this && this.__extends) ||
          (function() {
            var t = function(e, r) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(e, r);
            };
            return function(e, r) {
              function o() {
                this.constructor = e;
              }
              t(e, r),
                (e.prototype =
                  null === r
                    ? Object.create(r)
                    : ((o.prototype = r.prototype), new o()));
            };
          })();
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = (function(e) {
          function r() {
            var t = e.call(this, "Seed is empty") || this;
            return Object.setPrototypeOf(t, r.prototype), t;
          }
          return t(r, e), r;
        })(Error);
        exports.EmptySeedException = e;
      },
      {}
    ],
    IQ00: [
      function(require, module, exports) {
        "use strict";
        var t =
          (this && this.__importStar) ||
          function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return (e.default = t), e;
          };
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../Column/Column"),
          r = require("../Vector/Vector2"),
          n = require("../Exceptions/EmptySeedException"),
          o = t(require("pixi.js")),
          i = require("../Renderer/AbstractRenderer"),
          u = require("../index"),
          s = require("../Exceptions/OutOfBoardBoundsError"),
          c = (function() {
            function t(t) {
              (this.size = t),
                (this.columns = []),
                (this.bounds = r.Vector2.zero());
              for (var n = 0; n < this.size.x; n++)
                this.columns.push(new e.Column(new r.Vector2(1, t.y), n));
            }
            return (
              (t.prototype.updateBounds = function() {
                var t = this.sprite.getBounds();
                this.bounds = new r.Vector2(t.left, t.top);
              }),
              (t.prototype.getBounds = function() {
                return this.bounds;
              }),
              (t.prototype.start = function() {
                this.columns.forEach(function(t) {
                  return t.start();
                });
              }),
              (t.prototype.update = function() {
                this.columns.forEach(function(t) {
                  return t.update();
                });
              }),
              (t.prototype.getSize = function() {
                return this.size;
              }),
              (t.prototype.fill = function(t) {
                this.columns.forEach(function(e) {
                  for (; !e.isFull(); )
                    try {
                      var r = t.dequeue();
                      r.setVisible(!0), e.addTile(r);
                    } catch (o) {
                      if (!(o instanceof n.EmptySeedException)) throw o;
                      break;
                    }
                });
              }),
              (t.prototype.getColumn = function(t) {
                if (void 0 === this.columns[t])
                  throw new s.OutOfBoardBoundsError();
                return this.columns[t];
              }),
              (t.prototype.getLength = function() {
                return (this.size.x + 1) * (this.size.y + 1);
              }),
              (t.prototype.getTileAt = function(t) {
                return this.getColumn(t.x).getTileAt(t.y);
              }),
              (t.prototype.getColumns = function() {
                return this.columns;
              }),
              (t.prototype.getSprite = function() {
                return this.sprite;
              }),
              (t.prototype.draw = function() {
                var t = new o.Graphics(),
                  e = i.AbstractRenderer.getUnitFromVector(this.getSize());
                t.beginFill(16711680), t.drawRect(0, 0, e.x, e.y), t.endFill();
                var r = new o.Sprite(
                  u.application.renderer.generateTexture(
                    t,
                    o.SCALE_MODES.LINEAR,
                    u.application.renderer.resolution
                  )
                );
                (r.interactive = !0),
                  (r.x = u.application.renderer.width / 2 - r.width / 2),
                  (r.y = u.application.renderer.height / 2 - r.height / 2),
                  (this.sprite = r);
              }),
              t
            );
          })();
        exports.Board = c;
      },
      {
        "../Column/Column": "MhhK",
        "../Vector/Vector2": "Beos",
        "../Exceptions/EmptySeedException": "NE2N",
        "pixi.js": "wbEC",
        "../Renderer/AbstractRenderer": "bi2B",
        "../index": "QCba",
        "../Exceptions/OutOfBoardBoundsError": "nztz"
      }
    ],
    rwxI: [
      function(require, module, exports) {
        "use strict";
        var t =
          (this && this.__importStar) ||
          function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var i in t)
                Object.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return (e.default = t), e;
          };
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e,
          i = require("../Vector/Vector2"),
          r = t(require("pixi.js")),
          o = require("../Renderer/AbstractRenderer");
        !(function(t) {
          t[(t.BLUE = 0)] = "BLUE";
        })((e = exports.TileType || (exports.TileType = {})));
        var n = (function() {
          function t(t) {
            (this.stateManager = t),
              (this.position = i.Vector2.zero()),
              (this.seedIndex = -1),
              (this.visible = !1),
              (this.linkedTile = null),
              (this.size = new i.Vector2(1, 1));
          }
          return (
            (t.prototype.getBoard = function() {
              return this.board;
            }),
            (t.prototype.setBoard = function(t) {
              this.board = t;
            }),
            (t.prototype.getColumn = function() {
              return this.column;
            }),
            (t.prototype.setColumn = function(t) {
              this.column = t;
            }),
            (t.prototype.setLinkedTile = function(t) {
              this.linkedTile = t;
            }),
            (t.prototype.getLinkedTile = function() {
              return this.linkedTile;
            }),
            (t.prototype.update = function() {
              this.stateManager.update(), this.updateTexture();
            }),
            (t.prototype.getStateManager = function() {
              return this.stateManager;
            }),
            (t.prototype.isVisible = function() {
              return this.visible;
            }),
            (t.prototype.setVisible = function(t) {
              this.visible = t;
            }),
            (t.prototype.getBoardPosition = function() {
              return new i.Vector2(this.column.getOrder(), this.position.y);
            }),
            (t.prototype.getColumnPosition = function() {
              return this.position;
            }),
            (t.prototype.getSpritePosition = function() {
              return new i.Vector2(this.sprite.x, this.sprite.y);
            }),
            (t.prototype.setSpritePosition = function(t) {
              (this.sprite.x = t.x), (this.sprite.y = t.y);
            }),
            (t.prototype.getSprite = function() {
              return this.sprite;
            }),
            (t.prototype.setSeedIndex = function(t) {
              this.seedIndex = t;
            }),
            (t.prototype.getSize = function() {
              return this.size;
            }),
            (t.prototype.getSeedIndex = function() {
              return this.seedIndex;
            }),
            (t.prototype.setPosition = function(t) {
              this.position = t;
            }),
            (t.prototype.draw = function() {
              var t = new r.Sprite(this.getTexture()),
                e = o.AbstractRenderer.getUnitFromVector(this.size),
                i = o.AbstractRenderer.getUnitFromVector(this.position);
              (t.interactive = !0),
                (t.width = e.x),
                (t.height = e.y),
                (t.x = i.x),
                (t.y = i.y),
                (this.sprite = t);
            }),
            (t.prototype.updateTexture = function() {
              this.sprite.texture = this.getTexture();
            }),
            t
          );
        })();
        exports.AbstractTile = n;
      },
      {
        "../Vector/Vector2": "Beos",
        "pixi.js": "wbEC",
        "../Renderer/AbstractRenderer": "bi2B"
      }
    ],
    zGkc: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../Exceptions/EmptySeedException"),
          t = (function() {
            function t(e) {
              void 0 === e && (e = []), (this.tiles = e);
            }
            return (
              (t.prototype.dequeue = function() {
                var t = this.tiles.shift();
                if (void 0 === t) throw new e.EmptySeedException();
                return t;
              }),
              (t.prototype.enqueue = function(e) {
                this.tiles.push(e);
              }),
              t
            );
          })();
        exports.Seed = t;
      },
      { "../Exceptions/EmptySeedException": "NE2N" }
    ],
    hz8i: [
      function(require, module, exports) {
        "use strict";
        var e =
            (this && this.__extends) ||
            (function() {
              var e = function(t, r) {
                return (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                  })(t, r);
              };
              return function(t, r) {
                function n() {
                  this.constructor = t;
                }
                e(t, r),
                  (t.prototype =
                    null === r
                      ? Object.create(r)
                      : ((n.prototype = r.prototype), new n()));
              };
            })(),
          t =
            (this && this.__importStar) ||
            function(e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
              return (t.default = e), t;
            };
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var r = require("./AbstractTile"),
          n = t(require("pixi.js")),
          i = require("../Renderer/AbstractRenderer"),
          o = require("../index"),
          a = (function(t) {
            function a() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              e(a, t),
              (a.prototype.getType = function() {
                return r.TileType.BLUE;
              }),
              (a.prototype.getTexture = function() {
                var e = new n.Graphics(),
                  t = i.AbstractRenderer.getUnitFromVector(this.size),
                  r =
                    void 0 !== this.getStateManager().getState()
                      ? this.getStateManager()
                          .getState()
                          .getName()
                      : "NULL",
                  a = new n.Text(
                    "s" +
                      this.getSeedIndex() +
                      "\n" +
                      r +
                      "\n" +
                      this.getBoardPosition().toString(),
                    new n.TextStyle({ fontSize: "14px" })
                  );
                return (
                  e.beginFill(65280),
                  e.drawRect(0, 0, t.x, t.y),
                  e.endFill(),
                  (a.width = t.x),
                  e.addChild(a),
                  o.application.renderer.generateTexture(
                    e,
                    n.SCALE_MODES.LINEAR,
                    o.application.renderer.resolution
                  )
                );
              }),
              a
            );
          })(r.AbstractTile);
        exports.TestTile = a;
      },
      {
        "./AbstractTile": "rwxI",
        "pixi.js": "wbEC",
        "../Renderer/AbstractRenderer": "bi2B",
        "../index": "QCba"
      }
    ],
    ppTm: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isStateWithEnter = function(e) {
            return void 0 !== e.enter;
          });
      },
      {}
    ],
    L83d: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isStateWithLeave = function(e) {
            return void 0 !== e.leave;
          });
      },
      {}
    ],
    I3Q8: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isStateWithInput = function(e) {
            return void 0 !== e.handleInput;
          });
      },
      {}
    ],
    ZxGk: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var t = require("./StateWithEnter"),
          e = require("./StateWithLeave"),
          a = require("./StateWithInput"),
          i = (function() {
            function i() {}
            return (
              (i.prototype.update = function() {
                var t = this.state.update();
                null !== t && this.setState(t);
              }),
              (i.prototype.setState = function(a) {
                void 0 !== this.state &&
                  e.isStateWithLeave(this.state) &&
                  this.state.leave(),
                  t.isStateWithEnter(a) && a.enter(),
                  (this.state = a);
              }),
              (i.prototype.handleInput = function(t) {
                a.isStateWithInput(this.state) && this.state.handleInput(t);
              }),
              (i.prototype.getState = function() {
                return this.state;
              }),
              i
            );
          })();
        exports.StateManager = i;
      },
      {
        "./StateWithEnter": "ppTm",
        "./StateWithLeave": "L83d",
        "./StateWithInput": "I3Q8"
      }
    ],
    sUTq: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../Tile/AbstractTile"),
          t = require("../Tile/TestTile"),
          r = require("../State/StateManager");
        exports.createTile = function(i) {
          var a = new r.StateManager();
          switch (i) {
            case e.TileType.BLUE:
              return new t.TestTile(a);
          }
        };
      },
      {
        "../Tile/AbstractTile": "rwxI",
        "../Tile/TestTile": "hz8i",
        "../State/StateManager": "ZxGk"
      }
    ],
    gue1: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../Tile/AbstractTile"),
          r = require("./Seed"),
          t = require("../Factory/TileFactory"),
          n = (function() {
            function n() {}
            return (
              (n.prototype.getRandomTile = function() {
                var r = Object.keys(e.TileType)
                    .map(function(e) {
                      return Number.parseInt(e);
                    })
                    .filter(function(e) {
                      return !Number.isNaN(e);
                    }),
                  n = r[Math.floor(Math.random() * r.length)];
                return t.createTile(n);
              }),
              (n.prototype.generateSeed = function(e) {
                for (var t = new r.Seed(), n = 0; n < e; n++) {
                  var i = this.getRandomTile();
                  i.setSeedIndex(n), t.enqueue(i);
                }
                return t;
              }),
              n
            );
          })();
        exports.TileProvider = n;
      },
      {
        "../Tile/AbstractTile": "rwxI",
        "./Seed": "zGkc",
        "../Factory/TileFactory": "sUTq"
      }
    ],
    KgyK: [
      function(require, module, exports) {
        "use strict";
        var t =
          (this && this.__importStar) ||
          function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return (e.default = t), e;
          };
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("../index"),
          r = t(require("pixi.js")),
          i = require("../State/Tile/TileIdleState"),
          a = require("../Renderer/AbstractRenderer"),
          o = (function() {
            function t() {}
            return (
              (t.prototype.loadBoard = function(t, e) {
                (this.board = t), this.board.fill(e);
              }),
              (t.prototype.start = function() {
                var t = this;
                this.board.draw(),
                  this.board.updateBounds(),
                  this.board.getColumns().forEach(function(e) {
                    var o = new r.Container();
                    (o.x = a.AbstractRenderer.getUnit(e.getOrder())),
                      e.getTiles().forEach(function(r) {
                        r.setBoard(t.board),
                          r.setColumn(e),
                          r.draw(),
                          r.getStateManager().setState(new i.TileIdleState(r)),
                          o.addChild(r.getSprite());
                      }),
                      t.board.getSprite().addChild(o);
                  }),
                  e.application.stage.addChild(this.board.getSprite()),
                  this.update();
              }),
              (t.prototype.update = function() {
                void 0 !== this.board &&
                  (this.board.update(),
                  e.application.render(),
                  requestAnimationFrame(this.update.bind(this)));
              }),
              t
            );
          })();
        exports.Runtime = o;
      },
      {
        "../index": "QCba",
        "pixi.js": "wbEC",
        "../State/Tile/TileIdleState": "Rksm",
        "../Renderer/AbstractRenderer": "bi2B"
      }
    ],
    QCba: [
      function(require, module, exports) {
        "use strict";
        var e =
          (this && this.__importStar) ||
          function(e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e)
              for (var t in e)
                Object.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return (r.default = e), r;
          };
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var r = e(require("pixi.js")),
          t = require("./Board/Board"),
          i = require("./Vector/Vector2"),
          n = require("./Seed/TileProvider"),
          o = require("./Runtime/Runtime");
        (exports.BASE_UNIT = 80),
          (exports.DEFAULT_LERP_SPEED = 0.15),
          (exports.getApplicationWidth = function() {
            return window.innerWidth;
          }),
          (exports.getApplicationHeight = function() {
            return window.innerHeight;
          });
        var a = document.getElementById("stage");
        exports.application = new r.Application({
          view: a,
          width: exports.getApplicationWidth(),
          height: exports.getApplicationHeight()
        });
        var d = new t.Board(new i.Vector2(4, 6)),
          p = new n.TileProvider(),
          u = p.generateSeed(500);
        (window.board = d), (window.seed = u);
        var s = new o.Runtime();
        s.loadBoard(d, u), s.start();
      },
      {
        "pixi.js": "wbEC",
        "./Board/Board": "IQ00",
        "./Vector/Vector2": "Beos",
        "./Seed/TileProvider": "gue1",
        "./Runtime/Runtime": "KgyK"
      }
    ]
  },
  {},
  ["QCba"],
  null
);
//# sourceMappingURL=/src.6e788a12.js.map
