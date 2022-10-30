const main = document.querySelector("#main");
const add_user_btn = document.querySelector("#add-user");
const double_btn = document.querySelector("#double");
const show_millionaires_btn = document.querySelector("#show-millionaires");
const sort_btn = document.querySelector("#sort");
const calculate_wealth_btn = document.querySelector("#calculate-wealth");

let data = [];

const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const user = await checkStatusAndParse(res)
    .then((data) => data.results[0])
    .catch((err) => console.log(err));

  const new_user = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addUser(new_user);
};

getRandomUser();
getRandomUser();
getRandomUser();

const checkStatusAndParse = (res) => {
  if (!res.ok) throw new Error(`Status Code Error: ${res.status}`);
  return res.json();
};

const addUser = (obj) => {
  data.push(obj);
  updateDOM();
};

const updateDOM = (provided_data = data) => {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  provided_data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(div);
  });
};

const formatMoney = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const doubleMoney = () => {
   data = data.map(user=>{
         return {...user, money: user.money*2};
   });
   updateDOM();
}

const sortByRichest = () => {
   data.sort((a,b)=> b.money - a.money);
   updateDOM();
};

const showMillionaires = () => {
   data = data.filter(user => user.money > 1000000);
   updateDOM();
};

add_user_btn.addEventListener("click", getRandomUser);

double_btn.addEventListener("click", doubleMoney);

sort_btn.addEventListener("click", sortByRichest);

show_millionaires_btn.addEventListener("click", showMillionaires);

calculate_wealth_btn.addEventListener("click", () => {
   const total_wealth = data.reduce((acc, user) => (acc + user.money), 0);
   const wealth_el = document.createElement("div");
   wealth_el.classList.add('total-wealth');
   wealth_el.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total_wealth)}</strong></h3>`;
   main.appendChild(wealth_el);
});