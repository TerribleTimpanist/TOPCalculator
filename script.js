const MAX_LEN = 11;

//Strings, not numbers
var lhs = null;
var rhs = null;
var ans = null;
var op = null;


function dbg(s) { document.getElementById("dbg").textContent += s+"\n";}
function dbgop() { dbg(lhs+" "+op+" "+rhs);}


function operate(op, xStr, yStr) {
    let x = Number(xStr);
    let y = Number(yStr);
    if(op==='/' && y===0) return NaN;
    if(op==='+') return x+y;
    if(op==='-') return x-y;
    if(op==='*') return x*y;
    if(op==='/') return x/y;
    return x;
}

function clear() {
    lhs = null;
    rhs = null;
    ans = null;
    op = null;
    display('');
}

function display(str) {
    if(str.length > MAX_LEN) str = Number(str).toPrecision(MAX_LEN);
    
    document.getElementById("ans").textContent = str;
}

function numClick(event) {
    let d = event.target.getAttribute("data-num");
    rhs = rhs ? rhs + d : d;
    display(rhs);
}

function opClick(event) {
     //dbgop();
    if(!rhs) {
        if(ans) { //use output from "="
            rhs = ans;
            ans = null;
        } else {
            //can't do anything without a rhs
            return;
        }
    }

    let newOp = event.target.getAttribute("data-op");

    if(lhs) { //do chain calculation
        //op should always be defined when lhs is defined
        let res = operate(op, lhs, rhs);
        if(isNaN(res)) {
           alert("Cannot divide by zero");
           return;
        }
        lhs = res.toString();
        display(lhs);
    }
    else {
        lhs = rhs;
        //leave display of rhs (now lhs)
    }
    rhs = null;
    op = newOp;
}

function equalsClick() {
    // dbgop();
    if(lhs && rhs) {
        //do op, store answer in ans, clear lhs, rhs, and op
        let res = operate(op, lhs, rhs);
        if(isNaN(res)) {
            alert("Cannot divide by zero");
            return;
         }
        ans = res.toString();
        lhs = null;
        rhs = null;
        op = null;
        display(ans);
    }
}

let numBtns = document.getElementsByClassName("num");
for(let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener("click", numClick);
}

let opBtns = document.getElementsByClassName("op");
for(let i = 0; i < opBtns.length; i++) {
    opBtns[i].addEventListener("click", opClick);
}

document.getElementById("clear").onclick = clear;
document.getElementById("equals").onclick = equalsClick;