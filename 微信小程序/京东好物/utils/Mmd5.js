module.exports = {
    Mmd5: function() {
        var h = {
            hexcase: 0,
            b64pad: "",
            chrsz: 8,
            core_md5: function(h, i) {
                h[i >> 5] |= 128 << i % 32, h[14 + (i + 64 >>> 9 << 4)] = i;
                for (var t = 1732584193, s = -271733879, d = -1732584194, _ = 271733878, m = 0; m < h.length; m += 16) {
                    var r = t, n = s, f = d, e = _;
                    t = this.md5_ff(t, s, d, _, h[m + 0], 7, -680876936), _ = this.md5_ff(_, t, s, d, h[m + 1], 12, -389564586), 
                    d = this.md5_ff(d, _, t, s, h[m + 2], 17, 606105819), s = this.md5_ff(s, d, _, t, h[m + 3], 22, -1044525330), 
                    t = this.md5_ff(t, s, d, _, h[m + 4], 7, -176418897), _ = this.md5_ff(_, t, s, d, h[m + 5], 12, 1200080426), 
                    d = this.md5_ff(d, _, t, s, h[m + 6], 17, -1473231341), s = this.md5_ff(s, d, _, t, h[m + 7], 22, -45705983), 
                    t = this.md5_ff(t, s, d, _, h[m + 8], 7, 1770035416), _ = this.md5_ff(_, t, s, d, h[m + 9], 12, -1958414417), 
                    d = this.md5_ff(d, _, t, s, h[m + 10], 17, -42063), s = this.md5_ff(s, d, _, t, h[m + 11], 22, -1990404162), 
                    t = this.md5_ff(t, s, d, _, h[m + 12], 7, 1804603682), _ = this.md5_ff(_, t, s, d, h[m + 13], 12, -40341101), 
                    d = this.md5_ff(d, _, t, s, h[m + 14], 17, -1502002290), s = this.md5_ff(s, d, _, t, h[m + 15], 22, 1236535329), 
                    t = this.md5_gg(t, s, d, _, h[m + 1], 5, -165796510), _ = this.md5_gg(_, t, s, d, h[m + 6], 9, -1069501632), 
                    d = this.md5_gg(d, _, t, s, h[m + 11], 14, 643717713), s = this.md5_gg(s, d, _, t, h[m + 0], 20, -373897302), 
                    t = this.md5_gg(t, s, d, _, h[m + 5], 5, -701558691), _ = this.md5_gg(_, t, s, d, h[m + 10], 9, 38016083), 
                    d = this.md5_gg(d, _, t, s, h[m + 15], 14, -660478335), s = this.md5_gg(s, d, _, t, h[m + 4], 20, -405537848), 
                    t = this.md5_gg(t, s, d, _, h[m + 9], 5, 568446438), _ = this.md5_gg(_, t, s, d, h[m + 14], 9, -1019803690), 
                    d = this.md5_gg(d, _, t, s, h[m + 3], 14, -187363961), s = this.md5_gg(s, d, _, t, h[m + 8], 20, 1163531501), 
                    t = this.md5_gg(t, s, d, _, h[m + 13], 5, -1444681467), _ = this.md5_gg(_, t, s, d, h[m + 2], 9, -51403784), 
                    d = this.md5_gg(d, _, t, s, h[m + 7], 14, 1735328473), s = this.md5_gg(s, d, _, t, h[m + 12], 20, -1926607734), 
                    t = this.md5_hh(t, s, d, _, h[m + 5], 4, -378558), _ = this.md5_hh(_, t, s, d, h[m + 8], 11, -2022574463), 
                    d = this.md5_hh(d, _, t, s, h[m + 11], 16, 1839030562), s = this.md5_hh(s, d, _, t, h[m + 14], 23, -35309556), 
                    t = this.md5_hh(t, s, d, _, h[m + 1], 4, -1530992060), _ = this.md5_hh(_, t, s, d, h[m + 4], 11, 1272893353), 
                    d = this.md5_hh(d, _, t, s, h[m + 7], 16, -155497632), s = this.md5_hh(s, d, _, t, h[m + 10], 23, -1094730640), 
                    t = this.md5_hh(t, s, d, _, h[m + 13], 4, 681279174), _ = this.md5_hh(_, t, s, d, h[m + 0], 11, -358537222), 
                    d = this.md5_hh(d, _, t, s, h[m + 3], 16, -722521979), s = this.md5_hh(s, d, _, t, h[m + 6], 23, 76029189), 
                    t = this.md5_hh(t, s, d, _, h[m + 9], 4, -640364487), _ = this.md5_hh(_, t, s, d, h[m + 12], 11, -421815835), 
                    d = this.md5_hh(d, _, t, s, h[m + 15], 16, 530742520), s = this.md5_hh(s, d, _, t, h[m + 2], 23, -995338651), 
                    t = this.md5_ii(t, s, d, _, h[m + 0], 6, -198630844), _ = this.md5_ii(_, t, s, d, h[m + 7], 10, 1126891415), 
                    d = this.md5_ii(d, _, t, s, h[m + 14], 15, -1416354905), s = this.md5_ii(s, d, _, t, h[m + 5], 21, -57434055), 
                    t = this.md5_ii(t, s, d, _, h[m + 12], 6, 1700485571), _ = this.md5_ii(_, t, s, d, h[m + 3], 10, -1894986606), 
                    d = this.md5_ii(d, _, t, s, h[m + 10], 15, -1051523), s = this.md5_ii(s, d, _, t, h[m + 1], 21, -2054922799), 
                    t = this.md5_ii(t, s, d, _, h[m + 8], 6, 1873313359), _ = this.md5_ii(_, t, s, d, h[m + 15], 10, -30611744), 
                    d = this.md5_ii(d, _, t, s, h[m + 6], 15, -1560198380), s = this.md5_ii(s, d, _, t, h[m + 13], 21, 1309151649), 
                    t = this.md5_ii(t, s, d, _, h[m + 4], 6, -145523070), _ = this.md5_ii(_, t, s, d, h[m + 11], 10, -1120210379), 
                    d = this.md5_ii(d, _, t, s, h[m + 2], 15, 718787259), s = this.md5_ii(s, d, _, t, h[m + 9], 21, -343485551), 
                    t = this.safe_add(t, r), s = this.safe_add(s, n), d = this.safe_add(d, f), _ = this.safe_add(_, e);
                }
                return Array(t, s, d, _);
            },
            md5_cmn: function(h, i, t, s, d, _) {
                return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(i, h), this.safe_add(s, _)), d), t);
            },
            md5_ff: function(h, i, t, s, d, _, m) {
                return this.md5_cmn(i & t | ~i & s, h, i, d, _, m);
            },
            md5_gg: function(h, i, t, s, d, _, m) {
                return this.md5_cmn(i & s | t & ~s, h, i, d, _, m);
            },
            md5_hh: function(h, i, t, s, d, _, m) {
                return this.md5_cmn(i ^ t ^ s, h, i, d, _, m);
            },
            md5_ii: function(h, i, t, s, d, _, m) {
                return this.md5_cmn(t ^ (i | ~s), h, i, d, _, m);
            },
            core_hmac_md5: function(h, i) {
                var t = this.str2binl(h);
                t.length > 16 && (t = core_md5(t, h.length * this.chrsz));
                for (var s = Array(16), d = Array(16), _ = 0; _ < 16; _++) s[_] = 909522486 ^ t[_], 
                d[_] = 1549556828 ^ t[_];
                var m = core_md5(s.concat(this.str2binl(i)), 512 + i.length * this.chrsz);
                return core_md5(d.concat(m), 640);
            },
            safe_add: function(h, i) {
                var t = (65535 & h) + (65535 & i);
                return (h >> 16) + (i >> 16) + (t >> 16) << 16 | 65535 & t;
            },
            bit_rol: function(h, i) {
                return h << i | h >>> 32 - i;
            },
            str2binl: function(h) {
                for (var i = Array(), t = (1 << this.chrsz) - 1, s = 0; s < h.length * this.chrsz; s += this.chrsz) i[s >> 5] |= (h.charCodeAt(s / this.chrsz) & t) << s % 32;
                return i;
            },
            binl2hex: function(h) {
                for (var i = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", t = "", s = 0; s < 4 * h.length; s++) t += i.charAt(h[s >> 2] >> s % 4 * 8 + 4 & 15) + i.charAt(h[s >> 2] >> s % 4 * 8 & 15);
                return t;
            },
            binl2b64: function(h) {
                for (var i = "", t = 0; t < 4 * h.length; t += 3) for (var s = (h[t >> 2] >> t % 4 * 8 & 255) << 16 | (h[t + 1 >> 2] >> (t + 1) % 4 * 8 & 255) << 8 | h[t + 2 >> 2] >> (t + 2) % 4 * 8 & 255, d = 0; d < 4; d++) 8 * t + 6 * d > 32 * h.length ? i += this.b64pad : i += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(s >> 6 * (3 - d) & 63);
                return i;
            }
        };
        return {
            hex_md5: function(i) {
                return h.binl2hex(h.core_md5(h.str2binl(i), i.length * h.chrsz));
            },
            b64_md5: function(i) {
                return h.binl2hex(h.core_md5(h.str2binl(i), i.length * h.chrsz));
            },
            hex_hmac_md5: function(i, t) {
                return h.binl2hex(h.core_hmac_md5(i, t));
            },
            b64_hmac_md5: function(i, t) {
                return h.binl2hex(h.core_hmac_md5(i, t));
            },
            calcMD5: function(i) {
                return h.binl2hex(h.core_md5(h.str2binl(i), i.length * h.chrsz));
            }
        };
    }
};