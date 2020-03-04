
const loadmore = (maxResults, loadMore = true, loadingMore = false) => {
    loadingMore = false
    startIndex = 0
    if (loadMore) {
        try {
            console.log("fetchBook")
            if (maxResults <= 30) {
                loadingMore = true
                maxResults = maxResults + 10
                return `maxResult is ${maxResults}, startIndex is ${startIndex}, ${loadingMore}`
            }
            else {
                console.log("maxResult = 40")
                maxResults = 10
                startIndex = startIndex + 1
                return `maxResult is ${maxResults}, startIndex is ${startIndex}, ${loadingMore}`
            }
        }
        catch {
            loadMore = false,
                loadingMore = false
        }
    }
    else {
        return null
    }
}

test("load more books", () => {
    expect(loadmore(10)).toBe("maxResult is 20, startIndex is 0, true")
})
test("load more books with false", () => {
    expect(loadmore(10, false)).toBe(null)
})
test("load more books", () => {
    expect(loadmore(10, true)).toBe("maxResult is 20, startIndex is 0, true")
})
test("load more books", () => {
    expect(loadmore(40, true)).toBe("maxResult is 10, startIndex is 1, true")
})