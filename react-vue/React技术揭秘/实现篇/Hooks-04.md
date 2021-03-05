不同类型hook的memoizedState保存不同类型数据，具体如下：

- useState：对于const [state, updateState] = useState(initialState)，memoizedState保存state的值

- useReducer：对于const [state, dispatch] = useReducer(reducer, {});，memoizedState保存state的值

- useEffect：memoizedState保存包含useEffect回调函数、依赖项等的链表数据结构effect，你可以在这里 (opens new window)看到effect的创建过程。effect链表同时会保存在fiber.updateQueue中

- useRef：对于useRef(1)，memoizedState保存{current: 1}

- useMemo：对于useMemo(callback, [depA])，memoizedState保存[callback(), depA]

- useCallback：对于useCallback(callback, [depA])，memoizedState保存[callback, depA]。与useMemo的区别是，useCallback保存的是callback函数本身，而useMemo保存的是callback函数的执行结果

有些hook是没有memoizedState的，比如：

- useContext