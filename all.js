var Data = []
var xhr = new XMLHttpRequest;
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
// true 非同步，不會等資料傳就會直接往下進行
// false 會等資料傳回來再進行，但可能會造成網頁有卡頓效果，因而不常用
xhr.send(null);
xhr.onload = function () {
    var str = JSON.parse(xhr.responseText); //將字串陣列化
    Data = str.result.records;
    updateList();
}

let list = document.querySelector('.list');
let title = document.querySelector('.title');
let content = document.querySelector('.contentShow');

list.addEventListener('change', changeplace);
list.addEventListener('change', updateContent);

//先抓出全部的zone
function updateList() {
    let allZone = [];
    for (let i = 0; i < Data.length; i++) {
        allZone.push(Data[i].Zone);
    }
    console.log(allZone);
    //過濾重複的zone
    result = Array.from(new Set(allZone));
    console.log(result);
    //設定change選單
    let str = '';
    str = `<option value="" disabled selected hidden>--請選擇行政區--</option>`;
    for (var i = 0; i < result.length; i++) {
        str += `<option value="${result[i]}">${result[i]}</option>`;
    }
    list.innerHTML = str;
}
//change選單呈現zone
function changeplace(e) {
    let str = '';
    for (var i = 0; i < result.length; i++) {
        if (e.target.value == result[i]) {
            str = `<h3 class="title">${result[i]}</h3>`
            console.log(str)
        }
    }
    title.innerHTML = str;
}
//熱門行政區
let hotBtn = document.querySelectorAll('.hotBtn');
hotBtn.forEach(function (hotBtn) {
    hotBtn.addEventListener('click',function(e){
        updateContent(e)
        changeplace(e)
    })
})

//顯示資料
function updateContent(e) {
    let str = '';
    for (var i = 0; i < Data.length; i++) {
        if (e.target.value == Data[i].Zone) {
            str += `
        <li class="innerContent">
            <div class="pic justify-content" style="background:url(${Data[i].Picture1});
                                    background-repeat:no-repeat;
                                    background-position: center;
                                    background-size: cover">
                <h3 class="placeTitle">${Data[i].Name}</h3>
                <p>${Data[i].Zone}</p>
            </div>

            <div class="textArea">
                <div class="top">
                    <p class="time">
                        <span class="info-icon"><img src="https://i.ibb.co/j8pSs37/icons-clock.png"></span>
                        <span>${Data[i].Opentime}</span>
                    </p>
                    <p class="location">
                        <span class="info-icon"><img src="https://i.ibb.co/QbjT4z7/icons-pin.png" alt=""></span>
                        <span>${Data[i].Add}</span>
                    </p>
                </div>

                <div class="bottom justify-content">
                    <p>
                        <span class="info-icon"><img src="https://i.ibb.co/d6z4fRr/icons-phone.png"></span>
                        <span>${Data[i].Tel}</span>
                    </p>
                    <p>
                        <span class="info-icon"><img src="https://i.ibb.co/YQMMjg4/icons-tag.png"></span>
                        <span>${Data[i].Ticketinfo}</span>
                    </p>
                </div>
            </div>
        </li>`
        }
    }
    // console.log(str)
    content.innerHTML = str;
}