
const loadmore = () => {
    loadMore = true
    loadingMore = false
    maxResults = 10
    startIndex = 0
    if (loadMore) {
        try {
            loadingMore = true
            console.log("fetchBook")
            if (maxResults <= 30) {
                maxResults = maxResults + 10
                return `maxResult is ${maxResults}, startIndex is ${startIndex}`
            }
            else {
                console.log("maxResult = 40")
                maxResults = 10
                startIndex = startIndex + 1
                return `maxResult is ${maxResults}, startIndex is ${startIndex}`
            }
        }
        catch {
            loadMore = false,
                loadingMore = false
        }
    }
}

test("load more books", () => {
    expect(loadmore(10)).toBe("maxResult is 10, startIndex is 0")
})
