/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
// Funktion zum Senden einer Chatnachricht
function sendChatMessage(message) {
    // Überprüfe, ob die WorkAdventure-Chatfunktionen verfügbar sind
    if (typeof workadventure !== 'undefined' && typeof workadventure.sendChatMessage === 'function') {
        // Rufe die Funktion zum Senden einer Chatnachricht auf
        workadventure.sendChatMessage(message);
    } else {
        console.error('WorkAdventure-Chatfunktionen sind nicht verfügbar.');
    }
}

// Nachricht, die gesendet werden soll
const message = "Hallo alle zusammen! Willkommen bei WorkAdventure!";

// Senden der Chatnachricht
sendChatMessage(message);
export {};
