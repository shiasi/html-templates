// Global Variables

const times = document.getElementById('time'), hour = document.getElementById('hour'),
    min = document.getElementById('min'), sec = document.getElementById('sec'),
    namePlace = document.getElementById('name'), todaySection = document.getElementById('today'),
    goal = document.getElementById('goal'), quote = document.getElementById('quote'),
    apmp = document.getElementById('ampm'), greet = document.getElementById('greet'),
    lightbox = document.getElementById('lightbox'), nameInput = document.getElementById('name-holder'),
    doneBtn = document.getElementById('done');

// white noise players variables

const fireSnd = document.getElementById('snd-campfire'),
    citySnd = document.getElementById('snd-city'),
    clockSnd = document.getElementById('snd-clock'),
    crowdSnd = document.getElementById('snd-crowd'),
    rainSnd = document.getElementById('snd-rain'),
    windSnd = document.getElementById('snd-wind'),
    players = document.getElementById('players');

// With howler.js
// let fireSnd= new Howl({
//     src: ['./musics/campfire.ogg'],
//     loop: true,
//     volume: 0.5
// });

// Players button (icons) to play or pause
const fireSndBtn = document.getElementById('snd-campfire-btn'),
    citySndBtn = document.getElementById('snd-city-btn'),
    clockSndBtn = document.getElementById('snd-clock-btn'),
    crowdSndBtn = document.getElementById('snd-crowd-btn'),
    rainSndBtn = document.getElementById('snd-rain-btn'),
    windSndBtn = document.getElementById('snd-wind-btn');

// set volumes
fireSnd.volume = 1;
citySnd.volume = 0.80;
clockSnd.volume = 0.75;
crowdSnd.volume = 0.80;
rainSnd.volume = 1;
windSnd.volume = 1;

// quote API
let quoteResponse = fetch('https://zenquotes.io/api/random')
    .then(response => response.json())
    .then(function (data) {
        quote.innerHTML = `"${data[0].q}"<br /> - ${data[0].a}`;
    });

// time set
function updateTime() {
    let date = new Date(),
        setHour = date.getHours(),
        setMin = date.getMinutes(),
        setSec = date.getSeconds();

    // Set AM/PM
    let setAmPm = setHour >= 12 ? 'PM' : 'AM';

    // 12 Hour format
    setHour = setHour % 12 || 12;

    // Output time
    hour.innerHTML = (setHour >= 10) ? `${setHour}` : `0${setHour}`;
    min.innerHTML = (setMin >= 10) ? `${setMin}` : `0${setMin}`;
    sec.innerHTML = (setSec >= 10) ? `${setSec}` : `0${setSec}`;
    apmp.innerHTML = setAmPm;

    // Update Time
    setTimeout(updateTime, 1000)
}

// Set Greetings
function greeter() {
    let date = new Date(),
        hour = date.getHours();
    if (hour >= 4 && hour < 12) {
        greet.innerHTML = 'Good Morning,';
    } else if (hour >= 12 && hour < 18) {
        greet.innerHTML = 'Good Afternoon,';
    } else if (hour >= 18 && hour < 20) {
        greet.innerHTML = 'Good Evening,';
    } else if ((hour >= 20 && hour <= 23) || (hour >= 0 && hour < 4)) {
        greet.innerHTML = 'Good Night,';
    } else {
        greet.innerHTML = 'Good Time,';
    }
}

// Set Background
function setBackground() {

}

// Check for name
function checkName() {
    isThereName = localStorage.getItem('phokus.name');
    if (!isThereName) {
        lightbox.style.display = 'flex';
        nameInput.focus();
    }
}
// Check Goal
function checkGoal() {
    isThereGoal = localStorage.getItem('phokus.goal');
    if (isThereGoal) {
        goal.textContent = isThereGoal;
        goal.style.borderBottom = 'none';
    }
}

// Loop in a hard way
function playSound(sound){
    return setInterval(function(){
        sound.play();
    }, sound.duration - 1000);
}

// Eventlistener
namePlace.addEventListener('click', function () {
    nameInput.value = localStorage.getItem('phokus.name');
    lightbox.style.display = 'flex';
    nameInput.focus();
});
namePlace.addEventListener('keypress', function (k) {
    if (k.key == 'Enter' || k.keyCode == 13) {
        lightbox.style.display = 'flex';
        nameInput.focus();
    }
});

// Lightbox Name Change
lightbox.addEventListener('click', function (ev) {
    if (ev.target.id == 'lightbox') {
        if (nameInput.value === '') {
            namePlace.textContent = '[Name]';
            nameInput.classList.add('invalid-input');
            nameInput.placeholder = 'Please insert your name...';
            nameInput.focus();
        } else {
            lightbox.style.display = 'none';
            localStorage.setItem('phokus.name', nameInput.value);
            nameInput.classList.remove('invalid-input');
            namePlace.textContent = nameInput.value;
        }
    }
});
lightbox.addEventListener('keydown', function (event) {
    if (event.code == 'Enter' || event.keyCode == 13 || event.code == 'Escape') {
        if (nameInput.value === '') {
            namePlace.textContent = '[Name]';
            nameInput.classList.toggle('invalid-input');
            nameInput.placeholder = 'Please insert your name...';
            nameInput.focus();
        } else {
            lightbox.style.display = 'none';
            localStorage.setItem('phokus.name', nameInput.value);
            nameInput.classList.remove('invalid-input');
            namePlace.textContent = nameInput.value;
        }
    }
});

goal.addEventListener('keydown', function (ev) {
    if (ev.code == 'Enter' || ev.keyCode == 13 || ev.code == 'Escape') {
        if (!goal.textContent == '') {
            localStorage.setItem('phokus.goal', goal.textContent);
            goal.blur();
            goal.style.borderBottom = 'none';
        } else {
            goal.blur();
        }
    }
});
goal.addEventListener('blur', function (ev) {
    localStorage.setItem('phokus.goal', goal.textContent);
    if (localStorage.getItem('phokus.goal') == '') {
        goal.style.borderBottom = 'solid 1px';
    } else {
        goal.style.borderBottom = 'none';
    }
});

doneBtn.addEventListener('click', function () {
    goal.textContent = '';
    goal.style.borderBottom = 'solid 1px';

});

players.addEventListener('click', function(e){
    console.log(e.target);
    if(e.target.id == fireSndBtn.id) {
        if (fireSnd.paused) {
            fireSnd.play();
            e.target.classList.add('active-link');
        } else {
            fireSnd.pause();
            e.target.classList.remove('active-link');
        }
    }
    if(e.target.id == citySndBtn.id) {
        if (citySnd.paused) {
            citySnd.play();
            e.target.classList.add('active-link');
        } else {
            citySnd.pause();
            e.target.classList.remove('active-link');
        }
    }
    if(e.target.id == clockSndBtn.id) {
        if (clockSnd.paused) {
            clockSnd.play();
            e.target.classList.add('active-link');
        } else {
            clockSnd.pause();
            e.target.classList.remove('active-link');
        }
    }
    if(e.target.id == crowdSndBtn.id) {
        if (crowdSnd.paused) {
            crowdSnd.play();
            e.target.classList.add('active-link');
        } else {
            crowdSnd.pause();
            e.target.classList.remove('active-link');
        }
    }
    if(e.target.id == rainSndBtn.id) {
        if (rainSnd.paused) {
            rainSnd.play();
            e.target.classList.add('active-link');
        } else {
            rainSnd.pause();
            e.target.classList.remove('active-link');
        }
    }
    if(e.target.id == windSndBtn.id) {
        if (windSnd.paused) {
            windSnd.play();
            e.target.classList.add('active-link');
        } else {
            windSnd.pause();
            e.target.classList.remove('active-link');
        }
    }
});

// init
namePlace.innerHTML = (localStorage.getItem('phokus.name')) ? localStorage.getItem('phokus.name') : '[Name]';
updateTime();
greeter();
setTimeout(checkName, 1000);
checkGoal();

