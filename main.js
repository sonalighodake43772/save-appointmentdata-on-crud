// form validation
const myForm = document.querySelector('#my-form');
const namein = document.querySelector('#name');
const emailInput = document.querySelector('#emailID');
// const userList = document.querySelector('#users');


myForm.addEventListener('submit', onSubmit);



function onSubmit(e) {
  e.preventDefault();


  // instead of console add name and email to the localstorage

  // localStorage.setItem('name',namein.value);
  // localStorage.setItem('email',emailInput.value);


  // add name and email to localstorage as a object

  let userdetails =
  {
    name: namein.value,
    email: emailInput.value


  };
  // using this we can add only one user and when we add new user older will removed
  //  localStorage.setItem('userdetails',JSON.stringify(userdetails));

  // using uniqe id we can add multiple user older will nt removed
  //  localStorage.setItem(userdetails.email, JSON.stringify(userdetails));
  axios
  .post("https://crudcrud.com/api/033ef4b9712440788c3fd64c725891c0/appointmentdata",userdetails)
  .then(response=>console.log(response))
  .catch(err=>console.log(err));
  
  ShowUser(userdetails);
  }

// show user on screen
window.addEventListener("DOMContentLoaded", () => {
  const localStorageObj = localStorage;
  const localstoragekey = Object.keys(localStorageObj)

  for (var i = 0; i < localstoragekey.length; i++) {
    const key = localstoragekey[i]
    const userString = localStorageObj[key];
    const userObj = JSON.parse(userString);
    ShowUser(userObj);
   

  }
})
function ShowUser(user) {

  // when we create new user with same mail it will ceate new one instead of change older one
  if(localStorage.getItem(user.email)!==null)
  {
    removeUserFromScreen(user.email);
  }
  // create new li on screen
  // const li = document.createElement('`<li id=${user.email}>');
  // li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));
  // userList.appendChild(li);
   const parentnode=document.getElementById('users');
   const childnode= `<li id=${user.email}> ${user.name} - ${user.email}
   <button onclick=deleteUser('${user.email}')> Delete User </button>
   <button onclick=edituser('${user.name}','${user.email}')> edit User </button>
</li>`
   parentnode.innerHTML=parentnode.innerHTML + childnode;
  // Clear fields
    namein.value = '';
   emailInput.value = '';
  }

  // delete user
function deleteUser(emailID)
{
  localStorage.removeItem(emailID);
removeUserFromScreen(emailID);

}

// edituser
function edituser(names,emailIDs)
{
  document.getElementById('emailID').value = emailIDs;
  document.getElementById('name').value = names;
  }



  // remove user from onscreen
function removeUserFromScreen(emailID){
  const parentNode = document.getElementById('users');
  const childNode = document.getElementById(emailID);
if(childNode)
{
 parentNode.removeChild(childNode);
}
}

