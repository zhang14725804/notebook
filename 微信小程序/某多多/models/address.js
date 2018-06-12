function i(i, t) {
    if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../constants/addresses"));

exports.default = function s(e) {
    i(this, s), e && (this.address = e.address, this.addressId = e.address_id, this.city = e.city, 
    this.cityId = e.city_id, this.district = e.district, this.districtId = e.district_id, 
    this.isDefaultAddress = e.is_default.toString() === t.default.AddressClass.Default, 
    this.mobile = e.mobile, this.name = e.name, this.province = e.province, this.provinceId = e.province_id, 
    this.uid = e.uid);
};