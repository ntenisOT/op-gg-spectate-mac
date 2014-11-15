/**
 * Created by ntenisOT on 23/09/14.
 */

function readBlob() {

    var str = 'cd "/Applications/League of Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/0.0.0.143/deploy/LeagueOfLegends.app/Contents/MacOS" && riot_launched=true "/Applications/League of Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/0.0.0.143/deploy/LeagueOfLegends.app/Contents/MacOS/LeagueofLegends" 8394 LoLLauncher "/Applications/League of Legends.app/Contents/LoL/RADS/projects/lol_air_client/releases/0.0.0.143/deploy/bin/LolClient" ';


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

            document.getElementById('byte_content').textContent = str + match[0];
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}
