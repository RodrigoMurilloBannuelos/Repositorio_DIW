import CrewInfo from './crew-info.js';

const infoSupervivientes = [];
const nombres = ['Jonh', 'Jane', 'Jack', 'Jill', 'James', 'Jen', 'Steve', 'Mary', 'Albert', 'Bob', 'Melinda',
    'Joe', 'Sara', 'Tom', 'Amy', 'Michael', 'Michelle', 'George', 'Laura', 'David', 'Sarah', 'Chris', 'Tracy',];

const apellidos = ['Smith', 'Doe', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez',
    'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright',
    'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts',
    'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers',
    'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward',
    'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood',
    'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores',
    'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes'];

window.onload = () => {
    const supervivientes = document.getElementById('survivor-meter');
    const energias = document.querySelectorAll('.energy-meter');
    const energiaList = Array.from(energias);
    const integridad = document.getElementById('damage-meter');
    const ammo = document.getElementById('ammo');
    const recalentamiento = document.getElementById('jump-progress');
    const saltoEmergencia = document.getElementById('emergence');
    const emergencyEfect = document.getElementById('salto-emergencia');
    const jumpEfect = document.getElementById('salto');
    const refMotor = document.getElementById('motor');
    const refNumber = document.getElementById('motor-number');
    const jump = document.getElementById('jump');

    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const p3 = document.getElementById('p3');
    const p4 = document.getElementById('p4');

    const fin = document.getElementById('fin');
    const finMessage = document.getElementById('fin-message');

    fin.classList.remove('activated');
    finMessage.classList.remove('activated');

    energiaList.forEach(energia => {
        energia.value = 90;
    });

    let deltaEnergy = 0;

    setInterval(() => {
       energiaList.forEach(energia => {
            if(energia.value > 0) {
                energia.value -= deltaEnergy;
            }
            if(energia.value <= 0) {
                energia.value = 0;
            }
       });
    }, 1000);

    if(window.sessionStorage.getItem('supervivientes') === undefined) {
        supervivientes.value = 90;
    }

    if(window.sessionStorage.getItem('energia') === undefined) {
        energiaList.forEach(energia => {
            energia.value = 90;
        });
    }

    if(window.sessionStorage.getItem('integridad') === undefined) {
        integridad.value = 90;
    }

    if(window.sessionStorage.getItem('ammo') === undefined) {
        ammo.innerHTML = '10/10';
    }

    recalentamiento.value = 100;
    recalentamiento.classList.add('heated');

    let deltaRec = 1;

    setInterval(() => {
        if(recalentamiento.value > 0) {
            recalentamiento.value -= deltaRec;
        }

        if(recalentamiento.value >= 50) {
            recalentamiento.classList.remove('cooled');
            recalentamiento.classList.remove('warmed');
            recalentamiento.classList.add('heated');
        }

        if(recalentamiento.value < 50 && recalentamiento.value >= 25) {
            recalentamiento.classList.remove('cooled');
            recalentamiento.classList.add('warmed');
            recalentamiento.classList.remove('heated');
        }

        if(recalentamiento.value < 25) {
            recalentamiento.classList.add('cooled');
            recalentamiento.classList.remove('warmed');
            recalentamiento.classList.remove('heated');
        }

    }, 1000);

    window.sessionStorage.setItem('supervivientes', supervivientes.value);
    window.sessionStorage.setItem('infoSupervivientes', infoSupervivientes.toString());
    window.sessionStorage.setItem('energia', energiaList[0].value);
    window.sessionStorage.setItem('integridad', integridad.value);
    window.sessionStorage.setItem('ammo', ammo.innerHTML);

    const registrarBtn = document.getElementById('registrar');
    registrarBtn.addEventListener('click', (e) => registrarTripulante(e));

    const eta = document.getElementById('cyclon-time');

    if(eta.innerText === '') {
        eta.innerText = '03:00';
    }

    const etaValue = eta.innerText;
    let min = parseInt(etaValue.split(':')[0]);
    let sec = parseInt(etaValue.split(':')[1]);
    let paused = false;
    const time = setInterval(() => {
        if(!paused) {
            if (min === 0 && sec === 0) {
                sec = 0;
                min = 0;
                finale(fin, finMessage);
            } else if (sec === 0) {
                sec = 59;
                min--;
            } else {
                sec--;
            }
            eta.innerText = min < 10 ? `0${min}:${sec < 10 ? `0${sec}` : sec}` : `${min}:${sec < 10 ? `0${sec}` : sec}`;
        }
    }, 1000);

    saltoEmergencia.addEventListener('click', () => {
        emergencyEfect.classList.add('activated');
        jumpEfect.classList.add('activated');
        paused = true;
        setTimeout(() => {
            emergencyEfect.classList.remove('activated');
            jumpEfect.classList.remove('activated');
            supervivientes.value -= 30;
            energiaList.forEach(energia => {
                energia.value -= 30;
            });
            integridad.value -= 30;

            window.sessionStorage.setItem('supervivientes', supervivientes.value);
            window.sessionStorage.setItem('energia', energiaList[0].value);
            window.sessionStorage.setItem('integridad', integridad.value);
            eta.innerText = '03:00';
            recalentamiento.value = 100;

            paused = false;
        }, 5000);
    });

    const proa = document.getElementById('proa-shield');
    const popa = document.getElementById('popa-shield');
    const babor = document.getElementById('babor-shield');
    const estribor = document.getElementById('estribor-shield');
    const equilazer = document.getElementById('equilazer');

    equilazer.addEventListener('click', () => {
        proa.value = 25;
        popa.value = 25;
        babor.value = 25;
        estribor.value = 25;
    });

    proa.addEventListener('change', () => {
        popa.value = (100/3) - proa.value / 3;
        estribor.value = (100/3) - proa.value / 3;
        babor.value = (100/3) - proa.value / 3;
    });

    popa.addEventListener('change', () => {
        proa.value = (100/3) - popa.value / 3;
        estribor.value = (100/3) - popa.value / 3;
        babor.value = (100/3) - popa.value / 3;
    });

    babor.addEventListener('change', () => {
        estribor.value = (100/3) - babor.value / 3;
        proa.value = (100/3) - babor.value / 3;
        popa.value = (100/3) - babor.value / 3;
    });

    estribor.addEventListener('change', () => {
        babor.value = (100/3) - estribor.value / 3;
        proa.value = (100/3) - estribor.value / 3;
        popa.value = (100/3) - estribor.value / 3;
    });

    const acBtn = document.getElementById('acel8');
    const deBtn = document.getElementById('decel8');
    const v = document.getElementById('speed-slider');

    acBtn.addEventListener('click', () => {
        if(v.value < v.max){
            v.value += 100;
            deltaEnergy += 1;
        }
    });

    deBtn.addEventListener('click', () => {
        if (v.value > v.min) {
            v.value -= 100;
            deltaEnergy -= 1;
        }

        if (deltaEnergy < 1) {
            deltaEnergy = 1;
        }
    });

    const changeWeapons = document.getElementById('change-weapon');
    const laser = document.getElementById('weapon1');
    laser.select();
    const nucelar = document.getElementById('weapon2');
    const shoot = document.getElementById('shoot');
    const reload = document.getElementById('reload');
    let count = 0;
    shoot.addEventListener('click', () => {
        if(laser.selected){
            if(count < 5) {
                energiaList.forEach(energia => {
                    energia.value -= 1;
                });
                count++;
            } else {
                shoot.disabled = true;
            }
        } else {
            if(ammo > 0) {
                ammo.innerHTML = `${ammo.innerHTML.split('/')[0] - 1}/${ammo.innerHTML.split('/')[1]}`;
            }
        }
    });

    reload.addEventListener('click', () => {
        if(laser.selected) {
            count = 0;
            shoot.disabled = false;
        } else {
            ammo.innerHTML = '10/10';
        }
    });

    changeWeapons.addEventListener('click', () => {
        if(laser.selected) {
            nucelar.select();
            ammo.style.display = 'inline-block';
        } else {
            laser.select();
            ammo.style.display = 'none';
        }
    });

    if(sessionStorage.getItem('refMotor') === undefined) {
        refMotor.value = 0;
    } else {
        refMotor.value = sessionStorage.getItem('refMotor');
    }

    refMotor.addEventListener('click', () => {
        refNumber.innerHTML = refMotor.value;
        deltaEnergy = refMotor.value;
        deltaRec = refMotor.value * 10;
    });

    jump.addEventListener('click', () => {
        if(recalentamiento.value <= 0) {
            jumpEfect.classList.add('activated');
            setTimeout(() => {
                jumpEfect.classList.remove('activated');
            }, 5000);
        }
    });



    const key = ['good', 'good', 'bad', 'bad'];
    const planetas = document.querySelectorAll('.planetas');
    const planetasList = Array.from(planetas);
    planetasList.forEach(planeta => {
        const number = Math.floor(Math.random() * 4);
        planeta.classList.add(key[number]);
    });

    const planetasGood = document.querySelectorAll('.good');
    const planetasGoodList = Array.from(planetasGood);
    planetasGoodList.forEach(planeta => {
        planeta.addEventListener('click', () => {
            divGood.style.display = 'block';
            energiaList.forEach(energia => {
                energia.value += 30;
            });

            supervivientes.value += 12;
            integridad.value += 40;
        });
    });

    const planetasBad = document.querySelectorAll('.bad');
    const planetasBadList = Array.from(planetasBad);
    planetasBadList.forEach(planeta => {
        planeta.addEventListener('click', () => {
            divBad.style.display = 'block';
            battle.display = 'block';
        });
    });

    const divGood = document.createElement('div');
    const divGoodText = document.createElement('p');
    divGoodText.innerHTML = '¡Enhorabuena! Has encontrado un 30 de Energia, 12 tripulantes y 40 de integridad';
    const divGoodBtn = document.createElement('button');
    const divGoodBtnText = document.createTextNode('Aceptar');
    divGoodBtn.addEventListener('click', () => {
        divGood.style.display = 'none';
    });

    divGoodBtn.appendChild(divGoodBtnText);
    divGood.appendChild(divGoodText);
    divGood.appendChild(divGoodBtn);
    divGood.style.display = 'none';
    

    const battle = document.createElement('div');
    const table = document.createElement('table');
    for(let i = 0; i < 4; i++) {
        const tr = document.createElement('tr');
        for(let j = 0; j < 6; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    battle.appendChild(table);
    battle.style.display = 'none';
}

const registrarTripulante = (e) => {
    const parent = e.target.parentElement;
    const nombre = parent.querySelector('#crew-member-name').value;
    const funcion = parent.querySelector('#crew-crew-member-function').value;
    const habilidad = parent.querySelector('#crew-member-skill').value;
    const estado = parent.querySelector('#crew-member-status').value;
    const nacimiento = parent.querySelector('#crew-member-birthdate').value;
    const t = CrewInfo;
    t.nombre = nombre;
    t.funcion = funcion;
    t.habilidad = habilidad;
    t.estado = estado;
    t.nacimiento = nacimiento;
    infoSupervivientes.push(t);
    window.sessionStorage.setItem('infoSupervivientes', infoSupervivientes.toString());
    console.log(infoSupervivientes);
}

const finale = (fin, finMessage) => {
    fin.classList.add('activated');
    finMessage.classList.add('activated');
}