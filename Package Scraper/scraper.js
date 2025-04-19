let doc = document.createElement("body")
doc.id = "docBody"
doc.innerHTML = `<div class="container" id = "mainDiv">
    <h1>Product Scraper</h1>
    <div class="input-group">
    <input id = "trackingNum" placeholder = "Tracking Number"><input id = "lineCount" placeholder = "Count"> <button id="starBtn">Start</button> <button id ="copyBtn">Copy</button>
    </div>
    <label id = "getCounter">Currently Getting: </label> <br>
    <label id = "lastValue">Last Stop: </label>
    <table id = "docTable"> </table>
</div>`
let firstHalf;
let secondHalf;
let trackArr = []


if(document.URL.includes("emailus.usps.com")){
    document.body.replaceWith(doc)

    trackingNum.addEventListener("change",()=>{
        trackArr = []
        if(lineCount.value != "" && lineCount.value != undefined){
            docTable.replaceWith(docTable)
            switch (true) {
                case trackingNum.value[trackingNum.value.length - 6] != 0:
                     firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                     secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                    break;

                    case trackingNum.value[trackingNum.value.length - 7] != 0:
                        firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 7)
                        secondHalf = trackingNum.value.slice(trackingNum.value.length - 7,trackingNum.value.length)
                       break;  

                       case trackingNum.value[trackingNum.value.length - 6] != 0:
                        firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                        secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                       break;

                       case trackingNum.value[trackingNum.value.length - 7] != 0:
                        firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 7)
                        secondHalf = trackingNum.value.slice(trackingNum.value.length - 7,trackingNum.value.length)
                       break;

                       case trackingNum.value[trackingNum.value.length - 6] != 0:
                        firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                        secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                       break;
            
                default:
                    break;
            }
            for(let i = 0; i < lineCount.value; i++){
                trackArr.push(firstHalf + (~~secondHalf + (i + 1)))
                lastValue.innerText = `Last Stop: ${trackArr[trackArr.length - 1]}`
            }
            

        }
    })

    lineCount.addEventListener("change",()=>{
        trackArr = []

        if(trackingNum.value != "" && trackingNum.value != undefined){
            docTable.replaceWith(docTable)
            switch (true) {
                case trackingNum.value[trackingNum.value.length - 6] != 0:
                    firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                    secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                    break;
                    
                    case trackingNum.value[trackingNum.value.length - 7] != 0:
                        firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 7)
                        secondHalf = trackingNum.value.slice(trackingNum.value.length - 7,trackingNum.value.length)
                        break;  
                        
                        case trackingNum.value[trackingNum.value.length - 6] != 0:
                            firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                            secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                            break;
                            
                            case trackingNum.value[trackingNum.value.length - 7] != 0:
                                firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 7)
                                secondHalf = trackingNum.value.slice(trackingNum.value.length - 7,trackingNum.value.length)
                                break;
                                
                                case trackingNum.value[trackingNum.value.length - 6] != 0:
                                    firstHalf = trackingNum.value.slice(0,trackingNum.value.length - 6)
                                    secondHalf = trackingNum.value.slice(trackingNum.value.length - 6,trackingNum.value.length)
                                    break;
                                    
                                    default:
                                        break;
                                        
                                    }
                                    for(let i = 0; i < lineCount.value; i++){
                                        trackArr.push(firstHalf + (~~secondHalf + (i + 1)))
                                        lastValue.innerText = `Last Stop: ${trackArr[trackArr.length - 1]}`
                                    }
                                    
        }
    })

    starBtn.addEventListener("click",()=>{


        const canWakeLock = () => 'wakeLock' in navigator;
let wakelock;
async function lockWakeState() {
  if(!canWakeLock()) return;
  try {
    wakelock = await navigator.wakeLock.request();
    wakelock.addEventListener('release', () => {
      console.log('Screen Wake State Locked:', !wakelock.released);
    });
    console.log('Screen Wake State Locked:', !wakelock.released);
  } catch(e) {
    console.error('Failed to lock wake state with reason:', e.message);
  }
}
        if(docTable.children.length > 0){
            document.getElementById("docTable").remove()
            let docTable = document.createElement("table")
            docTable.id = "docTable"
            mainDiv.append(docTable)
        }
        let countM = 0
        if(trackArr.length != 0){
        let intervCount = setInterval(async ()=>{
            
            getCounter.innerText = `Currently Getting: ${countM + 1} of ${trackArr.length}   Working on: ${trackArr[countM]}`
            
                let port = chrome.runtime.connect({name: "tryThis"})
                port.postMessage({msg: trackArr[countM]})

                port.onMessage.addListener(async (e)=>{
                    let usPsD = await fetch("https://emailus.usps.com/s/sfsites/aura?r=3&aura.ApexAction.execute=1", {
                        "headers": {
                          "accept": "*/*",
                          "accept-language": "en-US,en;q=0.9",
                          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                          "priority": "u=1, i",
                          "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
                          "sec-ch-ua-mobile": "?0",
                          "sec-ch-ua-platform": "\"Windows\"",
                          "sec-fetch-dest": "empty",
                          "sec-fetch-mode": "cors",
                          "sec-fetch-site": "same-origin",
                          "x-b3-sampled": "0",
                          "x-b3-spanid": "66e4b217bd2680d8",
                          "x-b3-traceid": "47a14f1d9b193e33",
                          "x-sfdc-lds-endpoints": "ApexActionController.execute:C360_FlowTrackingLookup.getTrackingData",
                          "x-sfdc-page-cache": "2c65fd161fccd6a3",
                          "x-sfdc-page-scope-id": "a31c5ba4-46f6-433e-80a0-faf11fdc8e14",
                          "x-sfdc-request-id": "490679000033e12b69"
                        },
                        "referrer": `https://emailus.usps.com/s/package-inquiry?trackingNumber=${e.msg}`,
                        "referrerPolicy": "origin-when-cross-origin",
                        "body": `message=%7B%22actions%22%3A%5B%7B%22id%22%3A%2293%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22C360_FlowTrackingLookup%22%2C%22method%22%3A%22getTrackingData%22%2C%22params%22%3A%7B%22trackingNumber%22%3A%22${e.msg}%22%2C%22sourceId%22%3A%22USPSEMAILUS%22%7D%2C%22cacheable%22%3Afalse%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22c1ItM3NYNWFUOE5oQkUwZk1sYW1vQWg5TGxiTHU3MEQ5RnBMM0VzVXc1cmcxMS4zMjc2OC4z%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%221237_QCP5Ih0RUYVLF144CXYCOA%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Atrue%7D&aura.pageURI=%2Fs%2Fpackage-inquiry%3FtrackingNumber%3D${e.msg}&aura.token=null`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                      });

                    let usPsText = await usPsD.text()
                    let rawDatas = JSON.parse(usPsText)
                    let deStination = rawDatas.actions[0].returnValue.returnValue. destinationAmsCity + " " + rawDatas.actions[0].returnValue.returnValue.destinationAmsState + ", " + rawDatas.actions[0].returnValue.returnValue.destinationZip
                    let shipDate = rawDatas.actions[0].returnValue.returnValue.mailingFullDate
                    let shipFrom = rawDatas.actions[0].returnValue.returnValue.originCity + " " + rawDatas.actions[0].returnValue.returnValue.originState + ", " + rawDatas.actions[0].returnValue.returnValue.originZip
                    let estimatedDelivery = rawDatas.actions[0].returnValue.returnValue.expectedDeliveryFullDate || "Pending"
                    let serviceType = rawDatas.actions[0].returnValue.returnValue.mailClass
                    let trData = document.createElement("tr")
                    trData.innerHTML = `<td>${e.msg}</td> <td>${deStination}</td> <td>${shipDate}</td> <td>${shipFrom}</td> <td>${estimatedDelivery}</td> <td>${serviceType}</td>`
                    docTable.append(trData)
                    console.log(rawDatas.actions[0].returnValue.returnValue)
                })


            
            countM = countM + 1
            if(countM == trackArr.length){
                clearInterval(intervCount)
            }
        },1000)
        }
    })
    copyBtn.addEventListener("click",()=>{
        navigator.clipboard.writeText(docTable.innerText)
        window.alert("Result Copied to ClipBoard")
    })
}