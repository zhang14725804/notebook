Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ = {
    PAY_COMPLAINT_APPLIED_0: 0,
    PAY_COMPLAINT_APPEND_1: 1,
    PAY_COMPLAINT_MODIFY_2: 2,
    PAY_COMPLAINT_CANCEL_3: 3,
    PAY_COMPLAINT_AGREE_BY_SALER_4: 4,
    PAY_COMPLAINT_REJECT_BY_SALER_5: 5,
    PAY_COMPLAINT_SET_SERVICE_6: 6,
    PAY_COMPLAINT_MODIFY_BY_SERVICE_8: 8,
    PAY_COMPLAINT_AGREE_BY_SERVICE_7: 7,
    PAY_COMPLAINT_REJECT_BY_SERVICE_9: 9,
    PAY_COMPLAINT_REFUND_COMPL_10: 10,
    PAY_COMPLAINT_AGREE_BY_SALER_EXPIRE_11: 11,
    PAY_COMPLAINT_SALER_REQUIRE_RETURN_12: 12,
    PAY_COMPLAINT_APPEND_BY_SALER_13: 13,
    PAY_COMPLAINT_APPEND_BY_SERVICE_14: 14,
    PAY_COMPLAINT_REJECT_BY_SALER_EXPIRE_15: 15,
    PAY_COMPLAINT_RETURN_SUCC_16: 16,
    PAY_COMPLAINT_RETURN_FAIL_17: 17,
    PAY_COMPLAINT_RETURN_EXPIRE_SUCC_18: 18,
    PAY_COMPLAINT_CHEAT_SALER_19: 19,
    PAY_COMPLAINT_USER_SUBMIT_DSN_20: 20,
    PAY_COMPLAINT_USER_REAPPLY_21: 21,
    PAY_COMPLAINT_USER_APPLY_JUDGEMENT_22: 22,
    PAY_COMPLAINT_SALER_APPLY_JUDGEMENT_23: 23,
    PAY_COMPLAINT_SALER_AGREE_RETURN_24: 24,
    PAY_COMPLAINT_USER_EXPIRE_DEAL_25: 25,
    PAY_COMPLAINT_USER_EXPIRE_SEND_26: 26,
    PAY_COMPLAINT_APPLIED_BY_SERVICE_27: 27,
    PAY_COMPLAINT_USER_EXPIRE_DEAL_END_28: 28,
    PAY_COMPLAINT_RESTORE_BY_SERVICE_29: 29,
    PAY_COMPLAINT_APPEND_PUBLIC_BY_SERVICE_30: 30,
    PAY_COMPLAINT_SERVICE_APPLY_JUDGEMENT_31: 31,
    PAY_COMPLAINT_APPEND_PUBLIC_WITH_ADDR_BY_SERVICE_32: 32,
    OLD_COMPLAINT_INTT_100: 100,
    OLD_COMPLAINT_STATUS_101: 101,
    OLD_COMPLAINT_END_102: 102
}, A = {
    COMPLAINT_NULL_M1: -1,
    COMPLAINT_INIT_0: 0,
    COMPLAINT_SALES_DEALING_1: 1,
    COMPLAINT_SERVICE_INIT_2: 2,
    COMPLAINT_SERVICE_DEALING_3: 3,
    COMPLAINT_REFUNDING_4: 4,
    COMPLAINT_REFUNDED_SUCC_5: 5,
    COMPLAINT_CANCELED_6: 6,
    COMPLAINT_FAILED_7: 7,
    COMPLAINT_END_8: 8,
    COMPLAINT_WAIT_USER_DEAL_9: 9,
    COMPLAINT_WAIT_USER_SEND_10: 10,
    COMPLAINT_WAIT_SALES_SEND_COMFIRM_11: 11,
    COMPLAINT_FAIL_12: 12,
    COMPLAINT_FAIL_EXPIRE_13: 13,
    COMPLAINT_EXCHANGE_WAIT_MERCHANT_14: 14,
    COMPLAINT_EXCHANGE_WAIT_USER_15: 15,
    COMPLAINT_EXCHANGE_RESEND_FINISH_16: 16,
    COMPLAINT_EXCHANGE_RESEND_CLOSE_17: 17,
    COMPLAINT_EXCHANGE_WAIT_USER_CONFIRM_18: 18
};

exports.default = {
    operateType: _,
    flowType: A,
    getOperateTypeString: function(A, E) {
        0 === E && (E = 1);
        var P = "";
        switch (void 0 !== E && (P = [ "申诉", "退款", "退货退款", "换货" ][E]), A) {
          case _.PAY_COMPLAINT_APPLIED_0:
            return "用户申请" + P;

          case _.PAY_COMPLAINT_APPEND_1:
            return "用户添加了描述和凭证";

          case _.PAY_COMPLAINT_MODIFY_2:
            return "用户修改了信息";

          case _.PAY_COMPLAINT_CANCEL_3:
            return "用户撤销了申请";

          case _.PAY_COMPLAINT_AGREE_BY_SALER_4:
            return "商家通过了退款申请";

          case _.PAY_COMPLAINT_REJECT_BY_SALER_5:
            return "商家驳回了买家申请";

          case _.PAY_COMPLAINT_SET_SERVICE_6:
            return "平台分配受理人";

          case _.PAY_COMPLAINT_MODIFY_BY_SERVICE_8:
            return "平台修改退款金额";

          case _.PAY_COMPLAINT_AGREE_BY_SERVICE_7:
            return "平台通过了买家申请";

          case _.PAY_COMPLAINT_REJECT_BY_SERVICE_9:
            return "平台驳回了买家申请";

          case _.PAY_COMPLAINT_REFUND_COMPL_10:
            return "退款成功";

          case _.PAY_COMPLAINT_AGREE_BY_SALER_EXPIRE_11:
            return "商家逾期未处理，默认同意";

          case _.PAY_COMPLAINT_SALER_REQUIRE_RETURN_12:
            return "商家要求买家退货";

          case _.PAY_COMPLAINT_APPEND_BY_SALER_13:
            return "商家添加了描述和凭证";

          case _.PAY_COMPLAINT_APPEND_BY_SERVICE_14:
            return "平台添加了备注";

          case _.PAY_COMPLAINT_REJECT_BY_SALER_EXPIRE_15:
            return "商家逾期未处理，转由平台处理";

          case _.PAY_COMPLAINT_RETURN_SUCC_16:
            return "退货成功，商家同意退款";

          case _.PAY_COMPLAINT_RETURN_FAIL_17:
            return "退货失败，商家拒绝退款";

          case _.PAY_COMPLAINT_RETURN_EXPIRE_SUCC_18:
            return "退货成功，商家逾期未处理";

          case _.PAY_COMPLAINT_CHEAT_SALER_19:
            return "商家发生未知错误";

          case _.PAY_COMPLAINT_USER_SUBMIT_DSN_20:
            return "用户已发货";

          case _.PAY_COMPLAINT_USER_REAPPLY_21:
            return "用户修改了" + P + "申请";

          case _.PAY_COMPLAINT_USER_APPLY_JUDGEMENT_22:
            return "用户申请平台介入";

          case _.PAY_COMPLAINT_SALER_APPLY_JUDGEMENT_23:
            return "商家申请平台介入";

          case _.PAY_COMPLAINT_SALER_AGREE_RETURN_24:
            return "商家同意退货退款";

          case _.PAY_COMPLAINT_USER_EXPIRE_DEAL_25:
            return "买家逾期未处理";

          case _.PAY_COMPLAINT_USER_EXPIRE_SEND_26:
            return "买家逾期未发货";

          case _.PAY_COMPLAINT_APPLIED_BY_SERVICE_27:
            return "平台发起" + P + "申请";

          case _.PAY_COMPLAINT_USER_EXPIRE_DEAL_END_28:
            return "超过退款有效期，退款关闭";

          case _.PAY_COMPLAINT_RESTORE_BY_SERVICE_29:
            return "平台恢复了买家申请";

          case _.PAY_COMPLAINT_APPEND_PUBLIC_BY_SERVICE_30:
            return "平台添加了留言";

          case _.PAY_COMPLAINT_SERVICE_APPLY_JUDGEMENT_31:
            return "平台协助买家介入";

          case _.PAY_COMPLAINT_APPEND_PUBLIC_WITH_ADDR_BY_SERVICE_32:
            return "平台添加了退货信息";

          case _.OLD_COMPLAINT_INTT_100:
            return "用户申请售后投诉";

          case _.OLD_COMPLAINT_STATUS_101:
            return "平台正在处理此售后投诉";

          case _.OLD_COMPLAINT_END_102:
            return "此售后投诉单已完成";

          default:
            return "未知流程" + A;
        }
    },
    getFlowStatusString: function(A, E) {
        var P = void 0, I = "";
        switch (A) {
          case _.PAY_COMPLAINT_APPLIED_0:
            P = "申请收到";
            break;

          case _.PAY_COMPLAINT_CANCEL_3:
            P = "申请已撤销";
            break;

          case _.PAY_COMPLAINT_AGREE_BY_SALER_4:
            P = "商家已同意退款", I = "商家";
            break;

          case _.PAY_COMPLAINT_AGREE_BY_SALER_EXPIRE_11:
            P = "商家逾期未处理", I = "商家";
            break;

          case _.PAY_COMPLAINT_SALER_REQUIRE_RETURN_12:
            P = "商家要求买家退货";
            break;

          case _.PAY_COMPLAINT_REJECT_BY_SALER_5:
            P = "商家驳回";
            break;

          case _.PAY_COMPLAINT_REJECT_BY_SALER_EXPIRE_15:
            P = "商家逾期未处理";
            break;

          case _.PAY_COMPLAINT_AGREE_BY_SERVICE_7:
            P = "平台已同意退款", I = "平台";
            break;

          case _.PAY_COMPLAINT_REJECT_BY_SERVICE_9:
            P = "平台驳回申请";
            break;

          case _.PAY_COMPLAINT_REFUND_COMPL_10:
            P = "退款成功";
            break;

          case _.PAY_COMPLAINT_RETURN_SUCC_16:
          case _.PAY_COMPLAINT_RETURN_EXPIRE_SUCC_18:
            P = "退货成功", I = "商家";
            break;

          case _.PAY_COMPLAINT_RETURN_FAIL_17:
            P = "商家驳回退款";
            break;

          case _.PAY_COMPLAINT_CHEAT_SALER_19:
            P = "";
            break;

          case _.PAY_COMPLAINT_USER_SUBMIT_DSN_20:
            P = "买家已发货";
            break;

          case _.PAY_COMPLAINT_USER_REAPPLY_21:
            P = "申请已修改";
            break;

          case _.PAY_COMPLAINT_USER_APPLY_JUDGEMENT_22:
            P = "用户申请平台介入";
            break;

          case _.PAY_COMPLAINT_SALER_APPLY_JUDGEMENT_23:
            P = "商家申请平台介入";
            break;

          case _.PAY_COMPLAINT_SALER_AGREE_RETURN_24:
            P = "商家同意退货退款";
            break;

          case _.PAY_COMPLAINT_USER_EXPIRE_DEAL_25:
            P = "买家逾期未处理";
            break;

          case _.PAY_COMPLAINT_USER_EXPIRE_SEND_26:
            P = "买家逾期未发货";
            break;

          case _.PAY_COMPLAINT_APPLIED_BY_SERVICE_27:
            P = "平台发起申请";
            break;

          case _.PAY_COMPLAINT_USER_EXPIRE_DEAL_END_28:
            P = "";
            break;

          case _.PAY_COMPLAINT_RESTORE_BY_SERVICE_29:
            P = "平台恢复申请";
            break;

          case _.PAY_COMPLAINT_SERVICE_APPLY_JUDGEMENT_31:
            P = "平台协助买家介入";
            break;

          case _.PAY_COMPLAINT_APPEND_PUBLIC_WITH_ADDR_BY_SERVICE_32:
            P = "平台添加退货信息";
            break;

          case _.OLD_COMPLAINT_INTT_100:
          case _.OLD_COMPLAINT_STATUS_101:
            return "申诉收到，平台处理中";

          case _.OLD_COMPLAINT_END_102:
            return "售后流程结束";

          default:
            return "未知状态(" + A + ")请升级拼多多版本";
        }
        return 0 == E || 1 == E || 11 == E ? (P && (P += "，"), P + "商家处理中") : 2 == E || 3 == E ? (P && (P += "，"), 
        P + "平台处理中") : 4 == E ? (P && (P += "，"), P + I + "退款中") : 10 == E ? (P && (P += "，"), 
        P + "等待用户发货") : 12 == E ? (P && (P += "，"), P + I + "退款失败") : 13 == E ? (P && (P += "，"), 
        P + I + "退款关闭") : P;
    }
};