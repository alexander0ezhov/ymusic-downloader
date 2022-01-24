const initializeYmusic = ({sender}) => {
    const interceptMedia = (details) => {
        if (details.type !== 'media') return;
        chrome.tabs.sendMessage(sender.tab.id, { action:'ymusic-url', payload: details })
    }
    chrome.webRequest.onBeforeRequest.addListener(
        interceptMedia,
        {urls: ["*://*.storage.yandex.net/*"]},
    )
}

chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.action) {
        case "initialize-ymusic": {
            initializeYmusic({sender, sendResponse})
            return;
        }
        case "download-file": {
            const filename = msg.payload.filename ? msg.payload.filename + '.mp3' : undefined
            chrome.downloads.download({url: msg.payload.url, filename})
            return;
        }
    }
});