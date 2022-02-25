const menuForm = document.querySelector("#espresso-menu-form");
const menuFormInput = document.querySelector("#espresso-menu-name");
const menuFormButton = document.querySelector("#espresso-menu-submit-button");
const menuTitleSpan = document.querySelector(".menu-count");

let menuListUl = document.querySelector("#espresso-menu-list");
let menuCount = 0;

menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

menuFormButton.addEventListener("click", addMenu);

function editMenu(evt) {
    let replacingText = prompt("메뉴명을 수정하세요.");
    let listSpan = evt.target.previousElementSibling;
    listSpan.innerText = replacingText;
}

function deleteMenu(evt) {
    let seletedUl = evt.target.parentNode;
    let checking = confirm("정말 삭제하시겠습니까?");
    if (checking) {
        seletedUl.remove();
        menuCount--;
        menuTitleSpan.innerHTML = `총 ${menuCount}개`;
    } else {
        return;
    }
}

function addMenu() {
    if (!menuFormInput.value) {
        alert("값을 입력해주세요.");
        return;
    }

    menuCount++;
    let randomNumber = Date.now();
    // list 만들기
    let newListItem = document.createElement("li");
    newListItem.setAttribute("class", "menu-list-item");
    newListItem.setAttribute("id", randomNumber);

    // span 만들고 내용 채우기
    let newSpan = document.createElement("span");
    newSpan.innerHTML = menuFormInput.value;
    newListItem.appendChild(newSpan);

    // 버튼 만들고 event listener 걸기
    let newEditButton = document.createElement("button");
    newEditButton.setAttribute("type", "button");
    newEditButton.innerText = "수정";
    newListItem.appendChild(newEditButton);
    newEditButton.addEventListener("click", editMenu);

    let newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("type", "button");
    newDeleteButton.innerText = "삭제";
    newListItem.appendChild(newDeleteButton);
    newDeleteButton.addEventListener("click", deleteMenu);

    // ul에 합체
    menuListUl.appendChild(newListItem);

    // input 비우기, 총 n개 고치기
    menuFormInput.value = "";
    menuTitleSpan.innerHTML = `총 ${menuCount}개`;
}
