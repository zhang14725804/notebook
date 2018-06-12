Object.defineProperty(exports, "__esModule", {
    value: true
});

var DEFAULT_DATA = {
    ENV: false,
    /**
   * 播放页默认配置
   */
    PAGE_CONFIG: {
        banner: {
            isshow: "1",
            content: "打开优酷App，畅享3倍清晰度",
            secret: "",
            tag: "phone_detail_vipbanner,phone_detail_activity,h5_detail_vipbanner,h5_detail_activity",
            taskid: "wxxcx",
            btnname: "立即观看"
        },
        videodetails: {
            tag: "phone_detail_info,phone_detail_subscribe,h5_detail_info,h5_detail_subscribe"
        },
        programlist: {
            tag: "phone_detail_anthology,phone_detail_anthology_picture,phone_detail_playlist,h5_detail_anthology,h5_detail_anthology_picture,h5_detail_playlist"
        },
        recommend: {
            tag: "phone_detail_recommend,phone_detail_recommend_vertical,h5_detail_recommend,h5_detail_recommend_vertical"
        }
    },
    PASSPORT_ENV_CONFIG: {
        pid: "8fb8456183734a86bfc1c15a1c761cdf",
        appId: "20180507APP002304",
        appName: "优酷视频微信小程序"
    },
    PASSPORT_CONFIG: {
        pid: "8fb8456183734a86bfc1c15a1c761cdf",
        appId: "20180508APP002101",
        appName: "优酷视频微信小程序"
    },
    /**
   * 已经支持的组件类型
   */
    SUPPORT_MODULE_CONFIG: [ "PHONE_LUNBO", "PHONE_BASE_A", "PHONE_BASE_B", "PHONE_BASE_C", "PHONE_BASE_E", "PHONE_AD_A", "PHONE_AD_B" ],
    SPM_CONFIG: {
        index: {
            page: "page_homechannel",
            spm: "a2h89.11361758"
        },
        play: {
            page: "page_mplayer",
            spm: "a2h89.11361767"
        },
        brief: {
            page: "page_brief",
            spm: "a2h89.11470800"
        },
        member: {
            page: "page_member",
            spm: "a2h89.11513887"
        },
        history: {
            page: "page_history",
            spm: "a2h89.11514011"
        }
    }
};

exports.default = DEFAULT_DATA;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQtZGF0YS5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0RBVEEiLCJFTlYiLCJQQUdFX0NPTkZJRyIsIlBBU1NQT1JUX0VOVl9DT05GSUciLCJQQVNTUE9SVF9DT05GSUciLCJTVVBQT1JUX01PRFVMRV9DT05GSUciLCJTUE1fQ09ORklHIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGVBQWU7QUFDbkJDLE9BQUssS0FEYztBQUVuQjs7O0FBR0FDLGVBQWE7QUFDWCxjQUFVO0FBQ1IsZ0JBQVUsR0FERjtBQUVSLGlCQUFXLGlCQUZIO0FBR1IsZ0JBQVUsRUFIRjtBQUlSLGFBQU8scUZBSkM7QUFLUixnQkFBVSxPQUxGO0FBTVIsaUJBQVc7QUFOSCxLQURDO0FBU1gsb0JBQWdCO0FBQ2QsYUFBTztBQURPLEtBVEw7QUFZWCxtQkFBZTtBQUNiLGFBQU87QUFETSxLQVpKO0FBZVgsaUJBQWE7QUFDWCxhQUFPO0FBREk7QUFmRixHQUxNO0FBd0JuQkMsdUJBQXFCO0FBQ25CLFdBQU8sa0NBRFk7QUFFbkIsYUFBUyxtQkFGVTtBQUduQixlQUFXO0FBSFEsR0F4QkY7QUE2Qm5CQyxtQkFBaUI7QUFDZixXQUFPLGtDQURRO0FBRWYsYUFBUyxtQkFGTTtBQUdmLGVBQVc7QUFISSxHQTdCRTtBQWtDbkI7OztBQUdBQyx5QkFBdUIsQ0FDckIsYUFEcUIsRUFFckIsY0FGcUIsRUFHckIsY0FIcUIsRUFJckIsY0FKcUIsRUFLckIsY0FMcUIsRUFNckIsWUFOcUIsRUFPckIsWUFQcUIsQ0FyQ0o7QUE4Q25CQyxjQUFZO0FBQ1YsYUFBUztBQUNQLGNBQVEsa0JBREQ7QUFFUCxhQUFPO0FBRkEsS0FEQztBQUtWLFlBQVE7QUFDTixjQUFRLGNBREY7QUFFTixhQUFPO0FBRkQsS0FMRTtBQVNWLGFBQVM7QUFDUCxjQUFRLFlBREQ7QUFFUCxhQUFPO0FBRkEsS0FUQztBQWFWLGNBQVU7QUFDUixjQUFRLGFBREE7QUFFUixhQUFPO0FBRkMsS0FiQTtBQWlCVixlQUFXO0FBQ1QsY0FBUSxjQURDO0FBRVQsYUFBTztBQUZFO0FBakJEO0FBOUNPLENBQXJCO2tCQXFFZU4sWSIsImZpbGUiOiJkZWZhdWx0LWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBERUZBVUxUX0RBVEEgPSB7XG4gIEVOVjogZmFsc2UsXG4gIC8qKlxuICAgKiDmkq3mlL7pobXpu5jorqTphY3nva5cbiAgICovXG4gIFBBR0VfQ09ORklHOiB7XG4gICAgJ2Jhbm5lcic6IHtcbiAgICAgICdpc3Nob3cnOiAnMScsXG4gICAgICAnY29udGVudCc6ICfmiZPlvIDkvJjphbdBcHDvvIznlYXkuqsz5YCN5riF5pmw5bqmJyxcbiAgICAgICdzZWNyZXQnOiAnJyxcbiAgICAgICd0YWcnOiAncGhvbmVfZGV0YWlsX3ZpcGJhbm5lcixwaG9uZV9kZXRhaWxfYWN0aXZpdHksaDVfZGV0YWlsX3ZpcGJhbm5lcixoNV9kZXRhaWxfYWN0aXZpdHknLFxuICAgICAgJ3Rhc2tpZCc6ICd3eHhjeCcsXG4gICAgICAnYnRubmFtZSc6ICfnq4vljbPop4LnnIsnXG4gICAgfSxcbiAgICAndmlkZW9kZXRhaWxzJzoge1xuICAgICAgJ3RhZyc6ICdwaG9uZV9kZXRhaWxfaW5mbyxwaG9uZV9kZXRhaWxfc3Vic2NyaWJlLGg1X2RldGFpbF9pbmZvLGg1X2RldGFpbF9zdWJzY3JpYmUnXG4gICAgfSxcbiAgICAncHJvZ3JhbWxpc3QnOiB7XG4gICAgICAndGFnJzogJ3Bob25lX2RldGFpbF9hbnRob2xvZ3kscGhvbmVfZGV0YWlsX2FudGhvbG9neV9waWN0dXJlLHBob25lX2RldGFpbF9wbGF5bGlzdCxoNV9kZXRhaWxfYW50aG9sb2d5LGg1X2RldGFpbF9hbnRob2xvZ3lfcGljdHVyZSxoNV9kZXRhaWxfcGxheWxpc3QnXG4gICAgfSxcbiAgICAncmVjb21tZW5kJzoge1xuICAgICAgJ3RhZyc6ICdwaG9uZV9kZXRhaWxfcmVjb21tZW5kLHBob25lX2RldGFpbF9yZWNvbW1lbmRfdmVydGljYWwsaDVfZGV0YWlsX3JlY29tbWVuZCxoNV9kZXRhaWxfcmVjb21tZW5kX3ZlcnRpY2FsJ1xuICAgIH1cbiAgfSxcbiAgUEFTU1BPUlRfRU5WX0NPTkZJRzoge1xuICAgICdwaWQnOiAnOGZiODQ1NjE4MzczNGE4NmJmYzFjMTVhMWM3NjFjZGYnLFxuICAgICdhcHBJZCc6ICcyMDE4MDUwN0FQUDAwMjMwNCcsXG4gICAgJ2FwcE5hbWUnOiAn5LyY6YW36KeG6aKR5b6u5L+h5bCP56iL5bqPJ1xuICB9LFxuICBQQVNTUE9SVF9DT05GSUc6IHtcbiAgICAncGlkJzogJzhmYjg0NTYxODM3MzRhODZiZmMxYzE1YTFjNzYxY2RmJyxcbiAgICAnYXBwSWQnOiAnMjAxODA1MDhBUFAwMDIxMDEnLFxuICAgICdhcHBOYW1lJzogJ+S8mOmFt+inhumikeW+ruS/oeWwj+eoi+W6jydcbiAgfSxcbiAgLyoqXG4gICAqIOW3sue7j+aUr+aMgeeahOe7hOS7tuexu+Wei1xuICAgKi9cbiAgU1VQUE9SVF9NT0RVTEVfQ09ORklHOiBbXG4gICAgJ1BIT05FX0xVTkJPJyxcbiAgICAnUEhPTkVfQkFTRV9BJyxcbiAgICAnUEhPTkVfQkFTRV9CJyxcbiAgICAnUEhPTkVfQkFTRV9DJyxcbiAgICAnUEhPTkVfQkFTRV9FJyxcbiAgICAnUEhPTkVfQURfQScsXG4gICAgJ1BIT05FX0FEX0InXG4gIF0sXG4gIFNQTV9DT05GSUc6IHtcbiAgICAnaW5kZXgnOiB7XG4gICAgICAncGFnZSc6ICdwYWdlX2hvbWVjaGFubmVsJyxcbiAgICAgICdzcG0nOiAnYTJoODkuMTEzNjE3NTgnXG4gICAgfSxcbiAgICAncGxheSc6IHtcbiAgICAgICdwYWdlJzogJ3BhZ2VfbXBsYXllcicsXG4gICAgICAnc3BtJzogJ2EyaDg5LjExMzYxNzY3J1xuICAgIH0sXG4gICAgJ2JyaWVmJzoge1xuICAgICAgJ3BhZ2UnOiAncGFnZV9icmllZicsXG4gICAgICAnc3BtJzogJ2EyaDg5LjExNDcwODAwJ1xuICAgIH0sXG4gICAgJ21lbWJlcic6IHtcbiAgICAgICdwYWdlJzogJ3BhZ2VfbWVtYmVyJyxcbiAgICAgICdzcG0nOiAnYTJoODkuMTE1MTM4ODcnXG4gICAgfSxcbiAgICAnaGlzdG9yeSc6IHtcbiAgICAgICdwYWdlJzogJ3BhZ2VfaGlzdG9yeScsXG4gICAgICAnc3BtJzogJ2EyaDg5LjExNTE0MDExJ1xuICAgIH1cbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IERFRkFVTFRfREFUQTtcbiJdfQ==