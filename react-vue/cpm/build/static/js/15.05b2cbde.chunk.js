(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{847:function(e,t,n){"use strict";var o;Object.defineProperty(t,"__esModule",{value:!0});var r=c(n(1)),a=n(109),i=n(83),s=c(n(84)),l=n(110),p=n(265),u=n(264);function c(e){return e&&e.__esModule?e:{default:e}}function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n(644);var v=(0,i.connect)(function(e){return{loginUser:e.userReducer,selectedStaffList:e.staffReducer.selectedStaffList,activePerson:e.staffReducer.activePerson,deptList:e.deptReducer.deptList}},{toggleModalState:l.toggleModalState,getDeptList:p.getDeptList,getStaffList:u.getStaffList,selectedStaff:u.selectedStaff})(o=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=h(t).call(this,e))||"object"!==f(r)&&"function"!==typeof r?b(o):r).state={newDeptId:"",enterpriseUserIds:[]},n.handleOk=n.handleOk.bind(b(b(n))),n.handleCancel=n.handleCancel.bind(b(b(n))),n.appointFn=n.appointFn.bind(b(b(n))),n.onChange=n.onChange.bind(b(b(n))),n}var n,o,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,r.default.Component),n=t,(o=[{key:"componentWillMount",value:function(){this.props.deptList||this.props.getDeptList({type:this.props.loginUser.userRole})}},{key:"componentDidUpdate",value:function(){}},{key:"handleOk",value:function(){var e=this;if(""!==this.state.newDeptId&&this.props.selectedStaffList.length>0){var t=this.props.selectedStaffList.map(function(t){return{newDeptId:e.state.newDeptId,enterpriseUserIds:t.key}});this.appointFn(t)}else""!==this.state.newDeptId&&this.props.activePerson&&this.appointFn([{newDeptId:this.state.newDeptId,enterpriseUserIds:this.props.activePerson.userId}])}},{key:"appointFn",value:function(e){var t=this;s.default.put("enterprise/user/move",e).then(function(e){e&&200===e.status&&(a.Modal.success({title:"\u7cfb\u7edf\u63d0\u793a",centered:!0,content:"\u64cd\u4f5c\u6210\u529f!"}),t.props.toggleModalState("DEFAULT",!1),t.props.selectedStaff([]),t.props.getStaffList())})}},{key:"handleCancel",value:function(){this.props.toggleModalState("DEFAULT",!1)}},{key:"onChange",value:function(e){this.setState({newDeptId:e.target.value})}},{key:"render",value:function(){return r.default.createElement(a.Modal,{width:300,visible:!0,title:"\u6307\u5b9a\u90e8\u95e8",centered:!0,onCancel:this.handleCancel,footer:[r.default.createElement(a.Button,{key:"1",onClick:this.handleCancel},"\u53d6\u6d88"),r.default.createElement(a.Button,{key:"2",type:"primary",onClick:this.handleOk},"\u786e\u8ba4")]},r.default.createElement("div",{className:"radio-wrapper"},r.default.createElement(a.Radio.Group,{style:{width:"100%"},onChange:this.onChange},this.props.deptList?this.props.deptList.map(function(e){return r.default.createElement("div",{className:"radio-class",key:e.departmentId},r.default.createElement(a.Radio,{value:e.departmentId},e.name))}):null)))}}])&&d(n.prototype,o),i&&d(n,i),t}())||o;t.default=v}}]);
//# sourceMappingURL=15.05b2cbde.chunk.js.map