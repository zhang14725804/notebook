(function(){
    // tag,data,children,text
    function vnode(tag,data,children,text){
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
    }

    function createEle(vnode){
        var tag = vnode.tag;
        var data = vnode.data;
        var children = vnode.children;

        if(tag!==undefined){
            vnode.elm = document.createElement(tag);
            if(data.attrs !==undefined){
                var attrs = data.attrs;
                for(var key in attrs){
                    vnode.elm.setAttribute(key,attrs[key])
                }
            }
            if(children){
                createChildren(vnode,children)
            }
        }else{
            vnode.elm = document.createTextNode(vnode.text)
        }
        return vnode.elm
    }
    // 创建子节点
    function createChildren(vnode,children){
        for(var i=0;i<children.length;i++){
            vnode.elm.appendChild(createEle(children[i]))
        }
    }
    // 进行diff的过程，经过patch比对，最后生成新的真实dom节点更新改变部分的视图
    function patch(oldVnode,vnode){
        createEle(vnode);
        var isRealElement = oldVnode.nodeType !== undefined;
        if(isRealElement){
            var parent = oldVnode.parentNode;
            if(parent){
                parent.insertBefore(vno.elm,oldVnode)
                parent.removeChild(oldVnode)
            }
        }
        return vnode.elm
    }

    function render(){
        // tag,data,children,text
        return new vnode(
            'div',
            {
                attrs:{
                    'class':"wrapper"
                }
            },
            new vnode(
                'p',
                {
                    attrs:{
                        'class':'inner'
                    }
                },
                new vnode(undefined,undefined,undefined,'hello world')
            )
        )
    }
    function mount(el){
        var vnode = render();
        patch(el,vnode)
    }
    mount(document.querySelector('#app'))
})()