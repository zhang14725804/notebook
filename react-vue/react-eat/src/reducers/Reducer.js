import {combineReducers} from 'redux';

import Rd_UserInfo from './Rd_UserInfo';
import Rd_OrderList from './Rd_OrderList';
import Rd_AddressList from './Rd_AddressList';
import Rd_EditAddr from './Rd_EditAddr';
import Rd_Coupon from './Rd_Coupon';
import {handlePointsCount as Rd_Points_Count, handlePointsDetail as Rd_Points_Detail} from './Rd_Points';
import Rd_Category from './Rd_Category';
import Rd_ProductList from './Rd_ProductList';
import {handleProductBaseinfo as Rd_PBaseinfo, handleProductImageDetail as Rd_PImageDetail} from './Rd_ProductDetail';

export default combineReducers({
    Rd_UserInfo,
    Rd_OrderList,
    Rd_AddressList,
    Rd_EditAddr,
    Rd_Coupon,
    Rd_Points_Count,
    Rd_Points_Detail,
    Rd_Category,
    Rd_ProductList,
    Rd_PBaseinfo,
    Rd_PImageDetail,
});
