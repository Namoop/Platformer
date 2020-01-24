function rando(a, b, c, exclude) {
    try {
        if (null !== a && null !== b && null !== c) {
            if ("undefined" === typeof a) return Math.random();
            if (window.jQuery && a instanceof jQuery && "undefined" === typeof b) {
                if (0 == a.length) return !1;
                var d = rando(0, a.length);
                return {
                    index: d,
                    value: a.eq(d)
                }
            }
            if (!isNaN(a) && !isNaN(b) && "string" === typeof c && "float" == c.toLowerCase().trim()) {
                if (a > b) {
                    var f = b;
                    b = a;
                    a = f
                }
                return Math.random() * (b - a) + a
            }
            if (a.constructor === Array && 0 < a.length && "undefined" === typeof b) {
                var e = Math.floor(Math.random() * a.length);
                return {
                    index: e,
                    value: a[e]
                }
            }
            if ("object" ===
                typeof a && "undefined" === typeof b) {
                e = a;
                var g = Object.keys(e);
                if (0 < g.length) {
                    var h = g[g.length * Math.random() << 0];
                    return {
                        key: h,
                        value: e[h]
                    }
                }
            }
            if ((!0 === a && !1 === b || !1 === a && !0 === b) && "undefined" === typeof c) return .5 < rando();
            if (!isNaN(a) && "undefined" === typeof b) return 0 <= a ? rando(0, a) : rando(a, 0);
            if (!isNaN(a) && "string" === typeof b && "float" == b.toLowerCase().trim() && "undefined" === typeof c) return 0 <= a ? rando(0, a, "float") : rando(a, 0, "float");
            if (!isNaN(a) || !isNaN(b) && "undefined" === typeof c) return a > b && (f = b, b = a, a = f), a = Math.floor(a),
                b = Math.floor(b), Math.floor(Math.random() * (b - a + 1) + a);
            if ("string" === typeof a && 0 < a.length && "undefined" === typeof b) return a.charAt(rando(0, a.length - 1))
        }
        return !1
    } catch (k) {
        return !1
    }
}

function randoSequence(a, b) {
    try {
        if ("undefined" === typeof a || null === a || null === b) return !1;
        var c = [];
        if (window.jQuery && a instanceof jQuery && "undefined" === typeof b) {
            if (0 < a.length) {
                c = randoSequence(0, a.length - 1);
                for (var d = 0; d < c.length; d++) c[d] = {
                    index: c[d],
                    value: a.eq(c[d])
                }
            }
            return c
        }
        if ("undefined" !== typeof b) {
            if (isNaN(a) || isNaN(b)) return !1;
            if (a > b) {
                var f = b;
                b = a;
                a = f
            }
            for (d = a; d <= b; d++) c[c.length] = d
        } else if (a.constructor === Array && "undefined" === typeof b)
            for (d = 0; d < a.length; d++) c[c.length] = {
                index: d,
                value: a[d]
            };
        else if ("object" ===
            typeof a && "undefined" === typeof b)
            for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (c[c.length] = {
                key: e,
                value: a[e]
            });
        else if ("string" === typeof a && "undefined" === typeof b)
            for (d = 0; d < a.length; d++) c[c.length] = a.charAt(d);
        else return isNaN(a) || "undefined" !== typeof b ? !1 : 0 <= a ? randoSequence(0, a) : randoSequence(a, 0);
        for (d = c.length - 1; 0 < d; d--) {
            var g = rando(d);
            f = c[d];
            c[d] = c[g];
            c[g] = f
        }
        return c
    } catch (h) {
        return !1
    }
};