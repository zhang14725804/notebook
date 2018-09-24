####what`s a stream

At dinner tonight, I was discussing that I've been thinking about streams and how to simplify them in JavaScript. My 7-year-old perked up and asked me:

> Daddy, what's a stream?

I explained that a stream is like a line of water along the ground. If you dig a trench on a hill and fill up the high end using a water hose the water will run down the hill along the trench. This is one of his favorite hobbies in the back yard, so he understood completely. I explained that when new water is added to the top, it eventually makes its way to the bottom of the stream. The end where water comes from is called the upstream and the other end is the downstream. Gravity pulls water down

我解释说，溪流就像一条沿着地面的水线。 如果你在山上挖沟并用水管填满高端水，那么水会沿着沟渠流下山坡。 这是他在后院最喜欢的爱好之一，所以他完全理解。 我解释说，当新的水添加到顶部时，它最终会进入流的底部。 水来自的末端称为上游，另一端称为下游。 重力让水流动

#####Back Pressure（背压（流控））

Satisfied that I explained the concept, I continued by saying that I've been thinking a lot about how back pressure should work. Then he asked
我对这个概念的解释感到满意，我继续说我一直在思考背压应该如何运作。
> Daddy, what's back pressure?

I thought for a moment and thought of a water hose. I explained to him that in a water hose, if you kink the end of the hose while the water is on, eventually it will fill up and once the pressure is high enough, the house(提供水的地方，给水站) will stop putting more water into the hose. The tap will feel the pressure all the way from the kink back to the source.

Now imagine back to the original example of a trench in the ground. If you build a large dam at the end, the source won't feel back pressure. Rather when the trench fills up, the water will spill out flooding the nearby plains. This is usually a bad thing.

我想了一会儿想到了水管。 我向他解释说，在水管中，如果你在水开启时扭结软管的末端，最终它会充满，一旦压力足够高，房子就会停止向软管中加入更多的水。 水龙头会从扭结回到源头，感受到压力。

现在回想一下地面沟槽的原始例子。 如果你在最后建造一个大坝，源将不会感到背压。 相反，当沟渠填满时，水会溢出附近的平原。 这通常是件坏事。

#####Pull Stream

I then resumed explaining to my wife about my work. I explained that pull streams are much easier to implement back pressure for than push streams. Then my son asked:
然后我恢复向妻子解释我的工作。 我解释说，拉流比推流更容易实现背压。
> What's that mean?

I could see that I would have to explain everything I talked about. He was in that mood where he wanted to understand everything adults talk about.

I said that the example with the water hose and the trench in the ground are push streams. The water is pushed into the upstream side and flows downstream because of the positive pressure. A pull stream is more like a straw. With a straw, you don't have to worry about flooding because the bottom of the straw will normally not push water up the straw on its own. When the person sucks on the top of the straw it creates a vacuum that pulls water from the bottom of the straw. New water only enters the straw when it's asked for by the top of the straw.

我说过用水管和地面沟槽的例子是推流。 由于正压，水被推入上游侧并向下游流动。 拉流更像是一根吸管。 使用吸管，您不必担心水浸，因为吸管的底部通常不会自己将水推到吸管上。 当人吮吸吸管顶部时会产生真空，从吸管底部吸水。 当吸管顶部要求时，新水只进入吸管。

I then went on to explain how different straw lengths and thicknesses affect how the straw works. With a larger straw it takes longer to get at the initial bit of drink because all the space needs to be filled first. When you do finally get drink, it's not the liquid that just entered the bottom you're drinking, but the water that was first buffered into the straw.

然后我接着解释了不同的吸管长度和厚度如何影响吸管的工作原理。 使用较大的吸管需要更长时间才能获得最初的饮料，因为所有空间都需要先填充。 当你最终喝酒时，它不是刚刚进入你饮用的底部的液体，而是首先缓冲到吸管中的水。

#####Codecs（编解码器）
The tricky part of what I've been working on today is how to express codecs simply while still preserving back pressure. I looked over to Jack and he was still listening intently so I tried to explain what a codec is.

我今天一直在努力的部分是如何在保持背压的同时简单地表达编解码器。我看着杰克，他还在专注地听，所以我试着解释一下编解码器是什么。

It stands for encode and decode. It converts a stream from one type to another. I could see I had lost the 7-year-old, so I decided to explain it to my wife instead.

它代表编码和解码。它将流从一种类型转换为另一种类型。7岁的儿子已经听得云里雾里了，所以我决定向我的妻子解释。

My favorite part of physics was dimensional analysis. If you knew the units that the answer expected and knew the units you started with, then pick the formula that had the difference in units. If you have the proper units when you were done, it was probably correct. (This is probably how users of strictly typed programming languages feel about their compiler.)

我最喜欢的物理部分是尺寸分析。如果您知道答案所期望的单位并且知道您开始使用的单位，那么选择具有单位差异的公式。如果你在完成后拥有合适的单位，那可能是正确的。 （这可能是严格类型化编程语言的用户对编译器的感觉。）

But my second favorite part of physics was the actual conversion process between units. You would start out in one unit, apply a transformation and end up with another representation of the same thing.

但我物理学的第二个最喜欢的部分是单位之间的实际转换过程。您将从一个单元开始，应用转换并最终使用同一事物的另一个表示。

Here is an example converting 100 meters per second to miles per hour using several conversion constants:

以下是使用多个转换常量将每秒100米转换为每小时英里数的示例：

Stream codecs are just like the unit conversions, except they work on streams of data instead of scalar values. The new stream after running through the codec is the same data, just represented a different way.

My son is learning how to read, so I decided to explain codecs using reading. A sentence is composed of many words. The sentence can be viewed as a stream of words where each event is a word. Now suppose I want a new stream that is a list of all the letters in the sentence. This codec would consume word events and emit letter events. The problem I quickly saw with this was that the reverse conversion didn't work. I would have to emit a space after each word to know how to re-form the words out of the stream of letters.

Then I realized that this could be a nested stream. Instead of creating a new flat stream of letters, I could convert each word into a new stream of letters. In fact, it's nested streams all the way up. Letters contain strokes, words contain letters, sentences contain words, paragraphs contain sentences, sections contain paragraphs, chapters contain sections, etc...

Obviously I had gone off the theoretical deep end here

流编解码器就像单元转换一样，除了它们处理数据流而不是标量值。运行编解码器后的新流是相同的数据，只是表示不同的方式。

我儿子正在学习如何阅读，所以我决定用阅读来解释编解码器。句子由许多单词组成。句子可以被视为每个事件都是单词的单词流。现在假设我想要一个新流，它是句子中所有字母的列表。此编解码器将使用单词事件并发出字母事件。我很快就看到的问题是逆向转换不起作用。我必须在每个单词后面发出一个空格，以便知道如何从字母流中重新构造单词。

然后我意识到这可能是一个嵌套流。我可以将每个单词转换为新的字母流，而不是创建一个新的平面字母流。事实上，它是嵌套流一直向上的。字母包含笔画，单词包含字母，句子包含单词，段落包含句子，章节包含段落，章节包含章节等...

显然，我已经离开了这里的理论深层次

#####回归正题
In computers we have streams of data. For example, if you want to stream a movie from a server to your smart phone, the movie is the stream. Now usually, the server can read from the local disk much faster than the phone can download the data over its 3G connection. If you don't program a way for the disk source to feel the back pressure from the slow mobile connection, it will read the data full-speed and flood the server's memory by buffering everything. This is bad for servers with lots of clients and/or large media files.

在计算机中，我们有数据流。例如，如果要将电影从服务器流式传输到智能手机，则电影就是流。现在通常，服务器可以从本地磁盘读取比手机通过3G连接下载数据快得多。如果您没有为磁盘源设置方法来感受来自慢速移动连接的背压，它将全速读取数据并通过缓冲所有内容来充斥服务器的内存。这对于具有大量客户端和/或大型媒体文件的服务器来说很糟糕。

One way for the media server to feel the back pressure is to use a pull stream. But care needs to be taken to keep things running smoothly. The stream needs to have an appropriate level of buffering along the path so that just like the straw you don't have to wait the full length of the straw to get a single chunk. If the stream is constantly full, then the phone gets the chunks as fast as it asks for them with no latency other than the initial buffering.

媒体服务器感受到背压的一种方法是使用拉流。但需要注意保持平稳运行。流需要沿着路径具有适当的缓冲水平，这样就像吸管一样，您不必等待吸管的整个长度来获得单个块。如果流始终是满的，那么手机会以最快的速度获取块，除了初始缓冲之外没有延迟。

We have codecs every time we convert a network or file stream from one format to another. On the network there is IP, TCP, HTTP, JSON, and other codecs layered on top of each other. Sometimes there are nested streams. For example, this week I was prototyping a new HTTP codec for node.js and hit a snag because the TCP connection stream emits request events, but within the request event is a body stream with its own data events. Preserving proper back pressure inside that nested stream is tricky and my nice little prototype APIs didn't work anymore.

每次我们将网络或文件流从一种格式转换为另一种格式时，我们都有编解码器。在网络上，IP，TCP，HTTP，JSON和其他编解码器相互叠加。有时会有嵌套流。例如，本周我正在为node.js创建一个新的HTTP编解码器，并且因为TCP连接流发出请求事件而遇到障碍，但在请求事件中是具有自己的数据事件的正文流。在嵌套流中保留适当的背压是很棘手的，我的漂亮小原型API不再起作用了。

I eventually figured out what works for me, but that's content for another more concrete post.


我最终想出了什么对我有用，但这是另一个更具体的帖子的内容。
（我还是不太懂）