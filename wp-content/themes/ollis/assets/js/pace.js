(function () {
  var t,
    e,
    n,
    r,
    s,
    o,
    i,
    a,
    u,
    c,
    l,
    p,
    h,
    f,
    d,
    g,
    m,
    y,
    v,
    w,
    b,
    S,
    k,
    q,
    x,
    L,
    T,
    P,
    R,
    j,
    E,
    M,
    O,
    A,
    N,
    _,
    F,
    C,
    U,
    H,
    X,
    W,
    D,
    I,
    z,
    B,
    G,
    J,
    K,
    Q = [].slice,
    V = {}.hasOwnProperty,
    Y = function (t, e) {
      function n() {
        this.constructor = t;
      }
      for (var r in e) V.call(e, r) && (t[r] = e[r]);
      return (
        (n.prototype = e.prototype),
        (t.prototype = new n()),
        (t.__super__ = e.prototype),
        t
      );
    },
    Z =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++)
          if (e in this && this[e] === t) return e;
        return -1;
      };
  for (
    b = {
      catchupTime: 100,
      initialRate: 0.03,
      minTime: 250,
      ghostTime: 100,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: !0,
      restartOnPushState: !1,
      restartOnRequestAfter: !1,
      target: "body",
      elements: !1,
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3,
      },
      ajax: !1,
    },
      R = function () {
        var t;
        return null !=
          (t =
            "undefined" != typeof performance &&
            null !== performance &&
            "function" == typeof performance.now
              ? performance.now()
              : void 0)
          ? t
          : +new Date();
      },
      E =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame,
      w = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
      null == E &&
        ((E = function (t) {
          return setTimeout(t, 50);
        }),
        (w = function (t) {
          return clearTimeout(t);
        })),
      O = function (t) {
        var e, n;
        return (
          (e = R()),
          (n = function () {
            var r;
            return (
              (r = R() - e),
              r >= 33
                ? ((e = R()),
                  t(r, function () {
                    return E(n);
                  }))
                : setTimeout(n, 33 - r)
            );
          })()
        );
      },
      M = function () {
        var t, e, n;
        return (
          (n = arguments[0]),
          (e = arguments[1]),
          (t = 3 <= arguments.length ? Q.call(arguments, 2) : []),
          "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
        );
      },
      S = function () {
        var t, e, n, r, s, o, i;
        for (
          e = arguments[0],
            r = 2 <= arguments.length ? Q.call(arguments, 1) : [],
            o = 0,
            i = r.length;
          o < i;
          o++
        )
          if ((n = r[o]))
            for (t in n)
              V.call(n, t) &&
                ((s = n[t]),
                null != e[t] &&
                "object" == typeof e[t] &&
                null != s &&
                "object" == typeof s
                  ? S(e[t], s)
                  : (e[t] = s));
        return e;
      },
      m = function (t) {
        var e, n, r, s, o;
        for (n = e = 0, s = 0, o = t.length; s < o; s++)
          (r = t[s]), (n += Math.abs(r)), e++;
        return n / e;
      },
      q = function (t, e) {
        var n, r, s;
        if (
          (null == t && (t = "options"),
          null == e && (e = !0),
          (s = document.querySelector("[data-pace-" + t + "]")))
        ) {
          if (((n = s.getAttribute("data-pace-" + t)), !e)) return n;
          try {
            return JSON.parse(n);
          } catch (o) {
            return (
              (r = o),
              "undefined" != typeof console && null !== console
                ? console.error("Error parsing inline pace options", r)
                : void 0
            );
          }
        }
      },
      i = (function () {
        function t() {}
        return (
          (t.prototype.on = function (t, e, n, r) {
            var s;
            return (
              null == r && (r = !1),
              null == this.bindings && (this.bindings = {}),
              null == (s = this.bindings)[t] && (s[t] = []),
              this.bindings[t].push({
                handler: e,
                ctx: n,
                once: r,
              })
            );
          }),
          (t.prototype.once = function (t, e, n) {
            return this.on(t, e, n, !0);
          }),
          (t.prototype.off = function (t, e) {
            var n, r, s;
            if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
              if (null == e) return delete this.bindings[t];
              for (n = 0, s = []; n < this.bindings[t].length; )
                this.bindings[t][n].handler === e
                  ? s.push(this.bindings[t].splice(n, 1))
                  : s.push(n++);
              return s;
            }
          }),
          (t.prototype.trigger = function () {
            var t, e, n, r, s, o, i, a, u;
            if (
              ((n = arguments[0]),
              (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
              null != (i = this.bindings) ? i[n] : void 0)
            ) {
              for (s = 0, u = []; s < this.bindings[n].length; )
                (a = this.bindings[n][s]),
                  (r = a.handler),
                  (e = a.ctx),
                  (o = a.once),
                  r.apply(null != e ? e : this, t),
                  o ? u.push(this.bindings[n].splice(s, 1)) : u.push(s++);
              return u;
            }
          }),
          t
        );
      })(),
      c = window.Pace || {},
      window.Pace = c,
      S(c, i.prototype),
      j = c.options = S({}, b, window.paceOptions, q()),
      G = ["ajax", "document", "eventLag", "elements"],
      D = 0,
      z = G.length;
    D < z;
    D++
  )
    (F = G[D]), j[F] === !0 && (j[F] = b[F]);
  (u = (function (t) {
    function e() {
      return (J = e.__super__.constructor.apply(this, arguments));
    }
    return Y(e, t), e;
  })(Error)),
    (e = (function () {
      function t() {
        this.progress = 0;
      }
      return (
        (t.prototype.getElement = function () {
          var t;
          if (null == this.el) {
            if (((t = document.querySelector(j.target)), !t)) throw new u();
            (this.el = document.createElement("div")),
              (this.el.className = "pace pace-active"),
              (document.body.className = document.body.className.replace(
                /pace-done/g,
                ""
              )),
              (document.body.className += " pace-running"),
              (this.el.innerHTML =
                '<div class="pace-progress"><div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>');
            var e = document.getElementById("ltx-preloader");
            e &&
              (this.el.innerHTML +=
                '<div class="ltx-theme-loader"><div class="ltx-loader-1"></div><div class="ltx-loader-2"></div></div>'),
              (this.el.innerHTML += '<div class="pace-image"></div>'),
              null != t.firstChild
                ? t.insertBefore(this.el, t.firstChild)
                : t.appendChild(this.el);
          }
          return this.el;
        }),
        (t.prototype.finish = function () {
          var t;
          return (
            (t = this.getElement()),
            (t.className = t.className.replace("pace-active", "")),
            (t.className += " pace-inactive"),
            (document.body.className = document.body.className.replace(
              "pace-running",
              ""
            )),
            (document.body.className += " pace-done")
          );
        }),
        (t.prototype.update = function (t) {
          return (this.progress = t), this.render();
        }),
        (t.prototype.destroy = function () {
          try {
            this.getElement().parentNode.removeChild(this.getElement());
          } catch (t) {
            u = t;
          }
          return (this.el = void 0);
        }),
        (t.prototype.render = function () {
          var t, e, n, r, s, o, i;
          if (null == document.querySelector(j.target)) return !1;
          for (
            t = this.getElement(),
              r = "translate3d(" + this.progress + "%, 0, 0)",
              i = ["webkitTransform", "msTransform", "transform"],
              s = 0,
              o = i.length;
            s < o;
            s++
          )
            (e = i[s]), (t.children[0].style[e] = r);
          return (
            (!this.lastRenderedProgress ||
              this.lastRenderedProgress | (0 !== this.progress) | 0) &&
              (t.children[0].setAttribute(
                "data-progress-text",
                "" + (0 | this.progress) + "%"
              ),
              this.progress >= 100
                ? (n = "99")
                : ((n = this.progress < 10 ? "0" : ""),
                  (n += 0 | this.progress)),
              t.children[0].setAttribute("data-progress", "" + n)),
            (this.lastRenderedProgress = this.progress)
          );
        }),
        (t.prototype.done = function () {
          return this.progress >= 100;
        }),
        t
      );
    })()),
    (a = (function () {
      function t() {
        this.bindings = {};
      }
      return (
        (t.prototype.trigger = function (t, e) {
          var n, r, s, o, i;
          if (null != this.bindings[t]) {
            for (o = this.bindings[t], i = [], r = 0, s = o.length; r < s; r++)
              (n = o[r]), i.push(n.call(this, e));
            return i;
          }
        }),
        (t.prototype.on = function (t, e) {
          var n;
          return (
            null == (n = this.bindings)[t] && (n[t] = []),
            this.bindings[t].push(e)
          );
        }),
        t
      );
    })()),
    (W = window.XMLHttpRequest),
    (X = window.XDomainRequest),
    (H = window.WebSocket),
    (k = function (t, e) {
      var n, r, s;
      s = [];
      for (r in e.prototype)
        try {
          null == t[r] && "function" != typeof e[r]
            ? "function" == typeof Object.defineProperty
              ? s.push(
                  Object.defineProperty(t, r, {
                    get: function () {
                      return e.prototype[r];
                    },
                    configurable: !0,
                    enumerable: !0,
                  })
                )
              : s.push((t[r] = e.prototype[r]))
            : s.push(void 0);
        } catch (o) {
          n = o;
        }
      return s;
    }),
    (T = []),
    (c.ignore = function () {
      var t, e, n;
      return (
        (e = arguments[0]),
        (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
        T.unshift("ignore"),
        (n = e.apply(null, t)),
        T.shift(),
        n
      );
    }),
    (c.track = function () {
      var t, e, n;
      return (
        (e = arguments[0]),
        (t = 2 <= arguments.length ? Q.call(arguments, 1) : []),
        T.unshift("track"),
        (n = e.apply(null, t)),
        T.shift(),
        n
      );
    }),
    (_ = function (t) {
      var e;
      if ((null == t && (t = "GET"), "track" === T[0])) return "force";
      if (!T.length && j.ajax) {
        if ("socket" === t && j.ajax.trackWebSockets) return !0;
        if (((e = t.toUpperCase()), Z.call(j.ajax.trackMethods, e) >= 0))
          return !0;
      }
      return !1;
    }),
    (l = (function (t) {
      function e() {
        var t,
          n = this;
        e.__super__.constructor.apply(this, arguments),
          (t = function (t) {
            var e;
            return (
              (e = t.open),
              (t.open = function (r, s, o) {
                return (
                  _(r) &&
                    n.trigger("request", {
                      type: r,
                      url: s,
                      request: t,
                    }),
                  e.apply(t, arguments)
                );
              })
            );
          }),
          (window.XMLHttpRequest = function (e) {
            var n;
            return (n = new W(e)), t(n), n;
          });
        try {
          k(window.XMLHttpRequest, W);
        } catch (r) {}
        if (null != X) {
          window.XDomainRequest = function () {
            var e;
            return (e = new X()), t(e), e;
          };
          try {
            k(window.XDomainRequest, X);
          } catch (r) {}
        }
        if (null != H && j.ajax.trackWebSockets) {
          window.WebSocket = function (t, e) {
            var r;
            return (
              (r = null != e ? new H(t, e) : new H(t)),
              _("socket") &&
                n.trigger("request", {
                  type: "socket",
                  url: t,
                  protocols: e,
                  request: r,
                }),
              r
            );
          };
          try {
            k(window.WebSocket, H);
          } catch (r) {}
        }
      }
      return Y(e, t), e;
    })(a)),
    (I = null),
    (x = function () {
      return null == I && (I = new l()), I;
    }),
    (N = function (t) {
      var e, n, r, s;
      for (s = j.ajax.ignoreURLs, n = 0, r = s.length; n < r; n++)
        if (((e = s[n]), "string" == typeof e)) {
          if (t.indexOf(e) !== -1) return !0;
        } else if (e.test(t)) return !0;
      return !1;
    }),
    x().on("request", function (e) {
      var n, r, s, o, i;
      if (((o = e.type), (s = e.request), (i = e.url), !N(i)))
        return c.running || (j.restartOnRequestAfter === !1 && "force" !== _(o))
          ? void 0
          : ((r = arguments),
            (n = j.restartOnRequestAfter || 0),
            "boolean" == typeof n && (n = 0),
            setTimeout(function () {
              var e, n, i, a, u, l;
              if (
                (e =
                  "socket" === o
                    ? s.readyState < 2
                    : 0 < (a = s.readyState) && a < 4)
              ) {
                for (
                  c.restart(), u = c.sources, l = [], n = 0, i = u.length;
                  n < i;
                  n++
                ) {
                  if (((F = u[n]), F instanceof t)) {
                    F.watch.apply(F, r);
                    break;
                  }
                  l.push(void 0);
                }
                return l;
              }
            }, n));
    }),
    (t = (function () {
      function t() {
        var t = this;
        (this.elements = []),
          x().on("request", function () {
            return t.watch.apply(t, arguments);
          });
      }
      return (
        (t.prototype.watch = function (t) {
          var e, n, r, s;
          if (((r = t.type), (e = t.request), (s = t.url), !N(s)))
            return (
              (n = "socket" === r ? new f(e) : new d(e)), this.elements.push(n)
            );
        }),
        t
      );
    })()),
    (d = (function () {
      function t(t) {
        var e,
          n,
          r,
          s,
          o,
          i,
          a = this;
        if (((this.progress = 0), null != window.ProgressEvent))
          for (
            n = null,
              t.addEventListener(
                "progress",
                function (t) {
                  return t.lengthComputable
                    ? (a.progress = (100 * t.loaded) / t.total)
                    : (a.progress = a.progress + (100 - a.progress) / 2);
                },
                !1
              ),
              i = ["load", "abort", "timeout", "error"],
              r = 0,
              s = i.length;
            r < s;
            r++
          )
            (e = i[r]),
              t.addEventListener(
                e,
                function () {
                  return (a.progress = 100);
                },
                !1
              );
        else
          (o = t.onreadystatechange),
            (t.onreadystatechange = function () {
              var e;
              return (
                0 === (e = t.readyState) || 4 === e
                  ? (a.progress = 100)
                  : 3 === t.readyState && (a.progress = 50),
                "function" == typeof o ? o.apply(null, arguments) : void 0
              );
            });
      }
      return t;
    })()),
    (f = (function () {
      function t(t) {
        var e,
          n,
          r,
          s,
          o = this;
        for (
          this.progress = 0, s = ["error", "open"], n = 0, r = s.length;
          n < r;
          n++
        )
          (e = s[n]),
            t.addEventListener(
              e,
              function () {
                return (o.progress = 100);
              },
              !1
            );
      }
      return t;
    })()),
    (r = (function () {
      function t(t) {
        var e, n, r, o;
        for (
          null == t && (t = {}),
            this.elements = [],
            null == t.selectors && (t.selectors = []),
            o = t.selectors,
            n = 0,
            r = o.length;
          n < r;
          n++
        )
          (e = o[n]), this.elements.push(new s(e));
      }
      return t;
    })()),
    (s = (function () {
      function t(t) {
        (this.selector = t), (this.progress = 0), this.check();
      }
      return (
        (t.prototype.check = function () {
          var t = this;
          return document.querySelector(this.selector)
            ? this.done()
            : setTimeout(function () {
                return t.check();
              }, j.elements.checkInterval);
        }),
        (t.prototype.done = function () {
          return (this.progress = 100);
        }),
        t
      );
    })()),
    (n = (function () {
      function t() {
        var t,
          e,
          n = this;
        (this.progress =
          null != (e = this.states[document.readyState]) ? e : 100),
          (t = document.onreadystatechange),
          (document.onreadystatechange = function () {
            return (
              null != n.states[document.readyState] &&
                (n.progress = n.states[document.readyState]),
              "function" == typeof t ? t.apply(null, arguments) : void 0
            );
          });
      }
      return (
        (t.prototype.states = {
          loading: 0,
          interactive: 50,
          complete: 100,
        }),
        t
      );
    })()),
    (o = (function () {
      function t() {
        var t,
          e,
          n,
          r,
          s,
          o = this;
        (this.progress = 0),
          (t = 0),
          (s = []),
          (r = 0),
          (n = R()),
          (e = setInterval(function () {
            var i;
            return (
              (i = R() - n - 50),
              (n = R()),
              s.push(i),
              s.length > j.eventLag.sampleCount && s.shift(),
              (t = m(s)),
              ++r >= j.eventLag.minSamples && t < j.eventLag.lagThreshold
                ? ((o.progress = 100), clearInterval(e))
                : (o.progress = 100 * (3 / (t + 3)))
            );
          }, 50));
      }
      return t;
    })()),
    (h = (function () {
      function t(t) {
        (this.source = t),
          (this.last = this.sinceLastUpdate = 0),
          (this.rate = j.initialRate),
          (this.catchup = 0),
          (this.progress = this.lastProgress = 0),
          null != this.source && (this.progress = M(this.source, "progress"));
      }
      return (
        (t.prototype.tick = function (t, e) {
          var n;
          return (
            null == e && (e = M(this.source, "progress")),
            e >= 100 && (this.done = !0),
            e === this.last
              ? (this.sinceLastUpdate += t)
              : (this.sinceLastUpdate &&
                  (this.rate = (e - this.last) / this.sinceLastUpdate),
                (this.catchup = (e - this.progress) / j.catchupTime),
                (this.sinceLastUpdate = 0),
                (this.last = e)),
            e > this.progress && (this.progress += this.catchup * t),
            (n = 1 - Math.pow(this.progress / 100, j.easeFactor)),
            (this.progress += n * this.rate * t),
            (this.progress = Math.min(
              this.lastProgress + j.maxProgressPerFrame,
              this.progress
            )),
            (this.progress = Math.max(0, this.progress)),
            (this.progress = Math.min(100, this.progress)),
            (this.lastProgress = this.progress),
            this.progress
          );
        }),
        t
      );
    })()),
    (C = null),
    (A = null),
    (y = null),
    (U = null),
    (g = null),
    (v = null),
    (c.running = !1),
    (L = function () {
      if (j.restartOnPushState) return c.restart();
    }),
    null != window.history.pushState &&
      ((B = window.history.pushState),
      (window.history.pushState = function () {
        return L(), B.apply(window.history, arguments);
      })),
    null != window.history.replaceState &&
      ((K = window.history.replaceState),
      (window.history.replaceState = function () {
        return L(), K.apply(window.history, arguments);
      })),
    (p = {
      ajax: t,
      elements: r,
      document: n,
      eventLag: o,
    }),
    (P = function () {
      var t, n, r, s, o, i, a, u;
      for (
        c.sources = C = [],
          i = ["ajax", "elements", "document", "eventLag"],
          n = 0,
          s = i.length;
        n < s;
        n++
      )
        (t = i[n]), j[t] !== !1 && C.push(new p[t](j[t]));
      for (
        u = null != (a = j.extraSources) ? a : [], r = 0, o = u.length;
        r < o;
        r++
      )
        (F = u[r]), C.push(new F(j));
      return (c.bar = y = new e()), (A = []), (U = new h());
    })(),
    (c.stop = function () {
      return (
        c.trigger("stop"),
        (c.running = !1),
        y.destroy(),
        (v = !0),
        null != g && ("function" == typeof w && w(g), (g = null)),
        P()
      );
    }),
    (c.restart = function () {
      return c.trigger("restart"), c.stop(), c.start();
    }),
    (c.go = function () {
      var t;
      return (
        (c.running = !0),
        y.render(),
        (t = R()),
        (v = !1),
        (g = O(function (e, n) {
          var r, s, o, i, a, u, l, p, f, d, g, m, w, b, S, k;
          for (
            p = 100 - y.progress, s = g = 0, o = !0, u = m = 0, b = C.length;
            m < b;
            u = ++m
          )
            for (
              F = C[u],
                d = null != A[u] ? A[u] : (A[u] = []),
                a = null != (k = F.elements) ? k : [F],
                l = w = 0,
                S = a.length;
              w < S;
              l = ++w
            )
              (i = a[l]),
                (f = null != d[l] ? d[l] : (d[l] = new h(i))),
                (o &= f.done),
                f.done || (s++, (g += f.tick(e)));
          return (
            (r = g / s),
            y.update(U.tick(e, r)),
            y.done() || o || v
              ? (y.update(100),
                c.trigger("done"),
                setTimeout(function () {
                  return y.finish(), (c.running = !1), c.trigger("hide");
                }, Math.max(j.ghostTime, Math.max(j.minTime - (R() - t), 0))))
              : n()
          );
        }))
      );
    }),
    (c.start = function (t) {
      S(j, t), (c.running = !0);
      try {
        y.render();
      } catch (e) {
        u = e;
      }
      return document.querySelector(".pace")
        ? (c.trigger("start"), c.go())
        : setTimeout(c.start, 50);
    }),
    "function" == typeof define && define.amd
      ? define(["pace"], function () {
          return c;
        })
      : "object" == typeof exports
      ? (module.exports = c)
      : j.startOnPageLoad && c.start();
}).call(this);
