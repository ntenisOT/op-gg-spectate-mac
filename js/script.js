/**
 * Created by ntenisOT on 23/09/14.
 */

function readBlob() {

    var str = 'chmod +x "/Applications/League of Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/0.0.0.139/deploy/LeagueOfLegends.app/Contents/MacOS/LeagueofLegends" && cd "/Applications/League of Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/0.0.0.139/deploy/LeagueOfLegends.app/Contents/MacOS" && riot_launched=true "/Applications/League of Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/0.0.0.139/deploy/LeagueOfLegends.app/Contents/MacOS/LeagueofLegends" 8394 LoLLauncher "/Applications/League of Legends.app/Contents/LoL/RADS/projects/lol_air_client/releases/0.0.0.139/deploy/bin/LolClient" ';


    var files = document.getElementById('files').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    var file = files[0];
    var start = 0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            var text = evt.target.result;
            var regExp = /"spectator.*"/g;
            var match = regExp.exec(text);

            if(match === null) {
                alert('File not supported! Please select another file.')
            }

            var parent = document.getElementById('code-wrap');

            parent.innerHTML = "";

            var el = document.createElement('div');
            el.id = 'byte_content';
            el.innerHTML = '<b>Please Copy and Paste in your Terminal (Application - Utilities - Terminal) the following:</b></br></br>';

            el.innerHTML  = el.innerHTML  +  str + match[0];

            parent.appendChild(el);

        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}

$("#files").fileinput({'showPreview': false, 'uploadLabel': 'Submit', 'maxFileCount': 1});

$(".kv-fileinput-upload").on("click", function() {
    readBlob();
});

$("#files").on('fileclear', function(event) {
    var parent = document.getElementById('code-wrap');

    parent.innerHTML = "";

    var el = document.createElement('div');
    el.id = 'message_content';

    el.innerHTML = '<b>The command will be available here!</b>';
    parent.appendChild(el);
});
