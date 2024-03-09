const countValue = document.querySelector('#counter');

function increment(){
    // get the value from uI
    let value = parseInt(countValue.innerText);
    // update the value
    value++;
    // set the value from uI
    countValue.innerText = value;
};

function decrement(){
      // get the value from uI
      let value = parseInt(countValue.innerText);
      // update the value
      value--;
      // set the value from uI
      countValue.innerText = value;

};