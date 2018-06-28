import React from 'react';
import $ from 'jquery';

export default class Upload extends React.Component {

    onChangeInput() {
        let _this = this;
        // 上传设置
        let formData = new FormData($("#jvForm")[0]);
        let file = this.refs.input.files[0];
        var options = {
            // 规定把请求发送到那个URL
            url: "http://127.0.0.1:3002/upload",
            // 请求方式
            type: "post",
            // 服务器响应的数据类型
            dataType: "json",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                // 'Access-Control-Allow-Origin': '*'
            },
            // 请求成功时执行的回调函数
            success: function (data, status, xhr) {
                // 图片显示地址
                $("#allUrl").attr("src", data.path);
            }
        };

        $.ajax(options);
    }

    render() {
        const that = this;

        return <form id="jvForm" encType="multipart/form-data">
            <input ref="input" type="file" name="file" accept="image/*" onChange={that.onChangeInput.bind(that)}
                   className="input-style"/>
        </form>;
    }
}