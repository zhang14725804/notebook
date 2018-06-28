import UUID from '../../utils/uuid/UUID';
import CK from '../../utils/CK';

window.version= 100;
window.appType=1;
window.deviceId=1111111111111111;
window.appChannel=1000;
window.storeId=14;

CK.set("version", "100", "240h");
CK.set("appType", "1", "240h");
CK.set("deviceId", new UUID().toString(), "240h");
CK.set("appChannel", "1000", "240h");
CK.set("storeId", "14", "240h");