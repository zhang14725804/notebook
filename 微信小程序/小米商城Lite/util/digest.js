ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = function(t, r) {
    var n, e = new Uint8Array(this);
    void 0 === r && (r = e.length);
    var i = new ArrayBuffer(r - t), u = new Uint8Array(i);
    for (n = 0; n < u.length; n++) u[n] = e[n + t];
    return i;
}), function(t) {
    function r() {}
    function n() {}
    function e() {}
    r.prototype.processBlock = function(t) {
        var r, n = this.current[0], e = this.current[1], i = this.current[2], u = this.current[3], h = t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0], c = t[7] << 24 | t[6] << 16 | t[5] << 8 | t[4], s = t[11] << 24 | t[10] << 16 | t[9] << 8 | t[8], o = t[15] << 24 | t[14] << 16 | t[13] << 8 | t[12], f = t[19] << 24 | t[18] << 16 | t[17] << 8 | t[16], a = t[23] << 24 | t[22] << 16 | t[21] << 8 | t[20], y = t[27] << 24 | t[26] << 16 | t[25] << 8 | t[24], g = t[31] << 24 | t[30] << 16 | t[29] << 8 | t[28], p = t[35] << 24 | t[34] << 16 | t[33] << 8 | t[32], l = t[39] << 24 | t[38] << 16 | t[37] << 8 | t[36], A = t[43] << 24 | t[42] << 16 | t[41] << 8 | t[40], d = t[47] << 24 | t[46] << 16 | t[45] << 8 | t[44], w = t[51] << 24 | t[50] << 16 | t[49] << 8 | t[48], L = t[55] << 24 | t[54] << 16 | t[53] << 8 | t[52], v = t[59] << 24 | t[58] << 16 | t[57] << 8 | t[56], B = t[63] << 24 | t[62] << 16 | t[61] << 8 | t[60];
        e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = (e = (i = (u = (n = e + ((r = n + h + 3614090360 + (e & i | ~e & u) | 0) << 7 | r >>> 25) | 0) + ((r = u + c + 3905402710 + (n & e | ~n & i) | 0) << 12 | r >>> 20) | 0) + ((r = i + s + 606105819 + (u & n | ~u & e) | 0) << 17 | r >>> 15) | 0) + ((r = e + o + 3250441966 + (i & u | ~i & n) | 0) << 22 | r >>> 10) | 0) + ((r = n + f + 4118548399 + (e & i | ~e & u) | 0) << 7 | r >>> 25) | 0) + ((r = u + a + 1200080426 + (n & e | ~n & i) | 0) << 12 | r >>> 20) | 0) + ((r = i + y + 2821735955 + (u & n | ~u & e) | 0) << 17 | r >>> 15) | 0) + ((r = e + g + 4249261313 + (i & u | ~i & n) | 0) << 22 | r >>> 10) | 0) + ((r = n + p + 1770035416 + (e & i | ~e & u) | 0) << 7 | r >>> 25) | 0) + ((r = u + l + 2336552879 + (n & e | ~n & i) | 0) << 12 | r >>> 20) | 0) + ((r = i + A + 4294925233 + (u & n | ~u & e) | 0) << 17 | r >>> 15) | 0) + ((r = e + d + 2304563134 + (i & u | ~i & n) | 0) << 22 | r >>> 10) | 0) + ((r = n + w + 1804603682 + (e & i | ~e & u) | 0) << 7 | r >>> 25) | 0) + ((r = u + L + 4254626195 + (n & e | ~n & i) | 0) << 12 | r >>> 20) | 0) + ((r = i + v + 2792965006 + (u & n | ~u & e) | 0) << 17 | r >>> 15) | 0) + ((r = e + B + 1236535329 + (i & u | ~i & n) | 0) << 22 | r >>> 10) | 0) + ((r = n + c + 4129170786 + (u & e | ~u & i) | 0) << 5 | r >>> 27) | 0) + ((r = u + y + 3225465664 + (i & n | ~i & e) | 0) << 9 | r >>> 23) | 0) + ((r = i + d + 643717713 + (e & u | ~e & n) | 0) << 14 | r >>> 18) | 0) + ((r = e + h + 3921069994 + (n & i | ~n & u) | 0) << 20 | r >>> 12) | 0) + ((r = n + a + 3593408605 + (u & e | ~u & i) | 0) << 5 | r >>> 27) | 0) + ((r = u + A + 38016083 + (i & n | ~i & e) | 0) << 9 | r >>> 23) | 0) + ((r = i + B + 3634488961 + (e & u | ~e & n) | 0) << 14 | r >>> 18) | 0) + ((r = e + f + 3889429448 + (n & i | ~n & u) | 0) << 20 | r >>> 12) | 0) + ((r = n + l + 568446438 + (u & e | ~u & i) | 0) << 5 | r >>> 27) | 0) + ((r = u + v + 3275163606 + (i & n | ~i & e) | 0) << 9 | r >>> 23) | 0) + ((r = i + o + 4107603335 + (e & u | ~e & n) | 0) << 14 | r >>> 18) | 0) + ((r = e + p + 1163531501 + (n & i | ~n & u) | 0) << 20 | r >>> 12) | 0) + ((r = n + L + 2850285829 + (u & e | ~u & i) | 0) << 5 | r >>> 27) | 0) + ((r = u + s + 4243563512 + (i & n | ~i & e) | 0) << 9 | r >>> 23) | 0) + ((r = i + g + 1735328473 + (e & u | ~e & n) | 0) << 14 | r >>> 18) | 0) + ((r = e + w + 2368359562 + (n & i | ~n & u) | 0) << 20 | r >>> 12) | 0) + ((r = n + a + 4294588738 + (e ^ i ^ u) | 0) << 4 | r >>> 28) | 0) + ((r = u + p + 2272392833 + (n ^ e ^ i) | 0) << 11 | r >>> 21) | 0) + ((r = i + d + 1839030562 + (u ^ n ^ e) | 0) << 16 | r >>> 16) | 0) + ((r = e + v + 4259657740 + (i ^ u ^ n) | 0) << 23 | r >>> 9) | 0) + ((r = n + c + 2763975236 + (e ^ i ^ u) | 0) << 4 | r >>> 28) | 0) + ((r = u + f + 1272893353 + (n ^ e ^ i) | 0) << 11 | r >>> 21) | 0) + ((r = i + g + 4139469664 + (u ^ n ^ e) | 0) << 16 | r >>> 16) | 0) + ((r = e + A + 3200236656 + (i ^ u ^ n) | 0) << 23 | r >>> 9) | 0) + ((r = n + L + 681279174 + (e ^ i ^ u) | 0) << 4 | r >>> 28) | 0) + ((r = u + h + 3936430074 + (n ^ e ^ i) | 0) << 11 | r >>> 21) | 0) + ((r = i + o + 3572445317 + (u ^ n ^ e) | 0) << 16 | r >>> 16) | 0) + ((r = e + y + 76029189 + (i ^ u ^ n) | 0) << 23 | r >>> 9) | 0) + ((r = n + l + 3654602809 + (e ^ i ^ u) | 0) << 4 | r >>> 28) | 0) + ((r = u + w + 3873151461 + (n ^ e ^ i) | 0) << 11 | r >>> 21) | 0) + ((r = i + B + 530742520 + (u ^ n ^ e) | 0) << 16 | r >>> 16) | 0) + ((r = e + s + 3299628645 + (i ^ u ^ n) | 0) << 23 | r >>> 9) | 0) + ((r = n + h + 4096336452 + (i ^ (e | ~u)) | 0) << 6 | r >>> 26) | 0) + ((r = u + g + 1126891415 + (e ^ (n | ~i)) | 0) << 10 | r >>> 22) | 0) + ((r = i + v + 2878612391 + (n ^ (u | ~e)) | 0) << 15 | r >>> 17) | 0) + ((r = e + a + 4237533241 + (u ^ (i | ~n)) | 0) << 21 | r >>> 11) | 0) + ((r = n + w + 1700485571 + (i ^ (e | ~u)) | 0) << 6 | r >>> 26) | 0) + ((r = u + o + 2399980690 + (e ^ (n | ~i)) | 0) << 10 | r >>> 22) | 0) + ((r = i + A + 4293915773 + (n ^ (u | ~e)) | 0) << 15 | r >>> 17) | 0) + ((r = e + c + 2240044497 + (u ^ (i | ~n)) | 0) << 21 | r >>> 11) | 0) + ((r = n + p + 1873313359 + (i ^ (e | ~u)) | 0) << 6 | r >>> 26) | 0) + ((r = u + B + 4264355552 + (e ^ (n | ~i)) | 0) << 10 | r >>> 22) | 0) + ((r = i + y + 2734768916 + (n ^ (u | ~e)) | 0) << 15 | r >>> 17) | 0) + ((r = e + L + 1309151649 + (u ^ (i | ~n)) | 0) << 21 | r >>> 11) | 0) + ((r = n + f + 4149444226 + (i ^ (e | ~u)) | 0) << 6 | r >>> 26) | 0) + ((r = u + d + 3174756917 + (e ^ (n | ~i)) | 0) << 10 | r >>> 22) | 0) + ((r = i + s + 718787259 + (n ^ (u | ~e)) | 0) << 15 | r >>> 17) | 0) + ((r = e + l + 3951481745 + (u ^ (i | ~n)) | 0) << 21 | r >>> 11) | 0, 
        this.current[0] += n, this.current[1] += e, this.current[2] += i, this.current[3] += u, 
        this.currentLen += 64;
    }, r.prototype.doPadding = function() {
        var t = 4294967295 & 8 * (this.inLen + this.currentLen), r = this.inLen <= 55 ? 55 - this.inLen : 119 - this.inLen, n = new Uint8Array(new ArrayBuffer(r + 1 + 8));
        return n[0] = 128, n[n.length - 8] = 255 & t, n[n.length - 7] = t >>> 8 & 255, n[n.length - 6] = t >>> 16 & 255, 
        n[n.length - 5] = t >>> 24 & 255, n[n.length - 4] = 0, n[n.length - 3] = 0, n[n.length - 2] = 0, 
        n[n.length - 1] = 0, n;
    }, r.prototype.getDigest = function() {
        var t = new Uint8Array(new ArrayBuffer(16));
        return t[0] = 255 & this.current[0], t[1] = this.current[0] >>> 8 & 255, t[2] = this.current[0] >>> 16 & 255, 
        t[3] = this.current[0] >>> 24 & 255, t[4] = 255 & this.current[1], t[5] = this.current[1] >>> 8 & 255, 
        t[6] = this.current[1] >>> 16 & 255, t[7] = this.current[1] >>> 24 & 255, t[8] = 255 & this.current[2], 
        t[9] = this.current[2] >>> 8 & 255, t[10] = this.current[2] >>> 16 & 255, t[11] = this.current[2] >>> 24 & 255, 
        t[12] = 255 & this.current[3], t[13] = this.current[3] >>> 8 & 255, t[14] = this.current[3] >>> 16 & 255, 
        t[15] = this.current[3] >>> 24 & 255, t.buffer;
    }, r.prototype.reset = function() {
        this.currentLen = 0, this.inLen = 0, this.current = new Uint32Array(new ArrayBuffer(16)), 
        this.current[0] = 1732584193, this.current[1] = 4023233417, this.current[2] = 2562383102, 
        this.current[3] = 271733878;
    }, r.prototype.blockLen = 64, r.prototype.digestLen = 16, n.prototype.processBlock = function(t) {
        var r, n, e = this.current[0], i = this.current[1], u = this.current[2], h = this.current[3], c = this.current[4], s = [ t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[8] << 24 | t[9] << 16 | t[10] << 8 | t[11], t[12] << 24 | t[13] << 16 | t[14] << 8 | t[15], t[16] << 24 | t[17] << 16 | t[18] << 8 | t[19], t[20] << 24 | t[21] << 16 | t[22] << 8 | t[23], t[24] << 24 | t[25] << 16 | t[26] << 8 | t[27], t[28] << 24 | t[29] << 16 | t[30] << 8 | t[31], t[32] << 24 | t[33] << 16 | t[34] << 8 | t[35], t[36] << 24 | t[37] << 16 | t[38] << 8 | t[39], t[40] << 24 | t[41] << 16 | t[42] << 8 | t[43], t[44] << 24 | t[45] << 16 | t[46] << 8 | t[47], t[48] << 24 | t[49] << 16 | t[50] << 8 | t[51], t[52] << 24 | t[53] << 16 | t[54] << 8 | t[55], t[56] << 24 | t[57] << 16 | t[58] << 8 | t[59], t[60] << 24 | t[61] << 16 | t[62] << 8 | t[63] ];
        for (n = 16; n < 80; n++) s.push((s[n - 3] ^ s[n - 8] ^ s[n - 14] ^ s[n - 16]) << 1 | (s[n - 3] ^ s[n - 8] ^ s[n - 14] ^ s[n - 16]) >>> 31);
        for (n = 0; n < 80; n++) r = (e << 5 | e >>> 27) + c + s[n], r += n < 20 ? 1518500249 + (i & u | ~i & h) | 0 : n < 40 ? 1859775393 + (i ^ u ^ h) | 0 : n < 60 ? 2400959708 + (i & u | i & h | u & h) | 0 : 3395469782 + (i ^ u ^ h) | 0, 
        c = h, h = u, u = i << 30 | i >>> 2, i = e, e = r;
        this.current[0] += e, this.current[1] += i, this.current[2] += u, this.current[3] += h, 
        this.current[4] += c, this.currentLen += 64;
    }, n.prototype.doPadding = function() {
        var t = 4294967295 & 8 * (this.inLen + this.currentLen), r = this.inLen <= 55 ? 55 - this.inLen : 119 - this.inLen, n = new Uint8Array(new ArrayBuffer(r + 1 + 8));
        return n[0] = 128, n[n.length - 1] = 255 & t, n[n.length - 2] = t >>> 8 & 255, n[n.length - 3] = t >>> 16 & 255, 
        n[n.length - 4] = t >>> 24 & 255, n[n.length - 5] = 0, n[n.length - 6] = 0, n[n.length - 7] = 0, 
        n[n.length - 8] = 0, n;
    }, n.prototype.getDigest = function() {
        var t = new Uint8Array(new ArrayBuffer(20));
        return t[3] = 255 & this.current[0], t[2] = this.current[0] >>> 8 & 255, t[1] = this.current[0] >>> 16 & 255, 
        t[0] = this.current[0] >>> 24 & 255, t[7] = 255 & this.current[1], t[6] = this.current[1] >>> 8 & 255, 
        t[5] = this.current[1] >>> 16 & 255, t[4] = this.current[1] >>> 24 & 255, t[11] = 255 & this.current[2], 
        t[10] = this.current[2] >>> 8 & 255, t[9] = this.current[2] >>> 16 & 255, t[8] = this.current[2] >>> 24 & 255, 
        t[15] = 255 & this.current[3], t[14] = this.current[3] >>> 8 & 255, t[13] = this.current[3] >>> 16 & 255, 
        t[12] = this.current[3] >>> 24 & 255, t[19] = 255 & this.current[4], t[18] = this.current[4] >>> 8 & 255, 
        t[17] = this.current[4] >>> 16 & 255, t[16] = this.current[4] >>> 24 & 255, t.buffer;
    }, n.prototype.reset = function() {
        this.currentLen = 0, this.inLen = 0, this.current = new Uint32Array(new ArrayBuffer(20)), 
        this.current[0] = 1732584193, this.current[1] = 4023233417, this.current[2] = 2562383102, 
        this.current[3] = 271733878, this.current[4] = 3285377520;
    }, n.prototype.blockLen = 64, n.prototype.digestLen = 20, e.prototype.processBlock = function(t) {
        for (var r, n, e, i, u, h, c, s, o, f, a, y, g, p, l, A, d, w, L = this.current[0], v = this.current[1], B = this.current[2], U = this.current[3], b = this.current[4], D = this.current[5], k = this.current[6], m = this.current[7], H = [ e = t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], i = t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], u = t[8] << 24 | t[9] << 16 | t[10] << 8 | t[11], h = t[12] << 24 | t[13] << 16 | t[14] << 8 | t[15], c = t[16] << 24 | t[17] << 16 | t[18] << 8 | t[19], s = t[20] << 24 | t[21] << 16 | t[22] << 8 | t[23], o = t[24] << 24 | t[25] << 16 | t[26] << 8 | t[27], f = t[28] << 24 | t[29] << 16 | t[30] << 8 | t[31], a = t[32] << 24 | t[33] << 16 | t[34] << 8 | t[35], y = t[36] << 24 | t[37] << 16 | t[38] << 8 | t[39], g = t[40] << 24 | t[41] << 16 | t[42] << 8 | t[43], p = t[44] << 24 | t[45] << 16 | t[46] << 8 | t[47], l = t[48] << 24 | t[49] << 16 | t[50] << 8 | t[51], A = t[52] << 24 | t[53] << 16 | t[54] << 8 | t[55], d = t[56] << 24 | t[57] << 16 | t[58] << 8 | t[59], w = t[60] << 24 | t[61] << 16 | t[62] << 8 | t[63] ], z = 16; z < 64; z++) H.push(((H[z - 2] >>> 17 | H[z - 2] << 15) ^ (H[z - 2] >>> 19 | H[z - 2] << 13) ^ H[z - 2] >>> 10) + H[z - 7] + ((H[z - 15] >>> 7 | H[z - 15] << 25) ^ (H[z - 15] >>> 18 | H[z - 15] << 14) ^ H[z - 15] >>> 3) + H[z - 16] | 0);
        for (var M = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ], K = 0; K < 64; K++) r = m + ((b >>> 6 | b << 26) ^ (b >>> 11 | b << 21) ^ (b >>> 25 | b << 7)) + (b & D ^ ~b & k) + M[K] + H[K] | 0, 
        n = ((L >>> 2 | L << 30) ^ (L >>> 13 | L << 19) ^ (L >>> 22 | L << 10)) + (L & v ^ v & B ^ L & B) | 0, 
        m = k, k = D, D = b, b = U + r | 0, U = B, B = v, v = L, L = r + n | 0;
        this.current[0] += L, this.current[1] += v, this.current[2] += B, this.current[3] += U, 
        this.current[4] += b, this.current[5] += D, this.current[6] += k, this.current[7] += m, 
        this.currentLen += 64;
    }, e.prototype.doPadding = function() {
        var t = 0 | 8 * (this.inLen + this.currentLen), r = this.inLen <= 55 ? 55 - this.inLen : 119 - this.inLen, n = new Uint8Array(new ArrayBuffer(r + 1 + 8));
        return n[0] = 128, n[n.length - 1] = 255 & t, n[n.length - 2] = t >>> 8 & 255, n[n.length - 3] = t >>> 16 & 255, 
        n[n.length - 4] = t >>> 24 & 255, n[n.length - 5] = 0, n[n.length - 6] = 0, n[n.length - 7] = 0, 
        n[n.length - 8] = 0, n;
    }, e.prototype.getDigest = function() {
        var t = new Uint8Array(new ArrayBuffer(32));
        return t[3] = 255 & this.current[0], t[2] = this.current[0] >>> 8 & 255, t[1] = this.current[0] >>> 16 & 255, 
        t[0] = this.current[0] >>> 24 & 255, t[7] = 255 & this.current[1], t[6] = this.current[1] >>> 8 & 255, 
        t[5] = this.current[1] >>> 16 & 255, t[4] = this.current[1] >>> 24 & 255, t[11] = 255 & this.current[2], 
        t[10] = this.current[2] >>> 8 & 255, t[9] = this.current[2] >>> 16 & 255, t[8] = this.current[2] >>> 24 & 255, 
        t[15] = 255 & this.current[3], t[14] = this.current[3] >>> 8 & 255, t[13] = this.current[3] >>> 16 & 255, 
        t[12] = this.current[3] >>> 24 & 255, t[19] = 255 & this.current[4], t[18] = this.current[4] >>> 8 & 255, 
        t[17] = this.current[4] >>> 16 & 255, t[16] = this.current[4] >>> 24 & 255, t[23] = 255 & this.current[5], 
        t[22] = this.current[5] >>> 8 & 255, t[21] = this.current[5] >>> 16 & 255, t[20] = this.current[5] >>> 24 & 255, 
        t[27] = 255 & this.current[6], t[26] = this.current[6] >>> 8 & 255, t[25] = this.current[6] >>> 16 & 255, 
        t[24] = this.current[6] >>> 24 & 255, t[31] = 255 & this.current[7], t[30] = this.current[7] >>> 8 & 255, 
        t[29] = this.current[7] >>> 16 & 255, t[28] = this.current[7] >>> 24 & 255, t.buffer;
    }, e.prototype.reset = function() {
        this.currentLen = 0, this.inLen = 0, this.current = new Uint32Array(new ArrayBuffer(32)), 
        this.current[0] = 1779033703, this.current[1] = 3144134277, this.current[2] = 1013904242, 
        this.current[3] = 2773480762, this.current[4] = 1359893119, this.current[5] = 2600822924, 
        this.current[6] = 528734635, this.current[7] = 1541459225;
    }, e.prototype.blockLen = 64, e.prototype.digestLen = 32;
    var i = function(t) {
        var r, n = new ArrayBuffer(t.length), e = new Uint8Array(n);
        for (r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
        return e;
    }, u = function(t) {
        var r = new ArrayBuffer(1), n = new Uint8Array(r);
        return n[0] = t, n;
    }, h = function(t) {
        if (t.constructor === Uint8Array) return t;
        if (t.constructor === ArrayBuffer) return new Uint8Array(t);
        if (t.constructor === String) return i(t);
        if (t.constructor === Number) {
            if (t > 255) throw "For more than one byte, use an array buffer";
            if (t < 0) throw "Input value must be positive";
            return u(t);
        }
        throw "Unsupported type";
    }, c = function(t) {
        var r = new Uint8Array(new ArrayBuffer(4));
        return r[0] = (4278190080 & t) >> 24, r[1] = (16711680 & t) >> 16, r[2] = (65280 & t) >> 8, 
        r[3] = 255 & t, r;
    }, s = function(t) {
        var r = function(t) {
            for (var r = t.length, n = 0; r > 0; ) {
                var e = this.blockLen - this.inLen;
                e > r && (e = r);
                var i = t.subarray(n, n + e);
                this.inbuf.set(i, this.inLen), n += e, r -= e, this.inLen += e, this.inLen === this.blockLen && (this.processBlock(this.inbuf), 
                this.inLen = 0);
            }
        }, n = function() {
            var t = this.doPadding();
            this.update(t);
            var r = this.getDigest();
            return this.reset(), r;
        }, e = function() {
            if (!t) throw "Unsupported algorithm: " + t.toString();
            t.prototype.update = r, t.prototype.finalize = n;
            var e = new t();
            return e.inbuf = new Uint8Array(new ArrayBuffer(e.blockLen)), e.reset(), e;
        }();
        return {
            update: function(t) {
                e.update(h(t));
            },
            finalize: function() {
                return e.finalize();
            },
            digest: function(t) {
                return e.update(h(t)), e.finalize();
            },
            reset: function() {
                e.reset();
            },
            digestLength: function() {
                return e.digestLen;
            }
        };
    }, o = function(t) {
        var r, n, e, i = !1, u = function() {
            var u, h;
            if (!i) {
                if (void 0 === r) throw "MAC key is not defined";
                for (h = r.byteLength > 64 ? new Uint8Array(t.digest(r)) : new Uint8Array(r), n = new Uint8Array(new ArrayBuffer(64)), 
                u = 0; u < h.length; u++) n[u] = 54 ^ h[u];
                for (u = h.length; u < 64; u++) n[u] = 54;
                for (e = new Uint8Array(new ArrayBuffer(64)), u = 0; u < h.length; u++) e[u] = 92 ^ h[u];
                for (u = h.length; u < 64; u++) e[u] = 92;
                i = !0, t.update(n.buffer);
            }
        }, c = function() {
            i = !1, r = void 0, n = void 0, e = void 0, t.reset();
        }, s = function() {
            var r = t.finalize();
            return t.reset(), t.update(e.buffer), t.update(r), r = t.finalize(), c(), r;
        }, o = function(t) {
            r = t;
        };
        return {
            setKey: function(t) {
                o(h(t)), u();
            },
            update: function(r) {
                t.update(r);
            },
            finalize: function() {
                return s();
            },
            mac: function(t) {
                return this.update(t), this.finalize();
            },
            reset: function() {
                c();
            },
            hmacLength: function() {
                return t.digestLength();
            }
        };
    }, f = function(t, r) {
        var n = function(n, e, i) {
            var u, h;
            if (i > t.digestLength()) throw "Key length larger than digest length";
            for (t.reset(), t.update(n), t.update(e), h = t.finalize(), u = 1; u < r; u++) h = t.digest(h);
            return h.slice(0, i);
        };
        return {
            deriveKey: function(t, r, e) {
                return n(h(t), h(r), e);
            }
        };
    }, a = function(t, r) {
        var n = function(t, r) {
            var n;
            for (n = 0; n < t.length; n++) t[n] = t[n] ^ r[n];
            return t;
        }, e = function(r, e, i, u) {
            var h, s = new Uint8Array(new ArrayBuffer(t.hmacLength())), o = new Uint8Array(new ArrayBuffer(e.length + 4));
            for (o.set(e, 0), o.set(c(u), e.length), h = 1; h <= i; h++) t.setKey(r), t.update(o), 
            o = new Uint8Array(t.finalize()), s = n(s, o);
            return s;
        }, i = function(n, i, u) {
            var h, c, s;
            if (u > 4294967295 * t.hmacLength()) throw "Derived key length too long";
            for (c = Math.ceil(u / t.hmacLength()), s = new Uint8Array(new ArrayBuffer(u * t.hmacLength())), 
            h = 1; h <= c; h++) s.set(e(n, i, r, h), t.hmacLength() * (h - 1));
            return s.buffer.slice(0, u);
        };
        return {
            deriveKey: function(t, r, n) {
                return i(h(t), h(r), n);
            }
        };
    }, y = {
        SHA1: function() {
            return s(n);
        },
        MD5: function() {
            return s(r);
        },
        SHA256: function() {
            return s(e);
        },
        HMAC_SHA1: function() {
            return o(s(n));
        },
        HMAC_MD5: function() {
            return o(s(r));
        },
        HMAC_SHA256: function() {
            return o(s(e));
        },
        PBKDF1_SHA1: function(t) {
            return f(s(n), t);
        },
        PBKDF1_MD5: function(t) {
            return f(s(r), t);
        },
        PBKDF2_HMAC_SHA1: function(t) {
            return a(o(s(n)), t);
        },
        PBKDF2_HMAC_SHA256: function(t) {
            return a(o(s(e)), t);
        }
    };
    module.exports = {
        Digest: y
    };
}();