//display screen od clock
const display = document.getElementById('clock');

//set audio for alarms
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.set-alarm');

// Array which will store all the alarms
const alarmList = [];

// function to play alarm
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`);
    // console.log(`Hey! it is ${now}`);
};

// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time){
    if(time < 10 & time.length != 2){
        return '0' + time;
    }
    return time;
};

//Update Time And Check Array Constantly
function updateTime(){
    var today = new Date();
    let hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    let session; // creating variable for AM & PM

    // changing in AM & PM
    if(hour >= 12){
        session = 'PM';
    } else{
        session = 'AM';
    }

    // Changing in to 12-Hr Format
    if(hour > 12){
        hour = formatTime(hour - 12);
    }

    const now = `${hour}:${minutes}:${seconds} ${session}`;
    display.innerText = `${hour}:${minutes}:${seconds} ${session}`;

//check if the alarmList includes the current time , "now"
//if yes, ringing() is called
    if(alarmList.includes(now)){
        console.log(now);
        ringing(now);    
    }
};

// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        // alert('Alarm cleared');
    }
};

//event to delete a particular alarm
myList.addEventListener('click', e => {
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }
});

//remove an alarm from an array when "DeleteAlarm" is clicked
function remove(value){
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList,newList);
};

//display new alarm on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list"> 
    <span class = "time"> ${newAlarm} </span>
    <button class = "deleteAlarm" id = "delete-button" onclick = "remove(this.value)" value = ${newAlarm} >Delete Alarm</button>
    </li>`
    myList.innerHTML += html;
};

//event to set a new alarm when form is submitted and added to the array
addAlarm.addEventListener('submit', e=>{
    e.preventDefault();
    let new_h = formatTime(addAlarm.a_hour.value);
    let new_m = formatTime(addAlarm.a_min.value);
    let new_s = formatTime(addAlarm.a_sec.value);
    let new_session = addAlarm.am_pm.value;
    const newAlarm = `${new_h}:${new_m}:${new_s} ${new_session}`;
    // console.log(newAlarm);

    //add new alarm to alarmlist
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            showNewAlarm(newAlarm);
            console.log(alarmList);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
     alert("Invalid Time Entered");
    }
});

// setting interval for updatetime function to update time by every second.
setInterval(updateTime, 1000);