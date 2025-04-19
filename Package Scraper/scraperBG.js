chrome.runtime.onConnect.addListener((port)=>{
    if(port.name == "tryThis"){
       port.onMessage.addListener(async(e)=>{
        let yMData = await fetch(`https://search.yahoo.com/search;_ylt=AwrjfLNxFQJoP8oCYupXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGZyMgNzYi10b3AEZ3ByaWQDbWlJM3gzU3ZUYU80V2t0WUVXVm92QQRuX3JzbHQDMARuX3N1Z2cDMgRvcmlnaW4Dc2VhcmNoLnlhaG9vLmNvbQRwb3MDMARwcXN0cgMEcHFzdHJsAzAEcXN0cmwDMjIEcXVlcnkDOTQzNDY0MDEwNDI1MDAwMTYzMDYxNwR0X3N0bXADMTc0NDk2NzQxNw--?p=${e.msg}&fr2=sb-top`, {
          "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
          },
          "referrer": "https://search.yahoo.com/",
          "referrerPolicy": "origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
        });

        let textData = await yMData.text()
        if(textData.indexOf("Track via") > 0){
          port.postMessage({msg: e.msg})
        }
       })

    }
})