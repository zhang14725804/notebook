### 1.type 自定义类型

**新类型不会拥有原基础类型所附带的方法**。通过Type 关键字在原有类型基础上构造出一个新类型，我们需要针对新类型来重新创建新方法。

    type IZ int

### 2.定义类型别名

    type IZ = int

type IZ int 其实是定义了新类型，这和类型别名完全不是一个含义。自定义类型不会拥有原类型附带的方法，而**别名是拥有原类型附带的**

- 自定义类型不会继承原有类型的方法，但**接口方法或组合类型的内嵌元素则保留原有的方法**。

```bash
//  Mutex 用两种方法，Lock and Unlock。
type Mutex struct         { /* Mutex fields */ }
func (m *Mutex) Lock()    { /* Lock implementation */ }
func (m *Mutex) Unlock()  { /* Unlock implementation */ }

// NewMutex和 Mutex 一样的数据结构，但是其方法是空的。
type NewMutex Mutex

// PtrMutex 的方法也是空的
type PtrMutex *Mutex

// *PrintableMutex 拥有Lock and Unlock 方法
type PrintableMutex struct {
    Mutex
}
```