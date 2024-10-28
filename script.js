const dictionary = document.querySelector('.dic');
const wordClass = document.querySelector('.phonetik');
const wordMeaning = document.querySelector('.word-meaning');
const wordDefine = document.querySelector('.word-define');
const form = document.querySelector('form');
const partsSpeech = document.querySelector('.speech');
const speakerButton = document.querySelector('.speaker');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const input = document.querySelector('.text').value;
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        
        const jsondata = await response.json();
        const wordNeed = jsondata[0].word;
        console.log(wordNeed);
        
        dictionary.innerHTML = wordNeed;
        wordClass.innerHTML = jsondata[0].phonetic || 'N/A';
        
        const meanings = jsondata[0].meanings[0].definitions[0].definition;
        wordMeaning.innerHTML = meanings;
        
        partsSpeech.innerHTML = jsondata[0].meanings[0].partOfSpeech || 'N/A';
        
        const secondDefinition = jsondata[0].meanings[0].definitions[1]?.definition || 'N/A';
        wordDefine.innerHTML = secondDefinition;
        
        const audioUrl = jsondata[0].phonetics[0]?.audio || '';
        if (audioUrl) {
            speakerButton.style.display = 'inline';
            speakerButton.onclick = function () {
                const audio = new Audio(audioUrl);
                audio.play();
            };
        } else {
            speakerButton.style.display = 'none';
        }
        
    } catch (error) {
        console.error(error);
        dictionary.innerHTML = '';
        wordClass.innerHTML = '';
        wordMeaning.innerHTML = 'Error: ' + error.message;
        partsSpeech.innerHTML = '';
        wordDefine.innerHTML = '';
        speakerButton.style.display = 'none';
    }
});
