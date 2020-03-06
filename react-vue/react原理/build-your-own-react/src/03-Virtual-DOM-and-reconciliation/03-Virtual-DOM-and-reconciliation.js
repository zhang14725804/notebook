(function () {
    const randomLikes = () => Math.ceil(Math.random() * 100);
    const stories = [
        {
            name: "Didact introduction",
            url: "http://bit.ly/2pX7HNn",
            likes: randomLikes()
        },
        {
            name: "Rendering DOM elements ",
            url: "http://bit.ly/2qCOejH",
            likes: randomLikes()
        },
        {
            name: "Element creation and JSX",
            url: "http://bit.ly/2qGbw8S",
            likes: randomLikes()
        },
        {
            name: "Instances and reconciliation",
            url: "http://bit.ly/2q4A746",
            likes: randomLikes()
        },
        {
            name: "Components and state",
            url: "http://bit.ly/2rE16nh",
            likes: randomLikes()
        }
    ];

    function storyElement(story) {
        // return (<li>
        //     <button onClick={e => handleClick(story)}>{story.likes}<b>❤️</b></button>
        //     <a href={story.url}>{story.name}</a>
        // </li>);
        return Didact.createElement("li", null, Didact.createElement("button", {
            onClick: function onClick(e) {
                return handleClick(story);
            }
        }, { type: "TEXT ELEMENT", props: { nodeValue: story.likes } }, Didact.createElement("b", null, { type: "TEXT ELEMENT", props: { nodeValue: "❤️" } })), Didact.createElement("a", {
            href: story.url
        }, { type: "TEXT ELEMENT", props: { nodeValue: story.name } }));
    }


    function handleClick(story) {
        console.log(story);
        story.likes ++
        Didact.render(appElement, document.getElementById("root"))
    }

    function react0() {
        const TEXT_ELEMENT = "TEXT ELEMENT"
        let rootInstance = null

        function render(element, container) {
            const prevInstance = rootInstance
            const nextInstance = reconcile(container, prevInstance, element)
            rootInstance = nextInstance
        }

        function reconcile(parentDom, instance, element) {
            if (instance === null) {
                // 创建instance
                const newInstance = instantiate(element)
                parentDom.appendChild(newInstance.dom)
                return newInstance
            } else if (element === null) {
                // 移除instance
                parentDom.removeChild(instance.dom)
                return null
            } else if (instance.element.type === element.type) {
                // 更新instance
                updateDomProperties(instance.dom, instance.element.props, element.props)
                instance.childInstances = reconcileChild(instance, element)
                instance.element = element
                return instance
            } else {
                // 替换instance
                const newInstance = instantiate(element)
                parentDom.replaceChild(newInstance.dom, instance.dom)
                return newInstance
            }
        }

        function reconcileChild(instance, element) {
            const dom = instance.dom
            const childInstances = instance.childInstances
            const nextChildElements = element.props.children || []
            const newChildInstances = []
            const count = Math.max(childInstances.length, nextChildElements.length)
            for (let i = 0; i < count; i++) {
                const childInstance = childInstances[i]
                const childElement = nextChildElements[i]
                const newChildInstance = reconcile(dom, childInstance, childElement)
                newChildInstances.push(newChildInstance)
            }
            return newChildInstances.filter(instance => instance != null)
        }

        function instantiate(element) {
            const { type, props } = element
            const isTextElement = type === "TEXT ELEMENT"
            // 创建dom节点
            const dom = isTextElement ? document.createTextNode("") : document.createElement(type)

            updateDomProperties(dom, [], props)

            // Instantiate and append children
            const childElements = props.children || []
            const childInstances = childElements.map(instantiate)
            const childDoms = childInstances.map(childInstance => childInstance.dom)
            childDoms.forEach(childDom => dom.appendChild(childDom))
            const instance = { dom, element, childInstances }
            return instance
        }

        function updateDomProperties(dom, prevProps, nextProps) {
            // startsWith 注意拼写
            const isEvent = name => name.startsWith("on")
            const isAttribute = name => !isEvent(name) && name != "children"

            // 移除 event listeners
            Object.keys(prevProps).filter(isEvent).forEach(name => {
                const eventType = name.toLowerCase().substring(2)
                dom.removeEventListener(eventType, prevProps[name])
            })

            // 移除 attibutes
            Object.keys(prevProps).filter(isAttribute).forEach(name => {
                dom[name] = null
            })

            //  Cannot convert undefined or null to object
            if (JSON.stringify(nextProps) !== '{}' && nextProps !== null && nextProps !== 'null' && nextProps !== undefined) {
                // 设置 attribute
                Object.keys(nextProps).filter(isAttribute).forEach(name => {
                    dom[name] = nextProps[name]
                })

                // 添加 event listeners
                Object.keys(nextProps).filter(isEvent).forEach(name => {
                    const eventType = name.toLowerCase().substring(2)
                    dom.addEventListener(eventType, nextProps[name])
                })
            }
        }

        function createElement(type, config, ...args) {
            const props = Object.assign({}, config)
            const hasChildren = args.length > 0
            const rawChildren = hasChildren ? [].concat(...args) : []
            props.children = rawChildren.filter(c => c !== null && c !== false).map(c => c instanceof Object ? c : createTextElement(c))
            return { type, props }
        }

        function createTextElement(value) {
            createElement(TEXT_ELEMENT, { nodeValue: value })
        }

        return {
            render,
            createElement
        }
    }

    const Didact = react0()

    /*
        JSX
        const appElement = <div><ul>{stories.map(storyElement)}</ul></div>
    */
    var appElement = Didact.createElement("div", null, Didact.createElement("ul", null, stories.map(storyElement)));

    Didact.render(appElement, document.getElementById("root"))
})()