const writeDownloadButton = ({ container, buttonClass = 'list-dwld', onClick}) => {
    if (container.querySelector('button[data-dwld]')) return;
    const btn = document.createElement('button')
    const icon = document.createElement('img')
    btn.className = buttonClass
    btn.addEventListener('click', onClick)
    btn.dataset.dwld = '1'
    icon.src = chrome.runtime.getURL('icons/download_arrow.png')
    btn.append(icon)
    btn.style.fontWeight="bold"
    // btn.append(' Скачать')
    container.prepend(btn)
}

const setYmusicUrl = (params) => {
    const playing = document.querySelector('.d-track_playing .d-track__overflowable-column');
    if (!playing) return;
    const onClick = () => chrome.extension.sendMessage({ action:'download-file', payload: {...params, filename: playing.getElementsByClassName('d-track__overflowable-wrapper')?.[0]?.textContent?.trim?.()} })
    writeDownloadButton({ container: playing, onClick })
}

chrome.extension.sendMessage({action:'initialize-ymusic'});

chrome.extension.onMessage.addListener((msg) => {
    switch (msg.action) {
        case "ymusic-url": {
            setYmusicUrl(msg.payload)
        }
    }
});