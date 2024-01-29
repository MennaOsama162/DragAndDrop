console.log = "hello";
let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');
let inp = document.getElementById('inp');
let boxs = document.querySelectorAll('.box');
let drag = null;

// Counter to keep track of items moved to "Done" box
let doneItemCount = 0;

btn2.onclick = function () {
    let items = document.querySelectorAll('.item-container');
    items.forEach(item => {
        item.remove();
    });
    inp.value = '';
    doneItemCount = 0; // Reset the counter
}

btn.onclick = function () {
    if (inp.value !== '') {
        boxs[0].innerHTML += `
            <div class="item-container">
                <p class="item" draggable="true">${inp.value}</p>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        inp.value = '';
        dragItem();
    }
}

function dragItem() {
    let itsems = document.querySelectorAll('.item');
    itsems.forEach(item => {
        item.addEventListener('dragstart', function () {
            drag = item;
            item.style.opacity = '.5';
        });

        item.addEventListener('dragend', function () {
            drag = null;
            item.style.opacity = '1';

            // Check if the item is in the "Done" box
            if (item.closest('.box').querySelector('h2').textContent === 'Done') {
                doneItemCount++;
                if (doneItemCount === itsems.length) {
                    // All items are moved to the "Done" box
                    alert('Well done! Keep Going');
                }
            }
        });
    });

    boxs.forEach(box => {
        box.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.background = 'black';
            this.style.color = '#fff';
        });

        box.addEventListener('dragleave', function () {
            this.style.background = '#fff';
            this.style.color = '#000';
        });

        box.addEventListener('drop', function () {
            let container = drag.closest('.item-container');
            if (container) {
                box.append(container);
            }
            this.style.background = '#fff';
            this.style.color = '#000';
        });
    });

    let removeItem = document.querySelectorAll(".remove-btn");
    removeItem.forEach(rm => {
        rm.addEventListener('click', function () {
            let container = this.parentNode;
            if (container.closest('.box').querySelector('h2').textContent === 'Done') {
                doneItemCount--;
            }
            container.remove();
        });
    });
}
