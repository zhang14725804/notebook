(window.webpackJsonp=window.webpackJsonp||[]).push([[7,18],{636:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0});var l=c(n(1)),r=n(109),o=n(83),s=n(264),i=c(n(637));function c(e){return e&&e.__esModule?e:{default:e}}function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n(638);var h=l.default.createElement("div",null,l.default.createElement("img",{alt:"",src:i.default}),l.default.createElement("p",null,"\u6682\u65e0\u6570\u636e")),y=(0,o.connect)(function(e){return{employeese:e.staffReducer.staffData.object,selectedStaffList:e.staffReducer.selectedStaffList}},{togglePersonal:s.togglePersonal,selectedStaff:s.selectedStaff})(a=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,d(t).apply(this,arguments))}var n,a,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,l.default.Component),n=t,(a=[{key:"componentWillReceiveProps",value:function(e){}},{key:"render",value:function(){var e=this,t={height:"".concat(70*this.props.tscale,"vh"),display:"flex",alignItems:"center",justifyContent:"center"},n=l.default.createElement("div",{style:t},h),a={selectedRowKeys:this.props.selectedStaffList.length>0?this.props.selectedStaffList.map(function(e){return e.key}):[],onChange:function(e,t){},onSelect:function(t,n,a){e.props.selectedStaff(a)},onSelectAll:function(t,n,a){e.props.selectedStaff(n)}};return l.default.createElement(r.Table,{rowSelection:this.props.calSelect?a:null,columns:this.props.tableHead,onRow:function(t){return{onClick:function(){var n=e.props.employeese.filter(function(e){return e.userId===t.key});e.props.togglePersonal(n[0])},onMouseEnter:function(){}}},size:this.props.tableSize?this.props.tableSize:"default",title:this.props.customHeader?this.props.customHeader:null,locale:{emptyText:n},pagination:!1,rowClassName:"table-row-name",className:"column-name",dataSource:this.props.sourceData,scroll:{y:"".concat(70*this.props.tscale,"vh")}})}}])&&p(n.prototype,a),o&&p(n,o),t}())||a;t.default=y},637:function(e,t,n){e.exports=n.p+"static/media/empty-icon.1e6b2481.svg"},638:function(e,t,n){},662:function(e,t,n){e.exports=n.p+"static/media/dept-icon-person.84461699.svg"},663:function(e,t,n){e.exports=n.p+"static/media/edit-icon.509ac59a.svg"},740:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0});var l=h(n(1));n(741);var r=h(n(662)),o=h(n(663)),s=h(n(636)),i=n(109),c=n(83),u=n(85),p=n(110),f=n(264),d=n(265),m=h(n(267));function h(e){return e&&e.__esModule?e:{default:e}}function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var S=(0,m.default)({loader:function(){return n.e(0).then(n.t.bind(null,645,7))},loading:function(){return null}}),D=(0,m.default)({loader:function(){return n.e(11).then(n.t.bind(null,843,7))},loading:function(){return null}}),N=(0,m.default)({loader:function(){return n.e(1).then(n.t.bind(null,682,7))},loading:function(){return null}}),M=(0,m.default)({loader:function(){return n.e(2).then(n.t.bind(null,723,7))},loading:function(){return null}}),w=(0,m.default)({loader:function(){return n.e(12).then(n.t.bind(null,844,7))},loading:function(){return null}}),k=(0,m.default)({loader:function(){return n.e(3).then(n.t.bind(null,724,7))},loading:function(){return null}}),_=l.default.createElement("p",null,"\u8bbe\u4e3a\u90e8\u95e8\u7ba1\u7406\u5458"),I=l.default.createElement("p",null,"\u79fb\u9664\u90e8\u95e8\u7ba1\u7406\u5458"),P=l.default.createElement("p",null,"\u79fb\u4ea4\u90e8\u95e8\u4e3b\u7ba1"),C=l.default.createElement("span",{className:"ml6 role-tip"},"\u4f01\u4e1a\u7ba1\u7406\u5458"),O=l.default.createElement("span",{className:"ml6 role-tip"},"\u90e8\u95e8\u4e3b\u7ba1"),R=l.default.createElement("div",{className:"icon-wrapper"},l.default.createElement("img",{alt:"",src:r.default})),j=l.default.createElement("img",{className:"ml4",src:o.default,alt:""}),T=l.default.createElement(i.Icon,{type:"search"}),x=l.default.createElement(D,null),L=l.default.createElement(S,null),A=l.default.createElement(k,null),H=l.default.createElement(N,null),F=l.default.createElement(M,null),U=l.default.createElement(w,null),V=(0,c.connect)(function(e){return{loginUser:e.userReducer,selectedStaffList:e.staffReducer.selectedStaffList,employeeModalState:e.employeeModalReducer,currentDept:e.deptReducer.currentDept,employeese:e.staffReducer.staffData,deptList:e.deptReducer.deptList}},{toggleModalState:p.toggleModalState,getStaffList:f.getStaffList,setCurrentDept:d.setCurrentDept})(a=function(e){function t(e){var n,a,l;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,(n=!(l=b(t).call(this,e))||"object"!==y(l)&&"function"!==typeof l?v(a):l).state={tscale:1,page:1,limit:30,searchName:"",deptId:""},n.getEmployees=n.getEmployees.bind(v(v(n))),n.deleteDept=n.deleteDept.bind(v(v(n))),n.setManager=n.setManager.bind(v(v(n))),n.staffDetail=n.staffDetail.bind(v(v(n))),n.delStaff=n.delStaff.bind(v(v(n))),n.updatedn=n.updatedn.bind(v(v(n))),n.searchHandler=n.searchHandler.bind(v(v(n))),n.emitEmptySearchName=n.emitEmptySearchName.bind(v(v(n))),n.addStaff=n.addStaff.bind(v(v(n))),n}var n,a,r;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,l.default.Component),n=t,(a=[{key:"componentWillMount",value:function(){var e=window.screen.availHeight;console.log(e),e>900?this.setState({scale:1}):e<900&&e>800?this.setState({tscale:.88}):e<800&&e>700?this.setState({tscale:.7}):this.setState({tscale:.65}),this.props.currentDept&&this.getEmployees({deptId:this.props.currentDept.departmentId})}},{key:"componentWillUpdate",value:function(e,t){}},{key:"componentWillReceiveProps",value:function(e){var t=this.props;t.currentDept&&e.currentDept&&t.currentDept.departmentId!==e.currentDept.departmentId&&this.getEmployees({deptId:e.currentDept.departmentId}),""!==t.loginUser.userRole&&!t.currentDept&&e.currentDept&&e.deptList&&e.deptList.length>0&&(t.setCurrentDept(e.deptList[0]),this.getEmployees({deptId:e.deptList[0].departmentId}))}},{key:"updatedn",value:function(){this.props.toggleModalState("UPDATE_DEPT_NAME",!0)}},{key:"getEmployees",value:function(e){var t={page:this.state.page,limit:this.state.limit,searchName:this.state.searchName.trim(),deptId:this.props.currentDept?this.props.currentDept.departmentId:0},n=e?Object.assign(t,e):t;this.props.getStaffList(n)}},{key:"searchHandler",value:function(){""!==this.state.searchName.trim()&&this.getEmployees()}},{key:"emitEmptySearchName",value:function(){this.setState({searchName:""}),this.getEmployees({searchName:""})}},{key:"delStaff",value:function(e){"del-staff-btn"===e.target.className&&this.props.toggleModalState("DEL_STAFF",!0)}},{key:"staffDetail",value:function(e){e.target.className.indexOf("tr-content")>-1&&this.props.toggleModalState("STAFF_DETAIL",!0)}},{key:"addStaff",value:function(){this.props.toggleModalState("ADD_STAFF",!0)}},{key:"deleteDept",value:function(){this.props.currentDept.subEmployees>0?i.Modal.confirm({title:"\u65e0\u6cd5\u5220\u9664",centered:!0,content:"\u5f53\u90e8\u95e8\u6ca1\u6709\u4efb\u4f55\u5458\u5de5\u65f6\u624d\u53ef\u4ee5\u5220\u9664\u90e8\u95e8",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){},onCancel:function(){}}):this.props.toggleModalState("DELETE_DEPT",!0)}},{key:"setManager",value:function(){this.props.toggleModalState("SET_DEPT_MANAGER",!0)}},{key:"render",value:function(){var e=this,t=l.default.createElement("div",{className:"cp"},_,I,P,l.default.createElement("p",{className:"del-staff-btn",onClick:this.delStaff},"\u79fb\u9664\u5458\u5de5")),n=[{title:"\u5458\u5de5",dataIndex:"name",render:function(e){return l.default.createElement("div",{className:"cp"},e)}},{title:"\u6240\u5728\u90e8\u95e8",dataIndex:"dept"},{title:"\u624b\u673a\u53f7",dataIndex:"phone"},{title:"\u90ae\u7bb1",dataIndex:"email"}],a=this.props.employeese.object&&0!==this.props.employeese.object.length?this.props.employeese.object.map(function(n){var a,r,o=n.departments.length>0?n.departments.map(function(e,t){return t>0?"\u3001".concat(e.name):e.name}):"\u5f85\u5206\u914d";return n.userRoleInfos.length>0&&(a=n.userRoleInfos.some(function(t){return t.departmentId===e.props.currentDept.departmentId}),r=n.userRoleInfos.some(function(e){return"ENTERPRISE_MANAGER"===e.roleName})),{key:n.userId,name:l.default.createElement("div",{className:"tr-content",onClick:e.staffDetail},l.default.createElement("div",null,l.default.createElement(i.Avatar,{src:(0,u.getAvatar)(n.cloudUserId)}),l.default.createElement("span",{className:"ml8"},n.name),r?C:null,a?O:null),"enterprise"===e.props.loginUser.userRole?null:l.default.createElement(i.Popover,{placement:"leftTop",content:t},l.default.createElement(i.Icon,{style:{display:"flex",alignItems:"center",fontSize:"20px"},type:"dash"}))),dept:l.default.createElement("div",{className:"ellipsis cp tr-content",onClick:e.staffDetail,title:o},o),phone:n.mobile||"\u672a\u7ed1\u5b9a",email:n.email||"\u672a\u7ed1\u5b9a"}}):[];return l.default.createElement("div",{className:"dept-data-wrapper"},l.default.createElement("div",{className:"toolbar"},l.default.createElement("div",{className:"dept-name-count"},R,l.default.createElement("div",{className:"name-count"},l.default.createElement("h4",{onClick:this.updatedn,className:"name cp"},this.props.currentDept?this.props.currentDept.name:"\u672a\u5b9a\u4e49",j),l.default.createElement("div",null,"\u6210\u5458\uff08",this.props.currentDept?this.props.currentDept.subEmployees:0,"\u4eba\uff09"))),l.default.createElement("div",{className:"operations"},l.default.createElement("div",{className:"oper-wrapper"},l.default.createElement(i.Button,{onClick:this.addStaff},"\u6dfb\u52a0\u5458\u5de5"),l.default.createElement(i.Button,{onClick:this.deleteDept},"\u5220\u9664\u90e8\u95e8"),l.default.createElement(i.Button,{onClick:this.setManager},"\u6307\u5b9a\u90e8\u95e8\u4e3b\u7ba1")),l.default.createElement("div",{className:"search-wrapper"},l.default.createElement(i.Input,{prefix:T,placeholder:"\u8bf7\u8f93\u5165\u5173\u952e\u5b57\u67e5\u8be2",suffix:this.state.searchName?l.default.createElement(i.Icon,{type:"close-circle",onClick:this.emitEmptySearchName}):null,onChange:function(t){return e.setState({searchName:t.target.value})},value:this.state.searchName,onPressEnter:this.searchHandler}),l.default.createElement(i.Button,{onClick:this.searchHandler},"\u67e5\u8be2")))),l.default.createElement("div",{className:"datagrid-wrapper dept-emp"},l.default.createElement(s.default,{calSelect:!1,tscale:this.state.tscale,tableHead:n,sourceData:a})),this.props.employeese.total>0?l.default.createElement("div",{className:"pagenation-wrapper"},l.default.createElement(i.Pagination,{defaultCurrent:this.props.employeese.currentPage,total:this.props.employeese.total,showTotal:function(){return(0,u.paginationTotal)(e.props.employeese.total,e.props.employeese.currentPage)},onChange:this.pageChange})):null,this.props.employeeModalState.deleteDeptModalVisible?x:null,this.props.employeeModalState.staffDetailModalVisible?L:null,this.props.employeeModalState.addStaffModalVisible?A:null,this.props.employeeModalState.delStaffModalVisible?H:null,this.props.employeeModalState.setDeptManagerModalVisible?F:null,this.props.employeeModalState.updateDeptNameModalVisible?U:null)}}])&&g(n.prototype,a),r&&g(n,r),t}())||a;t.default=V},741:function(e,t,n){}}]);
//# sourceMappingURL=7.85425afe.chunk.js.map