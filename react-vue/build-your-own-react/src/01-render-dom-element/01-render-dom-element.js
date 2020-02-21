(function(){
    const stories = [
        { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
        { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
        { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
        { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
        { name: "Components and state", url: "http://bit.ly/2rE16nh" }
    ]
    
    const appElement = {
        type:"div",
        props:{
            children:[{
                type:"ul",
                props:{
                    children:stories.map(storyElement)
                }
            }]
        }
    }
    
    function storyElement({name,url}){
        // 随机数
        const likes = Math.ceil(Math.random()*100)
        const buttonElement = {
            type:"button",
            props:{
                children:[
                    { type: "TEXT ELEMENT", props: { nodeValue: likes } },
                    { type: "TEXT ELEMENT", props: { nodeValue: "❤️" } }
                ]
            }
        }
        const linkElement = {
            type:"a",
            props:{
                href:url,
                children:[{type:"TEXT ELEMENT",props:{nodeValue:name}}]
            }
        }
        return {
            type:"li",
            props:{
                children:[buttonElement,linkElement]
            }
        }
    }
    
    function react0(){
        function render(element,parentDom){
            const {type,props} = element
    
            const isTextElement = type === "TEXT ELEMENT"
            const dom = isTextElement ? document.createTextNode("") : document.createElement(type)
    
            // 事件监听
            const isListener = name => name.startsWith("on")
            Object.keys(props).filter(isListener).forEach(name => {
                const eventType = name.toLowerCase().substring(2)
                dom.addEventListener(eventType,props[name])
            })
    
            // 设置属性
            const isAttribute = name => !isListener(name) && name != "children"
            Object.keys(props).filter(isAttribute).forEach(name => {
                dom[name] = props[name]
            })
    
            // render children
            const childElements = props.children || []
            childElements.forEach(childElement => render(childElement, dom))
    
            // append to parent
            parentDom.appendChild(dom)
        }
        return {
            render
        }
    }
    
    const Didact = react0()
    Didact.render(appElement, document.getElementById("root"))
})()