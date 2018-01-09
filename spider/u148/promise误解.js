//只执行一次，flag永远为false
let pages = utils.getUrls();

//爬取单个页面
function getPage(singeUrl) {
    return new Promise((resolve, reject) => {
        superagent.get(singeUrl)
            .set({
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
            })
            .charset('utf8')
            .end(function (err, sres) {
                if (err) throw err;
                utils.singleRequest(sres, db)
            });
        resolve('resolve==' + singeUrl)
    })
}
let flag = true;
pages.forEach((item) => {
    if (flag) {
        flag = false;
        let promises = item.map(function (url) {
            return getPage(url);
        });
        Promise.all(promises).then(res => {
            flag = true;
        })
    }
})

/*
    https://stackoverflow.com
    The problem is that because you are looping through a multidimensional array of promises, 
    and because the condition if (flag) relies on flag being true to execute any code in pages.forEach(), 
    the loop stops executing any code after the first iteration.
    This is because Promise.All() is an asynchronous operation.
    By the time the promises created from pages[0] have resolved (which also sets flag to true), 
    the iteration has already finished its first loop, but flag is still set to false.

    You could solve this problem by flattening the multi-dimensional array of promises, 
    so that Promise.all() will await for all of the promises at once instead of iterating through them.
*/

let pages = [];
pages.push(['one', 'two']);
pages.push(['three', 'four']);
pages.push(['five', 'six']);

let getPage = function (singeUrl) {
    return new Promise((resolve, reject) => {
        resolve('resolve==' + singeUrl)
        if (!singleUrl) reject('No input');
    });
}

let flag = true;

pages.forEach((item) => {
    if (flag) {
        flag = false;
        let promises = item.map(function (url) {

            // You will notice in the output at the bottom, that
            // only the array pages[0] have been executed by Promise.all()

            console.log('url: ', url);

            return getPage(url);
        });

        Promise.all(promises).then((res) => {

            // The log statements below are executed last

            console.log('flag1 in promise: ', flag);

            flag = true;

            console.log('flag2 in promise: ', flag);
        });
    }
});

// This statement executes before flag
// is set to true
console.log('final flag: ', flag);