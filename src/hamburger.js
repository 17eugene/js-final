import { refs } from "./refs.js";

//CONSTANTS
const sizes = {
  small: { price: 50, calories: 20 },
  large: { price: 100, calories: 40 },
};

const stuffings = {
  cheese: { price: 10, calories: 20 },
  salad: { price: 20, calories: 5 },
  potato: { price: 15, calories: 10 },
};

const extras = {
  mayo: { price: 20, calories: 5 },
  spicies: { price: 15, calories: 0 },
};

//CREATE CLASS
class Hamburger {
  constructor({ size, stuffing } = {}) {
    this.size = size;
    this.stuffing = stuffing;
    this.price;
    this.calories;
    this.extra = [];
  }

  getSize() {
    return this.size;
  }

  setSize(sizeName) {
    if (Object.keys(sizes).includes(sizeName)) {
      this.size = sizeName;
    } else {
      const error = new Error("Only 'Small' and 'Large' sizes avaliable!");
      alert(error.message);
    }
  }

  getStuffing() {
    return this.stuffing;
  }

  setStuffing(stuffingName) {
    if (Object.keys(stuffings).includes(stuffingName)) {
      this.stuffing = stuffingName;
    } else {
      const error = new Error("Only cheese, salad or potato avaliable!");
      alert(error.message);
    }
  }

  setExtra(extraValue) {
    if (Object.keys(extras).includes(extraValue)) {
      this.extra.push(extraValue);
    } else {
      const error = new Error("Not avaliable!");
      alert(error.message);
    }
  }

  removeExtra(extraValue) {
    this.extra.splice(extraValue, 1);
  }

  calculatePrice() {
    if (
      Object.keys(sizes).includes(this.size) &&
      Object.keys(stuffings).includes(this.stuffing)
    ) {
      this.price = sizes[this.size].price + stuffings[this.stuffing].price;
    }

    if (
      Object.keys(sizes).includes(this.size) &&
      Object.keys(stuffings).includes(this.stuffing)
    ) {
      let extrasSumPrice = 0;
      for (let i = 0; i < this.extra.length; i++) {
        let item = this.extra[i];
        extrasSumPrice += extras[item].price;

        if (Object.keys(extras).includes(item)) {
          this.price =
            sizes[this.size].price +
            stuffings[this.stuffing].price +
            extrasSumPrice;
        }
      }
    }
  }

  getPrice() {
    return this.price;
  }

  calculateCalories() {
    if (
      Object.keys(sizes).includes(this.size) &&
      Object.keys(stuffings).includes(this.stuffing)
    ) {
      this.calories =
        sizes[this.size].calories + stuffings[this.stuffing].calories;
    }

    if (
      Object.keys(sizes).includes(this.size) &&
      Object.keys(stuffings).includes(this.stuffing)
    ) {
      let extrasSumCalories = 0;
      for (let i = 0; i < this.extra.length; i++) {
        let item = this.extra[i];
        extrasSumCalories += extras[item].calories;

        if (Object.keys(extras).includes(item)) {
          this.calories =
            sizes[this.size].calories +
            stuffings[this.stuffing].calories +
            extrasSumCalories;
        }
      }
    }
  }

  getCalories() {
    return this.calories;
  }
}

//CREATE INSTANCE
const hamburger = new Hamburger();

//ADD LISTENERS
refs.sizes.forEach((size) => size.addEventListener("change", onChangeSize));
refs.stuffings.forEach((stuffing) =>
  stuffing.addEventListener("change", onChangeStuffing)
);
refs.extras.forEach((extra) => extra.addEventListener("change", onChangeExtra));
refs.btn.addEventListener("click", onClickBtn);

function onChangeSize() {
  for (let i = 0; i < refs.sizes.length; i++) {
    if (refs.sizes[i].checked) {
      hamburger.setSize(refs.sizes[i].value);
    }
  }
}

function onChangeStuffing() {
  for (let i = 0; i < refs.stuffings.length; i++) {
    if (refs.stuffings[i].checked) {
      hamburger.setStuffing(refs.stuffings[i].value);
    }
  }
}

function onChangeExtra(e) {
  if (e.target.checked) {
    hamburger.setExtra(e.target.value);
  }

  if (!e.target.checked) {
    hamburger.removeExtra(e.target.value);
  }
}

function onClickBtn(e) {
  e.preventDefault();
  if (!hamburger.getSize()) {
    alert("Select the size!");
    return;
  }

  if (!hamburger.getStuffing()) {
    alert("Select the stuffing!");
    return;
  }

  hamburger.calculatePrice();
  hamburger.calculateCalories();

  refs.price.textContent = hamburger.getPrice();
  refs.calories.textContent = hamburger.getCalories();

  console.log(hamburger);
}
