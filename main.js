const items = document.querySelector(".items");
const input = document.querySelector(".footer_input");
const addBtn = document.querySelector(".footer_button");

function onAdd() {
	//1. 사용자가 입력한 텍스트를 받아옴
	const text = input.value;
	if (text === "") {
		input.focus();
		return;
	}

	//2. 새로운 아이템을 만듬 (아이템 + 삭제 버튼)
	const item = createItem(text);
	//3. items 컨테이너 안에 새로 만든 아이템을 추가
	items.appendChild(item);
	//4. 새로 추가된 아이템으로 스크롤링
	item.scrollIntoView({
		block: "center",
	});
	//5. input을 초기화
	input.value = "";
	input.focus();
}

let id = 0; //UUID
function createItem(text) {
	const itemRow = document.createElement("li");
	itemRow.setAttribute("class", "item_row");
	itemRow.setAttribute("data-id", id);
	itemRow.innerHTML = `
        <div class="item">
            <span class="item_name">${text}</span>
            <button class="item_delete">
                <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
        </div>
        <div class="item_divider"></div>  `;
	id++;
	return itemRow;
}

addBtn.addEventListener("click", () => {
	onAdd();
});

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		onAdd();
	}
});

items.addEventListener("click", (e) => {
	const id = e.target.dataset.id;
	if (id) {
		const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
		toBeDeleted.remove();
	}
});
