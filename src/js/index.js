const $ = (selector) => document.querySelector(selector);

function App() {
    let currentCategory = "espresso";

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll(
            "li"
        ).length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    };

    const paintMenus = () => {
        let localStorageData = localStorage.getItem(currentCategory);
        let parsedHTML = JSON.parse(localStorageData);
        $("#espresso-menu-list").innerHTML = parsedHTML;

        updateMenuCount();
    };

    paintMenus();

    const changeCategory = (e) => {
        currentCategory = e.target.getAttribute("data-category-name");
        $(".mt-1").innerText = `${e.target.innerText} 메뉴 관리`;
        paintMenus();
    };

    document
        .querySelectorAll(".cafe-category-name")
        .forEach((element) =>
            element.addEventListener("click", changeCategory)
        );

    const updateLocalStrage = () => {
        let menuListHTML = $("#espresso-menu-list").innerHTML;
        let strigifiedHTML = JSON.stringify(menuListHTML);
        localStorage.setItem(`${currentCategory}`, strigifiedHTML);
    };

    //CRUD

    const addMenuName = () => {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName) => {
            return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                  품절
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
              </li>`;
        };
        $("#espresso-menu-list").insertAdjacentHTML(
            "beforeend",
            menuItemTemplate(espressoMenuName)
        );
        updateMenuCount();
        updateLocalStrage();
        $("#espresso-menu-name").value = "";
    };

    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const menuName = $menuName.innerText;
        const updatedMenuName = prompt("메뉴명을 수정하세요.", menuName);
        if (!updatedMenuName) {
            return;
        }
        $menuName.innerText = updatedMenuName;
        updateLocalStrage();
    };

    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
            updateMenuCount();
            updateLocalStrage();
        }
    };

    const markSoldOut = (e) => {
        const $menuNameClassList = e.target
            .closest("li")
            .querySelector(".menu-name").classList;
        if (!$menuNameClassList.contains("sold-out")) {
            $menuNameClassList.add("sold-out");
        } else {
            $menuNameClassList.remove("sold-out");
        }
        updateLocalStrage();
    };

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }

        if (e.target.classList.contains("menu-sold-out-button")) {
            markSoldOut(e);
        }
    });

    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenuName();
    });

    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
    });
}

App();
