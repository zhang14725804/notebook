### 9.1 字符串简介

Go 语言中可以使用反引号或者双引号来定义字符串。反引号表示原生的字符串，即不进行转义

```bash
str := "Hello World! \n Hello Gopher! \n"
输出：
Hello World! 
Hello Gopher!

str :=  `Hello World! \n Hello Gopher! \n` 

输出：
Hello World! \nHello Gopher! \n
```

- 内置的len()函数获取的是每个字符的UTF-8编码的长度和，而不是直接的字符数量

    s := "其实就是rune"
    fmt.Println(len(s))                    // "16"
    fmt.Println(utf8.RuneCountInString(s)) // "8"


### 9.2 字符串拼接

- +号运算符
- fmt.Sprintf()
- fmt.Sprintf()
- bytes.Buffer
- strings.Builder

### 9.2 有关字符串的处理

bytes、strings、strconv和unicode包

判断是否以某字符串打头/结尾 strings.HasPrefix(s, prefix string) bool strings.HasSuffix(s, suffix string) bool

字符串分割 strings.Split(s, sep string) []string

返回子串索引 strings.Index(s, substr string) int strings.LastIndex 最后一个匹配索引

字符串连接 strings.Join(a []string, sep string) string 另外可以直接使用“+”来连接两个字符串

字符串替换 strings.Replace(s, old, new string, n int) string

字符串转化为大小写 strings.ToUpper(s string) string strings.ToLower(s string) string

统计某个字符在字符串出现的次数 strings.Count(s, substr string) int

判断字符串的包含关系 strings.Contains(s, substr string) bool